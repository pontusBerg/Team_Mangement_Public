
module.exports = function(userSchema) {
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    throw new Error('Email already exists')
  } else {
    next();
  }
})
}