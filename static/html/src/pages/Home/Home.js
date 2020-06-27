import React from 'react';
import './Home.css';

import ReactMarkdown from "react-markdown";
import AppMarkdown from './../../README.md';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { markdown: '' };
  }

  componentWillMount() {
    fetch(AppMarkdown).then(res => res.text()).then(text => this.setState({ markdown: text }));
  }

  render() {
    const { markdown } = this.state;
    return (
      <div>
        <div className="jumbotron bg-light border-0 rounded-0 pb-4 mb-0">
          <div className="container-fluid">
            <div className="row">
              <div className="offset-sm-2 col-sm-8">
                <div className="pb-4 h2">
                  Advanced Component Management System
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="offset-sm-2 col-sm-8">
              <div className="pb-4 pt-4 text-left">
                <ReactMarkdown className="text-left" source={markdown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}