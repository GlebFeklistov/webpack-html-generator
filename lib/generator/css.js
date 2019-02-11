module.exports = (data = []) => data.length > 0 ? data.map(href => ({
  link: {
    rel: 'stylesheet',
    href: href
  }
})) : null;
