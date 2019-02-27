import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./MyRecipe.css";

import {
  HeaderBar,
  LinkButtons,
  updateButton,
  cancelButton,
  actionButton,
  recipeInputStyle,
  AddItem,
  EditableList,
} from '../components';

const title = {
  pageTitle: 'SatsumaSpoon',
};

const genericErrorMessage = 'Sorry, something went wrong please check your network connection and try again';
const accessMessage = 'Sorry, something went wrong please try logging in again';
const emptyRecipName = 'Recipes need names, they get upset otherwise';

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
      errorMessage: '',
      pendingIngredient: '',
      addingRecipe: false,
      updated: false,
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
      errorMessage: '',
      pendingIngredient: '',
      pendingInstruction: '',
    });
  }

  lastItemId = 0;

  newItemId = () => {
    const id = this.lastItemId;
    this.lastItemId += 1;
    return id;
  };

  handleIngredientInput = e => {
    this.setState({
      pendingIngredient: e.target.value
    });
  }

  handleInstructionInput = e => {
    this.setState({
      pendingInstruction: e.target.value
    });
  }

  newIngredientSubmitHandler = e => {
    e.preventDefault();
    const id = this.newItemId();
    if (this.state.pendingIngredient !== ""){
      this.setState({
        ingredients: [
          ...this.state.ingredients,
          {
            name: this.state.pendingIngredient,
            isEditing: false,
            id
          },
        ],
        pendingIngredient: ""
      });
    }
  };

  newInstructionSubmitHandler = e => {
    e.preventDefault();
    const id = this.newItemId();
    if (this.state.pendingInstruction !== ""){
      this.setState({
        instructions: [
          ...this.state.instructions,
          {
            name: this.state.pendingInstruction,
            isEditing: false,
            id
          },
        ],
        pendingInstruction: ""
      });
    }
  };

  handleRemoveIngredient = id => {
    this.setState({
      ingredients: this.state.ingredients.filter(item => id !== item.id)
    });
  };

  handleRemoveInstructions = id => {
    this.setState({
      instructions: this.state.instructions.filter(item => id !== item.id)
    });
  };

  setIngredientAt = (name, id) => {
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

  setInstructionAt = (name, id) => {
    this.setState({
      instructions: this.state.instructions.map(item => {
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

  toggleIsEditingIngredientAt = id => {
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

  toggleIsEditingInstructionAt = id => {
    this.setState({
      instructions: this.state.instructions.map(item => {
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

    this.setState({
      errorMessage: '',
    });

    if (accessString === null) {
      this.setState({
        errorMessage: emptyRecipName,
      });
    } else if(this.state.recipeTitle === '') {
      console.log('empty recipeTitle');
      this.setState({
        errorMessage: emptyRecipName,
      });
    } else {
      this.setState({
        addingRecipe: true
      });

      axios.post('/addRecipe',
      {
//         var ingredients = items.map(function(item) {
//   return item['name'];
// });
        username: this.props.match.params.username,
        recipeTitle: this.state.recipeTitle,
        image: this.state.image,
        ingredients: this.state.ingredients.map((item) => {return item['name']}),
        instructions: this.state.instructions.map((item) => {return item['name']}),
        sourceurl: this.state.sourceurl,},
      {
        headers: { Authorization: `JWT ${accessString}` },
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            addingRecipe: false,
            updated: true,
          });
        } else {
          this.setState({
            errorMessage: response.data.message,
            addingRecipe: false,
          });
        }
      })
      .catch(error => {
        if (typeof(error.response) == 'undefined' ||
            typeof(error.response.data) == 'undefined') {
          this.setState({
            errorMessage: genericErrorMessage
          });
        } else {
          this.setState({
            errorMessage: error.response.data,
          });
        }
        this.setState({
          addingRecipe: false,
        });
      });
    }
  };

  render() {
    const {
      recipeTitle,
      sourceurl,
      updated,
      errorMessage,
      addingRecipe,
    } = this.state;

    if (updated) {
      return (
        <div className="background">
          <HeaderBar title={title} />
          <div classname="wrapper">
            <p><h2>Hoorah! {this.state.recipeTitle} has been added to your recipes!</h2></p>
             <p>What would you like to do now?</p>
            <LinkButtons
              buttonStyle={updateButton}
              onClick={() => { this.reset(); }}
              buttonText={'Add another'} />
            <LinkButtons
              buttonStyle={updateButton}
              buttonText={'Back Recipes'}
              link={`/myRecipes/${this.props.match.params.username}`}/>
          </div>
        </div>
      );
    } else {
      return (
       <div className="background">
        <HeaderBar title={title} />
        <div className="wrapper">
          <h3 className="title">Recipe Name</h3>
          <TextField
            id="recipeTitle"
            value={recipeTitle}
            onChange={this.handleChange('recipeTitle')}
            placeholder="Title"
          />
          <h3 className="title">Ingredients</h3>
          <EditableList
            list={this.state.ingredients}
            handleRemove={this.handleRemoveIngredient}
            toggleIsEditingAt={this.toggleIsEditingIngredientAt}
            setNameAt={this.setIngredientAt}
          />
          <AddItem
            className="input"
            type="text"
            handleItemInput={this.handleIngredientInput}
            newItemSubmitHandler={this.newIngredientSubmitHandler}
            value={this.state.pendingIngredient}
            placeHolder="Add an ingredient"
            pendingItem={this.state.pendingIngredient}
          />
          <h3 className="title">Instructions</h3>
          <EditableList
            list={this.state.instructions}
            handleRemove={this.handleRemoveInstructions}
            toggleIsEditingAt={this.toggleIsEditingInstructionAt}
            setNameAt={this.setInstructionAt}
          />
          <AddItem
            className="input"
            type="text"
            handleItemInput={this.handleInstructionInput}
            newItemSubmitHandler={this.newInstructionSubmitHandler}
            value={this.state.pendingInstruction}
            placeHolder="Add a step"
            pendingItem={this.state.pendingInstruction}
          />
          <h3 className="title">Website Link</h3>
          <TextField
            style={recipeInputStyle}
            id="sourceurl"
            label="Website link"
            value={sourceurl}
            onChange={this.handleChange('sourceurl')}
            placeholder="Website link"
          />
          <div>
            {addingRecipe === true && (
              <p><CircularProgress color="secondary"/></p>
            )}
            <p>{errorMessage}</p>
          </div>
          <Button
            style={actionButton}
            size="medium"
            onClick={this.addRecipe}>
            Save Recipe
          </Button>
          <LinkButtons
            buttonStyle={cancelButton}
            buttonText={'Cancel'}
            link={`/myRecipes/${this.props.match.params.username}`}
          />
        </div>
      </div>
    );
    }
  }
}

export default AddRecipe;
