/**
 * Clipboard Manager
 * Handles copy-to-clipboard functionality with user feedback
 */

let copyTimeout = null;

/**
 * Copies text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} - Success status
 */
async function copyToClipboard(text) {
    if (!text || typeof text !== 'string') {
        return false;
    }

    try {
        // Use modern Clipboard API if available
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            textArea.style.pointerEvents = 'none';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return successful;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    } catch (err) {
        console.error('Failed to copy text:', err);
        return false;
    }
}

/**
 * Shows copy feedback UI
 * @param {HTMLElement} button - The copy button element
 */
function showCopyFeedback(button) {
    const copyIcon = button.querySelector('#copy-icon');
    const checkIcon = button.querySelector('#check-icon');
    
    if (!copyIcon || !checkIcon) {
        return;
    }

    // Show check icon
    copyIcon.classList.add('hidden');
    checkIcon.classList.remove('hidden');

    // Clear any existing timeout
    if (copyTimeout) {
        clearTimeout(copyTimeout);
    }

    // Reset to copy icon after 2 seconds
    copyTimeout = setTimeout(() => {
        copyIcon.classList.remove('hidden');
        checkIcon.classList.add('hidden');
    }, 2000);
}

// Expose functions to global scope
window.copyToClipboard = copyToClipboard;
window.showCopyFeedback = showCopyFeedback;