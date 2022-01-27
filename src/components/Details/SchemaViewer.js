import React, { PureComponent } from 'react';
import ReactDiffViewer from 'react-diff-viewer';

/**
 * Schema/Response viewer component
 */
class SchemaViewer extends PureComponent {
  constructor(props) {
      super(props);
      var tmpObject;

      this.leftTitle = props.leftTitle;
      this.rightTitle = props.rightTitle;

      try {
        tmpObject = JSON.parse(props.schema);
        if (typeof tmpObject === "object")
            this.schema = JSON.stringify(tmpObject, null, 2);
        else
            this.schema = props.schema
      }
      catch (err) {
          this.schema = props.schema;
      }

      try {
        tmpObject = JSON.parse(props.response);
        if (typeof tmpObject === "object")
            this.response = JSON.stringify(tmpObject, null, 2);
        else
            this.response = props.response;
      }
      catch (err) {
        this.response = props.response;
      }
  }
  render = () => {
    const newStyles = {
        variables: {
            light: {
                diffViewerBackground: '#fff',
                diffViewerColor: '#212529',
                addedBackground: '#fff',
                addedColor: '#24292e',
                removedBackground: '#fff',
                removedColor: '#24292e',
                wordAddedBackground: '#acf2bd',
                wordRemovedBackground: '#fdb8c0',
                addedGutterBackground: '#f7f7f7',
                removedGutterBackground: '#f7f7f7',
                gutterBackground: '#f7f7f7',
                gutterBackgroundDark: '#f3f1f1',
                highlightBackground: '#fffbdd',
                highlightGutterBackground: '#fff5b1',
                codeFoldGutterBackground: '#dbedff',
                codeFoldBackground: '#f1f8ff',
                emptyLineBackground: '#fafbfc',
                gutterColor: '#212529',
                addedGutterColor: '#212529',
                removedGutterColor: '#212529',
                codeFoldContentColor: '#212529',
                diffViewerTitleBackground: '#fafbfc',
                diffViewerTitleColor: '#212529',
                diffViewerTitleBorderColor: '#eee',
            }
        }
    }
    return (
      <div className="schema-viewer">
        <ReactDiffViewer 
            oldValue={this.schema} leftTitle={this.leftTitle}
            newValue={this.response} rightTitle={this.rightTitle}
            splitView={true} showDiffOnly={false} disableWordDiff={true} styles={newStyles}
        />
      </div>
    );
  };
}
export default SchemaViewer;