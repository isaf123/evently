'use client'
import { Input } from '@/components/ui/input'
import { IoSearch } from 'react-icons/io5'
import React from 'react'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const SearchEventEO = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term)
        } else {
            params.delete('query')
        }

        replace(`${pathname}?${params.toString()}`)
    }
    return (
        <div className='relative flex flex-1'>
            <Input type='text' placeholder='Search an Event...' className='w-full border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm' onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get("query")?.toString()} />
            <IoSearch className='absolute left-3 top-2 h-5 w-5 text-gray-500' />
        </div >
    )
}

export default SearchEventEO