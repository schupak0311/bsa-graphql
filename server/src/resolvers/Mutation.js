const Mutation = {
  postMessage(parent, args, ctx) {
    const { userId, text, replyTo } = args;

    return ctx.prisma.createMessage({
      userId,
      text,
      replyTo
    });
  },

  async setReaction(parent, args, ctx, info) {
    const { userId, isLike, messageId } = args;
    const isReaction = await ctx.prisma.$exists.messageReaction({
      userId,
      message: { id: messageId }
    });

    if (isReaction) {
      const reactions = await ctx.prisma.messageReactions({
        where: { userId },
        message: { id: messageId }
      });
      const reaction = reactions[0];

      if (reaction.isLike === isLike) {
        await ctx.prisma.deleteMessageReaction({ id: reaction.id });
      } else {
        await ctx.prisma.updateMessageReaction({
          data: { isLike: !reaction.isLike },
          where: { id: reaction.id }
        });
      }
    } else {
      await ctx.prisma.createMessageReaction({
        userId,
        isLike,
        message: {
          connect: { id: messageId }
        }
      });
    }

    return ctx.prisma.message({ id: messageId });
  }
};

module.exports = Mutation;
