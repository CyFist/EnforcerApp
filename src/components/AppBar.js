import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import ModeToggleButton from './ModeToggleButton.tsx';

import { Link } from '../utils/helperfunc';
import { useLocation } from 'react-router-dom';

const pages = [
  { page: 'Home', link: '/', icon: <HomeOutlinedIcon /> },
  { page: 'Overview', link: '/Overview', icon: <AppsIcon /> },
  { page: 'Boldface', link: '/Boldface', icon: <FlightLandOutlinedIcon /> },
  { page: 'Quiz', link: '/Quiz', icon: <QuizOutlinedIcon /> }
];

export default function TopBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { pathname } = useLocation();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const DrawItems = () => {
    return (
      <Box sx={{ width: 320 }} role="presentation">
        <Box sx={{ height: 'calc(100vh - 80px)' }}>
          <IconButton
            sx={{
              color: 'inherit',
              mt: 2,
              ml: 2,
              '&:hover': { backgroundColor: 'action.hover', transform: 'scale(1.1)' }
            }}
            onClick={toggleDrawer}
            disableRipple
          >
            <MenuOpenIcon />
          </IconButton>
          <List sx={{ px: 1, pt: 0 }}>
            {pages.map((obj, index) => (
              <ListItem key={obj.page} disablePadding>
                <ListItemButton
                  component={Link(obj.link)}
                  selected={obj.link === pathname}
                  onClick={toggleDrawer}
                  sx={{
                    '&.Mui-selected': {
                      '&:hover': { backgroundColor: 'primary.dark' },
                      backgroundColor: 'primary.main'
                    },
                    '&:hover': { backgroundColor: 'action.hover' }
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>{obj.icon}</ListItemIcon>
                  <ListItemText primary={obj.page} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          alignItems="center"
          justifyContent="center"
          position="absolute"
          display="flex"
          width={320}
          height={80}
        >
          <ModeToggleButton />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'background.default' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              mr: 2,
              '&:hover': { transform: 'scale(1.1)' }
            }}
            onClick={toggleDrawer}
            disableRipple
          >
            {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Drawer anchor={'left'} open={isOpen} onClose={toggleDrawer}>
            <DrawItems />
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            121-App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
