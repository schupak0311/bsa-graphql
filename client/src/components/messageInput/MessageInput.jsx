import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";
import { GET_MESSAGES, POST_MESSAGE } from "../../queries";

import "./messageInput.css";

const buttonStyle = {
  backgroundColor: "#5682a3",
  color: "#fff"
};

const MessageInput = ({ skip, first, orderBy, reply }) => {
  const [text, setText] = useState("");

  const onChange = e => setText(e.target.value);

  const _updateStoreAfterAddingMessage = (store, newMessage) => {
    const data = store.readQuery({
      query: GET_MESSAGES,
      variables: {
        skip,
        first,
        orderBy
      }
    });
    store.writeQuery({
      query: GET_MESSAGES,
      data: {
        messages: {
          messageList: [...data.messages.messageList, newMessage]
        },
        count: data.messages.count + 1
      }
    });
  };

  return (
    <Mutation
      mutation={POST_MESSAGE}
      update={(store, { data: { postMessage } }) => {
        _updateStoreAfterAddingMessage(store, postMessage);
      }}
      variables={{
        userId: localStorage.getItem("userId"),
        text,
        reply
      }}
    >
      {postMessage => (
        <form
          onSubmit={e => {
            e.preventDefault();
            postMessage();
            setText("");
          }}
          className={"form form--chat"}
        >
          <Input
            placeholder="Enter the message"
            onChange={onChange}
            defaultValue={text}
            className="form__input"
          />
          <Button type="submit" style={buttonStyle}>
            SUBMIT
          </Button>
        </form>
      )}
    </Mutation>
  );
};

export default MessageInput;
