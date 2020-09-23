const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register'); 
const signin = require('./Controllers/signin');
const image = require('./Controllers/image');
const profile = require('./Controllers/profile')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'dbSTAR',
        database: 'smartbrain'
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('request received')
})
/* ---------------------------------------------------------------------------------------- */

app.post('/signin', (req, res) => {signin.handleSignIn(req,res,db,bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)}) 
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req,res,db)})
app.put('/image', (req, res) => {image.handleImagePut(req,res,db)})
app.post('/imageUrl', (req, res) => {image.handleImageUrl(req,res,db)})

/* ---------------------------------------------------------------------------------------- */
app.listen(3000, () => {
    console.log('App started at PORT');
});
