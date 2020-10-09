module.exports = function (TimelineSchema) {
  TimelineSchema.statics.generateTimelineMessage = function (type, user, changes) {



    if (type === "create") {
      return `Created todo`
    }

    if (type === "update") {
      const messages = []
      for (let val in changes) {
        if (messages.length === 0) {
          messages.push(`Changed ${val} to ${changes[val]}`);


        } else if (val === "user") {
          if (user === null || user === "null") {
            messages.push(`${''} and ${val} to Unassigned`);
          } else {
            
            messages.push(`${''} and ${val} to ${changes.user.name}`);
          }

        } else {
          messages.push(`${''} and ${val} to ${changes[val]}`);
        }
      }
      const message = messages.join(",");
      return message
    }
  }
}