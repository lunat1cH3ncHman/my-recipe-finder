import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {
  LinkButtons,
  deleteButton,
  updateButton,
  loginButton,
  logoutButton,
  HeaderBar,
  linkStyle,
} from '../components';

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'My Recipe Store   // My Profile',
};

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      isLoading: true,
      deleted: false,
      error: false,
    };
  }

  async componentDidMount() {
    let accessString = localStorage.getItem('JWT');
    console.log(`Profile access string = ${accessString}`);
    if (accessString == null) {
      this.setState({
        isLoading: false,
        error: true,
      });
    } else {
      await axios
        .get('/findUser', {
          params: {
            username: this.props.match.params.username,
          },
          headers: { Authorization: `JWT ${accessString}` },
        })
        .then(response => {
          this.setState({
            email: response.data.email,
            username: response.data.username,
            isLoading: false,
            error: false,
          });
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  }

  deleteUser = e => {
    let accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true,
      });
    }

    e.preventDefault();
    axios
      .delete('/deleteUser', {
        params: {
          username: this.props.match.params.username,
        },
        headers: { Authorization: `JWT ${accessString}` },
      })
      .then(response => {
        console.log(response.data);
        localStorage.removeItem('JWT');
        this.setState({
          deleted: true,
        });
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  logout = e => {
    e.preventDefault();
    localStorage.removeItem('JWT');
  };

  render() {
    const {
      email,
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
            Problem fetching user data. Please login again.
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
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    } else if (deleted) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <HeaderBar title={title} />
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>{username}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <LinkButtons
            buttonStyle={updateButton}
            buttonText={'Update User'}
            link={`/updateUser/${username}`}
          />
          <LinkButtons
            buttonStyle={updateButton}
            buttonText={'Update Password'}
            link={`/updatePassword/${username}`}
          />
          <Button
            style={logoutButton}
            variant="contained"
            color="primary"
            onClick={this.logout}
          >
            <Link style={linkStyle} to={'/'}>
              Logout
            </Link>
          </Button>
          <Button
            style={deleteButton}
            variant="primary"
            color="red"
            onClick={this.deleteUser}
          >
            Delete User
          </Button>
        </div>
      );
    }
  }
}

export default Profile;
