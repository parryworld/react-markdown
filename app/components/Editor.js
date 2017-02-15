import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.textarea, {
      mode: 'markdown',
      theme: 'base16-light'
    });
    this.editor.on('change', this.onChange);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  onChange() {
    const value = this.editor.getValue();
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.getValue && this.props.getValue(value);
    }, 1000);
  }

  render() {
    return (
      <textarea
        ref={(textarea) => {this.textarea = textarea}}
        defaultValue={this.props.defaultValue}
      ></textarea>
    );
  }
}

export default Editor;
