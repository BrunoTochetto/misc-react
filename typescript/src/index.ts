import express, { json } from 'express';
import cors from 'cors';
import {config} from 'dotenv'

config();

const app = express();

app.use(cors());
app.use(json());


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});