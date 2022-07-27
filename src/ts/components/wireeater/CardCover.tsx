/*
 * wireeater card cover photos
 */

import * as React from 'react';
import CSS from 'csstype';

function styleFor(pic: CardCover.PicDesc) {
  const style: CSS.Properties = {};
  if (pic.crop_pos) {
    style.objectPosition = pic.crop_pos;
  }
  return style;
}

export class CardCover extends React.Component<
  CardCover.Props,
  CardCover.State
> {
  constructor(props: CardCover.Props) {
    super(props);
  }

  render() {
    return (
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
          />
        </picture>
      </div>
    );
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
  export type State = {};
}
