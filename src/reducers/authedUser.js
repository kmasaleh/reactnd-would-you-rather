import {ACTION_TYPES} from './../actions/actions'

 const   authedUserReducer = (state=null,action)=>{
    switch(action.type){
        
        case ACTION_TYPES.SIGN_IN:
            let result = {
                ...state,
                autheduser: action.user
            }
            return result;

            
        case ACTION_TYPES.SIGN_OUT:
            return {
                ...state,
                autheduser: null
            }
        
        default: return state;
    }
  }

  export default   authedUserReducer