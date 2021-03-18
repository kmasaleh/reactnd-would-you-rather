const logger = (store)=>(next)=>(action)=>{
    console.group(action.type)
        console.log(`The action : ${action.type}`);
        const value  = next(action);
        console.log(`New state is : ${JSON.stringify(value)}`);
    console.groupEnd()

    return value;
    
}

export default logger;