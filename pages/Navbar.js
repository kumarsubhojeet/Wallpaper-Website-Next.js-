import React from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

const links = [
  {
    name: "Home",
  },
  {
    name: "About",
  },
  {
    name: "Contact",
  },
];

const Search= [
  {
    name:'Search'
  }
]

const categories = [
  {
    name: "Cars",
  },
  {
    name: "Bikes",
  },
  {
    name: "House",
  },
  {
    name: "Mountains",
  },
  {
    name: "Oceans",
  },
  {
    name: "Sky",
  },
  {
    name: "Green",
  },
  {
    name: "Computer",
  },
  {
    name: "Buildings",
  },
  {
    name: "river",
  },
];

export default function Navbat() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h1 className=" text-xl text-gray-700 font-semibold pl-4 mt-4 ">Menus</h1>
      <List>
        {links.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {Search.map((text, index) => (
          <ListItem key={text} disablePadding>
             <Link href='/search'>
            <ListItemButton>
             <ListItemText primary={text.name} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <h1 className=" text-xl text-gray-700 font-semibold pl-4 mt-4 ">
        Category
      </h1>
      <List>
        {categories.map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link href={`/MobileSearch/${text.name}`} >
            <ListItemButton>
              <ListItemText primary={text.name} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Container>
      <div className="pc_view  sm:hidden lg:block">
        <div className="img flex justify-between items-center mt-5 ">
          <div className="first">
            <ul className=" flex items-center ">
              <Link href="/">
                <li className=" mx-10 text-gray-700 font-medium text-base cursor-pointer hover:text-[#FF5757] ">
                  Home
                </li>
              </Link>
              <Link href="/about">
                <li className=" mx-10 text-gray-700 font-medium text-base cursor-pointer hover:text-[#FF5757] ">
                  About
                </li>
              </Link>
            </ul>
          </div>

          <Link href="/">
            <Image
              src={Logo}
              className=" object-cover cursor-pointer "
              width={150}
              height={100}
              alt="Logo"
              style={{ objectFit: "cover" }}
            />
          </Link>

          <div className="third">
            <ul className=" flex items-center ">
              <Link href="/search">
                <li className=" mx-10 text-gray-700 font-medium text-base cursor-pointer hover:text-[#FF5757] ">
                  Search
                </li>
              </Link>
              <li className=" mx-10 text-gray-700 font-medium text-base cursor-pointer hover:text-[#FF5757] ">
                Contact
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mobile_view sm:block lg:hidden">
        <div className=" flex justify-between items-center ">
          <div>
            <Link href="/">
              <Image
                src={Logo}
                className=" object-cover cursor-pointer "
                width={100}
                height={100}
                alt="Logo"
                style={{ objectFit: "cover" }}
              />
            </Link>
          </div>

          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button
                  onClick={toggleDrawer(anchor, true)}
                  className=" text-2xl text-[#F55C59] cursor-pointer "
                >
                  <MenuIcon sx={{ fontSize: 40 }} />
                </Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
