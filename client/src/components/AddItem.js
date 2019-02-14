import React from "react";
import PropTypes from "prop-types";

const AddItem = props => {
  return (
    <form className="ingredientInput" onSubmit={props.newItemSubmitHandler}>
      <input
        className="input"
        type="text"
        onChange={props.handleItemInput}
        value={props.pendingItem}
        placeholder={props.placeHolder}
      />
      <button type="submit" name="submit" value="submit">
        add
      </button>
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
