import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  LinkButtons,
  SubmitButtons,
  loginButton,
  secondOptionButton,
  inputStyle,
  HeaderBar,
} from '../components';

const title = {
  pageTitle: 'SatsumaSpoon',
};

const genericErrorMessage = 'Sorry, something went wrong please check your network connection and try again';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      loggedIn: false,
      showError: false,
      showNullError: false,
      loggingIn: false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = e => {
    console.log(this.state.username);
    e.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        showError: false,
        showNullError: true,
        loggedIn: false,
      });
    } else {
      this.setState({
        showError: false,
        showNullError: false,
        loggedIn: false,
        loggingIn: true,
      });

      axios.post('/loginUser', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('JWT', response.data.token);
            this.setState({
              loggedIn: true,
              showError: false,
              showNullError: false,
              loggingIn: false,
            });
        } else {
          this.setState({
            errorMessage: response.data.message,
            showError: true,
            loggingIn: false,
          });
        }
      })
      .catch(error => {
        if (typeof(error.response) == 'undefined' ||
            typeof(error.response.data) == 'undefined') {
          this.setState({
            errorMessage: genericErrorMessage,
            loggingIn: false,
          });
        } else {
          this.setState({
            errorMessage: error.response.data,
            loggingIn: false,
          });
        }
        this.setState({
          showError: true,
          loggingIn: false,
        });
      });
    }
  };

  render() {
    const {
      username,
      password,
      showError,
      errorMessage,
      loggedIn,
      showNullError,
      loggingIn,
    } = this.state;

    var testShowError = true;
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
            {showNullError && (
              <div>
                <p>Username and password cannot be empty</p>
              </div>
            )}
            {showError && (
              <div>
                <p>{errorMessage}</p>
              </div>
            )}
            {loggingIn === true && (
              <p><CircularProgress color="secondary"/></p>
            )}
            {loggingIn !== true && (
              <p><SubmitButtons
                buttonStyle={loginButton}
                buttonText={'Login'} /></p>
            )}
          </form>
          {showError && (
            <div>
              <p><LinkButtons
                buttonStyle={secondOptionButton}
                buttonText={'Register'}
                link={'/register'}/>
              <LinkButtons
                buttonStyle={secondOptionButton}
                buttonText={'Forgot Password?'}
                link={'/forgotPassword'}/></p>
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
