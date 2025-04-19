// --- Constants ---
const DEFAULT_REST_TIME_SECONDS = 90;
const NOTIFICATION_DURATION_INFO = 3000;
const NOTIFICATION_DURATION_ERROR = 4000;
const PROGRAM_DATA_URL = './program.json'; // Path to the external program data

// --- SVG Icons ---
const ICONS = {
    target: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
    repeat: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></svg>',
    dumbbell: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.4 14.4 9.6 9.6M18.657 5.343l-1.414-1.414a2 2 0 0 0-2.828 0L12 6.364 9.6 3.929a2 2 0 0 0-2.828 0L5.343 5.343a2 2 0 0 0 0 2.828L7.8 10.607l1.414 1.414 2.475-2.475 2.475 2.475 1.414-1.414 2.427-2.427a2 2 0 0 0 0-2.828z"></path><path d="m21.66 16.66-1.41-1.41a2 2 0 0 0-2.83 0L15 17.66l-1.4-1.4a2 2 0 0 0-2.83 0L8.34 18.66a2 2 0 0 0 0 2.83l1.41 1.41a2 2 0 0 0 2.83 0L15 20.34l1.4 1.4a2 2 0 0 0 2.83 0l2.43-2.43a2 2 0 0 0 0-2.83z"></path></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    play: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    pause: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
    rotateCcw: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v6h6"></path><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
};

// --- Program Data (will be loaded from JSON) ---
let programData = []; // Initialize as empty array

// --- Application State ---
let state = {
    currentWeek: 1,
    currentDay: 'upperA', // Default to first day
    workoutLog: {},
    history: [],
    timer: {
        active: false,
        seconds: 0,
        duration: DEFAULT_REST_TIME_SECONDS,
        intervalId: null,
        _rafId: null // For requestAnimationFrame optimization
    },
    notificationTimeoutId: null,
    darkMode: false,
    programLoaded: false // Flag to track if program data is loaded
};

// --- DOM Elements ---
const prevWeekBtn = document.getElementById('prev-week-btn');
const nextWeekBtn = document.getElementById('next-week-btn');
const mainTitle = document.getElementById('main-title');
const tabButtons = { // Updated for 4 tabs
    upperA: document.getElementById('tab-upperA'),
    lowerA: document.getElementById('tab-lowerA'),
    upperB: document.getElementById('tab-upperB'),
    lowerB: document.getElementById('tab-lowerB')
};
const exerciseListContainer = document.getElementById('exercise-list');
const timerDisplayContainer = document.getElementById('timer-display-container');
const saveWorkoutBtn = document.getElementById('save-workout-btn');
const clearWorkoutBtn = document.getElementById('clear-workout-btn');
const historyListContainer = document.getElementById('history-list');
const notificationArea = document.getElementById('notification-area');
const notificationContent = document.getElementById('notification-content');
const notificationTitle = document.getElementById('notification-title');
const notificationMessage = document.getElementById('notification-message');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkIcon = document.getElementById('dark-icon');
const lightIcon = document.getElementById('light-icon');
const clearHistoryBtn = document.getElementById('clear-history-btn');

// --- Helper Functions ---
let skipNextFocus = false; // Flag to prevent scroll on substitution change

const getLocalStorageKey = (week, day) => `workoutLog_w${week}_d${day}`;

const initializeWorkoutLog = (exercises) => {
    const initialLog = {};
    if (!exercises || !Array.isArray(exercises)) return initialLog;
    exercises.forEach((exercise) => {
        if (!exercise || !exercise.name) return;
        // Calculate correct number of sets including per leg/arm
        const numSets = exercise.sets * (exercise.isPerLeg || exercise.isPerArm ? 1 : 1); // Assuming setsAreTotal handles per arm/leg already if present
        initialLog[exercise.name] = {
            completed: false,
            sets: Array.from({ length: numSets }, () => ({ weight: '', reps: '', completed: false })),
            notes: '',
            substitutionUsed: null,
        };
    });
    return initialLog;
};

/**
 * Gets the exercise definitions for the current week and day from the loaded program data.
 * Falls back to the last available week if the current week is out of bounds.
 * @param {number} week - The current week number.
 * @param {string} day - The current day key (e.g., 'upperA').
 * @returns {Array} An array of exercise objects for the specified day, or an empty array if not found.
 */
const getCurrentExercises = (week, day) => {
    if (!state.programLoaded) {
        console.warn("Attempted to get exercises before program data was loaded.");
        return []; // Return empty if program data isn't ready
    }
    const programWeekData = programData.find(p => p.week === week);
    const fallbackWeekData = programWeekData || programData[programData.length - 1] || programData[0];

    if (fallbackWeekData && fallbackWeekData.days && fallbackWeekData.days[day]) {
        return fallbackWeekData.days[day];
    }
    console.warn(`No exercises found for week ${week}, day ${day}.`);
    return [];
};

/**
 * Parses the rest time string (e.g., "~3 min", "0 min") into seconds.
 * @param {string} restString - The rest time string from the program data.
 * @returns {number} The rest time in seconds, or DEFAULT_REST_TIME_SECONDS if parsing fails.
 */
const parseRestTime = (restString) => {
    if (!restString || typeof restString !== 'string') return DEFAULT_REST_TIME_SECONDS;
    if (restString.toLowerCase().includes("0 min")) return 0;
    const match = restString.match(/(\d+(\.\d+)?)\s*min/);
    return match ? Math.round(parseFloat(match[1]) * 60) : DEFAULT_REST_TIME_SECONDS;
};

/**
 * Formats total seconds into a mm:ss string.
 * @param {number} totalSeconds - The total seconds to format.
 * @returns {string} The formatted time string (e.g., "1:30").
 */
