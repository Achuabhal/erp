import React, { useState, useEffect, useRef } from 'react';

// --- Data for the Quizzes ---

const jeeQuestions = [
    // Physics
    {
        id: 'jee-p1',
        question: "A particle starts from rest and moves with a constant acceleration. If it covers a distance s in t seconds, what is the distance it covers in the next t seconds?",
        options: ["2s", "3s", "4s", "5s"],
        correctAnswer: "3s",
        explanation: "Using the equation of motion, s = ut + (1/2)at². Since the particle starts from rest (u=0), s = (1/2)at². This is the distance in the first 't' seconds. The distance covered in the first '2t' seconds is s' = (1/2)a(2t)² = 4 * (1/2)at² = 4s. Therefore, the distance covered in the next 't' seconds is s' - s = 4s - s = 3s."
    },
    {
        id: 'jee-p2',
        question: "A ball is thrown vertically upwards with an initial velocity of 20 m/s. Neglecting air resistance, the time for which the ball remains in the air is: (Take g = 10 m/s²)",
        options: ["2 s", "4 s", "5 s", "6 s"],
        correctAnswer: "4 s",
        explanation: "The time of ascent (time to reach maximum height) is t_up = u/g = 20/10 = 2s. The time of descent is equal to the time of ascent. So, the total time the ball remains in the air is t_total = t_up + t_down = 2s + 2s = 4s."
    },
    {
        id: 'jee-p3',
        question: "A conducting circular loop is placed in a uniform magnetic field perpendicular to the plane of the loop. If the magnetic flux through the loop is decreasing with time, what is the direction of the induced current (viewed from the top)?",
        options: ["Clockwise", "Anticlockwise", "Alternating", "Zero"],
        correctAnswer: "Anticlockwise",
        explanation: "According to Lenz's Law, the induced current will flow in a direction that opposes the change in magnetic flux. Since the flux is decreasing into the page, the induced current will create a magnetic field pointing out of the page. By the right-hand thumb rule, an anticlockwise current will produce a magnetic field out of the page."
    },
    // Chemistry
    {
        id: 'jee-c1',
        question: "Which of the following has the highest bond dissociation energy?",
        options: ["F₂", "O₂", "N₂", "Cl₂"],
        correctAnswer: "N₂",
        explanation: "Nitrogen (N₂) has a triple bond between its atoms (N≡N), which is very strong and requires a large amount of energy to break. Oxygen (O₂) has a double bond, while Fluorine (F₂) and Chlorine (Cl₂) have single bonds. Therefore, N₂ has the highest bond dissociation energy."
    },
    {
        id: 'jee-c2',
        question: "The rate constant of a first-order reaction is 0.693 min⁻¹. The time taken to reduce the concentration to half of its initial value is:",
        options: ["1 min", "0.1 min", "10 min", "100 min"],
        correctAnswer: "1 min",
        explanation: "For a first-order reaction, the half-life (t₁/₂) is related to the rate constant (k) by the formula: t₁/₂ = 0.693 / k. Given k = 0.693 min⁻¹, we get t₁/₂ = 0.693 / 0.693 min = 1 min."
    },
    {
        id: 'jee-c3',
        question: "In which of the following reactions is a Lewis acid used?",
        options: ["Friedel-Crafts alkylation", "Cannizzaro reaction", "Aldol condensation", "Wurtz reaction"],
        correctAnswer: "Friedel-Crafts alkylation",
        explanation: "Friedel-Crafts alkylation involves the use of a Lewis acid catalyst, such as AlCl₃ or FeCl₃, to generate a carbocation electrophile from an alkyl halide."
    },
    // Mathematics
    {
        id: 'jee-m1',
        question: "If tan(A) + tan(B) + tan(C) = tan(A)tan(B)tan(C), then A + B + C is equal to:",
        options: ["π/2", "π", "3π/2", "2π"],
        correctAnswer: "π",
        explanation: "The identity tan(A + B + C) = [tan(A) + tan(B) + tan(C) - tan(A)tan(B)tan(C)] / [1 - tan(A)tan(B) - tan(B)tan(C) - tan(C)tan(A)]. Given the condition, the numerator is 0. So, tan(A + B + C) = 0. This implies A + B + C = nπ, where n is an integer. For a triangle, A+B+C = π."
    },
    {
        id: 'jee-m2',
        question: "Let f(x) = x³ - 3x + 1. The number of real roots of the equation f(x) = 0 is:",
        options: ["0", "1", "2", "3"],
        correctAnswer: "3",
        explanation: "To find the number of real roots, we can analyze the function's derivative. f'(x) = 3x² - 3 = 3(x-1)(x+1). The critical points are x=1 and x=-1. f(-1) = (-1)³ - 3(-1) + 1 = 3. f(1) = 1³ - 3(1) + 1 = -1. Since f(-1) is positive and f(1) is negative, there is a root between -1 and 1. As x → ∞, f(x) → ∞, and as x → -∞, f(x) → -∞. This means there are three real roots."
    },
    {
        id: 'jee-m3',
        question: "The number of 5-digit numbers that can be formed using digits 1 to 5 without repetition such that the number is divisible by 4 is:",
        options: ["20", "30", "24", "40"],
        correctAnswer: "24",
        explanation: "A number is divisible by 4 if the number formed by its last two digits is divisible by 4. Using digits 1, 2, 3, 4, 5 without repetition, the possible last two digits are: 12, 24, 32, 52. For each of these 4 pairs, the remaining 3 digits can be arranged in the first three places in 3! = 6 ways. Total numbers = 4 (pairs) * 6 (arrangements) = 24."
    },
    {
        id: 'jee-m4',
        question: "Evaluate the limit: lim(x→0) [sin(3x) / x]",
        options: ["1", "3", "0", "Does not exist"],
        correctAnswer: "3",
        explanation: "We use the standard limit lim(θ→0) [sin(θ) / θ] = 1. We can rewrite the given limit as lim(x→0) [3 * sin(3x) / (3x)]. Let θ = 3x. As x→0, θ→0. The limit becomes 3 * lim(θ→0) [sin(θ) / θ] = 3 * 1 = 3."
    }
];

