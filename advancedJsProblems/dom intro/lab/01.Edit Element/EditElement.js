function editElement(el,match, replace) {
    el.textContent = el.textContent.split(match).join(replace);
}