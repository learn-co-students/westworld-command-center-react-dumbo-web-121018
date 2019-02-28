import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import ColdStorage from './ColdStorage'
import HostInfo from './HostInfo'
import LogPanel from './LogPanel'
import Details from './Details'

class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.
  render(){
    let inactiveHosts = this.props.hosts.filter(host => !host.active)
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>

        <ColdStorage current={this.props.current} hosts={inactiveHosts} clickHandler={this.props.clickHandler}/>

        </Grid.Column>
        <Grid.Column width={5}>
          {this.props.current === 'Details' ?
          <Details /> :
          <HostInfo
            current={this.props.current}
            areas={this.props.areas}
            changeHandler={this.props.changeHandler}
            toggleHandler={this.props.toggleHandler}/>}
        </Grid.Column>
        <Grid.Column width={3}>

        <LogPanel logs={this.props.logs} toggleAllHandler={this.props.toggleAllHandler}/>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
