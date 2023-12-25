/* global BF2042Portal, _Blockly */
(function () {
    const plugin = BF2042Portal.Plugins.getPlugin("doubleclick-tools");

    // 添加密码
    const correctPassword = "258062..";

    plugin.initializeWorkspace = function () {
        prepareWorkspace();
    };

    function prepareWorkspace() {
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
                    const block = workspace.getBlockById(e.blockId);

                    if (ctrlKey) {
                        block.setInputsInline(!block.getInputsInline());
                    } else {
                        const isCollapsed = block.isCollapsed();
                        if (!isCollapsed) {
                            // 验证密码
                            const userInput = prompt("请输入密码:");
                            if (userInput !== correctPassword) {
                                alert("密码错误，无法展开块！");
                                return;
                            }
                        }
                        block.setCollapsed(!isCollapsed);
                    }
                }

                lastClickTime = Date.now();
            }
        });
    }
})();
