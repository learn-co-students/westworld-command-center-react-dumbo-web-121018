import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = (props) => {
  const {id, name} = props.area
  const areaName = name.split('_').map(string => string.charAt(0).toUpperCase() + string.slice(1)).join(' ')
  return (
    <div className='area' id={name}>
      <h3 className='labels'>{areaName}</h3>
      <HostList hosts={props.hosts} current={props.current} clickHandler={props.clickHandler}/>
    </div>
  )

}

// Area.propTypes = {
//   hosts: function(props, propName, componentName){
//     if(props.hosts.length > props.area.limit){
//       throw Error(
//         `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
//       )
//     }
//   }
// }

export default Area;
