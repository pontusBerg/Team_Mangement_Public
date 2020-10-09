export interface Notification {
  _id: string,
  description: string, 
  seen: boolean, 
  todo: string, 
  createdBy: {
    name: string,
    profileImg: string
  }
  createdAt: Date,
}