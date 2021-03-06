import React, { Component } from "react";
import { fetchPostNewEntry } from "../fetches.js";

class EntryForm extends Component {
  state = {
    content: "",
    checked: false
  };

  handleChange = event => {
    this.setState({
      content: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let entryContent = this.state.content;
    let userID = this.props.user.id;
    let privacyInput = event.target.children[2].children[0].checked;

    this.postNewDiaryEntry(userID, entryContent, privacyInput);
  };

  postNewDiaryEntry = (userID, entryContent, privacyInput) => {
    let token = localStorage.getItem("token");

    fetchPostNewEntry(userID, entryContent, privacyInput, token).then(data => {
      console.log(data);
      this.props.addEntry(data);
      this.props.entryLogged();
      this.setState({
        content: ""
      });
    });
  };

  getTodaysDate = () => {
    let date = new Date().toDateString();
    return date;
  };

  getTodaysTime = () => {
    let time = new Date().toLocaleTimeString();
    return time;
  };

  toggleCheckbox = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group new-entry-container">
            <h3>{this.getTodaysDate()}</h3>
            <h6>{this.getTodaysTime()}</h6>
            <textarea onChange={this.handleChange} id="new-diary-entry" />
          </div>

          <button id="submit-entry" type="submit">
            Submit
          </button>
          <div onClick={this.toggleCheckbox} id="private">
            Private{" "}
            <input
              type="checkbox"
              id="private-checkbox"
              checked={this.state.checked}
            />
          </div>
        </form>

        <button id="cancel-entry" onClick={this.props.entryLogged}>
          Cancel
        </button>
      </>
    );
  }
}

export default EntryForm;
