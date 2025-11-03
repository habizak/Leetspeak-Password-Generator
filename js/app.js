/**
 * Main Application Controller
 * Coordinates UI events and module interactions
 */

// Debug utility functions - use stubs for file:// protocol compatibility
// Full debug functionality available when served via HTTP with ?debug=1
let debug, dumpDebug, clearDebugLogs;
if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
    // File protocol - use simple console logging
    const DEBUG = false; // Debug mode not available with file://
    debug = DEBUG ? (label, data) => console.log(`🟡 ${label}`, data ?? '') : () => {};
    dumpDebug = () => console.warn('Debug mode requires HTTP server');
    clearDebugLogs = () => {};
} else {
    // HTTP/HTTPS - try to load debug module
    // This will work when served via HTTP server
    const DEBUG = location.search.includes('debug=1');
    debug = DEBUG ? (label, data) => console.log(`🟡 ${label}`, data ?? '') : () => {};
    dumpDebug = () => console.warn('Use ?debug=1 in URL for full debug mode');
    clearDebugLogs = () => {};
}

// DOM Elements
let wordInput, convertBtn, randomBtn, backBtn, toggleVisibilityBtn, copyBtn;
let inputState, outputState, inputFooter, outputFooter;
let validationMessages, lengthValidation, alphaValidation;
let outputText;

// Application State
let currentWord = '';
let currentLeetWord = '';
let isPasswordVisible = true;

/**
 * Initialize the application
 */
function init() {
    debug('Initializing application');
    
    // Get DOM elements
    wordInput = document.getElementById('word-input');
    convertBtn = document.getElementById('convert-btn');
    randomBtn = document.getElementById('random-btn');
    backBtn = document.getElementById('back-btn');
    toggleVisibilityBtn = document.getElementById('toggle-visibility-btn');
    copyBtn = document.getElementById('copy-btn');

    inputState = document.getElementById('input-state');
    outputState = document.getElementById('output-state');
    inputFooter = document.getElementById('input-footer');
    outputFooter = document.getElementById('output-footer');

    validationMessages = document.getElementById('validation-messages');
    lengthValidation = document.getElementById('length-validation');
    alphaValidation = document.getElementById('alpha-validation');

    outputText = document.getElementById('output-text');

    // Attach event listeners
    wordInput.addEventListener('input', handleInput);
    wordInput.addEventListener('keypress', handleKeyPress);
    convertBtn.addEventListener('click', handleConvert);
    
    // Verify random button and function availability
    if (!randomBtn) {
        debug('ERROR: Random button not found in DOM');
        console.error('Random button element not found');
    } else {
        // Check both global and window scope for the function
        const generateFn = typeof generateRandomWord !== 'undefined' ? generateRandomWord : 
                           (typeof window !== 'undefined' && window.generateRandomWord) ? window.generateRandomWord : 
                           null;
        
        if (!generateFn || typeof generateFn !== 'function') {
            debug('ERROR: generateRandomWord function not available', { 
                randomBtn: randomBtn,
                global: typeof generateRandomWord,
                window: typeof window !== 'undefined' ? typeof window.generateRandomWord : 'window undefined'
            });
            console.error('generateRandomWord is not a function. Check if generator.js loaded correctly.');
        } else {
            debug('Random button and function available', { 
                button: randomBtn,
                function: typeof generateFn,
                source: typeof generateRandomWord !== 'undefined' ? 'global' : 'window'
            });
            randomBtn.addEventListener('click', handleRandom);
        }
    }
    
    backBtn.addEventListener('click', handleBack);
    toggleVisibilityBtn.addEventListener('click', handleToggleVisibility);
    copyBtn.addEventListener('click', handleCopy);

    // Initial validation check
    updateValidationUI();
    
    debug('Application initialized', {
        randomBtn: !!randomBtn,
        generateRandomWord: typeof generateRandomWord !== 'undefined' ? typeof generateRandomWord : 
                           (typeof window !== 'undefined' ? typeof window.generateRandomWord : 'undefined'),
        validateWord: typeof validateWord !== 'undefined' ? typeof validateWord : 
                     (typeof window !== 'undefined' ? typeof window.validateWord : 'undefined')
    });
}

/**
 * Handles input changes
 */
function handleInput() {
    currentWord = wordInput.value.trim();
    updateValidationUI();
    updateConvertButton();
}

/**
 * Handles keypress events (Enter to convert)
 */
function handleKeyPress(e) {
    if (e.key === 'Enter' && !convertBtn.disabled) {
        handleConvert();
    }
}

