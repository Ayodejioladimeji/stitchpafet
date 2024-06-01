import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    path: string;
    children: any
    slug?: boolean
}

const NavLink = (props: Props) => {
    const router = useRouter()
    console.log(router)
    // 
    return (
        <Link href={props.path} className={`menu-item ${router?.asPath.includes(props?.path) ? "active" : ""
            }`}>
            {props.children}
        </Link>
    )
}

export default NavLink
