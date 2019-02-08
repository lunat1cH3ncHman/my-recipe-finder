import React, { Component } from 'react';
import {
  HeaderBar,
  LinkButtons,
  loginButton,
  registerButton,
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

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <HeaderBar title={title} />
        <p></p>
        <div style={welcome}>
          <p>Welcome to SatsumaSpoon</p>
          <p style={intro}>The best place to store all your recipes from your favourite websites, recipe books or notebooks!</p>
        </div>
        <LinkButtons
          buttonText={`Register`}
          buttonStyle={registerButton}
          link={`/register`}
        />
        <LinkButtons
          buttonText={`Login`}
          buttonStyle={loginButton}
          link={`/login`}
        />
      </div>
    );
  }
}

export default Home;
