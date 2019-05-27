import express from 'express';
import bodyParser from 'body-parser';
import 'idempotent-babel-polyfill';
import offers from './routes/offers';
import companies from './routes/companies';
import countries from './routes/countries';

const app = express();
const port = 4000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("toto");
});

app.use('/offers', offers());
app.use('/countries', countries());
app.use('/companies', companies());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

export default app;