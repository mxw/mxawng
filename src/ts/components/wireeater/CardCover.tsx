/*
 * wireeater card cover photos
 */

import * as React from 'react';
import ReactModal from 'react-modal';
import CSS from 'csstype';


function styleFor(pic: CardCover.PicDesc) {
  const style: CSS.Properties = {};
  if (pic.crop_pos) {
    style.objectPosition = pic.crop_pos;
  }
  return style;
}

//-----------------------------------------------------------------------------

const PhotoViewer: React.FC<CardCover.Props> = ({ pics }) => {
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
        <picture className="wireeater-card-picture">
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
        </picture>
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

  export type Props = {
    pics: PicDesc[];
  };
  export type State = {
    viewer_open: boolean;
  };
}
