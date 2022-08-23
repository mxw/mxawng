/*
 * wireeater card cover photos
 */

import * as React from 'react';

import { Piccy } from 'components/utils/Piccy';

//-----------------------------------------------------------------------------

const YoutubeEmbed: React.FC<{handle: string}> = ({ handle }) => {
  return <iframe
    className="wireeater-cover-embed youtube"
    src={`https://www.youtube-nocookie.com/embed/${handle}`}
    title="YouTube video player"
    frameBorder="0"
    allowFullScreen={true}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
  </iframe>;
};

const SpotifyEmbed: React.FC<{handle: string}> = ({ handle }) => {
  return <iframe
    className="wireeater-cover-embed spotify"
    src={`https://open.spotify.com/embed/track/${handle}?utm_source=generator`}
    frameBorder="0"
    allowFullScreen={false}
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
  </iframe>;
};

//-----------------------------------------------------------------------------

export class CardCover extends React.Component<
  CardCover.Props,
  CardCover.State
> {
  constructor(props: CardCover.Props) {
    super(props);
  }

  renderCoverEmbed() {
    const embed = this.props.embed!;

    switch (embed.kind) {
      case 'youtube': return <YoutubeEmbed handle={embed.handle} />;
      case 'spotify': return <SpotifyEmbed handle={embed.handle} />;
    }
    return null;
  }

  renderCover() {
    if (this.props.pics) {
      return <Piccy
        pics={this.props.pics}
        classPrefix="wireeater"
        localImg={(name: string) => `/img/wireeater/${name}.jpg`}
        localSrcs={(name: string) => [`/img/wireeater/${name}.webp`]}
      />;
    }
    if (this.props.embed) return this.renderCoverEmbed();
    return null;
  }

  render() {
    return (
      <div className="wireeater-card-cover">
        {this.renderCover()}
      </div>
    );
  }
}

export namespace CardCover {
  export type EmbedKind = 'youtube' | 'spotify';

  export interface EmbedDesc {
    kind: EmbedKind;
    handle: string;
    desc?: string;
  };

  export type Props = {
    pics: Piccy.Desc[] | null;
    embed: EmbedDesc | null;
  };
  export type State = {};
}
