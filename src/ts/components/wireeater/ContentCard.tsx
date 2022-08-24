/*
 * wireeater content card
 */

import * as React from 'react';

import { ExternalIcon } from 'components/utils/ExternalIcon';
import { Piccy } from 'components/utils/Piccy';

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
            <ExternalIcon />
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
          key={this.props.title}
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
    pics: Piccy.Desc[] | null;
    embed: CardCover.EmbedDesc | null;
    link: string | null;
    innerHTML: string;
  };

  export type Props = Data;
  export type State = {};
}
