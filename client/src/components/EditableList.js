import React from "react";
import ListItem from "./ListItem";
import PropTypes from "prop-types";

const EditableList = props => {
  return (
    <ul>
      {props.list.map((item, index) => (
        <ListItem
          key={index}
          item={item.name}
          isEditing={item.isEditing}
          handleRemove={() => props.handleRemove(item.id)}
          toggleIsEditingAt={() => props.toggleIsEditingAt(item.id)}
          setName={text => props.setNameAt(text, item.id)}
        />
      ))}
    </ul>
  );
};

EditableList.propTypes = {
  list: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired,
  toggleIsEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired
};

export default EditableList;
