const map = {}

acyort.fetcher.getHtml = true

acyort.filter.register('after_fetch', function (data) {
  data.forEach(({ id, body_html }) => {
    map[id] = body_html
  })
})

acyort.filter.register('after_process', function (data) {
  data.posts.forEach((post) => {
    post.body = map[post.id]
  })
  data.pages.forEach((page) => {
    page.body = map[page.id]
  })
})
