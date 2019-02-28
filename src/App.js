import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from  './components/Headquarters'


class App extends Component {
  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.

  state = {
    areas: [],
    hosts: [],
    current: 'Details',
    logs: []
  }

  componentDidMount() {
    fetch('http://localhost:4000/areas')
      .then(res => res.json())
      .then(areas => this.setState({areas}))
    fetch('http://localhost:4000/hosts')
      .then(res => res.json())
      .then(hosts => this.setState({hosts}))
  }

  clickHandler = (host) => {
    this.setState({current: host})
  }

  changeHandler = (movedHost, newArea) => {
    let area = this.state.areas.find(area => area.name === newArea)
    let hosts = this.state.hosts.filter(host => host.area === area.name && host.active)
    if (area.limit >= hosts.length + 1 || !movedHost.active) {
      let newHosts = this.state.hosts.map(host => {
        if (host.id === movedHost.id) {
          host.area = newArea
        }
        return host
      })
      this.setState({
        hosts: newHosts,
        logs: [...this.state.logs,
          {
            type: 'notify',
            message: `${movedHost.firstName} set in area ${newArea.split('_').map(string => {
              return string.charAt(0).toUpperCase() + string.slice(1)
            }).join(' ')}`
          }]
      })
    } else {
      this.setState({
        logs: [
          {
            type: 'error',
            message: `Too many hosts. Cannot add ${movedHost.firstName} to ${newArea}`
          }, ...this.state.logs]
      })
    }
  }

  toggleHandler = (activatedHost) => {
    let area = this.state.areas.find(area => area.name === activatedHost.area)
    let hosts = this.state.hosts.filter(host => host.area === area.name && host.active)
    if (area.limit >= hosts.length + 1) {
      let newHosts = this.state.hosts.map(host => {
        if (host.id === activatedHost.id) {
          host.active = !host.active
        }
        return host
      })
      this.setState({
        hosts: newHosts,
        logs: [
          {
            type: 'warn',
            message: `Activated ${activatedHost.firstName}`
          }, ...this.state.logs]
      })
    } else {
      this.setState({
        logs: [
          {
            type: 'error',
            message: `Too many hosts. Cannot add ${activatedHost.firstName} to ${activatedHost.area}`
          }, ...this.state.logs]
      })
    }
  }

  toggleAllHandler = (clicked) => {
    let newHosts = this.state.hosts.map(host => {
      if (!clicked && !host.active) {
        host.active = true
      } else if (clicked && host.active) {
        host.active = false
      }
      return host
    })

    this.setState({
      hosts: newHosts,
      logs: [
        {
          type: clicked ? 'notify' : 'warn',
          message: clicked ? 'Decommissiong all hosts.' : 'Activating all hosts!'
        }, ...this.state.logs]
    })
  }


  render(){
    return (
      <Segment id='app'>
        <WestworldMap
          areas={this.state.areas}
          hosts={this.state.hosts}
          current={this.state.current}
          clickHandler={this.clickHandler}/>
        <Headquarters
          areas={this.state.areas}
          hosts={this.state.hosts}
          current={this.state.current}
          logs={this.state.logs}
          clickHandler={this.clickHandler}
          changeHandler={this.changeHandler}
          toggleHandler={this.toggleHandler}
          toggleAllHandler={this.toggleAllHandler}/>
      </Segment>
    )
  }
}

export default App;
