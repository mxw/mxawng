/*
 * wireeater content card
 */

import * as React from 'react';

import { CardCover } from 'components/wireeater/CardCover';

export class ContentCard extends React.Component<
  ContentCard.Props,
  ContentCard.State
> {
  constructor(props: ContentCard.Props) {
    super(props);
  }

  render() {
    return (
      <div className="wireeater-card-container">
        <CardCover pics={this.props.pics} />
        <header className="wireeater-card-header">
          <h2 className="wireeater-card-title">
            {this.props.title}
          </h2>
        </header>
        <div
          className="wireeater-card-content"
          dangerouslySetInnerHTML={{__html: this.props.innerHTML}}>
        </div>
      </div>
    );
  }
}

export namespace ContentCard {
  export type Data = {
    title: string;
    categories: string[];
    tags: string[];
    pics: CardCover.PicDesc[];
    link: string | null;
    innerHTML: string;
  };

  export type Props = Data;
  export type State = {};
}
