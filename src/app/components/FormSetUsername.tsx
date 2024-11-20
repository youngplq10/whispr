"use client"

import React, { useState } from 'react';
import { setUsername } from '../server/actions'; // Ensure this is correctly imported
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const FormSetUsername = () => {
    const { user } = useKindeBrowserClient();
    
    const [username, setUsernameState] = useState(''); // Local state to track input

    const handleSetUsername = async () => {
        if (!username.trim()) {
            alert("Username cannot be empty!"); // Simple validation
            return;
        }
        try {
            await setUsername(username, user?.id || "f typescript"); // Call the action with the username
            alert("Username set successfully!");
        } catch (error) {
            console.error("Error setting username:", error);
            alert("Failed to set username. Please try again.");
        }
    };

    return (
        <>
            <div className='container-fluid pt-5 mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-8 col-md-6 col-xl-4 justify-content-center'>
                        <label htmlFor='formsetusername' className='form-label'>Set username</label> <br/>
                        <input 
                            type='text' 
                            id='formsetusername' 
                            className='form-control' 
                            value={username}
                            onChange={(e) => setUsernameState(e.target.value)} // Update state on input change
                        /> 
                        <br/>
                        <button 
                            className='btn btn-primary py-1 px-5' 
                            onClick={handleSetUsername} // Call handler on click
                        >
                            Set
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormSetUsername;
