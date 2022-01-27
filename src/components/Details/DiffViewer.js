import React, { PureComponent } from 'react';
import ReactDiffViewer from 'react-diff-viewer';

/**
 * Diff viewer component
 */
class Diff extends PureComponent {
  constructor(props) {
      super(props);
      var tmpObject;

      this.leftTitle = props.leftTitle;
      this.rightTitle = props.rightTitle;

      try {
        tmpObject = JSON.parse(props.expected);
        console.log(typeof tmpObject);
        if (typeof tmpObject === "object")
            this.expected = JSON.stringify(tmpObject, null, 2);
        else
            this.expected = props.expected
      }
      catch (err) {
          this.expected = props.expected;
      }
      console.log(this.expected);

      try {
        tmpObject = JSON.parse(props.given);
        if (typeof tmpObject === "object")
            this.given = JSON.stringify(tmpObject, null, 2);
        else
            this.given = props.given;
      }
      catch (err) {
        this.given = props.given;
      }
  }
  render = () => {
    return (
      <ReactDiffViewer 
        oldValue={this.expected} leftTitle={this.leftTitle}
        newValue={this.given} rightTitle={this.rightTitle}
        splitView={true} showDiffOnly={false}
      />
    );
  };
}
export default Diff;