import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  loginButton,
  secondOptionButton,
  inputStyle,
  HeaderBar,
} from '../components';

const title = {
  pageTitle: 'My Recipe Store   // Register',
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      messageFromServer: '',
      showError: false,
      registerError: false,
      loginError: false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  registerUser = e => {
    e.preventDefault();
    if (
      this.state.username === '' ||
      this.state.password === '' ||
      this.state.email === ''
    ) {
      this.setState({
        showError: true,
        loginError: false,
        registerError: true,
      });
    } else {
      axios
        .post('/registerUser', {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        })
        .then(response => {
          console.log(response.data);
          if (response.data === 'username or email already taken') {
            this.setState({
              showError: true,
              loginError: true,
              registerError: false,
            });
          } else {
            this.setState({
              messageFromServer: response.data.message,
              showError: false,
              loginError: false,
              registerError: false,
            });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  };

  render() {
    const {
      email,
      username,
      password,
      messageFromServer,
      showError,
      loginError,
      registerError,
    } = this.state;

    if (messageFromServer === '') {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.registerUser}>
            <p></p>
            <TextField
              style={inputStyle}
              id="email"
              label="email"
              value={email}
              onChange={this.handleChange('email')}
              placeholder="Email"
            />
            <TextField
              style={inputStyle}
              id="username"
              label="username"
              value={username}
              onChange={this.handleChange('username')}
              placeholder="Username"
            />
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <p><SubmitButtons
              buttonStyle={registerButton}
              buttonText={'Register'}
            /></p>
          </form>
          {showError === true && registerError === true && (
            <div>
              <p>Username, password and email are required fields.</p>
            </div>
          )}
          {showError === true && loginError === true && (
            <div>
              <p>
                That username or email is already taken. Please choose another
                or login.
              </p>
            </div>
          )}
          <p>Aleady registered?</p>
          <LinkButtons
            buttonText={`Login`}
            buttonStyle={secondOptionButton}
            link={'/login'}
          />
        </div>
      );
    } else if (messageFromServer === 'User created') {
      return (
        <div>
          <HeaderBar title={title} />
          <h3>User successfully registered!</h3>
          <LinkButtons
            buttonText={`Go Login`}
            buttonStyle={loginButton}
            link={`/login`}
          />
        </div>
      );
    }
  }
}

export default Register;
