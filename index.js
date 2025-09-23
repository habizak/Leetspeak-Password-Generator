const specials = ["!", "@", "$", "#"];

function toLeetSpeak(word) {
  return word
    .replace(/a/gi, "@")
    .replace(/e/gi, "3")
    .replace(/i/gi, "1")
    .replace(/o/gi, "0")
    .replace(/s/gi, "$")
    .replace(/t/gi, "7");
}

function convertToLeetPassword() {
  const input = document.getElementById("inputWord").value.trim();
  const errorMsg = document.getElementById("errorMessage");
  const output = document.getElementById("passwordOutput");
  const confirm = document.getElementById("copyConfirm");
  confirm.style.display = "none";
  errorMsg.style.display = "none";

  if (!input) return;

  const leetWord = toLeetSpeak(input);
  const special = specials[Math.floor(Math.random() * specials.length)];
  const number = Math.floor(Math.random() * 90 + 10); // 10–99

  const finalWord = leetWord.charAt(0).toUpperCase() + leetWord.slice(1);
  const password = finalWord + special + number;

  if (password.length < 8) {
    output.value = '';
    errorMsg.style.display = "block";
    return;
  }

  output.value = password;
}

function copyPassword() {
  const passwordField = document.getElementById("passwordOutput");
  passwordField.select();
  passwordField.setSelectionRange(0, 99999); // For mobile
  document.execCommand("copy");

  const confirm = document.getElementById("copyConfirm");
  confirm.style.display = "block";
  setTimeout(() => { confirm.style.display = "none"; }, 2000);
}

// Set up event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.getElementById('convertBtn');
  const copyBtn = document.getElementById('copyBtn');
  
  if (convertBtn) {
    convertBtn.addEventListener('click', convertToLeetPassword);
  }
  
  if (copyBtn) {
    copyBtn.addEventListener('click', copyPassword);
  }

  const toggleBtn = document.getElementById('toggleVisibilityBtn');
  const toggleIcon = document.getElementById('toggleIcon');
  const passwordOutput = document.getElementById('passwordOutput');

  if (toggleBtn && toggleIcon && passwordOutput) {
    toggleBtn.addEventListener('click', () => {
      if (passwordOutput.type === 'password') {
        passwordOutput.type = 'text';
        toggleIcon.textContent = '🙈'; // Eye closed
      } else {
        passwordOutput.type = 'password';
        toggleIcon.textContent = '👁️'; // Eye open
      }
    });
  }
});
