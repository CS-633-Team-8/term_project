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

// export default function ChatWindow(props) {
//   const [messages, setMessages] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [userMessage, setUserMessage] = useState([]);

//   const variants = {
//     open: {
//       opacity: 1,
//       height: "270px",
//       x: 0
//     },
//     collapsed: { opacity: 0, height: 120, x: 30 }
//   };

//   useWhatChanged([messages, userMessage], 'messages, userMessage'); 

//   // useEffect(() => {
//   // //renderMessages();
//   // }, []);

//   const pusher = new Pusher("3779809c82eb69c59f34", {
//     cluster: "us3",
//     encrypted: true
//   });

//   const channel = pusher.subscribe("bot");
//   channel.bind("bot-response", data => {
//     messageReceived(data);
//   });

//   const messageReceived = data => {
//     const msg = {
//       message: data.message,
//       author: "ai",
//       timestamp: new Date().getTime()
//     };
//     setMessages([...messages, msg]);
//   }

//   const handleSubmit = event => {
//     event.preventDefault();
//     if (!userMessage.trim()) return;

//     sendMessage();
//   };

//   // TRY CLASS AS PER TUTORIAL https://pusher.com/tutorials/weather-chatbot-react-dialogflow

//   const sendMessage = () => {
//     const msg = {
//       message: userMessage,
//       author: MY_USER_ID,
//       timestamp: new Date().getTime()
//     };

//     setMessages([...messages, msg]);

//     setUserMessage("");
  
//     fetch("http://localhost:5000/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         message: msg.userMessage
//       })
//     });
//   }

//   // const getMessages = () => {
//   //   var tempMessages = [
//   //     {
//   //       id: 1,
//   //       author: "apple",
//   //       message:
//   //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
//   //       timestamp: new Date().getTime()
//   //     },
//   //     {
//   //       id: 2,
//   //       author: "orange",
//   //       message:
//   //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
//   //       timestamp: new Date().getTime()
//   //     },
//   //     {
//   //       id: 3,
//   //       author: "orange",
//   //       message:
//   //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
//   //       timestamp: new Date().getTime()
//   //     },
//   //     {
//   //       id: 4,
//   //       author: "apple",
//   //       message:
//   //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
//   //       timestamp: new Date().getTime()
//   //     },
//   //     {
//   //       id: 5,
//   //       author: "apple",
//   //       message:
//   //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
//   //       timestamp: new Date().getTime()
//   //     },
//   //     {
//   //       id: 6,
//   //       author: "apple",
//   //       message:
//   //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
//   //       timestamp: new Date().getTime()
//   //     },
//   //     {
//   //       id: 7,
//   //       author: "orange",
//   //       message:
//   //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
//   //       timestamp: new Date().getTime()
//   //     },
//   //     {
//   //       id: 8,
//   //       author: "orange",
//   //       message:
//   //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
//   //       timestamp: new Date().getTime()
//   //     },
//   //     {
//   //       id: 9,
//   //       author: "apple",
//   //       message:
//   //         "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
//   //       timestamp: new Date().getTime()
//   //     },
//   //     {
//   //       id: 10,
//   //       author: "orange",
//   //       message:
//   //         "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
//   //       timestamp: new Date().getTime()
//   //     }
//   //   ];
//   //   setMessages([...messages, ...tempMessages]);
//   // };

//   const renderMessages = () => {
//     let i = 0;
//     let messageCount = messages.length;
//     let tempMessages = [];

//     while (i < messageCount) {
//       let previous = messages[i - 1];
//       let current = messages[i];
//       let next = messages[i + 1];
//       let isMine = current.author === MY_USER_ID;
//       let currentMoment = moment(current.timestamp);
//       let prevBySameAuthor = false;
//       let nextBySameAuthor = false;
//       let startsSequence = true;
//       let endsSequence = true;
//       let showTimestamp = false;

//       if (previous) {
//         let previousMoment = moment(previous.timestamp);
//         let previousDuration = moment.duration(currentMoment.diff(previousMoment));
//         prevBySameAuthor = previous.author === current.author;

//         if (prevBySameAuthor && previousDuration.as('hours') < 1) {
//           startsSequence = false;
//         }

//         // if (prevBySameAuthor) {
//         //   startsSequence = false;
//         // }

//         if (previousDuration.as('hours') < 1) {
//           showTimestamp = false;
//         }
//       }

//       if (next) {
//         let nextMoment = moment(next.timestamp);
//         let nextDuration = moment.duration(nextMoment.diff(currentMoment));
//         nextBySameAuthor = next.author === current.author;

//         if (nextBySameAuthor && nextDuration.as('hours') < 1) {
//           endsSequence = false;
//         }
//         // if (nextBySameAuthor) {
//         //   endsSequence = false;
//         // }
//       }

//       tempMessages.push(
//         <Message
//           key={i}
//           isMine={isMine}
//           startsSequence={startsSequence}
//           endsSequence={endsSequence}
//           showTimestamp={showTimestamp}
//           data={current}
//         />
//       );

//       // Proceed to the next message.
//       i += 1;
//     }
//     console.log('temp, ', tempMessages)
//     return tempMessages;
//   };

//   return (
//     <div className="message-list">
//       <AnimateHeight variants={variants} isVisible={isOpen}>
//         <div style={{ height: 270 }} className="message-list-container">
//           {renderMessages()}
//         </div>
//       </AnimateHeight>

//       <form onSubmit={e => handleSubmit(e)}>
//         <Textfield
//           onClick={() => setIsOpen(true)}
//           value={userMessage}
//           onChange={e => setUserMessage(e.target.value)}
//           name="placeholder"
//           placeholder="Start chatting to Harold..."
//         />
//       </form>
//     </div>
//   );
// }
