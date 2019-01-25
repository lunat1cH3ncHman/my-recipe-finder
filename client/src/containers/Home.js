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

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <HeaderBar title={title} />
        <p></p>
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
