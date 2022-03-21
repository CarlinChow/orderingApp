const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT
const connectDB = require('./config/db')


connectDB()

const app = express()

app.use(cors())

// middleware to handle req Body
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/food", require('./routes/foodRoutes'))
app.use("/api/orders", require("./routes/ordersRoutes"))
app.use("/api/users", require('./routes/userRoutes'))
app.use('/api/timeslots', require('./routes/timeSlotsRoutes'))

app.listen(port, () => console.log(`Server running at port ${port}`))

