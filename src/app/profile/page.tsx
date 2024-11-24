import React from 'react'
import Navbar from '../components/Navbar'
import ProfileInfo from '../components/ProfileInfo'
import PostsOwnProfile from '../components/PostsOwnProfile'

const page = () => {
    return(
        <>
            <Navbar />
            <ProfileInfo />
            <PostsOwnProfile />
        </>
    )
}

export default page