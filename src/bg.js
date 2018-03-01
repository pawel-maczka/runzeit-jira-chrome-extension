function Background() {
  this.token = null;
  this.timeout = null;
}

Background.prototype.init = function() {
  this.tokenMonitor();

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === cfg.const.actionTypes.ADD_TASK) {
      return this.addTask(message.payload, sendResponse);
    }

    if (message.type === cfg.const.actionTypes.SET_TOKEN) {
      this.saveToken(message.payload);

      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  });
};

Background.prototype.addTask = function(task, sendResponse) {
  if (this.token) {
    fetch(api.addTask, {
      method: 'post',
      headers: {
        jwt: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }).then(() => {
      sendResponse({ status: cfg.const.statuses.SUCCESS });
      chrome.tabs.query({ url: '*://*.runze.it/*' }, tabs => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { type: cfg.const.actionTypes.RELOAD_PAGE });
        });
      });
    });
  } else {
    sendResponse({ status: cfg.const.statuses.FAILURE });
  }

  return true;
};

Background.prototype.saveToken = function(token) {
  chrome.storage.sync.set({ [cfg.const.TOKEN]: token });
  this.token = token;
};

Background.prototype.askForToken = function() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ url: '*://*.runze.it/*' }, tabs => {
      if (!tabs.length) {
        return reject();
      }

      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: cfg.const.actionTypes.GET_TOKEN },
        null,
        value => value ? resolve(value) : reject()
      );
    });
  });
};

Background.prototype.tokenMonitor = function() {
  chrome.storage.sync.get(cfg.const.TOKEN, data => {
    if (!data[cfg.const.TOKEN]) {
      this.askForToken()
        .then(token => this.saveToken(token))
        .catch(() => {
          this.timeout = setTimeout(() => this.tokenMonitor(), 10000);
        });
    } else {
      this.token = data[cfg.const.TOKEN];
    }
  });
};

const bg = new Background();
bg.init();
