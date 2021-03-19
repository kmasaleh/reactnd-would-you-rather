export  const mapKeyValueObjectToArray = (obj)=>{
    const output =  Object.entries(obj).map(([key, value]) => (value));
    return output;
}

export const filterKeyValueObject = (obj,compare)=>{
    let arr = mapKeyValueObjectToArray(obj);
    return  arr.filter(e=> compare(e))[0]
}

export const getAnsweredQuestionsForUser =(messages,userId)=>{
        return messages.filter((message)=> {
            return (
                message.optionOne.votes.find(user=> user===userId)!==undefined
                ||
                message.optionTwo.votes.find(user=> user===userId)!==undefined
            );

    })
}
export const getUnansweredQuestionsForUser =(messages,userId)=>{
    return messages.filter((message)=> {
        return (
            message.optionOne.votes.find(user=> user===userId)===undefined
            &&
            message.optionTwo.votes.find(user=> user===userId)===undefined
        )

    })
}