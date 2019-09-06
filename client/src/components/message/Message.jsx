import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { Mutation } from "react-apollo";
import ReactionButton from "../ReactionButton/ReactionButton";
import Popup from "../popup/Popup";
import { GET_MESSAGES, POST_MESSAGE } from "../../queries";

import "./message.css";

const cardStyle = {
  width: "40%",
  height: "80%"
};

const Message = ({ message }) => {
  const [replyText, setText] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const { id, userId, text, reply, likeCount, dislikeCount } = message;

  const toggleEditMode = () => {
    setIsEdited(!isEdited);
    setText("");
  };

  const onChange = e => {
    setText(e.target.value);
  };

  const _updateStoreAfterAddingMessage = (store, newMessage) => {
    const data = store.readQuery({
      query: GET_MESSAGES
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

  return isEdited ? (
    <Mutation
      mutation={POST_MESSAGE}
      update={(store, { data: { postMessage } }) => {
        _updateStoreAfterAddingMessage(store, postMessage);
      }}
      variables={{
        userId: localStorage.getItem("userId"),
        text: replyText,
        reply: id
      }}
    >
      {postMessage => (
        <form
          onSubmit={event => {
            event.preventDefault();

            if (!text) return;
            postMessage();
            toggleEditMode();
          }}
        >
          <Input
            defaultValue={replyText}
            placeholder={`Reply to #${id}`}
            onChange={onChange}
          />
          <Button color="red" onClick={toggleEditMode}>
            Cancel
          </Button>
          <Button type="submit">SUBMIT</Button>
        </form>
      )}
    </Mutation>
  ) : (
    <div className="message--self">
      <Card style={cardStyle} raised={true}>
        <CardContent className="message__card">
          <div className="message__text-wrapper">
            <div className="message__body">
              <Typography variant="body1" component="p" color="textPrimary">
                {text}
              </Typography>
            </div>
            <div className="message__username">
              <Typography variant="subtitle2" component="h1" color="primary">
                {id}
              </Typography>
            </div>
          </div>
          <div className="message__control">
            <div className="reactions">
              <ReactionButton isLike={true} messageId={id} amount={likeCount} />
              <ReactionButton
                isLike={false}
                messageId={id}
                amount={dislikeCount}
              />
            </div>
            {!reply && <Button onClick={toggleEditMode}>Reply</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Message;
