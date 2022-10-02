import { render } from "@testing-library/react";
import React from "react"
import { Routes, Route, Link } from 'react-router-dom';
import { Props } from '../../App';

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
                <div className="pre-banner">
                    <li>Join us</li>
                    <li>Sign in</li>
                </div>
                <nav className="banner">
                    <li>Men's Shoes</li>
                    <li>Women's Shoes</li>
                    <li>Kid's Shoes</li>
                    <form action="">
                        <input type="search" />
                        <button type="submit"> search</button>
                    </form>
                    <button><Link to="/shoppingcart">Shopping Cart</Link></button>
                    <button><Link to="/favorites">Favorites</Link></button>
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




