---
title: some practice with javascript
layout: post
comments: true
---

Before heading into my second Facebook internship, which will be my first
attempt at doing any sort of web programming, I decided to teach myself some
Javascript.  This is actually the third time I've decided to "learn
Javascript", but having nothing in mind to make with it after the first two
attempts, all I achieved was a pleasant and nostalgic sense of familiarity
whenever I looked over Mozilla's JS references.

<!--begin-excerpt-->
My friend [Carl][1] suggested that I duplicate a js1k submission, so here's my
simplified clone of [this pong game][2] from the first js1k---simplified in the
sense that it is less flashy.  It is, of course, many more bytes.
<!--end-excerpt-->

The purple paddles are controlled by the `a` and `q` keys; the turquoise
paddles, by the `p` and `l` keys.

<figure class="full">
  <canvas id="pong" width="400" height="225">
    Your browser does not support the <code>&lt;canvas&gt;</code> tag!
    Sadface.
  </canvas>
</figure>

<script type="text/javascript" src="/js/common.js">
</script>
<script type="text/javascript" src="/js/solarized.js">
</script>
<script type="text/javascript" src="/js/canvas.js">
</script>
<script type="text/javascript" src="/js/posts/pong.js">
</script>
<noscript>Your browser does not support Javascript!  Sadface.</noscript>

<!--begin-excerpt-->

[1]: http://avtok.com                     "Avtok"
[2]: http://js1k.com/2010-first/demo/41   "js1k 2010 submission: feiss"
<!--end-excerpt-->
