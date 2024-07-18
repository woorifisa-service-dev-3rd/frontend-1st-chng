const exchange_button = document.getElementById("exchange_button")
const mytable = document.getElementById("myTable")
const reset_button = document.getElementById("reset_local")
// const docu = document.querySelector("body")

// docu.addEventListener('click', (() => {

//     // window.localStorage. // 싹 다가져와서
//     //  // 싹다 table에 보내서 
//     // mytable.
// }))

window.addEventListener('load', (() => {

    const local_storage_array = getAllFromLocalStorage()
    //이제 local stoarge에서 꺼내오기. 

    console.log(local_storage_array)

    //만든 걸로 table 만들기
    generateTable(local_storage_array)

}))

reset_button.addEventListener('click', (() => {
    localStorage.clear()
    location.reload()
}))

function savetolocal(key, valfirst) {
    const val = JSON.stringify(valfirst)
    let nowlocal = window.localStorage.length
    if (nowlocal !== 0) {
        nowlocal += val
    }
    else {
        nowlocal = val
    }
    window.localStorage.setItem(key, val)

}

const xhr = new XMLHttpRequest();

xhr.onload = (() => {
    const response = JSON.parse(xhr.response)
    // console.log(response)
    // console.log(response.name,response.age)
    savetolocal(getCurrentDateTime(), response)
    //local stoarge에 저장 끝. 

    const local_storage_array = getAllFromLocalStorage()
    //이제 local stoarge에서 꺼내오기. 

    console.log(local_storage_array)

    //만든 걸로 table 만들기
    generateTable(local_storage_array)
})


function getAllFromLocalStorage() {

    //이제, 거기서 빼오기

    const keys = Object.keys(window.localStorage)
    // console.log(keys)

    const values = keys.map(key => {
        const value = window.localStorage.getItem(key);
        // console.log("haha",JSON.parse(value))
        const parsedValue = JSON.parse(value);
        // console.log(valuearray[key]);
        parsedValue.timestamp = key;
        return parsedValue;
    });

    // console.log("결론", valuearray);


    return values || [];

}

function testing() {
    xhr.open('POST', 'http://127.0.0.1:5000/giveme')
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send() //여기에 보낼 뭐 좀이따 추가
}

exchange_button.addEventListener('click', (() => {
    testing()

    const local_storage_array = getAllFromLocalStorage()
    //이제 local stoarge에서 꺼내오기. 

    //만든 걸로 table 만들기
    generateTable(local_storage_array)
}))

function generateTable(data) {
    const table = mytable.getElementsByTagName('tbody')[0];

    table.innerHTML = "";

    data.forEach((item) => {
        const row = table.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(item.startmoney));
        row.insertCell(1).appendChild(document.createTextNode(item.startcountry));
        row.insertCell(2).appendChild(document.createTextNode(item.endmoney));
        row.insertCell(3).appendChild(document.createTextNode(item.endcountry));
        row.insertCell(4).appendChild(document.createTextNode(item.timestamp));
    });
}


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

// login_button.addEventListener('click',(() => {
//     // localStorage.clear()

// }))



//change 버튼
const change_button = document.getElementById('left_right_button')
change_button.addEventListener('click', (() => {
    console.log("우하하")

    let leftval = document.querySelector('.price_input').value
    let rightval = document.querySelector('.exchange_input').value
    let temp

    temp = leftval
    leftval = rightval
    rightval = temp

    console.log(leftval, rightval)

    document.querySelector('.price_input').value = leftval
    document.querySelector('.exchange_input').value = rightval


    //나라도 바꿔야됨 ㅋ
    let leftselect = document.getElementById('price_select_option').value
    let rightselect = document.getElementById('exchange_select_option').value
    let temp2
    console.log(leftselect, rightselect)

    temp2 = leftselect
    leftselect = rightselect
    rightselect = temp2

    console.log(leftselect, rightselect)

    document.getElementById('price_select_option').value = leftselect
    document.getElementById('exchange_select_option').value = rightselect



}))