import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { addButton } from './ButtonStyles';

const styles = theme => ({
  layout: {
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  itemEntry: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'flex-start',
  },
  buttonSection: {
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
});

const AddItem = props => {
  const { classes } = props;
  return (
    <div className={classes.layout}>
      <form onSubmit={props.newItemSubmitHandler}>
        <div className={classes.itemEntry}>
          <TextField
            required
            id="item"
            fullWidth
            margin="normal"
            onChange={props.handleItemInput}
            value={props.pendingItem}
            placeholder={props.placeHolder}
          />
          <div className={classes.buttonSection}>
            <button style={addButton} type="submit" name="submit" value="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddItem.propTypes = {
  classes: PropTypes.object.isRequired,
  newItemSubmitHandler: PropTypes.func.isRequired,
  handleItemInput: PropTypes.func.isRequired,
  pendingItem: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired
};

export default withStyles(styles)(AddItem);
