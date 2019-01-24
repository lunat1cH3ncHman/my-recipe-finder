import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const headerStyle = {
  background: 'blue',
  color: 'white',
};

class HeaderBar extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="header">
        <AppBar position="static" color="default" style={headerStyle}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              {title.pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default HeaderBar;
