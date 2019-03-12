import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import ReactGA from 'react-ga';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  LinkButtons,
  updateButton,
  loginButton,
  HeaderBar,
  forgotButton,
  inputStyle,
  SubmitButtons,
  loadingStyle,
} from '../components';

const title = {
  pageTitle: 'SatsumaSpoon',
};

const genericErrorMessage = 'Sorry, something went wrong please check your network connection and try again';

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      update: false,
      isLoading: true,
      error: false,
      errorMessage: '',
    };
  }

  async componentDidMount() {

    ReactGA.pageview("/ResetPassword");

    await axios
      .get('/reset', {
        params: {
          resetPasswordToken: this.props.match.params.token,
        },
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          ReactGA.event({
            category: 'User',
            action: 'Valid password reset link'
          });
          this.setState({
            username: response.data.username,
            update: false,
            isLoading: false,
            error: false,
          });
        } else {
          this.setState({
            errorMessage: response.data.message,
            update: false,
            isLoading: false,
            error: true,
          });
        }
      })
      .catch(error => {
        console.log(error.data);
        this.setState({
          update: false,
          isLoading: false,
          error: true,
        });
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = e => {
    e.preventDefault();
    axios
      .put('/updatePasswordViaEmail', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        if (response.status === 200) {
          ReactGA.event({
            category: 'User',
            action: 'Password Reset'
          });
          this.setState({
            updated: true,
            error: false,
          });
        } else {
          this.setState({
            errorMessage: response.data.message,
            updated: false,
            error: true,
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
          updated: false,
          error: true,
        });
      });
  };

  render() {
    const {
      password,
      error,
      isLoading,
      updated,
      errorMessage,
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <h4>{errorMessage}</h4>

            <LinkButtons
              buttonStyle={forgotButton}
              buttonText={'Forgot Password?'}
              link={'/forgotPassword'}
            />
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>
            Loading Your Data...
            <p><CircularProgress color="primary"/></p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="password-form" onSubmit={this.updatePassword}>
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              onChange={this.handleChange('password')}
              value={password}
              type="password"
            />
            <SubmitButtons
              buttonStyle={updateButton}
              buttonText={'Update Password'}
            />
          </form>

          {updated && (
            <div>
              <p>
                Your password has been successfully reset, please try logging in
                again.
              </p>
              <LinkButtons
                buttonStyle={loginButton}
                buttonText={'Login'}
                link={`/login`}
              />
            </div>
          )}
        </div>
      );
    }
  }
}
