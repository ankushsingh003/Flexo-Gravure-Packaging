/**
 * Flexoverse Flexo-Agent AI Chatbot
 * Implements a RAG-lite system with a specialized knowledge base
 * for flexography and gravure printing.
 */

const FLEXO_KNOWLEDGE = {
    "flexography": "Flexography is a modern version of letterpress printing that uses flexible relief plates. It is highly efficient for packaging labels, plastic bags, and gift wraps.",
    "gravure": "Gravure printing involves engraving an image onto a cylindrical carrier. It is known for high-speed, long-run printing and excellent image quality, especially in flexible packaging.",
    "anilox": "Anilox rolls are cylinders used in flexography to provide a measured amount of ink to the flexible printing plate. The volume is controlled by tiny cells laser-etched on its surface.",
    "doctor blade": "A doctor blade wipes excess ink from the surface of an anilox roll or gravure cylinder, ensuring only the ink in the cells is transferred to the plate or substrate.",
    "viscosity": "Ink viscosity is critical for consistent print quality. If too high, ink won't flow; if too low, it may cause pinholing or color shifts. It's measured using a Zhan cup or similar device.",
    "registration": "Registration refers to the alignment of different colors in a multi-color print job. Proper registration is vital to avoid 'ghosting' or blurred images.",
    "substrate": "Substrates are the materials being printed on, such as paper, plastic film (BOPP, PE, PET), or foil. Each requires specific ink and plate settings.",
    "corona": "Corona treatment is a surface modification technique that increases the surface energy of plastic films to improve ink adhesion.",
    "prepress": "The stage between design and printing, involving plate making, color separation, and image processing specifically for the flexo/gravure process.",
};

const AGENT_STEPS = [
    { step: "Analyzing query for technical semantic markers...", delay: 800 },
    { step: "Accessing Flexoverse Knowledge Repository...", delay: 1200 },
    { step: "Performing RAG synthesis on technical parameters...", delay: 1000 },
    { step: "Optimizing response for industry standards...", delay: 600 }
];

class FlexoChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [
            { role: 'assistant', text: "Hello! I'm the **Flexo-Agent**. I specialize in Flexography and Gravure technology. How can I help you optimize your press today?" }
        ];
        this.init();
    }

    init() {
        this.createUI();
        this.attachEvents();
    }

    createUI() {
        const container = document.createElement('div');
        container.id = 'flexo-chatbot-root';
        container.innerHTML = `
            <div id="chatbot-trigger">
                <i class="fas fa-robot"></i>
            </div>
            <div id="chatbot-window" class="hidden">
                <div class="chatbot-header">
                    <div class="header-info">
                        <div class="agent-avatar"><i class="fas fa-brain"></i></div>
                        <div>
                            <span class="agent-name">Flexo-Agent</span>
                            <span class="agent-status">Online • Agentic Mode</span>
                        </div>
                    </div>
                    <div class="header-actions">
                        <i class="fas fa-times" id="chatbot-close"></i>
                    </div>
                </div>
                <div id="chatbot-messages"></div>
                <div id="agent-thinking" class="hidden"></div>
                <form id="chatbot-input-form">
                    <input type="text" id="chatbot-input" placeholder="Ask about anilox, registration, etc..." autocomplete="off">
                    <button type="submit"><i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
        `;
        document.body.appendChild(container);
        this.renderMessages();
    }

    attachEvents() {
        const trigger = document.getElementById('chatbot-trigger');
        const closeBtn = document.getElementById('chatbot-close');
        const form = document.getElementById('chatbot-input-form');

        trigger.addEventListener('click', () => this.toggleWindow());
        closeBtn.addEventListener('click', () => this.toggleWindow());
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    toggleWindow() {
        const windowEl = document.getElementById('chatbot-window');
        this.isOpen = !this.isOpen;
        windowEl.classList.toggle('hidden', !this.isOpen);
        if (this.isOpen) document.getElementById('chatbot-input').focus();
    }

    renderMessages() {
        const container = document.getElementById('chatbot-messages');
        container.innerHTML = this.messages.map(m => `
            <div class="message ${m.role}">
                <div class="message-content">${this.formatText(m.text)}</div>
            </div>
        `).join('');
        container.scrollTop = container.scrollHeight;
    }

    formatText(text) {
        // Simple markdown-ish bold support
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    async handleSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('chatbot-input');
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        this.messages.push({ role: 'user', text });
        this.renderMessages();

        await this.agentRespond(text);
    }

    async agentRespond(query) {
        const thinkingEl = document.getElementById('agent-thinking');
        thinkingEl.classList.remove('hidden');

        // Show thinking steps
        for (const step of AGENT_STEPS) {
            thinkingEl.innerHTML = `<span class="thinking-dot"></span> ${step.step}`;
            await new Promise(resolve => setTimeout(resolve, step.delay));
        }

        thinkingEl.classList.add('hidden');

        // Logic (Knowledge Lookup / RAG Simulation)
        let response = "";
        const lowerQuery = query.toLowerCase();

        let found = false;
        for (const [key, value] of Object.entries(FLEXO_KNOWLEDGE)) {
            if (lowerQuery.includes(key)) {
                response = `Based on our knowledge repository: **${value}** Is there something more specific you'd like to know about ${key}?`;
                found = true;
                break;
            }
        }

        if (!found) {
            response = "I searched our specialized database but didn't find a direct match. However, as a Flexoverse AI, I can tell you that in **Flexography and Gravure**, precision in ink transfer and material handling is key. Could you elaborate on your query?";
        }

        this.messages.push({ role: 'assistant', text: response });
        this.renderMessages();
    }
}

// Initialize
window.addEventListener('load', () => {
    new FlexoChatbot();
});
