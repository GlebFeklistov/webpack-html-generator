const window = require('./window');

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

const createTag = (tag, attributes, content) => {
  return voidTags.includes(tag) ? `<${attributes}/>` : `<${attributes}>${content}</${tag}>`;
};

const detectTag = (tag, value) => {
  if (tag === 'window') {
    return window(value);
  }

  if (typeof value === 'string') {
    return createTag(tag, tag, value);
  }

  if (!Array.isArray(value)) {
    const content = module.exports(value.innerHTML ? value.innerHTML : '');
    const attributes = [tag].concat(Object.keys(value)
      .filter(key => key !== 'innerHTML' && value[key])
      .map(key => `${key}="${value[key]}"`))
      .join(' ');
    return createTag(tag, attributes, content);
  }

  if (Array.isArray(value)) {
    return value.map(item => detectTag(tag, item)).join('\n');
  }
};

module.exports = (item) => {
  if (typeof item === 'string') {
    return item
  }

  if (Array.isArray(item)) {
    return item.map(item => module.exports(item)).join('\n');
  }

  if (!Array.isArray(item)) {
    return Object.keys(item).map(tag => {
      return detectTag(tag, item[tag]);
    }).join('\n');
  }
};
