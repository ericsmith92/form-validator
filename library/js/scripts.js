function pageLoaded(){

    const form = document.forms[0];
    const formFields = document.querySelectorAll('.required');
    const errorFields = [...document.querySelectorAll('.error')];


    const formToJSON = elements => {
        const formData = {};
        const formElements = [...elements];

        formElements.forEach(input => {
            formData[input.name] = [input.value, input.classList.contains("required") ? true : false];
        });

        return formData;
     }

    const checkIfEmpty = value => value === '';

    const checkRegex = (inputType, value)=> {
        const phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(inputType === 'phone'){
            return phoneRegEx.test(value);
        }

        if(inputType === 'email'){
            return emailRegEx.test(value);
        }
    }

   function validateInputs(data){
    const errors = [];

    errorFields.forEach(field => {
        field.textContent = '';
    });

    for(const key in data){
        const [value, required] = data[key];
        if(key !== '' && required){
                switch(key){
                    case 'first_name':
                        if(checkIfEmpty(value)){
                            errors.push(key);
                        }
                        break;
                    case 'last_name':
                        if(checkIfEmpty(value)){
                            errors.push(key);
                        }
                        break;  
                    case 'phone':
                        if(!checkRegex('phone', value)){
                            errors.push(key);
                        }
                        break;
                    case 'email':
                        if(!checkRegex('email', value)){
                            errors.push(key);
                        }
                        break;
                    default:
                        alert('Something went wrong, please fill out the form again.');
                    }
                }
        }

        return errors;
   }

 function checkInput(){
        if(checkIfEmpty(this.value)){
           this.nextSibling.nextSibling.textContent = 'Error, field required';
        }else if(this.name === 'phone'){
            if(!checkRegex('phone', this.value)){
                this.nextSibling.nextSibling.textContent = 'Error, invalid phone';
            }else{
                this.nextSibling.nextSibling.textContent = '';
            }
        }else if(this.name === 'email'){
            if(!checkRegex('email', this.value)){
                this.nextSibling.nextSibling.textContent = 'Error, invalid email';
            }else{
                this.nextSibling.nextSibling.textContent = '';
            }
        }else{
            this.nextSibling.nextSibling.textContent = '';
        }
   }
      
    const validateForm = e => {
        e.preventDefault();
        
        const data = formToJSON(form.elements);
        const errors = validateInputs(data);
        
        if(errors.length){
            errors.forEach(error => {
                for(let i = 0; i < errorFields.length; i++){
                    if(errorFields[i].classList.contains(error)){
                        errorFields[i].textContent = 'Error, field required';
                    }
                }
            });
        }else{
            form.submit();
        }
    }
    
    formFields.forEach(field => field.addEventListener('focusout', checkInput));
    form.addEventListener('submit', validateForm);
}

window.onload = pageLoaded;

