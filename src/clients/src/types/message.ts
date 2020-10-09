

export interface Message {
  message: string,
  createdAt: Date,
  _id: string, 
  user: {
    name: string,
    profileImg: string,
    _id: string,
  }
}