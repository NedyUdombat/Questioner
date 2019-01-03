import dummyMeetup from '../dummyModel/dummyMeetups';


class Validator {

	constructor(){
		this.errors =[];

	}
	validate (value, rules){
		 
		this.errors = [];
		  
	  this.validateRules(value, rules)
		 
		return this.errors.length === 0 ? true : this.errors;
	}

	validateRules (value, rules){
		let self = this;
		for(let key in value) {
		 	if(value.hasOwnProperty(key)){

		 		let rule = rules.split('|');	 

			 	for (let i = 0; i < rule.length; i++) {
			 	
			 	self[rule[i]](value[key], key);

				}
		 	}
		} 
	}

	string(value, key){
		if (typeof value !== 'string' ) {
			this.errors.push({error: `This field:${key} must be a string`})
		}
		return  
	}

  required(value, key){
  	if (value === '' || value === null || typeof value === 'undefined' ) {
  		this.errors.push({error: `This field:${key} cannot be empty`})
  	}
  	return  
  }

  integer(value, key){
		if (typeof value !== 'number' ) {
			this.errors.push({error: `This field:${key} must be a number`})
		}
		return  
	}

	notDuplicate(value,key){
		// if (value )
	}


}

export default (new Validator());