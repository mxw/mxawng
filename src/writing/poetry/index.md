---
title: poetry
subtitle: whan that aprille with his shoures soote!
layout: page
styles: [pages/poetry]
---

i find writing poetry very challenging and emotionally impenetrable.  i manage
to do it only occasionally, but you can see some of my work here.

<section class="poetry">
{%- assign poems = site.poems %}
{%- for poem in poems %}
<div class="divider"></div>
<article class="poem">
  <header>
    <h1 class="title">{{poem.title}}</h1>
    {%- if post.subtitle %}
    <h2 class="subtitle">{{poem.subtitle}}</h2>
    {%- endif %}
  </header>
  <section class="poem-content">
    {{ poem.content }}
  </section>
</article>
{%- endfor %}
</section>
