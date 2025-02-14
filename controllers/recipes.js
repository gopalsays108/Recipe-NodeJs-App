const service = require("../services/recipes");

const recipeExists = async (req, res, next) => {
  const recipe = await service.get(req.params.id);

  if (recipe === undefined) {
    const err = new Error("Recipe not found");
    err.statusCode = 404;
    next(err);
  } else {
    res.locals.recipe = recipe;
    next();
  }
};

const getAll = async (req, res, next) => {
  try {
    res.json({ data: await service.getAll() });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    res.json({ data: res.locals.recipe });
  } catch (error) {
    next(error);
  }
};

const save = async (req, res, next) => {
  try {
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients,
    } = req.body;

    const newRecipe = {
      name,
      healthLabels: [...healthLabels],
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients],
    };

    res.status(201).json({ data: await service.save(newRecipe) });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients,
    } = req.body;

    const updated = await service.update(req.params.id, {
      name,
      healthLabels: [...healthLabels],
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients],
    });

    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  get: [recipeExists, get],
  save,
  update: [recipeExists, update],
  remove: [recipeExists, remove],
};



// const service = require("../services/recipes");

// const getAll = async (req, res, next) => {
//     try {
//         console.log()
//         const  data = await service.getAll();
//         res.json({data})
//     } catch (e){
//         console.log(e)
//         next(e)
//     }
// }

// const save = async(req, res, next) => {
//     try {
//         console.log(`Request is ${req.body}`)
//         const {
//             name,
//             healthLabels,
//             cookTimeMinutes,
//             prepTimeMinutes,
//             ingredients,
//           } = req.body;

//           const newRecipe = {
//             name,
//             healthLabels: [...healthLabels], 
//             cookTimeMinutes,
//             prepTimeMinutes,
//             ingredients: [...ingredients], 
//           };

//           res.status(201).json({ data: await service.save(newRecipe) });
//     } catch (e){
//         console.log(e)
//         next(e);
//     }
// }



// const update = async (req, res, next) => {
//     try {
//       const recipe = await service.get(req.params.id);
  
//       if (recipe === undefined) {
//         const err = new Error("Recipe not found");
//         err.statusCode = 404;
//         throw err;
//       }
  
//       const {
//         name,
//         healthLabels,
//         cookTimeMinutes,
//         prepTimeMinutes,
//         ingredients,
//       } = req.body;
  
//       const updated = await service.update(req.params.id, {
//         name,
//         healthLabels: [...healthLabels],
//         cookTimeMinutes,
//         prepTimeMinutes,
//         ingredients: [...ingredients],
//       });
  
//       res.json({ data: updated });
//     } catch (error) {
//       next(error);
//     }
//   };
  
//   const remove = async (req, res, next) => {
//     try {
//       const recipe = await service.get(req.params.id);
  
//       if (recipe === undefined) {
//         const err = new Error("Recipe not found");
//         err.statusCode = 404;
//         throw err;
//       }
  
//       await service.remove(req.params.id);
//   //  Send a proper status
//   res.status(200).json({messgae: "Deleted Successfully  "})
//     } catch (error) {
//       next(error);
//     }
//   };

  
//   const get = async (req, res, next) => {
//     try {
//       const recipe = await service.get(req.params.id);
  
//       if (recipe === undefined) {
//         const err = new Error("Recipe not found");
//         err.statusCode = 404;
//         throw err;
//       }
  
//       res.json({ data: recipe });
//     } catch (error) {
//       next(error);
//     }
//   };
  
// module.exports = {
//     getAll,
//     get,
//     save,
//     update,
//     remove
// }