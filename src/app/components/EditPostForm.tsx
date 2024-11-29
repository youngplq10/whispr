"use client"

import React, { useEffect, useState } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { getPostData, updatePost } from '@/app/server/actions'
import Loading from '@/app/components/Loading'
import { redirect, useSearchParams } from 'next/navigation'

const EditPostForm = () => {
    const search = useSearchParams()
    const postId: string = search.get("postid") || "f postid"
    
    if (postId === "new-post-id") redirect("/profile")

    const { user } = useKindeBrowserClient()

    const [postContent, setPostContent] = useState('')
    const [postUserId, setPostUserId] = useState('')
    const [loadingPostData, setLoadingPostData] = useState(true)

    useEffect(() => {
        if (!user?.id) return

        const getPostDataFE = async () => {
            const { PostData } = await getPostData(postId || "")
            setPostContent(PostData?.content || "")
            setPostUserId(PostData?.userId || "")
            setLoadingPostData(false)
        }

        getPostDataFE()
    }, [user])

    const handleEditPost = async () => {
        if (postContent.length <= 0) {
            alert("Content can't be null") 
            return
        }
        try{
            await updatePost(postId, postContent)
        }
        catch{
            throw "f updatepost"
        }
    }

    

    if (loadingPostData) return <Loading />

    if (user?.id !== postUserId) redirect("/dashboard")

    return(
        <>
            <div className='container-fluid'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="Content_input" className="form-label">Content</label>
                            <input type="text" className="form-control" id="Content_input" value={postContent} onChange={(e) => setPostContent(e.target.value)}  />
                            <button className='btn btn-primary mt-2' onClick={handleEditPost}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPostForm