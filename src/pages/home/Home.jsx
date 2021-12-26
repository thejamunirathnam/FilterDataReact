import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Dashboard from "../dashboard/Dashboard";
import StarIcon from '@mui/icons-material/Star';
import UserService from "../../services/UserService";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  top: "55px",
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  top: "55px",
  overflowX: "hidden",

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#fff",
  color: "#001A33",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",

  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [shead, sethead] = React.useState([]);
  const [arrlist, setArrList] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const buttonProps = (value) => ({
    selected: selectedIndex === value,
    onClick: () => {
      sethead(arrlist[Object.keys(arrlist)[value]].events);
      setSelectedIndex(value);
    },
  });

  React.useEffect(() => {
    UserService.getDataList()
      .then((res) => {
        sethead(res.data["england-and-wales"].events);
        setArrList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const changeDataList = (e, indx) => {
  //     console.log(indx);
  //     switch (indx) {
  //       case 0: sethead(arrlist["england-and-wales"].events)
  //         break;
  //       case 1:sethead(arrlist["northern-ireland"].events)
  //         break;
  //       case 2:sethead(arrlist["scotland"].events)
  //         break;

  //       default:sethead(arrlist["england-and-wales"].events)
  //         break;
  //     }
  //   };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Assignment 1
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Divider />
        <List>
          {Object.keys(arrlist).map((text, index) => (
            <ListItemButton {...buttonProps(index)} button key={text}>
              <ListItemIcon id={index}>
                <StarIcon id={index} />
              </ListItemIcon>
              <ListItemText primary={text} id={index} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div>
          <Dashboard arrlist={shead} />
        </div>
      </Box>
    </Box>
  );
}
