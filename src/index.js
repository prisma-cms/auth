

const jwt = require('jsonwebtoken')

export const getUserId = async function (ctx, token) {
  
  const Authorization = token || (ctx.request && ctx.request.get('Authorization'))
  
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)

    const userExists = await ctx.db.exists.User({
      id: userId,
    });

    if(!userExists){
      throw new AuthError()
    }

    return userId
  }

  throw new AuthError()
}


class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

export default getUserId;

module.exports = {
  getUserId,
}