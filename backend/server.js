const path = require('path')
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

// server front-end
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
  )
} else{
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.listen(port, () => console.log(`Server running at port ${port}`))

