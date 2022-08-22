/*
 * React entrypoint
 */

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactModal from 'react-modal';

import { Wireeater } from 'components/wireeater/Wireeater';


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

const container = document.getElementById('wireeater-container');

const categories = Object.fromEntries(
  data_map('wireeater-data-categories', elem => [
    elem.dataset.name,
    {
      display: elem.dataset.display,
      tags: elem.dataset.tags.split(/\s+/),
    }
  ])
);

const tags = Object.fromEntries(
  data_map('wireeater-data-tags', elem => [
    elem.dataset.name,
    elem.dataset.display
  ])
);

const recs = data_map('wireeater-data-recs', elem => ({
  title: elem.dataset.title,
  categories: elem.dataset.categories.split(/\s+/),
  tags: elem.dataset.tags.split(/\s+/),
  pics: elem.dataset.pics ? JSON.parse(elem.dataset.pics) : null,
  embed: elem.dataset.embed ? JSON.parse(elem.dataset.embed) : null,
  link: elem.dataset.link ?? null,
  innerHTML: elem.innerHTML,
}));

const root = ReactDOMClient.createRoot(container!);
root.render(
  <Wireeater
    categories={categories}
    tags={tags}
    data={recs}
  />
);