const formatTime = (totalSeconds) => {
    if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// --- Accessibility & UX ---
const focusFirstWeightInput = () => {
    if (skipNextFocus) {
        skipNextFocus = false;
        return;
    }
    setTimeout(() => {
        const firstWeightInput = exerciseListContainer.querySelector('.set-input-weight');
        if (firstWeightInput) firstWeightInput.focus();
    }, 100); // Brief delay for rendering
};

// --- Dark Mode Logic ---
const applyDarkMode = (isDark) => {
    state.darkMode = isDark;
    if (isDark) {
        document.documentElement.classList.add('dark');
        darkIcon?.classList.remove('hidden');
        lightIcon?.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        darkIcon?.classList.add('hidden');
        lightIcon?.classList.remove('hidden');
    }
};

const toggleDarkMode = () => {
    const newDarkModeState = !state.darkMode;
    applyDarkMode(newDarkModeState);
    try {
        localStorage.setItem('darkMode', newDarkModeState ? 'true' : 'false');
    } catch (e) {
        console.error("Error saving dark mode preference:", e);
    }
};

const loadDarkModePreference = () => {
    let preference = localStorage.getItem('darkMode');
    let isDark;
    if (preference !== null) {
        isDark = preference === 'true';
    } else {
        isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    applyDarkMode(isDark);
};

// --- Local Storage Functions ---
const loadHistory = () => {
    const savedHistory = localStorage.getItem('workoutHistory');
    try {
        state.history = savedHistory ? JSON.parse(savedHistory) : [];
        if (!Array.isArray(state.history)) state.history = [];
    } catch (e) {
        console.error("Error loading history from localStorage:", e);
        state.history = [];
    }
};
const saveHistory = () => {
    try {
        localStorage.setItem('workoutHistory', JSON.stringify(state.history));
    } catch (e) {
        console.error("Error saving history to localStorage:", e);
        showNotification("Error al guardar el historial. Posiblemente almacenamiento lleno.", "error");
    }
};
const loadWorkoutLog = () => {
    // Ensure program data is loaded before trying to get exercises
    if (!state.programLoaded) {
        console.warn("Workout log loading skipped: program data not yet available.");
        state.workoutLog = {}; // Keep log empty until program loads
        return;
    }
    const exercises = getCurrentExercises(state.currentWeek, state.currentDay);
    const storageKey = getLocalStorageKey(state.currentWeek, state.currentDay);
    const savedLog = localStorage.getItem(storageKey);
    if (savedLog) {
        try {
            const parsedLog = JSON.parse(savedLog);
            let isValid = true;
            // Basic validation: check if exercise names from current program exist as keys
            if (exercises.length > 0) {
                for (const exercise of exercises) {
                    if (!exercise || !exercise.name) continue;
                    // Check if the exercise exists in the log and has a 'sets' array
                    if (!parsedLog[exercise.name] || !Array.isArray(parsedLog[exercise.name].sets)) {
                        isValid = false;
                        break;
                    }
                    // Optional: Further check if set lengths match (might be too strict if program changes)
                    // const expectedSets = exercise.sets * (exercise.isPerLeg || exercise.isPerArm ? 1 : 1);
                    // if (parsedLog[exercise.name].sets.length !== expectedSets) {
                    //    isValid = false;
                    //    break;
                    // }
                }
            } else if (Object.keys(parsedLog).length > 0) {
                // If no exercises are defined for the day, the log should be empty
                isValid = false;
            }

            if (isValid) {
                state.workoutLog = parsedLog;
            } else {
                console.warn(`Invalid or outdated log found for ${storageKey}. Initializing new log.`);
                state.workoutLog = initializeWorkoutLog(exercises);
                // Optionally, clear the invalid log from storage
                clearWorkoutLogFromStorage();
            }
        } catch (error) {
            console.error(`Failed to parse workout log from localStorage for ${storageKey}:`, error);
            state.workoutLog = initializeWorkoutLog(exercises);
        }
    } else {
        state.workoutLog = initializeWorkoutLog(exercises);
    }
};
const saveWorkoutLog = () => {
    if (Object.keys(state.workoutLog).length > 0) {
        const storageKey = getLocalStorageKey(state.currentWeek, state.currentDay);
        try {
            localStorage.setItem(storageKey, JSON.stringify(state.workoutLog));
        } catch (e) {
            console.error("Error saving workout log:", e);
            showNotification("Error al guardar progreso.", "error");
        }
    }
};
const clearWorkoutLogFromStorage = () => {
    const storageKey = getLocalStorageKey(state.currentWeek, state.currentDay);
    localStorage.removeItem(storageKey);
};

// --- Notification Function ---
const showNotification = (message, type = 'info', duration = NOTIFICATION_DURATION_INFO) => {
    if (state.notificationTimeoutId) {
        clearTimeout(state.notificationTimeoutId);
    }
    notificationMessage.textContent = message;
    // Reset classes first
    notificationContent.className = 'p-4 rounded-md shadow-lg text-sm border w-full';
    // Add type-specific classes
    if (type === 'success') {
        notificationTitle.textContent = 'Éxito';
        notificationContent.classList.add('bg-green-100', 'text-green-800', 'border-green-300', 'dark:bg-green-900', 'dark:text-green-100', 'dark:border-green-700');
    } else if (type === 'error') {
        notificationTitle.textContent = 'Error';
        notificationContent.classList.add('bg-red-100', 'text-red-800', 'border-red-300', 'dark:bg-red-900', 'dark:text-red-100', 'dark:border-red-700');
        duration = NOTIFICATION_DURATION_ERROR; // Use longer duration for errors
    } else { // Default to 'info'
        notificationTitle.textContent = 'Información';
        notificationContent.classList.add('bg-blue-100', 'text-blue-800', 'border-blue-300', 'dark:bg-blue-900', 'dark:text-blue-100', 'dark:border-blue-700');
    }
    // Animate in
    notificationArea.classList.remove('hidden');
    notificationArea.setAttribute('role', 'alert');
    void notificationArea.offsetWidth; // Force reflow
    notificationArea.style.opacity = '1';
    notificationArea.style.transform = 'translateY(0)';
    // Set timeout to animate out
    state.notificationTimeoutId = setTimeout(() => {
        notificationArea.style.opacity = '0';
        notificationArea.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notificationArea.classList.add('hidden');
            state.notificationTimeoutId = null;
        }, 500); // Match transition duration
    }, duration);
};

