import questions from './questions'
import autheduser from './authedUser'
import users from './users'
import { combineReducers } from 'redux'




export default  combineReducers({
        questions,
        users,
        autheduser,
    })