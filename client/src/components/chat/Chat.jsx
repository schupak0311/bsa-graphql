import React from "react";
import uuidv4 from "uuid/v4";
import Header from "../header/Header";
import MessageList from "../messageList/MessageList";
import Popup from "../popup/Popup";
import MessageInput from "../messageInput/MessageInput";

import "./chat.css";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    const userId = localStorage.getItem("userId");

    if (!userId) localStorage.setItem("userId", uuidv4());

    this.state = {
      currentUser: localStorage.getItem("userId"),
      skip: 0,
      first: 4,
      orderBy: "createdAt_ASC"
    };
  }

  onPageChange = (e, { activePage }) => {
    this.setState({
      skip: (activePage - 1) * 4
    });
  };

  render() {
    const { skip, first, orderBy } = this.state;

    return (
      <div className="chat">
        <div className="chat__inner">
          <Header />
          <div className="chat__content">
            <MessageList
              first={first}
              skip={skip}
              messagePerPage={4}
              orderBy={orderBy}
              onPageChange={this.onPageChange}
            />
            <MessageInput />
          </div>
        </div>
      </div>
    );
  }
}
