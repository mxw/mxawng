/*
 * turn a string into... a big pile of spans...
 */

import * as React from 'react';

const spannify = (text: string) => (
  <>
    {[...text].map(c => (<span>{c}</span>))}
  </>
);

export default spannify;
