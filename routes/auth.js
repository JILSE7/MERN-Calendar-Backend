const router =require('express').Router();
const {check} = require('express-validator')

const { 
    crearUsuario,
    loginUsuario,
    revalidarToken
} = require('../controllers/auth')

 //Middlewares
 //validarCampos
 const {validarCampos} = require('../middlewares/validar-campos');
 //ValidarJWT
 const {validarjwt} = require('../middlewares/validar-jwt')


router.post(
        '/new',
    [//midleware check
     check('name', 'El nombre es obligatorio').not().isEmpty(),
     check('email', 'Email es oblogatorio').isEmail(),
     check('password', 'Password debe de ser de 6 caracteres').isLength({min: 6}),
     validarCampos
    ] ,
        crearUsuario )

router.post('/',[
    check('email', 'Email no puede estar vacio').not().isEmpty(),
    check('email', 'Ingrese un email valido').isEmail(),
    check('password', 'La contraseña no puede estar vacia').not().isEmpty(),
    check('password', 'La contraseña debe de ser de almenos 6 caracteres').isLength({min:6}),
    validarCampos
], loginUsuario)

router.get('/renew',validarjwt,revalidarToken)


//exportacion por defecto del router
module.exports = router;