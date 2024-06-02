const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET,
});

const UploadCtrl = {
    uploadImage: async (req, res) => {
        try {
            const file = req?.files?.files;

            if (!file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            //   validate images
            if (file?.size > 3024 * 3024) {
                removeTmp(file?.tempFilePath);
                return res.status(400).json({ msg: "Size too large" });
            }

            if (file?.mimetype !== "image/jpeg" && file?.mimetype !== "image/png") {
                removeTmp(file?.tempFilePath);
                return res.status(400).json({ msg: "File format is incorrect." });
            }

            //    Save image
            cloudinary.v2.uploader.upload(
                file?.tempFilePath,
                {
                    folder: "products",
                    //   width: 150,
                    //   height: 150,
                    crop: "fill",
                },
                async (err, result) => {
                    if (err) throw err;

                    removeTmp(file.tempFilePath);

                    const data = {
                        public_id: result.public_id,
                        format: result.format,
                        url: result.secure_url,
                        filename: result.original_filename,
                    };

                    res.json(data);
                }
            );
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // Delete images
    deleteImage: async (req, res) => {
        const { public_id } = req.body;

        if (!public_id) return res.status(400).json({ msg: "No image selected" });

        await cloudinary.uploader.destroy(public_id);
        res.json({ msg: "Image Deleted" });
    },
};
//

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

module.exports = UploadCtrl;
