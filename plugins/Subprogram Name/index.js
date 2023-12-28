/* global BF2042Portal, _Blockly */
// 定义包含原始函数的对象
const functionContainer = {
    originalFunction: function() {
        console.log("This is the original function.");
    }
};

// 输出原始函数的名称
console.log("Original function name:", functionContainer.originalFunction.name);

// 更改函数名称，通过对象的属性
functionContainer.modifiedFunction = function() {
    console.log("This is the modified function.");
};

// 输出修改后的函数的名称
console.log("Modified function name:", functionContainer.modifiedFunction.name);

// 调用原始函数
functionContainer.originalFunction();

// 使用修改后的名称调用
functionContainer.modifiedFunction();
