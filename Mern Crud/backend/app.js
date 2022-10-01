// const express = require('express')
import express from 'express'
import cors from 'cors'
const app=express()
app.use(cors())
import connectDB from './db/connectdb.js'
const port = process.env.PORT || '8000'
const DATABASE_URL=process.env.DATABASE_URL || "mongodb://localhost:27017"
import web from './routes/web.js'

connectDB(DATABASE_URL)

// Load JSON
app.use(express.json())

//Load router
app.use('/', web)
app.listen(port,()=>{
    console.log(`Server is Listing at http://localhost:${port}`)
})
