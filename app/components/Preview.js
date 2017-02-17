import React, { Component } from 'react';
import marked from 'marked';

class Preview extends Component {
  render() {
    return (
      <div
        className="preview"
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
