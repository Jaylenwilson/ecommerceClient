import { render } from "@testing-library/react";
import React from "react"
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Link } from 'react-router-dom';
import { Props } from '../../App';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export interface SideBarProps {
    sessionToken: Props['sessionToken']
    firstName: Props['firstName']
    clearToken: Props['clearToken']
    role: Props['role']
}

export interface SideBarState {
    isLoggedIn: boolean
}

export class Sidebar extends React.Component<SideBarProps, SideBarState> {
    constructor(props: SideBarProps) {
        super(props)

        this.state = {
            isLoggedIn: false,
        }
    }

    render(): React.ReactNode {
        return (
            <div className="hero">
                <div className="pre-bannerwrapper">
                    <Container fluid className="pre-banner">
                        <Row className=''>
                            <Col lg={1} className="d-flex align-items-center pr-0">
                                <li><Link className='pre-bannerlinks' to='/login'>Join us</Link></li>
                            </Col>
                            <Col lg={1} className="d-flex align-items-center pr-0">
                                <li><Link className='pre-bannerlinks' to='/signup'>Sign up</Link></li>
                            </Col>
                            <Col lg={10} className="d-flex justify-content-end align-items-center">
                                <button title="shopping cart" className="iconbtn"><Link to="/shoppingcart"><AiIcons.AiOutlineShoppingCart size={28} color='black' /></Link></button>
                                <button title="favorites" className="iconbtn"><Link to="/favorites"><FaIcons.FaRegHeart size={28} color='black' /></Link></button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <nav className="banner">
                    <Container className="h-100 d-flex align-items-center" fluid>
                        <Row className="h-100 w-100" >
                            <Col md={4} className="d-flex justify-content-center aling-items-center">
                                <button className="menubtn">Men's Shoes</button>

                            </Col>
                            <Col md={4} className="d-flex justify-content-center aling-items-center ">
                                <button className="menubtn">Women's Shoes</button>

                            </Col>
                            <Col md={4} className="d-flex justify-content-center aling-items-center ">
                                <button className="menubtn">Kid's Shoes</button>

                            </Col>
                            {/* <Col md={2} className="d-flex justify-content-center aling-items-center pr-0 position-relative">
                                <div className="searchbox">
                                    <input className="search" type="search" />
                                    <button className="searchbtn" type="submit"> <AiIcons.AiOutlineSearch size={25} /></button>
                                </div>
                            </Col> */}
                        </Row>
                    </Container>
                </nav>
            </div>
        )
    }


}



    // componentWillRecieveProps(nextProps) {
    //     if (this.props.sessionToken ==! nextProps.sessionToken) {
    //         this.displaySideBar()
    //     }
    // }




