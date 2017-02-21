import React, { Component } from 'react';

import Editor from '../components/Editor';
import Preview from '../components/Preview';
import { DEFAULT_TEXT } from '../constants/common';

const localContent = localStorage.getItem('md-content');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: localContent || DEFAULT_TEXT,
      scrollInfo: {}
    };
    this.handleWindowClose = this.handleWindowClose.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      localStorage.setItem('md-content', this.state.text);
    }, 60000);

    window.addEventListener('beforeunload', this.handleWindowClose);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    window.removeEventListener('beforeunload', this.handleWindowClose);
  }

  handleWindowClose() {
    localStorage.setItem('md-content', this.state.text);
  }

  render() {
    return (
      <div className="container">
        <Editor
          defaultValue={localContent || DEFAULT_TEXT}
          getValue={(value) => { this.setState({ text: value }); }}
          getScrollInfo={(info) => { this.setState({ scrollInfo: info }); }}
        />
        <Preview
          text={this.state.text}
          scrollInfo={this.state.scrollInfo}
        />
      </div>
    );
  }
}

export default App;
