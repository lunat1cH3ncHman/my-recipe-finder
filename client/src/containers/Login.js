import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  LinkButtons,
  SubmitButtons,
  loginButton,
  forgotButton,
  secondOptionButton,
  inputStyle,
  HeaderBar,
} from '../components';

const title = {
  pageTitle: 'My Recipe Store   // Login',
};

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showError: false,
      showNullError: false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = e => {
    console.log(this.state.username);
    console.log(this.state.password);
    e.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        showError: false,
        showNullError: true,
        loggedIn: false,
      });
    } else {
      axios
        .post('/loginUser', {
          username: this.state.username,
          password: this.state.password,
        })
        .then(response => {
          console.log(response.data);
          if (
            response.data === 'Passwords do not match' ||
            response.data === 'Username does not exist'
          ) {
            this.setState({
              showError: true,
              showNullError: false,
            });
          } else {
            localStorage.setItem('JWT', response.data.token);
            this.setState({
              loggedIn: true,
              showError: false,
              showNullError: false,
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
      username,
      password,
      showError,
      loggedIn,
      showNullError,
    } = this.state;
    if (!loggedIn) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.loginUser}>
            <p></p>
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
            <p></p><SubmitButtons
              buttonStyle={loginButton}
              buttonText={'Login'} />
          </form>
          {showNullError && (
            <div>
              <p>The username or password cannot be null.</p>
            </div>
          )}
          {showError && (
            <div>
              <p>
                That username or password isn't recognized. Please try again or
                register now.
              </p>
              <LinkButtons
                buttonStyle={forgotButton}
                buttonText={'Forgot Password?'}
                link={'/forgotPassword'}/>
              <p><SubmitButtons
                buttonStyle={secondOptionButton}
                buttonText={'Register'}
              /></p>
            </div>
          )}
        </div>
      );
    } else {
      return <Redirect to={`/myRecipes/${username}`} />;
    }
  }
}

export default Login;
