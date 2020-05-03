
import axios from 'axios';

export const companies = async ()=>{
    const companiesArray = [];
    const apple = await axios.get('http://localhost:3001/products/apple');
    const samsung = await axios.get('http://localhost:3001/products/Samsung');
    const asus = await axios.get('http://localhost:3001/products/asus');
    const fuji = await axios.get('http://localhost:3001/products/fuji');
    const canon = await axios.get('http://localhost:3001/products/canon');

    companiesArray[0]=apple;
    companiesArray[1]=samsung;
    companiesArray[2]=asus;
    companiesArray[3]=fuji;
    companiesArray[4]=canon;

    return companiesArray;
}
