const $ = (id) => document.getElementById(id);
const root = $("root");

const stringToHtml = (stringHtml) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(stringHtml, "text/html");
  return document.body;
};

const diff = (dom, newDom) => {
  const domNodes = Array.from(dom.childNodes);
  const newDomNodes = Array.from(newDom.childNodes);

  let excessNodes = domNodes.length - newDomNodes.length;
  if (excessNodes > 0) {
    for (; excessNodes > 0; excessNodes--) {
      domNodes[domNodes.length - excessNodes].remove();
    }
  }

  for (const [index, node] of newDomNodes.entries()) {
    if (!domNodes[index]) {
      dom.appendChild(node.cloneNode(true));
    } else {
      domNodes[index].replaceWith(node.cloneNode(true));
    }
  }
};

$("add").addEventListener("click", () => {
  const addOne = `
        <p>One element</p>
        <p>Two element</p>
        <p>Three element</p>
        <p>Four element</p>
        <p>Fifth element</p>
      `;

  diff(root, stringToHtml(addOne));
});

$("remove").addEventListener("click", () => {
  const removeOne = `
        <p>Two element</p>
        <p>Three element</p>
        <p>Four element</p>
      `;

  diff(root, stringToHtml(removeOne));
});

$("reverse").addEventListener("click", () => {
  const reverse = `
        <p>Four element</p>
        <p>Three element</p>
        <p>Two element</p>
        <p>One element</p>
      `;

  diff(root, stringToHtml(reverse));
});
