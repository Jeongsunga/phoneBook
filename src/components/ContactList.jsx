import '../App.css'
import React, { useEffect, useState } from 'react'
import usePhonebookStore from '../stores/usePhonebookStore'
import { TextField, Button } from '@mui/material';


const ContactList = () => {
    const {phoneBook} = usePhonebookStore();
    const [filteredContacts, setFilteredContacts] = useState([]);

    const search = (event) => {
      if(event.key === "Enter"){
        // 입력한 검색어를 읽어와서 url로 바꿔준다.
        const keyword = event.target.value.trim();
        event.target.value = '';

        if (!keyword) {
          setFilteredContacts(phoneBook);
          return;
        }

        const filtered = phoneBook.filter(contact =>
          contact.name.includes(keyword) ||
          contact.phoneNumber.includes(keyword)
        );

        setFilteredContacts(filtered);
      }
    }

    useEffect(() => {
      setFilteredContacts(phoneBook);
    }, [phoneBook])
  return (
    <div className='contactList'>
      <div style={{marginBottom: '10px'}}>총 인원: {filteredContacts.length}명</div>
        <TextField id="standard-basic" label="Search" variant="standard" style={{marginBottom:'18px'}} onKeyDown={(event)=>search(event)}/>
        {filteredContacts.length !== phoneBook.length && (
          <Button variant="outlined"size="small" onClick={() => setFilteredContacts(phoneBook)} style={{ marginTop:'18px', marginLeft:'20px' }}>
            전체 보기
          </Button>
        )}

        {filteredContacts.map((item)=>
            <div className='contactItem' key={item.id}>
                <img src={item.photo} alt="Contact" style={{ width: 80, height: 80 }} />
                <div style={{paddingLeft:'18px'}}>
                  <p>{item.name}</p>
                  <p>{item.phoneNumber}</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default ContactList