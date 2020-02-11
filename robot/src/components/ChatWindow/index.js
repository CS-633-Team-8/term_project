import React, { Component } from "react";
import Message from "../Message";
import Textfield from "@atlaskit/textfield";
import AnimateHeight from "../../modules/AnimateHeight";
import Pusher from "pusher-js";
import moment from "moment";
import "./ChatWindow.css";
import '../../constants'
import { API_PATH } from "../../constants";

const MY_USER_ID = "apple";

let apiPath = API_PATH

if (process.env.NODE_ENV !== 'production') {
  apiPath = 'http://localhost:5000/chat'
}

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

const sessionID = ID()

export default class ChatInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      messages: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    const pusher = new Pusher("3779809c82eb69c59f34", {
      cluster: "us3",
      encrypted: true,
    });

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      console.log("responce from pusher", data)
      if (data.sessionId === sessionID) {
        const msg = {
          message: data.message,
          author: 'ai',
        };
        this.setState({
          messages: [...this.state.messages, msg],
        });
      }
    });
  }

  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.userMessage.trim()) return;

    const msg = {
      message: this.state.userMessage,
      author: MY_USER_ID,
    };

    this.setState({
      messages: [...this.state.messages, msg],
    });

    fetch(apiPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.state.userMessage,
        sessionId: sessionID,
      }),
    });

    this.setState({ userMessage: '' });
  };

  setOpen = () => {
    this.setState({ isOpen: true });
  }

  render() {
    const renderMessages = () => {
      let i = 0;
      let messageCount = this.state.messages.length;
      let currentMessages = this.state.messages;
      let tempMessages = [];
  
      while (i < messageCount) {
        let previous = currentMessages[i - 1];
        let current = currentMessages[i];
        let next = currentMessages[i + 1];
        let isMine = current.author === MY_USER_ID;
        let currentMoment = moment(current.timestamp);
        let prevBySameAuthor = false;
        let nextBySameAuthor = false;
        let startsSequence = true;
        let endsSequence = true;
        let showTimestamp = false;
  
        if (previous) {
          let previousMoment = moment(previous.timestamp);
          let previousDuration = moment.duration(currentMoment.diff(previousMoment));
          prevBySameAuthor = previous.author === current.author;
  
          if (prevBySameAuthor && previousDuration.as('hours') < 1) {
            startsSequence = false;
          }
  
          // if (prevBySameAuthor) {
          //   startsSequence = false;
          // }
  
          if (previousDuration.as('hours') < 1) {
            showTimestamp = false;
          }
        }
  
        if (next) {
          let nextMoment = moment(next.timestamp);
          let nextDuration = moment.duration(nextMoment.diff(currentMoment));
          nextBySameAuthor = next.author === current.author;
  
          if (nextBySameAuthor && nextDuration.as('hours') < 1) {
            endsSequence = false;
          }
          // if (nextBySameAuthor) {
          //   endsSequence = false;
          // }
        }
  
        tempMessages.push(
          <Message
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
          />
        );
  
        // Proceed to the next message.
        i += 1;
      }
      console.log('temp, ', tempMessages)
      return tempMessages;
    };

    return (
      <div className="message-list">
        <AnimateHeight variants={this.variants} isVisible={this.state.isOpen}>
          <div style={{ height: 270 }} className="message-list-container">
            {renderMessages()}
          </div>
        </AnimateHeight>
  
        <form onSubmit={this.handleSubmit}>
          <Textfield
            onClick={this.setOpen}
            value={this.state.userMessage}
            onInput={this.handleChange}
            name="placeholder"
            placeholder="Start chatting to Harold..."
          />
        </form>
      </div>
    );
  }
}

