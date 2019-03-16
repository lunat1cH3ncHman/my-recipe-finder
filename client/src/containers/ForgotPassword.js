import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import ReactGA from 'react-ga';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import "./MyRecipe.css";

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  forgotButton,
  inputStyle,
  HeaderBar,
} from '../components';

const title = {
  pageTitle: 'SatsumaSpoon',
};

const genericErrorMessage = 'Sorry, something went wrong please check your network connection and try again';
const nullEmailErrorMessage = 'Please provide your registered email address';

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      errorMessage: '',
      passwordResetSent: false,
      resetting: false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = e => {
    e.preventDefault();
    this.setState({
      showError: false,
      resetting: true,
    });

    if (this.state.email === '') {
      this.setState({
        showError: true,
        errorMessage: nullEmailErrorMessage,
        resetting: false,
      });
    } else {
      axios.post('/forgotPassword', {
          email: this.state.email,
        })
        .then(response => {
          if (response.status === 200) {
            ReactGA.event({
              category: 'User',
              action: 'Forgot Password',
            });
            this.setState({
              passwordResetSent: true,
              showError: false,
              resetting: false,
            });
          } else {
            this.setState({
              errorMessage: response.data.message,
              passwordResetSent: false,
              showError: true,
              resetting: false,
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
            passwordResetSent: false,
            showError: true,
            resetting: false,
          });
        });
    }
  };

  render() {
    const {
      email,
      showError,
      errorMessage,
      passwordResetSent,
      resetting,
     } = this.state;

    if(passwordResetSent){
      return (
        <div>
          <HeaderBar title={title}/>
          <div className="congratsWrapper">
            <Typography variant="h6" align="center">
              Password recovery email sent, please check your email
            </Typography>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.sendEmail}>
            <p></p>
            <TextField
              style={inputStyle}
              id="email"
              label="email"
              value={email}
              onChange={this.handleChange('email')}
              placeholder="Email Address"
            />
            {showError && (
              <div>
                <p>
                  {errorMessage}
                </p>
              </div>
            )}
            {resetting === true && (
              <p><CircularProgress color="primary"/></p>
            )}
            {resetting !== true && (
              <p><SubmitButtons
                buttonStyle={forgotButton}
                buttonText={'Reset Password'}
              /></p>
            )}
          </form>
        </div>
      );
    }
  }
}

export default ForgotPassword;
