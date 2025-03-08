import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useScrollRestroation = () => {
    const location = useLocation()
    useEffect(() => {
        const savedPosition = sessionStorage.getItem(location.pathname)
        if (savedPosition) {
            // Scroll to the saved position if it exists
            window.scrollTo(0, parseInt(savedPosition, 10));
        }
        return () => {
            sessionStorage.setItem(location.pathname, window.scrollY);
        };
    }, [location])
}

export default useScrollRestroation