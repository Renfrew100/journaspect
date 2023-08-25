import React from "react";
import ProfileCard from "../components/JournalistPage/ProfileCard";
import RAACard from '../components/JournalistPage/RAACard';
import { getJournalist } from '../service.js';

class JournalistPage extends React.Component {

  constructor() {
    super();
    this.state = {
      journalist: null
    };  
  }

  async componentDidMount() {
    const id = window.location.pathname.split('/')[2];
    const journalist = await getJournalist(id);
    this.setState({journalist: journalist});
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: 'row' }}>
        <ProfileCard value={this.state.journalist} />
        <RAACard value={this.state.journalist} />
      </div>
    );
  }
}

export default JournalistPage;
