// Define an object containing the original function
const functionContainer = {
    originalFunction: function() {
        console.log("This is the original function.");
    }
};

// Output the name of the original function
console.log("Original function name:", functionContainer.originalFunction.name);

// Change the function name by adding a new property to the object
functionContainer.modifiedFunction = function() {
    console.log("This is the modified function.");
};

// Output the name of the modified function
console.log("Modified function name:", functionContainer.modifiedFunction.name);

// Call the original function
functionContainer.originalFunction();

// Call the modified function using the new name
functionContainer.modifiedFunction();
