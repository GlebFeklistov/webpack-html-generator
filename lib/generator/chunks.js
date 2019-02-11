module.exports = (data) => Object.values(data).length > 0 ? Object.values(data).map(src => ({
  script: {
    src: src
  }
})) : null;
