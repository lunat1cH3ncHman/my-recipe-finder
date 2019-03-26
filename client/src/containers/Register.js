import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactGA from 'react-ga';

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  inputStyle,
  updateButton,
  HeaderBar,
} from '../components';

const title = {
  pageTitle: 'SatsumaSpoon',
};

const welcome = {
  margin: '1em',
  fontSize: '24px',
};

const intro = {
  margin: '1em',
  fontSize: '18px',
};

const terms = {
  margin: '1em'
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
      registering: false,
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
      axios.post('/registerUser', {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        if (response.status === 200) {
          ReactGA.event({
            category: 'User',
            action: 'Registered'
          });
          localStorage.setItem('JWT', response.data.token);
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

  componentDidMount() {
    ReactGA.pageview("/Register");
  }

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
      registering,
    } = this.state;

    if (!registered) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={welcome}>
            <p>Welcome to SatsumaSpoon</p>
            <p style={intro}>Collect your favourite recipes from websites, recipe books and scraps of paper!</p>
          </div>
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
            {registering === true && (
              <div className="loadingAnimation">
                <CircularProgress color="primary"/>
              </div>
            )}
            {registering !== true && (
              <div>
                {showError === true && registerError === true && (
                  <p>Username, password and email are required fields.</p>
                )}
                {showError === true && loginError === true && (
                  <p>{errorMessage}</p>
                )}
                <p><SubmitButtons
                  buttonStyle={registerButton}
                  buttonText={'Register'}
                /></p>
                <div style={intro}>
                  Aleady registered? <Link to="/login">Login</Link>
                </div>
              </div>
            )}
          </form>
          <div>
            <p><Divider variant="middle"/></p>
          </div>
          {registering !== true && (
            <div style={terms}>
              <p>By signing up, you agree to our <Link to="/terms">Terms</Link>, <Link to="/terms">Privacy Policy</Link> and <Link to="/terms">Cookie Use</Link></p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <HeaderBar title={title} />
            <div className="congratsWrapper">
            <Typography variant="h5" align="center">
              Welcome to SatsumaSpoon {username}
            </Typography>
            <p>Start adding your favourite recipes today!</p>
            <p></p>
            <LinkButtons
              buttonText={`Add Recipe`}
              buttonStyle={updateButton}
              link={`/addRecipe/${username}`}
            />
          </div>
        </div>
      );
    }
  }
}

export default Register;
