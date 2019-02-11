module.exports = (data = []) => data.length > 0 ? data.map(item => ({
  link: {
    rel: 'stylesheet',
    href:item
  }
})) : null;
