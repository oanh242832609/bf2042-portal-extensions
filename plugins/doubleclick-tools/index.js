/* global BF2042Portal, _Blockly */
(function () {
    const plugin = BF2042Portal.Plugins.getPlugin("doubleclick-tools");

    // 设置展开时需要的密码
    const requiredPassword = "your_password_here";

    // 存储用户输入的密码
    let enteredPassword = "";

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

                    if (ctrlKey) {
                        block.setInputsInline(!block.getInputsInline());
                    } else {
                        // 如果块处于展开状态，要求输入密码
                        if (!block.isCollapsed()) {
                            const inputPassword = prompt("Enter the password to expand the block:");

                            // 验证密码
                            if (inputPassword === requiredPassword) {
                                block.setCollapsed(false);
                            } else {
                                alert("Incorrect password. Block remains collapsed.");
                            }
                        } else {
                            // 如果块处于折叠状态，直接切换折叠状态
                            block.setCollapsed(!block.isCollapsed());
                        }
                    }
                }

                lastClickTime = Date.now();
            }
        });
    }
})();
