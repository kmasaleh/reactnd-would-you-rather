import { _getQuestions, _getUsers } from "../_DATA"
import {_saveQuestionAnswer} from './../_DATA'
import { combineReducers } from 'redux'



export const ACTION_TYPES = {
    ADD_QUESTIONS : "ADD_QUESTIONS",
    ADD_USERS : "ADD_USERS" ,
    SIGN_IN : "SIGN_IN",
    SIGN_OUT : "SIGN_OUT",
    VOTE : "VOTE"
}

export const globalReducer = (state={},action)=>{

    switch(action.type){
        case ACTION_TYPES.VOTE:
            const question = action.question
            const answer=action.answer
            const user = action.user
            const _BLA_BLA_ = 
             {
                ...state,
                users : {
                    ...state.users,
                    [user.id]:{
                        ...state.users[user.id],
                        answers:{
                            ...state.users[user.id].answers,
                            [question.id]:answer
                        }
                    }
                },
                questions: {
                    ...state.questions,
                    [question.id] : {
                       ...state.questions[question.id],
                       [answer]:{
                           ...state.questions[question.id][answer],
                        votes: state.questions[question.id][answer].votes.concat([user.id])
                       }
                    }   
                }
            }
            return _BLA_BLA_;

        case ACTION_TYPES.ADD_QUESTIONS:
            return {
                ...state,
                ...action.questions
            } 
        case ACTION_TYPES.ADD_USERS:    
            return {
                ...state,
                ...action.users
            }
        case ACTION_TYPES.SIGN_IN:
            return {
                ...state,
                autheduser  : action.user
            }
        case ACTION_TYPES.SIGN_OUT:
            return {
                ...state,
                autheduser  : null
            }
        
        default: return state;
    }
  }

export const ACTION_FACTORY ={
    createAddQuestions : (questions)=> {
        return {
            type:ACTION_TYPES.ADD_QUESTIONS,
            questions
        }
    },
    createAddUsers : (users)=>{
        return {
            type: ACTION_TYPES.ADD_USERS,
            users
        }
    },
    createSigninUser : (user)=>{
        return {
            type: ACTION_TYPES.SIGN_IN,
            user
        }
    },
    createSignoutUser : (user)=>{
        return {
            type: ACTION_TYPES.SIGN_OUT,
            user
        }
    },
    createVote : ({question,answer,user})=>{
        return {
            type: ACTION_TYPES.VOTE,
            question,
            answer,
            user
        }
    },
}


export function handleSubmitVote  ({question,answer,user}){
    return (dispatch)=>{
        _saveQuestionAnswer ({authedUser:user.id, qid:question.id, answer})
        .then((response)=>{
            dispatch (ACTION_FACTORY.createVote({question,answer,user})) 
        })
    }
}

const asyncGetAllData = async ()=>{
    const [questions,users] = await  Promise.all([
          _getQuestions()  ,
          _getUsers()
    ]);
    return{
    questions : questions,
    users : users
    }
}


const getAllData =()=>{
    return Promise.all([
          _getQuestions()  ,
          _getUsers()
    ])
    .then( ([questions,users])=>{
        return{
        questions : questions,
        users : users
        }
    })
}



const dispatchAllActionsToStore = (dispatch)=>{
    getAllData().then( (data)=>{
        dispatch(ACTION_FACTORY.createAddQuestions(data.questions));
        dispatch(ACTION_FACTORY.createAddUsers(data.users));
    })
}


const asyncDispatchAllActionsToStore = async ( dispatch)=>{
    const data = await  asyncGetAllData();
    dispatch(ACTION_FACTORY.createAddQuestions( {questions : data.questions} ));
    dispatch(ACTION_FACTORY.createAddUsers({users:data.users}));

}

export const  getAllDataAction = ()=>{
 //   return dispatchAllActionsToStore;
    return  asyncDispatchAllActionsToStore;
}



