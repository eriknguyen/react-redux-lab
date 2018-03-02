import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // send ajax request to submit form to server
    
    // set redux state to comment value using `saveComment` action creator
    this.props.saveComment(this.state.comment);

    // clear the form
    this.setState({
      comment: ''
    })
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className='comment-box'>
        <h4>Add a comment</h4>
        <textarea 
          onChange={this.handleChange.bind(this)}
          value={this.state.comment}
          />
        <div>
          <button>Submit Comment</button>
        </div>
      </form>
    );
  }
}

// using shortcut for mapDispatchToProps
export default connect(null, actions)(CommentBox);
