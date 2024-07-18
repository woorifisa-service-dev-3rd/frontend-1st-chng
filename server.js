import express, { json } from 'express';
import HTTP from 'superagent';
import { config } from 'dotenv';
config();

// SSL 인증서 검증 비활성화
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();

app.use(express.static('public'));
app.use(json());

const url = process.env.URL;
const authKey = process.env.KEY;
const targetCurrencies = ["KRW", "USD", "EUR", "JPY(100)", "CNH"];

// if (!url || !authKey) {
//     console.error('URL or AUTH_KEY is not defined in .env file');
//     process.exit(1);
// } else {
//     console.log('URL, KEY 잘 받았음 ~~', url, authKey);
// }

let exchangeRates = {};

const fetchExchangeRates = async () => {
    // console.log("getExchange 함수 실행 시작");
    const searchDate = new Date().toISOString().split('T')[0].replace(/-/g, ''); // yyyyMMdd 형식
    const dataType = "AP01";

    // const query = {
    //     "authkey": authKey,
    //     "searchdate": searchDate,
    //     "data": dataType
    //   }

    try {
        const res = await HTTP.post(url)
            .query({ authkey: authKey, searchdate: searchDate, data: dataType });

        // console.log(`Response received: ${res.text}`);

        // const exchangeRateInfoList = JSON.parse(res.text)
        // let exchangeRate = null;

        // for (const exchangeRateInfo of exchangeRateInfoList) {
        //     if (exchangeRateInfo.cur_unit === 'USD') {
        //         exchangeRate = parseFloat(exchangeRateInfo.deal_bas_r.replace(/,/g, ''));
        //         break;
        //     }
        // }

        // if (exchangeRate === null) {
        //     exchangeRate = 1.0; // 기본 환율 설정
        // }

        // return exchangeRate;

        const exchangeRateInfoList = JSON.parse(res.text);

        exchangeRateInfoList.forEach(exchangeRateInfo => {
            const currency = exchangeRateInfo.cur_unit;
            if (targetCurrencies.includes(currency)) {
                exchangeRates[currency] = parseFloat(exchangeRateInfo.deal_bas_r.replace(/,/g, ''));
            }
        });

        console.log('Fetched exchange rates:', exchangeRates);
    } catch (error) {
        console.error(error);
        return null;
    }
};

app.get('/', (_, response) => {
    response.sendFile('./index.html');
})

app.post('/exchange-rate', async (request, response) => {
    // console.log('POST: /exchange-rate');
    // console.log('body: ', request.body);
    // const rate = await getExchangeRate();
    // if (rate !== null) {
    //     console.log('rate 받아와', rate);
    //     response.json({ rate });
    // } else {
    //     response.status(500).json({ error: 'Failed to fetch exchange rate' });
    // }
    const { fromCurrency, toCurrency, amount } = request.body;

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    console.log('fromCurrency:', fromCurrency);
    console.log('toCurrency', toCurrency);
    console.log('amount', amount);

    if (fromRate && toRate) {
        const convertedAmount = (amount / fromRate) * toRate;
        response.json({ convertedAmount });
    } else {
        response.status(500).json({ error: 'Failed to fetch exchange rate' });
    }
});

const port = 5000;
app.listen(port, async () => {
    await fetchExchangeRates();
    console.log(`http://127.0.0.1:${port}/ 실행중...`);
});