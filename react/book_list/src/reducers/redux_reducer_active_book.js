
// 스테이트 요소는 어플리케이션 스테이트가 아니고,
// 오직 스테이트는 리듀서가 권한을 가지고 있다.
// ES6 문법 : state=null -> undefine일때, null을 넣어라
export default function(state=null, action) {
    switch(action.type) {
        case 'BOOK_SELECTED':
        return action.payload;
    }
    return state;
}