import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

const Header = () => {
    return (
        <header className='w-full border-b fixed bg-white'>
            <div className='wrapper flex items-center justify-between'>
                <Link href='/' className='w-36'>
                    <Image src={'/assets/images/logo.svg'} width={138} height={38}
                        alt='GoEvent Logo' />
                </Link>

                {/* lets create our nav items that would be showing when the user
                is signed in
                */}
                <SignedIn>
                    <nav className='md:flex-between hidden w-full max-w-xs'>
                        <NavItems />
                    </nav>
                </SignedIn>

                <div className='flex w-32 justify-end gap-3'>
                    <SignedIn>
                        <UserButton afterSignOutUrl='/' />
                        <MobileNav />
                    </SignedIn>

                    <SignedOut> {/*this means that this element  (login button) would show only when user is signed out*/}
                        <SignInButton>
                            <Button>Login</Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header