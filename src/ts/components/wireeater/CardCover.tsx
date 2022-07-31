/*
 * wireeater card cover photos
 */

import * as React from 'react';
import ReactModal from 'react-modal';
import CSS from 'csstype';


//-----------------------------------------------------------------------------

function styleFor(pic: CardCover.PicDesc) {
  const style: CSS.Properties = {};
  if (pic.crop_pos) {
    style.objectPosition = pic.crop_pos;
  }
  return style;
}

const PhotoViewer: React.FC<CardCover.Props> = ({ pics, embed }) => {
  if (pics) {
    return <>
      <div className="wireeater-viewer-container">
        <picture className="wireeater-viewer-picture">
          <source
            srcSet={`/img/wireeater/${pics[0].filename}.webp`}
            type="image/webp"
          />
          <img
            className="wireeater-viewer-img"
            src={`/img/wireeater/${pics[0].filename}.jpg`}
            title={pics[0].title}
          />
        </picture>
      </div>
    </>;
  }

  if (embed) {
    return <>
      <div className="wireeater-viewer-container">
        <picture className="wireeater-viewer-picture">
          <img
            className="wireeater-viewer-img"
            src={embed.handle}
            title={embed.desc}
          />
        </picture>
      </div>
    </>;
  }

  return null;
}

//-----------------------------------------------------------------------------

const YoutubeEmbed: React.FC<{handle: string}> = ({ handle }) => {
  return <iframe
    className="wireeater-card-embed youtube"
    src={`https://www.youtube-nocookie.com/embed/${handle}`}
    title="YouTube video player"
    frameBorder="0"
    allowFullScreen={true}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
  </iframe>;
};

const SpotifyEmbed: React.FC<{handle: string}> = ({ handle }) => {
  return <iframe
    className="wireeater-card-embed spotify"
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

    this.state = {
      viewer_open: false,
    };
  }

  renderCoverEmbed() {
    const embed = this.props.embed!;

    switch (embed.kind) {
      case 'image':   return this.renderExternalImage(embed);
      case 'youtube': return <YoutubeEmbed handle={embed.handle} />;
      case 'spotify': return <SpotifyEmbed handle={embed.handle} />;
    }
    return null;
  }

  renderExternalImage(embed: CardCover.EmbedDesc) {
    return <picture className="wireeater-card-picture">
      <img
        className="wireeater-card-img"
        src={embed.handle}
        title={embed.desc}
        onClick={() => this.setState(
          (state) => ({...state, viewer_open: true})
        )}
      />
    </picture>;
  };

  renderCoverPhoto() {
    return <picture className="wireeater-card-picture">
      <source
        srcSet={`/img/wireeater/${this.props.pics[0].filename}.webp`}
        type="image/webp"
      />
      <img
        className="wireeater-card-img"
        src={`/img/wireeater/${this.props.pics[0].filename}.jpg`}
        title={this.props.pics[0].title}
        style={styleFor(this.props.pics[0])}
        onClick={() => this.setState(
          (state) => ({...state, viewer_open: true})
        )}
      />
    </picture>;
  }

  renderCover() {
    if (this.props.pics) return this.renderCoverPhoto();
    if (this.props.embed) return this.renderCoverEmbed();
    return null;
  }

  renderModal() {
    return <ReactModal
      isOpen={this.state.viewer_open}
      onRequestClose={() => this.setState(
        (state) => ({...state, viewer_open: false})
      )}
      contentLabel="photo viewer"
      className="wireeater-viewer"
      overlayClassName="wireeater-viewer-overlay"
    >
      <PhotoViewer {...this.props} />
    </ReactModal>
  }

  render() {
    return <>
      <div className="wireeater-card-cover">
        {this.renderCover()}
      </div>
      {this.renderModal()}
    </>;
  }
}

export namespace CardCover {
  export interface PicDesc {
    filename: string;
    title: string;
    crop_pos?: string;
  };

  export type EmbedKind = 'image' | 'youtube' | 'spotify';

  export interface EmbedDesc {
    kind: EmbedKind;
    handle: string;
    desc?: string;
  };

  export type Props = {
    pics: PicDesc[] | null;
    embed: EmbedDesc | null;
  };
  export type State = {
    viewer_open: boolean;
  };
}
