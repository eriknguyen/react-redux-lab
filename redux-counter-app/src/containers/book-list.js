import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
	renderList() {
		// need to get the list of books from Redux state here
		return this.props.books.map((book) => {
			return (
				<li 
					key={book.title} 
					onClick={() => this.props.selectBook(book)}
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

function mapStateToProps(state) {
	/*
		Whatever is returned will show up as props inside of BookList
	*/
	return {
		books: state.books
	};
}

/*
	`{ selectBook: selectBook }` will end up as `props` on the `BookList` container
	=> can use this.props.selectBook to access
*/
function mapDispatchToProps(dispatch) {
	/*
		Whenever selectBook is called, the result should be passed to all reducers
	*/
	return bindActionCreators({ selectBook: selectBook }, dispatch);
}

// use `connect` from `react-redux` to promote BookList from a component to a container
// it needs to know about this new dispatch method, selectBook.
// Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);