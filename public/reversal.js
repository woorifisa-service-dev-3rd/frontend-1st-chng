
const body = document.getElementsByTagName('body')[0]

const dark_button = document.getElementById('dark_button-right')
//

dark_button.addEventListener("click", () => {

    const mode = body.classList[0]

    mode == 'dark_mode' ? body.classList.remove('dark_mode') : body.classList.add('dark_mode')
})

//
const originalClickHandler = () => {
    alert('버튼이 클릭되었습니다.');
};


const invertedClickHandler = () => {
    alert('반대로 작동합니다.');
};








