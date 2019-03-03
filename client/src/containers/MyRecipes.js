import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  LinkButtons,
  updateButton,
  loginButton,
  HeaderBar,
  loadingStyle,
} from '../components';

const list = {
  marginLeft: '0%',
  marginRight: '0%',
  fontSize: '40px',
};

const listTitle = {
  marginBottom: '40%',
};

const title = {
  pageTitle: 'SatsumaSpoon',
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
          <div style={loadingStyle}>
            Loading Recipes...
            <p><CircularProgress color="primary"/></p>
          </div>
        </div>
      );
    } else if (deleted) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="background">
          <HeaderBar title={title} />
          <p></p>
          <LinkButtons
            buttonStyle={updateButton}
            buttonText={'Add a Recipe'}
            link={`/addRecipe/${this.props.match.params.username}`}
          />
          <div className="wrapper">
            <div className="listTitle">
              <Typography variant="h5" align="center" component="p">
                My Recipes
              </Typography>
            </div>
            <List className="list">
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
