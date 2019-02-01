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
          <div style={loading}>
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
              { recipes.map(({ _id, title}) =>
                <ListItem key={_id}>
                    <ListItemText
                      primary={title}
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
