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
          <img
            className="wireeater-card-img"
            src={`/img/wireeater/${this.props.pics[0].subpath}`}
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
    subpath: string;
    title: string;
    crop_pos?: string;
  };

  export type Props = {
    pics: PicDesc[];
  };
  export type State = {};
}
