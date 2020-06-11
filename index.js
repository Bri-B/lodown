'use strict'; // cannot create any global variables

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, test) {
    if(typeOf(collection) === 'array') {
        for(var i = 0; i < collection.length; i++) {
            test(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            test(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/** identity: take a value and return that input value unchanged.
* 
* @param {*} any value: single value that can be any data type
* 
* @return {*} any value : the input value unchanged
* 
*/

function identity(value){
    return value;
}
module.exports.identity = identity;

/** typeOf: takes any value and returns what data type it is as a string
 * 
 * @param {*} any value : single value that can be any data type
 * 
 * @return {*} any value : the input's value data type as a string
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
 * @param {Array} : the array in which to evaluate
 * @param (Number) : the number that will be the new length of the array
 * 
 * @return {Array} : the shortened array starting at the first index
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
 * @param {Array} : the array in which to evaluate
 * @param (Number) : the number that will be the new length of the array
 * 
 * @return {Array} : the shortened array ending at the last index
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
 * indexOf: takes in an array and a value and evaluates it. Will return:
 *  - (-1) if the value isn't in the array
 *  - the index number if the value is in the array
 * 
 * @param {Array} : the array of which to iterate
 * @param {*} any value: any value that could be in the array
 * 
 * @return {Number} number: the index number of where the value is located
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
 * contains: takes an array and a value to determine if the value is in the array
 *
 * @param {Array} : the array to iterate through
 * @param {*} any value:  the value that the function is searching for
 * 
 * @return {Boolean} true or false : return true if the value is in the array, false if not
 *
*/
function contains(array, value){
        return indexOf(array, value) === -1 ? false : true;
}
module.exports.contains = contains;

/**
 * unique: takes an array that has duplicates and returns it without duplicates
 * 
 * @param {Array} : the array to iterate through
 * 
 * @return {Array} : a array with all unique elements 
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
 * filter: takes an array and a function. the function will test each element in the array.
 *          Filter will return an array of values that passed the test
 * 
 * @param {Array} : the array to iterate through
 * @param {function} test: the test that will run at each index
 * 
 * @return {Array} : a array of the values that returned true
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
 * reject: takes an array and a function. the function will test each element in the array.
 *          Filter will return an array of values that failed the test
 * 
 * @param {Array} : the array to iterate through
 * @param {function} test: the test that will run at each index
 * 
 * @return {Array} : an array of the values that returned false
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
 * partition: takes in an array and a function. The function will run a test at each index to see if the values are 
 *          truthy or falsy. Partition will return an array with two elements. The values at the first index will be truthy
 *          the values in the second index will be falsy.
 * 
 * @param {Array} : the collection to iterate through
 * @param {Function} test: the test that will determ if the elements are truthy or falsy 
 * 
 * @return {Array} : a new array with a lenght of 2. The first index will contain the truthy values, the second will
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
 * map: takes an collection and function. The function call the test at each value or element. 
 *      Then the results of the test will be pushed into an array. The function will  return the array.
 * 
 * @param {Array or Object} collection: the collection that will be iterated through
 * @param {Function} test: The test that will be called at each value or element using the each function.
 * 
 * @return {Array}: An array of values which are the test results
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
 * pluck: takes an array of objects and a property, which is the key name. It loops through the array and the object
 *      to store the values of the object at that property into an array.
 * 
 * @param {Array}: the array is an array of objects.
 * @param {String} property: the name of the key the object which is located at the element in the array.
 * 
 * @return {Array} : an array of values located by the property name
*/
function pluck(array, property){
    const pluck = []; 
    for(var i = 0; i < array.length; i++){ 
        let obj = array[i];
        map(obj, function(value, key, object){
            if(obj[property] === value){
              pluck.push(value);
            } 
        });
    }
    return pluck; 
}
module.exports.pluck = pluck;

/**
 * every: 
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
 * some: 
*/
function some(collection, test){ // takes in a collection and a function
    const array = [[],[]]; // empty array to score the entire collection
    if (typeof test !== "function"){ // asking is function provided 
        each(collection, function(value, location, collection){ //make annomous function (param1, param2, param3) which could be (element, index, array) or (value, key, object)
            if (value){
                array[0].push(value);//push truthy in first index
            } else {
                array[1].push(value); // push false values into second position
            }
        });
    } else {
        each(collection, function(param1, param2, param3){ //make annomous function (
            if(test(param1, param2, param3)){// ask is it true
                array[0].push(param1);//push truthy in first index
            } else { // other wise values are false
                array[1].push(param1); // push false values into second position
            }
        });
    }
    return array[0].length > 0 ? true : false;// ternary operand
}
module.exports.some = some;

/**
 * reduce:
*/
function reduce(array, test, seed) { // array first, function second, and seed
    // will iterate twice depending on the condition
    let result = true; // container to use result
    // using _.each function to run the test at each index in the array
    each(array, function(element, index, array){ // each functions need (element, index, array) because the value is an array
        if (result === true && seed === undefined) {//if no seed was given and result is a truthy value, use the first element of the collection
        seed = array[index]; // updated seed to first element  
        } else {
            // assigning seed as result to use on first iteration while also updating seed to be return value at each index
            seed = test(seed, element, index, array); //function called needs result, element, index
        }
        result = false; // updating result to false so that the next iteration will skip to else statment and update seed
    });
    return seed;// return the value of the final function call
}
module.exports.reduce = reduce;

/**
 * extend:
*/

function extend(...moreObj){ // The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
    const moreArray = []; // create an array to list the objects that will be passed in
    let objOne; // declare a variable of object one to assign later
    each(moreObj, function(element, index, array){ // use each function to loop through arguments
        moreArray.push(moreObj[index]); // push arguments into array as their own elements inorder to single out the first object
            });
    each(moreArray, function(element, index, array){ // created another each function to look into the new array
        objOne = array[0];// assigned object One to the first object in the array
        let objAny = array[index]; // initalized objAny so that I can access all other objects
    each(objAny, function(value, key, object){ // looked into other objects to access their properties
            objOne[key] = value; // updated object one properties to all properties of objAny
        });
    });
    return objOne; // returning object one of all properties from all arguments
}
module.exports.extend = extend;