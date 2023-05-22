<<<<<<< HEAD
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('./appcredentials.json')

initializeApp({
    credential: cert(serviceAccount)
})

const dbInstance = getFirestore()

module.exports = { db: dbInstance }
=======
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('./appcredentials.json')

initializeApp({
    credential: cert(serviceAccount)
})

const dbInstance = getFirestore()

module.exports = { db: dbInstance }
>>>>>>> 1669432b3355532f3a660ef8a80642d08c5c3a9e
