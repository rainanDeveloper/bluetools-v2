const moment = require("moment")

module.exports = {
	cpfMask: (unmaskedCpf)=>{
		const onlyNumbers = unmaskedCpf.replace(/\D/g, '')
		if((onlyNumbers.length<=11)){
			return onlyNumbers
			.replace(/^(\d{3})(\d{1,3})$/g, '$1.$2')
			.replace(/^(\d{3})(\d{3})(\d{1,3})$/g, '$1.$2.$3')
			.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/g, '$1.$2.$3-$4')
		}
		else{
			return onlyNumbers
		}
	},
	phoneMask: (phone)=>{
		const onlyNumbers = phone.replace(/\D/g, '')
		if(onlyNumbers.length<=11){
			return onlyNumbers
			.replace(/^(\d{2})(\d{1,4})$/g, '($1) $2')
			.replace(/^(\d{2})(\d{4})(\d{1,4})$/g, '($1) $2-$3')
			.replace(/^(\d{2})(\d{5})(\d{4})$/g, '($1) $2-$3')

		}
		else{
			return onlyNumbers
		}
	},
	cepMask: (cep)=>{
		const onlyNumbers = cep.replace(/\D/g, '')

		if(onlyNumbers.length<=8){
			return onlyNumbers
			.replace(/^(\d{5})(\d{1,3})$/g, '$1-$2')
		}
		else{
			return onlyNumbers
		}
	},
	dateMask: (date)=>{
		const onlyNumbers = date.replace(/\D/g, '')

		return moment(onlyNumbers, 'YYYYMMDD').format('DD/MM/YYYY')
	}
}