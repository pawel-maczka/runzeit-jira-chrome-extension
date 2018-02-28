chrome.runtime.onMessage.addListener(message => {
  if (message.type === actionTypes.ADD_TASK) {
    fetch('http://api.runze.it/v1/tasks', {
      method: 'post',
      headers: {
        jwt: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message.payload),
    }).then(() => {
      location.reload();
    });
  }
});
