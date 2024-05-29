import Layout from '@/dashboard/common/Layout'
import React from 'react'

interface Props {

}

const categories = (props: Props) => {
    return (
        <Layout>
            <div className="create-categories">
                <h1>Categories</h1>
                <div className="form-box">
                    <input type="text" placeholder='Enter new category' />
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

                        <tbody style={{ border: "0" }}>
                            {/* {filteredData?.map((item, index) => {
                                const {
                                    _id,
                                    buyersname,
                                    selleremail,
                                    status,
                                    total,
                                    createdat,
                                    verifibizcharge,
                                } = item;
                                return ( */}
                            <tr>
                                <td>1</td>
                                <td>Category name</td>
                                <td>  Delete
                                </td>
                            </tr>
                            {/* );
                            })} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default categories
