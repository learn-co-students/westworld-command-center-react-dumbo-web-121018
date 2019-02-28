import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  areaName = (name) => name.split('_').map(string => string.charAt(0).toUpperCase() + string.slice(1)).join(' ')
  state = {
    options: this.props.areas.map(area => ({key: area.name, text: this.areaName(area.name), value: area.name})),
    value: this.props.current.area
    // This state is just to show how the dropdown component works.
    // Options have to be formatted in this way (array of objects with keys of: key, text, value)
    // Value has to match the value in the object to render the right text.

    // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  }



  handleChange = (e, {value}) => {
    this.props.changeHandler(this.props.current, value)
  }

  toggle = () => {
    this.props.toggleHandler(this.props.current)
  }

  /* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */
  /* Checked takes a boolean and determines what position the switch is in. Should it always be true? */

  render(){
    let {firstName, active, imageUrl, gender, area} = this.props.current
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.current.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {firstName} | { gender === 'Male' ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={active ? 'Active':'Decomissioned'}
                  checked={active}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.current.area}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
