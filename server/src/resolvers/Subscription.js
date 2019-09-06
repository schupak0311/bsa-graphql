const newMessageSubscribe = (parent, args, ctx) => {
  return ctx.prisma.$subscribe
    .message({
      mutation_in: ["CREATED"]
    })
    .node();
};

const newMessage = {
  subscribe: newMessageSubscribe,
  resolve: payload => payload
};

const newReactionSubscribe = (parent, args, ctx) => {
    return ctx.prisma.$subscribe.messageReaction({
        mutation_in: ['CREATED', 'UPDATED', 'DELETED']
    }).previousValues();
}

const newReaction = {
    subscribe: newReactionSubscribe,
    resolve: payload => payload
}

module.exports = {newMessage, newReaction}