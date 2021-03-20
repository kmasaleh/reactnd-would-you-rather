export  const mapKeyValueObjectToArray = (obj)=>{
    const output =  Object.entries(obj).map(([key, value]) => (value));

    return output.sort((q1,q2)=>q2.timestamp-q1.timestamp);
}

export const filterKeyValueObject = (obj,compare)=>{
    let arr = mapKeyValueObjectToArray(obj);
    return  arr.filter(e=> compare(e))[0]
}

export const getAnsweredQuestionsForUser =(messages,userId)=>{
    if(userId===undefined || userId===null)
        return null;

        return messages.filter((message)=> {
            return (
                message.optionOne.votes.find(user=> user===userId)!==undefined
                ||
                message.optionTwo.votes.find(user=> user===userId)!==undefined
            );

    })
}
export const getUnansweredQuestionsForUser =(messages,userId)=>{
    if(userId===undefined || userId===null)
        return null;

    return messages.filter((message)=> {
        return (
            message.optionOne.votes.find(user=> user===userId)===undefined
            &&
            message.optionTwo.votes.find(user=> user===userId)===undefined
        )

    })
}

export const usersSortedWithScore = (users)=>{
    let _users = users.map(user=>{
        const answered = Object.entries(user.answers).length;
        const created = user.questions.length;
        user.score = answered + created;
        return user;
    } )
    _users =  _users.sort((user1,user2)=> user2.score-user1.score);
    return _users;
}
export const avatarUrl = (user)=> {
    return `${process.env.PUBLIC_URL}/${user.avatarURL}`
}
export const imgUrl = (name)=> {
    return `${process.env.PUBLIC_URL}/${name}`
}


