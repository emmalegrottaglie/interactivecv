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
    let target;

    if (isName) {
        target = document.createElement('span');
        target.style.fontSize = '23px';
        target.style.fontWeight = 'bold';
    } else if (isEmail) {
        target = document.createElement('a');
        target.href = 'mailto:emmalegrottaglie@gmail.com';
    } else if (isLinkedIn) {
        target = document.createElement('a');
        target.href = 'https://www.linkedin.com/in/emma-legrottaglie-477ba5290/';
        target.target = '_blank';
    } else {
        // Plain text — append a text node and grow it in place so the browser
        // can wrap it cleanly as it lengthens.
        target = document.createTextNode('');
        consoleContent.appendChild(target);
        for (const char of text) {
            target.data += char;
            consoleContent.scrollTop = consoleContent.scrollHeight;
            await sleep(typingSpeed);
        }
        return;
    }

    // Append the element ONCE, then mutate its textContent in place.
    // This preserves earlier lines and lets the browser wrap correctly.
    consoleContent.appendChild(target);
    for (const char of text) {
        target.textContent += char;
        consoleContent.scrollTop = consoleContent.scrollHeight;
        await sleep(typingSpeed);
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
            consoleContent.appendChild(document.createTextNode('\n'));
            await sleep(delayBetweenLines);
        }
    }

    cursor.classList.add('hidden');
}

window.addEventListener('load', animateConsole);
