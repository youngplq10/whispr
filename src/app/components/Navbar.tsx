"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Whisprlogo from "@/app/assets/whisprlogo.png";
import Whisprlogosmall from "@/app/assets/whisprlogosmall.png";
import Loading from '@/app/components/Loading';
import { getUserData } from '@/app/server/actions';

interface User {
    id: string,
    username: string,
    isUsernameSet: boolean,
    kindeId: string,
    email: string,
    firstName: string,
    lastName: string,
    bio: string,
    createdAt: Date,
    followers: number,
    following: number,
    posts: number,
    profilepic: String,
}

const Navbar = () => {
    const { user } = useKindeBrowserClient();
    const [logoSrc, setLogoSrc] = useState(Whisprlogo);
    
    const [User, setUser] = useState<User>();
    const [loadingUser, setLoadingUser] = useState(true);

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
        if (!user?.id) return;
    
        const getUserDataFE = async () => {
            try {
                const { User } = await getUserData(user.id);
                setUser(User);
                setLoadingUser(false);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
    
        getUserDataFE();
    }, [user]);

    if(loadingUser) return <Loading />;

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3">
                <div className="d-flex flex-grow-1"></div>
                
                <div className="navbar-center">
                    <a className="navbar-brand" href="/dashboard">
                        <Image 
                            src={logoSrc}
                            alt="Whispr"
                            width={125}
                            height={50}
                        />
                    </a>
                </div>

                <div className="d-flex">
                    <a className="navbar-text me-3 text-white nav-link" href={'/profile/'}>Hello, {User?.username || "Użytkownik"}!</a>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
