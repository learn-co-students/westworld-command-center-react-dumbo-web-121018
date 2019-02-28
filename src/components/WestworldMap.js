import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


const WestworldMap = (props) => {
  const areas = props.areas.map(area => {
    return (
      <Area key={area.id}
        area={area}
        hosts={props.hosts.filter(host => {
          return area.name === host.area && host.active === true
        })}
        current={props.current}
        clickHandler={props.clickHandler}/>)
  })

  return (
    <Segment id="map" >
      {areas}
    </Segment>
  )
}

export default WestworldMap
