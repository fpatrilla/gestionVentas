import React, {  useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRequireAuth } from '../lib/auth';

export default function task() {
    const handleLogout = () => {
        Cookies.remove('token');
       
      };
      useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('/api/auth/user');
          const data = await response.json();
          setUsername(data.username);
        };
    
        fetchData();
      }, []);
    
      useRequireAuth();
  return (
    <div>task</div>
  )
}
