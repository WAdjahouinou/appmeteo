import { meteoService, meteoTown } from '../config/react_config';
import {meteoServiceUrlCities} from '../config/react_config';

export async function getMeteo(town) {
    meteourl = meteoService + "/" + town;
    try {
        let meteo = await fetch(meteourl);
        let result = await meteo.json();
        meteo = null;

        return result;
    } catch (error) {
        throw error;
    }
}

export async function getCities()
{
    try 
    {
        let meteo = await fetch(meteoServiceUrlCities);
    
        let result = await meteo.json();
        meteo = null;
       // console.log(result[0]["name"]);

       var cities = ["limoges"];
        var i=0;

       /* result.forEach(element => {
            cities[i] = element;
            i=i+1;
        });*/
        
        
       // var array = JSON.parse(result);

          // Object
             //array.A['12']
            for(let item in result){
            cities[i]=result[i];
            i=i+1;
             }
            
        
            
             return cities;

    }
    catch(error)
    {
        throw error;
    }
}