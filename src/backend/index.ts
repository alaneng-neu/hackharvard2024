import express from "express";
import { errorHandler } from "./src/utils/error.utils";
import cookieParser from "cookie-parser";
import businessRouter from "./src/routes/business.routes";
import userRouter from "./src/routes/user.routes";

const PORT = process.env.PORT || 7071;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/business", businessRouter);
app.use("/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express API listening on port ${PORT}`);
});
