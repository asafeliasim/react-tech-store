/* This class component responsible to hold all of the data and post the data to my web site
*  additionally, implementation functional of the side bar and the cart bar*/

import React, {Component} from 'react';
import {linkData} from './linkData';
import {socialData} from "./socialData";
import axios from 'axios';

const ProductContext = React.createContext();

//Provider
//consumer
class ProductProvider extends Component {

    state={
      sideBarOpen: false,
      cartOpen: false,
      cartItems: 0,
      links: linkData,
      socialIcons: socialData,
      cart:[],
      cartSubTotal:0,
      products:[],
      storedProducts:[],
      filteredProducts:[],
      featuredProducts:[],
      singleProduct:{},
      loading:true,
      addToCart: this.addToCart,
      search:'',
      price: 0,
      min: 0,
      max:0,
      company:'all'
        // All the web data
    };
    // section of the data

    componentDidMount() {
        axios.get('http://localhost:3001/productsApi')
            .then((resp) => {
                this.setState({
                    products: resp.data
             });
            }).then(()=>{
                this.state.storedProducts= this.setProducts(this.state.products);
                console.log(this.state.storedProducts);
            })
            .then(()=> {
                //console.log(this.state);
                this.setFeaturedProducts();
            })
            .catch(console.error);

    }
    setProducts=(products)=>{
        let storedProducts = products.map((item)=>{
           const {id} = item.id;
           const product = {id,...item}
           return product
        });
        let maxPrice = Math.max(...storedProducts.map(item=> item.price));
        console.log(maxPrice);
        this.setState({
            storedProducts,
            filteredProducts:storedProducts,
            price:maxPrice,
            max:maxPrice,
            loading:false
        })
    };

    getStoredProducts = () =>{
        return localStorage.getItem('singleProduct')?JSON.parse(localStorage.getItem('singleProduct')):{}
    };
    setSingleProduct = id =>{
        let product = this.state.storedProducts.find(item=> item.id ===id);
        /*Sending the product to the next page*/
        localStorage.setItem('singleProduct',JSON.stringify(product));
        this.setState({
            singleProduct:{...product},
            loading:false

        });

    };
    //handle filtering]
    handleChange = (event) => {
      // variable represent the type of correct search
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
         [name]:value
      },()=>{
          this.sortData()
      });

    };

    sortData = () =>{
        const {storedProducts,price,company,search}= this.state;

        let tempProducts = [...storedProducts];
        tempProducts = tempProducts.filter(product => product.price <= price);

        /*filtering based on company*/
        if(company !== "all"){
          tempProducts = tempProducts.filter(product => product.company === company);
        };
        /*ending company filtering*/

        /*filtering based search input*/
        if(search.length > 0){
            tempProducts = tempProducts.filter(product => {
               let tempSearch = search.toLowerCase();
               // using slice to see that the letters is match
              // for example --> ip (search.length=2)--> ipo (3)--> ipho (4)--> iphon (5)--> iphone (6)--> iphonex
               let tempTitle = product.title.toLowerCase()
                   .slice(0,search.length);
               if(tempSearch === tempTitle){
                   return product;
               }


            });
        }

        this.setState({filteredProducts:tempProducts});

    };
    handleSideBar = () => {
      this.setState({sideBarOpen:!this.state.sideBarOpen});
    };
    // handle cart
    handleCart = () => {
      this.setState({cartOpen:!this.state.cartOpen});
    };
    //open cart
    openCart = () => {
        this.setState({cartOpen:true})
    };
    setFeaturedProducts = () => {
        let featuredProducts = this.state.products.filter((item)=> item.featured === true);
        this.setState({featuredProducts,loaded:false,singleProduct:this.getStoredProducts()});
    };

    // close cart
    closeCart = () => {
      this.setState({cartOpen:false})
    };

    render() {
        return(
           <ProductContext.Provider value=
                {{  ...this.state,
                    handleSideBar: this.handleSideBar,
                    handleCart: this.handleCart,
                    closeCart: this.closeCart,
                    openCart: this.openCart,
                    //addToCart: this.addToCart,
                    //incrementCart: this.increment,
                    //decrement: this.decrement,
                    //clearCart: this.closeCart
                    handleChange:this.handleChange

                }}>
               {this.props.children}
           </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider,ProductConsumer};
