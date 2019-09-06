import gql from "graphql-tag";

export const GET_MESSAGES = gql`
  query messageQuery(
    $filter: String
    $skip: Int
    $first: Int
    $orderBy: MessagesOrderBy
  ) {
    messages(filter: $filter, skip: $skip, first: $first, orderBy: $orderBy) {
      messageList {
        id
        userId
        text
        reply
        likeCount
        dislikeCount
      }
      count
    }
  }
`;
export const POST_MESSAGE = gql`
  mutation messageMutation($userId: String!, $text: String!, $reply: Int) {
    postMessage(userId: $userId, text: $text, reply: $reply) {
      id
      userId
      text
      reply
      likeCount
      dislikeCount
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription {
    newMessage {
      id
      userId
      text
      reply
      likeCount
      dislikeCount
    }
  }
`;

export const SET_REACTION_MUTATION = gql`
  mutation setReaction($userId: String!, $isLike: Boolean!, $messageId: Int!) {
    setReaction(userId: $userId, isLike: $isLike, messageId: $messageId) {
      id
      userId
      text
      reply
      likeCount
      dislikeCount
    }
  }
`;
