import connectDB from '../../../utils/connectDB'
import Products from '../../../../models/productModel'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await createProduct(req, res)
            break;
    }
}

class APIfeatures {
    query: any;
    queryString: any;

    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };

        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(el => delete queryObj[el]);

        if (queryObj.category && queryObj.category !== 'all') {
            this.query = this.query.find({ category: queryObj.category });
        }
        if (queryObj.title && queryObj.title !== 'all') {
            this.query = this.query.find({ title: { $regex: queryObj.title, $options: 'i' } });
        }

        this.query = this.query.find(queryObj);
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    paginating() {
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 6;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}


const getProducts = async (req, res) => {
    try {
        const features = new APIfeatures(Products.find(), req.query)
            .filtering().sorting().paginating()

        const products = await features.query

        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        // if (result.role !== 'admin') return res.status(400).json({ err: 'Authentication is not valid.' })

        const { name, amount, category, description, discount, product_colors, images } = req.body

        if (!name || !amount || !category || !description || !discount || category === '---' || images.length === 0 || product_colors.length === 0)
            return res.status(400).json({ err: 'Please add all the fields.' })


        const newProduct = new Products({
            name: name.toLowerCase(), amount, category, description, discount, images, colors: product_colors
        })

        await newProduct.save()

        res.json({ msg: 'Success! Created a new product' })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}