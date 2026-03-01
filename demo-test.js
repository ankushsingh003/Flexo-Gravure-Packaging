/**
 * Flexoverse Demo Test Logic
 * Implements a skills assessment interface with a simulated ML evaluation engine.
 */

const TEST_QUESTIONS = [
    {
        id: 1,
        question: "What is the primary role of an Anilox roll in Flexography?",
        options: [
            "To engrave the image on the substrate",
            "To provide a measured amount of ink to the printing plate",
            "To dry the ink after printing",
            "To align the paper registration"
        ],
        correct: 1
    },
    {
        id: 2,
        question: "Which component wipes excess ink from the Gravure cylinder?",
        options: [
            "Anilox Roll",
            "Impression Cylinder",
            "Doctor Blade",
            "Fountain Roller"
        ],
        correct: 2
    },
    {
        id: 3,
        question: "What effect does increased ink viscosity typically have on print quality?",
        options: [
            "Thin, weak colors",
            "Pinholing and poor coverage",
            "Heavy ink laydown and potential fill-in",
            "Increased press speed"
        ],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

function openDemoTest() {
    const modal = document.getElementById('testModal');
    modal.style.display = 'flex';
    resetTest();
    startTestSequence();
}

function closeTestModal() {
    const modal = document.getElementById('testModal');
    modal.style.display = 'none';
}

function resetTest() {
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById('test-results').classList.add('hidden');
    document.getElementById('test-container').innerHTML = `
        <div class="loading-ml-test">
            <div class="ml-loader"></div>
            <p>Initializing ML Inference Engine...</p>
        </div>
    `;
}

function startTestSequence() {
    setTimeout(() => {
        renderQuestion();
    }, 1500);
}

function renderQuestion() {
    const question = TEST_QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / TEST_QUESTIONS.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;

    const container = document.getElementById('test-container');
    container.innerHTML = `
        <div class="question-card animate-fade-in">
            <span class="section-badge">Question ${currentQuestionIndex + 1}/${TEST_QUESTIONS.length}</span>
            <h3>${question.question}</h3>
            <div class="options-grid">
                ${question.options.map((option, index) => `
                    <button class="option-btn" onclick="handleOptionSelect(${index})">${option}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function handleOptionSelect(index) {
    userAnswers.push(index);
    if (currentQuestionIndex < TEST_QUESTIONS.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        finishTest();
    }
}

async function finishTest() {
    document.querySelector('.progress-fill').style.width = `100%`;
    const container = document.getElementById('test-container');
    container.innerHTML = `
        <div class="loading-ml-test">
            <div class="ml-loader"></div>
            <p>Processing results via Flexo-ML Model v2.4...</p>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 1rem;">Analyzing semantic patterns & technical accuracy</p>
        </div>
    `;

    // Simulate ML processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    showResults();
}

function showResults() {
    const score = calculateScore();
    const resultContainer = document.getElementById('test-results');
    const testContainer = document.getElementById('test-container');

    testContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const analysis = generateMLAnalysis(score);

    resultContainer.innerHTML = `
        <div class="test-result-card">
            <div class="section-badge">Assessment Complete</div>
            <h2>Industrial Mastery Score</h2>
            <div class="result-score">${score}%</div>
            
            <div class="ml-analysis-box">
                <h4><i class="fas fa-microchip"></i> AI Performance Analysis</h4>
                <p>${analysis}</p>
            </div>
            
            <button class="cta-button" style="margin-top: 2rem; width: 100%;" onclick="closeTestModal()">
                Back to Dashboard
            </button>
        </div>
    `;
}

function calculateScore() {
    let correctCount = 0;
    userAnswers.forEach((ans, i) => {
        if (ans === TEST_QUESTIONS[i].correct) correctCount++;
    });
    return Math.round((correctCount / TEST_QUESTIONS.length) * 100);
}

/**
 * Placeholder for true ML Dataset integration
 * This function simulates evaluation based on a trained model.
 */
function generateMLAnalysis(score) {
    if (score >= 90) {
        return "Model identifies high technical proficiency. Predictive analytics suggest you are ready for advanced Professional Track courses. Strengths: Anilox volume control, Viscosity management.";
    } else if (score >= 60) {
        return "Model indicates solid foundational knowledge. Minor deviations detected in 'Fluid Dynamics' related questions. Recommendation: Review 'Ink & Material Science' modules.";
    } else {
        return "Model detects significant knowledge gaps in core press operations. Recommendation: Complete 'Foundation Track' Chapter 1-3 before re-attempting assessment.";
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('testModal');
    if (event.target == modal) {
        closeTestModal();
    }
}
