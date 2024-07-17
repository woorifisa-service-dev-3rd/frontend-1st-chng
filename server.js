import express, { json } from 'express';
import HTTP from 'superagent';
import { config } from 'dotenv';
config();

const app = express();

app.use(express.static('public'));
app.use(json());

// const url = process.env.URL;
// const authKey = process.env.KEY;

const url = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";
const authKey = "VNQFbv2fWY2SVWFznbobAXOxuCQP7Y8u";

// if (!url || !authKey) {
//     console.error('URL or AUTH_KEY is not defined in .env file');
//     process.exit(1);
// } else {
//     console.log('URL, KEY 잘 받았음 ~~', url, authKey);
// }

const getExchangeRate = async () => {
    console.log("getExchange 함수 실행 시작");
    const searchDate = new Date().toISOString().split('T')[0].replace(/-/g, ''); // yyyyMMdd 형식
    const dataType = "AP01";

    try {
        const res = await HTTP.get(url)
            .query({ authkey: authKey, searchdate: searchDate, data: dataType });

        const exchangeRateInfoList = JSON.parse(res.text);

        let exchangeRate = null;

        for (const exchangeRateInfo of exchangeRateInfoList) {
            if (exchangeRateInfo.cur_unit === 'USD') {
                exchangeRate = parseFloat(exchangeRateInfo.deal_bas_r.replace(/,/g, ''));
                break;
            }
        }

        if (exchangeRate === null) {
            exchangeRate = 1.0; // 기본 환율 설정
        }

        return exchangeRate;
    } catch (error) {
        console.error(error);
        return null;
    }
};

app.get('/', (_, response) => {
    response.sendFile('./index.html');
})

app.post('/exchange-rate', async (_, response) => {
    const rate = await getExchangeRate();
    if (rate !== null) {
        console.log('rate 받아와');
        response.json({ rate });
    } else {
        response.status(500).json({ error: 'Failed to fetch exchange rate' });
    }
});

const port = 5000;
app.listen(port,
    () => console.log(`http://127.0.0.1:${port}/ 실행중...`)
);