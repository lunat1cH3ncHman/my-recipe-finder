import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import ReactGA from 'react-ga';

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
        if (response.data.message === 'password reset link a-ok') {
          this.setState({
            username: response.data.username,
            update: false,
            isLoading: false,
            error: false,
          });
        } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true,
          });
        }
      })
      .catch(error => {
        console.log(error.data);
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
        console.log(response.data);
        if (response.data.message === 'password updated') {
          this.setState({
            updated: true,
            error: false,
          });
        } else {
          this.setState({
            updated: false,
            error: true,
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  render() {
    const { password, error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>
            <h4>Problem resetting password. Please send another reset link.</h4>
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
          <div style={loadingStyle}>Loading User Data...</div>
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