const neetQuestions = [
    // Biology
    {
        id: 'neet-b1',
        question: "In which of the following plants is double fertilization observed?",
        options: ["Pinus", "Cycas", "Mustard", "Funaria"],
        correctAnswer: "Mustard",
        explanation: "Double fertilization is a characteristic feature of angiosperms (flowering plants). Mustard is an angiosperm, while Pinus and Cycas are gymnosperms, and Funaria is a bryophyte."
    },
    {
        id: 'neet-b2',
        question: "Which of the following hormones is not secreted by the anterior pituitary?",
        options: ["Prolactin", "ACTH", "ADH", "Growth Hormone"],
        correctAnswer: "ADH",
        explanation: "Antidiuretic Hormone (ADH), also known as vasopressin, is produced by the hypothalamus and stored and released by the posterior pituitary, not the anterior pituitary."
    },
    {
        id: 'neet-b3',
        question: "Which part of the nephron is responsible for maximum reabsorption of glomerular filtrate?",
        options: ["Distal convoluted tubule", "Proximal convoluted tubule", "Loop of Henle", "Collecting duct"],
        correctAnswer: "Proximal convoluted tubule",
        explanation: "The Proximal Convoluted Tubule (PCT) is responsible for the reabsorption of nearly all essential nutrients and about 70-80% of electrolytes and water from the glomerular filtrate."
    },
    {
        id: 'neet-b4',
        question: "Which of the following is an example of passive immunity?",
        options: ["Vaccination", "Injection of antitoxins", "Exposure to pathogen", "Recovery from infection"],
        correctAnswer: "Injection of antitoxins",
        explanation: "Passive immunity involves receiving pre-formed antibodies. Injection of antitoxins (like for a snake bite) provides immediate, but temporary, immunity without the body's immune system having to produce its own antibodies."
    },
    // Chemistry
    {
        id: 'neet-c1',
        question: "Which of the following does not exhibit hydrogen bonding?",
        options: ["H₂O", "HF", "NH₃", "HCl"],
        correctAnswer: "HCl",
        explanation: "Hydrogen bonding occurs when hydrogen is bonded to a highly electronegative atom like Nitrogen (N), Oxygen (O), or Fluorine (F). Chlorine (Cl) is not electronegative enough to form significant hydrogen bonds."
    },
    {
        id: 'neet-c2',
        question: "The pH of a 0.001 M HCl solution is:",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3",
        explanation: "HCl is a strong acid, so it completely dissociates. [H⁺] = 0.001 M = 10⁻³ M. pH = -log[H⁺] = -log(10⁻³) = 3."
    },
    {
        id: 'neet-c3',
        question: "The order of ionization energy of the following elements is: Na, Mg, Al, Si",
        options: ["Na < Mg < Al < Si", "Na < Al < Mg < Si", "Si < Al < Mg < Na", "Mg < Na < Si < Al"],
        correctAnswer: "Na < Al < Mg < Si",
        explanation: "Ionization energy generally increases across a period. However, Mg has a stable, fully-filled 3s orbital, making it harder to remove an electron from Mg than from Al (which has one electron in the 3p orbital). So, the order is Na < Al < Mg < Si."
    },
    // Physics
    {
        id: 'neet-p1',
        question: "A car is moving with a speed of 72 km/h. What is its speed in m/s?",
        options: ["10", "18", "20", "25"],
        correctAnswer: "20",
        explanation: "To convert km/h to m/s, we multiply by 5/18. So, 72 km/h * (5/18) = 4 * 5 = 20 m/s."
    },
    {
        id: 'neet-p2',
        question: "A ray of light enters from air to glass (μ = 1.5). If the angle of incidence is 60°, the angle of refraction is approximately:",
        options: ["30°", "35°", "45°", "60°"],
        correctAnswer: "35°",
        explanation: "Using Snell's Law: n₁sin(i) = n₂sin(r). Here, n₁ (air) ≈ 1, i = 60°, n₂ (glass) = 1.5. So, 1 * sin(60°) = 1.5 * sin(r). sin(60°) ≈ 0.866. sin(r) = 0.866 / 1.5 ≈ 0.577. r = arcsin(0.577) ≈ 35.2°. The closest answer is 35°."
    },
    {
        id: 'neet-p3',
        question: "The dimensional formula of force is:",
        options: ["[MLT⁻²]", "[ML²T⁻²]", "[MT⁻¹]", "[ML⁻¹T²]"],
        correctAnswer: "[MLT⁻²]",
        explanation: "Force = Mass × Acceleration. The dimension of Mass is [M]. The dimension of Acceleration (distance/time²) is [LT⁻²]. Therefore, the dimensional formula of Force is [M][LT⁻²] = [MLT⁻²]."
    }
];

