let formLogin = document.querySelector('#wpforms-form-518');
if(formLogin) {
    let fieldsetBox = document.createElement('fieldset');
    let legend = document.createElement('legend');
    let forgotPasswordLink = document.querySelector('#wpforms-518-field_3-container');

    legend.innerText = 'LogIn';

    fieldsetBox.append(legend);
    fieldsetBox.append(...formLogin.children);
    formLogin.append(fieldsetBox);
    fieldsetBox.append(forgotPasswordLink);

}