import React from 'react';
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
    posts: string[],
    postId: string,
    results: string[]
}

export class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props)
        this.state = {
            posts: [],
            postId: "",
            results: []
        }
        // this.ViewPost = this.ViewPost.bind(this);
        // this.handleClick = this.handleClick.bind(this);
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

    componentDidMount() {
        this.ViewPost()
    }
}

export default Home;
