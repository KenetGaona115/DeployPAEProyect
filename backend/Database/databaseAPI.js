/* connect to MongoDB*/
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string  
const PASSWORD = "root"
const url = `mongodb+srv://root:${PASSWORD}@cluster0.ju1yy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const dbName = "Proyecto_PAE";
const collectionName = "Usuarios"
client.connect();

function getAllUsers() {
    return client.db(dbName).collection(collectionName).find({}).toArray();
}

function createUser(user) {
    const User = {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address
    };
    client.db(dbName).collection(collectionName).insertOne(User)
    //getAllUsers();
}

async function getUserByEmail(email) {

    let user = await client.db(dbName).collection(collectionName).findOne(
        { email: `${email}` }
    );
    //console.log('Resultado de busqueda')
    //console.log(user)
    return user
}

async function deleteUserByEmail(email) {
    const user = await client.db(dbName).collection(collectionName).deleteOne({ email: `${email}` })
    return user
}

async function UpdateUserByEmail(user) {
    const res = await client.db(dbName).collection(collectionName).replaceOne({ email: `${user.email}` }, user)
    console.log(res.upsert)
}

// Functions to products

const collectionProduct = "Products"

function getAllProducts() {
    return client.db(dbName).collection(collectionProduct).find({}).toArray();
}

async function getProductByName(name) {

    let product = await client.db(dbName).collection(collectionProduct).findOne(
        { name: `${name}` }
    );

    console.log(product)
    return product
}

async function deleteProductByName(name) {
    const product = await client.db(dbName).collection(collectionProduct).deleteOne(
        { name: `${name}` }
    );
    return product
}

async function UpdateProductByName(product) {
    const res = await client.db(dbName).collection(collectionProduct).replaceOne({ name: `${product.name}` }, product);
    console.log(res.upsert)
}

function createProduct(product) {
    client.db(dbName).collection(collectionProduct).insertOne(product)
}


// Functions to FactsSales

const collectionFactsSales = "FactsSales"

function createFact(sale) {
    client.db(dbName).collection(collectionFactsSales).insertOne({sale})
}

function getallFactSales() {
    return client.db(dbName).collection(collectionFactsSales).find({}).toArray();
}


module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    getUserByEmail: getUserByEmail,
    deleteUserByEmail: deleteUserByEmail,
    getAllProducts: getAllProducts,
    getProductByName: getProductByName,
    deleteProductByName: deleteProductByName,
    createProduct: createProduct,
    UpdateUserByEmail: UpdateUserByEmail,
    UpdateProductByName:UpdateProductByName,
    createFact: createFact,
    getallFactSales: getallFactSales,
}