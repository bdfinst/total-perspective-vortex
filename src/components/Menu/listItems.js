import CRDIcon from '@material-ui/icons/DeviceHubTwoTone'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LayersIcon from '@material-ui/icons/Layers'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import PeopleIcon from '@material-ui/icons/People'
import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import VSMIcon from '@material-ui/icons/AccountTreeTwoTone'

export const mainListItems = (
  <div>
    <ListItem
      button
      onClick={(e) => {
        console.log(e.target)
      }}
    >
      <ListItemIcon>
        <VSMIcon />
      </ListItemIcon>
      <ListItemText primary="Value Stream Map" />
    </ListItem>
    <ListItem
      button
      onClick={(e) => {
        console.log(e.target)
      }}
    >
      <ListItemIcon>
        <CRDIcon />
      </ListItemIcon>
      <ListItemText primary="Current Reality" />
    </ListItem>
  </div>
)

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem> */}
  </div>
)
