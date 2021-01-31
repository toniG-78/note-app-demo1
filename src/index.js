require("dotenv").config();

const app = require("./server");
require("./database");

console.log(process.env.TEST);

app.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${app.get("port")}`);
});
