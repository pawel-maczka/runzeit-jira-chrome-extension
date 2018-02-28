function addTask() {
  const taskNumber = location.pathname.split('/').pop();
  const summaryText = document.getElementById('summary-val').innerText;
  console.log(taskNumber, summaryText);
  chrome.runtime.sendMessage({
    type: actionTypes.ADD_TASK, payload: {
      project: { name: 'dmx' },
      task: `${taskNumber} - ${summaryText}`,
    },
  });
}

const newButton = document.createElement('li');
newButton.innerHTML = '<a id="action_id_111" class="toolbar-trigger issueaction-workflow-transition" href="#"><span class="trigger-label">Add to Runzeit</span></a>'
newButton.className = 'toolbar-item';
newButton.addEventListener('click', addTask);

const buttonsContainer = document.getElementById('opsbar-opsbar-transitions');
buttonsContainer.appendChild(newButton);
