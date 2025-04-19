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

// --- Program Data Structure (4 days per week) ---
// Define Base Blocks First
const block1_days = {
      upperA: [ // Based on PDF Page 20
        { name: "Press Plano con Mancuernas (Pesado)", sets: 1, reps: "4-6", rpe: "8-9", rest: "~3 min", notes: "Enfócate en la fuerza aquí. Cada semana añade peso o reps. Mantén la forma consistente.", substitution1: "Fondos con Lastre", substitution2: "Press de Pecho en Máquina", isHeavy: true },
        { name: "Press Plano con Mancuernas (Descarga)", sets: 1, reps: "8-10", rpe: "9-10", rest: "~3 min", notes: "Enfócate en la conexión mente-músculo con los pectorales. Baja el peso y enfócate en el estiramiento y la contracción.", substitution1: "Fondos con Lastre", substitution2: "Press de Pecho en Máquina", isBackoff: true },
        { name: "Jalón al Pecho (2 agarres)", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Primer set agarre prono ancho (1.5x ancho hombros), segundo set agarre supino (1x ancho hombros).", substitution1: "Jalón en Máquina (Pulldown)", substitution2: "Dominadas (2 agarres)", },
        { name: "Press de Hombro Sentado con Mancuernas", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Baja las mancuernas completamente, mantén el torso erguido.", substitution1: "Press Arnold de Pie con Mancuernas", substitution2: "Press de Hombro en Máquina" },
        { name: "Remo Sentado en Cable", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Enfócate en juntar las escápulas, lleva los codos hacia abajo y atrás. Solo en el último set haz un dropset: realiza 10-12 reps, baja el peso ~50%, realiza 10-12 reps adicionales.", substitution1: "Remo en Barra T con Apoyo de Pecho", substitution2: "Remo Inclinado con Mancuernas y Apoyo de Pecho", hasDropsetLast: true },
        { name: "A1: Rompecráneos con Barra EZ", sets: 2, reps: "12-15", rpe: "10", rest: "0 min", notes: "Lleva la barra en arco por detrás de la cabeza, tensión constante en tríceps.", substitution1: "Press Francés con Mancuerna", substitution2: "Extensión de Tríceps sobre la Cabeza en Cable", isSuperset: "A1" },
        { name: "A2: Curl con Barra EZ", sets: 2, reps: "12-15", rpe: "10", rest: "~1.5 min", notes: "Lleva la barra en arco hacia afuera, no hacia arriba\", enfócate en contraer los bíceps.", substitution1: "Curl en Cable con Barra EZ", substitution2: "Curl con Mancuernas", isSuperset: "A2" },
      ],
      lowerA: [ // Based on PDF Page 21
        { name: "Sentadilla Hack (Pesado)", sets: 1, reps: "4-6", rpe: "8-9", rest: "~3 min", notes: "Enfócate en la fuerza aquí. Cada semana añade peso o reps. Mantén la forma consistente.", substitution1: "Prensa de Piernas", substitution2: "Sentadilla en Máquina", isHeavy: true },
        { name: "Sentadilla Hack (Descarga)", sets: 1, reps: "8-10", rpe: "8-9", rest: "~3 min", notes: "Baja el peso y enfócate en controlar la negativa. Tempo de repetición suave y consistente.", substitution1: "Prensa de Piernas", substitution2: "Sentadilla en Máquina", isBackoff: true },
        { name: "Curl Femoral Sentado", sets: 1, reps: "10-12", rpe: "10", rest: "~1.5 min", notes: "Dropset: realiza 10-12 reps, baja el peso ~50%, realiza 10-12 reps adicionales. Hazlo sentado si está disponible. Si no, haz Curl Femoral Tumbado o Curl Nórdico.", substitution1: "Curl Femoral Tumbado", substitution2: "Curl Nórdico de Isquios", hasDropset: true },
        { name: "A1: Elevación de Talones de Pie", sets: 2, reps: "10-12", rpe: "9-10", rest: "0 min", notes: "Presiona hasta ponerte de puntillas, estira los gemelos abajo, no rebotes.", substitution1: "Elevación de Talones en Prensa", substitution2: "Elevación de Talones Sentado", isSuperset: "A1" },
        { name: "A2: Elevación de Piernas Colgado", sets: 2, reps: "10-12", rpe: "9-10", rest: "~1.5 min", notes: "Rodillas al pecho, reps controladas, estira más las piernas para aumentar dificultad.", substitution1: "Crunch Inverso", substitution2: "Crunch en Silla Romana", isSuperset: "A2" },
      ],
      upperB: [ // Based on PDF Page 22
        { name: "Remo Pendlay", sets: 2, reps: "8-10", rpe: "9-10", rest: "~2 min", notes: "Inicia el movimiento juntando las escápulas, tira hacia la parte baja del pecho, evita usar impulso.", substitution1: "Remo Sentado en Cable", substitution2: "Remo en Barra T" },
        { name: "Press de Hombro en Máquina", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "No pares entre repeticiones, mantén tensión suave y controlada en los deltoides.", substitution1: "Press Arnold de Pie con Mancuernas", substitution2: "Press de Hombro Sentado con Mancuernas" },
        { name: "Dominadas Agarre Neutro", sets: 2, reps: "8-10", rpe: "9-10", rest: "~2 min", notes: "Tira de los codos hacia abajo y adentro, minimiza el balanceo.", substitution1: "Dominadas con Lastre", substitution2: "Jalón al Pecho" },
        { name: "Press en Cable para Pecho", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Puede hacerse sentado o de pie. Enfócate en contraer el pecho. Último set dropset: 10-12 reps, baja peso ~50%, haz 10-12 reps adicionales.", substitution1: "Fondos con Lastre", substitution2: "Press Plano con Mancuernas", hasDropsetLast: true },
        { name: "A1: Curl Bayesiano en Cable", sets: 2, reps: "12-15", rpe: "10", rest: "0 min", notes: "Mantén el codo detrás del torso durante todo el rango, enfócate en contraer el bíceps. Sets por brazo.", substitution1: "Curl Inclinado con Mancuernas", substitution2: "Curl con Mancuernas", isSuperset: "A1", isPerArm: true, setsAreTotal: true },
        { name: "A2: Empuje de Tríceps (Pressdown)", sets: 2, reps: "12-15", rpe: "10", rest: "~1.5 min", notes: "Enfócate en contraer los tríceps para mover el peso.", substitution1: "Patada de Tríceps con Mancuerna", substitution2: "Patada de Tríceps en Cable", isSuperset: "A2" },
        { name: "Elevación Lateral con Mancuernas", sets: 1, reps: "12-15", rpe: "10", rest: "~1.5 min", notes: "Dropset: 12-15 reps, baja peso ~50%, haz 12-15 reps adicionales. Eleva las mancuernas hacia afuera, no hacia arriba, conexión mente-músculo con fibras medias.", substitution1: "Elevación Lateral en Cable", substitution2: "Elevación Lateral en Máquina", hasDropset: true },
      ],
      lowerB: [ // Based on PDF Page 23
        { name: "Peso Muerto Rumano", sets: 2, reps: "10-12", rpe: "8-9", rest: "~2 min", notes: "Mantén lumbar neutra, lleva caderas atrás, no permitas que la columna se redondee.", substitution1: "Hiperextensión 45°", substitution2: "Peso Muerto Rumano con Mancuernas" },
        { name: "Prensa de Piernas", sets: 3, reps: "10-12", rpe: "8-9", rest: "~2 min", notes: "Posición de pies media en la plataforma, no permitas que la lumbar se redondee.", substitution1: "Sentadilla Goblet", substitution2: "Zancadas con Mancuernas" },
        { name: "Extensión de Cuádriceps", sets: 1, reps: "10-12", rpe: "9-10", rest: "~1.5 min", notes: "Dropset: 10-12 reps, baja peso ~50%, haz 10-12 reps adicionales. Enfócate en contraer los cuádriceps para mover el peso.", substitution1: "Sentadilla Goblet", substitution2: "Zancada con Step-Up (Mancuerna)", hasDropset: true },
        { name: "A1: Elevación de Talones Sentado", sets: 2, reps: "12-15", rpe: "10", rest: "0 min", notes: "Presiona hasta ponerte de puntillas, estira gemelos abajo, no rebotes.", substitution1: "Elevación de Talones en Prensa", substitution2: "Elevación de Talones de Pie", isSuperset: "A1" },
        { name: "A2: Crunch en Cable", sets: 2, reps: "12-15", rpe: "10", rest: "~1.5 min", notes: "Redondea la espalda al hacer crunch.", substitution1: "Crunch con Peso (Placa)", substitution2: "Crunch en Máquina", isSuperset: "A2" },
      ],
    };
const block2_days = {
      upperA: [ // Based on PDF Page 36
        { name: "Jalón al Pecho (2 agarres)", sets: 2, reps: "8-10", rpe: "9-10", rest: "~2 min", notes: "Primer set agarre 1.5x ancho hombros. Segundo set agarre 1.0x ancho hombros.", substitution1: "Jalón en Máquina (Pulldown)", substitution2: "Dominadas (2 agarres)" },
        { name: "Fondos con Lastre (Pesado)", sets: 1, reps: "6-8", rpe: "8-9", rest: "~3 min", notes: "Codos a 45°, inclina torso 15° adelante, agarre ancho de hombros o ligeramente más.", substitution1: "Press Plano con Mancuernas", substitution2: "Press de Pecho en Máquina", isHeavy: true },
        { name: "Fondos con Lastre (Descarga)", sets: 1, reps: "10-12", rpe: "9-10", rest: "~3 min", notes: "Codos a 45°, inclina torso 15° adelante, agarre ancho de hombros o ligeramente más.", substitution1: "Press Plano con Mancuernas", substitution2: "Press de Pecho en Máquina", isBackoff: true },
        { name: "Remo Inclinado con Mancuernas y Apoyo de Pecho", sets: 2, reps: "8-10", rpe: "9-10", rest: "~2 min", notes: "Mantén codos a ~30° del torso. Tira del peso hacia tu ombligo.", substitution1: "Remo Sentado en Cable", substitution2: "Remo en Barra T con Apoyo de Pecho" },
        { name: "Press Arnold de Pie con Mancuernas", sets: 2, reps: "8-10", rpe: "9-10", rest: "~2 min", notes: "Empieza con codos al frente y palmas hacia adentro. Rota las mancuernas para que las palmas miren al frente al presionar.", substitution1: "Press de Hombro Sentado con Mancuernas", substitution2: "Press de Hombro en Máquina" },
        { name: "A1: Curl Inclinado con Mancuernas", sets: 2, reps: "15-20", rpe: "10", rest: "0 min", notes: "Apoya espalda alta en banco inclinado a 45°, mantén hombros atrás al hacer curl.", substitution1: "Curl con Barra EZ", substitution2: "Curl en Cable con Barra EZ", isSuperset: "A1" },
        { name: "A2: Press Francés con Mancuerna", sets: 2, reps: "15-20", rpe: "10", rest: "~1.5 min", notes: "Puede hacerse sentado o de pie. Presiona la mancuerna recto arriba y abajo detrás de la cabeza.", substitution1: "Rompecráneos con Barra EZ", substitution2: "Extensión de Tríceps sobre la Cabeza en Cable", isSuperset: "A2" },
      ],
      lowerA: [ // Based on PDF Page 37
        { name: "Prensa de Piernas a Una Pierna (Pesado)", sets: 1, reps: "6-8", rpe: "8-9", rest: "~3 min", notes: "Posición de pies alta y ancha, empieza con la pierna más débil.", substitution1: "Sentadilla Hack", substitution2: "Sentadilla en Máquina", isHeavy: true, isPerLeg: true },
        { name: "Prensa de Piernas a Una Pierna (Descarga)", sets: 1, reps: "10-12", rpe: "8-9", rest: "~3 min", notes: "Posición de pies alta y ancha, empieza con la pierna más débil.", substitution1: "Sentadilla Hack", substitution2: "Sentadilla en Máquina", isBackoff: true, isPerLeg: true },
        { name: "Elevación de Glúteo-Isquios (GHR)", sets: 1, reps: "10-12", rpe: "10", rest: "~1.5 min", notes: "Mantén caderas rectas, haz curl nórdico si no hay máquina GHR.", substitution1: "Curl Femoral Tumbado", substitution2: "Curl Nórdico de Isquios" },
        { name: "A1: Crunch en Silla Romana", sets: 2, reps: "12-15", rpe: "9-10", rest: "0 min", notes: "No balancees las piernas abajo, minimiza impulso, lleva rodillas al pecho si estirar piernas es muy difícil.", substitution1: "Elevación de Piernas Colgado", substitution2: "Crunch Inverso", isSuperset: "A1" },
        { name: "A2: Elevación de Talones Sentado", sets: 2, reps: "12-15", rpe: "9-10", rest: "~1.5 min", notes: "Presiona hasta ponerte de puntillas, estira los gemelos abajo, no rebotes.", substitution1: "Elevación de Talones en Prensa", substitution2: "Elevación de Talones de Pie", isSuperset: "A2" },
      ],
      // --- CORRECTED upperB for Block 2 ---
      upperB: [ // Based on PDF Page 38
        { name: "Press de Hombro Sentado con Mancuernas", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Baja completamente, mantén el torso erguido.", substitution1: "Press Arnold de Pie con Mancuernas", substitution2: "Press de Hombro en Máquina" },
        { name: "Remo en Barra T", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Enfócate en juntar las escápulas al tirar del peso hacia ti. Mantén hombros abajo (evita encogerlos).", substitution1: "Remo Sentado en Cable", substitution2: "Remo Pendlay" },
        { name: "Press de Pecho en Máquina", sets: 2, reps: "8-10", rpe: "9-10", rest: "~2 min", notes: "Enfócate en contraer el pecho.", substitution1: "Fondos con Lastre", substitution2: "Press Plano con Mancuernas" },
        { name: "Jalón al Pecho", sets: 2, reps: "8-10", rpe: "9-10", rest: "~2 min", notes: "Piensa en tirar los codos hacia abajo y adentro. Último set dropset: 8-10 reps, baja peso ~50%, haz 8-10 reps adicionales.", substitution1: "Jalón Agarre Neutro", substitution2: "Dominadas con Lastre", hasDropsetLast: true },
        { name: "A1: Patada de Tríceps con Mancuerna", sets: 2, reps: "12-15", rpe: "9-10", rest: "0 min", notes: "Inclínate ligeramente adelante, bloquea el codo detrás del torso (hiperextensión de hombro).", substitution1: "Patada de Tríceps en Cable", substitution2: "Press Francés con Mancuerna", isSuperset: "A1" }, // Corrected A1 + Subs
        { name: "A2: Curl Araña", sets: 2, reps: "12-15", rpe: "9-10", rest: "~1.5 min", notes: "Apoya pecho en banco inclinado, haz curl con codos ligeramente al frente.", substitution1: "Curl Predicador con Mancuerna", substitution2: "Curl Bayesiano en Cable", isSuperset: "A2" }, // Corrected A2 + Subs
        { name: "Elevación Lateral en Cable", sets: 2, reps: "12-15", rpe: "10", rest: "~1.5 min", notes: "Inclínate lejos del cable. Enfócate en contraer los deltoides. Último set dropset: 12-15 reps, baja peso ~50%, haz 12-15 reps adicionales.", substitution1: "Elevación Lateral en Máquina", substitution2: "Elevación Lateral con Mancuernas", hasDropsetLast: true }, // Corrected Exercise + Dropset Flag (was on wrong exercise before)
     ],
      lowerB: [ // Based on PDF Page 39
        { name: "Zancada Búlgara con Mancuernas", sets: 3, reps: "10-12", rpe: "8-9", rest: "~2 min", notes: "Empieza con tu pierna más débil. Baja profundo.", substitution1: "Prensa de Piernas", substitution2: "Sentadilla Goblet" },
        { name: "Peso Muerto Rumano con Mancuernas", sets: 2, reps: "10-12", rpe: "8-9", rest: "~2 min", notes: "Enfatiza el estiramiento en isquios, evita redondear la lumbar.", substitution1: "Peso Muerto Rumano", substitution2: "Hiperextensión 45°" },
        { name: "Sentadilla Goblet", sets: 1, reps: "12-15", rpe: "9-10", rest: "~1.5 min", notes: "Sostén la mancuerna bajo la barbilla, siéntate atrás y abajo, empuja rodillas afuera.", substitution1: "Extensión de Cuádriceps", substitution2: "Step-Up con Mancuerna" },
        { name: "A1: Elevación de Talones en Prensa", sets: 2, reps: "15-20", rpe: "10", rest: "0 min", notes: "Presiona hasta ponerte de puntillas, estira gemelos abajo, no rebotes.", substitution1: "Elevación de Talones Sentado", substitution2: "Elevación de Talones de Pie", isSuperset: "A1" },
        { name: "A2: Crunch en Máquina", sets: 2, reps: "10-12", rpe: "10", rest: "~1.5 min", notes: "Contrae los abs para mover el peso, no uses los brazos para ayudar.", substitution1: "Crunch en Cable", substitution2: "Crunch con Peso (Placa)", isSuperset: "A2" },
      ],
    };
const block3_days = {
      upperA: [ // Based on PDF Page 52
        { name: "Press de Pecho en Máquina (Pesado)", sets: 1, reps: "4-6", rpe: "8-9", rest: "~3 min", notes: "Enfócate en contraer el pecho.", substitution1: "Fondos con Lastre", substitution2: "Press Plano con Mancuernas", isHeavy: true },
        { name: "Press de Pecho en Máquina (Descarga)", sets: 1, reps: "8-10", rpe: "9-10", rest: "~3 min", notes: "Enfócate en contraer el pecho.", substitution1: "Fondos con Lastre", substitution2: "Press Plano con Mancuernas", isBackoff: true },
        { name: "Jalón en Máquina (Pulldown)", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Piensa en tirar los codos hacia abajo y adentro. Último set dropset: 10-12 reps, quita lastre o usa asistencia, haz 10-12 reps adicionales.", substitution1: "Dominadas con Lastre", substitution2: "Jalón al Pecho (2 agarres)", hasDropsetLast: true },
        { name: "Press de Hombro en Cable", sets: 2, reps: "12-15", rpe: "9-10", rest: "~2 min", notes: "Baja los cables hasta altura de hombros, torso erguido. Último set dropset: 12-15 reps, baja peso ~50%, haz 12-15 reps adicionales.", substitution1: "Press de Hombro Sentado con Mancuernas", substitution2: "Press de Hombro en Máquina", hasDropsetLast: true },
        { name: "Remo Helms con Mancuerna", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Forma ultra estricta, lleva codos hacia afuera y atrás a 45 grados.", substitution1: "Remo en Máquina", substitution2: "Remo en Barra T con Apoyo de Pecho" },
        { name: "A1: Extensión de Tríceps sobre la Cabeza en Cable", sets: 2, reps: "12-15", rpe: "10", rest: "0 min", notes: "Ambos brazos a la vez, resiste la negativa.", substitution1: "Press Francés con Mancuerna", substitution2: "Rompecráneos con Barra EZ", isSuperset: "A1" },
        { name: "A2: Curl en Cable con Barra EZ", sets: 2, reps: "12-15", rpe: "10", rest: "~1.5 min", notes: "Enfócate en contraer los bíceps. Controla la negativa.", substitution1: "Curl con Mancuernas", substitution2: "Curl con Barra EZ", isSuperset: "A2" },
      ],
      lowerA: [ // Based on PDF Page 53
        { name: "Sentadilla en Máquina (Pesado)", sets: 1, reps: "4-6", rpe: "8-9", rest: "~3 min", notes: "Enfócate en la fuerza. Añade peso o reps cada semana. Forma consistente.", substitution1: "Prensa de Piernas", substitution2: "Sentadilla Hack", isHeavy: true },
        { name: "Sentadilla en Máquina (Descarga)", sets: 1, reps: "8-10", rpe: "8-9", rest: "~3 min", notes: "Baja el peso, controla la negativa. Tempo suave y consistente.", substitution1: "Prensa de Piernas", substitution2: "Sentadilla Hack", isBackoff: true },
        { name: "Curl Nórdico de Isquios", sets: 1, reps: "8-10", rpe: "10", rest: "~1.5 min", notes: "Mantén caderas tan rectas como puedas, puedes sustituir por curl femoral tumbado.", substitution1: "Elevación de Glúteo-Isquios (GHR)", substitution2: "Curl Femoral Tumbado" },
        { name: "A1: Elevación de Talones Sentado", sets: 2, reps: "10-12", rpe: "9-10", rest: "0 min", notes: "Presiona hasta ponerte de puntillas, estira gemelos abajo, no rebotes.", substitution1: "Elevación de Talones en Prensa", substitution2: "Elevación de Talones de Pie", isSuperset: "A1" },
        { name: "A2: 'Dead Bug' (Bicho Muerto) Dos Brazos Dos Piernas", sets: 2, reps: "10-12", rpe: "9-10", rest: "~1.5 min", notes: "Hazlos lento, enfócate en mantener lumbar pegada al suelo todo el set.", substitution1: "Crunch en Silla Romana", substitution2: "Crunch Inverso", isSuperset: "A2" },
      ],
      upperB: [ // Based on PDF Page 54
        { name: "Remo Meadows", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Apoya mano libre en rodilla, mantente ligero, enfatiza forma.", substitution1: "Remo con Mancuerna a un Brazo", substitution2: "Remo Pendlay" },
        { name: "Press Arnold de Pie con Mancuernas", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Empieza con codos al frente y palmas hacia adentro. Rota las mancuernas para que las palmas miren al frente al presionar.", substitution1: "Press de Hombro Sentado con Mancuernas", substitution2: "Press de Hombro en Máquina" },
        { name: "Jalón Agarre Neutro", sets: 2, reps: "8-10", rpe: "9-10", rest: "~2 min", notes: "Tira de los codos hacia abajo contra tus costados. Último set dropset: 8-10 reps, baja peso ~50%, haz 8-10 reps adicionales.", substitution1: "Dominadas con Lastre", substitution2: "Jalón al Pecho", hasDropsetLast: true },
        { name: "Press en Cable para Pecho", sets: 2, reps: "10-12", rpe: "9-10", rest: "~2 min", notes: "Puede hacerse sentado o de pie. Enfócate en contraer el pecho.", substitution1: "Fondos con Lastre", substitution2: "Press Plano con Mancuernas" },
        { name: "A1: Curl Zottman Inverso", sets: 2, reps: "10-12", rpe: "10", rest: "0 min", notes: "Curl martillo en concéntrica, curl supinado (palmas arriba) en excéntrica.", substitution1: "Curl Martillo", substitution2: "Curl con Mancuernas" , isSuperset: "A1"},
        { name: "A2: Patada de Tríceps en Cable", sets: 2, reps: "12-15", rpe: "9-10", rest: "~1.5 min", notes: "Inclínate ligeramente adelante, bloquea el codo detrás del torso (hiperextensión de hombro).", substitution1: "Empuje de Tríceps (Pressdown)", substitution2: "Patada de Tríceps con Mancuerna", isSuperset: "A2" },
        { name: "Elevación Lateral en Máquina", sets: 2, reps: "10-12", rpe: "10", rest: "~1.5 min", notes: "Enfócate en contraer el deltoide lateral para mover el peso. Último set dropset: 10-12 reps, baja peso ~50%, haz 10-12 reps adicionales.", substitution1: "Elevación Lateral en Cable", substitution2: "Elevación Lateral con Mancuernas", hasDropsetLast: true },
      ],
      lowerB: [ // Based on PDF Page 55
        { name: "Peso Muerto Rumano", sets: 2, reps: "10-12", rpe: "8-9", rest: "~2 min", notes: "Mantén lumbar neutra, lleva caderas atrás, no permitas que la columna se redondee.", substitution1: "Hiperextensión 45°", substitution2: "Peso Muerto Rumano con Mancuernas" },
        { name: "Zancadas con Mancuernas", sets: 3, reps: "8-10", rpe: "8-9", rest: "~2 min", notes: "Pasos medios, minimiza el impulso con la pierna trasera.", substitution1: "Zancada con Step-Up (Mancuerna)", substitution2: "Zancada Búlgara con Mancuernas" },
        { name: "Extensión de Cuádriceps", sets: 1, reps: "12-15", rpe: "9-10", rest: "~1.5 min", notes: "Dropset: 12-15 reps, baja peso ~50%, haz 12-15 reps adicionales. Enfócate en contraer los cuádriceps para mover el peso.", substitution1: "Step-Up con Mancuerna", substitution2: "Sentadilla Goblet", hasDropset: true },
        { name: "A1: Elevación de Talones de Pie", sets: 2, reps: "15-20", rpe: "10", rest: "0 min", notes: "Presiona hasta ponerte de puntillas, estira gemelos abajo, no rebotes.", substitution1: "Elevación de Talones en Prensa", substitution2: "Elevación de Talones Sentado", isSuperset: "A1" },
        { name: "A2: Crunch con Peso (Placa)", sets: 2, reps: "12-15", rpe: "10", rest: "~1.5 min", notes: "Sostén una placa o mancuerna en el pecho y ¡haz crunch fuerte!", substitution1: "Crunch en Máquina", substitution2: "Crunch en Cable", isSuperset: "A2" },
      ],
    };

// Construct the final program array using the blocks
const program = [
    { week: 1, days: block1_days }, { week: 2, days: block1_days }, { week: 3, days: block1_days }, { week: 4, days: block1_days },
    { week: 5, days: block2_days }, { week: 6, days: block2_days }, { week: 7, days: block2_days }, { week: 8, days: block2_days },
    { week: 9, days: block3_days }, { week: 10, days: block3_days }, { week: 11, days: block3_days }, { week: 12, days: block3_days },
];


// --- Application State ---
let state = {
    currentWeek: 1,
    currentDay: 'upperA', // Default to first day
    workoutLog: {},
    history: [],
    timer: { active: false, seconds: 0, duration: 90, intervalId: null, _rafId: null },
    notificationTimeoutId: null,
    darkMode: false // Added dark mode state
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
const darkModeToggle = document.getElementById('dark-mode-toggle'); // Dark mode button
const darkIcon = document.getElementById('dark-icon');
const lightIcon = document.getElementById('light-icon');
const clearHistoryBtn = document.getElementById('clear-history-btn'); // Button to clear history


// --- Helper Functions ---
let skipNextFocus = false; // Flag para evitar scroll al cambiar sustitución

const getLocalStorageKey = (week, day) => `workoutLog_w${week}_d${day}`; // Key includes day type (upperA, lowerA etc)

const initializeWorkoutLog = (exercises) => {
    const initialLog = {};
    if (!exercises || !Array.isArray(exercises)) return initialLog;
    exercises.forEach((exercise) => {
         if (!exercise || !exercise.name) return;
         // Calculate correct number of sets including per leg/arm
         const numSets = exercise.sets * (exercise.isPerLeg || exercise.isPerArm ? 1 : 1);
        initialLog[exercise.name] = {
            completed: false,
            sets: Array.from({ length: numSets }, () => ({ weight: '', reps: '', completed: false })),
            notes: '',
            substitutionUsed: null,
        };
    });
    return initialLog;
};

const getCurrentExercises = (week, day) => {
    const programWeekData = program.find(p => p.week === week);
    const fallbackWeekData = programWeekData || program[program.length - 1] || program[0];
    // Use the specific day key (upperA, lowerA, etc.)
    if (fallbackWeekData && fallbackWeekData.days && fallbackWeekData.days[day]) {
         return fallbackWeekData.days[day];
    }
    return [];
};

const parseRestTime = (restString) => {
     if (!restString || typeof restString !== 'string') return 90;
     if (restString.toLowerCase().includes("0 min")) return 0;
     const match = restString.match(/(\d+(\.\d+)?)\s*min/);
     return match ? Math.round(parseFloat(match[1]) * 60) : 90;
};

const formatTime = (totalSeconds) => {
     if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
     const minutes = Math.floor(totalSeconds / 60);
     const seconds = totalSeconds % 60;
     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// --- Mejoras de Accesibilidad y UX ---
const focusFirstWeightInput = () => {
    if (skipNextFocus) {
        skipNextFocus = false;
        return;
    }
    setTimeout(() => {
        const firstWeightInput = exerciseListContainer.querySelector('.set-input-weight');
        if (firstWeightInput) firstWeightInput.focus();
    }, 100); // Espera breve para asegurar renderizado
};

// --- Dark Mode Logic ---
const applyDarkMode = (isDark) => {
    state.darkMode = isDark;
    if (isDark) {
        document.documentElement.classList.add('dark');
        darkIcon?.classList.remove('hidden'); // Add null check
        lightIcon?.classList.add('hidden'); // Add null check
    } else {
        document.documentElement.classList.remove('dark');
        darkIcon?.classList.add('hidden'); // Add null check
        lightIcon?.classList.remove('hidden'); // Add null check
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
         // Default to system preference if no setting saved
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
                    if (!parsedLog[exercise.name] || !Array.isArray(parsedLog[exercise.name].sets)) {
                        isValid = false;
                        break;
                    }
                }
            } else if (Object.keys(parsedLog).length > 0) {
                // If no exercises are defined for the day, the log should be empty
                isValid = false;
            }

            if (isValid) {
                state.workoutLog = parsedLog;
            } else {
                // If log is invalid or doesn't match, initialize a fresh one
                console.warn(`Invalid or outdated log found for ${storageKey}. Initializing new log.`);
                state.workoutLog = initializeWorkoutLog(exercises);
            }
        } catch (error) {
            console.error(`Failed to parse workout log from localStorage for ${storageKey}:`, error);
            state.workoutLog = initializeWorkoutLog(exercises);
        }
    } else {
        // No log found, initialize a fresh one
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
const showNotification = (message, type = 'info', duration = 3000) => {
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
    } else { // Default to 'info'
        notificationTitle.textContent = 'Información';
        notificationContent.classList.add('bg-blue-100', 'text-blue-800', 'border-blue-300', 'dark:bg-blue-900', 'dark:text-blue-100', 'dark:border-blue-700');
    }
    // Animate in
    notificationArea.classList.remove('hidden');
    notificationArea.setAttribute('role', 'alert');
    // Force reflow to apply transition
    void notificationArea.offsetWidth;
    notificationArea.style.opacity = '1';
    notificationArea.style.transform = 'translateY(0)';
    // Set timeout to animate out
    state.notificationTimeoutId = setTimeout(() => {
        notificationArea.style.opacity = '0';
        notificationArea.style.transform = 'translateY(-20px)';
        // Hide completely after transition ends
        setTimeout(() => {
            notificationArea.classList.add('hidden');
            state.notificationTimeoutId = null;
        }, 500); // Match transition duration
    }, duration);
};

// --- Rendering Functions ---
const renderExercises = () => {
    exerciseListContainer.innerHTML = ''; // Clear previous exercises
    const exercises = getCurrentExercises(state.currentWeek, state.currentDay);

    if (!Array.isArray(exercises) || exercises.length === 0) {
        exerciseListContainer.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center mt-8">No hay ejercicios definidos para la Semana ${state.currentWeek}, Día ${getDisplayDayName(state.currentDay)}.</p>`;
        return;
    }

    exercises.forEach((exercise) => {
         // Ensure exercise object and name are valid
         if (!exercise || !exercise.name) {
             console.error("Skipping invalid exercise object during render:", exercise);
             return;
         }

         // Ensure log data exists for this exercise, initialize if not
         let currentLogData = state.workoutLog[exercise.name];
         if (!currentLogData) {
             const tempInit = initializeWorkoutLog([exercise]); // Initialize just this one
             state.workoutLog[exercise.name] = tempInit[exercise.name];
             currentLogData = state.workoutLog[exercise.name];
              // Double check initialization worked
              if (!currentLogData) {
                  console.error("Failed to initialize log data for", exercise.name);
                  return; // Skip rendering this exercise if init failed
              }
         }

         // Determine the name to display (original or substitution)
         const displayExerciseName = currentLogData.substitutionUsed || exercise.name;

        // Create exercise card container
        const card = document.createElement('div');
        card.classList.add('exercise-card', 'rounded-lg', 'shadow-sm', 'overflow-hidden', 'border');
         // Apply 'completed' class or default background/border based on state
         if (currentLogData.completed) {
             card.classList.add('completed');
         } else {
             card.classList.add('bg-white', 'dark:bg-gray-800', 'border-gray-200', 'dark:border-gray-600');
         }
        card.dataset.exerciseName = exercise.name; // Use original name for data linking

        // --- Card Header ---
        const headerDiv = document.createElement('div');
        headerDiv.className = 'p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600';

        const headerFlex = document.createElement('div');
        headerFlex.className = 'flex justify-between items-start gap-4';

        const headerText = document.createElement('div');
        headerText.className = 'flex-1'; // Allow text to take up space

        // Exercise Title (with badges)
        const title = document.createElement('h3');
        title.className = 'text-lg font-semibold flex items-center flex-wrap gap-2 text-gray-900 dark:text-gray-100'; // Allow wrapping
        // Add badges conditionally
        if (exercise.isSuperset) title.innerHTML += `<span class="text-xs font-bold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 px-1.5 py-0.5 rounded">${exercise.isSuperset}</span>`;
        title.innerHTML += `<span class="break-words">${displayExerciseName}</span>`; // Allow name to break
        if (exercise.isHeavy) title.innerHTML += `<span class="text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200 px-1.5 py-0.5 rounded whitespace-nowrap">PESADO</span>`;
        if (exercise.isBackoff) title.innerHTML += `<span class="text-xs font-bold text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded whitespace-nowrap">DESCARGA</span>`;
        if (exercise.isPerLeg) title.innerHTML += `<span class="text-xs font-bold text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200 px-1.5 py-0.5 rounded whitespace-nowrap">POR PIERNA</span>`;
         if (exercise.isPerArm) title.innerHTML += `<span class="text-xs font-bold text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-200 px-1.5 py-0.5 rounded whitespace-nowrap">POR BRAZO</span>`;


        // Exercise Description (Sets, Reps, RPE, Rest)
        const description = document.createElement('div');
        description.className = 'text-sm text-gray-600 dark:text-gray-400 mt-1 flex flex-wrap gap-x-3 gap-y-1'; // Allow wrapping
        description.innerHTML = `
            <span class="flex items-center gap-1">${ICONS.target} Sets: ${exercise.sets * (exercise.isPerLeg || exercise.isPerArm ? 2 : 1)}</span>
            <span class="flex items-center gap-1">${ICONS.repeat} Reps: ${exercise.reps}</span>
            <span class="flex items-center gap-1">${ICONS.dumbbell} RPE: ${exercise.rpe}</span>
            <span class="flex items-center gap-1">${ICONS.clock} Descanso: ${exercise.rest}</span>
        `;

        headerText.appendChild(title);
        headerText.appendChild(description);

        // Exercise Notes
        if (exercise.notes) {
            const notesP = document.createElement('p');
            notesP.className = 'text-xs text-gray-500 dark:text-gray-400 mt-2 italic flex items-start gap-1'; // items-start to align icon properly
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
             headerDiv.appendChild(subDiv); // Add it below the main header content
         }


        // --- Card Content (Sets) ---
        const contentDiv = document.createElement('div');
        contentDiv.className = 'p-4 space-y-2';

        // Check if sets data is valid before iterating
        if (Array.isArray(currentLogData.sets)) {
            currentLogData.sets.forEach((set, setIdx) => {
                const setRow = document.createElement('div');
                // Apply 'completed' class or default background based on set state
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
                contentDiv.appendChild(setRow);
            });
        } else {
            // Handle case where sets data is missing or invalid
            contentDiv.innerHTML = `<p class="text-red-500 text-xs">Error al cargar sets.</p>`;
        }

        // --- Notes Input ---
        const notesInput = document.createElement('input');
        notesInput.type = 'text';
        notesInput.placeholder = 'Notas del ejercicio...';
        notesInput.value = currentLogData.notes || '';
        notesInput.className = 'notes-input h-8 text-sm mt-2 w-full border rounded-md px-2';
        notesInput.ariaLabel = `Notas para ${displayExerciseName}`;
        contentDiv.appendChild(notesInput);


        // Append header and content to the card
        card.appendChild(headerDiv);
        card.appendChild(contentDiv);

        // Append the card to the main container
        exerciseListContainer.appendChild(card);
    });

    // Al final de renderizar los ejercicios:
    focusFirstWeightInput();
};

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
                 <ul class="space-y-1">`;

         if (Array.isArray(entry.workout)) {
             entryHTML += `<ul role="list">`; // Añade role para accesibilidad
             entry.workout.forEach(ex => {
                 entryHTML += `<li class="text-gray-700 dark:text-gray-300 py-1">
                     <strong class='font-medium text-gray-900 dark:text-gray-100'>${ex.substitutionUsed ? `${ex.name} (Sust.)` : ex.name}:</strong>`; // Indicate if substitution was used

                 // Check if the exercise was marked completed but has no sets (e.g., bodyweight done)
                 if (ex.completed && (!ex.sets || ex.sets.length === 0)) {
                     entryHTML += `<span class="text-green-600 dark:text-green-400 ml-1 text-xs">(Completado)</span>`;
                 }

                 // Display sets if they exist
                 if (Array.isArray(ex.sets) && ex.sets.length > 0) {
                     entryHTML += `<span class="ml-1 block sm:inline">`; // Allow sets to wrap on small screens
                     ex.sets.forEach(s => {
                         // Style completed sets differently
                         const setClass = s.completed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200';
                         entryHTML += `<span class="mr-2 mb-1 inline-block text-xs py-0.5 px-1.5 rounded ${setClass}">
                             ${s.weight || '0'}kg x ${s.reps || '0'}r ${s.completed ? ICONS.check : ''}
                         </span>`;
                     });
                     entryHTML += `</span>`;
                 }

                 // Display notes if they exist
                 if (ex.notes) {
                     entryHTML += `<span class="text-xs italic text-gray-500 dark:text-gray-400 block ml-4 mt-1">Nota: ${ex.notes}</span>`;
                 }
                 entryHTML += `</li>`;
             });
             entryHTML += `</ul>`;
         }
         entryHTML += `</ul></div>`;

         card.innerHTML = entryHTML;
         historyListContainer.appendChild(card);
     });
};

const renderTimer = () => {
    const timerRunning = state.timer.active || state.timer.seconds > 0;

    // If timer is not active and has reached 0, clear the display and enable start buttons
    if (!timerRunning) {
        timerDisplayContainer.innerHTML = ''; // Clear the timer display
        document.querySelectorAll('.start-timer-btn').forEach(btn => btn.disabled = false); // Re-enable all start buttons
        return;
    }

    // If timer is running (or paused but not finished), disable start buttons
    document.querySelectorAll('.start-timer-btn').forEach(btn => btn.disabled = true);

    // Check if the timer display needs to be created or updated (structure change for pause/resume)
    const needsReRender = !timerDisplayContainer.firstChild || timerDisplayContainer.dataset.timerActive !== String(state.timer.active);

    if (needsReRender) {
        timerDisplayContainer.innerHTML = `
            <div class="timer-card p-3 bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm shadow-xl border border-blue-200 dark:border-blue-700 rounded-lg max-w-md mx-auto">
                <div class="flex items-center justify-between gap-3">
                    <div class='flex items-center gap-2'>
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 dark:text-blue-400 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span class="timer-time text-lg font-semibold text-blue-700 dark:text-blue-300">Descanso: ${formatTime(state.timer.seconds)}</span>
                    </div>
                    <div class="flex gap-1">
                        ${state.timer.active ?
                            // Show Pause button if timer is active
                            `<button id="pause-timer-btn" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300" title="Pausar Timer">${ICONS.pause}</button>` :
                            // Show Resume button if timer is paused (and seconds > 0)
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
        // Store the current active state in the dataset for comparison next time
        timerDisplayContainer.dataset.timerActive = String(state.timer.active);

        // Add event listeners to the newly created buttons
        if (state.timer.active) {
            document.getElementById('pause-timer-btn')?.addEventListener('click', pauseTimer);
        } else {
            document.getElementById('resume-timer-btn')?.addEventListener('click', resumeTimer);
        }
        document.getElementById('reset-timer-btn')?.addEventListener('click', resetTimer);

    } else {
        // Only update the time and progress bar if the structure hasn't changed
         const timerTimeElement = timerDisplayContainer.querySelector('.timer-time');
         const progressBarElement = document.getElementById('timer-progress-bar');
         if (timerTimeElement) {
             timerTimeElement.textContent = `Descanso: ${formatTime(state.timer.seconds)}`;
         }
         if (progressBarElement) {
             progressBarElement.style.width = `${state.timer.duration > 0 ? (state.timer.seconds / state.timer.duration) * 100 : 0}%`;
         }
    }

    // Mejora: Usa requestAnimationFrame para animar el progreso
    if (state.timer.active && state.timer.seconds > 0) {
        if (!state.timer._rafId) {
            const animate = () => {
                renderTimer();
                state.timer._rafId = requestAnimationFrame(animate);
            };
            state.timer._rafId = requestAnimationFrame(animate);
        }
    } else if (state.timer._rafId) {
        cancelAnimationFrame(state.timer._rafId);
        state.timer._rafId = null;
    }
};

// Helper to get display name for the day
const getDisplayDayName = (dayKey) => {
    switch(dayKey) {
        case 'upperA': return 'Tren Superior A';
        case 'lowerA': return 'Tren Inferior A';
        case 'upperB': return 'Tren Superior B';
        case 'lowerB': return 'Tren Inferior B';
        default: return 'Desconocido';
    }
}

const updateUI = () => {
    // Update main title with week and day name
    mainTitle.innerHTML = `Semana ${state.currentWeek} <span class="text-base font-normal text-gray-600 dark:text-gray-400">(${getDisplayDayName(state.currentDay)})</span>`;

    // Update active tab button
    Object.keys(tabButtons).forEach(key => {
        tabButtons[key]?.classList.toggle('active', state.currentDay === key);
    });

    // Enable/disable week navigation buttons
    const maxWeek = program.length > 0 ? Math.max(...program.map(p => p.week)) : 1;
    prevWeekBtn.disabled = state.currentWeek <= 1;
    nextWeekBtn.disabled = state.currentWeek >= maxWeek;

    // Re-render dynamic parts of the UI
    renderExercises();
    renderHistory();
    renderTimer(); // Ensure timer display is updated
};


// --- Timer Logic ---
const startTimer = (durationInSeconds) => {
     // Clear any existing interval
     if (state.timer.intervalId) {
         clearInterval(state.timer.intervalId);
     }

     // Validate and set duration
     const validDuration = Number.isFinite(durationInSeconds) && durationInSeconds >= 0 ? durationInSeconds : 90; // Default to 90s if invalid
     state.timer.duration = validDuration;
     state.timer.seconds = validDuration; // Start countdown from full duration
     state.timer.active = true; // Mark timer as active

     // Start the interval timer
     state.timer.intervalId = setInterval(timerTick, 1000); // Tick every second

     // Update the UI immediately
     renderTimer();
};

const pauseTimer = () => {
    state.timer.active = false; // Mark timer as inactive
    // Clear the interval so timerTick stops running
    if (state.timer.intervalId) {
        clearInterval(state.timer.intervalId);
        state.timer.intervalId = null;
    }
    // Update UI to show resume button etc.
    renderTimer();
};

const resumeTimer = () => {
    // Only resume if timer is paused and there's time left
    if (!state.timer.active && state.timer.seconds > 0) {
        state.timer.active = true; // Mark as active again
        // Clear any residual interval just in case, then start a new one
        if (state.timer.intervalId) clearInterval(state.timer.intervalId);
        state.timer.intervalId = setInterval(timerTick, 1000);
        // Update UI to show pause button etc.
        renderTimer();
    }
};

const resetTimer = () => {
     state.timer.active = false; // Stop the timer
     // Clear the interval
     if (state.timer.intervalId) {
         clearInterval(state.timer.intervalId);
         state.timer.intervalId = null;
     }
     // Reset seconds to the original duration (or 0 if duration was 0)
     state.timer.seconds = state.timer.duration;
     // Update UI (will show the reset time, paused state)
     renderTimer();
     // Immediately call renderTimer again after a short delay to potentially clear it if duration was 0
     // Or simply call updateUI which includes renderTimer and enables buttons if needed
     // A better approach: if seconds become 0 after reset, the next render will clear it.
     // For now, just render the reset state. If duration was 0, it stays 0.
};

const timerTick = () => {
    if (!state.timer.active) return; // Do nothing if paused

    state.timer.seconds--; // Decrement seconds

    if (state.timer.seconds <= 0) {
        // Timer finished
        state.timer.seconds = 0; // Ensure it doesn't go negative
        state.timer.active = false; // Mark as inactive
        // Clear the interval
        if (state.timer.intervalId) {
            clearInterval(state.timer.intervalId);
            state.timer.intervalId = null;
        }

        // Notify user and play sound
        showNotification('¡Tiempo de descanso terminado!', 'info');
        try { // Play sound with increased volume using Web Audio API for better control
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain(); // Control volume

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine'; // Simple tone
            oscillator.frequency.setValueAtTime(660, audioContext.currentTime); // A slightly higher pitch (A5)
            gainNode.gain.setValueAtTime(0.9, audioContext.currentTime); // Set volume (0.0 to 1.0) - Increased!
            // Fade out quickly
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5); // Play for 0.5 seconds
        } catch (e) {
            console.error("Web Audio API failed:", e);
            // Fallback or ignore sound error
        }

         // Update UI (this will clear the timer display and re-enable buttons)
         renderTimer(); // Call renderTimer, which will see seconds=0 and active=false, clearing the display

    } else {
         // Timer still ticking, just update the display
         renderTimer();
    }
};


// --- Event Handlers ---
const handleWeekChange = (direction) => {
     const newWeek = state.currentWeek + direction;
    const maxWeek = program.length > 0 ? Math.max(...program.map(p => p.week)) : 1;
    // Check bounds
    if (newWeek >= 1 && newWeek <= maxWeek) {
        state.currentWeek = newWeek;
        // Reset timer and load data for the new week/day
        pauseTimer(); // Ensure timer stops
        state.timer.seconds = 0; // Reset timer display
        loadWorkoutLog(); // Load log for the new context
        updateUI(); // Update the entire interface
    }
};

const handleDayChange = (day) => {
     // Only update if the day actually changed
     if (day !== state.currentDay) {
        state.currentDay = day;
        // Reset timer and load data for the new day
        pauseTimer(); // Ensure timer stops
        state.timer.seconds = 0; // Reset timer display
        loadWorkoutLog(); // Load log for the new context
        updateUI(); // Update the entire interface
    }
};

const handleSetInputChange = (exerciseName, setIndex, field, value) => {
     // Basic validation for weight/reps (allow empty, numbers, optional decimal for weight)
     const isValidInput = (field === 'weight')
        ? (value === '' || /^\d*\.?\d*$/.test(value)) // Allow decimal for weight
        : (value === '' || /^\d*$/.test(value));      // Only digits for reps

     if (!isValidInput) {
         // Maybe show a quick, non-blocking warning or just ignore invalid chars?
         // For now, just prevent updating state with invalid format.
         // The blur handler will provide more robust feedback.
         console.warn(`Invalid input ignored for ${field}: ${value}`);
         return;
     }

     // Update the state if the log entry exists
     if (state.workoutLog[exerciseName]?.sets?.[setIndex] !== undefined) {
         state.workoutLog[exerciseName].sets[setIndex][field] = value;
         saveWorkoutLog(); // Save changes to localStorage
     } else {
         console.error(`Log error: Could not find state.workoutLog[${exerciseName}].sets[${setIndex}]`);
     }
};

const handleSetCompletionToggle = (exerciseName, setIndex) => {
     // Check if the set exists in the log
     if (state.workoutLog[exerciseName]?.sets?.[setIndex] !== undefined) {
         const currentSet = state.workoutLog[exerciseName].sets[setIndex];
         currentSet.completed = !currentSet.completed; // Toggle completion status

         // Check if all sets for this exercise are now completed
         const allSetsCompleted = state.workoutLog[exerciseName].sets.every(set => set.completed);
         state.workoutLog[exerciseName].completed = allSetsCompleted; // Update overall exercise completion

         saveWorkoutLog(); // Save changes

         // Update UI for this specific set and the overall exercise card
         const card = document.querySelector(`.exercise-card[data-exercise-name="${exerciseName}"]`);
         if (card) {
             // Update the specific set row's appearance
             const setRow = card.querySelectorAll('.set-row')[setIndex];
             if (setRow) {
                 setRow.classList.toggle('completed', currentSet.completed);
                 // Ensure checkbox reflects state (though it should trigger this)
                 const setCheckbox = setRow.querySelector('.set-completion-checkbox');
                 if (setCheckbox) setCheckbox.checked = currentSet.completed;
             }
             // Update the overall card appearance and main checkbox
             card.classList.toggle('completed', allSetsCompleted);
             const exerciseCheckbox = card.querySelector('.exercise-completion-checkbox');
             if (exerciseCheckbox) exerciseCheckbox.checked = allSetsCompleted;
         }
     } else {
         console.error(`Log error: Could not find state.workoutLog[${exerciseName}].sets[${setIndex}]`);
     }
};

const handleExerciseCompletionToggle = (exerciseName) => {
     // Check if the exercise exists in the log
     if (state.workoutLog[exerciseName]) {
         const currentLog = state.workoutLog[exerciseName];
         currentLog.completed = !currentLog.completed; // Toggle overall completion

         // Mark/unmark all individual sets based on the overall toggle
         if (Array.isArray(currentLog.sets)) {
             currentLog.sets.forEach(set => set.completed = currentLog.completed);
         }

         saveWorkoutLog(); // Save changes

         // Update UI for the entire card
         const card = document.querySelector(`.exercise-card[data-exercise-name="${exerciseName}"]`);
          if (card) {
              card.classList.toggle('completed', currentLog.completed);
              // Update all set rows within the card
              card.querySelectorAll('.set-row').forEach(row => {
                  row.classList.toggle('completed', currentLog.completed);
                  const setCheckbox = row.querySelector('.set-completion-checkbox');
                  if (setCheckbox) setCheckbox.checked = currentLog.completed;
              });
              // Ensure the main checkbox reflects the state (though it should trigger this)
              const exerciseCheckbox = card.querySelector('.exercise-completion-checkbox');
              if (exerciseCheckbox) exerciseCheckbox.checked = currentLog.completed;
          }
     } else {
         console.error(`Log error: Could not find state.workoutLog[${exerciseName}]`);
     }
};

const handleNotesChange = (exerciseName, value) => {
     // Update notes if the exercise exists in the log
     if (state.workoutLog[exerciseName]) {
         state.workoutLog[exerciseName].notes = value;
         saveWorkoutLog(); // Save changes
     } else {
         console.error(`Log error: Could not find state.workoutLog[${exerciseName}]`);
     }
};

const handleSubstitutionChange = (exerciseName, subValue) => {
    if (state.workoutLog[exerciseName]) {
        state.workoutLog[exerciseName].substitutionUsed = subValue || null; // Store null if empty string (default option)
        saveWorkoutLog(); // Save changes
        skipNextFocus = true; // Evita scroll al cambiar sustitución
        updateUI(); // Re-render to show the new exercise name
    } else {
        console.error(`Log error: Could not find state.workoutLog[${exerciseName}]`);
    }
};

const handleSaveWorkout = () => {
    // Get current date and time
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = today.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

    // Get the definition of exercises for the current day
    const exercises = getCurrentExercises(state.currentWeek, state.currentDay);
    if (!exercises || exercises.length === 0) {
        showNotification("No hay ejercicios definidos para guardar.", "error");
        return;
    }

    // Filter and format the logged data for saving
    const exercisesToSave = exercises.map(exercise => {
        const logData = state.workoutLog[exercise.name];
        // Skip if no log data exists for this exercise definition
        if (!logData) return null;

        // Filter out sets that have no data and aren't marked completed
        const loggedSets = Array.isArray(logData.sets)
            ? logData.sets.filter(set => set.weight || set.reps || set.completed)
            : [];

        // Skip saving this exercise if it wasn't marked completed AND has no logged sets
        if (loggedSets.length === 0 && !logData.completed) return null;

        // Format the data to be saved
        return {
            name: logData.substitutionUsed || exercise.name, // Cambia aquí: guarda el nombre de la sustitución si existe
            completed: logData.completed,
            sets: loggedSets.map(s => ({
                weight: s.weight || '0', // Default to '0' if empty
                reps: s.reps || '0',     // Default to '0' if empty
                completed: s.completed
            })),
            notes: logData.notes || '', // Include notes
            substitutionUsed: logData.substitutionUsed || null, // Include substitution used
        };
    }).filter(Boolean); // Remove null entries (exercises that were skipped)

    // Check if there's anything actually logged to save
    if (exercisesToSave.length === 0) {
        showNotification("No se registró ningún dato o ejercicio completado para guardar.", "error");
        return;
    }

    // Create the history entry
    const newEntry = {
        id: Date.now(), // Use timestamp as a unique ID
        date: `${formattedDate} ${formattedTime}`,
        week: state.currentWeek,
        day: state.currentDay, // Save the day key ('upperA', etc.)
        workout: exercisesToSave
    };

    // Add to history (at the beginning for newest first) and save
    state.history.unshift(newEntry);
    saveHistory();

    // Clear the current workout log from storage and state
    clearWorkoutLogFromStorage();
    state.workoutLog = initializeWorkoutLog(exercises); // Reset state log

    // Reset the timer
    pauseTimer();
    state.timer.seconds = 0;

    // Notify user and update UI
    showNotification("Rutina guardada exitosamente.", "success");
    updateUI(); // Refresh the display (clears inputs, updates history)
    // Mejora UX: Desplaza suavemente al historial tras guardar
    setTimeout(() => {
        const historySection = document.getElementById('history-list');
        if (historySection) historySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
};

const handleClearWorkout = () => {
    // Confirm with the user
    if (window.confirm("¿Estás seguro de que quieres borrar todo el progreso de la rutina actual? Esta acción no se puede deshacer.")) {
        const exercises = getCurrentExercises(state.currentWeek, state.currentDay);
        // Clear from storage first
        clearWorkoutLogFromStorage();
        // Reset the state log
        state.workoutLog = initializeWorkoutLog(exercises);
        // Reset the timer
        pauseTimer();
        state.timer.seconds = 0;
        // Notify user and update UI
        showNotification("Progreso de la rutina actual borrado.", "info");
        updateUI(); // Refresh the display (clears inputs)
    }
};

const handleClearHistory = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar todo el historial guardado? Esta acción no se puede deshacer.")) {
        state.history = [];
        saveHistory();
        showNotification("Historial eliminado.", "info");
        updateUI();
    }
};

// --- Event Listener Setup ---
const addExerciseEventListeners = () => {
    // Use event delegation on the container for efficiency

    // Handle input changes (live typing) in weight/reps/notes fields
    exerciseListContainer.addEventListener('input', (e) => {
        const target = e.target;
        const card = target.closest('.exercise-card');
        if (!card) return; // Ignore events outside exercise cards
        const exerciseName = card.dataset.exerciseName;
        if (!exerciseName) return; // Ignore if card has no name data

        if (target.matches('.set-input-weight, .set-input-reps')) {
            const setIndex = parseInt(target.dataset.setIndex, 10);
            const field = target.classList.contains('set-input-weight') ? 'weight' : 'reps';
            handleSetInputChange(exerciseName, setIndex, field, target.value);
        } else if (target.matches('.notes-input')) {
            handleNotesChange(exerciseName, target.value);
        }
    });

    // Handle changes that occur on blur or selection (checkboxes, select dropdown)
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

    // Handle clicks on specific buttons (start timer)
    exerciseListContainer.addEventListener('click', (e) => {
        // Use closest to handle clicks on the icon inside the button
        const target = e.target.closest('.start-timer-btn');
        if (target) {
            const restTime = parseInt(target.dataset.restTime, 10);
            if (!isNaN(restTime)) { // Ensure restTime is a valid number
                 startTimer(restTime);
            } else {
                 console.warn("Invalid rest time data:", target.dataset.restTime);
                 startTimer(90); // Fallback to default if data is bad
            }
        }
    });

    // Handle blur events for input validation feedback (more robust than 'input')
    exerciseListContainer.addEventListener('blur', (e) => {
        const target = e.target;
        const card = target.closest('.exercise-card');
        if (!card) return;
        const exerciseName = card.dataset.exerciseName;
        if (!exerciseName || !state.workoutLog[exerciseName]) return; // Check log exists too

        if (target.matches('.set-input-weight')) {
            const setIndex = parseInt(target.dataset.setIndex, 10);
            const value = target.value;
            const isValid = value === '' || /^\d*\.?\d*$/.test(value);
            if (!isValid && value !== '') {
                // Revert to stored value if invalid input is left on blur
                target.value = state.workoutLog[exerciseName]?.sets[setIndex]?.weight || '';
                showNotification(`Peso inválido introducido: "${value}". Use solo números y un punto decimal opcional.`, 'error', 4000);
            } else if (value.endsWith('.')) {
                // If input ends with a decimal point on blur, remove it and update state
                target.value = value.slice(0, -1);
                handleSetInputChange(exerciseName, setIndex, 'weight', target.value);
            }
        } else if (target.matches('.set-input-reps')) {
            const setIndex = parseInt(target.dataset.setIndex, 10);
            const value = target.value;
            const isValid = value === '' || /^\d+$/.test(value); // Must be whole number
            if (!isValid && value !== '') {
                // Revert to stored value if invalid input is left on blur
                target.value = state.workoutLog[exerciseName]?.sets[setIndex]?.reps || '';
                showNotification(`Número de repeticiones inválido: "${value}". Use solo números enteros.`, 'error', 4000);
            }
        }
    }, true); // Use capture phase to catch blur before it bubbles away
};

const addGlobalEventListeners = () => {
    // Null check buttons before adding listeners
    prevWeekBtn?.addEventListener('click', () => handleWeekChange(-1));
    nextWeekBtn?.addEventListener('click', () => handleWeekChange(1));

    // Add listeners for all tab buttons
    Object.keys(tabButtons).forEach(dayKey => {
        tabButtons[dayKey]?.addEventListener('click', () => handleDayChange(dayKey));
    });

    saveWorkoutBtn?.addEventListener('click', handleSaveWorkout);
    clearWorkoutBtn?.addEventListener('click', handleClearWorkout);

    // Add listener for dark mode toggle
    darkModeToggle?.addEventListener('click', toggleDarkMode);

    // Botón para eliminar historial
    clearHistoryBtn?.addEventListener('click', handleClearHistory);
};

// --- Initialization ---
const initializeApp = () => {
    loadDarkModePreference(); // Load dark mode preference first
    loadHistory();          // Load saved history
    loadWorkoutLog();       // Load current workout state (or initialize)
    addGlobalEventListeners(); // Set up buttons, tabs, etc.
    addExerciseEventListeners(); // Set up listeners for dynamic exercise content
    updateUI();             // Initial render of the application
    // Mejora: Añade atajo de teclado para guardar rutina (Ctrl+S)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            handleSaveWorkout();
        }
    });
};

// --- Run App ---
// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initializeApp);
