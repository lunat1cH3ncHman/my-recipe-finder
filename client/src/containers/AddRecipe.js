import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import { List, ListItem, ListItemText } from '@material-ui/core'

import {
  SubmitButtons,
  HeaderBar,
  loginButton,
  LinkButtons,
  updateButton,
  cancelButton,
  saveButton,
  recipeInputStyle,
  AddIngredient,
  EditableList,
} from '../components';

const title = {
  pageTitle: 'SatsumaSpoon',
};

class AddRecipe extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      recipeTitle: '',
      image: '',
      ingredients: [],
      instructions: [],
      sourceurl: '',
      pendingItem: '',
      addingRecipe: false,
      updated: false,
      error: false,
      emptyTitleError: false,
    };
  }

  componentDidMount() {
    let accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        error: true,
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  reset() {
    this.setState({
      username: '',
      recipeTitle: '',
      image: '',
      ingredients: '',
      instructions: '',
      sourceurl: '',
      addingRecipe: false,
      updated: false,
      pendingItem: '',
      error: false,
      emptyTitleError: false,
    });
  }

  lastItemId = 0;

  newItemId = () => {
    const id = this.lastItemId;
    this.lastItemId += 1;
    return id;
  };

  handleItemInput = e => {
    this.setState({
      pendingItem: e.target.value
    });
  }

  newIngredientSubmitHandler = e => {
    e.preventDefault();
    const id = this.newItemId();
    if (this.state.pendingItem != ""){
      this.setState({
        ingredients: [
          ...this.state.ingredients,
          {
            name: this.state.pendingItem,
            isEditing: false,
            id
          },
        ],
        pendingItem: ""
      });
    }
  };

  handleRemoveIngredient = id => {
    this.setState({
      ingredients: this.state.ingredients.filter(item => id !== item.id)
    });
  };

  setNameAt = (name, id) => {
    this.setState({
      ingredients: this.state.ingredients.map(item => {
        if (id === item.id) {
          return {
            ...item,
            name
          };
        }
        return item;
      })
    });
  };

  toggleIsEditingAt = id => {
    this.setState({
      ingredients: this.state.ingredients.map(item => {
        if (id === item.id) {
          return {
            ...item,
            isEditing: !item["isEditing"]
          };
        }
        return item;
      })
    });
  };

  addRecipe = e => {
    e.preventDefault();
    let accessString = localStorage.getItem('JWT');

    if (accessString === null) {
      this.setState({
        addingRecipe: false,
        error: true,
      });
    } else if(this.state.recipeTitle === '') {
      console.log('empty recipeTitle');
      this.setState({
        emptyTitleError: true
      });
    } else {
      this.setState({
        addingRecipe: true
      });

      axios
        .post(
          '/addRecipe',
          {
            username: this.props.match.params.username,
            recipeTitle: this.state.recipeTitle,
            image: this.state.image,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            sourceurl: this.state.sourceurl,
          },
          {
            headers: { Authorization: `JWT ${accessString}` },
          },
        )
        .then(response => {
          console.log("response");
          if (response.status === 200){
            this.setState({
              addingRecipe: false,
              updated: true,
              error: false,
            });
          }else{
            this.setState({
              addingRecipe: false,
              error: true,
            });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
      }
  };

  render() {
    const {
      recipeTitle,
      ingredients,
      instructions,
      sourceurl,
      updated,
      error,
      addingRecipe,
      emptyTitleError,
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <p>
            Sorry there was a problem. Please login again.
          </p>
          <LinkButtons
            style={loginButton}
            buttonText={'Go Login'}
            link="/login"
          />
        </div>
      );
    } else if (addingRecipe) {
      return (
        <div>
          <HeaderBar title={title} />
          <p>Adding your recipe...</p>
        </div>
      );
    } else if (updated) {
      return (
        <div>
          <HeaderBar title={title} />
          <p>Hoorah! Your recipe has been added, do you want to add another one?</p>
          <Button
            style={updateButton}
            variant="contained"
            color="primary"
            onClick={() => { this.reset(); }}
          >Add another</Button>
          <LinkButtons
            buttonStyle={updateButton}
            buttonText={'Back Recipes'}
            link={`/myRecipes/${this.props.match.params.username}`}/>
        </div>
      );
    } else {
      return (
       <div>
        <HeaderBar title={title} />
        <form className="profile-form" onSubmit={this.addRecipe}>
          <p></p>
          <TextField
            style={recipeInputStyle}
            id="recipeTitle"
            label="Recipe name"
            value={recipeTitle}
            onChange={this.handleChange('recipeTitle')}
            placeholder="Recipe name"
          />
          <p></p>
          <div className="wrapper">
            <EditableList
              list={this.state.ingredients}
              handleRemove={this.handleRemoveIngredient}
              toggleIsEditingAt={this.toggleIsEditingAt}
              setNameAt={this.setNameAt}
            />
            <AddIngredient
              className="input"
              type="text"
              handleItemInput={this.handleItemInput}
              newIngredientSubmitHandler={this.newIngredientSubmitHandler}
              value={this.state.pendingItem}
              placeholder="Add an item"
              pendingItem={this.state.pendingItem}
            />
          </div>
          <p></p>
          <TextField
            style={recipeInputStyle}
            id="instructions"
            label="Instructions"
            multiline
            rows="5"
            value={instructions}
            onChange={this.handleChange('instructions')}
            placeholder="Instructions"
          />
          <p></p>
          <TextField
            style={recipeInputStyle}
            id="sourceurl"
            label="Website link"
            value={sourceurl}
            onChange={this.handleChange('sourceurl')}
            placeholder="Website link"
          />
          {emptyTitleError && (
            <div>
              <p>Recipes need names, they will get upset otherwise</p>
            </div>
          )}
          <p></p><SubmitButtons
            buttonStyle={saveButton}
            buttonText={'Save Recipe'}
          />
          <LinkButtons
            buttonStyle={cancelButton}
            buttonText={'Cancel'}
            link={`/myRecipes/${this.props.match.params.username}`}
          />
        </form>
      </div>
    );
    }
  }
}

export default AddRecipe;
