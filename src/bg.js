chrome.runtime.onMessage.addListener(message => {
  if (message.type === actionTypes.ADD_TASK) {
    chrome.tabs.query({ url: '*://*.runze.it/*' }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
});
