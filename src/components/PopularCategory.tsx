import React, { useEffect, useState } from 'react'
import Heading from './heading/Heading'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { GetRequest } from '@/utils/request'
import CardSkeleton from '@/dashboard/common/skeleton/CardSkeleton'

interface Props {

}

const PopularCategory = (props: Props) => {
    const [category, setCategory] = useState(null)
    const { token } = useSelector((state: any) => state?.auth)
    const [loading, setLoading] = useState(true)


    // get categories
    useEffect(() => {
        if (token) {
            const getCategories = async () => {
                const res = await GetRequest("/categories")
                if (res?.status === 200) {
                    setCategory(res.data.categories)
                }
                setLoading(false)
            }
            getCategories()
        }
    }, [token])

    return (
        <div className="popular-category">
            <div className="container">
                <h1>Popular Category</h1>

                <div className="category-container">
                    {loading ? <CardSkeleton length={5} /> : <>
                        {category?.slice(0, 5)?.map((item, key) => {
                            return <div className="category-card" key={key}>
                                <div className="category-image">
                                    <Image src="/images/one.jpeg" alt="" width={100} height={100} unoptimized />
                                </div>

                                <h4>{item.name}</h4>
                            </div>
                        })}</>}

                </div>
            </div>
        </div>
    )
}

export default PopularCategory
