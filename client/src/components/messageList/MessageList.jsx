import React from "react";
import { Query } from "react-apollo";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Pagination } from "semantic-ui-react";
import Message from "../message/Message";
import { GET_MESSAGES, NEW_MESSAGE_SUBSCRIPTION } from "../../queries";

import "./messageList.css";

const MessageList = ({
  first,
  skip,
  orderBy,
  messagePerPage,
  onPageChange
}) => {
  const _subscribeToNewMessages = subscribeToMore => {
    subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.newMessage;

        return {
          messages: {
            messageList: [...prev.messages.messageList, newMessage],
            count: prev.messages.messageList.length + 1
          }
        };
      }
    });
  };
  return (
    <Query query={GET_MESSAGES} variables={{ first, skip, orderBy }}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) {
          return (
            <div className="spinner">
              <CircularProgress size="50px" />
            </div>
          );
        }

        if (error) {
          return <div>Error...</div>;
        }

        _subscribeToNewMessages(subscribeToMore);
        const { messageList, count } = data.messages;
        const numberOfPages = Math.ceil(count / 4);
        return (
          <div>
            <div className="message-list">
              {messageList.map(message => {
                return <Message key={message.id} message={message} />;
              })}
            </div>

            <div className="pagination">
              <Pagination
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={3}
                totalPages={numberOfPages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default MessageList;
