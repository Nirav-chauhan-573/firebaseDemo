const express = require('express')
const router = new express.Router()

const admin = require('firebase-admin');
const credentials = require('../keys.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});
const db = admin.firestore();

// to create student document 
router.post('/create', async (req, res) => {
  try {
    const responce = await db.collection('student').add(req.body)
    res.send(responce)
  } catch (error) {
    res.send(error)
  }
})

// to get all students data 
router.get('/getStudent', async (req, res) => {
  try {
    const userRef = db.collection('student')
    const responce = await userRef.get()
    let studentArray = []
    responce.forEach(doc => {
      studentArray.push(doc.data())
    })

    res.send(studentArray)
  } catch (error) {
    res.send(error)
  }
})

// to get one student data using student id
router.get('/getStudent/:id', async (req, res) => {
  try {
    const userRef = db.collection('student').doc(req.params.id)
    const responce = await userRef.get()
    res.send(responce.data())
  } catch (error) {
    res.send(error)
  }
})

// to update student data using student id
router.put('/update/:id', async (req, res) => {
  try {
    const responce = await db
      .collection('student')
      .doc(req.params.id)
      .update(req.body)
    res.send({ msg: 'Data Updated Sucessfully', responce })
  } catch (error) {
    res.send(error)
  }
})

//to delete student document 
router.put('/delete/:id', async (req, res) => {
  try {
    const responce = await db.collection('student').doc(req.params.id).delete()
    res.send(responce)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
