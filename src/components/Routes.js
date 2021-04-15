import CRDIcon from '@material-ui/icons/DeviceHubTwoTone'
import GraphIcon from '@material-ui/icons/AssessmentOutlined'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import React from 'react'
import VSMIcon from '@material-ui/icons/AccountTreeTwoTone'

import CurrentReality from './CurrentReality'
import Home from './Home'
import LeadershipDashboard from './Dashboard/LeadershipDashboard'
import TeamDashboard from './Dashboard/TeamDashboard'
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
  {
    path: '/team',
    sidebarName: 'Team Dash',
    icon: <GraphIcon />,
    component: TeamDashboard,
  },
  {
    path: '/leadership',
    sidebarName: 'Leadership Dash',
    icon: <GraphIcon />,
    component: LeadershipDashboard,
  },
]

export default Routes
