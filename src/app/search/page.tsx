"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type userType = {
  _id: string,
  userName: string,

}

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<userType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) return;

    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/searchUsers', { query });
      setResults(res.data.users);
      console.log(res.data.users);
      
    } catch (err) {
      console.error("Search error:", err);
    } finally {
        setLoading(false)
    }
  };

  return (
   <div className='p-2 pt-20 bg-zinc-950'>
     <div className="relative h-screen text-zinc-200 w-full bg-zinc-950 max-w-md">
      <div className='flex'>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300"
      />
      <div className='h-10 w-10 flex justify-center items-center'>
      { loading ? (<Loader2/>) : ("") }
      </div>
      </div>

        {query.length > 1 && (
        <ul className="absolute w-full mt-2 bg-zinc-950 z-10 border rounded-lg shadow">
            {results.length > 0 ? (
            results.map((user: userType) => (
                <li
                key={user._id}
                className="p-2 hover:bg-gray-100 text-white cursor-pointer"
                onClick={() => router.push(`/profile/${user.userName}`)}
                >
                @{user.userName}
                </li>
            ))
            ) : (
            <li className="p-2 text-gray-400">No user found with &quot;{query}&quot;</li>
            )}
        </ul>
        )}

    </div>
   </div>
  );
};

export default SearchBar;
