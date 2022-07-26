/*
 * yet another brick layer
 */

import * as React from 'react';

export class Bricklayer extends React.Component<
  Bricklayer.Props,
  Bricklayer.State
> {
  readonly columnSpec: {
    breakpoint: number;
    ncolumns: number;
  }[];

  constructor(props: Bricklayer.Props) {
    super(props);

    this.onResize = this.onResize.bind(this);

    this.columnSpec = Object.entries(
      props.columnSpec
    ).map(
      ([bp, ncolumns]) => ({breakpoint: parseInt(bp), ncolumns})
    ).sort(
      (l, r) => l.breakpoint - r.breakpoint
    );

    this.state = { ncolumns: this.columnsFromSize(window.innerWidth) };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  columnsFromSize(size: number) {
    let cols = this.props.columnSpec[0];

    for (const {breakpoint, ncolumns} of this.columnSpec) {
      if (size >= breakpoint) cols = ncolumns;
    }
    return cols;
  }

  onResize() {
    const ncolumns = this.columnsFromSize(window.innerWidth);
    if (ncolumns != this.state.ncolumns) {
      this.setState(state => ({ ...state, ncolumns }));
    }
  }

  renderColumns() {
    const ncolumns = this.state.ncolumns;

    const cols: (typeof this.props.children)[][] =
      Array.from({length: ncolumns}, () => []);

    const colsizes = cols.map(_ => 0);

    React.Children.forEach(this.props.children, (child) => {
      const idx = colsizes.indexOf(Math.min(...colsizes));
      colsizes[idx] += this.props.sizeHint?.(child) ?? 1;
      cols[idx].push(child);
    });

    const { useStyles = true } = this.props;

    return cols.map((col, i) => (
      <div
        key={i}
        className={this.props.columnClassName}
        style={!useStyles ? {} : {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        {col}
      </div>
    ));
  }

  render() {
    const {
      columnSpec,
      columnClassName = '',
      useStyles = true,
      sizeHint,
      style,
      children,
      ...props
    } = this.props;

    return (
      <div {...props}
        style={!useStyles ? style : {
          display: 'flex',
          ...style
        }}
      >
        {this.renderColumns()}
      </div>
    );
  }
}

export namespace Bricklayer {
  export type ColumnSpec = {
    0: number;
    [key: number]: number;
  };

  export type Props = {
    columnSpec: ColumnSpec;
    columnClassName?: string;
    useStyles?: boolean;
    sizeHint?: (elem: any) => number;
  } & React.HTMLAttributes<HTMLDivElement>;

  export type State = {
    ncolumns: number
  };
}
