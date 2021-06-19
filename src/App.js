import { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import {Header,AppIcon,AppNameComponent,SearchComponent,SearchIcon,SearchInput,} from "./components/headerComponents";
import Recipe from "./components/recipeComponent";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const APP_ID="09a1aaa7";
const APP_KEY = "6611c3aafe3c49859ef113ef15f0e7fb";

const Container = styled.div`
 display: flex;
 flex-direction: column;
`;
const Placeholder = styled.img`
  width: 100px;
  height: 100px;
  margin: 200px;
  opacity: 50%;
`
const RecipeComponent = (props) =>{
  const [show, setShow] = useState(false);
  const { recipeObj } = props;
  return(
  <> 
    <Dialog open={show}> 
      <DialogTitle id="alert-dialog-slide-title">Ingredients</DialogTitle>
      <DialogContent>
        <table>
          <thead>
            <th>Ingredients</th>
            <th>weights</th>
          </thead>
          <tbody>
            {recipeObj.ingredients.map((ingredientObj) => (
             <tr>
              <td>{ingredientObj.text}</td>
              <td>{ingredientObj.weight}</td>
             </tr>
            ))}
            
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Recipe.IngredientText onClick={() => window.open(recipeObj.url)}>See More</Recipe.IngredientText>
        <Recipe.SeeMoreText onClick={()=>setShow("")}>Close</Recipe.SeeMoreText>
      </DialogActions>
    </Dialog>
    <Recipe.ReciepeContainer>
      <Recipe.CoverImage src={recipeObj.image}/>
      <Recipe.RecipeName>{recipeObj.label}</Recipe.RecipeName>
      <Recipe.IngredientText onClick={() => setShow(true)}>
        Ingredients
      </Recipe.IngredientText>
      <Recipe.SeeMoreText onClick={()=> window.open(recipeObj.url)}>
        See complete Recipe
      </Recipe.SeeMoreText>
    </Recipe.ReciepeContainer>
   </> 
  );
};

function App() {
  const [timeoutId,updateTimeoutId] = useState();
  const [recipeList,updaterecipeList] = useState([]);
  

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    updaterecipeList(response.data.hits);
  }; 


  const onTextChange = (event) =>{
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value),500);
    updateTimeoutId(timeout);
  }
  return (
    <Container>
      <Header>
        <AppNameComponent>
           <AppIcon src="hamburger.svg"/> 
          Receipe finder</AppNameComponent>
        <SearchComponent>
          <SearchIcon src="/search-icon.svg"/>
           <SearchInput 
                placeholder="Receipe finder"  
                onChange={onTextChange}   
           />
        </SearchComponent>
      </Header>
      <Recipe.RecipeListContainer>
        {recipeList.length ? (
          recipeList.map((recipeObj) =>(
            <RecipeComponent recipeObj={recipeObj.recipe} />
          ))
        ) : (
          <Placeholder src="hamburger.svg"/>
        )}
      </Recipe.RecipeListContainer>
     
    </Container>
     
    
  );
}

export default App;
