/*
 * a cute li'l photo viewer. features include:
 *  - "scrolling" b/w multiple photos
 *  - a modal full-res viewer on click
 */

import * as React from 'react';
import ReactModal from 'react-modal';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CSS from 'csstype';

//-----------------------------------------------------------------------------

function styleFor(pic: Piccy.Desc) {
  const style: CSS.Properties = {};
  if (pic.crop_pos) {
    style.objectPosition = pic.crop_pos;
  }
  return style;
}

//-----------------------------------------------------------------------------

const Sources: React.FC<
  Pick<Piccy.PropsOne, 'pic' | 'localSrcs'>
> = ({ pic, localSrcs }) => {
  if (pic.external) return null;

  return <>
    {localSrcs(pic.filename).map(src => (
      <source key={src} srcSet={src} type="image/webp" />
    ))}
  </>;
}

const PhotoViewer: React.FC<Piccy.PropsOne> = ({
  pic, classPrefix, localImg, localSrcs
}) => {
  const prefix = classPrefix;

  const src = pic.external
    ? pic.filename
    : localImg(pic.filename);

  return <>
    <div className={`${prefix}-viewer-container`}>
      <picture className={`${prefix}-viewer-picture`}>
        <Sources pic={pic} localSrcs={localSrcs} />
        <img
          className={`${prefix}-viewer-img`}
          src={src}
          title={pic.title}
        />
      </picture>
    </div>
  </>;
}

//-----------------------------------------------------------------------------

export class Piccy extends React.Component<Piccy.Props, Piccy.State> {
  constructor(props: Piccy.Props) {
    super(props);

    this.state = {
      cur_photo: 0,
      viewer_open: false,
    };
  }

  renderPicture(i: number) {
    const prefix = this.props.classPrefix;

    const pic = this.props.pics[i];
    const src = pic.external
      ? pic.filename
      : this.props.localImg(pic.filename);

    return <picture className={`${prefix}-piccy-picture`}>
      <Sources pic={pic} localSrcs={this.props.localSrcs} />
      <img
        className={`${prefix}-piccy-img`}
        src={src}
        title={pic.title}
        style={styleFor(pic)}
        onClick={() => this.setState(
          (state) => ({...state, viewer_open: true})
        )}
      />
    </picture>;
  }

  renderModal() {
    const prefix = this.props.classPrefix;

    return <ReactModal
      isOpen={this.state.viewer_open}
      onRequestClose={() => this.setState(
        (state) => ({...state, viewer_open: false})
      )}
      contentLabel="photo viewer"
      className={`${prefix}-viewer`}
      overlayClassName={`${prefix}-viewer-overlay`}
    >
      <PhotoViewer
        pic={this.props.pics[this.state.cur_photo]}
        {...this.props}
      />
    </ReactModal>
  }

  renderPiccy() {
    const npics = this.props.pics.length;
    const prefix = this.props.classPrefix;

    if (npics === 1) {
      return (
        <div
          className={`${prefix}-piccy-viewer`}
          style={this.props.style}
        >
          {this.renderPicture(this.state.cur_photo)}
        </div>
      );
    }

    return <div className={`${prefix}-piccy-container`}>
      <button
        className={`${prefix}-piccy-button ${prefix}-piccy-left`}
        onClick={() => this.setState((state) => ({
          ...state,
          cur_photo: (state.cur_photo - 1 + npics) % npics,
        }))}
      />
      <TransitionGroup
        className={`${prefix}-piccy-viewer`}
        style={this.props.style}
      >
        <CSSTransition
          key={this.state.cur_photo}
          classNames={`${prefix}-piccy-fade`}
          timeout={1000}
        >
          {this.renderPicture(this.state.cur_photo)}
        </CSSTransition>
      </TransitionGroup>
      <button
        className={`${prefix}-piccy-button ${prefix}-piccy-right`}
        onClick={() => this.setState((state) => ({
          ...state,
          cur_photo: (state.cur_photo + 1) % npics,
        }))}
      />
    </div>;
  }

  render() {
    return <>
      {this.renderPiccy()}
      {this.renderModal()}
    </>;
  }
}

export namespace Piccy {
  export interface Desc {
    filename: string;
    title: string;
    crop_pos?: string;
    external?: boolean;
  };

  type PropsBase = {
    classPrefix: string;
    // path munging for local image handles
    localImg: (x: string) => string;
    // path munging for local image <source> srcsets. webp only lol.
    localSrcs: (x: string) => string[];
  };

  export type PropsOne = { pic: Piccy.Desc } & PropsBase;

  export type Props = {
    pics: Piccy.Desc[];
    // style for the container div
    style?: CSS.Properties;
  } & PropsBase;

  export type State = {
    cur_photo: number;
    viewer_open: boolean;
  };
}
