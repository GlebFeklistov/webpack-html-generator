module.exports = (items) => {
  if (typeof items === 'object') {
    return `<script type="text/javascript">${
      Object.keys(items).map(key => `window['${key}'] = ${items[key]};`).join('\n')
      }</script>`
  } else {
    return null;
  }
};
