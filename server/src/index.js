import express from 'express';
import bodyParser from 'body-parser';
import 'idempotent-babel-polyfill';
import offers from './routes/offers';
import companies from './routes/companies';
import countries from './routes/countries';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;

app.use(function (req, res, next) {
    // Allow CORS for development purposes. In production, this is handled by Apache
    if(process.env.NODE_ENV === 'development') {
        res.header("Access-Control-Allow-Origin", "*");
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("API");
});

app.use('/offers', offers());
app.use('/countries', countries());
app.use('/companies', companies());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

export default app;