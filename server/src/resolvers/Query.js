const Query = {
  async messages(parent, args, context) {
    const where = args.filter ? { text: args.filter } : {};

    const messageList = await context.prisma.messages({
      where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy
    });

    const count = await context.prisma
      .messagesConnection({ where })
      .aggregate()
      .count();

    return {
      messageList,
      count
    };
  }
};

module.exports = Query;
