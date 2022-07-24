---
title: wireeater
layout: page
scripts: [react, gen/wireeater]
styles: [pages/wireeater]
---

<div id="wireeater-container">
  <div id="wireeater-data">
    {% for rec in site.recs %}
      <div
        data-title="{{ rec.title }}"
        data-categories="{{ rec.categories | join: " " }}"
        data-tags="{{ rec.tags | join: " " }}"
      >
        {{ rec.content | markdownify }}
      </div>
    {% endfor %}
  </div>
</div>
