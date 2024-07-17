document.addEventListener('DOMContentLoaded', (event) => {
    const textInput = document.querySelector('.price_input');
    const textExchange = document.querySelector('.exchange_input');
    const calcButton = document.getElementById('exchange_button');

    calcButton.addEventListener('click', async () => {
        // console.log('클릭됐삼');
        console.log(textInput.value);
        try {
            const response = await fetch('/exchange-rate');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            textExchange.value = `${data.rate}`;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
});

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
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

const debounce = (callback, delay) => {
    let timer;
    return (event) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(callback, delay, event);
    };
};

// textInput.addEventListener('input', debounce((e) => {
    
// }))