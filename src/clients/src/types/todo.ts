export interface Todo {
  _id: string, 
  title: string,
  description: string, 
  urgency: string,
  difficulty: string,
  category: string, 
  user: number, 
  team: number,
  completed: boolean,
  createdAt: string,
  updatedAt: string,
}
export interface TodoAndUser {
  _id: string, 
  title: string,
  description: string, 
  urgency: string,
  difficulty: string,
  category: string, 
  completed: boolean,
  user: {
    name: string,
    profileImg: string, 
    _id: string, 
  
  },  
  team: number,
  createdAt: string,
  updatedAt: string,
}

export interface NonSavedTodo {
  title: string,
  description: string, 
  urgency: string,
  difficulty: string,
  user: string, 
  category: string, 
}

export interface EditTodoInterface {
  title: string, 
  description: string, 
  selectedUser: string, 
  selectedCategory: string,
  urgency: string, 
  difficulty: string,
  }
  