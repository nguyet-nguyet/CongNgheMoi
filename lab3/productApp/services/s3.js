const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const s3 = new S3Client({ region: "ap-southeast-1" });
const BUCKET = "product-images-yourname";

async function uploadImage(file) {
    const stream = fs.createReadStream(file.path);

    await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: file.filename,
        Body: stream,
        ContentType: file.mimetype
    }));

    return `https://${BUCKET}.s3.amazonaws.com/${file.filename}`;
}

async function deleteImage(key) {
    await s3.send(new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key
    }));
}

module.exports = { uploadImage, deleteImage };