//Thêm ds sản phẩm
router.get("/", async(req, res) => {
    const result = await ddb.send(
        new ScanCommand({ TableName: "Products" })
    );
    res.render("index", { products: result.Items });
});

//Thêm sản phẩm
router.post("/add", upload.single("image"), async(req, res) => {
    const imageUrl = await uploadImage(req.file);

    await ddb.send(new PutCommand({
        TableName: "Products",
        Item: {
            productId: uuidv4(),
            name: req.body.name,
            price: Number(req.body.price),
            description: req.body.description,
            imageUrl,
            createdAt: new Date().toISOString()
        }
    }));

    res.redirect("/");
});

//Sửa sản phẩm
router.post("/edit/:id", async(req, res) => {
    await ddb.send(new UpdateCommand({
        TableName: "Products",
        Key: { productId: req.params.id },
        UpdateExpression: "set #n=:n, price=:p, description=:d",
        ExpressionAttributeNames: { "#n": "name" },
        ExpressionAttributeValues: {
            ":n": req.body.name,
            ":p": Number(req.body.price),
            ":d": req.body.description
        }
    }));

    res.redirect("/");
});

//Xóa Sản phẩm
router.post("/delete/:id", async(req, res) => {
    await ddb.send(new DeleteCommand({
        TableName: "Products",
        Key: { productId: req.params.id }
    }));

    res.redirect("/");
});