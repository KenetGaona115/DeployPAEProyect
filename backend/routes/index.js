const express = require('express');
const router = express.Router();
const Joi = require('joi');
const database = require('../Database/databaseAPI')

//all response 
//Retorna una llamada exitosa
const jsonAllFine = {
  'status': 200
}

//Error de base de datos
const jsonError = {
  'status': 500
}

//Error usuario creado
const jsonErrorUsuarioCreado = {
  'status': 406
}


router.get('/getAllProducts', async function (req, res, next) {
  const products = await database.getAllProducts()
  res.send(products);
})

router.get('/getAllUsers', async function (req, res, next) {
  const users = await database.getAllUsers()
  res.send(users);
})

router.get('/getAllSales', async function (req, res, next) {
  const sales = await database.getallFactSales()
  res.send(sales);
})

router.get('/', function (req, res, next) {
  console.log('connected')
  res.render('index');
});

//Post para iniciar sesion
router.post('/login', async function (req, res, next) {
  const user = req.body;
  const response = await database.getUserByEmail(user.email);
  if (response != null) {
    if (user.email == response.email && user.password == response.password)
      res.send(jsonAllFine)
  }
  res.send(jsonError)
})

//Post para regresar los datos del usuario
router.post('/getUser', async function (req, res, next) {
  user = await database.getUserByEmail(req.body.email)
  res.send(user)
})

//Eliminar usuario por email
router.post('/deleteUser', async function (req, res, next) {
  try {
    const user = await database.deleteUserByEmail(req.body.email)
    console.log(user.deletedCount)
    res.send(jsonAllFine)
  } catch (err) {
    console.log(err)
    res.send(jsonError)
  }
})

//Actualizar usuario
router.post('/updateUser', async function (req, res, next) {
  try {
    await database.UpdateUserByEmail(req.body)
    res.send(jsonAllFine)
  } catch (error) {
    console.log(error)
    res.send(jsonError)
  }
})

//Crear producto
router.post('/createProduct', async function (req, res, next) {
  try {
    database.createProduct(req.body)
    res.send(jsonAllFine)
  } catch (error) {
    console.log(error)
    res.send(jsonError)
  }
})

//Eliminar producto
router.post('/deleteProduct', async function (req, res, next) {
  try {
    database.deleteProductByName(req.body.name)
    res.send(jsonAllFine)
  } catch (error) {
    console.log(error)
    re.send(jsonError)
  }
})

//Actulizar producto
router.post('/updateProduct', async function (req, res, next) {
  let product = {}
  product.name = req.body.name
  product.price = req.body.price
  product.description = req.body.description
  product.amount = req.body.amount
  product.image = req.body.image
  product.category = req.body.category

  console.log(product)
  try {
    database.UpdateProductByName(product)
    res.send(jsonAllFine)
  } catch (error) {
    console.log(error)
    re.send(jsonError)
  }
})

//Post para crear la compra en el FactsSales
router.post('/doShop', async function ( req, res, next) {
  try {
    database.createFact(req.body)
    console.log(req.body)
    res.send(jsonAllFine)
  } catch (error) {
    console.log(error)
    res.send(jsonError)
  } 
})

//Post para crear usuario
router.post('/', async function (req, res, next) {
  const user = req.body;
  if (await database.getUserByEmail(user.email) == null) {
    try {
      console.log(user)
      database.createUser(user)
      res.send(jsonAllFine)
    } catch (err) {
      console.log(err)
      res.send(jsonError)
    }
  } else {
    res.send(jsonErrorUsuarioCreado)
  }

})






module.exports = router;