const inputValuesReciever = function(elementsIds, formId){
    let finalData = {};
    let ele = [];

    for(let i = 0; i < elementsIds.length; i++) {
        ele[i] = document.querySelector('#' + formId).querySelector('.' + elementsIds[i]).value
    }

    for(let i = 0; i < ele.length; i++) {
        finalData[elementsIds[i]] = ele[i];
    }
    
    return finalData;
}
