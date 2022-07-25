/*
 * wireeater container node
 */

import * as React from 'react';
import Select, * as ReactSelect from 'react-select';

import { ContentCard } from 'components/wireeater/ContentCard';

import spannify from 'utils/spannify';

//-----------------------------------------------------------------------------

type SelectOption = {
  value: string;
  label: string;
};

//-----------------------------------------------------------------------------

const styles: ReactSelect.StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'initial',
    border: 'initial',
    boxShadow: 'initial',
  }),
  container: (provided, state) => ({
    ...provided,
    display: 'inline-block',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0',
    margin: '0 0.5em',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: 'var(--fg-darkest)',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    gap: '0.5em',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none',
    order: 5,
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    padding: '0',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '0',
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: 'rgba(81,81,81,0.2)',
    backdropFilter: 'blur(1.5px)',
    border: 'initial',
    width: '200px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: 'initial',
    border: 'initial',
    '&:active': {
      backgroundColor: 'initial',
    }
  }),
};

//-----------------------------------------------------------------------------

export class Wireeater extends React.Component<
  Wireeater.Props,
  Wireeater.State
> {
  constructor(props: Wireeater.Props) {
    super(props);

    this.categoryOption = this.categoryOption.bind(this);
    this.tagOption = this.tagOption.bind(this);

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);

    this.state = {
      selected: {
        category: null,
        tags: [],
      }
    };
  }

  categoryOption(category: string | null) {
    return category
      ? { value: category, label: spannify(this.props.categories[category].display) }
      : null;
  }

  tagOption(tag: string | null) {
    return tag
      ? { value: tag, label: spannify(this.props.tags[tag]) }
      : null;
  }

  onChangeCategory(option: SelectOption | null) {
    this.setState((state, props) => {
      if (!option) {
        return {
          ...state,
          selected: { category: null, tags: [] }
        }
      }

      return {
        ...state,
        selected: {
          category: option.value,
          tags: state.selected.tags.filter(
            t => props.categories[option.value].tags.includes(t)
          )
        }
      }
    });
    return;
  }

  onChangeTag(option: SelectOption | null) {
    this.setState((state, props) => {
      if (!option) {
        return {
          ...state,
          selected: { ...state.selected, tags: [] }
        }
      }

      return {
        ...state,
        selected: { ...state.selected, tags: [option.value] }
      }
    });
    return;
  }

  renderSelectCategory() {
    return <Select
      className="select-category"
      classNamePrefix="category"
      options={Object.entries(this.props.categories).map(
        ([v, m]) => ({value: v, label: spannify(m.display)})
      )}
      placeholder={spannify('click here')}
      value={this.categoryOption(this.state.selected.category)}
      onChange={this.onChangeCategory}
      isClearable={true}
      isSearchable={false}
      styles={styles}
    />;
  }

  renderSelectTag() {
    const category = this.state.selected.category;
    const tags = this.props.categories[category]?.tags ?? [];

    return <Select
      className={category ? "select-tags active" : "select-tags"}
      classNamePrefix="tags"
      options={Object.entries(this.props.tags).map(
        ([v, l]) => ({value: v, label: spannify(l)})
      ).filter(
        opt => tags.includes(opt.value)
      )}
      placeholder={spannify(category ? 'click here' : 'not yet...')}
      value={this.state.selected.tags.map(this.tagOption)}
      noOptionsMessage={() => "click above first"}
      onChange={this.onChangeTag}
      isClearable={true}
      isSearchable={false}
      styles={styles}
    />;
  }

  renderSelectors() {
    return (
      <div id="wireeater-selectors">
        <div id="wireeater-category">
          hey max! i'm in your {this.renderSelectCategory()}
        </div>
        <div id="wireeater-tag">
          what should i {this.renderSelectTag()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="wireeater">
        {this.renderSelectors()}
        <div id="wireeater-collection">
          {this.props.data.filter(
            item => item.categories.includes(this.state.selected.category) &&
                    item.tags.some(t => this.state.selected.tags.includes(t))
          ).map((item, i) => (
            <ContentCard key={i} {...item} />
          ))}
          </div>
      </div>
    );
  }
}

//-----------------------------------------------------------------------------

export namespace Wireeater {
  export type Props = {
    categories: Record<string, {
      display: string,
      tags: string[],
    }>;
    tags: Record<string, string>;
    data: ContentCard.Data[];
  };

  export type State = {
    selected: {
      category: string | null;
      tags: string[];
    }
  };
}
