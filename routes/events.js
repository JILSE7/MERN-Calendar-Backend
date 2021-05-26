//Importando el router de express
const router = require('express').Router();
//Validacion del JWT
const {validarjwt} = require('../middlewares/validar-jwt');
//validar campos
const {validarCampos} = require('../middlewares/validar-campos')
//check middleware
const {check} = require('express-validator');

//
const { isDate } = require('../helpers/isDate');
//Importando controllers
const {
    getEventos,
    addEvento,
    updateEvento,
    deleteEvento
} = require('../controllers/eventos');

router.use(validarjwt)

//Obtener eventos
router.get('/',getEventos);

//agregar un Evento
router.post('/',[
    check('title', 'El titulo no puede ir vacio').notEmpty(),
    check('start','La fecha de inicio es obligatoria').custom(isDate),
    check('end','La fecha de fin es obligatoria').custom(isDate),
    validarCampos
],addEvento);

//actualizar Evento
router.put('/:id',updateEvento);

//Borrar Evento
router.delete('/:id' ,deleteEvento);

module.exports = router;