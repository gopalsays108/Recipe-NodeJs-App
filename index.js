const express = require("express");
// const path = require('path');
const recipeRouter = require("./routers/recipes")
const cors = require("cors");
const { handleError } = require('./utils/error');

// The app keyword refers to the instance of the Express server declared earlier at the top of the file
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

// Logging middleware
app.use((req,res,next) => {
    const {method, path} = req
    console.log(`Neew request to ${method} ${path} at ${new Date().toISOString}`);
    next()
})


/**
 * Add the express.json() middleware to parse JSON data and make it accessible in the request
 *  object (via req.body). Also, add the express.urlencoded() middleware to parse incoming 
 * requests with URL-encoded payloads
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/api/v1/recipes");
  });
  
app.use("/api/v1/recipes", recipeRouter)

app.use(handleError);

app.listen(port, () => {
    console.log(`server is setup at: ${port}`)
});


/*

const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath))


// Route handler that send message to someone
// The .get() function tells our Express server what HTTP method to listen for

/**
 * The first argument is the path to set up the handler for. This route path will match requests to the root route, /.
  The second argument is a callback function that’s executed when the path / is visited. The callback function accepts two arguments: 
The first is the HTTP request object (conventionally referred to as req)
The second is the HTTP response object, res that an Express application sends to the client.


app.get("/", (req,res) => {
    res.send("Hello there this is route handler")
})

app.get("/:name", (req, res) => {
    res.send(`Welcome to express course ${req.params.name}`)
})
*/ 