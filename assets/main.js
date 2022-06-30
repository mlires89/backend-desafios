const fs = require('fs')



class Contenedor {
    
    constructor (ruta){
        this.ruta = ruta;
        this.data = this.getData(this.ruta);
        this.maxId = this.getMax();
        this.minId = this.getMin();
    }

    getData (){
        let datos = JSON.parse(fs.readFileSync(this.ruta))
        return datos
    }

    async save (object){      
        let maxId = 0;
        this.data.forEach(element => {
            if (element.id > maxId ){ maxId = element.id}
        });    
        object.id = (maxId + 1);
        this.data.push(object);
        let objectJSON = JSON.stringify(this.data);
        try{
           await fs.promises.writeFile(this.ruta,objectJSON)
        }
        catch (err){
            console.log (err)
        }
        return object.id
    }

    getById (number){
        
        const founded = this.data.find( element => element.id == number) || null;

        return founded ;
    }

    getAll (){
        return this.data
    }

    getMax(){
        let maxId = 0;
        this.data.forEach(element => {
            if (element.id > maxId ){ maxId = element.id}
        });  
        return maxId  
    }

    getMin(){
        let minId = this.data[0].id;
        this.data.forEach(element => {
            if (element.id < minId ){ minId = element.id}
        });  
        return minId  
    }

   async deleteById(number){

        const index = this.data.findIndex(object => {return object.id === number;});
       if (index == -1) {
            console.log ('No se encontró el elemento')
        }
        else{
            this.data.splice(index, 1)
            let objectJSON = JSON.stringify(this.data);

            try{
                await fs.promises.writeFile(this.ruta,objectJSON)
                console.log('Se elimino el elemento')
            }
            catch (err){
                console.log (err)
            }
        }  
   }

    async deleteAll(){
        try{
            await fs.promises.truncate(this.ruta)
            console.log('Todos los elementos fueron borrados')
         }
         catch (err){
             console.log (err)
         }
    }
}

module.exports = { Contenedor }