/**
 * Updates validation UI based on current input
 */
function updateValidationUI() {
    const validation = validateWord(wordInput.value);
    
    // Show/hide validation messages
    if (wordInput.value.length === 0) {
        validationMessages.classList.add('hidden');
        lengthValidation.classList.add('hidden');
        alphaValidation.classList.add('hidden');
        return;
    }

    validationMessages.classList.remove('hidden');
    
    if (validation.errors.length) {
        lengthValidation.classList.remove('hidden');
    } else {
        lengthValidation.classList.add('hidden');
    }

    if (validation.errors.alphabet) {
        alphaValidation.classList.remove('hidden');
    } else {
        alphaValidation.classList.add('hidden');
    }
}

/**
 * Updates convert button disabled state
 */
function updateConvertButton() {
    const validation = validateWord(wordInput.value);
    convertBtn.disabled = !validation.isValid;
    
    if (convertBtn.disabled) {
        convertBtn.classList.add('disabled');
    } else {
        convertBtn.classList.remove('disabled');
    }
}

/**
 * Handles convert button click
 */
function handleConvert() {
    const validation = validateWord(wordInput.value);
    
    if (!validation.isValid) {
        return;
    }

    currentWord = wordInput.value.trim();
    currentLeetWord = convertToLeet(currentWord);
    isPasswordVisible = true;

    // Switch to output state
    showOutputState();
}

/**
 * Handles random word generation
 */
function handleRandom() {
    debug('Random button clicked');
    
    // Check both global scope and window object for function
    const generateFn = typeof generateRandomWord !== 'undefined' ? generateRandomWord : 
                       (typeof window !== 'undefined' && window.generateRandomWord) ? window.generateRandomWord : 
                       null;
    
    if (!generateFn || typeof generateFn !== 'function') {
        debug('ERROR: generateRandomWord is not available', { 
            global: typeof generateRandomWord,
            window: typeof window !== 'undefined' ? typeof window.generateRandomWord : 'window undefined'
        });
        console.error('generateRandomWord function not found. Make sure generator.js is loaded.');
        alert('Error: Random word generator not available. Please refresh the page.');
        return;
    }
    
    const randomWord = generateFn();
    debug('Generated random word', { word: randomWord, length: randomWord.length });
    
    if (!randomWord || randomWord.length === 0) {
        debug('ERROR: Empty random word generated');
        console.error('Failed to generate random word');
        return;
    }
    
    wordInput.value = randomWord;
    currentWord = randomWord;
    
    // Trigger input event to update validation
    wordInput.dispatchEvent(new Event('input'));
    debug('Input updated and validation triggered');
    
    // Focus on input
    wordInput.focus();
    wordInput.setSelectionRange(0, randomWord.length);
}

/**
 * Handles back button click
 */
function handleBack() {
    showInputState();
    wordInput.focus();
}

/**
 * Handles visibility toggle
 */
function handleToggleVisibility() {
    isPasswordVisible = !isPasswordVisible;
    updateOutputDisplay();
    updateVisibilityIcon();
}

/**
 * Updates the visibility icon based on state
 */
function updateVisibilityIcon() {
    const hideIcon = document.getElementById('hide-icon');
    const showIcon = document.getElementById('show-icon');
    
    if (isPasswordVisible) {
        hideIcon.classList.remove('hidden');
        showIcon.classList.add('hidden');
    } else {
        hideIcon.classList.add('hidden');
        showIcon.classList.remove('hidden');
    }
}

/**
 * Updates output display based on visibility state
 */
function updateOutputDisplay() {
    if (isPasswordVisible) {
        outputText.textContent = currentLeetWord;
    } else {
        outputText.textContent = '-'.repeat(currentLeetWord.length);
    }
}

/**
 * Handles copy button click
 */
async function handleCopy() {
    const success = await copyToClipboard(currentLeetWord);
    if (success) {
        showCopyFeedback(copyBtn);
    }
}

/**
 * Shows input state (home screen)
 */
function showInputState() {
    inputState.classList.remove('hidden');
    outputState.classList.add('hidden');
    inputFooter.classList.remove('hidden');
    outputFooter.classList.add('hidden');
}

/**
 * Shows output state (result screen)
 */
function showOutputState() {
    inputState.classList.add('hidden');
    outputState.classList.remove('hidden');
    inputFooter.classList.add('hidden');
    outputFooter.classList.remove('hidden');
    
    updateOutputDisplay();
    updateVisibilityIcon();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

