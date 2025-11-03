/**
 * Random Word Generator
 * Generates random words for quick testing
 * All words are validated to meet 8-24 alphabetic character requirements
 */

// Use scoped constants to avoid conflicts with validator.js
(function() {
    'use strict';
    
    // Define constants in local scope
    const MIN_LENGTH = 8;
    const MAX_LENGTH = 24;
    const ALPHABET_REGEX = /^[a-zA-Z]+$/;

const RANDOM_WORDS = [
    'password', 'security', 'encryption', 'protector', 'guardian',
    'defender', 'safeguard', 'fortress', 'watchdog', 'sentinel',
    'champion', 'adventure', 'explorer', 'discover', 'treasure',
    'challenge', 'strength', 'knowledge', 'intellect', 'mountain',
    'lightning', 'sunshine', 'evergreen', 'guardrail', 'baseline',
    'database', 'firewall', 'software', 'hardware', 'protocol',
    'generate', 'resource', 'password', 'security', 'firewall',
    'database', 'software', 'hardware', 'adventure', 'treasure'
];

// Filter to only include valid words (8-24 chars, alphabet-only) and remove duplicates
const VALID_RANDOM_WORDS = [...new Set(
    RANDOM_WORDS.filter(word => {
        const trimmed = word.trim();
        return trimmed.length >= MIN_LENGTH && 
               trimmed.length <= MAX_LENGTH && 
               ALPHABET_REGEX.test(trimmed);
    })
)];

/**
 * Validates a word meets the requirements
 * @param {string} word - The word to validate
 * @returns {boolean} - True if valid
 */
function isValidRandomWord(word) {
    if (!word || typeof word !== 'string') {
        return false;
    }
    
    const trimmed = word.trim();
    return trimmed.length >= MIN_LENGTH && 
           trimmed.length <= MAX_LENGTH && 
           ALPHABET_REGEX.test(trimmed);
}

/**
 * Generates a random word from the validated word list
 * @param {number} retryCount - Internal counter to prevent infinite recursion
 * @returns {string} - A validated random word (8-24 alphabetic characters)
 */
function generateRandomWord(retryCount = 0) {
    const MAX_RETRIES = 10;
    
    // Ensure we have valid words in the array
    if (VALID_RANDOM_WORDS.length === 0) {
        console.error('No valid random words available');
        return 'password'; // Fallback to a known valid word
    }
    
    const randomIndex = Math.floor(Math.random() * VALID_RANDOM_WORDS.length);
    const selectedWord = VALID_RANDOM_WORDS[randomIndex];
    
    // Double-check validation before returning
    if (!isValidRandomWord(selectedWord)) {
        if (retryCount >= MAX_RETRIES) {
            console.error('Max retries reached, returning fallback word');
            return 'password'; // Fallback after max retries
        }
        console.warn('Generated word failed validation, re-rolling...');
        // Re-roll by recursively calling with retry counter
        return generateRandomWord(retryCount + 1);
    }
    
    return selectedWord;
}

// Expose generateRandomWord to global scope
window.generateRandomWord = generateRandomWord;

})(); // End IIFE