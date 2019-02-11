module.exports = (data = {}) => Object.keys(data).length > 0 ? {
  script: {
    innerHTML: Object.keys(data).map(key => `window['${key}'] = ${data[key]};`).join('\n')
  }
} : null;
