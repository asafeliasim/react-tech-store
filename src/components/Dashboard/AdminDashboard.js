import React,{Component} from 'react';
import axios from 'axios';
import {Card,Container,Row,Col,Form} from 'react-bootstrap';

import './dash.css';

class AdminDashboard extends Component{
    state={
        products:[]
    };
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

    //Edit item

    //Create Item

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
                                                <p>$ {product.price}</p>
                                            </Card.Text>
                                            <Card.Footer>
                                                <button type="button" className="btn btn-primary mr-4">Edit</button>
                                                <button type="button" className="btn btn-danger">Delete</button>
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
                            <Form.Group as={Row} controlId="formControlID">
                                <Form.Label className="form-label" column sm={2}>
                                    ID :
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="number" placeholder="id"/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formControlTitle">
                                <Form.Label className="form-label" column sm={2}>
                                    Title:
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="title"/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formControlCompany">
                                <Form.Label className="form-label" column sm={2}>
                                    Company:
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" placeholder="company"/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formControlPrice">
                                <Form.Label className="form-label" column sm={2}>
                                    Price:
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="number" placeholder="price"/>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>


            </Container>
         )
    }

}

export default AdminDashboard;
