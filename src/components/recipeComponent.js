import styled from "styled-components";

const RecipeListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 30px;
    justify-content: space-evenly;
    gap: 60px;
    
`;
const ReciepeContainer = styled.div`
     display: flex;
     flex-direction: column;
     padding: 10px;
     box-shadow: 0 3px 10px 0 #aaa;
     width: 250px;
      
`;
const CoverImage = styled.img`
  height: 200px;
  object-fit: cover;
`

const RecipeName = styled.span`
  font-size: 18px;
  font-weight:bold;
  color: black;
  margin: 10px 0;
`
const IngredientText = styled.span`
  font-size: 18px;
  border: solid 1px green;
  color : black;
  margin-bottom: 12px; 
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  color: green;
  text-align: center;
`
const SeeMoreText = styled(IngredientText)`
  color:#eb3300;
  border: solid 1px #eb3300;
`
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default{
  SeeMoreText,
  IngredientText,
  RecipeName,
  CoverImage,
  ReciepeContainer,
  RecipeListContainer
}
