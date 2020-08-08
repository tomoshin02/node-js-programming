const port = 3000,
      express = require("express"),
      app = express();

app.get("/", (req,res) => {
  res.send("Hello express!")
});
app.get("/items", (req,res) => {
  res.send("Item list");
});
app.get("/items/:vegetable", (req,res) => {
  let veg = req.params.vegetable;
  res.send(`This page for ${veg}`);
});
app.listen(port, () => {
  console.log(`The express server has started and is lisning on port :${port}`);
})