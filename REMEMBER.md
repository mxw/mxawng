## remember

just a file of miscellaneous things for me to remember in case i neglect this
site for years and forget everything:

### development

- use `npm run deploy` to fully build the site

- use `jekyll serve --host=0.0.0.0` for mobile development, then point a
  device on the same network to the host's IP.  see [here][mobile].

### jekyll / liquid

- liquid tags tend to leave behind a lot of whitespace.  use `{%-` and `-%}`
  delimiters to trim all the whitespace on the respective side.  there's no
  great rule of thumb for how to use these, unfortunately, and mismanagement
  can cause syntactically important whitespace in HTML output to vanish.  using
  `{% capture %}` for complex expressions also helps reign in whitespace.

### static resources

- each `page`, each `layout`, and the `site` config can require its own
  `styles` and `scripts` in its front matter.  (currently, posts and other
  collections cannot.)  these static resource lists are all concatenated
  together and rendered out in `_include/{head,after}.html`.

- iOS devices have no easy way to hard refresh a page and bypass static
  resource caching, and of course desktop browsers not controlled by me could
  have stale caches.  the `static_version` config value, in conjunction with
  some nginx rewrite rules, lets us bypass caches with a fresh URL.

- the `css/common/` directory contains the only sass partials that are safe to
  `@use` from anywhere.  both `base/` and `partials/` should be included only
  once, probably from `site.scss`.

### other assets

- i'm using photoshop to manually generate web images at the moment.  the
  settings are 9/12 jpeg quality and 85% lossy webp quality.

### style practices

(specific to this site, maybe.)

- all embedded content—`<img>`, `<video>`, `<iframe>`, `<canvas>`, etc.—should
  be enclosed in a `<figure>`.  this reduces the surface area for styling,
  increases flexibility via a container, and also is semantically appropriate,
  since some such content might be `<figcaption>`'d.

- never use max-width to size content directly (except perhaps in conjunction
  with `min()`).  it's better left to selectors for responsive sizing.

- `aspect-ratio` exists now!  set it, set one of `width` and `height` (e.g., to
  `100%` of its container's dimensions), and set the other to `auto` for
  responsive [replaced elements][replaced] that scale properly.

- `margin: auto` is more magical than usual in flexbox layouts.  after space is
  distributed between children, the remaining space is distributed to all
  `auto` margins.  this is especially useful for pushing the last element in a
  flexbox to the `flex-end`.

- styling links can be finnicky:

  - links don't inherit color from their parents' styles.

  - links may contain things that aren't text, which may or may not want
    the same `text-decoration` styling.

  - text decoration is not consistently handled between browsers, is
    sensitive to [whitespace rules][whitespace], can't be adjusted on
    `::before` or `::after` elements...


[mobile]: https://diamantidis.github.io/tips/2020/06/23/browsing-local-jekyll-blog-from-mobile-device
[replaced]: https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element
[whitespace]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
