const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router() // Creates a router instance, which is like a mini Express application that runs its own complete middleware and routing system

const { getAll, save, get, update, remove } =  require("../controllers/recipes") 

router.get("/", auth.authenticate(), getAll)
router.post("/", auth.authenticate(), save)
// router.get("/:id", get);
// router.put("/:id", update);
// router.delete("/:id", remove);
router.route('/:id').get(auth.authenticate(), get).put(auth.authenticate(), update).delete(auth.authenticate(), remove)

module.exports = router 