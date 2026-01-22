const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", require("./routes/products"));

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});