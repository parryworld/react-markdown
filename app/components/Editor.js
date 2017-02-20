import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/gfm/gfm';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.textarea, {
      mode: 'gfm',
      lineWrapping: true,
      theme: 'base16-light'
    });
    this.editor.on('change', this.onChange);
    this.editor.focus();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  onChange() {
    const value = this.editor.getValue();
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.getValue && this.props.getValue(value);
    }, 400);
  }

  render() {
    return (
      <textarea
        ref={(textarea) => { this.textarea = textarea; }}
        defaultValue={this.props.defaultValue}
      />
    );
  }
}

Editor.propTypes = {
  getValue: React.PropTypes.func,
  defaultValue: React.PropTypes.string
};

Editor.defaultProps = {
  getValue: () => null,
  defaultValue: ''
};

export default Editor;
