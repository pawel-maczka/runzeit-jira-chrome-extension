function Jira() {
  this.button = null;
}

Jira.prototype.init = function() {
  this.button = document.createElement('li');
  this.button.innerHTML = '<a id="action_id_111" class="toolbar-trigger issueaction-workflow-transition" href="#"><span class="trigger-label">Add to Runzeit</span></a>';
  this.button.className = 'toolbar-item';
  this.button.addEventListener('click', this.addTask);

  const buttonsContainer = document.getElementById('opsbar-opsbar-transitions');
  buttonsContainer.appendChild(this.button);

  chrome.runtime.onMessage.addListener(message => {
    if (!message) {
      return;
    }

    if (message.status === cfg.const.statuses.SUCCESS) {
      alert('task added');
    }
  });
};

Jira.prototype.addTask = function() {
  const taskNumber = location.pathname.split('/').pop();
  const summaryText = document.getElementById('summary-val').innerText;

  chrome.runtime.sendMessage({
    type: cfg.const.actionTypes.ADD_TASK, payload: {
      summaryText,
      taskNumber,
    },
  }, message => {
    if (!message) {
      return;
    }

    if (message.status === cfg.const.statuses.SUCCESS) {
      alert('task added');
    }

    if (message.status === cfg.const.statuses.FAILURE) {
      alert('Can\'t add task to Runzeit. Open Runzeit and make sure you are logged in');
    }
  });
};

const jira = new Jira();
jira.init();
