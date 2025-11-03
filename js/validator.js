/**
 * Input Validator
 * Validates user input according to app constraints
 */

// Wrap in IIFE to scope constants and avoid conflicts
(function() {
    'use strict';
    
    // Define constants in local scope
    const MIN_LENGTH = 8;
    const MAX_LENGTH = 24;
    const ALPHABET_REGEX = /^[a-zA-Z]+$/;

/**
 * Validates input word
 * @param {string} word - The word to validate
 * @returns {Object} - Validation result with isValid and errors
 */
function validateWord(word) {
    const result = {
        isValid: true,
        errors: {
            length: false,
            alphabet: false
        }
    };

    if (!word || typeof word !== 'string') {
        result.isValid = false;
        result.errors.length = true;
        result.errors.alphabet = true;
        return result;
    }

    const trimmedWord = word.trim();

    // Check length
    if (trimmedWord.length < MIN_LENGTH) {
        result.isValid = false;
        result.errors.length = true;
    }

    if (trimmedWord.length > MAX_LENGTH) {
        result.isValid = false;
        result.errors.length = true;
    }

    // Check alphabet only
    if (!ALPHABET_REGEX.test(trimmedWord)) {
        result.isValid = false;
        result.errors.alphabet = true;
    }

    return result;
}

// Expose validateWord to global scope
window.validateWord = validateWord;

})(); // End IIFE