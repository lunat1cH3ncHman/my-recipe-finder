import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// https://material-ui.com/getting-started/page-layout-examples/

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
  cardGrid: {
    alignContent: 'center',
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    maxWidth: 1000,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
  },
  cardDetails: {
    primary: 'orange',
    flex: 1,
  },
  cardMedia: {
    marginTop: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    width: theme.spacing.unit * 16,
    height: theme.spacing.unit * 16,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  contentSpace: {
    padding: theme.spacing.unit * 3,
    container: true,
    display: 'inline-flex',
    wrap: 'wrap',
    alignContent: 'space-between',
  },
  ingredients: {
    padding: theme.spacing.unit * 2,
  },
  instructions: {
    padding: theme.spacing.unit * 2,
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

function RecipeLayout(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <main>
          <Grid align="center" className={classes.cardGrid}>
            <Grid item key={props.recipetitle} >
              <Card className={classes.card} >
                <div className={classes.cardDetails} >
                  <CardContent>
                    <div>
                      <Typography component="h1" variant="h3" color='orange'>
                        {props.recipetitle}
                      </Typography>
                    </div>
                      <Typography variant="subtitle1" color="textSecondary">
                        {props.date}
                      </Typography>
                    <div className={classes.contentSpace}>
                      <div className={classes.ingredients}>
                        <Typography component="h2" variant="h5" align="left" paragraph >
                          Ingredients
                        </Typography>
                        <Typography variant="subtitle1" align="left" paragraph >
                          {props.ingredients.map(text => <p>{text}</p>)}
                        </Typography>
                      </div>
                      <div className={classes.instructions}>
                        <Typography component="h2" variant="h5" align="left" paragraph >
                          Instructions
                        </Typography>
                        <Typography variant="subtitle1" align="left" paragraph>
                          {props.instructions.map(text => <p>{text}</p>)}
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="subtitle1" color="primary">
                      Edit
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
          </Grid>
        </main>
      </div>
      {/* Footer */}
      <footer className={classes.footer} >
        <Typography colour="orange" variant="h6" gutterBottom>
          Love SatsumaSpoon? Please help us keep the service Advert Free
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
