function pageLoaded(){

    const form = document.forms[0];

    const formToJSON = elements => {
        const formData = {};
        const formElements = [...elements];

        formElements.forEach(input => {
            formData[input.name] = [input.value, input.classList.contains("required") ? true : false];
        });

        return formData;
     }

    const checkIfEmpty = value => {
        return value === '';
    }
      
    const validateForm = e => {
        e.preventDefault();
    
        const data = formToJSON(form.elements);
        const phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const errors = [];
        const errorFields = [...document.querySelectorAll('.error')];

        errorFields.forEach(field => {
            field.textContent = '';
        });
        
        for(const key in data){
            if(key !== '' && data[key][1]){
                switch(key){
                    case 'first_name':
                        if(checkIfEmpty(data[key][0])){
                            errors.push(key);
                        }
                        break;
                    case 'last_name':
                        if(checkIfEmpty(data[key][0])){
                            errors.push(key);
                        }
                        break;  
                    case 'phone':
                        if(!phoneRegEx.test(data[key][0])){
                            errors.push(key);
                        }
                        break;
                    case 'email':
                        if(!emailRegEx.test(data[key][0])){
                            errors.push(key);
                        }
                        break;
                    default:
                        alert('Something went wrong, please fill out the form again.');
                }
            }
        }

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
    
    form.addEventListener('submit', validateForm);
}

window.onload = pageLoaded;

