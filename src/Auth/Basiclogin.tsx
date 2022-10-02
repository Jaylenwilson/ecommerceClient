import React from "react"
import { Props } from '../App'
import { MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit'
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'



export type BasicLoginProps = {
    setUserId: Props['setUserId'],
    userId: Props['userId'],
    sessionToken: Props['sessionToken'],
    setSessionToken: Props['setSessionToken'],
    updateToken: Props['updateToken']
    role: Props['role'],
    setRole: Props['setRole'],
    firstName: Props['firstName'],
    setFirstName: Props['setFirstName']
}

export type BasicLoginState = {
    userId: string,
    firstName: string,
    email: string,
    password: string,
    role: string,
    sessionToken: string,
    updateToken: string,
    lastName: string,
    addres1: string,
    address2: string | null,
    city: string,
    state: string,
    zipcode: string,

}

class BasicLogin extends React.Component<BasicLoginProps, BasicLoginState> {
    constructor(props: BasicLoginProps) {
        super(props)
        this.state = {
            userId: "",
            firstName: "",
            email: "",
            role: "",
            sessionToken: "",
            updateToken: "",
            password: "",
            lastName: "",
            addres1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.basicLogin = this.basicLogin.bind(this);
    }
    handleClick(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    };

    basicLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch("http://localhost:3000/auth/login", {
            method: 'POST',
            body: JSON.stringify({
                user: { firstname: this.state.firstName, email: this.state.email, password: this.state.password, role: this.state.role }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                if (data.user) {
                    this.props.setSessionToken(data.sessionToken);
                    this.props.updateToken(data.sessionToken, data.user.firstName, data.user.role);
                    this.props.setUserId(data.user.id)
                }
            })
            .catch(err => console.log(err))

    }

    basicSignUp = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch("http://localhost:3000/auth/register", {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    firstname: this.state.firstName,
                    lastname: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    address1: this.state.addres1,
                    address2: this.state.address2,
                    city: this.state.city,
                    state: this.state.state,
                    zipcode: this.state.zipcode
                }
            })
        })
            .then(data => data.json())
            .then(data => {
                if (data.user) {
                    this.props.setSessionToken(data.sessionToken);
                    this.props.updateToken(data.sessionToken, data.user.firstName, data.user.role);
                    this.props.setUserId(data.user.id)
                }
            })
            .catch(err => console.log(err))

    }

    render(): React.ReactNode {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>SneakerPlug</h1>

                        </Col>
                        <Col>
                            <h3>Login</h3>
                            <div id="login">
                                <form id="loginform" onSubmit={this.basicLogin}>

                                    <MDBInput required max="8" min="6" className='mb-4' type='text' name='username' value={this.state.firstName} onChange={this.handleClick} label='username' ></MDBInput>
                                    <MDBInput required max="8" min="6" className='mb-4' type='text' name='email' value={this.state.email} onChange={this.handleClick} label='email'></MDBInput>
                                    <MDBInput required max="8" min="6" className='mb-4' type='password' name='password' value={this.state.password} onChange={this.handleClick} label='password'></MDBInput>

                                    <MDBBtn type='submit'>Sign in</MDBBtn>
                                    {this.state.userId !== "" && <Navigate to='/home' />}

                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>


            </div>
        )
    }
}
export default BasicLogin