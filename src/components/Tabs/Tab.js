// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Class for the Tab Header
 * 
 *  - Controls the individual "header" portion of tabs.
 */
class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';

    }

    return (
      <li
        className={className}
        onClick={onClick}
      >
        <label>{label}</label>
      </li>
    );
  }
}

export default Tab;