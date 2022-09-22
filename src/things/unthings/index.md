---
title: unthings
subtitle: i have bad taste!
description: please buy my stuff!
layout: page
scripts: [react, gen/unthings]
styles: [pages/unthings]
---

{%- assign tss = site.sale | map: "tags" -%}
{%- assign tags = "" | split: "," -%}
{%- for ts in tss -%}
  {%- assign tags = tags | concat: ts -%}
{%- endfor -%}
{%- assign tags = tags | uniq | sort -%}

{%- assign items = site.sale | reverse -%}

<div id="unthings-container">
  <div id="unthings-data">
    <div
      id="unthings-data-tags"
      data-tags="{{ tags | join: " " }}"
    >
    </div>
    <div id="unthings-data-items">
      {%- for item in items %}
      <div
        data-title="{{ item.title }}"
        data-tags="{{ item.tags | join: " " }}"
        data-sold="{{ item.sold }}"

        {%- if item.size %}
        data-size="{{ item.size }}"
        {%- endif %}
        data-price="{{ item.price }}"
        data-msrp="{{ item.msrp }}"
        data-obo="{{ item.obo }}"

        data-pics='{{ item.pics | jsonify | escape_once }}'
        {%- if item.link %}
        data-link="{{ item.link }}"
        {%- endif %}
        {%- if item.bg %}
        data-bg="{{ item.bg }}"
        {%- endif %}
      >
        {{ item.content | markdownify }}
      </div>
      {%- endfor %}
    </div>
  </div>
</div>
