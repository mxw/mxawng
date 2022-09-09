/*
 * i don't want things
 */

import * as React from 'react';
import Select, * as ReactSelect from 'react-select';

import CSS from 'csstype';

import { SaleItem, ItemDesc } from 'components/unthings/SaleItem';

//-----------------------------------------------------------------------------

type SelectOption = {
  value: string;
  label: string;
};

//-----------------------------------------------------------------------------

type CSSish = CSS.Properties
  & { [P in CSS.SimplePseudos]?: CSS.Properties }
  ;

const sx = (styles: CSSish) => (
  (provided: any, state: any) => ({ ...provided, ...styles})
);

const styles: ReactSelect.StylesConfig = {
  container: sx({
    display: 'inline-block',
    width: '100%',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'initial',
    borderColor: `var(--fg-${state.isFocused ? 'darker' : 'darkest'})`,
    ':hover': {
      borderColor: 'var(--fg-darker)',
      transition: 'border-color var(--defocus-time)',
    },
    boxShadow: 'initial',
    gap: '0.5em',
    padding: '0 0.5em',
  }),
  placeholder: sx({
    color: 'var(--fg-dark)',
  }),
  indicatorsContainer: sx({
    gap: '0.5em',
  }),
  indicatorSeparator: sx({
  }),
  clearIndicator: sx({
    padding: '0',
  }),
  dropdownIndicator: sx({
    padding: '0',
  }),
  valueContainer: sx({
    padding: '0',
    gap: '0.25em',
  }),
  input: sx({
    color: 'var(--fg-color)',
  }),
  multiValue: sx({
    backgroundColor: 'var(--bg-alpha)',
    border: '2px solid var(--accent-color)',
    borderRadius: '0.375rem',
    margin: '0',
    gap: '0.25rem',
  }),
  multiValueLabel: sx({
    color: 'inherit',
    fontSize: '1.125rem',
    padding: '0 0 0 0.375rem',
  }),
  multiValueRemove: sx({
    padding: '0 0.375rem 0 0.25rem',
    borderRadius: '0 0.375rem 0.375rem 0',
    ':hover': {
      backgroundColor: 'var(--fg-darkest)',
      transition: 'color var(--defocus-time)',
    },
  }),
  menu: sx({
    backgroundColor: 'rgba(81,81,81,0.75)',
    backdropFilter: 'blur(5px)',
    border: 'initial',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--accent-alpha)' : 'initial',
    backdropFilter: 'inherit',
    border: 'initial',
    ':active': {
      backgroundColor: 'var(--accent-alpha-er)',
    },
  }),
};

//-----------------------------------------------------------------------------

export class Unthings extends React.Component<
  Unthings.Props,
  Unthings.State
> {
  constructor(props: Unthings.Props) {
    super(props);

    this.state = {
      selected: [],
    };
  }

  renderSearch() {
    return (
      <div id="unthings-search">
        <Select
          className="search-tags"
          classNamePrefix="tags"

          isMulti
          isClearable
          isSearchable={false}

          options={[...this.props.tags].map((t) => ({value: t, label: t}))}
          placeholder="filter items by tag"
          value={this.state.selected.map(tag => ({value: tag, label: tag}))}

          maxMenuHeight={450}

          onChange={(options: SelectOption[]) => {
            this.setState((state, props) => ({
              ...state,
              selected: options.map(o => o.value),
            }));
          }}
          styles={styles}
        />
      </div>
    );
  }

  render() {
    return (
      <div id="unthings">
        <div id="unthings-head">
          <div dangerouslySetInnerHTML={{__html: this.props.blurb}}></div>
          {this.renderSearch()}
        </div>
        <div id="unthings-list">
          {this.props.items.filter(
            item => this.state.selected.length === 0 ||
                    item.tags.some(t => this.state.selected.includes(t))
          ).map((item, i) => (
            <SaleItem key={i} {...item} />
          ))}
        </div>
      </div>
    );
  }
}

//-----------------------------------------------------------------------------

export namespace Unthings {
  export type Props = {
    tags: Set<string>;
    blurb: string;
    items: ItemDesc[];
  };

  export type State = {
    selected: string[];
  };
}
