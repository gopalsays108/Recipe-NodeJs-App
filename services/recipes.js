const fs = require("fs").promises;
const path  = require("path");

const recipeFilePath = path.join(__dirname, "../../db/recipe.json");

const get = async (id) => {
    const recipes = await getAll();
    return recipes.find((recipe) => recipe.id === parseInt(id));
  };
  
const getAll = async() => {
    return JSON.parse(await fs.readFile(recipeFilePath));
};

const save = async(recipe) => {
    const recipes = await getAll()
    recipe.id = recipes.length + 1
    recipes.push(recipe)
    await fs.writeFile(recipeFilePath, JSON.stringify(recipes))
    return recipe
}

const update = async(id, recipe) => {
    const recipes = await getAll();
    recipe.id = parseInt(id)
    const updatedRecipes = recipes.map((recipew) => {
        return recipe.id === parseInt(id) ? recipe : recipew
    });
    await fs.writeFile(recipeFilePath, JSON.stringify(updatedRecipes));
    return recipe;
}

const remove = async (id) => {
    const recipes = await getAll();
    const newRecipes = recipes
      .map((recipe) => {
        return recipe.id === parseInt(id) ? null : recipe;
      })
      .filter((recipe) => recipe !== null);
  
    await fs.writeFile(recipeFilePath, JSON.stringify(newRecipes));
  };
  
module.exports = {
    getAll,
    get,
    save,
    update, 
    remove
};