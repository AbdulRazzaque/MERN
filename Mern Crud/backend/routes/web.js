import express from 'express'

const router = express.Router()

import UserController from '../controllers/user.js'

router.get('/getAllDoc',UserController.getAllDoc)
router.post('/saveData',UserController.saveData)
router.post('/deleteDoc',UserController.deleteDoc)
router.post('/register',UserController.register)
router.get('/getUser/:id',UserController.getUser)

export default router