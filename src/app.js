import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import axios from 'axios';
import Aside from './components/aside.jsx';
import Info from './components/info.js';
import Loader from './components/loader.js';
import Skills from './components/skills.js';

export default class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false,
      resume: {},
    };
  }

  profileData() {
    return axios.get('/public/resume.json')
      .then( data => {
        this.setState({
          hasData: true,
          resume: data.data
        });
      });
  }

componentWillMount() {
  this.profileData();
}

  render() {
    const data = {
      info: this.state.resume.info,
      contact: this.state.resume.contact
    };
    const skills = this.state.resume.skills;

    if (this.state.hasData) {
      return (
        <div className="resume-overview">
          <div className="row header">
            <aside className="large-4 medium-12 small-12 columns left-panel">
              <Aside data={data} />
            </aside>
            <div className="large-8 medium-12 small-12 columns right-panel">
              <Skills data={skills} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Loader />
        </div>
      );
    }
  }
}

ReactDOM.render(
  <Resume />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
