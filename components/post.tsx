'use client'
import Link from 'next/link';
import React from 'react'

type PostDTO = {
    posts: string[]; 
    loading: boolean;
}

const Post = ({ posts, loading }: PostDTO) => {

    if (loading) {
        return (
            <h1>Loading.....</h1>
        )
    }
    return (
        <>
            {posts.map((data, index) => (
                <div className='list' key={index}>

                    <Link href={`/art/${data}`} >{data}</Link>
                </div>
            ))}
        </>
    )
}

export default Post