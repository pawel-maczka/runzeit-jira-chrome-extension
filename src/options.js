function Options() {
  this.projectMappings = null;
  this.projectMappingsInput = null;
}

Options.prototype.init = function() {
  this.projectMappingsInput = document.getElementById('projects-mapping');

  chrome.storage.sync.get(cfg.const.PROJECTS_MAPPING, data => {
    if (data[cfg.const.PROJECTS_MAPPING]) {
      this.projectMappings = JSON.parse(data[cfg.const.PROJECTS_MAPPING]);
      this.projectMappingsInput.value = JSON.stringify(this.projectMappings, null, 4);
    }
  });

  document.getElementById('save').addEventListener('click', () => this.save());
};

Options.prototype.save = function() {
  const mapping = JSON.parse(this.projectMappingsInput.value);

  chrome.storage.sync.set({ [cfg.const.PROJECTS_MAPPING]: JSON.stringify(mapping) }, () => alert('saved'));
};

const options = new Options();

document.addEventListener('DOMContentLoaded', () => options.init());

