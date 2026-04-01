const express = require('express');
const path = require('path')
const cors= require('cors')
const PORT = process.env.PORT || 8989;

const webRouter = require('./routers/WebRouter');
const incomeRouter = require('./routers/IncomeRouter')
const ExpenseRouter = require('./routers/ExpenseRouter')
const dashboardRouter = require('./routers/DashboardRouter');
const incomeCategoryRouter = require("./routers/incomeCategoryRouter");
const expenseCategoryRouter = require("./routers/expenseCategoryRouter");
const adminRouter = require('./routers/AdminRouter');




const server = express();
server.use(cors());
server.use(express.json());

server.use("/auth", webRouter)
server.use("/income",incomeRouter)
server.use("/expense",ExpenseRouter)
server.use("/dashboard", dashboardRouter);
server.use("/income-category", incomeCategoryRouter);
server.use("/expense-category", expenseCategoryRouter);
server.use("/admin", adminRouter);


server.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
