import { FETCH_WEATHER } from "../actions/index";

export default function (state=[], action) {
    console.log('action : ', action);
    switch(action.type) {
        case FETCH_WEATHER:
            // concat은 기존 배열을 바꾸는 것이 아닌 새 배열을 만들어 기존 것과 새로운 것을 포함시킨다.
            // 언제나 새 스테이트를 반환한다.
            // return state.concat([action.payload.data]);
            return [ action.payload.data, ...state ]; // 새배열에 액션데이터를 넣고, 뒤의 변수에 대한 모든 엔트리를 가져와서 넣는다.
                                                      // ... 는 모든 엔트리를 의미한다.

    }
    return state;
} 