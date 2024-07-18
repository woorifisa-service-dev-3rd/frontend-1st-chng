// import HTTP from 'superagent';
import express, { json } from 'express';
// import cors from 'cors';
import cors from 'cors';
import HTTP from 'superagent';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const app = express();  
app.use(json())
app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.json());

//이 로직을, 만든 로직에 추가 해야 함.
app.post('/giveme', ((req, res) => {

    //환전 값 보내기

    //이 부분에 추가하는 것 = 받아왓다고 치고.
        const newjson = 
        {
            startmoney : 15000,
            startcountry :"en",
            endmoney:15006,
            endcountry :"us",
        }
        res.send(newjson)
}))

app.post('/mail', ((req,res) => {

    const { email } = req.body;
    const { local_storage_array } = req.body

    console.log("하하", local_storage_array)
    
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth : {
            user : "dealon77777@gmail.com",
            pass : "byep lqbe ybht gsfd"
        }
    })

    const mailOptions = {
        from: 'dealon77777@gmail.com',
        to: email, //받아오기
        subject: 'Chng에서 안내 메세지 드립니다.',
        text: 'chng에서 보냈습니다', // 변경
        html: `
        <div class="mytable_container">
            <table id="myTable" border="1">
                <thead>
                    <tr>
                        <th>입력 금액</th>
                        <th>기준</th>
                        <th>환전 금액</th>
                        <th>기준</th>
                        <th>기록 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    ${local_storage_array.map(item => `
                        <tr>
                            <td>${item.startmoney}</td>
                            <td>${item.startcountry}</td>
                            <td>${item.endmoney}</td>
                            <td>${item.endcountry}</td>
                            <td>${item.timestamp}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <br> </br>

        <div>
            <div> chng에서 구매하신 구매 내역을 보내드립니다. 감사합니다! </div>
        </div>
    `
    };

    console.log(email)
    transporter.sendMail(mailOptions, (error, info) => {
        if(error)
        {
            console.log(error.message)
        }
        else
        {
            res.status(200).send('Email sent: ' + info.response);
            //이메일 보낸거 완료.
        }

    });
}))


// config();




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