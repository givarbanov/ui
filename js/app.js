function isMutableElement (element) {
  var elTagName = element.tagName;
  if (element.hasAttribute('readonly')) {
    return false;
  }
  if (elTagName === 'INPUT' && element.getAttribute('type') === 'text') {
    return true;
  }
  if (elTagName === 'SELECT') {
    return true;
  }
};

function onInitiateDOM() {
  document.body.focus();
  var haElements = document.querySelectorAll('[class*="ha-el"]');
  for (var i = 0; i < haElements.length; i++) {
    var children = haElements[i].children;
    var element = children[0];
    var elementValue = isMutableElement(element) ? element.value : element.textContent;
    if (elementValue) {
      haElements[i].setAttribute('data-v', elementValue);
    }
  };
};

function onElementChanged (event) {
  var element = event.target;
  if (!isMutableElement(element)) {
    return;
  }
  var parent = element.parentNode;
  if (element.value) {
    parent.setAttribute('data-v', element.value);
  } else {
    parent.removeAttribute('data-v');
  }
};


document.addEventListener('DOMContentLoaded', onInitiateDOM);
document.addEventListener('change', onElementChanged); 