// --- Helper Components ---

const CheckIcon = () => (
  <svg className="w-5 h-5 inline-block mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5 inline-block mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

// --- Main App Component ---

export default function App() {
    const [examType, setExamType] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(0);

    const handleSelectExam = (type) => {
        setExamType(type);
        setQuestions(type === 'JEE' ? jeeQuestions : neetQuestions);
        setStartTime(Date.now());
        // Reset states for a new quiz
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResults(false);
        setTimeTaken(0);
    };
    
    const handleAnswerSelect = (questionId, option) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Finish the quiz
            const endTime = Date.now();
            setTimeTaken(Math.round((endTime - startTime) / 1000));
            setShowResults(true);
        }
    };
    
    const handleRestart = () => {
        setExamType(null);
    };

    // --- Render Logic ---

    if (!examType) {
        return (
            <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4 font-sans">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 text-black">Welcome to the Test Portal</h1>
                    <p className="text-lg text-gray-600 mb-8">Choose your exam to begin.</p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <button onClick={() => handleSelectExam('JEE')} className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            Start JEE Test
                        </button>
                        <button onClick={() => handleSelectExam('NEET')} className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            Start NEET Test
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showResults) {
        const score = questions.reduce((acc, q) => {
            return userAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
        }, 0);
        const scorePercentage = Math.round((score / questions.length) * 100);

        return (
            <div className="min-h-screen bg-white text-black p-4 sm:p-6 md:p-8 font-sans">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black">Test Results</h1>
                    <div className="bg-gray-100 rounded-xl p-6 mb-8 text-center shadow-md border border-gray-200">
                        <p className="text-xl text-gray-700">You Scored</p>
                        <p className="text-6xl font-bold my-2 text-black">{score} / {questions.length}</p>
                        <div className="w-full bg-gray-200 rounded-full h-4 my-4">
                            <div className="bg-black h-4 rounded-full" style={{ width: `${scorePercentage}%` }}></div>
                        </div>
                        <p className="text-lg text-gray-600">Time Taken: {Math.floor(timeTaken / 60)}m {timeTaken % 60}s</p>
                    </div>

                    <div className="space-y-4">
                        {questions.map((q, index) => {
                            const userAnswer = userAnswers[q.id];
                            const isCorrect = userAnswer === q.correctAnswer;
                            return (
                                <div key={q.id} className={`p-5 rounded-lg shadow-sm border ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                                    <p className="font-semibold text-lg mb-2 text-black">Q{index + 1}: {q.question}</p>
                                    <div className="my-3">
                                        <p className="text-sm font-medium flex items-center text-gray-800">
                                            {isCorrect ? <CheckIcon /> : <CrossIcon />}
                                            Your Answer: <span className="font-normal ml-2">{userAnswer || 'Not Answered'}</span>
                                        </p>
                                        {!isCorrect && (
                                            <p className="text-sm font-medium flex items-center mt-1 text-gray-800">
                                                <CheckIcon />
                                                Correct Answer: <span className="font-normal ml-2">{q.correctAnswer}</span>
                                            </p>
                                        )}
                                    </div>
                                    <details className="mt-2">
                                        <summary className="cursor-pointer text-sm text-gray-600 hover:text-black font-medium">Show Explanation</summary>
                                        <p className="text-gray-700 mt-2 p-3 bg-gray-100 rounded-md">{q.explanation}</p>
                                    </details>
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-center mt-8">
                        <button onClick={handleRestart} className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            Take Another Test
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-black">{examType} Mock Test</h1>
                    <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-black h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-md border border-gray-200">
                    <p className="text-lg md:text-xl font-semibold mb-6 text-black">{currentQuestion.question}</p>
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 
                                ${userAnswers[currentQuestion.id] === option 
                                    ? 'bg-black border-black text-white' 
                                    : 'bg-white border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="mt-6 text-center">
                    <button 
                        onClick={handleNextQuestion}
                        disabled={!userAnswers[currentQuestion.id]}
                        className="bg-black text-white font-bold py-3 px-12 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish Test'}
                    </button>
                </div>
            </div>
        </div>
    );
}
