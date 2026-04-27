const lines = [
    { text: "Emma Legrottaglie", isName: true },
    { text: "QA Engineer", isName: false },
    { text: "Playwright Tester", isName: false },
    { text: "MCP Server Integrations", isName: false },
    { text: "Technical Writer", isName: false },
    { text: "Lifelong Artist", isName: false },
    { text: "Loves Video Game Lore", isName: false },
    { text: "emmalegrottaglie@gmail.com", isEmail: true },
    { text: "LinkedIn Profile", isLinkedIn: true }
];

const typingSpeed = 50;
const delayBetweenLines = 800;
const consoleContent = document.getElementById('consoleContent');
const cursor = document.getElementById('cursor');

async function typeText(text, isName = false, isEmail = false, isLinkedIn = false) {
    if (isName) {
        const nameContainer = document.createElement('span');
        nameContainer.style.fontSize = '23px';
        nameContainer.style.fontWeight = 'bold';
        
        for (let char of text) {
            nameContainer.textContent += char;
            consoleContent.innerHTML = '';
            consoleContent.appendChild(nameContainer.cloneNode(true));
            consoleContent.scrollTop = consoleContent.scrollHeight;
            await sleep(typingSpeed);
        }
    } else if (isEmail) {
        const link = document.createElement('a');
        link.href = 'mailto:emmalegrottaglie@gmail.com';
        
        for (let char of text) {
            link.textContent += char;
            consoleContent.innerHTML = '';
            consoleContent.appendChild(link.cloneNode(true));
            consoleContent.scrollTop = consoleContent.scrollHeight;
            await sleep(typingSpeed);
        }
    } else if (isLinkedIn) {
        const link = document.createElement('a');
        link.href = 'https://www.linkedin.com/in/emma-legrottaglie-477ba5290/';
        link.target = '_blank';
        
        for (let char of text) {
            link.textContent += char;
            consoleContent.innerHTML = '';
            consoleContent.appendChild(link.cloneNode(true));
            consoleContent.scrollTop = consoleContent.scrollHeight;
            await sleep(typingSpeed);
        }
    } else {
        for (let char of text) {
            consoleContent.textContent += char;
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
        await typeText(line.text, line.isName, line.isEmail, line.isLinkedIn);
        
        if (i < lines.length - 1) {
            consoleContent.textContent += '\n';
            await sleep(delayBetweenLines);
        }
    }
    
    cursor.classList.add('hidden');
}

window.addEventListener('load', animateConsole);
