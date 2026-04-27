/* ============================================================================
 *  TYPEWRITER ANIMATION — interactive CV
 * ============================================================================
 *
 *  ⚠️  READ THIS BEFORE EDITING — INSTRUCTIONS FOR HUMAN AND AI EDITORS  ⚠️
 *
 *  This file has had two related bugs in its history. Do NOT reintroduce them.
 *
 *  ── BUG #1: text-wrap smearing ("eemmemmemmaemma...") ──
 *  Caused by clearing and rebuilding the link element on every keystroke
 *  (e.g. `consoleContent.innerHTML = ''` followed by appending a clone of
 *  the link). Each frame the browser saw a brand-new element and could not
 *  wrap a partially-typed word cleanly, so every prefix of the word ended up
 *  glued onto the previous line.
 *  → FIX: create each line's element ONCE, append it ONCE, then mutate its
 *    text in place character by character. Never wipe and rebuild.
 *
 *  ── BUG #2: previous lines disappearing when the email/LinkedIn lines type ──
 *  Caused by ANY operation that touches the parent container's contents
 *  globally — `consoleContent.innerHTML = ...`, `consoleContent.textContent = ...`,
 *  `consoleContent.replaceChildren(...)`, etc. Doing any of those nukes every
 *  earlier line.
 *  → FIX: each line lives inside its OWN dedicated wrapper element. We only
 *    ever touch that wrapper's contents. The parent `consoleContent` is
 *    append-only — we never reassign its innerHTML/textContent and we never
 *    remove anything from it.
 *
 *  HARD RULES — DO NOT BREAK ANY OF THESE:
 *    1. Never assign to `consoleContent.innerHTML` or `consoleContent.textContent`.
 *    2. Never call `removeChild` / `replaceChildren` / `replaceChild` on
 *       `consoleContent`.
 *    3. Never use `cloneNode` + re-append as a way to "update" a typing line.
 *    4. Each line gets its own wrapper element, appended once, mutated in place.
 *    5. Use a real `<br>` between lines, not a `\n` text node smuggled into the
 *       parent — the wrapper-per-line pattern stays clean that way.
 * ============================================================================
 */

const lines = [
    { text: "Emma Legrottaglie", kind: "name" },
    { text: "QA Engineer", kind: "plain" },
    { text: "Playwright Tester", kind: "plain" },
    { text: "MCP Server Integrations", kind: "plain" },
    { text: "Technical Writer", kind: "plain" },
    { text: "Lifelong Artist", kind: "plain" },
    { text: "Loves Video Game Lore", kind: "plain" },
    { text: "emmalegrottaglie@gmail.com", kind: "email" },
    { text: "LinkedIn Profile", kind: "linkedin" }
];

const typingSpeed = 50;
const delayBetweenLines = 800;
const consoleContent = document.getElementById('consoleContent');
const cursor = document.getElementById('cursor');

/**
 * Build the empty wrapper element for a single line.
 * Returns the element to type INTO. The caller appends it to the console
 * exactly once and then mutates its textContent character by character.
 */
function buildLineElement(kind) {
    if (kind === "name") {
        const span = document.createElement('span');
        span.style.fontSize = '23px';
        span.style.fontWeight = 'bold';
        return span;
    }
    if (kind === "email") {
        const a = document.createElement('a');
        a.href = 'mailto:emmalegrottaglie@gmail.com';
        return a;
    }
    if (kind === "linkedin") {
        const a = document.createElement('a');
        a.href = 'https://www.linkedin.com/in/emma-legrottaglie-477ba5290/';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        return a;
    }
    // Plain line: a span so it has the same "one wrapper per line" shape as
    // every other line. This is intentional — keeping the structure uniform
    // makes it impossible to accidentally touch sibling lines.
    return document.createElement('span');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Type `text` into `element` one character at a time.
 *
 * IMPORTANT: this function ONLY mutates `element.textContent`.
 * It must NEVER touch `element.parentNode`, `consoleContent`, or any sibling.
 * That invariant is what keeps already-typed lines on screen.
 */
async function typeInto(element, text) {
    for (const char of text) {
        element.textContent += char;
        consoleContent.scrollTop = consoleContent.scrollHeight;
        await sleep(typingSpeed);
    }
}

async function animateConsole() {
    for (let i = 0; i < lines.length; i++) {
        const { text, kind } = lines[i];

        // 1. Build the wrapper for this line.
        const lineEl = buildLineElement(kind);

        // 2. Append it ONCE to the console. After this point we never
        //    touch the parent container again for this line.
        consoleContent.appendChild(lineEl);

        // 3. Type the characters into the wrapper in place.
        await typeInto(lineEl, text);

        // 4. Line break between lines — a <br> is its own sibling node and
        //    cannot be confused with content inside any line wrapper.
        if (i < lines.length - 1) {
            consoleContent.appendChild(document.createElement('br'));
            await sleep(delayBetweenLines);
        }
    }

    cursor.classList.add('hidden');
}

window.addEventListener('load', animateConsole);
