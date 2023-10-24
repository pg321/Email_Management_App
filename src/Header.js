import React from 'react'
import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; 
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import { getAuth } from 'firebase/auth';


function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const auth = getAuth();
    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout())
        })
    };

  return (
    <div className="header">
        <div className="header__left">
            <IconButton>
                <MenuIcon />
            </IconButton>
            <img 
            src="https://pngimg.com/uploads/gmail_logo/gmail_logo_PNG13.png" 
            alt="gmail image"
            />
        </div>

        <div className="header__center">
            <SearchIcon />
            <input placeholder="Search mail" type="text" />
            <ArrowDropDownIcon className="header__inputCaret" />
        </div>

        <div className="header__right">
            <IconButton>
                <AppsIcon />
            </IconButton>
            <IconButton>
                <NotificationsIcon />
            </IconButton>
            <Avatar onClick={signOut} src={user?.photoURL}/>
        </div>
        
    </div>
  )
}

export default Header;