function sendStateChanges(branch, data) {
  document.dispatchEvent(new CustomEvent('stateChange', { detail: { branch, data } }));
}

export default sendStateChanges;
