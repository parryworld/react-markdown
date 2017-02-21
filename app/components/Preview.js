import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

class Preview extends Component {
  constructor(props) {
    super(props);
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    });
  }

  componentDidUpdate() {
    const info = this.props.scrollInfo;
    if (info.height && info.height - info.clientHeight > 0) {
      const maxScrollTop = this.preview.scrollHeight - this.preview.clientHeight;
      const scrollTop = Math.floor((maxScrollTop * info.top) / (info.height - info.clientHeight));
      this.preview.scrollTop = scrollTop;
    }
  }

  render() {
    return (
      <div
        className="markdown-body"
        ref={(preview) => { this.preview = preview; }}
        dangerouslySetInnerHTML={{ __html: marked(this.props.text) }}
      />
    );
  }
}

Preview.propTypes = {
  text: React.PropTypes.string,
  scrollInfo: React.PropTypes.object
};

Preview.defaultProps = {
  text: '',
  scrollInfo: {}
};

export default Preview;
