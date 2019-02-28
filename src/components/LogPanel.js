import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

class LogPanel extends React.Component {

  // const dummyLogs = () => {
  //   // This is just to show you how this should work. But where should the log data actually get stored?
  //   // And where should we be creating logs in the first place?
  //   // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
  //   // Just remember to import it
  //
  //   let logs = []
  //
  //   logs.unshift(Log.warn("This is an example of a warn log"))
  //   logs.unshift(Log.notify("This is an example of a notify log"))
  //   logs.unshift(Log.error("This is an example of an error log"))
  //
  //   return logs
  // }
  /* This isn't always going to be the same color...*/
  /* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */
  state = {
    clicked: false
  }

  logs = () => this.props.logs.map((log, i) => {
    if (log.type === 'notify') {
      return <p key={i} className={log.type}>{Log.notify(log.message).msg}</p>
    } else if (log.type === 'warn') {
      return <p key={i} className={log.type}>{Log.warn(log.message).msg}</p>
    } else {
      return <p key={i} className={log.type}>{Log.error(log.message).msg}</p>
    }
  })

  clickHandler = () => {
    this.props.toggleAllHandler(this.state.clicked)
    this.setState({clicked: !this.state.clicked})
  }

  render() {
    return (
      <Segment className="HQComps" id="logPanel">
        <pre>
          {this.logs()}
        </pre>

        {/* Button below is the Activate All/Decommisssion All button */}
        <Button
          fluid
          color={this.state.clicked ? "green" : "red"}
          content={this.state.clicked ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
          onClick={this.clickHandler}
        />
      </Segment>
    )
  }
}

export default LogPanel
