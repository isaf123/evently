'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDENAV_ITEMS } from '@/constant';
import { SideNavItem } from '@/types';
import { Icon } from '@iconify/react';
import { motion, useCycle } from 'framer-motion';
import ProfileEO from '../ProfileEO/profile';
import UserDropdown from './UserDropdown';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks';
import { setLogoutAction } from '@/lib/features/userSlice';

type MenuItemWithSubMenuProps = {
    item: SideNavItem;
    toggleOpen: () => void;
};

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(0px at 100% 0)',
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const HeaderMobile = () => {
    const pathname = usePathname();
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    const [isOpen, toggleOpen] = useCycle(false, true);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(setLogoutAction())
    }

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            custom={height}
            className={`fixed inset-0 z-50 w-full md:hidden ${isOpen ? '' : 'pointer-events-none'
                }`}
            ref={containerRef}
        >
            <motion.div
                className="absolute inset-0 right-0 w-full bg-white"
                variants={sidebar}
            />

            <motion.ul
                variants={variants}
                className="absolute grid w-full gap-4 px-10 py-16 max-h-screen overflow-y-auto"
            >
                <div className="flex flex-col">
                    {/* Tambahkan user dropdown di sini */}
                    <MenuItem>
                        <button
                            onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                            className="flex w-full items-center text-2xl"
                        >
                            <ProfileEO /> {/* Assuming this is the user profile component */}
                            <Icon icon="lucide:chevron-down" className={`${isUserDropdownOpen && 'rotate-180'} absolute top-auto right-[40px] z-30`} width="24" height="24" />
                        </button>
                    </MenuItem>
                    {isUserDropdownOpen && (
                        <div className="mt-[20px] ml-2 flex flex-col space-y-2 items-center">
                            <MenuItem>
                                <Button onClick={() => {
                                    toggleOpen();
                                    handleLogout()
                                }} className='text-2xl w-full'>Logout</Button>
                            </MenuItem>
                        </div>
                    )}
                </div>
                {SIDENAV_ITEMS.map((item, idx) => {
                    const isLastItem = idx === SIDENAV_ITEMS.length - 1; // Check if it's the last item

                    return (
                        <div key={idx}>
                            {item.submenu ? (
                                <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
                            ) : (
                                <MenuItem>
                                    <Link
                                        href={item.path}
                                        onClick={() => toggleOpen()}
                                        className={`flex w-full text-2xl ${item.path === pathname ? 'font-bold' : ''
                                            }`}
                                    >
                                        {item.title}
                                    </Link>
                                </MenuItem>
                            )}

                            {!isLastItem && (
                                <MenuItem className="my-3 h-px w-full bg-gray-300" />
                            )}
                        </div>
                    );
                })}
                <div className="flex flex-col">
                    <MenuToggle toggle={toggleOpen} />
                </div>
            </motion.ul>
        </motion.nav>
    );
};

export default HeaderMobile;

const MenuToggle = ({ toggle }: { toggle: any }) => (
    <button
        onClick={toggle}
        className="pointer-events-auto absolute right-4 top-[14px] z-30"
    >
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                }}
            />
        </svg>
    </button>
);

const Path = (props: any) => (
    <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

const MenuItem = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <motion.li variants={MenuItemVariants} className={className}>
            {children}
        </motion.li>
    );
};

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
    item,
    toggleOpen,
}) => {
    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    return (
        <>
            <MenuItem>
                <button
                    className="flex w-full text-2xl"
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                >
                    <div className="flex flex-row justify-between w-full items-center">
                        <span
                            className={`${pathname.includes(item.path) ? 'font-bold' : ''}`}
                        >
                            {item.title}
                        </span>
                        <div className={`${subMenuOpen && 'rotate-180'}`}>
                            <Icon icon="lucide:chevron-down" width="24" height="24" />
                        </div>
                    </div>
                </button>
            </MenuItem>
            <div className="mt-2 ml-2 flex flex-col space-y-2">
                {subMenuOpen && (
                    <>
                        {item.subMenuItems?.map((subItem, subIdx) => {
                            return (
                                <MenuItem key={subIdx}>
                                    <Link
                                        href={subItem.path}
                                        onClick={() => toggleOpen()}
                                        className={` ${subItem.path === pathname ? 'font-bold' : ''
                                            }`}
                                    >
                                        {subItem.title}
                                    </Link>
                                </MenuItem>
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
};

const MenuItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
            duration: 0.02,
        },
    },
};

const variants = {
    open: {
        transition: { staggerChildren: 0.02, delayChildren: 0.15 },
    },
    closed: {
        transition: { staggerChildren: 0.01, staggerDirection: -1 },
    },
};

const useDimensions = (ref: any) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth;
            dimensions.current.height = ref.current.offsetHeight;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);

    return dimensions.current;
};