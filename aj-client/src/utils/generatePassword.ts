export default function generatePassword(length = 8) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    
    const allChars = lowercaseChars + uppercaseChars + numbers + symbols;
  
    // Ensure at least one character from each type
    let password = '';
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
  
    // Fill the rest of the password length with random characters
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
  
    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
  
    return password;
  }
  
  