import axios from 'axios';

const API_KEY = '0ec5c505c13d345c61f31796603cf1f0';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

// 변수명과 내용을 동일하게 작서하는 것은 액션 생성자와 리듀서 사이에 액션 타입을
// 계속 일정하게 유지하기 위해서이다.
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url); // axios에의해 프로미스(request)가 생성되고, 이는 데이터구조로서,
                                    // 아직 어떤 리퀘스트 데이터를 가지고 있지 않다.

    console.log('Request:', request);
    return {
        type: FETCH_WEATHER,
        payload: request
    };
}

