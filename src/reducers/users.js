import {ACTION_TYPES} from './../actions/actions'


const   usersReducer = (state={},action)=>{

    switch(action.type){
        
        case ACTION_TYPES.ADD_USERS:    
            let users = {
                ...state,
                ...action.users
            }
            return users
        
            default: return state;
    }
  }
  export default usersReducer;
