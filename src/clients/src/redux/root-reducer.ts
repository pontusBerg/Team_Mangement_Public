import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import userTodoReducer from './user-todos/user-todo.reducer'
import teamMessagesReducer from './team-chat/team-chat.reducer'
import NotificationsReducer from './notifications/notifications.reducer'
import teamTodoReducer from './team-todos/team-todos.reducer'
import dashboardMessagesReducer from './dashboard-chat/dashboard-chat.reducer'
export default combineReducers({
    userInfo: userReducer,
    userTodoInfo: userTodoReducer,
    teamTodoInfo: teamTodoReducer,
    dashboardMessagesInfo: dashboardMessagesReducer,
    teamMessagesInfo:  teamMessagesReducer,
    notificationsInfo: NotificationsReducer
})