import React, { Component } from 'react';
import marked from 'marked';

class Preview extends Component {
  render() {
    return (
      <div
        className="preview"
        dangerouslySetInnerHTML={{__html: marked(this.props.text)}}
      ></div>
    );
  }
}

export default Preview;
