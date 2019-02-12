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

module.exports = (data, hooks) => {

  const tagHTML = ([tag, attributes, content]) => (
    voidTags.includes(tag) ? `<${attributes}/>` : `<${attributes}>${innerHTML(content || '')}</${tag}>`
  );

  const tagCompile = (tag, data) => [tag, [tag].concat(Object.keys(data)
    .filter(key => key !== 'innerHTML' && data[key])
    .map(key => `${key}="${data[key]}"`))
    .join(' '), data.innerHTML];

  const tagType = (tag, data) => {
    switch (Object.prototype.toString.call(hooks[tag])) {
      case '[object Function]':
        return innerHTML(hooks[tag](data));
      default:
        switch (Object.prototype.toString.call(data)) {
          case '[object Array]':
            return data.map(item => tagType(tag, item)).join('\n');
          case '[object Object]':
            return tagHTML(tagCompile(tag, data));
          default:
            return tagHTML([tag, tag, data]);
        }
    }
  };

  const innerHTML = (data) => {
    switch (Object.prototype.toString.call(data)) {
      case '[object Array]':
        return data.map(item => innerHTML(item)).join('\n');
      case '[object Object]':
        return Object.keys(data).map(tag => tagType(tag, data[tag])).join('\n');
      default:
        return data;
    }
  };

  return innerHTML(data);
};
