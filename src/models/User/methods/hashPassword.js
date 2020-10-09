const bcrypt = require('bcryptjs')


module.exports = function(userSchema) {

  userSchema.pre('save', async function(next) {

    if (this.isModified("password")) {
      try {
        this.password = await bcrypt.hash(this.password, 8)
        return next()
      } catch (error) {
        return next(error)
      }
    }
    next()
  }) 
}