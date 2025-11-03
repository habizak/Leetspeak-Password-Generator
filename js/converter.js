/**
 * Leet Speak Converter
 * Handles conversion of alphabetic text to leet speak
 */

const LEET_MAP = {
    'a': ['@', '4'],
    'A': ['@', '4'],
    'e': ['3'],
    'E': ['3'],
    'i': ['!', '1'],
    'I': ['!', '1'],
    'o': ['0'],
    'O': ['0'],
    's': ['$', '5'],
    'S': ['$', '5'],
    't': ['7'],
    'T': ['7'],
    'l': ['1'],
    'L': ['1'],
    'g': ['9'],
    'G': ['9'],
    'b': ['8'],
    'B': ['8'],
    'z': ['2'],
    'Z': ['2']
};

/**
 * Converts a word to leet speak
 * @param {string} word - The input word to convert
 * @returns {string} - The leet speak version
 */
function convertToLeet(word) {
    if (!word || typeof word !== 'string') {
        return '';
    }

    let result = '';
    const wordLower = word.toLowerCase();
    
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const charLower = char.toLowerCase();
        
        if (LEET_MAP[char]) {
            // Use the first replacement option
            const replacements = LEET_MAP[char];
            result += replacements[0];
        } else if (LEET_MAP[charLower]) {
            // Preserve case preference but use leet mapping
            const replacements = LEET_MAP[charLower];
            result += replacements[0];
        } else {
            // No leet equivalent, keep original
            result += char;
        }
    }
    
    return result;
}

// Expose convertToLeet to global scope
window.convertToLeet = convertToLeet;