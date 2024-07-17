import express, { json } from 'express';
import HTTP from 'superagent';
import { config } from 'dotenv';
config();

const app = express();

app.use(express.static('public'));
app.use(json());

const url = process.env.URL;

app.get('/', (_, response) => {
    response.sendFile('./index.html');
})

const port = 5000;
app.listen(port,
    () => console.log(`http://127.0.0.1:${port}/ 실행중...`)
);