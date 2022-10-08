import React from 'react'
import Link from 'next/link'

export default function Logo()
{
    return (
        <Link href="/" >
            <a className='logo__litter' style={{ color: "#fff" }}>
                M
            </a>
        </Link>
    )
}