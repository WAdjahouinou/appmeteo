import {meteoServiceURL} from '../config/react_config';

export async function getMeteo()
{
    try 
    {
        let meteo = await fetch(meteoServiceURL);
        let result = await meteo.json();
        meteo = null;

        return result;
    }
    catch(error)
    {
        throw error;
    }
}