import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core'

import {
  LinkButtons,
  updateButton,
  loginButton,
  HeaderBar,
} from '../components';

const loading = {
  margin: '1em',
  fontSize: '24px',
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
        this.setState({
          recipes: response.data.recipes,
          isLoading: false,
          error: false,
        });
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

  _handleListItemClick(event){
   console.log('handle clicked');
  }

  render() {
    const {
      recipes,
      username,
      error,
      isLoading,
      deleted,
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>
            Problem fetching your recipes. Please login again.
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
          <div style={loading}>Loading Recipes...</div>
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
              { recipes.map(({ id, message }) =>
                <ListItem
                  key={id}
                  onTouchTap={(event) => this._handleListItemClick(event)}>
                    <ListItemText
                      primary={message}
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
