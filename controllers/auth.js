const {response} = require('express');

const bcrypt = require('bcryptjs');

//importando el modelo de usuario
const Usuario = require('../models/Usuario');
const { generarToken } = require('../helpers/jwt');

//ERR_HTTP_HEADERS_SENT, ERROR POR REGRESAR MAS DE UNA VEZ UN JSON

const crearUsuario = async(req,res = response)=>{
       const {email, password} = req.body;
    try {

        let usuario = await Usuario.findOne({email: email});

        if(usuario){
            res.status(400).json({
                ok: false,
                msg: 'Correo electronico duplicado, un usuario cuenta con este correo'
            })
        }
         //Nueva instacia de usuario
        usuario = new Usuario(req.body);

         //Encriptado la contraseña
        const salt = bcrypt.genSaltSync(); //por defecto tiene dies vueltas de seguridad
        usuario.password = bcrypt.hashSync(password, salt);

        //guardando en base de datos
        await usuario.save()

        //Generando JWT
        const token = await generarToken(usuario.id, usuario.name);

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}   
   


const loginUsuario = async(req, res= response) =>{
    const {email, password} = req.body

    try {
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun usuario con este correo electronico'
            })
        }

        //confirmas las contraseñas
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        };

        const token = await generarToken(usuario.id, usuario.nombre);

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
    }

}


const revalidarToken = async(req, res = response) => {
    const {uid, name} = req;
    

    //Generar nuevo Token
    const token = await generarToken(uid,name)
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}