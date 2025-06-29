function getParentId(element) {
  if (!element) return null;

  // Traverse up the DOM tree to find the parent with a data-id attribute
  while (element && !element.dataset.id) {
    element = element.parentElement;
  }

  // Return the data-id value if found, otherwise null
  return element ? element.dataset.id : null;
}

export default getParentId;
