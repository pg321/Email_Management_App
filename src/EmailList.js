import React, { useEffect, useState } from 'react'
import "./EmailList.css"
import { Checkbox, IconButton } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Section from './Section';
import EmailRow from './EmailRow';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';


function EmailList() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "emails"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => (
      setEmails(snapshot.docs.map(doc => (
          {
              id:doc.id,
              data:doc.data(),                
          }
      )
      ))))
  })

  return (
    <div className="emailList">
        <div className="emailList__setting">
          <div className="emailList__settingLeft">
              <Checkbox />
              <IconButton>
                <ArrowDropDownIcon />
              </IconButton>
              <IconButton>
                <RedoIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
          </div>
          <div className="emailList__settingRight">
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
            <IconButton>
              <KeyboardHideIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </div>
        </div>

        <div className="emailList__sections">
          <Section Icon={InboxIcon} title="Primary" color="red" selected />
          <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
          <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
        </div>
        <div className="emailList__list">
          {emails.map(({id, data:{ to, subject, message, timestamp} }) => (
              <EmailRow
                id={id}
                key={id}
                title={to}
                subject={subject}
                description={message}
                time={new Date(timestamp?.seconds * 1000).toUTCString()}
              />
          ))}
          <EmailRow
            title="Twitch"
            subject="Hey rabbi baby"
            description="This is love"
            time="Too late"
          />
           <EmailRow
            title="Twitch"
            subject="Hey rabbi baby"
            description="This is love"
            time="Too late"
          />
        </div>
    </div>
  )
}

export default EmailList