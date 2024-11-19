"use client"

import React from 'react'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

const LoginRegisterUI = () => {
    return(
        <>
            <LoginLink>Login</LoginLink>
            <RegisterLink>Register</RegisterLink>
        </>
    )
}

export default LoginRegisterUI