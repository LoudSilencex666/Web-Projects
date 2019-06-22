function dbArrayParser (array, recordsNumber, propertyName) {
    let result = [];
    if(typeof array !== "object") {
        throw "First parameter have to be an Array"
    }

    if(!recordsNumber || recordsNumber === "all") {
        recordsNumber = array.length;
    }

    if(!propertyName || propertyName === "all") {
        propertyName = [];
        for(let i = 0; i < recordsNumber; i++) {
            if(typeof array[i] !== "undefined" && typeof array[i] !== "null") {
                result = result.concat(Object.values(array[i]));
            } else {
                console.log("!!!Error:!!! Too much array records required, array has only " + i + " records");
                break;
            }
        }
    } else {
        for (let i = 0; i < recordsNumber; i++) {
            if(typeof array[i] !== "undefined" && typeof array[i] !== "null") {
                for (let j = 0; j < propertyName.length; j++) {
                    if(typeof array[i]['' + propertyName[j]] !== "undefined") {
                        result = result.concat(array[i]['' + propertyName[j]]);
                    }
                }
            } else {
                console.log("!!!Error:!!! Too much array records required, array has only " + i + " records");
                break;
            }
        }
        if(result.length === 0) {
            console.log("!!!Error:!!! These propertyNames don't exist or havent't any data yet: " + propertyName);
        }
    }

    
    return result;
}


module.exports = dbArrayParser;