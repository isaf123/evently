'use client'
import React from 'react'
import { IoSearch } from 'react-icons/io5'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'


const SearchTransactionEO = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = (term: string) => {
        // console.log(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <div className="relative flex flex-1">
            <input
                type='text'
                placeholder='Search a Transaction...'
                className='w-full border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm'
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
            />
            <IoSearch className='absolute left-3 top-2 h-5 w-5 text-gray-500' />
        </div>
    )
}

export default SearchTransactionEO