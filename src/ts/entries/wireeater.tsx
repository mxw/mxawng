/*
 * React entrypoint
 */

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import { Wireeater } from 'components/wireeater/Wireeater';

const container = document.getElementById('wireeater-container');
const data = document.getElementById('wireeater-data');

const items: Wireeater.Item[] = [];

for (let elem_ of data.children) {
  const elem = elem_ as HTMLElement;
  items.push({
    title: elem.dataset.title,
    categories: elem.dataset.categories.split(/\s+/),
    tags: elem.dataset.tags.split(/\s+/),
    innerHTML: elem.innerHTML,
  });
}

const root = ReactDOMClient.createRoot(container!);
root.render(<Wireeater data={items}/>);
