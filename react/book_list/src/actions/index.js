// 액션 생성자는 액션을 반환하는 함수이며, 액션은 모든 리듀서로 흐르는 오브젝트이다.
// 리듀서는 액션을 이요하여 그자체의 특정한 스테이트를 위한 값을 만든다.

export function selectBook(book) {
    // selectBook is an ActionCreator, it needs to return an action,
    // an object with a type property.
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
} 