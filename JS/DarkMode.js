const btn = document.querySelector('.dynamic-icon');
btn.addEventListener('click', () => {
  const attrLength = document.documentElement.attributes.length;
  attrLength === 1 ? document.documentElement.setAttribute('data-theme', 'dark') : 
  document.documentElement.removeAttribute('data-theme');
})