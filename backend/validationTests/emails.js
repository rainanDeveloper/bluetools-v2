const validationController = require('../controllers/validationController')

var validEmails = [
    'jesus.rainan@gmail.com',
    'aa@123.com',
    'pocahontas.native@lostinthewoods.lsd',
    'pdeves@walmarttonlines.com',
    '2suelbragaq@jembott.com',
    'firstname-lastname@example.com',
    'email@123.123.123.123',
    'email@[123.123.123.123]'
]

var invalidEmails = [
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'あいうえお@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@111.222.333.44444',
    'email@example..com',
    'Abc..123@example.com',
    'firstname-lastname@example.'
]

validEmails.forEach((email)=>{
    if(!validationController.emailValidation(email)){
        console.error(`Erro: email ${email} é válido mas não foi validado!`)
    }
})

invalidEmails.forEach((email)=>{
    if(validationController.emailValidation(email)){
        console.error(`Erro: email ${email} é inválido mas foi validado!`)
    }
})