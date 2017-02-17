import React, { Component } from 'react';

import Editor from '../components/Editor';
import Preview from '../components/Preview';
import { DEFAULT_TEXT } from '../constants/common';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: DEFAULT_TEXT
    };
  }

  render() {
    return (
      <div className="container">
        <Editor
          defaultValue={DEFAULT_TEXT}
          getValue={(value) => { this.setState({ text: value }); }}
        />
        <Preview text={this.state.text} />
      </div>
    );
  }
}

export default App;
