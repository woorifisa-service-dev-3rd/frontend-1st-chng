
const textInput = document.querySelector('.price_input');
const textExchange = document.querySelector('.exchange_input');
const calcButton = document.getElementById('exchange_button');
const mytable = document.getElementById("myTable")
const reset_button = document.getElementById("reset_local")

const inputSelect = document.querySelector('#price_select_option');
let inputValue = inputSelect.options[inputSelect.selectedIndex].value;

const outputSelect = document.querySelector('#exchange_select_option');
let outputValue = outputSelect.options[outputSelect.selectedIndex].value;

console.log('inputValue:', inputValue);
console.log('outputValue:', outputValue);

inputSelect.addEventListener('change', () => {
    inputValue = inputSelect.options[inputSelect.selectedIndex].value;
    console.log('inputValue:', inputValue);
})

outputSelect.addEventListener('change', () => {
    outputValue = outputSelect.options[outputSelect.selectedIndex].value;
    console.log('outputValue:', outputValue);
})

calcButton.addEventListener('click', async () => {
    // console.log('클릭됐삼');
    console.log(textInput.value);

    const fromCurrency = outputValue;
    const toCurrency = inputValue;
    const amount = parseFloat(uncomma(textInput.value));
    if (isNaN(amount)) {
        alert('값을 입력해 주세요.');
        return;
    }

    try {
        console.log(new Date().toISOString().split('T')[0].replace(/-/g, ''));
        const response = await fetch('/exchange-rate', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                fromCurrency: fromCurrency,
                toCurrency: toCurrency,
                amount: amount
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // textExchange.value = `${data.rate}`;
        textExchange.value = `${comma(parseFloat(data.convertedAmount.toFixed(6)))}`;

        saveandshow()
        
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

function comma(str) {
    str = String(str);
    const parts = str.split('.');
    parts[0] = parts[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    return parts.join('.');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
} 

function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}

function inputOnlyNumberFormat(obj) {
    obj.value = onlynumber(uncomma(obj.value));
}

function onlynumber(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1');
}


window.addEventListener('load',(()=>{

    const local_storage_array = getAllFromLocalStorage()
    //이제 local stoarge에서 꺼내오기. 

    console.log(local_storage_array)

    //만든 걸로 table 만들기
    generateTable(local_storage_array)

}))

function getAllFromLocalStorage ()
{
    
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
    values.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));


    return values || [];

}


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


reset_button.addEventListener('click', (()=> {
    localStorage.clear()
    location.reload()
}))


function savetolocal(key,valfirst)
{
    const val = JSON.stringify(valfirst)
    let nowlocal = window.localStorage.length
    if (nowlocal !== 0)
    {
        nowlocal += val
    }
    else{
        nowlocal = val
    }
    window.localStorage.setItem(key,val)

}

function saveandshow()
{
    
    const inputSelect = document.querySelector('#price_select_option');
    let inputValue = inputSelect.options[inputSelect.selectedIndex].value;

    const outputSelect = document.querySelector('#exchange_select_option');
    let outputValue = outputSelect.options[outputSelect.selectedIndex].value;

        const response = 
        {
            startmoney : textInput.value,
            startcountry :inputValue,
            endmoney:textExchange.value,
            endcountry :outputValue
        }
    savetolocal(getCurrentDateTime(),response)
    //local stoarge에 저장 끝. 

    const local_storage_array = getAllFromLocalStorage()
    //이제 local stoarge에서 꺼내오기. 

    console.log(local_storage_array)

    //만든 걸로 table 만들기
    generateTable(local_storage_array)
}

//날짜 얻기 버튼
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


//바꾸기 버튼
const change_button = document.getElementById('left_right_button')
change_button.addEventListener('click',(()=>
{
    console.log("우하하")

    let leftval = document.querySelector('.price_input').value
    let rightval = document.querySelector('.exchange_input').value
    let temp 

    temp = leftval
    leftval = rightval
    rightval= temp

    console.log(leftval,rightval)

    document.querySelector('.price_input').value = leftval
    document.querySelector('.exchange_input').value = rightval


    //나라도 바꿔야됨 ㅋ
    let leftselect = document.getElementById('price_select_option').value
    let rightselect = document.getElementById('exchange_select_option').value
    let temp2
    console.log(leftselect,rightselect)

    temp2 = leftselect
    leftselect = rightselect
    rightselect= temp2

    console.log(leftselect,rightselect)

    document.getElementById('price_select_option').value =leftselect
    document.getElementById('exchange_select_option').value =rightselect



}))