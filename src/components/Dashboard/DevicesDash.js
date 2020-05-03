import React,{Component} from 'react';
import axios from 'axios';

export default class DeviecesDash extends Component{


    // function load all the company 
    constructor(props){
        super(props);
        this.state={
            compeins:[]
        }
    }
    async componentDidMount(){

        const compdata = await axios.get('http://localhost:3001/compeanies');
        console.log(compdata);

        compdata.data.map(async company=>{
            let total = await axios.get(`http://localhost:3001/products/${company.title}`)
            let totalOfCompany = total.data.totalProductsFromCompany;
            this.setState({compeins:[...this.state.compeins,totalOfCompany]});
        });
        console.log(this.state.compeins);
    }
    
    render(){
        return(
            <div className="container-fluid mt-5">
                <h5>Ammount of products by company: </h5>
                
                <div className="row mt-5 p2 text-dark">
                    <h5>apple: </h5>  <p className="ml-3"><strong>{this.state.compeins[0]}</strong></p>
                </div>  
                <div className="row p2 text-dark">
                    <h5>samsung: </h5>  <p className="ml-3"><strong>{this.state.compeins[1]}</strong></p>
                </div>  
                <div className="row p2 text-dark">
                    <h5>fuji: </h5>  <p className="ml-3"><strong>{this.state.compeins[2]}</strong></p>
                </div>  
                <div className="row p2 text-dark">
                    <h5>asus: </h5>  <p className="ml-3"><strong>{this.state.compeins[3]}</strong></p>
                </div>  
                <div className="row p2 text-dark">
                    <h5>canon: </h5>  <p className="ml-3"><strong>{this.state.compeins[4]}</strong></p>
                </div>                
            </div>
        )
        }


} 