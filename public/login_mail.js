// const email = document.getElementById("emailbox")
const login_button = document.getElementById("loginbutton")

const xhr = new XMLHttpRequest();

function getAllFromLocalStorage() {

    //이제, 거기서 빼오기

    const keys = Object.keys(window.localStorage)
    // console.log(keys)
    //

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

function sendMailRequest(mail) {
    xhr.open('POST', 'http://127.0.0.1:5000/mail')
    xhr.setRequestHeader('Content-Type', 'application/json');
    const local_storage_array = getAllFromLocalStorage()
    console.log(local_storage_array)
    xhr.send(JSON.stringify(
        {
            email: mail,
            local_storage_array: local_storage_array

        }
    )) //여기에 보낼 뭐 좀이따 추가
}

login_button.addEventListener('click', (() => {
    const email = document.getElementById("emailbox").value
    sendMailRequest(email)

    window.alert("전송 완료 되었습니다")

    location.reload()

}))
