"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Whisprlogo from "../assets/whisprlogo.png"
import Whisprlogosmall from "../assets/whisprlogosmall.png"
import Loading from './Loading'
import { getUserData } from '../server/actions'; // Ensure this is correctly imported

const Navbar = () => {
    const { user } = useKindeBrowserClient();
    const [logoSrc, setLogoSrc] = useState(Whisprlogo);
    
    const [User, setUser] = useState("a")
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setLogoSrc(Whisprlogosmall);
            } else {
                setLogoSrc(Whisprlogo);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!user?.id) return; // Wait until user.id is available
    
        const getUserDataFE = async () => {
            try {
                const { User } = await getUserData(user.id);
                setUser(User?.username || "unidentified")
                setLoadingUser(false)
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
    
        getUserDataFE();
    }, [user]);

    if(loadingUser) return <Loading />

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3">
                <div className="d-flex flex-grow-1"></div>
                
                <div className="navbar-center">
                    <a className="navbar-brand" href="#">
                        <Image 
                            src={logoSrc}
                            alt="Whispr"
                            width={125}
                            height={50}
                        />
                    </a>
                </div>

                <div className="d-flex">
                    <a className="navbar-text me-3 text-white nav-link" href={'/profile/'+User}>Witaj, {user?.family_name || "Użytkownik"}!</a>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