// --- Rendering Functions ---

// -- Exercise Rendering Helpers --
/**
 * Creates the header element for an exercise card.
 * @param {object} exercise - The exercise definition object.
 * @param {object} currentLogData - The current log data for this exercise.
 * @returns {HTMLElement} The created header div element.
 */
const createExerciseCardHeader = (exercise, currentLogData) => {
    const displayExerciseName = currentLogData.substitutionUsed || exercise.name;

    const headerDiv = document.createElement('div');
    headerDiv.className = 'p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600';

    const headerFlex = document.createElement('div');
    headerFlex.className = 'flex justify-between items-start gap-4';

    const headerText = document.createElement('div');
    headerText.className = 'flex-1'; // Allow text to take up space

    // Exercise Title (with badges)
    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold flex items-center flex-wrap gap-2 text-gray-900 dark:text-gray-100';
    if (exercise.isSuperset) title.innerHTML += `<span class="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 px-1.5 py-0.5 rounded">${exercise.isSuperset}</span>`;
    title.innerHTML += `<span class="break-words">${displayExerciseName}</span>`; // Allow name to break
    if (exercise.isHeavy) title.innerHTML += `<span class="text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200 px-1.5 py-0.5 rounded whitespace-nowrap">PESADO</span>`;
    if (exercise.isBackoff) title.innerHTML += `<span class="text-xs font-bold text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded whitespace-nowrap">DESCARGA</span>`;
    if (exercise.isPerLeg) title.innerHTML += `<span class="text-xs font-bold text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200 px-1.5 py-0.5 rounded whitespace-nowrap">POR PIERNA</span>`;
    if (exercise.isPerArm) title.innerHTML += `<span class="text-xs font-bold text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-200 px-1.5 py-0.5 rounded whitespace-nowrap">POR BRAZO</span>`;

    // Exercise Description (Sets, Reps, RPE, Rest)
    const description = document.createElement('div');
    description.className = 'text-sm text-gray-600 dark:text-gray-400 mt-1 flex flex-wrap gap-x-3 gap-y-1';
    description.innerHTML = `
        <span class="flex items-center gap-1">${ICONS.target} Sets: ${exercise.sets * (exercise.isPerLeg || exercise.isPerArm ? 1 : 1)}</span>
        <span class="flex items-center gap-1">${ICONS.repeat} Reps: ${exercise.reps}</span>
        <span class="flex items-center gap-1">${ICONS.dumbbell} RPE: ${exercise.rpe}</span>
        <span class="flex items-center gap-1">${ICONS.clock} Descanso: ${exercise.rest}</span>
    `;

    headerText.appendChild(title);
    headerText.appendChild(description);

    // Exercise Notes
    if (exercise.notes) {
        const notesP = document.createElement('p');
        notesP.className = 'text-xs text-gray-500 dark:text-gray-400 mt-2 italic flex items-start gap-1';
        notesP.innerHTML = `${ICONS.info}<span>${exercise.notes}</span>`;
        headerText.appendChild(notesP);
    }
    // Dropset Indicator
    if (exercise.hasDropset || exercise.hasDropsetLast) {
        const dropsetP = document.createElement('p');
        dropsetP.className = 'text-xs text-orange-600 dark:text-orange-400 mt-1 font-medium';
        dropsetP.textContent = '⚠️ ¡Incluye Dropset!';
        headerText.appendChild(dropsetP);
    }

    // Exercise Completion Checkbox (Top Right)
    const exerciseCheckbox = document.createElement('input');
    exerciseCheckbox.type = 'checkbox';
    exerciseCheckbox.className = 'exercise-completion-checkbox mt-1 flex-shrink-0 h-5 w-5 rounded border-gray-300 dark:border-gray-500 text-blue-600 focus:ring-blue-500 cursor-pointer bg-white dark:bg-gray-600 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800';
    exerciseCheckbox.checked = currentLogData.completed;
    exerciseCheckbox.ariaLabel = `Marcar ${displayExerciseName} como completado`;

    headerFlex.appendChild(headerText);
    headerFlex.appendChild(exerciseCheckbox);
    headerDiv.appendChild(headerFlex);

    // Substitution Select Dropdown (if applicable)
    if (exercise.substitution1 || exercise.substitution2) {
        const subDiv = createSubstitutionSelect(exercise, currentLogData);
        headerDiv.appendChild(subDiv);
    }

    return headerDiv;
};

/**
 * Creates the substitution select dropdown element.
 * @param {object} exercise - The exercise definition object.
 * @param {object} currentLogData - The current log data for this exercise.
 * @returns {HTMLElement} The div containing the select dropdown.
 */
const createSubstitutionSelect = (exercise, currentLogData) => {
    const subDiv = document.createElement('div');
    subDiv.className = 'mt-3'; // Add some space
    const select = document.createElement('select');
    select.className = 'substitution-select w-full md:w-[250px] h-8 text-xs border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-800 dark:text-gray-100';
    select.innerHTML = `
        <option value="" ${!currentLogData.substitutionUsed ? 'selected' : ''}>Usar: ${exercise.name}</option>
        ${exercise.substitution1 ? `<option value="${exercise.substitution1}" ${currentLogData.substitutionUsed === exercise.substitution1 ? 'selected' : ''}>Sustituir por: ${exercise.substitution1}</option>` : ''}
        ${exercise.substitution2 ? `<option value="${exercise.substitution2}" ${currentLogData.substitutionUsed === exercise.substitution2 ? 'selected' : ''}>Sustituir por: ${exercise.substitution2}</option>` : ''}
    `;
    subDiv.appendChild(select);
    return subDiv;
};

/**
 * Creates a row element for a single set within an exercise card.
 * @param {object} set - The set data object from the log.
 * @param {number} setIdx - The index of the set.
 * @param {object} exercise - The exercise definition object.
 * @param {object} currentLogData - The current log data for this exercise.
 * @param {string} displayExerciseName - The name of the exercise being displayed (could be substitution).
 * @returns {HTMLElement} The created set row div element.
 */
