
// yha express ko require kiya gya
const express = require('express');
const app = express(); // yha express ka obeject banaya gya h
const port = 3001; // yha kis port pr hamara server run karega ye btaya gya h

const mongoose = require('mongoose'); // yha ham mongoose ko require kar rhe hai.

const Contact = require('./models/contacts.models'); // here import contact schema

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/contacts-crud')
.then(() => console.log("Database Connected."))

//---------------- Middleware ---------------------
app.set('view engine', 'ejs');  //set view engine for ejs tempalte
app.use(express.urlencoded({extended: false})) // this is for form data
app.use(express.static('public'))  // set public folder for access static file like css , javascript , image, vedio , audio 

//----------------Routes ---------------------------

// home route
app.get('/', async (req, res) => {
    const contacts = await Contact.find()
    //res.json(contacts)
    res.render("home", {contacts})
});

// show-contact route using get method
app.get('/show-contact/:id', async (req, res) => {
    // const contacts = await Contact.findOne({ _id: req.params.id }) //this is mongoDB method
     const contact = await Contact.findById( req.params.id ) //this is mongoose method

    //res.json(contacts)
    res.render("show-contact", {contact})
}); // ye route get method use kar rha h eska matlab ye add-contact page ko show karega

// add-contact route
app.get('/add-contact', (req, res) => {   
    res.render("add-contact")
})

// show-contact route using post method
// ye route post method ke liye use hoga jab data ko submit karenge
app.post('/add-contact', async (req, res) => {
    //res.send(req.body) // yha ham check kar 
    
    //--------- ye mongodb ka insertOne() method h ---------------
    // const contact = Contact.insertOne({
    //     first_name : req.body.first_name,
    //     last_name : req.body.last_name,
    //     email : req.body.email,
    //     phone : req.body.phone,
    //     address : req.body.address
    // })

    // **agar aap ki collection ki fields aur form ki field same hai to hame sari field likhna jaruri nhi hai.
    //--------- ye mongoose ka create() method h ---------------
    await Contact.create(req.body)
res.redirect("/") //yha value insert hone pr ham redirect home page pr ja rhe h
})

// update-contac route using get method
app.get('/update-contact/:id', async (req, res) => {
     const contact = await Contact.findById( req.params.id ) //this is mongoose method
    res.render("update-contact",{contact})
})

// update-contac route using post method
app.post('/update-contact/:id', async (req, res) => {
    //res.send(req.params.id)
    //res.send(req.body)

    //--------- ye mongoose ka findByIdAndUpdate() method h ---------------
    // agar form ka field aur database ke table ka field same h to ham direct id aur req.body likhate hai. 
    await Contact.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/")

    // manlo database aur form ke field same nhi hai tab ham kuch es prakar se data ko update karenge 
    //yah exk example hai actual form field nhi h. 
    // const {firstName, lastName, email, phone, address} = req.body // ab yha ek condition h ki aapko field ka name chhahe jo bhi 
    // series same hona chahiye ex. form se firstName aa rha database me Firstname to ye form aur database dono same variable possion hona chahiye ,field ka name same ho ya nhi
    
    //await Contact.findByIdAndUpdate(req.params.id, {firstName, lastName, email, phone, address})
    
})

// delete-contact route
app.get('/delete-contact/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id) // this is mongoose method
    res.redirect("/")
})

// yha pr server ko run kiya ha rha h
app.listen(port, () => {
console.log(`server is successfully running on ${port} port`);

})