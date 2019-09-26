import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class AuthorForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    imageUrl: "",
    books: []
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  // handle changes in the form 
  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  //used to reset the form 
  resetForm = () => this.setState({
    first_name: "",
    last_name: "",
    imageUrl: ""
  })

  submitAuthor = event => {
    event.preventDefault();
    this.props.postAuthor(this.state, this.resetForm, this.props.closeModal);
  };

  render() {
    const errors = this.props.errors;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitAuthor}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={this.state.first_name}
              onChange={this.textChangeHandler} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={this.state.last_name}
              onChange={this.textChangeHandler} /> />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.textChangeHandler} />
            />
          </div>
          <input
            type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postAuthor: (newAuthor, resetForm, closeModal) =>
      dispatch(actionCreators.postAuthor(newAuthor, resetForm, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorForm);