const createSetRow = (set, setIdx, exercise, currentLogData, displayExerciseName) => {
    const setRow = document.createElement('div');
    setRow.className = `set-row flex flex-wrap items-center gap-2 p-2 rounded ${set.completed ? 'completed' : 'bg-gray-50 dark:bg-gray-700'}`;

    setRow.innerHTML = `
        <span class="font-medium text-sm w-10 text-center text-gray-600 dark:text-gray-300 flex-shrink-0">Set ${setIdx + 1}</span>
        <input type="text" inputmode="decimal" placeholder="Peso (kg)" value="${set.weight}" class="set-input-weight h-8 text-sm w-24 flex-grow sm:flex-grow-0 border rounded-md px-2" data-set-index="${setIdx}" aria-label="Peso para ${displayExerciseName} set ${setIdx + 1}">
        <input type="text" inputmode="numeric" placeholder="Reps" value="${set.reps}" class="set-input-reps h-8 text-sm w-20 flex-grow sm:flex-grow-0 border rounded-md px-2" data-set-index="${setIdx}" aria-label="Reps para ${displayExerciseName} set ${setIdx + 1}">
        <div class="flex items-center gap-2 flex-shrink-0">
            <input type="checkbox" class="set-completion-checkbox h-4 w-4 rounded border-gray-300 dark:border-gray-500 text-blue-600 focus:ring-blue-500 cursor-pointer bg-white dark:bg-gray-600 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800" data-set-index="${setIdx}" ${set.completed ? 'checked' : ''} aria-label="Marcar set ${setIdx + 1} de ${displayExerciseName} como completado">
            ${(setIdx < currentLogData.sets.length - 1 || exercise.isSuperset === 'A1') ? `
                <button class="start-timer-btn p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-600 dark:text-gray-300" data-rest-time="${parseRestTime(exercise.rest)}" title="Iniciar descanso (${exercise.rest})" ${state.timer.active ? 'disabled' : ''}>
                    ${ICONS.play}
                </button>
            ` : ''}
        </div>
    `;
    return setRow;
};

/**
 * Renders the list of exercises for the current day.
 */
const renderExercises = () => {
    exerciseListContainer.innerHTML = ''; // Clear previous exercises

    // Wait until program data is loaded
    if (!state.programLoaded) {
        exerciseListContainer.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center mt-8">Cargando datos del programa...</p>`;
        return;
    }

    const exercises = getCurrentExercises(state.currentWeek, state.currentDay);

    if (!Array.isArray(exercises) || exercises.length === 0) {
        exerciseListContainer.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center mt-8">No hay ejercicios definidos para la Semana ${state.currentWeek}, Día ${getDisplayDayName(state.currentDay)}.</p>`;
        return;
    }

    exercises.forEach((exercise) => {
        if (!exercise || !exercise.name) {
            console.error("Skipping invalid exercise object during render:", exercise);
            return;
        }

        // Ensure log data exists for this exercise, initialize if not
        let currentLogData = state.workoutLog[exercise.name];
        if (!currentLogData) {
            const tempInit = initializeWorkoutLog([exercise]);
            state.workoutLog[exercise.name] = tempInit[exercise.name];
            currentLogData = state.workoutLog[exercise.name];
            if (!currentLogData) {
                console.error("Failed to initialize log data for", exercise.name);
                return; // Skip rendering this exercise if init failed
            }
        }

        const displayExerciseName = currentLogData.substitutionUsed || exercise.name;

        // Create exercise card container
        const card = document.createElement('div');
        card.classList.add('exercise-card', 'rounded-lg', 'shadow-sm', 'overflow-hidden', 'border');
        card.classList.toggle('completed', currentLogData.completed);
        if (!currentLogData.completed) {
            card.classList.add('bg-white', 'dark:bg-gray-800', 'border-gray-200', 'dark:border-gray-600');
        }
        card.dataset.exerciseName = exercise.name; // Use original name for data linking

        // Create and append header
        const headerDiv = createExerciseCardHeader(exercise, currentLogData);
        card.appendChild(headerDiv);

        // Create card content (Sets)
        const contentDiv = document.createElement('div');
        contentDiv.className = 'p-4 space-y-2';

        if (Array.isArray(currentLogData.sets)) {
            currentLogData.sets.forEach((set, setIdx) => {
                const setRow = createSetRow(set, setIdx, exercise, currentLogData, displayExerciseName);
                contentDiv.appendChild(setRow);
            });
        } else {
            contentDiv.innerHTML = `<p class="text-red-500 text-xs">Error al cargar sets.</p>`;
        }

        // Notes Input
        const notesInput = document.createElement('input');
        notesInput.type = 'text';
        notesInput.placeholder = 'Notas del ejercicio...';
        notesInput.value = currentLogData.notes || '';
        notesInput.className = 'notes-input h-8 text-sm mt-2 w-full border rounded-md px-2';
        notesInput.ariaLabel = `Notas para ${displayExerciseName}`;
        contentDiv.appendChild(notesInput);

        // Append content to the card
        card.appendChild(contentDiv);

        // Append the card to the main container
        exerciseListContainer.appendChild(card);
    });

    focusFirstWeightInput();
};


