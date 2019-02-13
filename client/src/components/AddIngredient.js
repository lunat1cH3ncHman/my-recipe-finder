import React from "react";
import PropTypes from "prop-types";

const AddIngredient = props => {
  return (
    <form className="ingredientInput" onSubmit={props.newIngredientSubmitHandler}>
      <input
        className="input"
        type="text"
        onChange={props.handleItemInput}
        value={props.pendingItem}
        placeholder="Add an item"
      />
      <button type="submit" name="submit" value="submit">
        add
      </button>
    </form>
  );
};

AddIngredient.propTypes = {
  newIngredientSubmitHandler: PropTypes.func.isRequired,
  handleItemInput: PropTypes.func.isRequired,
  pendingItem: PropTypes.string.isRequired
};

export default AddIngredient;
