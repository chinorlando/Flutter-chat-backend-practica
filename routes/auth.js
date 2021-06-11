const {Router}  = require('express'); 
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Ingrese un email válido').isEmail(),
    // check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener por lo menos 5 caracteres.').isLength(5),
    validarCampos
], crearUsuario);

router.post('/',[
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña debe tener por lo menos 5 caracteres.').isLength(5),
    validarCampos
], login);

router.get('/', validarJWT, renewToken);

module.exports = router;