// Verify that user is the owner, or that todo has no owner of the todo that's being edited / deleted.


module.exports = function (userSchema) {
  userSchema.statics.verifyUser = async function (todoId, userId) {
  
      const Todo = this
      const todo = await Todo.findById(todoId)

      if (!todo) throw new Error("Todo could not be found")
      
    

      if (todo.user !== null && todo.user.toString() !== userId.toString()) throw new Error("You don't have permission to update this item.")

      return todo
  }
}