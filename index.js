const express = require('express');
const path = require('path')
const cors= require('cors')

const webRouter = require('./routers/WebRouter');
const incomeRouter = require('./routers/IncomeRouter')
const ExpenseRouter = require('./routers/ExpenseRouter')
const dashboardRouter = require('./routers/DashboardRouter');

const server = express();
server.use(cors());
server.use(express.json());

server.use("/auth", webRouter)
server.use("/income",incomeRouter)
server.use("/expense",ExpenseRouter)
server.use("/dashboard", dashboardRouter);


server.listen(8989, () => {
    console.log("server : http://localhost:8989")
})