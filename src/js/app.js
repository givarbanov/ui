import '../sass/main.scss';

const isMutableElement = (element) => {
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

const isRadioOrCheckbox = (element) => {
  var classList = element.classList;
  return classList.contains('ha-el-radio-group') 
          || classList.contains('ha-el-radio') 
          || classList.contains('ha-el-checkbox-input')
};

const setSpanForSelectElemen = (selectElement, value) => {
  if (selectElement.tagName === 'SELECT') {
    var nextSibling = selectElement.nextElementSibling;
    nextSibling.innerText = value;
  }
};

const onInitiateDOM = () => {
  document.body.focus();
  var haElements = document.querySelectorAll('[class*="ha-el"]');
  for (var i = 0; i < haElements.length; i++) {
    if (isRadioOrCheckbox(haElements[i])) {
      continue;
    }
    var children = haElements[i].children;
    if (children.length === 0) {
      continue;
    }
    var element = children[0];
    var elementValue = isMutableElement(element) ? element.value.trim() : element.textContent.trim();
    element.value ? element.value = elementValue : element.innerText = elementValue;

    setSpanForSelectElemen(element, elementValue);

    if (elementValue) {
      haElements[i].classList.add('data');
    }
  };
};

const onElementChanged = (event) => {
  var element = event.target;
  if (!isMutableElement(element)) {
    return;
  }
  var parent = element.parentNode;
  var elValue = element.value.trim();

  setSpanForSelectElemen(element, elValue);

  if (elValue) {
    parent.classList.add('data');
  } else {
    element.value = elValue;
    parent.classList.remove('data');
  }
};

document.addEventListener('DOMContentLoaded', onInitiateDOM);
document.addEventListener('change', onElementChanged); 