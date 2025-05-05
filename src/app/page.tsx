'use client'
import Image from "next/image";
import Pagination from "../../components/pagination";
import { useEffect, useState } from "react";
import Post from "../../components/post";

type DataDTO = {
  total: number;
  objectIDs: string[];
}

export default function Home() {
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const limit = 100;
  let newData: string[] = []

  function getNumberOfObjects(arr: string[], num: number) {
    return arr.slice(0, num)
  }

  useEffect(() => {
    setLoading(true)
    async function getPosts() {
      const res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
      const data: DataDTO = await res.json();

      // grab only the first 100 objectIDs
      newData = getNumberOfObjects(data.objectIDs, limit)

      setPosts(newData);
      setLoading(false)
    }
    getPosts()
    
  }, [])

  
  
   // Pagination variables
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // split posts per page
 
   const updatePageNumber = (pageNumber: number) => {
     setCurrentPage(pageNumber);
   }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Post posts={currentPosts} loading={loading} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Pagination length={posts.length} postsPerPage={postsPerPage} handlePagination={updatePageNumber} currentPage={currentPage} />
      </footer>
    </div>
  );
}
