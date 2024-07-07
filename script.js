const passwordOutput = document.getElementById('password');
const iconCopy = document.getElementById('copy-icon');
const copyMessage = document.getElementById('copy-message');
const myValue = document.getElementById('value');
const slider = document.getElementById('myRange');
const upperBox = document.getElementById('uppercase');
const lowerBox = document.getElementById('lowercase');
const numberBox = document.getElementById('numbers');
const symbolBox = document.getElementById('symbols');
const strengthText = document.querySelector('.strength-text');
const strengthBars = document.querySelectorAll('.bar');
const submitButton = document.getElementById('submit');

// Met à jour la valeur initiale affichée
myValue.textContent = slider.value;

// Ajoute un écouteur d'événement pour mettre à jour la valeur affichée lors des changements
slider.addEventListener('input', (e) => {
    myValue.textContent = e.target.value;
    
    let mouse = slider.value;
    let color = `linear-gradient(90deg, rgba(164, 255, 175) ${mouse*5}%, rgb(24, 23, 31) ${mouse*5}%)`;
    slider.style.background = color;
});


function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*(),.?":{}|<>';

    let characters = '';
    let password = '';

    if (uppercase) characters += upperLetters;
    if (lowercase) characters += lowerLetters;
    if (numbers) characters += numberChars;
    if (symbols) characters += symbolChars;

    for (let i = 0; i < length; i++) {
        const character = characters[Math.floor(Math.random() * characters.length)];
        password += character;
    }

    return password;
}

function updateStrength(password) {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    strengthBars.forEach((bar, index) => {
        if (index < strength) {
            bar.style.backgroundColor = getStrengthColor(strength);
        } else {
            bar.style.backgroundColor = 'transparent';
        }
    });

    switch (strength) {
        case 1:
            strengthText.textContent = 'TOO WEAK!';
            break;
        case 2:
            strengthText.textContent = 'WEAK';
            break;
        case 3:
            strengthText.textContent = 'MEDIUM';
            break;
        case 4:
            strengthText.textContent = 'STRONG';
            break;
        default:
            strengthText.textContent = '';
            break;
    }
}

function getStrengthColor(strength) {
    switch (strength) {
        case 1:
            return '#F64A4A'; // Red
        case 2:
            return '#FB7C58'; // Orange
        case 3:
            return '#F8CD65'; // Yellow
        case 4:
            return '#A4FFAF'; // Green
        default:
            return 'transparent';
    }
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const length = parseInt(slider.value, 10);
    const uppercase = upperBox.checked;
    const lowercase = lowerBox.checked;
    const numbers = numberBox.checked;
    const symbols = symbolBox.checked;

    if (!uppercase && !lowercase && !numbers && !symbols) {
        alert('Please select at least one character type!');
        return;
    } else if (length === 0) {
        alert('Password length cannot be zero!');
        return;
    }


    const password = generatePassword(length, uppercase, lowercase, numbers, symbols);
    passwordOutput.value = password;
    passwordOutput.spellcheck = false;   
    updateStrength(password);
});

iconCopy.addEventListener('click', () => {
    passwordOutput.select();
    document.execCommand('copy');
    copyMessage.style.display = 'inline';
    setTimeout(() => {
        copyMessage.style.display = 'none';
    }, 2000);
})




