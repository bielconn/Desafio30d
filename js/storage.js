// Storage & Data Management for Desafio 30 Dias (Setembro)
const HabitStorage = (() => {
  const HABITS_KEY = 'desafio30d_habits_v2';
  const HABITS_LEGACY_KEY = 'desafio30d_habits_v1';
  const CHECKS_KEY = 'desafio30d_checks_v2';
  const CHECKS_LEGACY_KEY = 'desafio30d_checks_v1';
  const TASKS_KEY = 'desafio30d_tasks_v2';
  const TASKS_LEGACY_KEY = 'desafio30d_tasks_v1';
  const JOURNAL_KEY = 'desafio30d_journal_v1';
  const FOCUS_KEY = 'desafio30d_focus_v1';
  const ALERTS_KEY = 'desafio30d_alerts_v2';
  const ACTIVE_BOOK_KEY = 'desafio30d_active_book_v1';
  const ACTIVE_BIBLE_KEY = 'desafio30d_active_bible_v1';
  const SETTINGS_KEY = 'desafio30d_settings_v1';
  const WORKOUTS_KEY = 'desafio30d_workouts_v1';
  const WORKOUT_ROUTINES_KEY = 'desafio30d_custom_routines_v1';
  const WORKOUT_SCHEDULE_KEY = 'desafio30d_workout_schedule_v1';

  // 30 Personalized Habits from user with multi-count & Pomodoro eligibility
  const DEFAULT_HABITS = [
    { id: 'h1', title: 'Acordar antes das 8h', emoji: '🌅', period: 'morning', category: 'Mente', hasPomodoro: false, defaultMinutes: 0, targetCount: 1 },
    { id: 'h2', title: 'Meditação 5–10 min', emoji: '🧘', period: 'morning', category: 'Mente', hasPomodoro: true, defaultMinutes: 10, targetCount: 1 },
    { id: 'h3', title: 'Escovar os dentes 3×', emoji: '🦷', period: 'morning', category: 'Saúde', hasPomodoro: false, defaultMinutes: 0, targetCount: 3 },
    { id: 'h4', title: 'Abdominal + Alongamento 20 min', emoji: '🚶', period: 'afternoon', category: 'Saúde', hasPomodoro: true, defaultMinutes: 20, targetCount: 1 },
    { id: 'h5', title: 'Banho 2× dia', emoji: '🚿', period: 'anytime', category: 'Saúde', hasPomodoro: false, defaultMinutes: 0, targetCount: 2 },
    { id: 'h6', title: 'Leitura – Mínimo 5 páginas', emoji: '📖', period: 'morning', category: 'Aprendizado', hasPomodoro: true, defaultMinutes: 15, targetCount: 1 },
    { id: 'h7', title: 'Sem gastos desnecessários', emoji: '💰', period: 'anytime', category: 'Organização', hasPomodoro: false, defaultMinutes: 0, targetCount: 1 },
    { id: 'h8', title: 'Bíblia – 1 Cap', emoji: '📖', period: 'morning', category: 'Mente', hasPomodoro: true, defaultMinutes: 15, targetCount: 1 },
    { id: 'h9', title: 'Ficar em pé a cada hora', emoji: '🚶', period: 'anytime', category: 'Saúde', hasPomodoro: false, defaultMinutes: 0, targetCount: 1 },
    { id: 'h10', title: 'Sem rede social (fora dia de jogo)', emoji: '⛔', period: 'anytime', category: 'Saúde', hasPomodoro: false, defaultMinutes: 0, targetCount: 1 },
    { id: 'h11', title: 'Sem vício', emoji: '🔞', period: 'anytime', category: 'Saúde', hasPomodoro: false, defaultMinutes: 0, targetCount: 1 },
    { id: 'h12', title: 'Sem comer besteira', emoji: '🔴', period: 'anytime', category: 'Saúde', hasPomodoro: false, defaultMinutes: 0, targetCount: 1 },
    { id: 'h13', title: 'Minerar ofertas (Drop)', emoji: '🛒', period: 'afternoon', category: 'Foco', hasPomodoro: true, defaultMinutes: 30, targetCount: 1 },
    { id: 'h14', title: 'Minerar novos reels', emoji: '📺', period: 'afternoon', category: 'Foco', hasPomodoro: true, defaultMinutes: 25, targetCount: 1 },
    { id: 'h15', title: 'Separar 3 reels por dia', emoji: '📼', period: 'afternoon', category: 'Foco', hasPomodoro: true, defaultMinutes: 20, targetCount: 3 },
    { id: 'h16', title: 'Estudar lowticket', emoji: '💸', period: 'afternoon', category: 'Foco', hasPomodoro: true, defaultMinutes: 30, targetCount: 1 },
    { id: 'h17', title: 'Aprender algo novo – 10 min', emoji: '📝', period: 'morning', category: 'Aprendizado', hasPomodoro: true, defaultMinutes: 10, targetCount: 1 },
    { id: 'h18', title: 'Responder clientes/Comentários', emoji: '👥', period: 'anytime', category: 'Organização', hasPomodoro: true, defaultMinutes: 25, targetCount: 1 },
    { id: 'h19', title: 'Colocar 2 produtos novos e já editar a página', emoji: '📦', period: 'afternoon', category: 'Foco', hasPomodoro: true, defaultMinutes: 40, targetCount: 2 },
    { id: 'h20', title: 'Passar prot. Solar + Sol – 5 min', emoji: '☀️', period: 'anytime', category: 'Saúde', hasPomodoro: false, defaultMinutes: 0, targetCount: 1 },
    { id: 'h21', title: 'Passar babosa no Rosto', emoji: '😊', period: 'anytime', category: 'Saúde', hasPomodoro: false, defaultMinutes: 0, targetCount: 1 },
    { id: 'h22', title: 'Postar 1 reel no tiktok', emoji: '📹', period: 'afternoon', category: 'Foco', hasPomodoro: true, defaultMinutes: 15, targetCount: 1 },
    { id: 'h23', title: 'Organizar o PC/Arquivos', emoji: '💻', period: 'anytime', category: 'Organização', hasPomodoro: true, defaultMinutes: 25, targetCount: 1 },
    { id: 'h24', title: 'Organizar posts Salvos', emoji: '💡', period: 'evening', category: 'Organização', hasPomodoro: true, defaultMinutes: 15, targetCount: 1 },
    { id: 'h25', title: 'Caminhada leve', emoji: '🚶', period: 'evening', category: 'Saúde', hasPomodoro: true, defaultMinutes: 25, targetCount: 1 },
    { id: 'h26', title: 'Estudar Google Ads', emoji: '🎯', period: 'afternoon', category: 'Aprendizado', hasPomodoro: true, defaultMinutes: 30, targetCount: 1 },
    { id: 'h27', title: 'Organizar contas/senhas', emoji: '📝', period: 'evening', category: 'Organização', hasPomodoro: true, defaultMinutes: 15, targetCount: 1 },
    { id: 'h28', title: 'Planejar o dia seguinte', emoji: '📝', period: 'evening', category: 'Organização', hasPomodoro: true, defaultMinutes: 10, targetCount: 1 },
    { id: 'h29', title: 'Limpar emails', emoji: '📝', period: 'morning', category: 'Organização', hasPomodoro: true, defaultMinutes: 15, targetCount: 1 },
    { id: 'h30', title: 'Escrever o que fiz no dia', emoji: '📝', period: 'evening', category: 'Mente', hasPomodoro: true, defaultMinutes: 10, targetCount: 1 }
  ];

  const DEFAULT_ALERTS = [
    {
      id: 'alert_fisio_1',
      title: 'Consulta de Fisioterapia (Sessão 1/3)',
      day: 2,
      dateKey: '2026-09-02',
      time: '15:00',
      category: 'Saúde',
      icon: '🏥',
      isRecurring: false,
      isDone: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'alert_gemini_cancel',
      title: 'Cancelar plano Pro no Gemini (expira dia 5)',
      day: 4,
      dateKey: '2026-09-04',
      time: '12:00',
      category: 'Financeiro',
      icon: '🚨',
      isRecurring: false,
      isDone: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'alert_fisio_2',
      title: 'Consulta de Fisioterapia (Sessão 2/3)',
      day: 4,
      dateKey: '2026-09-04',
      time: '15:00',
      category: 'Saúde',
      icon: '🏥',
      isRecurring: false,
      isDone: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'alert_fisio_3',
      title: 'Consulta de Fisioterapia (Última Sessão 3/3)',
      day: 9,
      dateKey: '2026-09-09',
      time: '15:00',
      category: 'Saúde',
      icon: '🏥',
      isRecurring: false,
      isDone: false,
      createdAt: new Date().toISOString()
    }
  ];

  const BADGES = [
    { id: 'badge_first_check', title: 'Primeiro Passo', desc: 'Marque o primeiro hábito do desafio', icon: '🌱', threshold: { type: 'total_checks', value: 1 } },
    { id: 'badge_first_100', title: 'Dia Perfeito', desc: 'Conclua 100% dos hábitos em 1 dia', icon: '⭐', threshold: { type: 'perfect_days', value: 1 } },
    { id: 'badge_streak_3', title: 'Embalando o Ritmo', desc: 'Consistência de 3 dias consecutivos', icon: '🔥', threshold: { type: 'streak', value: 3 } },
    { id: 'badge_streak_7', title: 'Semana de Ouro', desc: '7 dias consecutivos com alta consistência', icon: '🏆', threshold: { type: 'streak', value: 7 } },
    { id: 'badge_focus_5h', title: 'Mestre da Concentração', desc: 'Acumule 5 horas de Pomodoro/Foco', icon: '⏱️', threshold: { type: 'total_focus_minutes', value: 300 } },
    { id: 'badge_100_checks', title: 'Centurião dos Hábitos', desc: 'Acumule 100 checks realizados', icon: '⚡', threshold: { type: 'total_checks', value: 100 } },
    { id: 'badge_halfway', title: 'Metade da Jornada', desc: '15 dias de dedicação concluídos', icon: '🎯', threshold: { type: 'active_days', value: 15 } },
    { id: 'badge_streak_21', title: 'Hábito Cristalizado', desc: '21 dias consecutivos de transformação', icon: '💎', threshold: { type: 'streak', value: 21 } },
    { id: 'badge_master_30', title: 'Lenda de Setembro', desc: '30 dias do desafio conquistados!', icon: '👑', threshold: { type: 'active_days', value: 30 } }
  ];

  function formatDateKey(year, month, day) {
    const y = year;
    const m = String(month).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function parseDayFromDateKey(dateKey) {
    if (!dateKey) return 1;
    const parts = dateKey.split('-');
    return parseInt(parts[2], 10) || 1;
  }

  // --- HABITS ---
  function getHabits() {
    try {
      const data = localStorage.getItem(HABITS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      const legacyData = localStorage.getItem(HABITS_LEGACY_KEY);
      if (legacyData) {
        const parsed = JSON.parse(legacyData);
        const merged = parsed.map(h => {
          const defaultRef = DEFAULT_HABITS.find(d => d.id === h.id);
          return {
            ...h,
            targetCount: h.targetCount || (defaultRef ? defaultRef.targetCount : 1)
          };
        });
        saveHabits(merged);
        return merged;
      }
    } catch (e) {
      console.error('Error reading habits', e);
    }
    saveHabits(DEFAULT_HABITS);
    return DEFAULT_HABITS;
  }

  function saveHabits(habits) {
    try {
      localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    } catch (e) {
      console.error('Error saving habits', e);
    }
  }

  function addHabit(habit) {
    const habits = getHabits();
    const newHabit = {
      id: 'h_' + Date.now(),
      title: habit.title.trim(),
      emoji: habit.emoji || '🎯',
      period: habit.period || 'anytime',
      category: habit.category || 'Geral',
      hasPomodoro: !!habit.hasPomodoro,
      defaultMinutes: habit.defaultMinutes || 25,
      targetCount: parseInt(habit.targetCount, 10) || 1
    };
    habits.push(newHabit);
    saveHabits(habits);
    return newHabit;
  }

  function updateHabit(id, updatedFields) {
    const habits = getHabits();
    const index = habits.findIndex(h => h.id === id);
    if (index !== -1) {
      habits[index] = { ...habits[index], ...updatedFields };
      if (updatedFields.targetCount !== undefined) {
        habits[index].targetCount = parseInt(updatedFields.targetCount, 10) || 1;
      }
      saveHabits(habits);
      return habits[index];
    }
    return null;
  }

  function deleteHabit(id) {
    const habits = getHabits();
    const filtered = habits.filter(h => h.id !== id);
    saveHabits(filtered);
    
    const checks = getAllChecks();
    let modified = false;
    Object.keys(checks).forEach(dateKey => {
      if (checks[dateKey] && checks[dateKey][id] !== undefined) {
        delete checks[dateKey][id];
        modified = true;
      }
    });
    if (modified) {
      saveAllChecks(checks);
    }
    return filtered;
  }

  function resetHabitsToDefault() {
    saveHabits(DEFAULT_HABITS);
    return DEFAULT_HABITS;
  }

  // --- HABIT CHECKS ---
  function getAllChecks() {
    try {
      const data = localStorage.getItem(CHECKS_KEY);
      if (data) return JSON.parse(data);

      const legacy = localStorage.getItem(CHECKS_LEGACY_KEY);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        saveAllChecks(parsed);
        return parsed;
      }
      return {};
    } catch (e) {
      console.error('Error reading checks', e);
      return {};
    }
  }

  function saveAllChecks(checks) {
    try {
      localStorage.setItem(CHECKS_KEY, JSON.stringify(checks));
    } catch (e) {
      console.error('Error saving checks', e);
    }
  }

  function getDayChecks(dateKey) {
    const all = getAllChecks();
    return all[dateKey] || {};
  }

  function getHabitCheckCount(dateKey, habitId, targetCount = 1) {
    const dayChecks = getDayChecks(dateKey);
    const val = dayChecks[habitId];
    if (val === true) return targetCount;
    if (val === false || val === undefined || val === null) return 0;
    if (typeof val === 'number') return Math.max(0, val);
    return 0;
  }

  function isHabitChecked(dateKey, habitId, targetCount = 1) {
    const count = getHabitCheckCount(dateKey, habitId, targetCount);
    return count >= targetCount && targetCount > 0;
  }

  function setHabitCheckCount(dateKey, habitId, count, targetCount = 1) {
    const all = getAllChecks();
    if (!all[dateKey]) all[dateKey] = {};

    const safeCount = Math.max(0, Math.min(count, targetCount));
    all[dateKey][habitId] = safeCount >= targetCount ? true : safeCount;
    saveAllChecks(all);
    return safeCount;
  }

  function incrementHabitCheck(dateKey, habitId, targetCount = 1) {
    const current = getHabitCheckCount(dateKey, habitId, targetCount);
    let nextCount = current + 1;
    if (nextCount > targetCount) {
      nextCount = 0;
    }
    setHabitCheckCount(dateKey, habitId, nextCount, targetCount);
    return {
      count: nextCount,
      isComplete: nextCount >= targetCount && targetCount > 0
    };
  }

  function toggleCheck(dateKey, habitId, targetCount = 1) {
    const isCompleted = isHabitChecked(dateKey, habitId, targetCount);
    const newCount = isCompleted ? 0 : targetCount;
    setHabitCheckCount(dateKey, habitId, newCount, targetCount);
    return !isCompleted;
  }

  function setCheck(dateKey, habitId, value, targetCount = 1) {
    const count = value ? targetCount : 0;
    setHabitCheckCount(dateKey, habitId, count, targetCount);
    return !!value;
  }

  function setAllDayChecks(dateKey, value) {
    const habits = getHabits();
    const all = getAllChecks();
    if (!all[dateKey]) all[dateKey] = {};

    habits.forEach(h => {
      const target = h.targetCount || 1;
      all[dateKey][h.id] = value ? true : 0;
    });
    saveAllChecks(all);
    return all[dateKey];
  }

  // --- PROGRESS & STATS ---
  function getDayProgress(year, month, day) {
    const dateKey = formatDateKey(year, month, day);
    const habits = getHabits();
    const total = habits.length;
    if (total === 0) return { total: 0, completed: 0, percentage: 0, isComplete: false };
    
    let completed = 0;
    habits.forEach(h => {
      const target = h.targetCount || 1;
      if (isHabitChecked(dateKey, h.id, target)) {
        completed++;
      }
    });

    const percentage = Math.round((completed / total) * 100);
    return { total, completed, percentage, isComplete: completed === total && total > 0 };
  }

  // --- POMODORO & FOCUS TIME MANAGEMENT ---
  function getAllFocusData() {
    try {
      const data = localStorage.getItem(FOCUS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error reading focus data', e);
      return {};
    }
  }

  function saveAllFocusData(focusData) {
    try {
      localStorage.setItem(FOCUS_KEY, JSON.stringify(focusData));
    } catch (e) {
      console.error('Error saving focus data', e);
    }
  }

  function getDayFocus(dateKey) {
    const all = getAllFocusData();
    return all[dateKey] || { totalMinutes: 0, sessions: [] };
  }

  function addFocusSession(dateKey, habitId, minutes, habitTitle = '') {
    const all = getAllFocusData();
    if (!all[dateKey]) {
      all[dateKey] = { totalMinutes: 0, sessions: [] };
    }
    const session = {
      id: 'foc_' + Date.now(),
      habitId: habitId || null,
      habitTitle: habitTitle || 'Foco Livre',
      minutes: parseInt(minutes, 10) || 0,
      timestamp: new Date().toISOString()
    };
    all[dateKey].sessions.push(session);
    all[dateKey].totalMinutes += session.minutes;
    saveAllFocusData(all);
    return all[dateKey];
  }

  function formatMinutes(minutes) {
    if (!minutes || minutes <= 0) return '0h';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) {
      return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }
    return `${m}m`;
  }

  function getSeptemberSummary(year = 2026) {
    const habits = getHabits();
    const totalHabits = habits.length;
    const allFocus = getAllFocusData();
    
    let totalChecksPossible = totalHabits * 30;
    let totalChecksDone = 0;
    let perfectDays = 0;
    let activeDays = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    let totalFocusMinutesMonth = 0;

    const daysData = [];

    for (let day = 1; day <= 30; day++) {
      const dateKey = formatDateKey(year, 9, day);
      const dayFocus = allFocus[dateKey] || { totalMinutes: 0 };
      let completedInDay = 0;

      totalFocusMinutesMonth += (dayFocus.totalMinutes || 0);

      habits.forEach(h => {
        const target = h.targetCount || 1;
        if (isHabitChecked(dateKey, h.id, target)) {
          completedInDay++;
          totalChecksDone++;
        }
      });

      const percentage = totalHabits > 0 ? Math.round((completedInDay / totalHabits) * 100) : 0;
      if (completedInDay > 0 || (dayFocus.totalMinutes && dayFocus.totalMinutes > 0)) activeDays++;
      if (completedInDay === totalHabits && totalHabits > 0) perfectDays++;

      if (percentage >= 60) {
        tempStreak++;
        if (tempStreak > maxStreak) maxStreak = tempStreak;
      } else {
        tempStreak = 0;
      }

      daysData.push({
        day,
        dateKey,
        completed: completedInDay,
        total: totalHabits,
        percentage,
        focusMinutes: dayFocus.totalMinutes || 0,
        isPerfect: completedInDay === totalHabits && totalHabits > 0
      });
    }

    const overallPercentage = totalChecksPossible > 0 ? Math.round((totalChecksDone / totalChecksPossible) * 100) : 0;

    const stats = {
      total_checks: totalChecksDone,
      perfect_days: perfectDays,
      active_days: activeDays,
      streak: maxStreak,
      total_focus_minutes: totalFocusMinutesMonth
    };

    const unlockedBadges = BADGES.map(badge => {
      let isUnlocked = false;
      const t = badge.threshold;
      if (t.type === 'total_checks') isUnlocked = stats.total_checks >= t.value;
      if (t.type === 'perfect_days') isUnlocked = stats.perfect_days >= t.value;
      if (t.type === 'active_days') isUnlocked = stats.active_days >= t.value;
      if (t.type === 'streak') isUnlocked = stats.streak >= t.value;
      if (t.type === 'total_focus_minutes') isUnlocked = stats.total_focus_minutes >= t.value;
      return { ...badge, unlocked: isUnlocked };
    });

    return {
      year,
      month: 9,
      totalHabits,
      totalChecksDone,
      totalChecksPossible,
      overallPercentage,
      perfectDays,
      activeDays,
      currentStreak: tempStreak,
      maxStreak,
      totalFocusMinutesMonth,
      daysData,
      unlockedBadges
    };
  }

  function getHabitStats(habitId, year = 2026) {
    const habits = getHabits();
    const habit = habits.find(h => h.id === habitId);
    const target = habit ? (habit.targetCount || 1) : 1;

    let completedDays = 0;
    for (let day = 1; day <= 30; day++) {
      const dateKey = formatDateKey(year, 9, day);
      if (isHabitChecked(dateKey, habitId, target)) {
        completedDays++;
      }
    }
    return {
      completedDays,
      percentage: Math.round((completedDays / 30) * 100)
    };
  }

  // --- TAREFAS AVULSAS DO DIA COM ROLLOVER (TO-DO LIST) ---
  function getAllTasksRaw() {
    try {
      const data = localStorage.getItem(TASKS_KEY);
      if (data) return JSON.parse(data);

      const legacyData = localStorage.getItem(TASKS_LEGACY_KEY);
      if (legacyData) {
        const parsed = JSON.parse(legacyData);
        const migratedList = [];
        Object.keys(parsed).forEach(dKey => {
          if (Array.isArray(parsed[dKey])) {
            parsed[dKey].forEach(t => {
              migratedList.push({
                id: t.id || 'task_' + Date.now() + Math.random(),
                title: t.title,
                createdDateKey: dKey,
                createdDay: parseDayFromDateKey(dKey),
                done: !!t.done,
                completedDateKey: t.done ? dKey : null,
                completedDay: t.done ? parseDayFromDateKey(dKey) : null,
                createdAt: t.createdAt || new Date().toISOString()
              });
            });
          }
        });
        saveAllTasks(migratedList);
        return migratedList;
      }
      return [];
    } catch (e) {
      console.error('Error reading tasks', e);
      return [];
    }
  }

  function saveAllTasks(tasksList) {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasksList));
    } catch (e) {
      console.error('Error saving tasks', e);
    }
  }

  function getDayTasks(dateKey) {
    const all = getAllTasksRaw();
    const currentDay = parseDayFromDateKey(dateKey);

    return all.filter(task => {
      const createdDay = task.createdDay || parseDayFromDateKey(task.createdDateKey);
      
      if (createdDay > currentDay) {
        return false;
      }

      if (!task.done) {
        return true;
      }

      const compDay = task.completedDay || parseDayFromDateKey(task.completedDateKey || task.createdDateKey);
      return compDay === currentDay;
    }).map(task => {
      const createdDay = task.createdDay || parseDayFromDateKey(task.createdDateKey);
      const isCarriedOver = createdDay < currentDay && !task.done;
      return {
        ...task,
        isCarriedOver,
        daysPending: currentDay - createdDay
      };
    });
  }

  function addTask(dateKey, title) {
    const all = getAllTasksRaw();
    const day = parseDayFromDateKey(dateKey);
    const newTask = {
      id: 'task_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      title: title.trim(),
      createdDateKey: dateKey,
      createdDay: day,
      done: false,
      completedDateKey: null,
      completedDay: null,
      createdAt: new Date().toISOString()
    };
    all.push(newTask);
    saveAllTasks(all);
    return newTask;
  }

  function toggleTask(dateKey, taskId) {
    const all = getAllTasksRaw();
    const task = all.find(t => t.id === taskId);
    if (task) {
      task.done = !task.done;
      if (task.done) {
        task.completedDateKey = dateKey;
        task.completedDay = parseDayFromDateKey(dateKey);
        task.completedAt = new Date().toISOString();
      } else {
        task.completedDateKey = null;
        task.completedDay = null;
        task.completedAt = null;
      }
      saveAllTasks(all);
      return task.done;
    }
    return false;
  }

  function deleteTask(taskId) {
    let all = getAllTasksRaw();
    all = all.filter(t => t.id !== taskId);
    saveAllTasks(all);
    return true;
  }

  // --- ALERTAS PRIORITÁRIOS ---
  function getAllAlerts() {
    try {
      const data = localStorage.getItem(ALERTS_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading alerts', e);
    }
    saveAllAlerts(DEFAULT_ALERTS);
    return DEFAULT_ALERTS;
  }

  function saveAllAlerts(alerts) {
    try {
      localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
    } catch (e) {
      console.error('Error saving alerts', e);
    }
  }

  function addAlert(alertData) {
    const all = getAllAlerts();
    const newAlert = {
      id: 'alert_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      title: alertData.title.trim(),
      day: alertData.day ? parseInt(alertData.day, 10) : null,
      dateKey: alertData.dateKey || (alertData.day ? formatDateKey(2026, 9, alertData.day) : null),
      time: alertData.time || '',
      category: alertData.category || 'Urgente',
      icon: alertData.icon || '🚨',
      isRecurring: !!alertData.isRecurring,
      recurringWeekday: alertData.recurringWeekday !== undefined ? parseInt(alertData.recurringWeekday, 10) : null,
      untilDay: alertData.untilDay ? parseInt(alertData.untilDay, 10) : null,
      isDone: false,
      createdAt: new Date().toISOString()
    };
    all.push(newAlert);
    saveAllAlerts(all);
    return newAlert;
  }

  function toggleAlertDone(alertId) {
    const all = getAllAlerts();
    const alert = all.find(a => a.id === alertId);
    if (alert) {
      alert.isDone = !alert.isDone;
      saveAllAlerts(all);
      return alert.isDone;
    }
    return false;
  }

  function deleteAlert(alertId) {
    let all = getAllAlerts();
    all = all.filter(a => a.id !== alertId);
    saveAllAlerts(all);
    return true;
  }

  function getDayAlerts(year, month, day) {
    const all = getAllAlerts();
    const dateObj = new Date(year, month - 1, day);
    const dayWeekday = dateObj.getDay();

    return all.filter(a => {
      if (a.isRecurring) {
        if (a.untilDay && day > a.untilDay) return false;
        return a.recurringWeekday === dayWeekday;
      }
      return a.day === day;
    });
  }

  // --- LIVRO ATIVO PERSISTENTE (Fica salvo entre os dias) ---
  function getActiveBook() {
    try {
      const data = localStorage.getItem(ACTIVE_BOOK_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading active book', e);
    }
    return {
      title: '',
      author: '',
      coverUrl: '',
      updatedAt: null
    };
  }

  function saveActiveBook(bookData) {
    try {
      const current = getActiveBook();
      const updated = {
        ...current,
        ...bookData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(ACTIVE_BOOK_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving active book', e);
      return bookData;
    }
  }

  // --- DIÁRIO DE BORDO & NOTAS DE LEITURA DO DIA ---
  function getAllJournals() {
    try {
      const data = localStorage.getItem(JOURNAL_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error reading journals', e);
      return {};
    }
  }

  function saveAllJournals(journals) {
    try {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
    } catch (e) {
      console.error('Error saving journals', e);
    }
  }

  // --- BÍBLIA ATIVA PERSISTENTE ---
  function getActiveBible() {
    try {
      const data = localStorage.getItem(ACTIVE_BIBLE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading active bible', e);
    }
    return { chapter: '', updatedAt: null };
  }

  function saveActiveBible(bibleData) {
    try {
      const updated = { ...bibleData, updatedAt: new Date().toISOString() };
      localStorage.setItem(ACTIVE_BIBLE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving active bible', e);
      return bibleData;
    }
  }

  function getDayJournal(dateKey) {
    const all = getAllJournals();
    const activeBook = getActiveBook();
    const activeBible = getActiveBible();
    const dayData = all[dateKey] || {};

    // Se o dia não tem livro preenchido explicitamente, herda o livro ativo salvo
    const bookTitle = (dayData.bookTitle !== undefined && dayData.bookTitle !== '') 
      ? dayData.bookTitle 
      : activeBook.title;

    const bookCover = dayData.bookCover || activeBook.coverUrl || '';

    // Herda o capítulo da Bíblia ativo se o dia não tiver um registrado
    const bibleChapter = (dayData.bibleChapter !== undefined && dayData.bibleChapter !== '')
      ? dayData.bibleChapter
      : activeBible.chapter || '';

    return {
      entry: dayData.entry || '',
      bookTitle: bookTitle || '',
      bookPage: dayData.bookPage || '',
      bookCover: bookCover || '',
      bibleChapter: bibleChapter || '',
      updatedAt: dayData.updatedAt || null
    };
  }

  function saveDayJournal(dateKey, journalData) {
    const all = getAllJournals();
    all[dateKey] = {
      entry: journalData.entry || '',
      bookTitle: journalData.bookTitle !== undefined ? journalData.bookTitle : '',
      bookPage: journalData.bookPage || '',
      bookCover: journalData.bookCover || '',
      bibleChapter: journalData.bibleChapter !== undefined ? journalData.bibleChapter : '',
      updatedAt: new Date().toISOString()
    };
    saveAllJournals(all);

    // Se informou um título ou capa, atualiza também o livro ativo global para os próximos dias
    if (journalData.bookTitle || journalData.bookCover) {
      saveActiveBook({
        title: journalData.bookTitle || '',
        coverUrl: journalData.bookCover || ''
      });
    }

    // Se informou um capítulo da Bíblia, atualiza o livro bíblico ativo
    if (journalData.bibleChapter !== undefined) {
      saveActiveBible({ chapter: journalData.bibleChapter || '' });
    }

    return all[dateKey];
  }

  function hasDayActivity(dateKey) {
    const day = parseDayFromDateKey(dateKey);
    const tasks = getDayTasks(dateKey);
    const journal = getDayJournal(dateKey);
    const focus = getDayFocus(dateKey);
    const alerts = getDayAlerts(2026, 9, day);

    const hasTasks = tasks.length > 0;
    const hasPendingTasks = tasks.some(t => !t.done);
    const hasJournal = !!(journal.entry && journal.entry.trim().length > 0) || !!(journal.bookPage && journal.bookPage.trim().length > 0);
    const hasFocus = focus.totalMinutes > 0;
    const hasAlerts = alerts.length > 0;
    
    return { 
      hasTasks, 
      hasPendingTasks, 
      hasJournal, 
      hasFocus, 
      hasAlerts, 
      alertsCount: alerts.length, 
      focusMinutes: focus.totalMinutes, 
      journal,
      bookTitle: journal.bookTitle,
      bookCover: journal.bookCover
    };
  }

  // --- WORKOUTS (Treinos & Ficha com GIFs) ---
  function getAllWorkoutsData() {
    try {
      const data = localStorage.getItem(WORKOUTS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveAllWorkoutsData(data) {
    try {
      localStorage.setItem(WORKOUTS_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving workouts data', e);
    }
  }

  function getDayWorkoutLog(dateKey) {
    const all = getAllWorkoutsData();
    return all[dateKey] || { exercises: {}, notes: '', completed: false };
  }

  function saveDayWorkoutLog(dateKey, logData) {
    const all = getAllWorkoutsData();
    all[dateKey] = {
      ...(all[dateKey] || {}),
      ...logData
    };
    saveAllWorkoutsData(all);
    return all[dateKey];
  }

  function toggleWorkoutSet(dateKey, exerciseId, setIndex) {
    const all = getAllWorkoutsData();
    if (!all[dateKey]) all[dateKey] = { exercises: {}, notes: '', completed: false };
    if (!all[dateKey].exercises[exerciseId]) {
      all[dateKey].exercises[exerciseId] = { setsDone: [], weight: getLastUsedWeight(exerciseId) || '' };
    }

    const exData = all[dateKey].exercises[exerciseId];
    if (!Array.isArray(exData.setsDone)) exData.setsDone = [];

    const idx = exData.setsDone.indexOf(setIndex);
    if (idx >= 0) {
      exData.setsDone.splice(idx, 1);
    } else {
      exData.setsDone.push(setIndex);
      exData.setsDone.sort((a, b) => a - b);
    }

    saveAllWorkoutsData(all);
    return exData.setsDone;
  }

  function setExerciseWeight(dateKey, exerciseId, weight) {
    const all = getAllWorkoutsData();
    if (!all[dateKey]) all[dateKey] = { exercises: {}, notes: '', completed: false };
    if (!all[dateKey].exercises[exerciseId]) {
      all[dateKey].exercises[exerciseId] = { setsDone: [], weight: '' };
    }
    all[dateKey].exercises[exerciseId].weight = weight;
    saveAllWorkoutsData(all);

    try {
      localStorage.setItem(`desafio30d_last_weight_${exerciseId}`, weight);
    } catch (e) {}
  }

  function getLastUsedWeight(exerciseId) {
    try {
      return localStorage.getItem(`desafio30d_last_weight_${exerciseId}`) || '';
    } catch (e) {
      return '';
    }
  }

  // --- WORKOUT ROUTINES (Customização de Exercícios estilo Notion) ---
  function getWorkoutRoutines() {
    try {
      const data = localStorage.getItem(WORKOUT_ROUTINES_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading custom routines', e);
    }
    if (typeof WorkoutData !== 'undefined' && WorkoutData.defaultRoutines) {
      return JSON.parse(JSON.stringify(WorkoutData.defaultRoutines));
    }
    return {};
  }

  function saveWorkoutRoutines(routines) {
    try {
      localStorage.setItem(WORKOUT_ROUTINES_KEY, JSON.stringify(routines));
    } catch (e) {
      console.error('Error saving custom routines', e);
    }
  }

  function resetWorkoutRoutinesToDefault() {
    if (typeof WorkoutData !== 'undefined' && WorkoutData.defaultRoutines) {
      const def = JSON.parse(JSON.stringify(WorkoutData.defaultRoutines));
      saveWorkoutRoutines(def);
      return def;
    }
    return {};
  }

  function saveExercise(routineKey, exerciseData) {
    const routines = getWorkoutRoutines();
    if (!routines[routineKey]) {
      routines[routineKey] = {
        id: routineKey,
        name: `Treino ${routineKey}`,
        subtitle: 'Personalizado',
        badge: 'Rotina',
        color: '#3b82f6',
        exercises: []
      };
    }
    if (!Array.isArray(routines[routineKey].exercises)) {
      routines[routineKey].exercises = [];
    }

    const exList = routines[routineKey].exercises;
    if (exerciseData.id) {
      const idx = exList.findIndex(e => e.id === exerciseData.id);
      if (idx >= 0) {
        exList[idx] = { ...exList[idx], ...exerciseData };
      } else {
        exList.push(exerciseData);
      }
    } else {
      const newEx = {
        ...exerciseData,
        id: 'ex_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        order: exList.length + 1
      };
      exList.push(newEx);
    }

    saveWorkoutRoutines(routines);
    return routines[routineKey];
  }

  function deleteExercise(routineKey, exerciseId) {
    const routines = getWorkoutRoutines();
    if (routines[routineKey] && Array.isArray(routines[routineKey].exercises)) {
      routines[routineKey].exercises = routines[routineKey].exercises.filter(e => e.id !== exerciseId);
      routines[routineKey].exercises.forEach((ex, i) => { ex.order = i + 1; });
      saveWorkoutRoutines(routines);
    }
    return routines[routineKey];
  }

  // --- WORKOUT WEEKLY SCHEDULE (Grade Semanal de Treinos) ---
  const DEFAULT_WORKOUT_SCHEDULE = {
    1: 'A',     // Segunda: Treino A (Peito, Ombro & Tríceps)
    2: 'B',     // Terça: Treino B (Pernas, Quadril & Fortalecimento)
    3: 'REST',  // Quarta: Descanso / Recuperação Ativa
    4: 'C',     // Quinta: Treino C (Costas & Bíceps)
    5: 'D',     // Sexta: Treino D (Ombros, Core & Mobilidade)
    6: 'REST',  // Sábado: Descanso
    0: 'REST'   // Domingo: Descanso
  };

  function getWeeklyWorkoutSchedule() {
    try {
      const data = localStorage.getItem(WORKOUT_SCHEDULE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_WORKOUT_SCHEDULE, ...parsed };
        }
      }
    } catch (e) {
      console.error('Error reading weekly workout schedule', e);
    }
    return { ...DEFAULT_WORKOUT_SCHEDULE };
  }

  function saveWeeklyWorkoutSchedule(schedule) {
    try {
      localStorage.setItem(WORKOUT_SCHEDULE_KEY, JSON.stringify(schedule));
    } catch (e) {
      console.error('Error saving weekly workout schedule', e);
    }
  }

  function resetWeeklyWorkoutSchedule() {
    saveWeeklyWorkoutSchedule(DEFAULT_WORKOUT_SCHEDULE);
    return { ...DEFAULT_WORKOUT_SCHEDULE };
  }

  function getRoutineForDay(year, month, day) {
    const dateObj = new Date(year, month - 1, day);
    const weekday = dateObj.getDay(); // 0 (Dom) a 6 (Sab)
    const schedule = getWeeklyWorkoutSchedule();
    return schedule[weekday] !== undefined ? schedule[weekday] : 'REST';
  }

  // --- BACKUP & RESTORE ---
  function exportBackupJSON() {
    const exportData = {
      version: '3.7',
      exportedAt: new Date().toISOString(),
      appName: 'Desafio 30 Dias de Setembro',
      habits: getHabits(),
      checks: getAllChecks(),
      tasks: getAllTasksRaw(),
      journals: getAllJournals(),
      focus: getAllFocusData(),
      alerts: getAllAlerts(),
      activeBook: getActiveBook(),
      activeBible: getActiveBible(),
      workouts: getAllWorkoutsData(),
      customWorkouts: getWorkoutRoutines(),
      weeklyWorkoutSchedule: getWeeklyWorkoutSchedule()
    };
    return JSON.stringify(exportData, null, 2);
  }

  function importBackupJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.habits && Array.isArray(parsed.habits)) {
        saveHabits(parsed.habits);
      }
      if (parsed.checks && typeof parsed.checks === 'object') {
        saveAllChecks(parsed.checks);
      }
      if (parsed.tasks && Array.isArray(parsed.tasks)) {
        saveAllTasks(parsed.tasks);
      }
      if (parsed.journals && typeof parsed.journals === 'object') {
        saveAllJournals(parsed.journals);
      }
      if (parsed.focus && typeof parsed.focus === 'object') {
        saveAllFocusData(parsed.focus);
      }
      if (parsed.alerts && Array.isArray(parsed.alerts)) {
        saveAllAlerts(parsed.alerts);
      }
      if (parsed.activeBook && typeof parsed.activeBook === 'object') {
        saveActiveBook(parsed.activeBook);
      }
      if (parsed.activeBible && typeof parsed.activeBible === 'object') {
        saveActiveBible(parsed.activeBible);
      }
      if (parsed.workouts && typeof parsed.workouts === 'object') {
        saveAllWorkoutsData(parsed.workouts);
      }
      if (parsed.customWorkouts && typeof parsed.customWorkouts === 'object') {
        saveWorkoutRoutines(parsed.customWorkouts);
      }
      if (parsed.weeklyWorkoutSchedule && typeof parsed.weeklyWorkoutSchedule === 'object') {
        saveWeeklyWorkoutSchedule(parsed.weeklyWorkoutSchedule);
      }
      return { success: true, message: 'Dados restaurados com sucesso!' };
    } catch (e) {
      console.error('Import error', e);
      return { success: false, message: 'Arquivo de backup inválido.' };
    }
  }

  function clearAllData() {
    localStorage.removeItem(HABITS_KEY);
    localStorage.removeItem(HABITS_LEGACY_KEY);
    localStorage.removeItem(CHECKS_KEY);
    localStorage.removeItem(CHECKS_LEGACY_KEY);
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(TASKS_LEGACY_KEY);
    localStorage.removeItem(JOURNAL_KEY);
    localStorage.removeItem(FOCUS_KEY);
    localStorage.removeItem(ALERTS_KEY);
    localStorage.removeItem(ACTIVE_BOOK_KEY);
    localStorage.removeItem(ACTIVE_BIBLE_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(WORKOUTS_KEY);
    localStorage.removeItem(WORKOUT_ROUTINES_KEY);
    localStorage.removeItem(WORKOUT_SCHEDULE_KEY);
    saveHabits(DEFAULT_HABITS);
    saveAllAlerts(DEFAULT_ALERTS);
    resetWorkoutRoutinesToDefault();
    resetWeeklyWorkoutSchedule();
  }

  return {
    formatDateKey,
    parseDayFromDateKey,
    getHabits,
    saveHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    resetHabitsToDefault,
    getDayChecks,
    getHabitCheckCount,
    isHabitChecked,
    setHabitCheckCount,
    incrementHabitCheck,
    toggleCheck,
    setCheck,
    setAllDayChecks,
    getDayProgress,
    getSeptemberSummary,
    getHabitStats,
    // Focus & Pomodoro
    getDayFocus,
    addFocusSession,
    formatMinutes,
    // Tasks with Rollover
    getDayTasks,
    getAllTasksRaw,
    addTask,
    toggleTask,
    deleteTask,
    // Alerts & Priority Commitments
    getAllAlerts,
    addAlert,
    toggleAlertDone,
    deleteAlert,
    getDayAlerts,
    // Book, Bible & Journal
    getActiveBook,
    saveActiveBook,
    getActiveBible,
    saveActiveBible,
    getDayJournal,
    saveDayJournal,
    hasDayActivity,
    getAllJournals,
    // Workouts (Treinos & Ficha com GIFs)
    getAllWorkoutsData,
    saveAllWorkoutsData,
    getDayWorkoutLog,
    saveDayWorkoutLog,
    toggleWorkoutSet,
    setExerciseWeight,
    getLastUsedWeight,
    getWorkoutRoutines,
    saveWorkoutRoutines,
    resetWorkoutRoutinesToDefault,
    saveExercise,
    deleteExercise,
    getWeeklyWorkoutSchedule,
    saveWeeklyWorkoutSchedule,
    resetWeeklyWorkoutSchedule,
    getRoutineForDay,
    DEFAULT_WORKOUT_SCHEDULE,
    // Backup
    exportBackupJSON,
    importBackupJSON,
    clearAllData,
    DEFAULT_HABITS,
    DEFAULT_ALERTS,
    BADGES
  };
})();
