/*
 * wireeater container node
 */

import * as React from 'react'

export class Wireeater extends React.Component<
  Wireeater.Props,
  Wireeater.State
> {
  constructor(props: Wireeater.Props) {
    super(props);
  }

  render() {
    return (
      <div id="wireeater">
        {this.props.data.map((item, i) => (
          <div
            key={i}
            dangerouslySetInnerHTML={{__html: item.innerHTML}}>
          </div>
        ))}
      </div>
    );
  }
}

export namespace Wireeater {
  export type Item = {
    title: string;
    categories: string[];
    tags: string[];
    innerHTML: string;
  };

  export type Props = {
    data: Item[];
  };

  export type State = {};
}
