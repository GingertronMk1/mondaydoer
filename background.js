function openMyWorkWithGetParam() {
  window.open("https://wearesweetltd.monday.com/my_work?dailyupdate=1", "_blank").focus();
}
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.highlight({'tabs': tab.index}, function() {});
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: openMyWorkWithGetParam
  });
})