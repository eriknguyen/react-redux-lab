import React, { Component } from 'react';

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

    // clear the form
    this.setState({
      comment: ''
    })
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className='comment-box'>
        <textarea 
          onChange={this.handleChange.bind(this)}
          value={this.state.comment}
          />
        <button>Submit Comment</button>
      </form>
    );
  }
}

export default CommentBox;
