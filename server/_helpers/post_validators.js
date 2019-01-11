
class Validator {
  constructor() {
    this.errors = [];
    this.hasErrors = false;
  }

  validate(value, rules) {
    this.validateRules(value, rules);

    // return this.errors.length === 0 ? true : this.errors;
  }

  validateRules(value, rules) {
    const self = this;
    for (const key in value) {
		 	if (value.hasOwnProperty(key)) {
		 		const rule = rules.split('|');

			 	for (let i = 0; i < rule.length; i++) {
			 	self[rule[i]](value[key], key);
        }
		 	}
    }
  }

  string(value, key) {
    if (typeof value !== 'string') {
      this.hasErrors = true;
      this.errors.push({ error: `This field:${key} must be a string` });
    }
  }

  required(value, key) {
    if (value === '' || value === null || typeof value === 'undefined') {
      this.hasErrors = true;
      this.errors.push({ error: `This field:${key} cannot be empty` });
    }
  }

  getErrors() {
    return this.errors;
  }
}

export default Validator;
