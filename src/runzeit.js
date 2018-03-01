function Runzeit() {
  this.token = null;
}

Runzeit.prototype.init = function() {
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

  this.token = localStorage.getItem('jwt');

  if (this.token) {
    chrome.runtime.sendMessage({
      type: cfg.const.actionTypes.SET_TOKEN,
      payload: this.token,
    });
  }
};

const runzeit = new Runzeit();
runzeit.init();
