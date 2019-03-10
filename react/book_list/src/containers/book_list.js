// 책 리스트를 렌더링 한다.
import React, { Component } from 'react';
import { connect } from 'react-redux';

// 컨테이너는 리덕스에 의해 만들어지는 스테이트를 직접 접근하는 컴포넌트이다.
// 즉, 컴포넌트에 데이터를 주입하기위해 사용한다
// 스테이트의 특정부분을 이용하는 최상위 부모 컴포넌트만이 리덕스에 연결되어야 한다.
class BookList extends Component {
    renderList() {
        return this.props.books.map((book)=>{
            return (
                <li key={book.title} className="list-group-item">{book.title}</li>
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

export default connect(mapStateToProps)(BookList);