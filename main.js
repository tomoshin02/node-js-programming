const port = 3000,
      express = require("express"),
      app = express();

app.get("/", (req,res) => {
  console.log(req.params);
  console.log(req.body);
  console.log(req.url);
  console.log(req.query);
  res.send("Hello express!")
})
.listen(port, () => {
  console.log(`The express server has started and is lisning on port :${port}`);
})