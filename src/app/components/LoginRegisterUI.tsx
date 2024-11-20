"use client"

import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

const LoginRegisterUI = () => {

    return(
        <>
            <div className='loginregisterui container-fluid pt-5 mt-5'>
                <div className='row pt-5 mt-5'>
                    <p className='text-center display-1'>Whispr</p>
                </div>
                <div className='row pt-5'>
                    <LoginLink className='btn btn-primary col-6 col-xl-3 mx-auto'>Sign in</LoginLink>
                </div>
                <div className='row pt-3'>
                    <RegisterLink className='btn btn-success col-6 col-xl-3 mx-auto'>Sign up</RegisterLink>
                </div>
            </div>
        </>
    )
}

export default LoginRegisterUI