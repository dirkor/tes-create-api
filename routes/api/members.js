const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require ('../../Members.js');

//Get All member
router.get('/', (req, res) => {
    res.json(members);
});

//Get satu member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: `Tidak ada member dengan id ${req.params.id}`});
    }
});

//Create member. Ujicoba POST, UPDATE dan DELETE dengan postman belum membuat data tersimpan permanen karena penyimpanan belum menggunakan Database Management System
router.post('/', (req, res) => {

    //Skema data post request dari client
    const newMember = {
        id: uuid.v4(),
        name: req.body.email,
        email: req.body.email,
        status: 'active'
    }

    //Memeriksa apakah request menyertakan data nama atau email, jika memenuhi kondisi bahwa tidak ada data nama atau email maka berikan pesan error kode http 400
    if(!newMember.name || !newMember.email){
        res.status(400).json({ msg: 'Harap menyertakan data nama dan email'});
    }

    //Memasukkan data baru dari client sesuai skema newMember
    members.push(newMember);
    res.json(members);
});

//Update member. 
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({ msg: 'Member updated', member });
            }
        });
    }else{
        res.status(400).json({msg: `Tidak ada member dengan id ${req.params.id}`});
    }
});


// Delete member. 
router.delete('/:id', function(req, res){
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({ msg: 'Member deleted ', members: members.filter(member => member.id === parseInt(req.params.id))
        });
    }else{
        res.status(400).json({msg: `Tidak ada member dengan id ${req.params.id}`});
    }
});

module.exports = router;