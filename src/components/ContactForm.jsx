import '../App.css';
import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, Input } from '@mui/material';
import usePhonebookStore from '../stores/usePhonebookStore';

const ContactForm = () => {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [photo, setPhoto] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(null)
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const {phoneBook, addContact} = usePhonebookStore()

    const DEFAULT_PHOTO_URL = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

    const handleAddContact = () => {
        if(!name.trim()) return;

        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert("전화번호는 010으로 시작하고 총 11자리여야 합니다.");
            return;
        }

        const isDuplicate = phoneBook.some(contact => contact.phoneNumber === phoneNumber);
        if (isDuplicate) {
            alert("이미 등록된 전화번호입니다.");
            return;
        }

        const finalPhoto = photo ? URL.createObjectURL(photo) : DEFAULT_PHOTO_URL;

        addContact(name, phoneNumber, finalPhoto);

        setName('')
        setPhoneNumber('')
        setPhoto(null)
        setPhotoPreview(null);
        setFileInputKey(Date.now());
        
    }

    useEffect(() => {
        if (photo instanceof File) {
          const previewUrl = URL.createObjectURL(photo);
          setPhotoPreview(previewUrl);
      
          // 메모리 누수 방지
          return () => URL.revokeObjectURL(previewUrl);
        } else {
          setPhotoPreview(null);
        }
      }, [photo]);

  return (
    <Box className='contactForm' display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
        <TextField id="name" label="이름" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>
        <TextField id="phone-number" label="전화번호" variant="outlined" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
        {photo && (
            <img src={photoPreview} alt="Preview" 
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '8px' }} 
            />
        )}
        <Input key={fileInputKey} type="file" accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])} style={{ display: 'block' }}/>
        <Button variant="contained" size="large" onClick={handleAddContact}>추가</Button>
    </Box>
  )
}

export default ContactForm