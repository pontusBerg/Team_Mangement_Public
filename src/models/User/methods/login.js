
const bcrypt = require('bcryptjs')
module.exports = function(userSchema) {
  userSchema.statics.login = async function (email, password) {
    const User = this

    const user = await User.findOne({email})
    
    if (!user) throw new Error("Unable to find user")
    
    const passwordsMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordsMatch) throw new Error("Could not sign in")

    return user
  }

}