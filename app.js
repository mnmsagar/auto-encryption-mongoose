require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { userRouter } = require("./routes/users.routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRouter);
app.use("*", (req, res) => {
  res.json({
    message: "Not Valid !!!",
    statusCode: 401,
  });
});

async function main() {
  await mongoose.connect(process.env.MONGODB_STRING);
}

main().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT} !!`);
});
