'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SideBarLinks } from "@/constants/forms"

const LeftBarLinks = () => {
    const LinkDetails = SideBarLinks
    const pathname = usePathname()
    return (
        <ul className="nav-menu">
            {LinkDetails.map((details) => (
                <li
                    key={details.title}
                    className={`nav-item ${pathname === details.link ? "active" : ""}`}
                >
                    <Link href={details.link}>{details.title}</Link>
                </li>
            ))}
        </ul>
    )
}

export default LeftBarLinks