import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

class Preview extends Component {
  constructor(props) {
    super(props);
    marked.setOptions({
      highlight: (code) => {
        return hljs.highlightAuto(code).value;
      }
    });
  }

  render() {
    return (
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: marked(this.props.text) }}
      />
    );
  }
}

Preview.propTypes = {
  text: React.PropTypes.string
};

Preview.defaultProps = {
  text: ''
};

export default Preview;
