chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.highlight({'tabs': tab.index}, function() {});
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['action.js']
  });
})