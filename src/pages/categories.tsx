import CustomTable from '@/common/customTable'
import Layout from '@/dashboard/common/Layout'
import { DeleteRequest, GetRequest, PostRequest } from '@/utils/request'
import cogoToast from 'cogo-toast'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@/common/loading'
import ConfirmModal from '@/dashboard/common/modal/confirm-modal'
import { GLOBALTYPES } from '@/redux/actions/globalTypes'

interface Props {

}

const Categories = (props: Props) => {
    const [category, setCategory] = useState(null)
    const { token } = useSelector((state: any) => state.auth)
    const { callback } = useSelector((state: any) => state.utils)
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [confirm, setConfirm] = useState(false)
    const [buttonloading, setButtonloading] = useState(false)
    const [id, setId] = useState(null)
    const dispatch = useDispatch()


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
    }, [token, callback])

    // create category
    const handleCreate = async (e) => {
        e.preventDefault()

        const payload = {
            name: name.toLowerCase()
        }

        const res = await PostRequest("/categories", payload, token)
        if (res?.status === 200) {
            cogoToast.success(res.data.msg)
            dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback })
        }
    }


    // handlesubmit
    const handleSubmit = async () => {
        setButtonloading(true)

        const res = await DeleteRequest(`/categories/${id}`, token)
        if (res?.status === 200) {
            cogoToast.success(res.data.msg)
            setConfirm(false)
            dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback })
        }
        setButtonloading(false)
    }

    // 
    return (
        <Layout>
            <div className="dashboard-container">
                <div className="top">
                    <h1>All Categories</h1>
                    <button>Add category</button>

                </div>

                <div className="category-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        {loading ? <CustomTable row={3} col={3} /> :

                            <tbody style={{ border: "0" }}>
                                {category?.map((item: any, index: number) => {

                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item?.name}</td>
                                            <td className="delete" onClick={() => { setConfirm(true), setId(item._id) }}>  Delete
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        }


                    </table>
                    {category?.length === 0 && <p className="mt-5 text-center">No categories found</p>}
                </div>
            </div>

            {confirm && <ConfirmModal confirm={confirm} setConfirm={setConfirm} buttonloading={buttonloading} handleSubmit={handleSubmit} />}
        </Layout>
    )
}

export default Categories
