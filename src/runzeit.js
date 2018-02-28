chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message) {
    return;
  }

  switch (message.type) {
    case cfg.const.actionTypes.GET_TOKEN:
      sendResponse(localStorage.getItem('jwt'));
      break;
    case cfg.const.actionTypes.RELOAD_PAGE:
      location.reload();
      break;
    default:
      return;
  }
});

const token = localStorage.getItem('jwt');

if (token) {
  chrome.runtime.sendMessage({
    type: cfg.const.actionTypes.SET_TOKEN,
    payload: token,
  });
}
