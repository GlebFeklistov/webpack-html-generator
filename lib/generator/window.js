module.exports = (params) => {
  if (typeof params === 'object') {
    return `<script type="text/javascript">${
      Object.keys(params).map(key => `window['${key}'] = ${params[key]};`).join('\n')
      }</script>`
  } else {
    return null;
  }
};
