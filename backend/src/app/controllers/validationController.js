module.exports = {
    passwordIsValid(password){
        if(password.length<8){
            return false
        }

        if(!(/^[^ ]+$/g).test(password)){
            return false
        }
        
        return ((/\w/g).test(password)&&(/[^\w\s]/g).test(password))
    },
    emailValidation(email){
        return (
            (/^[\w\d.-]+@[\w\d.[\]]+$/g).test(email)&&
            !(/\.{2,}/g).test(email)&&
            !(/^\./g).test(email)&&
            !(/\.$/g).test(email)&&
            !(/\.@/g).test(email)&&
            (/@[[\w\d]+\.[\w\d]/g).test(email)&&
            (/\.[\w\d]{1,3}[\]]?$/g).test(email)
        )
    }
}