---
title: wireeater
subtitle: look at me! i'm a publication!
description: various recommendations from me, max!
layout: default
scripts: [react, gen/wireeater]
styles: [pages/wireeater]
---

{% assign recmeta = site.collections | where: "label", "recs" | first %}

<div id="wireeater-container">
  <div id="wireeater-data">
    <div id="wireeater-data-categories">
      {% for category in recmeta.categories %}
        <div
          data-name="{{ category.name }}"
          data-display="{{ category.display }}"
          data-tags="{{ category.tags | join: " " }}"
        >
        </div>
      {% endfor %}
    </div>
    <div id="wireeater-data-tags">
      {% for tag in recmeta.tags %}
        <div
          data-name="{{ tag.name }}"
          data-display="{{ tag.display }}"
        >
        </div>
      {% endfor %}
    </div>
    <div id="wireeater-data-recs">
      {% for rec in site.recs %}
        <div
          data-title="{{ rec.title }}"
          data-categories="{{ rec.categories | join: " " }}"
          data-tags="{{ rec.tags | join: " " }}"
          {% if rec.pics %}
          data-pics='{{ rec.pics | jsonify | escape_once }}'
          {% endif %}
          {% if rec.embed %}
          data-embed='{{ rec.embed | jsonify | escape_once }}'
          {% endif %}
          {% if rec.link %}
          data-link="{{ rec.link }}"
          {% endif %}
        >
          {{ rec.content | markdownify }}
        </div>
      {% endfor %}
    </div>
  </div>
</div>
