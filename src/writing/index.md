---
title: writing
subtitle: i wrote a website!
layout: page
styles: [layouts/post, pages/writing]
---

i am a &#x2728; prolific &#x2728; writer and wordsmith.  however, most of those
smithèd words live in chat logs.  you probably can't have them.  unless you
have unreads from me, in which case please check your messages.

i regularly write screeds in various forms, and also long ago this site was
some sort of blog.  some of these words can be found below.  i also irregularly
write [poetry](/writing/poetry/).

{% assign posts = site.posts | merge: site.externals | sort: "date" | reverse %}
{% include feed.html posts=posts %}
