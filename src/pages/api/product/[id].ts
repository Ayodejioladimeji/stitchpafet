import connectDB from '../../../utils/connectDB'
import Products from '../../../../models/productModel'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res)
            break;
        case "PUT":
            await updateProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query;

        const product = await Products.findById(id)
        if (!product) return res.status(400).json({ err: 'This product does not exist.' })

        res.json({ product })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        // if(result.role !== 'admin') 
        // return res.status(400).json({err: 'Authentication is not valid.'})

        const { id } = req.query
        const { name, amount, old_amount, category, description, discount, product_colors, images } = req.body

        if (!name || !amount || !old_amount || !category || !description || !discount || category === '---' || images.length === 0 || product_colors.length === 0)
            return res.status(400).json({ err: 'Please add all the fields.' })


        await Products.findOneAndUpdate({ _id: id }, {
            name: name.toLowerCase(), amount, old_amount, category, description, discount, images, colors: product_colors
        })

        res.json({ msg: 'Success! Updated a product' })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        // if (result.role !== 'admin')
        //     return res.status(400).json({ err: 'Authentication is not valid.' })

        const { id } = req.query

        await Products.findByIdAndDelete(id)
        res.json({ msg: 'Deleted a product.' })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}