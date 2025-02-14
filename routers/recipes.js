const express = require("express");
const router = express.Router() // Creates a router instance, which is like a mini Express application that runs its own complete middleware and routing system

const { getAll, save, get, update, remove } =  require("../controllers/recipes") 

router.get("/", getAll)
router.post("/", save)
// router.get("/:id", get);
// router.put("/:id", update);
// router.delete("/:id", remove);
router.route('/:id').get(get).put(update).delete(remove)

module.exports = router 