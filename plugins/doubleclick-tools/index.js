/* global BF2042Portal, _Blockly */
(function () {
    const plugin = BF2042Portal.Plugins.getPlugin("doubleclick-tools");

    // 初始密码
    let password = "default_password";

    plugin.initializeWorkspace = function () {
        prepareWorkspace();
    };

    function prepareWorkspace() {
        /** @type import("blockly").WorkspaceSvg */
        let workspace = _Blockly.getMainWorkspace();

        let ctrlKey = false;
        let lastClickTime = undefined;

        document.addEventListener("keydown", function (e) {
            ctrlKey = e.ctrlKey;
        });

        document.addEventListener("keyup", function (e) {
            ctrlKey = e.ctrlKey;
        });

        workspace.addChangeListener(function (e) {
            if (e.type === _Blockly.Events.CLICK && e.targetType === "block") {
                if (lastClickTime && Date.now() - lastClickTime < 200) {
                    /** @type import("blockly").BlockSvg */
                    const block = workspace.getBlockById(e.blockId);

                    // 验证密码
                    const userPassword = prompt("请输入密码:");

                    if (validatePassword(userPassword)) {
                        if (ctrlKey) {
                            block.setInputsInline(!block.getInputsInline());
                        } else {
                            block.setCollapsed(!block.isCollapsed());
                        }
                    } else {
                        alert("密码错误，操作被拒绝。");
                    }
                }

                lastClickTime = Date.now();
            }
        });

        // 添加修改密码功能
        document.getElementById("changePasswordButton").addEventListener("click", function () {
            const newPassword = prompt("请输入新密码:");
            if (newPassword) {
                password = newPassword;
                alert("密码已更改！");
            }
        });
    }

    function validatePassword(userPassword) {
        // 这里可以使用更复杂的加密算法来验证密码
        return userPassword === password;
    }
})();
