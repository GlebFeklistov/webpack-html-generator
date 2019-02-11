const window = require('./window');
const css = require('./css');
const chunks = require('./chunks');

const voidTags = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

const tagHTML = ([tag, attributes, content]) => (
  voidTags.includes(tag) ? `<${attributes}/>` : `<${attributes}>${innerHTML(content || '')}</${tag}>`
);

const tagCompile = (tag, data) => [tag, [tag].concat(Object.keys(data)
  .filter(key => key !== 'innerHTML' && data[key])
  .map(key => `${key}="${data[key]}"`))
  .join(' '), data.innerHTML];


const tagType = (tag, data) => {
  switch (Object.prototype.toString.call(data)) {
    case '[object Array]':
      switch (tag) {
        case 'css':
          return innerHTML(css(data));
        default:
          return data.map(item => tagType(tag, item)).join('\n');
      }
    case '[object Object]':
      switch (tag) {
        case 'chunks':
          return innerHTML(chunks(data));
        case 'window':
          return innerHTML(window(data));
        default:
          return tagHTML(tagCompile(tag, data));
      }
    case '[object String]':
      return tagHTML([tag, tag, data]);
  }
};

const innerHTML = (data) => {
  switch (Object.prototype.toString.call(data)) {
    case '[object Array]':
      return data.map(item => innerHTML(item)).join('\n');
    case '[object Object]':
      return Object.keys(data).map(tag => tagType(tag, data[tag])).join('\n');
    case '[object String]':
      return data;
    default:
      return null;
  }
};

module.exports = (data) => {
  return innerHTML(data);
};
