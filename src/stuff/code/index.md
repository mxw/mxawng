---
title: code
subtitle: foRmEr soFtWaRe eNgiNeEr!
layout: page
styles: [layouts/post, pages/code]
---

once upon a time there was a me, and that me produced some softwares.  now i
mostly don't even when i sort of want to because typing code makes me sad.

here are some projects though.

{% assign projects = site.code | reverse %}
{% include feed.html posts=projects %}
