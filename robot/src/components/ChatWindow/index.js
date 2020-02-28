import React, { Component } from "react";
import Message from "../Message";
import Textfield from "@atlaskit/textfield";
import AnimateHeight from "../../modules/AnimateHeight";
import Pusher from "pusher-js";
import moment from "moment";
import initial from 'lodash.initial';
import "./ChatWindow.css";
import '../../constants'
import { API_PATH } from "../../constants";
import gifbubble from '../../images/typing-animation.gif';
import { animateScroll } from "react-scroll";

const MY_USER_ID = "apple";

let apiPath = `${API_PATH}/chat`

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
    this.chatRef = React.createRef();
    this.state = {
      userMessage: '',
      messages: [],
      isOpen: false,
      firstCall: true,
    };
  }

  componentDidMount() {
    const pusher = new Pusher("3779809c82eb69c59f34", {
      cluster: "us3",
      encrypted: true,
    });

    //const objDiv = document.getElementById('chat');

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      console.log("responce from pusher", data)
      if (data.sessionId === sessionID) {
        const msg = {
          message: data.message,
          author: 'ai',
        };
        // this.setState({
        //   messages: [...initial(this.state.messages), msg],
        // });
        if (data.news) {
          if (data.news.length === 0){ // Harold found news articles
            msg.message = "That's strange, I cant find any news about that."
          }
          this.props.sendCardData(data.news);
        } else {
          this.props.sendCardData(null);
        }
        this.setState({
          messages: [...initial(this.state.messages), msg],
        });
        animateScroll.scrollToBottom({
          containerId: "chat"
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

    const bubbleMsg = {
      message: <img src={gifbubble} alt="Typing Animation" />,
      author: "none",
      type: "bubble-placeholder"
    }

    this.setState({
      messages: [...this.state.messages, msg, bubbleMsg],
    });
    console.log(this.state.userMessage);
    fetch(apiPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.state.userMessage,
        sessionId: sessionID,
      }),
    });

    this.setState({ 
      userMessage: '' 
    });
  };

  setOpen = () => {
    this.setState({ isOpen: true });
    if (this.state.firstCall) {
      const bubbleMsg = {
        message: <img src={gifbubble} alt="Typing Animation" />,
        author: "none",
        type: "bubble-placeholder"
      }

      this.setState({
        messages: [...this.state.messages, bubbleMsg],
        firstCall: false,
      });

      fetch(apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: "initial1111",
          sessionId: sessionID,
        }),
      });
    }
    
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
      return tempMessages;
    };

    return (
      <div className="message-list">
        <AnimateHeight variants={this.variants} isVisible={this.state.isOpen}>
          <div style={{ height: 270 }} id="chat" className="message-list-container">
            {renderMessages()}
          </div>
        </AnimateHeight>
  
        <form onSubmit={this.handleSubmit}>
          <Textfield
            onClick={this.setOpen}
            value={this.state.userMessage}
            onChange={this.handleChange}
            name="placeholder"
            placeholder="Start chatting to Harold..."
          />
        </form>
      </div>
    );
  }
}

