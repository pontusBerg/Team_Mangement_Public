const jwt = require('jsonwebtoken');
const User = require('../models/User/User')



const auth = async (req, res, next) => {
  const token = req.cookies.token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    })

    if (!user) {
      throw new Error('No user found')
    }
    req.user = user
    next()
  } catch (error) {
    // Remove token and cookie if expired or invalid. " b"
    if (error.message === "jwt expired" || error.message === "invalid signature") {

      const user = await User.findOne({
        'tokens.token': token
      })
      user.tokens.filter(token => token !== req.cookies.token);
      await user.save()
      return res.clearCookie('token').send()
    }


    res.status(400).send({
      error: "Please authenticate"
    })
  }
}

module.exports = auth