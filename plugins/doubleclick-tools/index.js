/* global BF2042Portal, _Blockly */
(function () {
    const plugin = BF2042Portal.Plugins.getPlugin("your_plugin_name");

    // 初始密码
    let password = "258062..";

    plugin.initializeWorkspace = function () {
        console.log("initializeWorkspace");

        // 添加块的事件监听器
        _Blockly.getMainWorkspace().addChangeListener(function (event) {
            if (event.type === _Blockly.Events.BLOCK_CHANGE && event.element === 'collapsed' && event.newValue === false) {
                // 在展开块时验证密码
                const block = _Blockly.getMainWorkspace().getBlockById(event.blockId);
                validatePasswordAndToggleInputs(block);
            }
        });
    };

    // 在需要验证密码的地方，例如展开块时
    function validatePasswordAndToggleInputs(block) {
        const userPassword = prompt("请输入密码:");
        if (validatePassword(userPassword)) {
            // 密码验证通过，执行你的逻辑
            block.setInputsInline(!block.getInputsInline());
        } else {
            alert("密码错误，操作被拒绝。");
            // 如果密码验证失败，可以选择折叠块
            block.setCollapsed(true);
        }
    }

    // 示例：在执行某个操作前验证密码
    document.getElementById("performActionButton").addEventListener("click", function () {
        const userPassword = prompt("请输入密码:");
        if (validatePassword(userPassword)) {
            // 执行你的操作
            console.log("操作执行成功！");
        } else {
            alert("密码错误，操作被拒绝。");
        }
    });

    // 在适当的地方，例如某个按钮点击事件中，用户输入新密码时调用这个函数
    function changePassword() {
        const newPassword = prompt("请输入新密码:");
        if (newPassword) {
            password = newPassword;
            alert("密码已更改！");
        }
    }

    // 示例：在某个按钮点击事件中调用更改密码函数
    document.getElementById("changePasswordButton").addEventListener("click", changePassword);

    // 在需要验证密码的地方，例如展开块时
    // 验证密码并切换块的输入方式
})();
