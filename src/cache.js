import rp from 'request-promise'
import LRU from 'lru-cache'
import join from 'url-join'
let cache = LRU()


/* {root!, path, query, maxAge} => promise */
export default async function fetch(opt) {
  if (!opt.root) throw new Error('The fetch request must have a root url!')
  let url = opt.path ? join(opt.root, opt.path) : opt.root

  let res = cache.get(url)
	if (res) return res

	console.log(`fetching ${opt.path||opt.root}`)
	res = await rp({
    qs: opt.query,
    json: true,
    uri: url,
  })

  if (opt.maxAge) cache.set(url, res, opt.maxAge)
  else if (opt.memoize) cache.set(url, res)
	return res
}
