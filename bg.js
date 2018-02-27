chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === ADD_TASK) {
    chrome.tabs.query({url: "*://*.runze.it/*" }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, message)
    })
  }
});
