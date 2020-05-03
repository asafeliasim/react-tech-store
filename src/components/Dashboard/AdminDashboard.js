import React,{Component,useContext} from 'react';
import axios from 'axios';
import {Card,Container,Row,Col,Form,Button} from 'react-bootstrap';
import Popup from 'reactjs-popup';
import DevicesDash from './DevicesDash';
import './dash.css';
import { utcMillisecond } from 'd3';

class AdminDashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[],
            id: Number,
            title:'',
            company:'',
            price: Number,
            featured: Boolean,
            selectedFile: null
            
        };
    }
    
    componentDidMount() {
        axios.get('http://localhost:3001/productsApi')
            .then((resp) => {
                this.setState({
                    products: resp.data
                });
            }).then(()=>{
            this.state.storedProducts= this.setProducts(this.state.products);
            console.log(this.state.storedProducts);
        });

    }

    setProducts=(products)=>{
        let storedProducts = products.map((item)=>{
            const {id} = item.id;
            const product = {id,...item};
            return product
        });
        this.setState({
            storedProducts,
        })
    };

    //Delete item
    async deleteProduct(title){
        console.log(title);
        await axios.delete(`http://localhost:3001/product/${title}`);
        console.log('Product deleted');
        return;
    };
    //Edit item
    changeFieldProduct=(e)=>{
        const change = e.target.value;
        this.setState({[e.target.name]: change});

        console.log(change);
        e.preventDefault();
    };
    async submitEditProduct(product) {

        const title = this.state.title ? this.state.title : product.title;
        const company = this.state.company ? this.state.company : product.company;
        const price = this.state.price ? this.state.price : product.price;
        const req = {
                title,
                company,
                price
        };
        const res = await axios.patch(`http://localhost:3001/product/${product.title}`,req);
        console.log(res);
    }
    //Create Item
    initProductField=(e)=>{
        this.setState({[e.target.name]:e.target.value});
        console.log(e.target.value);
        e.preventDefault();
    };
    async createProduct(){
    const id = this.state.id;
    const title = this.state.title;
    const company = this.state.company;
    const price = this.state.price;
    const img = `../img/${this.state.title}.jpg`;
    const product = {
        id,
        title,
        company,
        price,
        img
        };
        console.log(product);
    const p = await axios.post(`http://localhost:3001/product`,product);
    console.log(p);
    };
    fileSelectedHandler = e => {
      /*  this.setState({
            selectedFile: e.target.files[0]
        },()=>{
            console.log(this.state.selectedFile);        
            const formData = new FormData();
            formData.append(this.state.selectedFile,'file');
            
        });
        */
       const files = Array.from(e.target.files);
       const FormData = new FormData();
       files.forEach((file,i)=>{
         FormData.append(i,file);
       });
       console.log(FormData)
        
    };

    uploadImage = async e =>{

        var file = this.state.selectedFile;
        console.log(file);
        let formData = new FormData();
        formData.append('file',file);
        const res = await axios.post('http://localhost:3001/img/upload',formData)
        .then(()=>console.log(res))
    };
    render() {
        console.log(this.state);
        return(
            <Container>
                <Row>
                    <Col>
                        <h1 className="list-title text-center my-4">My products</h1>
                        <ul className="products-card-list">
                            {
                                this.state.products.map(product=>(
                                    <Card key={product.id} className="product-card">
                                        <Card.Body>
                                            <Card.Title className="product-title">{product.title}</Card.Title>
                                            <Card.Text>
                                                <p>{product.company}</p>
                                                <p>${product.price}</p>
                                            </Card.Text>
                                            <Card.Footer>
                                                <Popup trigger={<button type="button" className="btn btn-primary mr-4">Edit</button>}
                                                        position="right center">
                                                    <Form className="popup">
                                                        <Form.Group as={Row} controlId="title">
                                                                <Form.Control type="text"
                                                                                placeholder="title"
                                                                                name="title"
                                                                                onChange={this.changeFieldProduct}/>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="company">
                                                                <Form.Control type="text"
                                                                              placeholder="company"
                                                                              name="company"
                                                                              onChange={this.changeFieldProduct}/>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="price">
                                                                <Form.Control type="number"
                                                                              placeholder="price"
                                                                              name="price"
                                                                              onChange={this.changeFieldProduct}/>
                                                        </Form.Group>
                                                        <Button type="submit"
                                                                className="btn btn-primary text-uppercase w-100"
                                                                onClick={()=>this.submitEditProduct(product)}
                                                        >
                                                            edit
                                                        </Button>
                                                        </Form>
s
                                                </Popup>
                                                <button type="button" className="btn btn-danger" onClick={()=>this.deleteProduct(product.title)}>
                                                    Delete
                                                </button>
                                            </Card.Footer>
                                        </Card.Body>

                                    </Card>
                                ))
                            }
                        </ul>
                    </Col>
                    <Col>
                        <h1 className="list-title text-center my-5 ml-4">Create product</h1>
                        <Form>
                            <Form.Group as={Row} controlId="id">
                                <Form.Label className="form-label" column sm={2}>
                                    ID :
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="number" placeholder="id" name="id" onChange={this.initProductField}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="title">
                                <Form.Label className="form-label" column sm={2}>
                                    Title:
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="title" name="title" onChange={this.initProductField}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="company">
                                <Form.Label className="form-label" column sm={2}>
                                    Company:
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" name="company" placeholder="company" onChange={this.initProductField}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="price">
                                <Form.Label className="form-label" column sm={2}>
                                    Price:
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="number" name="price" placeholder="price" onChange={this.initProductField}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="featured">
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Form.Check label="featured" name="featured" onChange={this.initProductField}/>
                                </Col>
                            </Form.Group>
                            <button className="btn btn-secondary btn-create w-50"
                                    onClick={()=>this.createProduct()}
                            >
                                Create
                            </button>
                        </Form>
                        <div className="ml-5">
                                <input ref={(ref)=>{this.uploadImage = ref;}} type="file" name="file" onChange={(e)=>this.fileSelectedHandler(e)}/>
                        </div>
                        <DevicesDash/>                            
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default AdminDashboard;
