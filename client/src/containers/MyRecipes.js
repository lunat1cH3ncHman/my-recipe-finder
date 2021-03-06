import React, { Component } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ReactGA from 'react-ga';
import Responsive from 'react-responsive'
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
  fontSize: '60px',
};

const style = {
    margin: 0,
    top: 'auto',
    right: 30,
    bottom: 40,
    background: 'orange',
    color: 'white',
    left: 'auto',
    position: 'fixed',
};

const title = {
  pageTitle: 'SatsumaSpoon',
};

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

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

  handleEdit = (e) => {
    console.log(e);
    this.props.history.push(`/AddRecipe/${this.props.match.params.username}/${e}`);
  };

  handleAddRecipeClick = () => {
    this.props.history.push(`/addRecipe/${this.props.match.params.username}`);
  }

  render() {
    const {
      recipes,
      error,
      isLoading,
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
        <Mobile>
          <div>
            <HeaderBar title={title} />
            <div style={loadingStyle}>
              Loading Recipes...
              <div className="loadingAnimation">
                <CircularProgress color="primary"/>
              </div>
            </div>
          </div>
        </Mobile>
        <Default>
        <div className="background">
          <HeaderBar title={title} />
          <div style={loadingStyle}>
            Loading Recipes...
            <div className="loadingAnimation">
              <CircularProgress color="primary"/>
            </div>
          </div>
        </div>
        </Default>
        </div>
      );
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
        <div>
          <Mobile>
            <HeaderBar title={title}/>
            <div className="mobileRecipeListTitle">
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
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Edit">
                        <EditIcon onClick={this.handleEdit.bind(this, _id)}/>
                      </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
            <Fab
              aria-label="Add"
              className="classes.fab"
              style={style}
              onClick={this.handleAddRecipeClick}>
              <AddIcon />
            </Fab>
          </Mobile>
          <Default>
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
                    <div>
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
                            <ListItemSecondaryAction>
                              <IconButton aria-label="Edit">
                                <EditIcon onClick={this.handleEdit.bind(this, _id)}/>
                              </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </List>
                  </Paper>
                </div>
              </div>
            </div>
          </Default>
        </div>
      );
    }
  }
}

export default MyRecipes;
