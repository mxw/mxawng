/*
 * React entrypoint
 */

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactModal from 'react-modal';

import { Unthings } from 'components/unthings/Unthings';


ReactModal.setAppElement('body');

//-----------------------------------------------------------------------------

function data_map<T>(id: string, func: (elem: HTMLElement) => T): T[] {
  const data_container = document.getElementById(id);
  return [...data_container.children].map(elem_ => {
    const elem = elem_ as HTMLElement;
    return func(elem);
  });
};

//-----------------------------------------------------------------------------

const container = document.getElementById('unthings-container');

const tags = new Set(
  document.getElementById('unthings-data-tags')!.dataset.tags.split(/\s+/)
);

let items = data_map('unthings-data-items', elem => ({
  title: elem.dataset.title,
  tags: elem.dataset.tags.split(/\s+/),
  sold: !!elem.dataset.sold,

  size: elem.dataset.size ?? null,
  price: parseFloat(elem.dataset.price),
  msrp: parseFloat(elem.dataset.msrp),
  obo: !!elem.dataset.obo,

  pics: elem.dataset.pics ? JSON.parse(elem.dataset.pics) : null,
  link: elem.dataset.link ?? null,
  bg: elem.dataset.bg ?? null,

  innerHTML: elem.innerHTML,
}));

const index = items.find(item => item.title === 'index');
items = items.filter(item => item.title !== 'index');

items = items.filter((x) => !x.sold).concat(
  items.filter((x) => x.sold)
);

const root = ReactDOMClient.createRoot(container!);
root.render(
  <Unthings
    tags={tags}
    blurb={index.innerHTML}
    items={items}
  />
);
