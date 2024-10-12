import express from "express";
import businessRouter from "./src/routes/business.routes";
import { errorHandler } from "./src/utils/error.utils";

const PORT = process.env.PORT || 7071;

const app = express();

app.use(express.json());

app.use("/business", businessRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express API listening on port ${PORT}`);
});
