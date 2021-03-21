import {ACTION_TYPES} from './../actions/actions'

const  questionsReducer = (state=null,action)=>{
    
    switch(action.type){
        case ACTION_TYPES.NEW_QUESTION:
            {   const question = action.question;
                let back = {
                    ...state,
                    questions:{
                        ...state.questions,
                        [question.id]: question
                    },
                    users: {
                        ...state.users,
                       [question.author]:{
                         ...state.users[question.author],
                         questions : state.users[question.author].questions.concat(question.id)
                       }
                    }
                }
                return back;
        
            }
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
            let questions = {
                ...state,
                ...action.questions
            } 
            return  questions;
        
        default: return state;
    }
  }

  export default questionsReducer;