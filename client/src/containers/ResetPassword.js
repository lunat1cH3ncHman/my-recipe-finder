import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import ReactGA from 'react-ga';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import "./MyRecipe.css";

import {
  LinkButtons,
  updateButton,
  loginButton,
  HeaderBar,
  forgotButton,
  inputStyle,
  SubmitButtons,
  secondOptionButton,
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
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = e => {
    e.preventDefault();
    axios
      .put('/updatePasswordReset', {
        resetPasswordToken: this.props.match.params.token,
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
            <p>{errorMessage}</p>

            <LinkButtons
              buttonStyle={secondOptionButton}
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
          {!updated && (
            <form className="password-form" onSubmit={this.updatePassword}>
              <p><TextField
                style={inputStyle}
                id="password"
                label="password"
                onChange={this.handleChange('password')}
                value={password}
                type="password"
              /></p>
              <p><SubmitButtons
                buttonStyle={updateButton}
                buttonText={'Update Password'}
              /></p>
            </form>
          )}
           {updated && (
            <div className="congratsWrapper">
              <Typography variant="h6" align="center">
                Your password has been reset
              </Typography>
              <p><LinkButtons
                buttonStyle={loginButton}
                buttonText={'Login'}
                link={`/login`}
              /></p>
            </div>
          )}
        </div>
      );
    }
  }
}
