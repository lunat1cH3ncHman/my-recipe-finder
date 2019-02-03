import React, { Component } from 'react';
import {
  HeaderBar,
  LinkButtons,
  loginButton,
  registerButton,
} from '../components';

const title = {
  pageTitle: 'My Recipe Store',
};

const welcome = {
  margin: '1em',
  fontSize: '24px',
};

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <HeaderBar title={title} />
        <p></p>
        <div style={welcome}>
          <p>Welcome to My Recipe Store</p>
          <p>The best place to store all your recipes from your favourite websites, recipe books or notebooks!</p>
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
