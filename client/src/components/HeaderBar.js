import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

import {
  LinkButtons,
  secondOptionButton,
} from '../components';


const headerStyle = {
  background: 'orange',
  color: 'white',
};

class HeaderBar extends Component {
  render() {
    const { title, username} = this.props;
    return (
      <div className="header">
        <AppBar position="static" color="default" style={headerStyle}>
          <Toolbar>
            <Link
              variant="title"
              color="inherit"
              component={RouterLink}
              style={{ textDecoration: 'none' }}
              to={`/myRecipes/${username}`}>
                SatsumaSpoon
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default HeaderBar;
