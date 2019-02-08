import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// https://material-ui.com/getting-started/page-layout-examples/

import {
  HeaderBar,
} from '../components';

const styles = theme => ({
  layout: {
    width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: 'theme.palette.common.white',
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 4,
    padding: `${theme.spacing.unit * 4}px 0`,
  },
});

// {posts.map(post => (
//   <Markdown className={classes.markdown} key={post.substring(0, 40)}>
//     {post}
//   </Markdown>
// ))}

const social = ['GitHub', 'Twitter', 'Facebook'];

function RecipeLayout(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <main>
          {/* Sub featured posts */}
          <Grid container spacing={40} className={classes.cardGrid}>
            <Grid item key={props.recipetitle} >
              <Card className={classes.card} >
                <div className={classes.cardDetails} >
                  <CardContent>
                    <Typography component="h1" variant="h3" colour="orange">
                      {props.recipetitle}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {props.date}
                    </Typography>
                    <Typography component="h2" variant="h5" align="left" paragraph >
                      Ingredients
                    </Typography>
                    <Typography variant="subtitle1" align="left" paragraph >
                      {props.ingredients}
                    </Typography>
                    <Typography variant="subtitle1" align="left" paragraph>
                      {props.instructions}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Continue reading...
                    </Typography>
                  </CardContent>
                </div>
                <Hidden xsDown>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://www.sciencedaily.com/images/2018/07/180712100504_1_540x360.jpg" // eslint-disable-line max-len
                    title="Image title"
                  />
                </Hidden>
              </Card>
            </Grid>
          </Grid>
        </main>
      </div>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography colour="orange" variant="h6" align="center" gutterBottom>
          Love My Recipe Store? Please help us keep the service Advert Free
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          We've never passed your data to third parties and we never want to
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
           Please help us keep it that way by upgrading or donating
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

RecipeLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeLayout);