// -- History Rendering --
const renderHistory = () => {
    historyListContainer.innerHTML = ''; // Clear previous history
    if (state.history.length === 0) {
        historyListContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400">Aún no has guardado ninguna rutina.</p>';
        return;
    }

    // Sort history by ID (timestamp) descending to show newest first
    const sortedHistory = [...state.history].sort((a, b) => b.id - a.id);

    sortedHistory.forEach(entry => {
        const card = document.createElement('div');
        card.classList.add('rounded-lg', 'shadow-sm', 'overflow-hidden', 'bg-white', 'dark:bg-gray-800', 'border', 'border-gray-200', 'dark:border-gray-600');

        let dayDisplayName = getDisplayDayName(entry.day); // Get the display name

        let entryHTML = `
            <div class="p-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <p class="text-sm font-medium text-gray-800 dark:text-gray-100">
                    ${entry.date} - Semana ${entry.week} (${dayDisplayName})
                </p>
            </div>
            <div class="p-3 text-sm">
                <ul class="space-y-1" role="list">`; // Added role

        if (Array.isArray(entry.workout)) {
            entry.workout.forEach(ex => {
                entryHTML += `<li class="text-gray-700 dark:text-gray-300 py-1">
                    <strong class='font-medium text-gray-900 dark:text-gray-100'>${ex.substitutionUsed ? `${ex.name} (Sust.)` : ex.name}:</strong>`; // Indicate substitution

                if (ex.completed && (!ex.sets || ex.sets.length === 0)) {
                    entryHTML += `<span class="text-green-600 dark:text-green-400 ml-1 text-xs">(Completado)</span>`;
                }

                if (Array.isArray(ex.sets) && ex.sets.length > 0) {
                    entryHTML += `<span class="ml-1 block sm:inline">`; // Allow wrapping
                    ex.sets.forEach(s => {
                        const setClass = s.completed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200';
                        entryHTML += `<span class="mr-2 mb-1 inline-block text-xs py-0.5 px-1.5 rounded ${setClass}">
                            ${s.weight || '0'}kg x ${s.reps || '0'}r ${s.completed ? ICONS.check : ''}
                        </span>`;
                    });
                    entryHTML += `</span>`;
                }

                if (ex.notes) {
                    entryHTML += `<span class="text-xs italic text-gray-500 dark:text-gray-400 block ml-4 mt-1">Nota: ${ex.notes}</span>`;
                }
                entryHTML += `</li>`;
            });
        }
        entryHTML += `</ul></div>`;

        card.innerHTML = entryHTML;
        historyListContainer.appendChild(card);
    });
};

// -- Timer Rendering (Optimized) --
/**
 * Updates only the dynamic parts of the timer display (time, progress bar).
 * Assumes the timer DOM structure already exists.
 */
const updateTimerDisplay = () => {
    const timerTimeElement = timerDisplayContainer.querySelector('.timer-time');
    const progressBarElement = document.getElementById('timer-progress-bar');

    if (timerTimeElement) {
        timerTimeElement.textContent = `Descanso: ${formatTime(state.timer.seconds)}`;
    }
    if (progressBarElement) {
        const percentage = state.timer.duration > 0 ? (state.timer.seconds / state.timer.duration) * 100 : 0;
        progressBarElement.style.width = `${percentage}%`;
    }
};

/**
 * Creates or removes the timer's DOM structure based on its state.
 */
