import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ReactGA from 'react-ga';

import {
  LinkButtons,
  updateButton,
  loginButton,
  HeaderBar,
  loadingStyle,
} from '../components';

const list = {
  marginLeft: '6%',
  marginRight: '0%',
  fontSize: '40px',
};

const title = {
  pageTitle: 'SatsumaSpoon',
};

const genericErrorMessage = 'Sorry, something went wrong. Please check your network connection and try logging in again';

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
      errorMessage: '',
    };
  }

  async componentDidMount() {
    let accessString = localStorage.getItem('JWT');

    ReactGA.pageview("/MyRecipes");

    if (accessString == null) {
      this.setState({
        errorMessage: genericErrorMessage,
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
            errorMessage: response.data.message,
            isLoading: false,
            error: true,
          });
        }
      })
      .catch(error => {
        if (typeof(error.response) == 'undefined' ||
            typeof(error.response.data) == 'undefined') {
          this.setState({
            errorMessage: genericErrorMessage,
            error: true,
          });
        } else {
          this.setState({
            errorMessage: error.response.data,
            error: true,
          });
        }
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
      errorMessage,
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>
            {errorMessage}
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
            <div className="loadingAnimation">
              <CircularProgress color="primary"/>
            </div>
          </div>
        </div>
      );
    } else if (deleted) {
      return <Redirect to="/" />;
    } else if (recipes.length === 0) {
      return(
        <div>
          <HeaderBar title={title} />
          <p><Typography variant="h6" align="center">
            It doesn't look like you've added any recipes yet
          </Typography></p>
          <p><Typography variant="h6" align="center">
            Why not add some today!
          </Typography></p>
          <LinkButtons
            buttonStyle={updateButton}
            buttonText={'Add a Recipe'}
            link={`/addRecipe/${this.props.match.params.username}`}
          />
        </div>
      )
    }
    else {
      return (
        <div className="background">
          <HeaderBar title={title} />
          <p></p>
          <LinkButtons
            buttonStyle={updateButton}
            buttonText={'Add a Recipe'}
            link={`/addRecipe/${this.props.match.params.username}`}
          />
          <div className="backgroundWrapper">
            <div className="wrapper">
              <Paper elevation={1}>
                <div className="listTitle">
                  <p></p>
                    <Typography variant="h5" align="center" component="p">
                      My Recipes
                    </Typography>
                  <p></p>
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
              </Paper>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default MyRecipes;
