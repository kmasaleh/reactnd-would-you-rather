function createThunkMiddleWare(extraArgument){
    return ({dispatch,getState})=>next=>action=>{
        if(typeof(action)==='function'){
            return action(dispatch,getState,extraArgument) ;
        }
       return  next(action);
    }
}

let appThunk = createThunkMiddleWare();
appThunk.withExtraParameters = createThunkMiddleWare;

export default appThunk;

