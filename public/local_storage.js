const exchange_button = document.getElementById("exchange_button")
// const mytable = document.getElementById("myTable")
const login_button = document.querySelector(".login_btn")
// const docu = document.querySelector("body")

// docu.addEventListener('click', (() => {

//     // window.localStorage. // 싹 다가져와서
//     //  // 싹다 table에 보내서 
//     // mytable.
// }))

function savetolocal(key,val)
{
    let nowlocal = window.localStorage.length
    if (nowlocal !== 0)
    {
        nowlocal += val
    }
    else{
        nowlocal = val
    }
    window.localStorage.setItem(key,val)

    // let newrow = mytable.insertRow(-1)
    // let cell1 = newrow.insertCell(0)
    // let cell2 = newrow.insertCell(1)
    // let cell3 = newrow.insertCell(2)
    // let cell4 = newrow.insertCell(3)
    // let cell5 = newrow.insertCell(4)

    // cell1.innerHTML = val.startmoney;
    // cell2.innerHTML = val.startcountry;
    // cell3.innerHTML = val.endmoney;
    // cell4.innerHTML = val.endcountry;
    // cell5.innerHTML = key;
    // console.log(val)

}

const xhr = new XMLHttpRequest();

xhr.onload = (() => {
    const response = JSON.parse(xhr.responseText)
    // console.log(response.name,response.age)
    savetolocal(getCurrentDateTime(),response)
    //local stoarge에 저장 끝. 

    //이제, 거기서 빼오기
    
    const keys = Object.keys(window.localStorage)

    const valuearray = {}

    keys.forEach(key => {
        const value = window.localStorage.getItem(key);
        console.log("haha",JSON.parse(value))
        valuearray[key] = JSON.parse(value); // 문자열을 JSON 객체로 변환
        console.log(valuearray[key]);
    });

    console.log(valuearray);
    console.log(valuearray)
})

function testing()
{   
    xhr.open('POST','http://localhost:3000/giveme')
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send() //여기에 보낼 뭐 좀이따 추가
}

exchange_button.addEventListener('click',(() => {
    testing()
    console.log("병합?")
}))


function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// window.onload = (() => {
//     localStorage.clear()
// })

login_button.addEventListener('click',(() => {
    localStorage.clear()
}))