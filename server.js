// import HTTP from 'superagent';
import express, { json } from 'express';
// import cors from 'cors';
import cors from 'cors';


const app = express();  
app.use(json())
app.use(cors())

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



app.listen(3000, () => {
    console.log("http://127.0.0.1:3000 가 실행 중입니다.");
});

