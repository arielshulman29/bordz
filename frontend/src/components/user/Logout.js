
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice'

export function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(logout());
        history.push("/")
    })
    return null;
}