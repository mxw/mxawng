/*
 * wireeater card cover photos
 */

import * as React from 'react';
import ReactModal from 'react-modal';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CSS from 'csstype';


//-----------------------------------------------------------------------------

function styleFor(pic: CardCover.PicDesc) {
  const style: CSS.Properties = {};
  if (pic.crop_pos) {
    style.objectPosition = pic.crop_pos;
  }
  return style;
}

const PhotoViewer: React.FC<{
  pic: CardCover.PicDesc | null;
  embed: CardCover.EmbedDesc | null;
}> = ({ pic, embed }) => {
  if (pic) {
    return <>
      <div className="wireeater-viewer-container">
        <picture className="wireeater-viewer-picture">
          <source
            srcSet={`/img/wireeater/${pic.filename}.webp`}
            type="image/webp"
          />
          <img
            className="wireeater-viewer-img"
            src={`/img/wireeater/${pic.filename}.jpg`}
            title={pic.title}
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

    this.state = {
      cur_photo: 0,
      viewer_open: false,
    };
  }

  renderExternalImage(embed: CardCover.EmbedDesc) {
    return <picture className="wireeater-cover-picture">
      <img
        className="wireeater-cover-img"
        src={embed.handle}
        title={embed.desc}
        onClick={() => this.setState(
          (state) => ({...state, viewer_open: true})
        )}
      />
    </picture>;
  };

  renderLocalImage(i: number) {
    return <picture className="wireeater-cover-picture">
      <source
        srcSet={`/img/wireeater/${this.props.pics[i].filename}.webp`}
        type="image/webp"
      />
      <img
        className="wireeater-cover-img"
        src={`/img/wireeater/${this.props.pics[i].filename}.jpg`}
        title={this.props.pics[i].title}
        style={styleFor(this.props.pics[i])}
        onClick={() => this.setState(
          (state) => ({...state, viewer_open: true})
        )}
      />
    </picture>;
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

  renderCoverPhoto() {
    const npics = this.props.pics.length;

    if (npics === 1) {
      return <div className="wireeater-cover-viewer">
        {this.renderLocalImage(this.state.cur_photo)}
      </div>;
    }

    return <>
      <button
        className="wireeater-cover-button wireeater-cover-left"
        onClick={() => this.setState((state) => ({
          ...state,
          cur_photo: (state.cur_photo - 1 + npics) % npics,
        }))}
      />
      <TransitionGroup className="wireeater-cover-viewer">
        <CSSTransition
          key={this.state.cur_photo}
          classNames="wireeater-cover-fade"
          timeout={1000}
        >
          {this.renderLocalImage(this.state.cur_photo)}
        </CSSTransition>
      </TransitionGroup>
      <button
        className="wireeater-cover-button wireeater-cover-right"
        onClick={() => this.setState((state) => ({
          ...state,
          cur_photo: (state.cur_photo + 1) % npics,
        }))}
      />
    </>;
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
      <PhotoViewer
        pic={this.props.pics?.[this.state.cur_photo]}
        embed={this.props.embed}
      />
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
    cur_photo: number;
    viewer_open: boolean;
  };
}
