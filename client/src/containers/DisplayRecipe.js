import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {
  HeaderBar,
  loadingStyle,
} from '../components';

const title = {
  pageTitle: 'My Recipe Store   // Recipe',
};

const genericErrorMessage = 'Sorry, something went wrong please check your network connection and try again';

class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      recipetitle: String,
      image: String,
      ingredients: String,
      instructions: String,
      sourceurl: String,
      email: '',
      isLoading: true,
      loadingError: false,
      errormessage: false,
    };
  }

  async componentDidMount() {
    let accessString = localStorage.getItem('JWT');
    if (accessString == null) {
      this.setState({
        isLoading: false,
        loadingError: true,
        errorMessage: "Sorry, please login again",
      });
    } else {
      await axios
        .get('/getRecipe', {
          params: {
            username: this.props.match.params.username,
            recipeid: this.props.match.params.recipeid,
          },
          headers: { Authorization: `JWT ${accessString}` },
        })
        .then(response => {
          if (response.status === 200) {
            this.setState({
              recipetitle: response.data.title,
              ingredients: response.data.ingredients,
              instructions: response.data.instructions,
              sourceurl: response.data.sourceurl,
              isLoading: false,
              loadingError: false,
            });
          } else {
            this.setState({
              errorMessage: response.data.message,
              isLoading: false,
              loadingError: true,
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
              isLoading: false,
              loadingError: true,
          });
        });
      }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const {
      width,
      recipetitle,
      ingredients,
      instructions,
      sourceurl,
      loadingError,
      isLoading,
      errormessage,
    } = this.state;

    const isMobile = width <= 500;

    if (loadingError) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>
            {errormessage}
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>Loading your recipe...</div>
        </div>
      );
    } else {
      if (isMobile) {
        return (
          <div>
            <HeaderBar title={title} />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>{recipetitle}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{ingredients}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{instructions}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{sourceurl}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );
      } else {
        return (
          <div>
            <HeaderBar title={title} />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>{recipetitle}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{ingredients}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{instructions}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{sourceurl}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );
      }
    }
  }
}

export default Recipe;
