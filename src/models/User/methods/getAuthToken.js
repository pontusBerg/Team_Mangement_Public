const jwt = require('jsonwebtoken')

module.exports = function(UserSchema) {
  UserSchema.methods.getAuthToken = async function() {
    const token = jwt.sign({
      _id: this._id.toString()
    }, process.env.JWT_SECRET , {
      expiresIn: '1h',
    })

    this.tokens = this.tokens.concat({
      token
    })
    this.save()

    return token
  }
}
