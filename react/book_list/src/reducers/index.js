import { combineReducers } from 'redux';
import BooksReducer from './redux_reducer_books'
import ActiveBook from './redux_reducer_active_book'

const rootReducer = combineReducers({
  books: BooksReducer,
  activeBook: ActiveBook
});

export default rootReducer;
