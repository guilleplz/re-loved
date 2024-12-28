"use client"

import React, { useEffect } from 'react'
import { verifyToken } from '../../../../utils/services';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user';

const Upload = () => {

  const router = useRouter();
  const removeUser = useUserStore(state => state.removeUser)

  useEffect(() => {
    const checkLogged = async () => {
          const token = localStorage.getItem("token");
    
          if (!token) {
            removeUser();
            router.push("/")
            return
          }
    
          const result = await verifyToken(token);
          if (!result) {
            removeUser();
            router.push("/")
          }
        };
    
        checkLogged();
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default Upload
