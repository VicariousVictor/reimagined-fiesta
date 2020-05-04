const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
    let formData = req.body;
    console.log(formData);
    let toDo = formData.toDoList.split(',');
    console.log(toDo)
    res.render("pages/result", { result: toDo });
});

app.get("/myListQueryString", (req, res) => {
    let item1 = req.query.item1;
    let item2 = req.query.item2;
    let toDo = [item1, item2];
    console.log(toDo);
    res.render("pages/result", { result: toDo });
});

app.get("/myList/:item1/:item2", (req, res) => {
    let item1 = req.params.item1;
    let item2 = req.params.item2;
    let toDo = [item1, item2];
    console.log(toDo);
    res.render("pages/result", { result: toDo });
});

app.listen(3000);