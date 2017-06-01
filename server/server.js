const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));

app.get('/', (req, res) => {
res.render("index.html", {
  pageTitle: "Home page"
});
});

app.listen(port, (req, res) => {
console.log(`Port is up on port ${port}`)
});
