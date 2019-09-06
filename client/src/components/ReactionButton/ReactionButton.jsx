import React from "react";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import { GET_MESSAGES, SET_REACTION_MUTATION } from "../../queries";

const ReactionButton = ({ isLike, messageId, amount }) => {
  const _updateStoreWithNewReaction = (store, updatedMessage, messageId) => {
    const data = store.readQuery({
      query: GET_MESSAGES
    });
    const reactedPostIndex = data.messages.messageList.findIndex(
      message => message.id === messageId
    );
    data.messages.messageList[reactedPostIndex].likeCount =
      updatedMessage.likeCount;
    data.messages.messageList[reactedPostIndex].dislikeCount =
      updatedMessage.dislikeCount;
    store.writeQuery({
      query: GET_MESSAGES,
      data
    });
  };

  return (
    <Mutation
      mutation={SET_REACTION_MUTATION}
      variables={{
        userId: localStorage.getItem("userId"),
        isLike,
        messageId
      }}
      update={(store, { data: { setReaction } }) => {
        _updateStoreWithNewReaction(store, setReaction, messageId);
      }}
    >
      {setReaction => (
        <div>
          <Button onClick={setReaction}>
            <Icon className={`far fa-thumbs-${isLike ? "up" : "down"}`} />
            <span>{amount}</span>
          </Button>
        </div>
      )}
    </Mutation>
  );
};

export default ReactionButton;
