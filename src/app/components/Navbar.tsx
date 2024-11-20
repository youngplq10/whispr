"use client"

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Whisprlogo from "../assets/whisprlogo.png"
import Whisprlogosmall from "../assets/whisprlogosmall.png"

const Navbar = () => {
    const { user } = useKindeBrowserClient();
    const [logoSrc, setLogoSrc] = useState(Whisprlogo);

    // Update logo source based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setLogoSrc(Whisprlogosmall);
            } else {
                setLogoSrc(Whisprlogo);
            }
        };

        // Initial check and event listener for window resize
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log(user?.id)

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
                    <span className="navbar-text me-3 text-white">
                        Witaj, {user?.family_name || "Użytkownik"}!
                    </span>
                    <LogoutLink>logout</LogoutLink>
                </div>
            </nav>
        </>
    );
}

export default Navbar