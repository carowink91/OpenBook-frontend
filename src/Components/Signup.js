import React, { Component } from 'react';
import URL from '../helpers'
import { Segment } from 'semantic-ui-react';

class Signup extends Component{
  constructor(props){
    super(props);
    this.state={
      username: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleChange = (event) => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.password !== this.state.confirmPassword){
      alert('Password and password confirmation must match.')
      return
    }
    else {
      this.signup(this.state)
      this.setState({
          username: '',
          password: '',
          confirmPassword: ''
      })
    }
  }

  signup = (data) => {

    let usernameInput = data.username
    let passwordInput = data.password

    fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        user: {
          username: usernameInput,
          password: passwordInput
        }
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.error){
        alert('Invalid username or password')

      } else {
        localStorage.setItem('token', data.jwt)
        this.props.setUser(data.user_info)
      }
    })

  }

  render(){
    return(
      <Segment className="signup" raised style={{background: 'rgba(242, 147, 142, 1)'}}>
        <h2>Or Sign Up</h2>
        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label>Create Username:</label>
            <input type="text" className="form-control short" name="username" placeholder="username" onChange={this.handleChange}/>

            <label>Create Password:</label>
            <input type="password" className="form-control short" name="password" placeholder="password" onChange={this.handleChange}/>

            <label>Confirm Password:</label>
            <input type="password" className="form-control short" name="confirmPassword" placeholder="password" onChange={this.handleChange}/>

          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-danger">Sign Up</button>
          </div>

        </form>
      </Segment>
    )
  }
}

export default Signup
