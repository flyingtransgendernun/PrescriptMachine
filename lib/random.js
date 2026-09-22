// random lib by june wilson

export function randomInt(max){
    return Math.floor(Math.random() * (max));
}

export function randomIntExcluding(max, valuesToExclude){
    let possibleValues = [...Array(max).keys()];
    let possibleValueExists = false;
    let possibleValue;
    let randResult;

    for (let i = 0; i < possibleValues.length; ++i){
        possibleValue = possibleValues[i];
        if(!valuesToExclude.includes(possibleValue)){
            possibleValueExists = true;
            break;
        }
    }

    if(!possibleValueExists) throw new Error("A possible value could not be found");

    while (true){
        randResult = randomInt(max);
        if(!valuesToExclude.includes(randResult)) return randResult;
    }
}

export function multipleInt(max, amount){
    let out = [];
    for(let i = 0; i < amount; ++i){
        out.push(randomInt(max));
    }
    return out;
}

export function multipleIntExcluding(max, amount, valuesToExclude){
    let out = [];
    for(let i = 0; i < amount; ++i){
        out.push(randomIntExcluding(max, valuesToExclude));
    }
    return out;
}

export function multipleUniqueInt(max, amount){
    return multipleUniqueIntExcluding(max, amount, []);
}

export function multipleUniqueIntExcluding(max, amount, valuesToExclude){
    if(valuesToExclude == undefined){
        valuesToExclude = [];
    }
    if(amount > max - valuesToExclude.length){
        throw new Error("Not enough possible values");
    }
    let outValues = [];
    let value;
    for(let i = 0; i < amount; ++i){
        value = (randomIntExcluding(max, valuesToExclude));
        valuesToExclude.push(value);
        outValues.push(value);
    }
    return outValues;
}