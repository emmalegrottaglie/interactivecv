const lines = [
    "Emma Legrottaglie",
    "QA Engineer",
    "Playwright Tester",
    "MCP Server Integrations",
    "Technical Writer",
    "Lifelong Artist"
];

const typingSpeed = 50; // milliseconds per character
const delayBetweenLines = 800; // milliseconds between lines
const consoleContent = document.getElementById('consoleContent');
const cursor = document.getElementById('cursor');

async function typeText(text) {
    for (let char of text) {
        consoleContent.textContent += char;
        // Auto-scroll to bottom
        consoleContent.scrollTop = consoleContent.scrollHeight;
        await sleep(typingSpeed);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateConsole() {
    for (let i = 0; i < lines.length; i++) {
        await typeText(lines[i]);
        
        if (i < lines.length - 1) {
            consoleContent.textContent += '\n';
            await sleep(delayBetweenLines);
        }
    }
    
    // Hide cursor when done
    cursor.classList.add('hidden');
}

// Start animation when page loads
window.addEventListener('load', animateConsole);