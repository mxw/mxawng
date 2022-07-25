/*
 * wireeater content card
 */

import * as React from 'react';

export class ContentCard extends React.Component<
  ContentCard.Props,
  ContentCard.State
> {
  constructor(props: ContentCard.Props) {
    super(props);
  }

  render() {
    return (
      <div
        dangerouslySetInnerHTML={{__html: this.props.innerHTML}}>
      </div>
    );
  }
}

export namespace ContentCard {
  export type Data = {
    title: string;
    categories: string[];
    tags: string[];
    innerHTML: string;
  };

  export type Props = Data;
  export type State = {};
}
