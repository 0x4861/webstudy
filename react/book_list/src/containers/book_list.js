// 책 리스트를 렌더링 한다.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux'; // 액션생성자

// 컨테이너는 리덕스에 의해 만들어지는 스테이트를 직접 접근하는 컴포넌트이다.
// 즉, 컴포넌트에 데이터를 주입하기위해 사용한다
// 스테이트의 특정부분을 이용하는 최상위 부모 컴포넌트만이 리덕스에 연결되어야 한다.
class BookList extends Component {
    renderList() {
        return this.props.books.map((book)=>{
            return (
                <li 
                    key={book.title}
                    onClick={()=>this.props.selectBook(book)}
                    className="list-group-item">
                    {book.title}
                </li>
            );
        });
    }
    render() {
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}

// 어플리케이션의 스테이트를 요소로 가짐
// 여기서 반환되는 무엇이든 booklist안의 props형태로 보여질 것이다.
// 이 함수를 통해 서로 연결된다.
function mapStateToProps(state) {
    return {
        books: state.books
    };
}

// 이 함수로 반환받은 것이 북리스트 컨테이너의 props로 연결될 것이다.
function mapDispatchToProps(dispatch) {
    // 오브젝트로 선택한 객체의 key와 value를 전달한다.
    // selectBook이 호출될 때마다 결과는 리듀서로 전달되어야 한다.
    // 이것이 bindActionCreators 와 dispatch가 하는 일이다.
    return bindActionCreators({ selectBook: selectBook }, dispatch);
}

// 컴포넌트에서 컨테이너로 북리스트를 바꿔야 하는데,
// 이는 새로운 dispatch메소드인 selectBook을 알아야 하고,
// prop으로 이용 가능하다.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);

// https://react-redux.js.org/api/connect