import React from 'react'
import Heading from './heading/Heading'
import Image from 'next/image'

interface Props {

}

const PopularCategory = (props: Props) => {
    return (
        <div className="popular-category">
            <div className="container">
                <h1>Popular Category</h1>

                <div className="category-container">
                    <div className="category-card">
                        <div className="category-image">
                            <Image src="/images/one.jpeg" alt="" width={100} height={100} />
                        </div>

                        <h4>Cotton Wool</h4>
                    </div>
                    <div className="category-card">
                        <div className="category-image">
                            <Image src="/images/two.jpeg" alt="" width={100} height={100} />
                        </div>

                        <h4>Cotton Wool</h4>
                    </div>
                    <div className="category-card">
                        <div className="category-image">
                            <Image src="/images/three.jpeg" alt="" width={100} height={100} />
                        </div>

                        <h4>Cotton Wool</h4>
                    </div>
                    <div className="category-card">
                        <div className="category-image">
                            <Image src="/images/four.jpeg" alt="" width={100} height={100} />
                        </div>

                        <h4>Cotton Wool</h4>
                    </div>
                    <div className="category-card">
                        <div className="category-image">
                            <Image src="/images/five.jpeg" alt="" width={100} height={100} />
                        </div>

                        <h4>Cotton Wool</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularCategory
