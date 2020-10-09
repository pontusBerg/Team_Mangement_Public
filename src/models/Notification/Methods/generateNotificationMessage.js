module.exports = function (NotificationSchema) {
  NotificationSchema.statics.generateNotificationMessage = function (todo, type, user) {
    let responseMessage;

    if (user._id !== todo.user && type === "create") {
      responseMessage = `${user.name} created ${todo.name} and assigned it to you.`
    }
    return responseMessage
  }

}