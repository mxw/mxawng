mxawng
======

this is my personal website, powered by jekyll, and housed on github for
personal convenience.  a few credits:

- [octopress][1] was the initial template for the directory structure,
  stylesheets, and plugins, though i think little that would be recognizable
  remains.
- [compass][2] inspired the vertical rhythm utilities.
- [this medium post][3] gave me the webpack -> jekyll pipeline.
- i used [favicon.io][4] to generate all my icon variants.
- the simple static resource versioning idea is from [here][5].

other accreditation can be found inline in the source and on the about page for
the [site itself](https://mxawng.com/about/site/).


## copyright & license

my code here is released under an MIT license, but NOT my writing, photos, or
other content.  in other words, the licensed Software includes:

- the directory structure and file paths
- config files in the toplevel directory
- jekyll plugins in `src/_plugins/`
- templates in `src/_{includes,layouts}/` and `things/{wireeater,unthings}/`
- static resources in `src/{css,js,ts}/`

the Software notably does not include:

- other Markdown (`.md`) and HTML (`.html)` files, such as pages, collections,
  and posts
- image files and pdfs, such as photos and favicons, in `src/_root/`,
  `src/img/` and elsewhere

all of which are protected under full copyright (c) 2012-present Max Wang.

the images in `src/img/icons/` are not mine and belong to their respective
trademark holders or to the public domain.


[1]: https://github.com/imathis/octopress
[2]: http://compass-style.org/
[3]: https://medium.com/@allizadrozny/using-webpack-and-react-with-jekyll-cfe137f8a2cc
[4]: https://favicon.io/favicon-converter/
[5]: https://brettterpstra.com/2013/03/05/site-versioning-with-jekyll-octopress/
