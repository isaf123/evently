'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProfileEO from '../ProfileEO/profile';
import { Icon } from '@iconify/react';

const UserDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center p-2">
                <ProfileEO />
                <Icon icon="mdi:chevron-down" width="24" height="24" className={`${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-md"
                >
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Settings
                    </Link>
                    <Link href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Logout
                    </Link>
                </motion.div>
            )}
        </div>
    );
};

export default UserDropdown;