const renderTimerStructure = () => {
    const timerShouldBeVisible = state.timer.active || state.timer.seconds > 0;

    if (timerShouldBeVisible) {
        // If timer needs to be visible but structure doesn't exist, create it
        if (!timerDisplayContainer.firstChild || timerDisplayContainer.dataset.timerActive !== String(state.timer.active)) {
            timerDisplayContainer.innerHTML = `
                <div class="timer-card p-3 bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm shadow-xl border border-blue-200 dark:border-blue-700 rounded-lg max-w-md mx-auto">
                    <div class="flex items-center justify-between gap-3">
                        <div class='flex items-center gap-2'>
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 dark:text-blue-400 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span class="timer-time text-lg font-semibold text-blue-700 dark:text-blue-300">Descanso: ${formatTime(state.timer.seconds)}</span>
                        </div>
                        <div class="flex gap-1">
                            ${state.timer.active ?
                                `<button id="pause-timer-btn" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300" title="Pausar Timer">${ICONS.pause}</button>` :
                                `<button id="resume-timer-btn" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300" title="Reanudar Timer">${ICONS.play}</button>`
                            }
                            <button id="reset-timer-btn" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300" title="Reiniciar Timer">${ICONS.rotateCcw}</button>
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div id="timer-progress-bar" class="bg-blue-500 h-1.5 rounded-full transition-width duration-1000 ease-linear" style="width: ${state.timer.duration > 0 ? (state.timer.seconds / state.timer.duration) * 100 : 0}%"></div>
                    </div>
                </div>
            `;
            timerDisplayContainer.dataset.timerActive = String(state.timer.active); // Store state

            // Add event listeners to the newly created buttons
            if (state.timer.active) {
                document.getElementById('pause-timer-btn')?.addEventListener('click', pauseTimer);
            } else {
                document.getElementById('resume-timer-btn')?.addEventListener('click', resumeTimer);
            }
            document.getElementById('reset-timer-btn')?.addEventListener('click', resetTimer);
        }
        // Always update the dynamic parts if the structure exists
        updateTimerDisplay();

    } else {
        // If timer should not be visible, clear the container and enable start buttons
        timerDisplayContainer.innerHTML = '';
        timerDisplayContainer.removeAttribute('data-timer-active'); // Clear state attribute
        document.querySelectorAll('.start-timer-btn').forEach(btn => btn.disabled = false);
    }

    // Disable start buttons if timer is running or paused with time remaining
    if (timerShouldBeVisible) {
        document.querySelectorAll('.start-timer-btn').forEach(btn => btn.disabled = true);
    }
};

/**
 * The main animation loop callback for the timer.
 * Only updates the dynamic display parts.
 */
const timerRafCallback = () => {
    if (!state.timer.active) {
        state.timer._rafId = null; // Stop the loop if timer becomes inactive
        return;
    }
    updateTimerDisplay(); // Update time and progress bar
    state.timer._rafId = requestAnimationFrame(timerRafCallback); // Continue the loop
};


// -- UI Update --
// Helper to get display name for the day
const getDisplayDayName = (dayKey) => {
    switch (dayKey) {
        case 'upperA': return 'Tren Superior A';
        case 'lowerA': return 'Tren Inferior A';
        case 'upperB': return 'Tren Superior B';
        case 'lowerB': return 'Tren Inferior B';
        default: return 'Desconocido';
    }
}

const updateUI = () => {
    // Update main title only if program data is loaded
    if (state.programLoaded) {
        mainTitle.innerHTML = `Semana ${state.currentWeek} <span class="text-base font-normal text-gray-600 dark:text-gray-400">(${getDisplayDayName(state.currentDay)})</span>`;

        // Enable/disable week navigation buttons
        const maxWeek = programData.length > 0 ? Math.max(...programData.map(p => p.week)) : 1;
        prevWeekBtn.disabled = state.currentWeek <= 1;
        nextWeekBtn.disabled = state.currentWeek >= maxWeek;

    } else {
        mainTitle.textContent = 'Cargando Programa...';
        prevWeekBtn.disabled = true;
        nextWeekBtn.disabled = true;
    }


    // Update active tab button
    Object.keys(tabButtons).forEach(key => {
        tabButtons[key]?.classList.toggle('active', state.currentDay === key);
    });

    // Re-render dynamic parts of the UI
    renderExercises(); // Will show loading message if program not ready
    renderHistory();
    renderTimerStructure(); // Update timer structure/visibility
};


// --- Timer Logic ---
const startTimer = (durationInSeconds) => {
    if (state.timer.intervalId) clearInterval(state.timer.intervalId); // Clear existing interval
    if (state.timer._rafId) cancelAnimationFrame(state.timer._rafId); // Clear existing animation frame

    const validDuration = Number.isFinite(durationInSeconds) && durationInSeconds >= 0 ? durationInSeconds : DEFAULT_REST_TIME_SECONDS;
    state.timer.duration = validDuration;
    state.timer.seconds = validDuration;
    state.timer.active = true;

    // Start the interval timer for logic (decrementing seconds)
    if (validDuration > 0) {
        state.timer.intervalId = setInterval(timerTickLogic, 1000);
    }

    // Update the UI structure immediately
    renderTimerStructure();

    // Start the animation frame loop for visual updates
    if (validDuration > 0) {
        state.timer._rafId = requestAnimationFrame(timerRafCallback);
    }
};

const pauseTimer = () => {
    state.timer.active = false;
    if (state.timer.intervalId) {
        clearInterval(state.timer.intervalId);
        state.timer.intervalId = null;
    }
    if (state.timer._rafId) {
        cancelAnimationFrame(state.timer._rafId);
        state.timer._rafId = null; // Important to nullify so rAF loop stops
    }
    // Update UI to show resume button etc.
    renderTimerStructure();
};

const resumeTimer = () => {
    if (!state.timer.active && state.timer.seconds > 0) {
        state.timer.active = true;
        if (state.timer.intervalId) clearInterval(state.timer.intervalId); // Clear just in case
        state.timer.intervalId = setInterval(timerTickLogic, 1000);

        // Restart animation frame loop
        if (!state.timer._rafId) {
            state.timer._rafId = requestAnimationFrame(timerRafCallback);
        }
        // Update UI to show pause button etc.
        renderTimerStructure();
    }
};

const resetTimer = () => {
    state.timer.active = false;
    if (state.timer.intervalId) {
        clearInterval(state.timer.intervalId);
        state.timer.intervalId = null;
    }
    if (state.timer._rafId) {
        cancelAnimationFrame(state.timer._rafId);
        state.timer._rafId = null;
    }
    state.timer.seconds = state.timer.duration; // Reset to original duration
    // Update UI (will show the reset time, paused state)
    renderTimerStructure();
};

/**
 * Handles the logic for each timer tick (decrementing seconds, checking finish).
 * Does NOT handle visual updates (that's done by rAF).
 */
const timerTickLogic = () => {
    if (!state.timer.active) return; // Should not run if paused, but check anyway

    state.timer.seconds--;

    if (state.timer.seconds <= 0) {
        state.timer.seconds = 0;
        state.timer.active = false;
        if (state.timer.intervalId) {
            clearInterval(state.timer.intervalId);
            state.timer.intervalId = null;
        }
        // Stop rAF loop explicitly here too
        if (state.timer._rafId) {
            cancelAnimationFrame(state.timer._rafId);
            state.timer._rafId = null;
        }


        showNotification('¡Tiempo de descanso terminado!', 'info');
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.9, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.error("Web Audio API failed:", e);
        }

        // Update UI (will clear the timer display and re-enable buttons)
        renderTimerStructure();
    }
    // No visual update here, handled by rAF
};


// --- Event Handlers ---
const handleWeekChange = (direction) => {
    if (!state.programLoaded) return; // Prevent changing week if program not loaded
    const newWeek = state.currentWeek + direction;
    const maxWeek = programData.length > 0 ? Math.max(...programData.map(p => p.week)) : 1;
    if (newWeek >= 1 && newWeek <= maxWeek) {
        state.currentWeek = newWeek;
        pauseTimer();
        state.timer.seconds = 0;
        loadWorkoutLog();
        updateUI();
    }
};

const handleDayChange = (day) => {
    if (day !== state.currentDay) {
        state.currentDay = day;
        pauseTimer();
        state.timer.seconds = 0;
        loadWorkoutLog(); // Load log for the new context
        updateUI();
    }
};

const handleSetInputChange = (exerciseName, setIndex, field, value) => {
    const isValidInput = (field === 'weight')
        ? (value === '' || /^\d*\.?\d*$/.test(value))
        : (value === '' || /^\d*$/.test(value));

    if (!isValidInput) {
        console.warn(`Invalid input ignored for ${field}: ${value}`);
        return;
    }

    if (state.workoutLog[exerciseName]?.sets?.[setIndex] !== undefined) {
        state.workoutLog[exerciseName].sets[setIndex][field] = value;
        saveWorkoutLog();
    } else {
        console.error(`Log error: Could not find state.workoutLog[${exerciseName}].sets[${setIndex}]`);
    }
};

const handleSetCompletionToggle = (exerciseName, setIndex) => {
    if (state.workoutLog[exerciseName]?.sets?.[setIndex] !== undefined) {
        const currentSet = state.workoutLog[exerciseName].sets[setIndex];
        currentSet.completed = !currentSet.completed;

        const allSetsCompleted = state.workoutLog[exerciseName].sets.every(set => set.completed);
        state.workoutLog[exerciseName].completed = allSetsCompleted;

        saveWorkoutLog();

        // Update UI for this specific set and the overall exercise card
        const card = document.querySelector(`.exercise-card[data-exercise-name="${exerciseName}"]`);
        if (card) {
            const setRow = card.querySelectorAll('.set-row')[setIndex];
            if (setRow) {
                setRow.classList.toggle('completed', currentSet.completed);
                const setCheckbox = setRow.querySelector('.set-completion-checkbox');
                if (setCheckbox) setCheckbox.checked = currentSet.completed;
            }
            card.classList.toggle('completed', allSetsCompleted);
            const exerciseCheckbox = card.querySelector('.exercise-completion-checkbox');
            if (exerciseCheckbox) exerciseCheckbox.checked = allSetsCompleted;
        }
    } else {
        console.error(`Log error: Could not find state.workoutLog[${exerciseName}].sets[${setIndex}]`);
    }
};

const handleExerciseCompletionToggle = (exerciseName) => {
    if (state.workoutLog[exerciseName]) {
        const currentLog = state.workoutLog[exerciseName];
        currentLog.completed = !currentLog.completed;

        if (Array.isArray(currentLog.sets)) {
            currentLog.sets.forEach(set => set.completed = currentLog.completed);
        }

        saveWorkoutLog();

        // Update UI for the entire card
        const card = document.querySelector(`.exercise-card[data-exercise-name="${exerciseName}"]`);
        if (card) {
            card.classList.toggle('completed', currentLog.completed);
            card.querySelectorAll('.set-row').forEach(row => {
                row.classList.toggle('completed', currentLog.completed);
                const setCheckbox = row.querySelector('.set-completion-checkbox');
                if (setCheckbox) setCheckbox.checked = currentLog.completed;
            });
            const exerciseCheckbox = card.querySelector('.exercise-completion-checkbox');
            if (exerciseCheckbox) exerciseCheckbox.checked = currentLog.completed;
        }
    } else {
        console.error(`Log error: Could not find state.workoutLog[${exerciseName}]`);
    }
};

const handleNotesChange = (exerciseName, value) => {
    if (state.workoutLog[exerciseName]) {
        state.workoutLog[exerciseName].notes = value;
        saveWorkoutLog();
    } else {
        console.error(`Log error: Could not find state.workoutLog[${exerciseName}]`);
    }
};

const handleSubstitutionChange = (exerciseName, subValue) => {
    if (state.workoutLog[exerciseName]) {
        state.workoutLog[exerciseName].substitutionUsed = subValue || null;
        saveWorkoutLog();
        skipNextFocus = true;
        updateUI(); // Re-render to show the new exercise name
    } else {
        console.error(`Log error: Could not find state.workoutLog[${exerciseName}]`);
    }
};

/**
 * Formats the current workout log data into a structure suitable for saving to history.
 * @param {object} workoutLog - The current state.workoutLog.
 * @param {Array} currentExercises - The exercise definitions for the current day.
 * @returns {Array|null} An array of formatted exercise objects to save, or null if nothing to save.
 */
const formatWorkoutDataForSave = (workoutLog, currentExercises) => {
    if (!currentExercises || currentExercises.length === 0) {
        return null;
    }

    const exercisesToSave = currentExercises.map(exercise => {
        const logData = workoutLog[exercise.name];
        if (!logData) return null; // Skip if no log data

        const loggedSets = Array.isArray(logData.sets)
            ? logData.sets.filter(set => set.weight || set.reps || set.completed)
            : [];

        // Skip if not completed AND no sets logged
        if (loggedSets.length === 0 && !logData.completed) return null;

        return {
            name: logData.substitutionUsed || exercise.name, // Use substitution name if present
            completed: logData.completed,
            sets: loggedSets.map(s => ({
                weight: s.weight || '0',
                reps: s.reps || '0',
                completed: s.completed
            })),
            notes: logData.notes || '',
            substitutionUsed: logData.substitutionUsed || null,
        };
    }).filter(Boolean); // Remove null entries

    return exercisesToSave.length > 0 ? exercisesToSave : null;
};

/**
 * Handles the process of saving the completed workout to history.
 */
const handleSaveWorkout = () => {
    if (!state.programLoaded) {
        showNotification("Los datos del programa aún no se han cargado.", "error");
        return;
    }
    const exercises = getCurrentExercises(state.currentWeek, state.currentDay);
    const exercisesToSave = formatWorkoutDataForSave(state.workoutLog, exercises);

    if (!exercisesToSave) {
        showNotification("No se registró ningún dato o ejercicio completado para guardar.", "error");
        return;
    }

    // Get current date and time
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = today.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

    // Create the history entry
    const newEntry = {
        id: Date.now(),
        date: `${formattedDate} ${formattedTime}`,
        week: state.currentWeek,
        day: state.currentDay,
        workout: exercisesToSave
    };

    // Add to history and save
    state.history.unshift(newEntry);
    saveHistory();

    // Clear current log and timer
    clearWorkoutLogFromStorage();
    state.workoutLog = initializeWorkoutLog(exercises); // Reset state log
    pauseTimer();
    state.timer.seconds = 0;

    // Notify user and update UI
    showNotification("Rutina guardada exitosamente.", "success");
    updateUI(); // Refresh display

    // Scroll to history
    setTimeout(() => {
        const historySection = document.getElementById('history-list');
        historySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
};


const handleClearWorkout = () => {
    if (!state.programLoaded) return; // Don't clear if program isn't loaded

    if (window.confirm("¿Estás seguro de que quieres borrar todo el progreso de la rutina actual? Esta acción no se puede deshacer.")) {
        const exercises = getCurrentExercises(state.currentWeek, state.currentDay);
        clearWorkoutLogFromStorage();
        state.workoutLog = initializeWorkoutLog(exercises);
        pauseTimer();
        state.timer.seconds = 0;
        showNotification("Progreso de la rutina actual borrado.", "info");
        updateUI();
    }
};

const handleClearHistory = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar todo el historial guardado? Esta acción no se puede deshacer.")) {
        state.history = [];
        saveHistory();
        showNotification("Historial eliminado.", "info");
        updateUI(); // Re-render history section (will show empty message)
    }
};

// --- Event Listener Setup ---
const addExerciseEventListeners = () => {
    // Use event delegation on the container

    // Handle input changes (live typing)
    exerciseListContainer.addEventListener('input', (e) => {
        const target = e.target;
        const card = target.closest('.exercise-card');
        if (!card) return;
        const exerciseName = card.dataset.exerciseName;
        if (!exerciseName) return;

        if (target.matches('.set-input-weight, .set-input-reps')) {
            const setIndex = parseInt(target.dataset.setIndex, 10);
            const field = target.classList.contains('set-input-weight') ? 'weight' : 'reps';
            handleSetInputChange(exerciseName, setIndex, field, target.value);
        } else if (target.matches('.notes-input')) {
            handleNotesChange(exerciseName, target.value);
        }
    });

    // Handle changes on blur or selection (checkboxes, select)
    exerciseListContainer.addEventListener('change', (e) => {
        const target = e.target;
        const card = target.closest('.exercise-card');
        if (!card) return;
        const exerciseName = card.dataset.exerciseName;
        if (!exerciseName) return;

        if (target.matches('.set-completion-checkbox')) {
            const setIndex = parseInt(target.dataset.setIndex, 10);
            handleSetCompletionToggle(exerciseName, setIndex);
        } else if (target.matches('.exercise-completion-checkbox')) {
            handleExerciseCompletionToggle(exerciseName);
        } else if (target.matches('.substitution-select')) {
            handleSubstitutionChange(exerciseName, target.value);
        }
    });

    // Handle clicks on start timer buttons
    exerciseListContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.start-timer-btn');
        if (target) {
            const restTime = parseInt(target.dataset.restTime, 10);
            if (!isNaN(restTime)) {
                startTimer(restTime);
            } else {
                console.warn("Invalid rest time data:", target.dataset.restTime);
                startTimer(DEFAULT_REST_TIME_SECONDS); // Fallback
            }
        }
    });

    // Handle blur events for input validation feedback
    exerciseListContainer.addEventListener('blur', (e) => {
        const target = e.target;
        const card = target.closest('.exercise-card');
        if (!card) return;
        const exerciseName = card.dataset.exerciseName;
        if (!exerciseName || !state.workoutLog[exerciseName]) return;

        if (target.matches('.set-input-weight')) {
            const setIndex = parseInt(target.dataset.setIndex, 10);
            const value = target.value;
            const isValid = value === '' || /^\d*\.?\d*$/.test(value);
            if (!isValid && value !== '') {
                target.value = state.workoutLog[exerciseName]?.sets[setIndex]?.weight || '';
                showNotification(`Peso inválido introducido: "${value}". Use solo números y un punto decimal opcional.`, 'error', NOTIFICATION_DURATION_ERROR);
            } else if (value.endsWith('.')) {
                target.value = value.slice(0, -1);
                handleSetInputChange(exerciseName, setIndex, 'weight', target.value);
            }
        } else if (target.matches('.set-input-reps')) {
            const setIndex = parseInt(target.dataset.setIndex, 10);
            const value = target.value;
            const isValid = value === '' || /^\d+$/.test(value);
            if (!isValid && value !== '') {
                target.value = state.workoutLog[exerciseName]?.sets[setIndex]?.reps || '';
                showNotification(`Número de repeticiones inválido: "${value}". Use solo números enteros.`, 'error', NOTIFICATION_DURATION_ERROR);
            }
        }
    }, true); // Use capture phase
};

const addGlobalEventListeners = () => {
    prevWeekBtn?.addEventListener('click', () => handleWeekChange(-1));
    nextWeekBtn?.addEventListener('click', () => handleWeekChange(1));

    Object.keys(tabButtons).forEach(dayKey => {
        tabButtons[dayKey]?.addEventListener('click', () => handleDayChange(dayKey));
    });

    saveWorkoutBtn?.addEventListener('click', handleSaveWorkout);
    clearWorkoutBtn?.addEventListener('click', handleClearWorkout);
    darkModeToggle?.addEventListener('click', toggleDarkMode);
    clearHistoryBtn?.addEventListener('click', handleClearHistory);

    // Keyboard shortcut for saving
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            handleSaveWorkout();
        }
    });
};

// --- Initialization ---
/**
 * Loads the program data from the external JSON file.
 */
const loadProgramData = async () => {
    try {
        const response = await fetch(PROGRAM_DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        programData = await response.json();
        state.programLoaded = true;
        console.log("Program data loaded successfully.");
    } catch (error) {
        console.error("Failed to load program data:", error);
        showNotification("Error fatal: No se pudo cargar el programa de ejercicios. Intenta recargar la página.", "error", 10000);
        // Optionally disable parts of the UI if program fails to load
        mainTitle.textContent = 'Error al Cargar Programa';
        prevWeekBtn.disabled = true;
        nextWeekBtn.disabled = true;
        Object.values(tabButtons).forEach(btn => btn.disabled = true);
        saveWorkoutBtn.disabled = true;
        clearWorkoutBtn.disabled = true;
        exerciseListContainer.innerHTML = `<p class="text-red-500 dark:text-red-400 text-center mt-8">Error al cargar el programa. Por favor, revisa que el archivo '${PROGRAM_DATA_URL}' exista y sea válido.</p>`;
    }
};

/**
 * Initializes the application after the DOM is loaded.
 */
const initializeApp = async () => {
    loadDarkModePreference(); // Load dark mode first
    loadHistory();          // Load history
    addGlobalEventListeners(); // Set up static listeners
    addExerciseEventListeners(); // Set up dynamic listeners
    updateUI();             // Initial render (will show loading state for exercises)

    await loadProgramData(); // Load the program data

    // Once program data is loaded, load the log and update UI again
    if (state.programLoaded) {
        loadWorkoutLog();   // Load log based on the loaded program
        updateUI();         // Final render with exercises
    }
};

// --- Run App ---
document.addEventListener('DOMContentLoaded', initializeApp);
