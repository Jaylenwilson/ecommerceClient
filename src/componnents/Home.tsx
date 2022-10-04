import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Props } from '../App';

export interface HomeProps {
    sessionToken: Props['sessionToken'],
    userId: Props['userId'],
    productId: Props['productId'],
    setProductsId: Props['setProductsId'],
    role: Props['role'],
    products: Props['products'],
    setProducts: Props['setProducts']
}

export interface HomeState {
    products: string[],
    postId: string,
    results: string[]
}

export class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props)
        this.state = {
            products: [],
            postId: "",
            results: []
        }
        // this.ViewPost = this.ViewPost.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        this.ViewPost()
    }

    ViewPost = async () => {
        await fetch("http://localhost:3000/product/all", {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("Authorization")}`
            })
        })
            .then(data => data.json())
            .then(data => {
                if (data.products[0]) {
                    console.log(data)
                    this.props.setProducts(data.products)
                    this.props.setProductsId(data.products.id)
                }
            })
            .catch((err) => console.log(err))
    }


    productsMap = () => {
        return this.props.products?.map((products: any, index: number) => {
            return (
                <Col md={4}>
                    <MDBCard className="card" key={products.id}>
                        <img className='cardimg' src={products.image} alt="" />
                        <MDBCardTitle className="title">{products.item}</MDBCardTitle>
                        <MDBCardBody>
                            <h5>{products.description}</h5>
                            <p className='shoecolors'>{products.color}</p>
                            <h5 className='price'>{products.price}</h5>
                        </MDBCardBody>
                    </MDBCard>
                </Col>
            )
        })
    }

    render(): React.ReactNode {
        return (
            <div className="homepagewrapper">
                <h1>Home Page</h1>
                <Container>
                    <Row>

                        {this.productsMap()}

                    </Row>
                </Container>
            </div>
        )
    }

}

export default Home;
