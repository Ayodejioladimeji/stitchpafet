import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    path: string;
    children: any
}

const NavLink = (props: Props) => {
    const router = useRouter()
    // 
    return (
        <Link href={props.path} className={`menu-item ${router?.asPath === props?.path ? "active" : ""}`}>
            {props.children}
        </Link>
    )
}

export default NavLink
