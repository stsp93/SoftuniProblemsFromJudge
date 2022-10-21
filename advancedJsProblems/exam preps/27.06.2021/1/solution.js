window.addEventListener('load', solution);

function solution() {
  const fullNameIn = document.querySelector('#fname');
  const emailIn = document.querySelector('#email');
  const phoneIn = document.querySelector('#phone');
  const addressIn = document.querySelector('#address');
  const postalIn = document.querySelector('#code');
  const submitBtn = document.querySelector('#submitBTN');

  const infoPreviewUl = document.querySelector('#infoPreview');
  const editBtn = document.querySelector('#editBTN');
  const continueBtn = document.querySelector('#continueBTN');
  const blockDiv = document.querySelector('#block');



  function submit(e) {
    e.preventDefault();
    const name = fullNameIn.value;
    const email = emailIn.value;
    const phone = phoneIn.value;
    const address = addressIn.value;
    const postal = postalIn.value;

    if (name === '' || email === '') return;

    const nameLi = document.createElement('li');
    nameLi.textContent = 'Full Name: ' + name
    const emailLi = document.createElement('li')
    emailLi.textContent = 'Email: ' + email
    const phoneLi = document.createElement('li')
    phoneLi.textContent = 'Phone Number: ' + phone
    const addressLi = document.createElement('li')
    addressLi.textContent = 'Address: ' + address;
    const postalLi = document.createElement('li')
    postalLi.textContent = 'Postal Code: ' + postal;

    infoPreviewUl.appendChild(nameLi);
    infoPreviewUl.appendChild(emailLi);
    infoPreviewUl.appendChild(phoneLi);
    infoPreviewUl.appendChild(addressLi);
    infoPreviewUl.appendChild(postalLi);

    fullNameIn.value = '';
    emailIn.value = '';
    phoneIn.value = '';
    addressIn.value = '';
    postalIn.value = '';

    submitBtn.disabled = true;
    editBtn.disabled = false;
    continueBtn.disabled = false;

    editBtn.addEventListener('click', function (e) {
      e.preventDefault();
      fullNameIn.value = name;
      emailIn.value = email;
      phoneIn.value = phone;
      addressIn.value = address;
      postalIn.value = postal;

      submitBtn.disabled = false;
      editBtn.disabled = true;
      continueBtn.disabled = true;

      Array.from(infoPreviewUl.children).forEach(el => el.remove())
    })


    continueBtn.addEventListener('click', function (e) {
      e.preventDefault();

      blockDiv.innerHTML = '<h3>Thank you for your reservation!</h3>'
    })
  }



  submitBtn.addEventListener('click', submit)
}
