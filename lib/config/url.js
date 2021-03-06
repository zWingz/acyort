const { parse } = require('url')

module.exports = (url) => {
  const {
    protocol,
    host,
    path,
  } = parse(url)

  if (!protocol) {
    return {}
  }

  return {
    url: `${protocol}//${host}`,
    root: `/${path.split('/').slice(-1)[0]}`,
  }
}
