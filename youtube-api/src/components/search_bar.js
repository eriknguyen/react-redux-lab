import React, { Component } from 'react';

// functional component
/*const SearchBar = () => {
	return <input />
}*/

// class-based component
class SearchBar extends Component {
	// use constructor and define state
	constructor(props) {
		super(props);

		// init state with an empty search term
		this.state = { term: '' };
	}

	render() {
		return (
			<div className="search-bar">
				<input
					value={this.state.term}
					onChange={event => this.onInputChange(event.target.value)}
				/>
			</div>
		);
	}

	onInputChange(term) {
		this.setState({ term });
		this.props.onSearchTermChange(term);
	}
}

export default SearchBar;
