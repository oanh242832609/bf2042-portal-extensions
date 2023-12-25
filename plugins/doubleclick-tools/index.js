/* global BF2042Portal, _Blockly */
(function () {
    const plugin = BF2042Portal.Plugins.getPlugin("doubleclick-tools");

    // 添加密码
    const correctPassword = "258062";

    plugin.initializeWorkspace = function () {
        prepareWorkspace();
    };

    function prepareWorkspace() {
        let workspace = _Blockly.getMainWorkspace();
        let lastClickTime = undefined;

        document.addEventListener("keydown", function (e) {
            const ctrlKey = e.ctrlKey;
            workspace.getAllBlocks().forEach(function (block) {
                block.passwordRequired = ctrlKey;
            });
        });

        workspace.addChangeListener(function (e) {
            if (e.type === _Blockly.Events.CLICK && e.targetType === "block") {
                if (lastClickTime && Date.now() - lastClickTime < 200) {
                    const block = workspace.getBlockById(e.blockId);
                    const isCollapsed = block.isCollapsed();

                    if (isCollapsed || !block.passwordRequired) {
                        block.setCollapsed(!isCollapsed);
                    } else {
                        // 验证密码
                        const userInput = prompt("请输入密码:");
                        if (userInput !== correctPassword) {
                            alert("密码错误，无法展开块！");
                            return;
                        }
                        block.setCollapsed(false);
                    }
                }

                lastClickTime = Date.now();
            }
        });
    }
})();
