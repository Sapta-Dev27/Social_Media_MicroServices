import express from 'express'
import 'dotenv/config'

import connectToDb from './config/db.js';
import identityRoutes from './routes/identiy.route.js'

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
connectToDb();

app.get('/health' , (req,res) => {
  return res.status(200).json({
    success  : true ,
    message : 'Server Health is OK'
  })
})

app.use('/api/v1/identity', identityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})