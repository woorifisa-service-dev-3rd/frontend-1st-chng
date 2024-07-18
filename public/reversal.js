
const body = document.getElementsByTagName('body')[0]

const dark_button = document.getElementById('dark_button-right')

const white_button = document.getElementById('business_button')

dark_button.addEventListener("click", () => {
    // body에 있는 class들을 리스트 형태로 가져옴 classList[0]은 처음 상태에서 undefined
    const mode = body.classList[0]
    // 삼항연산자 조건문
    // ____ ? _____ : ______
    // ? 앞 부분이 조건문의 if (_____)
    //  : 앞 부분이 조건이 true인 경우 실행
    //  : 뒷 부분이 조건이 false인 경우 실행
    mode == 'dark_mode' ? body.classList.remove('dark_mode') : body.classList.add('dark_mode')
})//

// 기존 이벤트 핸들러 함수 정의
const originalClickHandler = () => {
    alert('버튼이 클릭되었습니다.');
};

// 반전된 이벤트 핸들러 함수 정의
const invertedClickHandler = () => {
    alert('반대로 작동합니다.');
};








