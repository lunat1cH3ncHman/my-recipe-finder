import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core'

import {
  LinkButtons,
  updateButton,
  loginButton,
  HeaderBar,
  loadingStyle,
} from '../components';

const list = {
  marginLeft: '20%',
  marginRight: '20%',
  fontSize: '18px',
};

const title = {
  pageTitle: 'My Recipe Store   // My Recipes',
};

class MyRecipes extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      id: 0,
      idToDelete: null,
      idToUpdate: null,
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    let accessString = localStorage.getItem('JWT');
    if (accessString == null) {
      this.setState({
        isLoading: false,
        error: true,
      });
    } else {
      await axios.get('/getRecipes', {
        params: {
          username: this.props.match.params.username,
        },
        headers: { Authorization: `JWT ${accessString}` },
      })
      .then(response => {
        if (response.status === 200){
          this.setState({
            recipes: response.data.recipes,
            isLoading: false,
            error: false,
          });
        }else{
          this.setState({
            isLoading: false,
            error: true,
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
    }
  }

  logout = e => {
    e.preventDefault();
    localStorage.removeItem('JWT');
  };

  handleClick = (e) => {
    console.log(e);
    this.props.history.push(`/DisplayRecipe/${this.props.match.params.username}/${e}`);
  };

  render() {
    const {
      recipes,
      error,
      isLoading,
      deleted,
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>
            Problem fetching your recipes. Please try logging in again.
          </div>
          <LinkButtons
            buttonText={`Login`}
            buttonStyle={loginButton}
            link={'/login'}
          />
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>Loading Recipes...</div>
        </div>
      );
    } else if (deleted) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <HeaderBar title={title} />
          <p></p>
          <LinkButtons
            buttonStyle={updateButton}
            buttonText={'Add a Recipe'}
            link={`/addRecipe/${this.props.match.params.username}`}
          />
          <div>
            <List>
              { recipes.map(({ _id, title}) =>
                <ListItem key={_id}>
                    <ListItemText
                      style={list}
                      primary={title}
                      button
                      onClick={this.handleClick.bind(this, _id)}
                    />
                </ListItem>
              )}
            </List>
          </div>
        </div>
      );
    }
  }
}

export default MyRecipes;
