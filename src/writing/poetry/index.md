---
title: poetry
subtitle: whan that aprille with his shoures soote!
layout: page
styles: [pages/poetry]
---

my poetics is the poetics of desperation.  my experience of life---and of the
creative process---feels like a sort of incessant yearning for meaning, and for
connection.  this inevitably turns up at the root of everything i ever make.

i find writing poetry very challenging and emotionally impenetrable.  i manage
to do it only occasionally, but you can see some of my work here.

- _( you appear to be reading this on a narrow phone-like device.  consider turning
  it sideways for a less headachey experience. )_

<section class="poetry">
{%- assign poems = site.poems %}
{%- for poem in poems %}
<div class="divider"></div>
<article class="poem">
  <header>
    {%- assign ref = poem.relative_path
      | downcase
      | split: "/"
      | last
      | replace: ".md", ""
    %}
    <h1 class="title" id="{{ref}}">
      <a href="#{{ref}}">{{poem.title}}</a>
    </h1>
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
