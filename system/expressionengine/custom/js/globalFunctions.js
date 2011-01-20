// ===================================================================================================================================================================================================================================================== 
// ! This file is intended to hold singleton javascript functions that will live in the global object called "Page".
// ! If you want to reference a function reference it by calling - global.FunctionName();
// ! Feel free to add/edit functions as you please. Also, please add comments to new functions
// ===================================================================================================================================================================================================================================================== 
var globalJS = function(){}

// ====================================================================================================================================================================== 
// ! This is to be used as a replacement of the native js function "typeof()".  This new function will handle types: object, array and null - and return them correctly   
// ====================================================================================================================================================================== 
globalJS.prototype.typeOf = function(value){
	var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (value instanceof Array) {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}

// =================== 
// ! Extending Array   
// =================== 

// ======================================================================================================= 
// ! If this array contains key, returns the index of the first occurrence of key; otherwise returns -1.   
// ======================================================================================================= 
Array.prototype.linearSearch = function(key, compare) {
    if (typeof(compare) == 'undefined') {
        compare = ascend;
    }
    for (var i = 0;  i < this.length;  i++) {
        if (compare(this[i], key) == 0) {
            return i;
        }
    }
    return -1;
}

// ======================================================================================================================================= 
// ! If this array contains key, returns the index of any occurrence of key; otherwise returns -1. Assumes this array is already sorted.   
// ======================================================================================================================================= 
Array.prototype.binarySearch = function(key, compare) {
    if (typeof(compare) == 'undefined') {
        compare = ascend;
    }
    var left = 0;
    var right = this.length - 1;
    while (left <= right) {
        var mid = left + Math.floor((right - left) / 2);
        var cmp = compare(key, this[mid]);
        if (cmp < 0)
            right = mid - 1;
        else if (cmp > 0)
            left = mid + 1;
        else
            return mid;
    }
    return -1;
}

// ================================================================ 
// ! Adds all the elements in the specified arrays to this array.   
// ================================================================ 
Array.prototype.addAll = function() {
    for (var a = 0;  a < arguments.length;  a++) {
        arr = arguments[a];
        for (var i = 0;  i < arr.length;  i++) {
            this.push(arr[i]);
        }
    }
}

// ====================================================================================== 
// ! Retains in this array all the elements that are also found in the specified array.   
// ====================================================================================== 
Array.prototype.retainAll = function(arr, compare) {
    if (typeof(compare) == 'undefined') {
        compare = ascend;
    }
    var i = 0;
    while (i < this.length) {
        if (arr.linearSearch(this[i], compare) == -1) {
            var end = i + 1;
            while (end < this.length &&
                    arr.linearSearch(this[end], compare) == -1) {
                end++;
            }
            this.splice(i, end - i);
        }
        else {
            i++;
        }
    }
}

// ======================================================================================== 
// ! Removes from this array all the elements that are also found in the specified array.   
// ======================================================================================== 
Array.prototype.removeAll = function(arr, compare) {
    if (typeof(compare) == 'undefined') {
        compare = ascend;
    }
    var i = 0;
    while (i < this.length) {
        if (arr.linearSearch(this[i], compare) != -1) {
            var end = i + 1;
            while (end < this.length &&
                    arr.linearSearch(this[end], compare) != -1) {
                end++;
            }
            this.splice(i, end - i);
        }
        else {
            i++;
        }
    }
}

// ==================================================================================================================================================== 
// ! Makes all elements in this array unique.  In other words, removes all duplicate elements from this array.  Assumes this array is already sorted.   
// ==================================================================================================================================================== 
Array.prototype.unique = function(compare) {
    if (typeof(compare) == 'undefined') {
        compare = ascend;
    }
    var dst = 0;  // Destination for elements
    var src = 0;  // Source of elements
    var limit = this.length - 1;
    while (src < limit) {
        while (compare(this[src], this[src + 1]) == 0) {
            if (++src == limit) {
                break;
            }
        }
        this[dst++] = this[src++];
    }
    if (src == limit) {
        this[dst++] = this[src];
    }
    this.length = dst;
}

// ============================================================= 
// ! Compares two objects using built-in JavaScript operators.   
// ============================================================= 
function ascend(a, b) {
    if (a < b)
        return -1;
    else if (a > b)
        return 1;
    return 0;
}

window.onload = function(){
	var global = new globalJS(); 
}