import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
	// life cycle method, auto-called right after component is rendered
	componentDidMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		// lodash map for object
		return _.map(this.props.posts, post => {
			return (
				<li key={post.id} className="list-group-item">
					<Link to={`/posts/${post.id}`}>
						{post.title}
					</Link>
				</li>
			);
		});
	}

	render() {
		return (
			<div>
				<div className="text-xs-right">
					<Link className="btn btn-primary" to="/posts/new">
						Add a Post
					</Link>
				</div>
				<h3>Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

// map application state to props
function mapStateToProps(state) {
	return { posts: state.posts };
}

// shortcut to bind dispatch function to props
// export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);