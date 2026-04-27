const lines = [
    { text: "Emma Legrottaglie", isName: true },
    { text: "QA Engineer", isName: false },
    { text: "Playwright Tester", isName: false },
    { text: "MCP Server Integrations", isName: false },
    { text: "Technical Writer", isName: false },
    { text: "Lifelong Artist", isName: false },
    { text: "emmalegrottaglie@gmail.com", isEmail: true }
];

const typingSpeed = 50;
const delayBetweenLines = 800;
const consoleContent = document.getElementById('consoleContent');
const cursor = document.getElementById('cursor');

async function typeText(text, isName = false, isEmail = false) {
    if (isEmail) {
        const link = document.createElement('a');
        link.href = 'mailto:emmalegrottaglie@gmail.com';
        
        for (let char of text) {
            link.textContent += char;
            consoleContent.textContent += char;
            consoleContent.scrollTop = consoleContent.scrollHeight;
            await sleep(typingSpeed);
        }
        
        // Replace last characters with actual link
        const currentText = consoleContent.textContent;
        consoleContent.innerHTML = currentText.slice(0, -text.length);
        consoleContent.appendChild(link);
    } else {
        for (let char of text) {
            if (isName) {
                const span = document.createElement('span');
                span.style.fontSize = '23px';
                span.style.fontWeight = 'bold';
                span.textContent = char;
                consoleContent.appendChild(span);
            } else {
                consoleContent.textContent += char;
            }
            consoleContent.scrollTop = consoleContent.scrollHeight;
            await sleep(typingSpeed);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateConsole() {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        await typeText(line.text, line.isName, line.isEmail);
        
        if (i < lines.length - 1) {
            consoleContent.textContent += '\n';
            await sleep(delayBetweenLines);
        }
    }
    
    cursor.classList.add('hidden');
}

window.addEventListener('load', animateConsole);