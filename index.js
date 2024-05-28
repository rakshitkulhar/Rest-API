// REST - Representational  State Transfer
// REST is a architectural style that defines a set of rules for creating web services.
// we generally use nouns instead of verbs in endpoint paths.

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")


app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// CRUD(Create, Read, Update, Delete)Operations - 
// GET retrieves resources.
// POST submits new data to the server.
// PUT update existing data.
// PATCH  updates part of an existing resource.
// DELETE removes data.

let posts = [
    {
        id: uuidv4(),
        username: "sourabhbalwada",
        content: "I love coding",
    },
    {
        id: uuidv4(),
        username: "rakshitkulhar",
        content: "hello i am rakshit",
    },
    {
        id: uuidv4(),
        username: "anand",
        content: "hello i am anand",
    },   
];

// INDEX Route - to get data for all posts
app.get("/posts", (req,res) => {
    res.render("index.ejs", { posts });
});

// For serve the form
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

// Add the new post
app.post("/posts", (req,res) => {
    let{ username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username,content });
    res.redirect("/posts"); //used for connect different pages.
});

//  SHOW route - to get data for a single post
app.get("/posts/:id", (req,res) => {
    let{ id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

// UPDATE Route
app.patch("/posts/:id", (req,res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

// EDIT Route
app.get("/posts/:id/edit", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

// DESTROY Route
app.delete("/posts/:id", (req,res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});


app.listen(port, () => {
    console.log("listening to port : 8080");
});