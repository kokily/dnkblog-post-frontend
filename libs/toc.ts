export function escapeUrl(text: string): string {
  return text
    .replace(
      /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
      ''
    )
    .trim()
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
}

export function setHeaderId(body: string) {
  const div = document.createElement('div');
  div.innerHTML = body;

  const h1 = div.querySelectorAll('h1');
  const h2 = div.querySelectorAll('h2');
  const h3 = div.querySelectorAll('h3');

  const list: string[] = [];

  [h1, h2, h3].forEach((h) =>
    h.forEach((el: HTMLHeadingElement) => {
      const id = escapeUrl(el.innerText);
      const exists = list.filter((existsId) => existsId.indexOf(id) !== -1);
      const addId = `${id}${exists.length === 0 ? '' : `-${exists.length}`}`;

      el.id = addId;
      list.push(addId);
    })
  );

  return div.innerHTML.replace(/&gt;+/g, '>');
}

export function parseHeader(body: string) {
  const div = document.createElement('div');
  div.innerHTML = body;

  const elements = Array.from(div.children);
  const headers = elements.filter((element) => element.tagName.match(/H([1-3])/));
  const info = headers.map((head) => ({
    id: head.id,
    text: head.textContent,
    level: parseInt(head.tagName.replace('H', ''), 10),
  }));
  const minLevel = Math.min(...Array.from(info.map((data) => data.level)));

  info.forEach((data) => {
    data.level -= minLevel;
  });

  return info;
}
