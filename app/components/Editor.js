import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/edit/continuelist';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.textarea, {
      mode: 'gfm',
      lineWrapping: true,
      theme: 'base16-light',
      extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
    });
    this.editor.on('change', this.onChange);
    this.editor.on('scroll', this.onScroll);
    this.editor.focus();

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 83 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.downloadFile('untitled.md', this.editor.getValue());
      }
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editor.setValue(e.target.result);
      };
      reader.readAsText(e.dataTransfer.files[0]);
    },false);
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

  onScroll() {
    this.getScrollInfo();
  }

  getScrollInfo() {
    const info = this.editor.getScrollInfo();
    this.props.getScrollInfo && this.props.getScrollInfo(info);
  }

  downloadFile(fileName, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
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
  defaultValue: React.PropTypes.string,
  getScrollInfo: React.PropTypes.func
};

Editor.defaultProps = {
  getValue: () => null,
  defaultValue: '',
  getScrollInfo: () => null
};

export default Editor;
