import React from "react";
import PropTypes from "prop-types";

import { loginButton } from './ButtonStyles';

const AddItem = props => {
  return (
    <form onSubmit={props.newItemSubmitHandler}>
      <div>
        <input
          type="text"
          onChange={props.handleItemInput}
          value={props.pendingItem}
          placeholder={props.placeHolder}
        />
        <button style={loginButton} type="submit" name="submit" value="submit">
          Add
        </button>
      </div>
    </form>
  );
};

AddItem.propTypes = {
  newItemSubmitHandler: PropTypes.func.isRequired,
  handleItemInput: PropTypes.func.isRequired,
  pendingItem: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired
};

export default AddItem;
