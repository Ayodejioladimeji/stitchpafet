import connectDB from '../../../utils/connectDB'
import Categories from '../../../../models/categoriesModel'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await createCategory(req, res)
            break;
        case "GET":
            await getCategories(req, res)
            break;
    }
}

const createCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        // if (result.role !== 'admin')
        //     return res.status(400).json({ err: "Authentication is not valid." })

        const { name, image } = req.body
        if (!name || !image) return res.status(400).json({ err: "Field can not be left blank." })

        const check = await Categories.findOne({ name })

        if (check) return res.status(400).json({ err: "Category already exists" })

        const newCategory = new Categories({ name, image })

        await newCategory.save()
        res.json({
            msg: 'Success! Created a new category.',
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find().sort('-updatedAt')

        res.json({ categories })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}