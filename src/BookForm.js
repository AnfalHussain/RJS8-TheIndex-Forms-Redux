import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

class BookForm extends Component {
  state = {
    title: "",
    color: "",
    authors: [this.props.author.id]
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  // handle changes in the form 
  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  //used to reset the form 
  submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.closeModal);
  };

  render() {
    const errors = this.props.errors;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.title}
              onChange={this.textChangeHandler} />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="color"
              value={this.state.color}
              onChange={this.textChangeHandler} /> />
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
    postBook: (newBook, closeModal) =>
      dispatch(actionCreators.postBook(newBook, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);

