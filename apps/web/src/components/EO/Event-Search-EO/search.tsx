'use client'
import { Input } from '@/components/ui/input'
import { IoSearch } from 'react-icons/io5'
import React from 'react'

const SearchEventEO = () => {
    return (
        <div className='relative flex flex-1'>
            <Input type='text' placeholder='Search an Event...' className='w-full border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm' />
            <IoSearch className='absolute left-3 top-2 h-5 w-5 text-gray-500' />
        </div >
    )
}

export default SearchEventEO