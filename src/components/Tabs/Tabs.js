// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component imports
import Tab from './Tab';

// CSS imports
import '../css/Tabs/ProfileTabs.css';
import '../css/Tabs/RequestTabs.css';
import '../css/Tabs/ResponseTabs.css';

/**
 * Class for the Tab Manager
 * 
 *  - Controls the list of tabs
 *  - Controls the tab content
 */
class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
      plusTab: "+",
    };
  }

  refreshEditors = () => {
    var codeEditors = document.querySelectorAll('.CodeMirror');
    for (let i = 0; i < codeEditors.length; i++) {
      codeEditors[i].CodeMirror.refresh();
    }
  }

  onClickTabItem = (tab) => {
    if (tab === this.state.plusTab) {
      console.log("plus tab clicked");
    } else {
      this.setState({ activeTab: tab });
      setTimeout(this.refreshEditors, 5);
    }
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className={"tabs "+this.props.tabType}>
        <ol className="tab-list">
          {children.map((child) => {
            const { label, type } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                type={type}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            return (
                // Tab becomes hidden if not active
                <div style={{ display: child.props.label === activeTab ? 'block': 'none'}} key={child.props.label}>
                    {child.props.children}
                </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;