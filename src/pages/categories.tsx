import Layout from '@/dashboard/common/Layout'
import { GetRequest, PostRequest } from '@/utils/request'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface Props {

}

const categories = (props: Props) => {
    const [categories, setCategories] = useState(null)
    const { token } = useSelector((state: any) => state.auth)
    const [loading, setLoading] = useState(true)
    const [buttonloading, setButtonloading] = useState(true)
    const [name, setName] = useState("")

    // get categories
    useEffect(() => {
        if (token) {
            const getCategories = async () => {
                const res = await GetRequest("/categories")
                if (res?.status === 200) {
                    console.log(res.data)
                }
                setLoading(false)
            }
            getCategories()
        }
    }, [token])

    // create category
    const handleCreate = async (e) => {
        e.preventDefault()

        setButtonloading(true)
        console.log(token)

        const payload = {
            name: name.toLowerCase()
        }

        const res = await PostRequest("/categories", payload, token)
        if (res?.status === 200) {
            setCategories(res.data)
        }
        setButtonloading(false)
    }

    // 
    return (
        <Layout>
            <div className="dashboard-container">
                <h1>Categories</h1>
                <form onSubmit={handleCreate} className="form-box">
                    <input type="text" placeholder='Enter new category' value={name} onChange={(e) => setName(e.target.value)} />
                </form>

                <div className="category-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody style={{ border: "0" }}>
                            {categories?.map((item: any, index: number) => {

                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>  Delete
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                        {categories?.length === 0 && <p>No categories found</p>}
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default categories
