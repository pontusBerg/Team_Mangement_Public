module.exports = function (userSchema) {
  userSchema.statics.logout = async function (user) {
    const authToken = req.cookies.token

    user.tokens.filter(token => token !== authToken)

    await user.save()
    return user
  }
}