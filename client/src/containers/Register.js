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

const genericErrorMessage = 'Sorry, something went wrong please check your network connection and try again';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      errorMessage: '',
      showError: false,
      registered: false,
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
          if (response.status === 200) {
            this.setState({
              registered: true,
              showError: false,
              loginError: false,
              registerError: false,
            });
          } else {
            this.setState({
              errorMessage: response.data.message,
              showError: true,
              loginError: true,
              registerError: false,
            });
          }
        })
        .catch(error => {
          if (typeof(error.response) == 'undefined' ||
              typeof(error.response.data) == 'undefined') {
            this.setState({
              errorMessage: genericErrorMessage
            });
          } else {
            this.setState({
              errorMessage: error.response.data,
            });
          }
          this.setState({
            showError: true,
            loginError: true,
            registerError: false,
          });
        });
    }
  };

  render() {
    const {
      email,
      username,
      password,
      errorMessage,
      showError,
      loginError,
      registered,
      registerError,
    } = this.state;

    if (!registered) {
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
            <p></p>
            <TextField
              style={inputStyle}
              id="username"
              label="username"
              value={username}
              onChange={this.handleChange('username')}
              placeholder="Username"
            />
            <p></p>
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <div>
            <font colour="#FF0000">
              {showError === true && registerError === true && (
                <p>Username, password and email are required fields.</p>
              )}
              {showError === true && loginError === true && (
                <p>{errorMessage}</p>
              )}
            </font>
            </div>
            <p><SubmitButtons
              buttonStyle={registerButton}
              buttonText={'Register'}
            /></p>
          </form>
          <p>Aleady registered?</p>
          <LinkButtons
            buttonText={`Login`}
            buttonStyle={secondOptionButton}
            link={'/login'}
          />
        </div>
      );
    } else {
      return (
        <div>
          <HeaderBar title={title} />
          <h3>Welcome to My Recipe Store!</h3>
          <p>The place to keep all your most loved recipes safe</p>
          <p></p>
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
