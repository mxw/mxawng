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

  renderTitle() {
    if (this.props.link) {
      return (
        <h2 className="wireeater-card-title">
          <a href={this.props.link} target="_blank">
            <span>{this.props.title}</span>
            <svg
              className="external-icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"></path>
            </svg>
          </a>
        </h2>
      );
    } else {
      return (
        <h2 className="wireeater-card-title">
          {this.props.title}
        </h2>
      );
    }
  }

  render() {
    return (
      <div className="wireeater-card-container">
        <CardCover
          pics={this.props.pics}
          embed={this.props.embed}
        />
        <header className="wireeater-card-header">
          {this.renderTitle()}
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
    pics: CardCover.PicDesc[] | null;
    embed: CardCover.EmbedDesc | null;
    link: string | null;
    innerHTML: string;
  };

  export type Props = Data;
  export type State = {};
}
