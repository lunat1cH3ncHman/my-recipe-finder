import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ReactGA from 'react-ga';
import Responsive from 'react-responsive'
import { Redirect } from 'react-router-dom';

import {
  HeaderBar,
  LinkButtons,
  updateButton,
  actionButton,
  loginButton,
  secondOptionButton,
  AddItem,
  EditableList,
  loadingStyle,
} from '../components';

const title = {
  pageTitle: 'SatsumaSpoon',
};

const errorMessageStyle = {
  color:'red'
}

const genericErrorMessage = 'Sorry, something went wrong please check your network connection and try again';
const accessMessage = 'Sorry, something went wrong please try logging in again';
const emptyRecipeName = 'Recipes need names, they get upset otherwise';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

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
      savingRecipe: false,
      recipeAdded: false,
      isLoading: true,
      loadError: false,
      editingRecipe: false,
      recipeUpdated: false,
    };
  }

  async componentDidMount() {
    let accessString = localStorage.getItem('JWT');

    ReactGA.pageview("/DisplayRecipe");

    if (accessString == null) {
      this.setState({
        isLoading: false,
        loadingError: true,
        errorMessage: "Sorry, please login again",
        loadError: true
      });
    } else {
      let recipeUserName = this.props.match.params.username;
      let recipeID = this.props.match.params.recipeid;

      if (recipeUserName && recipeID){
        await axios
          .get('/getRecipe', {
            params: {
              username: recipeUserName,
              recipeid: recipeID,
            },
            headers: { Authorization: `JWT ${accessString}` },
          })
          .then(response => {
            if (response.status === 200) {
              let responseIngredients = response.data.ingredients.map(item => {
                const container = {};
                container.name = item;
                container.isEditing = false;
                container.id = this.newItemId();
                return container;
              });

              let responseInstructions = response.data.instructions.map(item => {
                const container = {};
                container.name = item;
                container.isEditing = false;
                container.id = this.newItemId();
                return container;
              });

              this.setState({
                recipeTitle: response.data.title,
                ingredients: [...responseIngredients],
                instructions: responseInstructions,
                sourceurl: response.data.sourceurl,
                isLoading: false,
                loadingError: false,
                editingRecipe: true,
              });
            } else {
              this.setState({
                errorMessage: response.data.message,
                isLoading: false,
                loadingError: true,
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
                isLoading: false,
                loadingError: true,
            });
          });
        } else {
          this.setState({
              isLoading: false,
          });
        }
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
      ingredients: [],
      instructions: [],
      sourceurl: '',
      savingRecipe: false,
      recipeAdded: false,
      errorMessage: '',
      pendingIngredient: '',
      pendingInstruction: '',
      recipeUpdated: false,
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

  saveRecipe = e => {
    var action;
    if(this.state.editingRecipe){
      action = '/editRecipe';
    }else {
      action = '/addRecipe';
    }

    e.preventDefault();
    let accessString = localStorage.getItem('JWT');

    this.setState({
      errorMessage: '',
    });

    if (accessString === null) {
      this.setState({
        errorMessage: accessMessage,
      });
    } else if(this.state.recipeTitle === '') {
      console.log('empty recipeTitle');
      this.setState({
        errorMessage: emptyRecipeName,
      });
    } else {
      this.setState({
        savingRecipe: true
      });

      axios.post(action,
      {
        recipeid: this.props.match.params.recipeid,
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
          ReactGA.event({
            category: 'Recipe',
            action: 'Added'
          });
          if(this.state.editingRecipe){
            this.setState({
              savingRecipe: false,
              recipeUpdated: true,
            });
          } else {
            this.setState({
              savingRecipe: false,
              recipeAdded: true,
            });
          }
        } else {
          this.setState({
            errorMessage: response.data.message,
            savingRecipe: false,
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
          savingRecipe: false,
        });
      });
    }
  };

  render() {
    const {
      recipeTitle,
      sourceurl,
      recipeAdded,
      errorMessage,
      savingRecipe,
      ingredients,
      instructions,
      isLoading,
      loadError,
      recipeUpdated,
    } = this.state;

   if (recipeUpdated){
     return <Redirect to={`/myRecipes/${this.props.match.params.username}`} />;
   } else if (loadError) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>
            {errorMessage}
          </div>
          <LinkButtons
            buttonText={`Login`}
            buttonStyle={loginButton}
            link={'/login'}
          />
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loadingStyle}>
            Loading Recipe...
            <div className="loadingAnimation">
              <CircularProgress color="primary"/>
            </div>
          </div>
        </div>
      );
    } else if (recipeAdded) {
      return (
        <div>
          <HeaderBar title={title} username={this.props.match.params.username}/>
          <div className="congratsWrapper">
            <Typography variant="h5" align="center">
              {recipeTitle} has been added to your recipes
            </Typography>
            <p>
              <Typography variant="h6" align="center">
                What would you like to do now?
              </Typography>
            </p>
            <Button
              style={updateButton}
              variant="contained"
              onClick={() => { this.reset(); }}>
              Add another
            </Button>
            <LinkButtons
              buttonStyle={secondOptionButton}
              buttonText={'Recipes'}
              link={`/myRecipes/${this.props.match.params.username}`}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
        <Mobile>
          <HeaderBar title={title} username={this.props.match.params.username}/>
          <div className="addRecipeWrapper">
            <div className="addRecipeFirstItem">
              <Typography variant="h5" align="left">
                Recipe Name
              </Typography>
              <div className="addRecipeTitle">
                <TextField
                  id="recipeTitle"
                  fullWidth="true"
                  autoFocus="true"
                  value={recipeTitle}
                  onChange={this.handleChange('recipeTitle')}
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="addRecipeItem">
                <Typography variant="h5" align="left">
                  Ingredients
                </Typography>
                {ingredients.length > 0 &&(
                  <EditableList
                    list={ingredients}
                    handleRemove={this.handleRemoveIngredient}
                    toggleIsEditingAt={this.toggleIsEditingIngredientAt}
                    setNameAt={this.setIngredientAt}
                  />
                )}
                <div className="addRecipeIngredients">
                  <AddItem
                    className="input"
                    type="text"
                    handleItemInput={this.handleIngredientInput}
                    newItemSubmitHandler={this.newIngredientSubmitHandler}
                    value={this.state.pendingIngredient}
                    placeHolder="Add an ingredient"
                    pendingItem={this.state.pendingIngredient}
                  />
                </div>
              </div>
              <div className="addRecipeItem">
                <Typography variant="h5" align="left">
                  Instructions
                </Typography>
                {instructions.length > 0 &&(
                  <EditableList
                    list={instructions}
                    handleRemove={this.handleRemoveInstructions}
                    toggleIsEditingAt={this.toggleIsEditingInstructionAt}
                    setNameAt={this.setInstructionAt}
                  />
                )}
              <div className="addRecipeInstructions">
                  <AddItem
                    className="input"
                    type="text"
                    handleItemInput={this.handleInstructionInput}
                    newItemSubmitHandler={this.newInstructionSubmitHandler}
                    value={this.state.pendingInstruction}
                    placeHolder="Add a step"
                    pendingItem={this.state.pendingInstruction}
                  />
                </div>
              </div>
              <div className="addRecipeItem">
                <Typography variant="h5" align="left">
                  Website Link
                </Typography>
                <div className="addRecipeWebsite">
                  <TextField
                    id="sourceurl"
                    fullWidth="true"
                    value={sourceurl}
                    onChange={this.handleChange('sourceurl')}
                    placeholder="Website link"
                  />
                </div>
              </div>
              <div>
                {savingRecipe === true && (
                  <div className="loadingAnimation">
                    <CircularProgress color="primary"/>
                  </div>
                )}
                {savingRecipe !== true && (
                  <div className="addRecipeButtons">
                    <p style={errorMessageStyle}>{errorMessage}</p>
                    <Button
                      style={actionButton}
                      size="medium"
                      onClick={this.saveRecipe}>
                      Save Recipe
                    </Button>
                    <LinkButtons
                      buttonStyle={secondOptionButton}
                      buttonText={'Cancel'}
                      link={`/myRecipes/${this.props.match.params.username}`}
                    />
                  </div>
                )}
              </div>
          </div>
        </Mobile>
        <Default>
        <div className="backgroundWrapper">
         <div className="background">
          <HeaderBar title={title} username={this.props.match.params.username}/>
          <div className="addRecipeWrapper">
            <Paper elevation={1}>
              <div className="addRecipeFirstItem">
                <Typography variant="h5" align="left">
                  Recipe Name
                </Typography>
                <div className="addRecipeTitle">
                  <TextField
                    id="recipeTitle"
                    fullWidth="true"
                    autoFocus="true"
                    value={recipeTitle}
                    onChange={this.handleChange('recipeTitle')}
                    placeholder="Title"
                  />
                </div>
              </div>
            <div className="addRecipeItem">
                <Typography variant="h5" align="left">
                  Ingredients
                </Typography>
                {ingredients.length > 0 &&(
                  <EditableList
                    list={ingredients}
                    handleRemove={this.handleRemoveIngredient}
                    toggleIsEditingAt={this.toggleIsEditingIngredientAt}
                    setNameAt={this.setIngredientAt}
                  />
                )}
                <div className="addRecipeIngredients">
                  <AddItem
                    className="input"
                    type="text"
                    handleItemInput={this.handleIngredientInput}
                    newItemSubmitHandler={this.newIngredientSubmitHandler}
                    value={this.state.pendingIngredient}
                    placeHolder="Add an ingredient"
                    pendingItem={this.state.pendingIngredient}
                  />
                </div>
              </div>
              <div className="addRecipeItem">
                <Typography variant="h5" align="left">
                  Instructions
                </Typography>
                {instructions.length > 0 &&(
                  <EditableList
                    list={instructions}
                    handleRemove={this.handleRemoveInstructions}
                    toggleIsEditingAt={this.toggleIsEditingInstructionAt}
                    setNameAt={this.setInstructionAt}
                  />
                )}
              <div className="addRecipeInstructions">
                  <AddItem
                    className="input"
                    type="text"
                    handleItemInput={this.handleInstructionInput}
                    newItemSubmitHandler={this.newInstructionSubmitHandler}
                    value={this.state.pendingInstruction}
                    placeHolder="Add a step"
                    pendingItem={this.state.pendingInstruction}
                  />
                </div>
              </div>
              <div className="addRecipeItem">
                <Typography variant="h5" align="left">
                  Website Link
                </Typography>
                <div className="addRecipeWebsite">
                  <TextField
                    id="sourceurl"
                    fullWidth="true"
                    value={sourceurl}
                    onChange={this.handleChange('sourceurl')}
                    placeholder="Website link"
                  />
                </div>
              </div>
              <div>
                {savingRecipe === true && (
                  <div className="loadingAnimation">
                    <CircularProgress color="primary"/>
                  </div>
                )}
                {savingRecipe !== true && (
                  <div className="addRecipeButtons">
                    <p style={errorMessageStyle}>{errorMessage}</p>
                    <Button
                      style={actionButton}
                      size="medium"
                      onClick={this.saveRecipe}>
                      Save Recipe
                    </Button>
                    <LinkButtons
                      buttonStyle={secondOptionButton}
                      buttonText={'Cancel'}
                      link={`/myRecipes/${this.props.match.params.username}`}
                    />
                  </div>
                )}
              </div>
            </Paper>
          </div>
        </div>
      </div>
      </Default>
      </div>
    );
    }
  }
}

export default AddRecipe;
