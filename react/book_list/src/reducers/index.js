import { combineReducers } from 'redux';
import BooksReducer from './redux_reducer_books'

const rootReducer = combineReducers({
  books: BooksReducer
});

export default rootReducer;
