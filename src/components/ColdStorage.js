import React from 'react';
import { Segment } from 'semantic-ui-react'
import HostList from './HostList'

const ColdStorage = (props) => (
  <Segment.Group className="HQComps">
    <Segment compact>
      <h3 className="labels">ColdStorage</h3>
    </Segment>
    <Segment compact>
      <HostList current={props.current} hosts={props.hosts} clickHandler={props.clickHandler}/>
    </Segment>
  </Segment.Group>
)

export default ColdStorage
