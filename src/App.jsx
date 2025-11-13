import "./App.css";
import { FeedbackOptions } from "./Components/FeedbackOptions/FeedbackOptions";
import { Section } from "./Components/Section/Section";
import { Component } from "react";
import { Statistics } from "./Components/Statistics/Statistics";
import { Notification } from "./Components/Notification/Notification";

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleLeaveFeedback = (option) => {
    this.setState((prev) => ({
      [option]: prev[option] + 1,
    }));
  };

  render() {
    const feedback = this.state.bad || this.state.good || this.state.neutral;
    const option = Object.keys(this.state);

    return (
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={option}
          onLeaveFeedback={this.handleLeaveFeedback}
        />
        
        <h2>Statistics</h2>
        {feedback ? (<Statistics good={this.state.good} neutral={this.state.neutral} bad={this.state.bad} />) : (<Notification message="There is no feedback" />)}
      </Section>
    );
  }
}
