window.addEventListener('scroll', function() {
    let navbar = document.getElementById('navbar');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
    if (scrollTop > 100) { // Cambia este valor para ajustar el punto en el que se vuelve transparente
      navbar.classList.add('transparent');
    } else {
      navbar.classList.remove('transparent');
    }
});

/**agregar el active */
let navbarItems = document.querySelectorAll('.navbar-nav li a');
navbarItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Remover la clase "active" de todos los elementos
      navbarItems.forEach(function(item) {
        item.classList.remove('active');
      });
  
      // Agregar la clase "active" al elemento seleccionado
      item.classList.add('active');

        let target = document.querySelector(item.getAttribute('href'));
        target.scrollIntoView({
        behavior: 'smooth'
        });
    });
  });

  /** nabvar menu */
  function toggleMenu() {
    let navbarMenu = document.getElementById("navbarMenu");
    navbarMenu.classList.toggle("open");
  }

  document.addEventListener('click', function(event) {
    var navbarCollapse = document.querySelector('.navbar-collapse');
    var navbarToggle = document.querySelector('.navbar-toggle');
    
    if (!navbarCollapse.contains(event.target) && event.target !== navbarToggle) {
      navbarCollapse.classList.remove('open');
    }
  });


/**button scroll up */
window.addEventListener('scroll', function() {
  let scrollButton = document.querySelector('.scroll-up');
  if (window.scrollY > 300) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
});

document.querySelector('.scroll-up').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/**dark mode */
let toggleDarkModeButton = document.getElementById('toggleDarkMode');
let body = document.body;
let switchText = document.getElementById('switch-text');

const DARK_MODE_LABELS = {
  es: { toLight: 'Modo light', toDark: 'Modo dark' },
  en: { toLight: 'Light mode', toDark: 'Dark mode' }
};

function updateDarkModeLabel() {
  let labels = DARK_MODE_LABELS[currentLang];
  switchText.innerHTML = toggleDarkModeButton.checked ? labels.toLight : labels.toDark;
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.toggle('dark-mode');
  toggleDarkModeButton.checked = true;
} else {
  toggleDarkModeButton.checked = false;
}
toggleDarkModeButton.addEventListener('change', function() {
  body.classList.toggle('dark-mode');
  updateDarkModeLabel();
});

/**language toggle */
let toggleLangButton = document.getElementById('toggleLang');
let langText = document.getElementById('lang-text');
let currentLang = localStorage.getItem('lang') || 'es';

let translatableEls = document.querySelectorAll('[data-en]');
translatableEls.forEach(function(el) {
  el.dataset.es = el.textContent;
});

let placeholderEls = document.querySelectorAll('[data-en-placeholder]');
placeholderEls.forEach(function(el) {
  el.dataset.esPlaceholder = el.getAttribute('placeholder');
});

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  translatableEls.forEach(function(el) {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.es;
  });

  placeholderEls.forEach(function(el) {
    el.setAttribute('placeholder', lang === 'en' ? el.dataset.enPlaceholder : el.dataset.esPlaceholder);
  });

  langText.innerHTML = lang === 'en' ? 'ES' : 'EN';
  toggleLangButton.checked = lang === 'en';
  updateDarkModeLabel();
}

applyLanguage(currentLang);

toggleLangButton.addEventListener('change', function() {
  let next = toggleLangButton.checked ? 'en' : 'es';
  applyLanguage(next);
  localStorage.setItem('lang', next);
});

/**validacion de formulario */

const FORM_MESSAGES = {
  es: {
    allRequired: 'Todos los campos son requeridos.',
    nameLength: 'El nombre debe tener minimo 2 y maximo 30 caracteres.',
    nameSpecialChars: 'El nombre no debe contener caracteres especiales.',
    invalidEmail: 'El correo electrónico no es válido.',
    messageTooLong: 'La descripción debe ser menor a 250 caracteres',
    attention: '¡Atención!',
    success: 'Correcto!',
    successMsg: 'El correo se envio correctamente'
  },
  en: {
    allRequired: 'All fields are required.',
    nameLength: 'Name must be between 2 and 30 characters.',
    nameSpecialChars: 'Name must not contain special characters.',
    invalidEmail: 'Please enter a valid email address.',
    messageTooLong: 'The message must be under 250 characters',
    attention: 'Heads up!',
    success: 'Success!',
    successMsg: 'Your message was sent successfully'
  }
};

document.addEventListener('DOMContentLoaded', function() {
  let form = document.getElementById('contact-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    let minLength = 2;
    let maxLength = 30;
    let maxLengthMessage = 250;
    let correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    // Aquí puedes acceder a los elementos del formulario y realizar las acciones necesarias, como validaciones o envío de datos al servidor

    // Ejemplo de acceso a los elementos del formulario
    let nameInput = form.elements['name'];
    let emailInput = form.elements['email'];
    let messageInput = form.elements['message'];
    let name = nameInput.value;
    let email = emailInput.value;
    let message = messageInput.value;
    email = email.trim();

    /**validaciones */
    let msgs = FORM_MESSAGES[currentLang];

    if(name == "" || email == "" || message == ""){
      mostrarError(msgs.allRequired);
      return false;
    }
    if(name < minLength || name >maxLength){
      mostrarError(msgs.nameLength);
      return false;
    }else if(specialCharsRegex.test(name)){
      mostrarError(msgs.nameSpecialChars);
      return false;
    }

    if (!correoRegex.test(email)) {
      mostrarError(msgs.invalidEmail);
      return false;
    }

    if(message > maxLengthMessage){
      mostrarError(msgs.messageTooLong);
      return false;
    }

    emailjs.sendForm('service_v7v56yb', 'template_e8hahyd', "#contact-form", '4SEvjyy1v7aJnSu6T')
    .then(function(response) {
      swal(FORM_MESSAGES[currentLang].success, FORM_MESSAGES[currentLang].successMsg, "success");
    }, function(error) {
       console.log('FAILED...', error);
    });
  });
});

function mostrarError(mensaje) {
  swal(FORM_MESSAGES[currentLang].attention, mensaje, "info");
}