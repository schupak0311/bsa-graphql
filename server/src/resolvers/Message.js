const Message = {
  async reactions(parent, args, ctx) {
    const reaction = await ctx.prisma.messageReactions({
      where: {
        message: {
          id: parent.id
        }
      }
    });
    return reaction;
  },

  async likeCount(parent, args, ctx) {
    const likes = await ctx.prisma
      .messageReactionsConnection({
        where: { message: { id: parent.id }, isLike: true }
      })
      .aggregate()
      .count();

    return likes;
  },

  async dislikeCount(parent, args, ctx) {
    dislikes = await ctx.prisma
      .messageReactionsConnection({
        where: { message: { id: parent.id }, isLike: false }
      })
      .aggregate()
      .count();

    return dislikes;
  }
};

module.exports = Message;
