'use strict'; // cannot create any global variables

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection.
 */
function each(collection, action) {
    if(typeOf(collection) === 'array') {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/** identity: Take a value and return that input value unchanged.
* 
* @param {*} any value: Single value that can be any data type.
* 
* @return {*} any value : The input value unchanged.
* 
*/

function identity(value){
    return value;
}
module.exports.identity = identity;

/** typeOf: Takes any value and returns what data type it is as a string.
 * 
 * @param {*} any value : Single value that can be any data type.
 * 
 * @return {String} : The input's value data type as a string.
*/
function typeOf(value){
    if (Object.prototype.toString.call === "[object Object]"){
        return "object";
    } else if (Array.isArray(value)) {
        return "array";
    } else if (value instanceof Date) { 
      return "date";
    } else if (value === null){  
      return "null";
    } else { 
      return typeof value;
    }
}
module.exports.typeOf = typeOf;

/**
 * first: Takes 2 parameters, an array and a number. Will return:
 *  -an array literal if the array argument wasn't actually an array 
 *  -the first element of the array if the number argument wasn't a number
 *  -the full array if the number was longer than the array length
 *  -a shorted array that has a length of the number argument
 * 
 * @param {Array} : The array in which to evaluate
 * @param (Number) : The number that will be the new length of the array
 * 
 * @return {Array} : The shortened array starting at the first index
 * 
*/
function first(array, number){
        let newArray = [];
    if (!Array.isArray(array)){
        return [];
    } else if (isNaN(number)){
        return array[0];
    } else if (number > array.length){
        return array;
    } else {
        for (var i = 0; i < number; i++){
            newArray.push(array[i]);
        }
        return newArray;
    }
}
module.exports.first = first;

/**
 * last: Takes 2 parameters, an array and a number. Will return:
 *  -an array literal if the array argument wasn't actually an array or the number is less than 0
 *  -the first element of the array if the number argument wasn't a number
 *  -the full array if the number was longer than the array length
 *  -a shorted array that has a length of the number argument
 * 
 * @param {Array} : The array in which to evaluate
 * @param (Number) : The number that will be the new length of the array
 * 
 * @return {Array} : The shortened array ending at the last index
 * 
*/
function last(array, number){
        const newArray = [];
    if (!Array.isArray(array) || number < 0){ 
        return []; 
    } else if (isNaN(number)){ 
        return array[array.length - 1];
    } else if (number > array.length){
        return array;
    } else { 
        for (var i = number - 1; i < array.length; i++){ 
            newArray.push(array[i]); 
        }
        return newArray;
    }
}
module.exports.last = last;

/**
 * indexOf: Takes in an array and a value and evaluates it. Will return:
 *  - (-1) if the value isn't in the array
 *  - the index number if the value is in the array
 * 
 * @param {Array} : The array of which to iterate.
 * @param {*} any value: Any value that could be in the array.
 * 
 * @return {Number} number: The index number of where the value is located.
 * 
*/
function indexOf(array, value){
    for (var i = 0; i < array.length; i++){
        if (array[i] === value){ 
            return i; 
        }
    }
    return -1;
}
module.exports.indexOf = indexOf;

/**
 * contains: Takes an array and a value to determine if the value is in the array.
 *
 * @param {Array} : The array to iterate through.
 * @param {*} any value:  The value that the function is searching for.
 * 
 * @return {Boolean} true or false : Return true if the value is in the array, false if not.
 *
*/
function contains(array, value){
        return indexOf(array, value) === -1 ? false : true;
}
module.exports.contains = contains;

/**
 * unique: Takes an array that has duplicates and returns it without duplicates.
 * 
 * @param {Array} : The array to iterate through.
 * 
 * @return {Array} : A array with all unique elements.
*/

function unique(array){
    const unique = []; 
    for (var i = 0; i < array.length; i++){
        if (indexOf(unique, array[i]) === -1){
        unique.push(array[i]);
        } 
    }
    return unique;
}
module.exports.unique = unique;

/**
 * filter: Takes an array and a function. The function is called upon each element, index, and the entire array.
 *          Filter will return an array of values that passed the test.
 * 
 * @param {Array} : The array to iterate through.
 * @param {function} test: The test that will run at each index.
 * 
 * @return {Array} : A array of the values that returned true.
*/
function filter(array, test){
    const newArray = []; 
    for(var i = 0; i < array.length; i++){
        let e = array[i]; 
        let boolean = test(e, i, array); 
        if(boolean){
            newArray.push(e);
        }
    }
    return newArray;
}
module.exports.filter = filter;

/**
 * reject: Takes an array and a function. The function is called upon each element, index, and the entire array.
 *          Filter will return an array of values that failed the test.
 * 
 * @param {Array} : The array to iterate through.
 * @param {function} test: The test that will run at each index.
 * 
 * @return {Array} : An array of the values that returned false.
*/
function reject(array, test){
    const newArray = [];
    for(var i = 0; i < array.length; i++){
        let e = array[i];
        let boolean = test(e, i, array);
        if(!boolean){
            newArray.push(e);
        }
    }
    return newArray;
}
module.exports.reject = reject;

/**
 * partition: Takes in an array and a function. The function will run a test see if the array is
 *          truthy or falsy. Partition will return an array with two elements. The values at the first index will be truthy
 *          the values in the second index will be falsy.
 * 
 * @param {Array} : The collection to iterate through.
 * @param {Function} test: The test that will determ if the elements are truthy or falsy.
 * 
 * @return {Array} : A new array with a lenght of 2. The first index will contain the truthy values, the second will
 *                              contain falsy values.
*/
function partition(array, test){
    const newArray = [[],[]];
    for (var i = 0; i < array.length; i++){
        let e = array[i];
        let string = test(e, i, array);
        if (string){ 
            newArray[0].push(e);
        } else {
            newArray[1].push(e); 
        }
    }
    return newArray;
}
module.exports.partition = partition;

/**
 * map: Takes an collection and function. The function call the test at each value or element. 
 *      Then the results of the test will be pushed into an array. The function will  return the array.
 * 
 * @param {Array or Object} collection: The collection that will be iterated through.
 * @param {Function} test: The test that will be called at each value or element using the each function.
 * 
 * @return {Array}: An array of values which are the test results.
*/
function map(collection, test){
        const newArray = [];
    each(collection, function(param1, param2, param3) {
        var value = test(param1, param2, param3);
        newArray.push(value);
    });
    return newArray;
}
module.exports.map = map;

/**
 * pluck: Takes an array of objects and a property, which is the key name. It loops through the array and the object
 *      to store the values of the object at that property into an array.
 * 
 * @param {Array}: The array is an array of objects.
 * @param {String} property: The name of the key the object which is located at the element in the array.
 * 
 * @return {Array} : An array of values located by the property name.
*/
function pluck(array, property){
    return map(array, function(element){
                return element[property];
        });
}
module.exports.pluck = pluck;

/**
 * every: Takes in a collection and a function. The if every element/value in the function is true,
 *      every will return true. If any one of them is false, return false.
 * 
 * @param {Array or Object} collection : The collection that will be iterated through.
 * @param {Function} test: The function will evaluate each value in a collection, pass them into a new array 
 *                  with only two indexes. Index zero is true and index one is false. 
 * 
 * @return {Boolean} true of false: If every element is at the zero index, the return true
 * 
*/

function every(collection, test){ 
    const array = [[],[]];
    if (typeof test !== "function"){ 
        each(collection, function(value, location, collection){
            if (value){
                array[0].push(value);
            } else {
                array[1].push(value); 
            }
        });
    } else {
        each(collection, function(param1, param2, param3){
           
            if(test(param1, param2, param3)){
                array[0].push(param1);
            } else {
                array[1].push(param1);
            }
        });
    }
    return array[1].length === 0 ? true : false;
}
module.exports.every = every;

/**
 * some: Takes in a collection and a function. Will iterate through the collection at each element/value.
 *      Puts the values into a new array with only two indexes. Index zero is true and index one is false. 
 *      at least one element, return true.
 * 
 * @param {Array or Object} collection: A collection that the function will iterate through.
 * @param {Function} test: Evaluate is each element or value is true or false.
 * 
 * @return {Boolean} true of false: If at least one element is at the zero index, the return true.
*/
function some(collection, test){ 
    const array = [[],[]]; 
    if (typeof test !== "function"){ 
        each(collection, function(value, location, collection){
            if (value){
                array[0].push(value);
            } else {
                array[1].push(value);
            }
        });
    } else {
        each(collection, function(param1, param2, param3){ 
            if(test(param1, param2, param3)){
                array[0].push(param1);
            } else {
                array[1].push(param1); 
            }
        });
    }
    return array[0].length > 0 ? true : false;
}
module.exports.some = some;

/**
 * reduce: Takes in an array, function, and a number. Reduce applies the funciton to tell the array how to get to reduce itself to one return value.
 *          Applies the function at each element in the array, stores the function call in a seed, returns the last iteration as a seed. If there is not seed,
 *          the iteration will be assigned the the first element of the array and start with the one index.
 * 
 * @param {Array} array: An array to iterate throughout
 * @param {Function} action: The function should do an action at each index. The parameter are seed, element, index, and array. When calling this function define what will
 *                  happen to the parameters.
 * @param {Number, String, Array, Object} seed: The starting value (number, quotations, curly braces, brackets)
 * 
 * @return {Number, String, Array, Object} seed: The value at the last iteration.
 *      
*/
function reduce(array, action, seed) { 
    let result = true;
    each(array, function(element, index, array){ 
        if (result === true && seed === undefined) {
        seed = array[index]; 
        } else {
            seed = action(seed, element, index, array);
        }
        result = false; 
    });
    return seed;
}
module.exports.reduce = reduce;

/**
 * extend: Will give one object the properties of all of the objects passed into it.
 * 
 * @param {Object} ...more object: The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
 * 
 * @return {Object} : Returns the first object inputted with the values of all the object that were inputed.
*/

function extend(...moreObj){
    let objOne = moreObj[0];
    each(moreObj, function(element, index, array){
        let objAny = array[index];
        each(objAny, function(value, key, object){
            objOne[key] = value;
        });
    });
    return objOne;
}
module.exports.extend = extend;