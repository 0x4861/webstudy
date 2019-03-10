
// state를 반환하는 함수
// 리듀서를 생성하는 것은 2가지 스텝
// 1. 반환할 함수를 생성
// 2. 어플리케이션에 연결 (./index.js 참고)
export default function() {
    return [
        { title: 'Javascript: The Good Parts' },
        { title: 'Harry Potter' },
        { title: 'The Dark Tower' },
        { title: 'Ruby' },
    ]
}