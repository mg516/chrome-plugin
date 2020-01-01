chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if(sender.tab){
        console.log('消息来自内容脚本 content script' + sender.tab.url);
    }else{
        console.log('消息来自扩展脚本 popup');
    }
    console.log(request, sender, sendResponse);
    // 请求：获取页面dom
    if (request.accessName == "contentHandle"){
        if(request.orderName == "JP_swagger"){
            console.log(request.searchValue);
            swaggerSearch(request.searchValue);
            sendResponse({state: '成功！'});
            return;
        }
        sendResponse({state: '没有该命令！'});
    }
    sendResponse({state: '没有该通道！'});
});
function swaggerSearch(key) {
    let liDom = document.getElementsByClassName('path');
    console.log(liDom.length);
    for (let i = 0;i<liDom.length;i++){
        if(liDom[i].innerHTML.indexOf(key)>-1){
            let ul = liDom[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            ul.style.display = 'block';
            liDom[i].childNodes[1].click();
            setTimeout(()=>{
                window.scrollTo(0,liDom[i].offsetTop - 40);
                console.log(liDom[i].offsetTop);
            },10);
            break;
        }
    }
}