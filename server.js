import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import path from 'path';
//configure env
dotenv.config();

//databse config
connectDB();

//rest obbject
const app= express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// // rest api
// app.get('/', (req,res) => {
//     res.send("<h1>Welcome To Ecommerce App</h1>")
// })

const __dirname=path.resolve();

app.use(express.static(path.join(__dirname,'public','build')));
app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','build','index.html'))
})

// port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, ()=>{
    console.log(`server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});


// "bcryptjs": "^2.4.3",