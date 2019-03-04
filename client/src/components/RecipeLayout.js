import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

// https://material-ui.com/getting-started/page-layout-examples/
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// https://material-ui.com/api/grid/
// https://material-ui.com/system/flexbox/

const styles = theme => ({
  layout: {
    // width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    // [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
    //   width: 1100,
      // marginLeft: 'auto',
      // marginRight: 'auto',
    // },
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
    maxWidth: 800,
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    // marginTop: theme.spacing.unit * 3,
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
  cardTitleDivider: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 10,
  },
  contentSpace: {
    padding: theme.spacing.unit * 3,
    container: true,
    // display: 'inline-flex',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // wrap: 'wrap',
  },
  ingredients: {
    flex: 1,
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 6,
  },
  instructions: {
    flex: 1,
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 6,
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
  var linkBase = "http://";
  var webLink = props.sourceurl;

  if (!webLink.includes(linkBase)){
    webLink = linkBase.concat(webLink);
  }

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
                    {/* Title */}
                    <div>
                      <Typography variant="h4">
                        {props.recipetitle}
                      </Typography>
                      <Divider className={classes.cardTitleDivider} variant="middle"/>
                    </div>
                      <Typography variant="subtitle1" color="textSecondary">
                        {props.date}
                      </Typography>
                    <div className={classes.contentSpace}>
                      {/* Ingredients */}
                      <div className={classes.ingredients}>
                        <Typography variant="h5" align="left">
                          Ingredients
                        </Typography>
                        <Typography variant="subtitle1" align="left" paragraph >
                          {props.ingredients.map(text => <p>{text}</p>)}
                        </Typography>
                      </div>
                      {/* Instructions */}
                      <div className={classes.instructions}>
                        <Typography variant="h5" align="left">
                          Instructions
                        </Typography>
                        <Typography variant="subtitle1" align="left" paragraph>
                          {props.instructions.map(text => <p>{text}</p>)}
                        </Typography>
                      </div>
                    </div>
                    {/* Website link */}
                    <Typography variant="subtitle1" color="primary">
                      <a href={webLink}>{props.sourceurl}</a>
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
        <Typography color="orange" variant="h6" gutterBottom>
          Love SatsumaSpoon?
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Help us make it even better
        </Typography>
        <p><a href="mailto:support@satsumaspoon.com">Feedback</a></p>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

RecipeLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeLayout);
