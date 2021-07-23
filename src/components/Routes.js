import CRDIcon from '@material-ui/icons/DeviceHubTwoTone'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import React from 'react'
import VSMIcon from '@material-ui/icons/AccountTreeTwoTone'

import CurrentReality from './CurrentReality'
import Home from './Home'
import ValueStream from './ValueStream'

const Routes = [
  {
    path: '/',
    sidebarName: 'Home',
    icon: <HomeIcon />,
    component: Home,
  },
  {
    path: '/ValueStream',
    sidebarName: 'Value Stream Map',
    icon: <VSMIcon />,
    component: ValueStream,
  },
  {
    path: '/CurrentReality',
    sidebarName: 'Current Reality Tree',
    icon: <CRDIcon />,
    component: CurrentReality,
  },
]

export default Routes
