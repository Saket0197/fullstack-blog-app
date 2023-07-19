import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedPage({children}) {

  return (
    <div>
        {
            !localStorage.getItem('token') ? <Navigate to='/login' /> : children
        }
    </div>
  )
}
