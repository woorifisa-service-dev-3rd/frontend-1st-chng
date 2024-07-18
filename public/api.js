
const textInput = document.querySelector('.price_input');
const textExchange = document.querySelector('.exchange_input');
const calcButton = document.getElementById('exchange_button');

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