import React from "react"
import { Props } from '../App'
import { MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit'


export type BasicLoginProps = {
    setUserId: Props['setUserId'],
    userId: Props['userId'],
    sessionToken: Props['sessionToken'],
    setSessionToken: Props['setSessionToken'],
    updateToken: Props['updateToken']
    role: Props['role'],
    setRole: Props['setRole'],
    firstname: Props['firstname'],
    setFirstName: Props['setFirstName']
}

export type BasicLoginState = {
    userId: string,
    firstname: string,
    email: string,
    password: string,
    role: string,
    sessionToken: string,
    updateToken: string
}

class BasicLogin extends React.Component<BasicLoginProps, BasicLoginState> {
    constructor(props: BasicLoginProps) {
        super(props)
        this.state = {
            userId: "",
            firstname: "",
            email: "",
            role: "",
            sessionToken: "",
            updateToken: "",
            password: ""
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

        await fetch("http://localhost:3000/login", {
            method: 'POST',
            body: JSON.stringify({
                user: { firstname: this.state.firstname, email: this.state.email, password: this.state.password, role: this.state.role }
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
                    this.props.updateToken(data.sessionToken, data.user.firstname, data.user.role);
                    this.props.setUserId(data.user.id)
                }
            })
    }

    render(): React.ReactNode {
        return (
            <div>
                <h1>SneakerPlug</h1>
                <div id="login">
                    <h3>Login</h3>
                    <form id="loginform" onSubmit={this.basicLogin}>

                        <MDBInput required max="8" min="6" className='mb-4' type='text' name='username' value={this.state.firstname} onChange={this.handleClick} label='username' ></MDBInput>
                        <MDBInput required max="8" min="6" className='mb-4' type='text' name='email' value={this.state.email} onChange={this.handleClick} label='email'></MDBInput>
                        <MDBInput required max="8" min="6" className='mb-4' type='password' name='password' value={this.state.password} onChange={this.handleClick} label='password'></MDBInput>

                        <MDBBtn type='submit'>Sign in</MDBBtn>
                        {this.state.user !== "" && <Navigate to='/home' />}

                    </form>
                </div>
                <div id='registerbutton'>
                    <p>Not a member?</p>
                    <MDBBtn onClick={this.props.toggleModal} type='button'>Sign up</MDBBtn>
                    {this.props.userId !== "" && <Navigate to='/home' />}

                </div>

                <div id="signupbtn">
                    <Signup role={this.props.role} setRole={this.props.setRole} username={this.props.username} setUsername={this.props.setUsername} setUser={this.props.setUser} user={this.props.user} closeModal={this.props.closeModal} toggleModal={this.props.toggleModal} isOpen={this.props.isOpen} sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} setSessionToken={this.props.setSessionToken} />
                </div>

            </div>
            </div>
        )
    }
}
export default BasicLogin