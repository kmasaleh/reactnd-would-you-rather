 const mapKeyValueObjectToArray = (obj)=>{
    const output =  Object.entries(obj).map(([key, value]) => (value));
    return output;
}

export const filterKeyValueObject = (obj,compare)=>{
    let arr = mapKeyValueObjectToArray(obj);
    return  arr.filter(e=> compare(e))[0]
}

