import { _getQuestions, _getUsers } from "../_DATA"

export const ACTION_TYPES = {
    ADD_QUESTIONS : "ADD_QUESTIONS",
    ADD_USERS : "ADD_USERS" ,
}

export const globalReducer = (state={},action)=>{
    if(action.type == ACTION_TYPES.ADD_QUESTIONS){
    const r ={
        ...state,
        ...action.questions
    } 
    return  r;
    }

    if(action.type == ACTION_TYPES.ADD_USERS)
    return {
        ...state,
        ...action.users
    }
        
    return state;
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

