(function () {
    var $ = function (id) {
        return document.getElementById(id);
    };
    var winInit = function (win) {
        window.tabWin = win;
    };
    var Tasks = {
        init:()=>{
            let param = {
                "accessName": "contentHandle",//通道名称
                "orderName": 'JP_swagger',//指令名称
            };
            // 提交jp_swagger查询
            $('submitSwg').onclick = function () {
                let searchValue = $('searchSwg').value;
                param.searchValue = searchValue;
                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, param, (response) => {
                        console.log(response.state);
                    });
                });
            }
        }
    };
    Tasks.init();
})();