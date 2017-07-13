import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input
					type="text"
					className="form-control"
					{...field.input}
					/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		// added callback to createPost action creator
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Title"
					name="title"
					component={this.renderField}
					/>
				<Field
					label="Categories"
					name="categories"
					component={this.renderField}
					/>
				<Field 
					label="Post Content"
					name="content"
					component={this.renderField}
					/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	/*
	console.log(values) -> { title: 'skl', categories: 'skdjflsj', content: 'slkdld' }
	*/
	const errors = {};

	// validate the inputs from 'values'
	if (!values.title) {
		errors.title = "Enter a title!";
	}
	if (!values.categories) {
		errors.categories = "Enter some categories!";
	}
	// if (values.categories.length < 5) {
	// 	errors.title = "Categories should be at least 5 characters";
	// }
	if (!values.content) {
		errors.content = "Enter some content!";
	}

	return errors;
}


export default reduxForm({
	validate, // === validate: validate,
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);