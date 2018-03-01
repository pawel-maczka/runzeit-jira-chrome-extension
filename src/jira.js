function Jira() {

}

Jira.prototype.init = function() {
  const newButton = document.createElement('li');
  newButton.innerHTML = '<a id="action_id_111" class="toolbar-trigger issueaction-workflow-transition" href="#"><span class="trigger-label">Add to Runzeit</span></a>';
  newButton.className = 'toolbar-item';
  newButton.addEventListener('click', this.addTask);

  const buttonsContainer = document.getElementById('opsbar-opsbar-transitions');
  buttonsContainer.appendChild(newButton);

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
      project: { name: 'dmx' },
      task: `${taskNumber} - ${summaryText}`,
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
