import express from "express";
import loanRoutes from "/routes/loanRoutes";

const app = express();
app.use(express.json());
app.use('/api/v1/loans', loanRoutes);

module.exports = app;
