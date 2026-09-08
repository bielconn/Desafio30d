// Main Application Logic for Desafio 30 Dias de Setembro
document.addEventListener('DOMContentLoaded', () => {
  const CURRENT_YEAR = 2026;
  const CURRENT_MONTH = 9; // September
  const TOTAL_DAYS = 30;

  // App State
  let selectedDay = 1;
  let viewingModalDay = 1;
  let activePeriodFilter = 'all';
  let activeTab = 'tab-daily';
  let activeDailySubtab = 'subtab-habits';
  let journalSaveTimeout = null;

  // Workout State (Notion Gallery)
  let activeRoutineId = 'A'; // 'A', 'B', 'C', 'D'
  let workoutRestInterval = null;
  let workoutRestSecondsLeft = 60;
  let workoutRestTargetSeconds = 60;

  // Current Book Cover State in Memory
  let currentDayBookCover = '';

  // Pomodoro State (Continuous Focus / Overtime Support)
  let pomodoroInterval = null;
  let pomodoroSecondsLeft = 25 * 60;
  let pomodoroInitialMinutes = 25;
  let pomodoroOvertimeSeconds = 0;
  let pomodoroTargetReached = false;
  let pomodoroIsRunning = false;
  let pomodoroCurrentHabit = null; // { id, title, emoji }

  // Determine today in September if applicable
  const now = new Date();
  let todayDay = null;
  if (now.getMonth() + 1 === CURRENT_MONTH && now.getFullYear() === CURRENT_YEAR) {
    todayDay = Math.min(Math.max(now.getDate(), 1), TOTAL_DAYS);
    selectedDay = todayDay;
    viewingModalDay = todayDay;
  } else {
    selectedDay = 1;
    viewingModalDay = 1;
  }

  // Motivational Quotes
  const QUOTES = [
    '"Grandes transformações começam com pequenos hábitos diários."',
    '"A disciplina é a ponte entre suas metas e suas realizações."',
    '"Você não precisa ser extremo, apenas 1% consistente todos os dias."',
    '"O segredo do seu futuro está escondido na sua rotina diária."',
    '"Cada check é um voto na pessoa que você escolheu se tornar."',
    '"A consistência vence o talento quando o talento não é consistente."',
    '"Foco no processo. O resultado de 30 dias será impressionante!"'
  ];

  // DOM Elements - Hero & Header
  const currentDateText = document.getElementById('current-date-text');
  const heroQuote = document.getElementById('hero-quote');
  const heroCompletedCount = document.getElementById('hero-completed-count');
  const heroTasksCount = document.getElementById('hero-tasks-count');
  const heroFocusCount = document.getElementById('hero-focus-count');
  const heroMonthProgress = document.getElementById('hero-month-progress');
  const circleProgressFill = document.getElementById('circle-progress-fill');
  const circlePercentText = document.getElementById('circle-percent-text');
  const globalStreakCount = document.getElementById('streak-count');
  const toastContainer = document.getElementById('toast-container');
  const headerTimerText = document.getElementById('header-timer-text');
  const btnHeaderPomodoro = document.getElementById('btn-header-pomodoro');

  // Priority Banner DOM
  const priorityAlertsBanner = document.getElementById('priority-alerts-banner');
  const priorityBannerText = document.getElementById('priority-banner-text');

  // Navigation & Buttons
  const btnPrevDay = document.getElementById('btn-prev-day');
  const btnNextDay = document.getElementById('btn-next-day');
  const btnGoToday = document.getElementById('btn-go-today');
  const btnQuickAddHabit = document.getElementById('btn-quick-add-habit');
  const btnSoundToggle = document.getElementById('btn-sound-toggle');
  const btnOpenBackup = document.getElementById('btn-open-backup');

  // Containers
  const habitsChecklistContainer = document.getElementById('habits-checklist-container');
  const calendarDaysContainer = document.getElementById('calendar-days-container');
  const heatmapMatrixTable = document.getElementById('heatmap-matrix-table');
  const badgesContainer = document.getElementById('badges-container');
  const manageHabitsList = document.getElementById('manage-habits-list');

  // Subtabs Badges (Notification Bubbles)
  const subtabHabitsBadge = document.getElementById('subtab-habits-badge');
  const subtabTasksBadge = document.getElementById('subtab-tasks-badge');
  const subtabAlertsBadge = document.getElementById('subtab-alerts-badge');
  const subtabFocusBadge = document.getElementById('subtab-focus-badge');

  // Tasks DOM
  const addTaskForm = document.getElementById('add-task-form');
  const taskInputText = document.getElementById('task-input-text');
  const dailyTasksContainer = document.getElementById('daily-tasks-container');
  const tasksProgressBadge = document.getElementById('tasks-progress-badge');

  // Alerts DOM
  const addAlertForm = document.getElementById('add-alert-form');
  const alertInputTitle = document.getElementById('alert-input-title');
  const alertInputTime = document.getElementById('alert-input-time');
  const alertInputCategory = document.getElementById('alert-input-category');
  const alertInputType = document.getElementById('alert-input-type');
  const alertDayLabel = document.getElementById('alert-day-label');
  const alertDaySelectorGroup = document.getElementById('alert-day-selector-group');
  const dailyAlertsContainer = document.getElementById('daily-alerts-container');
  const alertsDayTitle = document.getElementById('alerts-day-title');

  // Journal & Book Cover DOM
  const journalBookTitle = document.getElementById('journal-book-title');
  const journalBookPage = document.getElementById('journal-book-page');
  const journalBookPageLabel = document.getElementById('journal-book-page-label');
  const journalBibleChapter = document.getElementById('journal-bible-chapter');
  const journalEntryText = document.getElementById('journal-entry-text');
  const journalSaveStatus = document.getElementById('journal-save-status');
  const bookCoverContainer = document.getElementById('book-cover-container');
  const bookCoverImage = document.getElementById('book-cover-image');
  const bookCoverPlaceholder = document.getElementById('book-cover-placeholder');
  const bookCoverFileInput = document.getElementById('book-cover-file-input');
  const btnUploadCover = document.getElementById('btn-upload-cover');
  const btnUrlCover = document.getElementById('btn-url-cover');
  const btnRemoveCover = document.getElementById('btn-remove-cover');

  // Focus Log DOM
  const dailyFocusSessionsList = document.getElementById('daily-focus-sessions-list');
  const btnStartCustomPomodoro = document.getElementById('btn-start-custom-pomodoro');

  // Stats DOM
  const statOverallPercentage = document.getElementById('stat-overall-percentage');
  const statMaxStreak = document.getElementById('stat-max-streak');
  const statTotalFocusMonth = document.getElementById('stat-total-focus-month');
  const statPerfectDays = document.getElementById('stat-perfect-days');
  const statTotalChecks = document.getElementById('stat-total-checks');

  // Modals - Pomodoro
  const pomodoroModal = document.getElementById('pomodoro-modal');
  const btnClosePomodoroModal = document.getElementById('btn-close-pomodoro-modal');
  const pomodoroActiveHabitName = document.getElementById('pomodoro-active-habit-name');
  const pomodoroTimerDigits = document.getElementById('pomodoro-timer-digits');
  const pomodoroStatusBadge = document.getElementById('pomodoro-status-badge');
  const btnPomodoroToggle = document.getElementById('btn-pomodoro-toggle');
  const btnPomodoroFinish = document.getElementById('btn-pomodoro-finish');
  const btnPomodoroAdd5 = document.getElementById('btn-pomodoro-add5');
  const btnPomodoroReset = document.getElementById('btn-pomodoro-reset');
  const pomodoroAutoCheck = document.getElementById('pomodoro-auto-check');
  const pomodoroPresetsBar = document.getElementById('pomodoro-presets-bar');
  const pomodoroPresetButtons = document.querySelectorAll('.pomodoro-presets .preset-btn');

  // Modals - Day View & Timeline
  const dayViewModal = document.getElementById('day-view-modal');
  const btnCloseDayViewModal = document.getElementById('btn-close-day-view-modal');
  const dayViewTitle = document.getElementById('day-view-title');
  const dayViewBadge = document.getElementById('day-view-badge');
  const dayViewBodyContent = document.getElementById('day-view-body-content');
  const btnDayViewPrev = document.getElementById('btn-day-view-prev');
  const btnDayViewNext = document.getElementById('btn-day-view-next');
  const btnDayViewJumpChecklist = document.getElementById('btn-day-view-jump-checklist');

  const timelineModal = document.getElementById('timeline-modal');
  const btnCloseTimelineModal = document.getElementById('btn-close-timeline-modal');
  const btnOpenAllJournalsTimeline = document.getElementById('btn-open-all-journals-timeline');
  const timelineModalContent = document.getElementById('timeline-modal-content');

  // Modals - Habit Form
  const habitModal = document.getElementById('habit-modal');
  const habitForm = document.getElementById('habit-form');
  const formHabitId = document.getElementById('form-habit-id');
  const formHabitName = document.getElementById('form-habit-name');
  const formHabitEmoji = document.getElementById('form-habit-emoji');
  const formHabitTargetCount = document.getElementById('form-habit-target-count');
  const formHabitPeriod = document.getElementById('form-habit-period');
  const formHabitCategory = document.getElementById('form-habit-category');
  const formHabitPomodoro = document.getElementById('form-habit-pomodoro');
  const formHabitMinutes = document.getElementById('form-habit-minutes');
  const modalHabitTitle = document.getElementById('modal-habit-title');
  const btnCloseHabitModal = document.getElementById('btn-close-habit-modal');
  const btnCancelHabitModal = document.getElementById('btn-cancel-habit-modal');

  // Modals - Backup
  const backupModal = document.getElementById('backup-modal');
  const btnCloseBackupModal = document.getElementById('btn-close-backup-modal');
  const btnDownloadBackup = document.getElementById('btn-download-backup');
  const btnCopyBackup = document.getElementById('btn-copy-backup');
  const importJsonTextarea = document.getElementById('import-json-textarea');
  const btnImportData = document.getElementById('btn-import-data');
  const btnResetEverything = document.getElementById('btn-reset-everything');
  const btnResetDefaultHabits = document.getElementById('btn-reset-default-habits');
  const btnOpenNewHabitModal = document.getElementById('btn-open-new-habit-modal');

  // Cloud Sync DOM
  const btnSaveCloud = document.getElementById('btn-save-cloud');
  const btnLoadCloud = document.getElementById('btn-load-cloud');
  const btnResetCloudToken = document.getElementById('btn-reset-cloud-token');
  const cloudSyncStatus = document.getElementById('cloud-sync-status');
  const cloudSyncInfo = document.getElementById('cloud-sync-info');

  // Notion Workout DOM
  const notionRoutineTabs = document.querySelectorAll('.notion-tab-btn');
  const notionRoutineTitle = document.getElementById('notion-routine-title');
  const notionRoutineBadge = document.getElementById('notion-routine-badge');
  const notionRoutineProgress = document.getElementById('notion-routine-progress');
  const notionWorkoutGallery = document.getElementById('notion-workout-gallery');
  const btnAddExercise = document.getElementById('btn-add-exercise');
  const btnResetWorkoutRoutines = document.getElementById('btn-reset-workout-routines');
  const workoutRestDisplay = document.getElementById('workout-rest-display');
  const btnStartRest = document.getElementById('btn-start-rest');
  const btnStopRest = document.getElementById('btn-stop-rest');
  const restPills = document.querySelectorAll('.rest-pill');

  // Weekly Schedule DOM & Subtab Workout
  const workoutWeeklyDaysGrid = document.getElementById('workout-weekly-days-grid');
  const btnOpenWeeklyScheduleModal = document.getElementById('btn-open-weekly-schedule-modal');
  const modalWeeklySchedule = document.getElementById('modal-weekly-schedule');
  const btnCloseWeeklyScheduleModal = document.getElementById('btn-close-weekly-schedule-modal');
  const btnCancelWeeklySchedule = document.getElementById('btn-cancel-weekly-schedule');
  const btnResetDefaultSchedule = document.getElementById('btn-reset-default-schedule');
  const formWeeklySchedule = document.getElementById('form-weekly-schedule');
  const scheduleDaysList = document.getElementById('schedule-days-list');
  const dailyWorkoutPanel = document.getElementById('daily-workout-panel');
  const subtabWorkoutBadge = document.getElementById('subtab-workout-badge');

  // Exercise Form Modal
  const exerciseModal = document.getElementById('exercise-modal');
  const exerciseModalTitle = document.getElementById('exercise-modal-title');
  const btnCloseExerciseModal = document.getElementById('btn-close-exercise-modal');
  const btnCancelExerciseModal = document.getElementById('btn-cancel-exercise-modal');
  const exerciseForm = document.getElementById('exercise-form');
  const formExerciseId = document.getElementById('form-exercise-id');
  const formExerciseName = document.getElementById('form-exercise-name');
  const formExerciseRoutine = document.getElementById('form-exercise-routine');
  const formExerciseSets = document.getElementById('form-exercise-sets');
  const formExerciseReps = document.getElementById('form-exercise-reps');
  const formExerciseRest = document.getElementById('form-exercise-rest');
  const formExerciseTags = document.getElementById('form-exercise-tags');
  const formExerciseGif = document.getElementById('form-exercise-gif');
  const formExerciseNotes = document.getElementById('form-exercise-notes');
  const btnDeleteExercise = document.getElementById('btn-delete-exercise');

  // GIF Fullscreen Modal
  const workoutGifModal = document.getElementById('workout-gif-modal');
  const gifModalTitle = document.getElementById('gif-modal-title');
  const gifModalMuscle = document.getElementById('gif-modal-muscle');
  const gifModalImage = document.getElementById('gif-modal-image');
  const gifModalNotes = document.getElementById('gif-modal-notes');
  const btnCloseGifModal = document.getElementById('btn-close-gif-modal');
  const btnDoneGifModal = document.getElementById('btn-done-gif-modal');

  // Cloud Sync Config
  const CLOUD_TOKEN_KEY = 'desafio30d_cloud_token_v1';
  const CLOUD_GIST_ID_KEY = 'desafio30d_gist_id_v1';
  const CLOUD_GIST_FILENAME = 'desafio30d_backup.json';

  const WEEKDAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  /* ==========================================================================
     Toast Notifications
     ========================================================================== */
  function showToast(message, emoji = '✨') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${emoji}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      setTimeout(() => toast.remove(), 200);
    }, 2600);
  }

  /* ==========================================================================
     Priority Alerts Banner Rendering
     ========================================================================== */
  function renderPriorityBanner() {
    if (!priorityAlertsBanner || !priorityBannerText) return;

    const dayAlerts = HabitStorage.getDayAlerts(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const activeAlerts = dayAlerts.filter(a => !a.isDone);

    if (activeAlerts.length === 0) {
      priorityAlertsBanner.style.display = 'none';
      return;
    }

    const firstAlert = activeAlerts[0];
    const moreCount = activeAlerts.length > 1 ? ` (+${activeAlerts.length - 1} alerta)` : '';
    const timeStr = firstAlert.time ? ` às ${firstAlert.time}` : '';

    priorityBannerText.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1;">
        <span style="font-size: 1.25rem;">${firstAlert.icon || '🚨'}</span>
        <span>
          <strong>ATENÇÃO DIA ${selectedDay}:</strong> ${firstAlert.title}${timeStr}${moreCount}
        </span>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn-primary" id="btn-banner-resolve" style="font-size: 0.78rem; padding: 0.35rem 0.75rem; background: var(--accent-rose);">
          ✓ Concluir
        </button>
        <button class="btn-secondary" id="btn-banner-view-alerts" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;">
          Ver Alertas
        </button>
      </div>
    `;

    document.getElementById('btn-banner-resolve').addEventListener('click', () => {
      HabitStorage.toggleAlertDone(firstAlert.id);
      SoundFx.playPop();
      renderAllViews();
      showToast('Alerta marcado como concluído!', '✅');
    });

    document.getElementById('btn-banner-view-alerts').addEventListener('click', () => {
      dailySubtabButtons.forEach(b => b.classList.remove('active'));
      dailySubtabContents.forEach(c => c.classList.remove('active'));
      const alertsBtn = document.querySelector('.daily-subtab-btn[data-subtab="subtab-alerts"]');
      if (alertsBtn) alertsBtn.classList.add('active');
      const alertsContent = document.getElementById('subtab-alerts');
      if (alertsContent) alertsContent.classList.add('active');
      activeDailySubtab = 'subtab-alerts';
    });

    priorityAlertsBanner.style.display = 'flex';
  }

  /* ==========================================================================
     Update Hero Section & Subtab Notification Badges
     ========================================================================== */
  function updateHeroSection() {
    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const dateObj = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, selectedDay);
    const dayOfWeek = WEEKDAY_NAMES[dateObj.getDay()];
    
    currentDateText.textContent = `Dia ${selectedDay} de Setembro (${dayOfWeek})`;
    heroQuote.textContent = QUOTES[(selectedDay - 1) % QUOTES.length];

    const progress = HabitStorage.getDayProgress(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const summary = HabitStorage.getSeptemberSummary(CURRENT_YEAR);
    const tasks = HabitStorage.getDayTasks(dateKey);
    const pendingTasks = tasks.filter(t => !t.done).length;
    const completedTasks = tasks.filter(t => t.done).length;
    const focus = HabitStorage.getDayFocus(dateKey);
    const alerts = HabitStorage.getDayAlerts(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const pendingAlerts = alerts.filter(a => !a.isDone).length;

    heroCompletedCount.textContent = `${progress.completed} / ${progress.total}`;
    heroTasksCount.textContent = `${completedTasks} / ${tasks.length}`;
    heroFocusCount.textContent = HabitStorage.formatMinutes(focus.totalMinutes);
    heroMonthProgress.textContent = `${summary.overallPercentage}%`;
    globalStreakCount.textContent = summary.maxStreak;

    if (subtabHabitsBadge) {
      subtabHabitsBadge.textContent = `${progress.completed}/${progress.total}`;
      if (progress.isComplete) {
        subtabHabitsBadge.className = 'notification-badge badge-amber';
      } else if (progress.completed > 0) {
        subtabHabitsBadge.className = 'notification-badge badge-green';
      } else {
        subtabHabitsBadge.className = 'notification-badge badge-empty';
      }
    }
    
    if (subtabTasksBadge) {
      if (pendingTasks > 0) {
        subtabTasksBadge.textContent = pendingTasks;
        subtabTasksBadge.className = 'notification-badge badge-green';
      } else {
        subtabTasksBadge.textContent = '0';
        subtabTasksBadge.className = 'notification-badge badge-empty';
      }
    }

    if (subtabAlertsBadge) {
      if (pendingAlerts > 0) {
        subtabAlertsBadge.textContent = pendingAlerts;
        subtabAlertsBadge.className = 'notification-badge badge-rose';
      } else {
        subtabAlertsBadge.textContent = '0';
        subtabAlertsBadge.className = 'notification-badge badge-empty';
      }
    }

    if (subtabFocusBadge) {
      subtabFocusBadge.textContent = HabitStorage.formatMinutes(focus.totalMinutes);
      if (focus.totalMinutes > 0) {
        subtabFocusBadge.className = 'notification-badge badge-amber';
      } else {
        subtabFocusBadge.className = 'notification-badge badge-empty';
      }
    }

    const circumference = 377;
    const offset = circumference - (circumference * (progress.percentage / 100));
    circleProgressFill.style.strokeDashoffset = offset;
    circlePercentText.textContent = `${progress.percentage}%`;

    if (todayDay && selectedDay === todayDay) {
      btnGoToday.style.background = 'var(--accent-violet)';
      btnGoToday.style.color = '#ffffff';
    } else {
      btnGoToday.style.background = 'rgba(139, 92, 246, 0.15)';
      btnGoToday.style.color = '#c4b5fd';
    }
    if (subtabWorkoutBadge) {
      const scheduledRoutine = HabitStorage.getRoutineForDay(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
      if (scheduledRoutine === 'REST') {
        subtabWorkoutBadge.textContent = 'Descanso';
        subtabWorkoutBadge.className = 'notification-badge badge-empty';
      } else {
        subtabWorkoutBadge.textContent = scheduledRoutine;
        subtabWorkoutBadge.className = 'notification-badge badge-green';
      }
    }

    renderPriorityBanner();
    renderDailyWorkoutSubtab();
  }

  /* ==========================================================================
     Tab 1.1: Render Habits Checklist (Com Mini-Bolinhas Interativas)
     ========================================================================== */
  function renderChecklist() {
    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const habits = HabitStorage.getHabits();

    const filterButtons = document.querySelectorAll('#period-filters .filter-btn');
    filterButtons.forEach(btn => {
      const filter = btn.dataset.filter;
      if (filter === 'all') {
        btn.textContent = `Todos (${habits.length})`;
      }
    });

    const filteredHabits = habits.filter(h => {
      if (activePeriodFilter === 'all') return true;
      return h.period === activePeriodFilter;
    });

    habitsChecklistContainer.innerHTML = '';

    if (filteredHabits.length === 0) {
      habitsChecklistContainer.innerHTML = `
        <div class="empty-state">
          <div class="emoji">🔍</div>
          <h3>Nenhum hábito encontrado neste filtro</h3>
          <p>Selecione outro período ou adicione um novo hábito.</p>
        </div>
      `;
      return;
    }

    filteredHabits.forEach(habit => {
      const targetCount = habit.targetCount || 1;
      const currentCount = HabitStorage.getHabitCheckCount(dateKey, habit.id, targetCount);
      const isCompleted = currentCount >= targetCount && targetCount > 0;
      const habitStats = HabitStorage.getHabitStats(habit.id, CURRENT_YEAR);

      const periodLabels = {
        morning: 'Manhã',
        afternoon: 'Tarde',
        evening: 'Noite',
        anytime: 'Livre'
      };

      const card = document.createElement('div');
      card.className = `habit-card ${isCompleted ? 'checked' : ''}`;
      card.setAttribute('role', 'checkbox');
      card.setAttribute('aria-checked', isCompleted);
      card.setAttribute('tabindex', '0');

      let counterDotsHtml = '';
      if (targetCount > 1) {
        let dots = '';
        for (let i = 1; i <= targetCount; i++) {
          const isActive = i <= currentCount;
          dots += `<button type="button" class="counter-dot-btn ${isActive ? 'active' : ''}" data-dot-index="${i}" title="${i}ª vez de ${targetCount}">${i}</button>`;
        }
        counterDotsHtml = `
          <div class="habit-counter-dots" title="Clique nas bolinhas para marcar cada vez">
            ${dots}
            <span class="counter-progress-label">${currentCount}/${targetCount}</span>
          </div>
        `;
      }

      let pomodoroBtnHtml = '';
      if (habit.hasPomodoro) {
        pomodoroBtnHtml = `
          <button class="habit-pomodoro-btn" title="Iniciar Pomodoro (${habit.defaultMinutes || 25}m)" data-habit-id="${habit.id}">
            ⏱️ ${habit.defaultMinutes || 25}m
          </button>
        `;
      }

      card.innerHTML = `
        <div class="custom-checkbox" title="Marcar/Desmarcar tudo">
          <svg viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="habit-emoji-badge">${habit.emoji || '🎯'}</div>
        <div class="habit-content">
          <div class="habit-title" title="${habit.title}">${habit.title}</div>
          <div class="habit-meta">
            <span class="period-pill period-${habit.period || 'anytime'}">${periodLabels[habit.period] || 'Livre'}</span>
            <span class="category-pill">${habit.category || 'Geral'}</span>
            ${counterDotsHtml}
          </div>
        </div>
        <div class="habit-right-actions">
          ${pomodoroBtnHtml}
          <div class="habit-streak-badge" title="${habitStats.completedDays} dias concluídos em Setembro">
            🔥 ${habitStats.completedDays}/30d
          </div>
        </div>
      `;

      if (targetCount > 1) {
        const dotButtons = card.querySelectorAll('.counter-dot-btn');
        dotButtons.forEach(dotBtn => {
          dotBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const clickedIndex = parseInt(dotBtn.dataset.dotIndex, 10);
            
            let newCount = clickedIndex;
            if (currentCount === clickedIndex) {
              newCount = clickedIndex - 1;
            }

            HabitStorage.setHabitCheckCount(dateKey, habit.id, newCount, targetCount);
            SoundFx.playPop();
            renderChecklist();
            updateHeroSection();

            if (newCount === targetCount) {
              const progress = HabitStorage.getDayProgress(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
              if (progress.isComplete) {
                Confetti.launch(35);
                SoundFx.playVictory();
                showToast(`Parabéns! Você completou 100% dos hábitos do Dia ${selectedDay}! 🎉`, '⭐');
              } else {
                showToast(`Hábito "${habit.title}" concluído (${targetCount}/${targetCount})!`, '✅');
              }
            } else {
              showToast(`${habit.title}: ${newCount} de ${targetCount} vezes marcadas.`, '🦷');
            }

            if (activeTab === 'tab-calendar') renderCalendarGrid();
            if (activeTab === 'tab-matrix') renderHeatmapMatrix();
            if (activeTab === 'tab-stats') renderStatsAndBadges();
          });
        });
      }

      const checkboxEl = card.querySelector('.custom-checkbox');
      checkboxEl.addEventListener('click', (e) => {
        e.stopPropagation();
        handleToggleHabitDirect(habit, card);
      });

      card.addEventListener('click', (e) => {
        if (e.target.closest('.habit-pomodoro-btn') || e.target.closest('.counter-dot-btn') || e.target.closest('.custom-checkbox')) return;
        
        if (targetCount > 1) {
          const res = HabitStorage.incrementHabitCheck(dateKey, habit.id, targetCount);
          SoundFx.playPop();
          renderChecklist();
          updateHeroSection();
          if (res.isComplete) {
            const progress = HabitStorage.getDayProgress(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
            if (progress.isComplete) {
              Confetti.launch(35);
              SoundFx.playVictory();
              showToast(`Parabéns! 100% dos hábitos concluídos hoje! 🎉`, '⭐');
            } else {
              showToast(`Hábito "${habit.title}" concluído!`, '✅');
            }
          }
          if (activeTab === 'tab-calendar') renderCalendarGrid();
          if (activeTab === 'tab-matrix') renderHeatmapMatrix();
          if (activeTab === 'tab-stats') renderStatsAndBadges();
        } else {
          handleToggleHabitDirect(habit, card);
        }
      });

      const pBtn = card.querySelector('.habit-pomodoro-btn');
      if (pBtn) {
        pBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openPomodoroModal(habit);
        });
      }

      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggleHabitDirect(habit, card);
        }
      });

      habitsChecklistContainer.appendChild(card);
    });
  }

  function handleToggleHabitDirect(habit, cardElement) {
    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const targetCount = habit.targetCount || 1;
    const newState = HabitStorage.toggleCheck(dateKey, habit.id, targetCount);

    if (newState) {
      cardElement.classList.add('checked');
      SoundFx.playPop();
    } else {
      cardElement.classList.remove('checked');
    }

    renderChecklist();
    updateHeroSection();

    const progress = HabitStorage.getDayProgress(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    if (progress.isComplete && newState) {
      Confetti.launch(35);
      SoundFx.playVictory();
      showToast(`Parabéns! Você completou 100% dos hábitos do Dia ${selectedDay}! 🎉`, '⭐');
    }

    if (activeTab === 'tab-calendar') renderCalendarGrid();
    if (activeTab === 'tab-matrix') renderHeatmapMatrix();
    if (activeTab === 'tab-stats') renderStatsAndBadges();
  }

  /* ==========================================================================
     Tab 1.2: Render Daily Tasks (To-Do List com Rollover)
     ========================================================================== */
  function renderTasks() {
    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const tasks = HabitStorage.getDayTasks(dateKey);

    dailyTasksContainer.innerHTML = '';
    const completedCount = tasks.filter(t => t.done).length;

    if (tasksProgressBadge) {
      tasksProgressBadge.textContent = `${completedCount} de ${tasks.length} concluídas`;
      tasksProgressBadge.style.color = (completedCount === tasks.length && tasks.length > 0) ? '#34d399' : 'var(--accent-amber)';
    }

    if (tasks.length === 0) {
      dailyTasksContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📋</div>
          <div style="font-weight: 700; color: var(--text-main);">Nenhuma tarefa pendente para o Dia ${selectedDay}</div>
          <div style="font-size: 0.82rem; margin-top: 0.25rem;">Tarefas não concluídas acumulam automaticamente para o dia seguinte até serem feitas.</div>
        </div>
      `;
      return;
    }

    tasks.forEach(task => {
      const item = document.createElement('div');
      item.className = `task-item ${task.done ? 'done' : ''} ${task.isCarriedOver ? 'carried-over' : ''}`;
      
      let carriedBadgeHtml = '';
      if (task.isCarriedOver) {
        carriedBadgeHtml = `<span class="task-carried-pill" title="Criada no Dia ${task.createdDay} e continuou pendente">⏳ Pendente desde o Dia ${task.createdDay}</span>`;
      }

      item.innerHTML = `
        <div class="task-main-col">
          <div class="custom-checkbox">
            <svg viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div class="task-text-col">
            <span class="task-title-text">${task.title}</span>
            ${carriedBadgeHtml}
          </div>
        </div>
        <button class="task-delete-btn" title="Excluir tarefa permanentemente" aria-label="Excluir tarefa">🗑️</button>
      `;

      item.querySelector('.task-main-col').addEventListener('click', () => {
        const isDone = HabitStorage.toggleTask(dateKey, task.id);
        SoundFx.playPop();
        renderTasks();
        updateHeroSection();
        if (activeTab === 'tab-calendar') renderCalendarGrid();
        if (isDone) {
          showToast(`Tarefa "${task.title}" concluída!`, '✅');
        }
      });

      item.querySelector('.task-delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Deseja excluir a tarefa "${task.title}"?`)) {
          HabitStorage.deleteTask(task.id);
          renderTasks();
          updateHeroSection();
          if (activeTab === 'tab-calendar') renderCalendarGrid();
          showToast('Tarefa removida.', '🗑️');
        }
      });

      dailyTasksContainer.appendChild(item);
    });
  }

  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInputText.value.trim();
    if (!title) return;

    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    HabitStorage.addTask(dateKey, title);
    taskInputText.value = '';
    
    renderTasks();
    updateHeroSection();
    if (activeTab === 'tab-calendar') renderCalendarGrid();
    showToast('Tarefa adicionada! Se não concluir hoje, ela continuará amanhã.', '✅');
  });

  /* ==========================================================================
     Tab 1.3: Render Priority Alerts & Commitments
     ========================================================================== */
  function renderDailyAlerts() {
    const dayAlerts = HabitStorage.getDayAlerts(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const dateObj = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, selectedDay);
    const dayOfWeek = WEEKDAY_NAMES[dateObj.getDay()];

    alertsDayTitle.textContent = `Alertas & Compromissos para o Dia ${selectedDay} (${dayOfWeek})`;
    dailyAlertsContainer.innerHTML = '';

    if (dayAlerts.length === 0) {
      dailyAlertsContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
          <div style="font-weight: 700; color: var(--text-main);">Nenhum alerta ou compromisso para o Dia ${selectedDay}</div>
          <div style="font-size: 0.82rem; margin-top: 0.25rem;">Cadastre no formulário acima consultas médicas, cancelamentos de assinaturas ou datas críticas.</div>
        </div>
      `;
      return;
    }

    dayAlerts.forEach(alert => {
      const item = document.createElement('div');
      item.className = `alert-item category-${alert.category || 'Urgente'} ${alert.isDone ? 'done' : ''}`;

      const categoryBadgeClasses = {
        'Urgente': 'alert-badge-urgent',
        'Saúde': 'alert-badge-health',
        'Financeiro': 'alert-badge-finance',
        'Compromisso': 'alert-badge-general'
      };

      const badgeClass = categoryBadgeClasses[alert.category] || 'alert-badge-urgent';
      const timeHtml = alert.time ? `<span>⏰ ${alert.time}</span>` : '';
      const recurringHtml = alert.isRecurring ? `<span>🔄 Toda ${WEEKDAY_NAMES[alert.recurringWeekday]}</span>` : `<span>📅 Dia ${alert.day || selectedDay}</span>`;

      item.innerHTML = `
        <div class="alert-item-content">
          <div class="custom-checkbox">
            <svg viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <div class="alert-item-title">${alert.icon || '🚨'} ${alert.title}</div>
            <div class="alert-item-meta">
              <span class="alert-badge-pill ${badgeClass}">${alert.category}</span>
              ${timeHtml}
              ${recurringHtml}
            </div>
          </div>
        </div>
        <button class="task-delete-btn" title="Excluir alerta" aria-label="Excluir alerta">🗑️</button>
      `;

      item.querySelector('.alert-item-content').addEventListener('click', () => {
        const isDone = HabitStorage.toggleAlertDone(alert.id);
        SoundFx.playPop();
        renderAllViews();
        if (isDone) showToast(`Compromisso "${alert.title}" marcado como resolvido!`, '✅');
      });

      item.querySelector('.task-delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Deseja excluir o alerta "${alert.title}"?`)) {
          HabitStorage.deleteAlert(alert.id);
          renderAllViews();
          showToast('Alerta removido.', '🗑️');
        }
      });

      dailyAlertsContainer.appendChild(item);
    });
  }

  alertInputType.addEventListener('change', () => {
    const isRecurring = alertInputType.value === 'recurring_weekly';
    if (isRecurring) {
      alertDayLabel.textContent = 'Dia da Semana';
      alertDaySelectorGroup.innerHTML = `
        <label class="form-label" for="alert-input-weekday">Toda semana em:</label>
        <select id="alert-input-weekday" class="form-select">
          <option value="1">Segunda-feira</option>
          <option value="2">Terça-feira</option>
          <option value="3" selected>Quarta-feira</option>
          <option value="4">Quinta-feira</option>
          <option value="5">Sexta-feira</option>
          <option value="6">Sábado</option>
          <option value="0">Domingo</option>
        </select>
      `;
    } else {
      alertDaySelectorGroup.innerHTML = `
        <label class="form-label" for="alert-input-day" id="alert-day-label">Dia de Setembro (1 a 30)</label>
        <input type="number" id="alert-input-day" class="form-input" min="1" max="30" value="${selectedDay}">
      `;
    }
  });

  addAlertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = alertInputTitle.value.trim();
    if (!title) return;

    const time = alertInputTime.value;
    const category = alertInputCategory.value;
    const isRecurring = alertInputType.value === 'recurring_weekly';

    const categoryIcons = {
      'Urgente': '🚨',
      'Saúde': '🏥',
      'Financeiro': '💳',
      'Compromisso': '📅'
    };

    let day = selectedDay;
    let recurringWeekday = null;

    if (isRecurring) {
      const weekdaySelect = document.getElementById('alert-input-weekday');
      recurringWeekday = parseInt(weekdaySelect.value, 10);
    } else {
      const dayInput = document.getElementById('alert-input-day');
      day = parseInt(dayInput.value, 10) || selectedDay;
    }

    HabitStorage.addAlert({
      title,
      time,
      category,
      icon: categoryIcons[category] || '🚨',
      isRecurring,
      recurringWeekday,
      day: isRecurring ? null : day,
      dateKey: isRecurring ? null : HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, day)
    });

    alertInputTitle.value = '';
    alertInputTime.value = '';

    renderAllViews();
    showToast('Alerta Prioritário salvo com sucesso!', '🚨');
  });

  /* ==========================================================================
     Tab 1.4: Render Daily Journal & Persistent Book Cover
     ========================================================================== */
  function renderJournal() {
    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const journal = HabitStorage.getDayJournal(dateKey);

    journalBookTitle.value = journal.bookTitle || '';
    journalBookPage.value = journal.bookPage || '';
    if (journalBookPageLabel) {
      journalBookPageLabel.textContent = `Página ou Capítulo do Dia ${selectedDay}`;
    }
    if (journalBibleChapter) journalBibleChapter.value = journal.bibleChapter || '';
    journalEntryText.value = journal.entry || '';
    currentDayBookCover = journal.bookCover || '';

    updateBookCoverDisplay(currentDayBookCover);
    setSaveStatus('✓ Salvo automaticamente', 'saved');
  }

  function updateBookCoverDisplay(coverUrl) {
    if (coverUrl && coverUrl.trim().length > 0) {
      bookCoverImage.src = coverUrl;
      bookCoverImage.style.display = 'block';
      bookCoverPlaceholder.style.display = 'none';
      btnRemoveCover.style.display = 'inline-flex';
    } else {
      bookCoverImage.src = '';
      bookCoverImage.style.display = 'none';
      bookCoverPlaceholder.style.display = 'flex';
      btnRemoveCover.style.display = 'none';
    }
  }

  function handleJournalInput() {
    setSaveStatus('Salvando...', 'saving');
    clearTimeout(journalSaveTimeout);
    journalSaveTimeout = setTimeout(() => {
      const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
      HabitStorage.saveDayJournal(dateKey, {
        bookTitle: journalBookTitle.value.trim(),
        bookPage: journalBookPage.value.trim(),
        bookCover: currentDayBookCover,
        bibleChapter: journalBibleChapter ? journalBibleChapter.value.trim() : '',
        entry: journalEntryText.value
      });
      setSaveStatus('✓ Salvo automaticamente', 'saved');
      if (activeTab === 'tab-calendar') renderCalendarGrid();
    }, 400);
  }

  function setSaveStatus(text, type) {
    if (!journalSaveStatus) return;
    journalSaveStatus.textContent = text;
    if (type === 'saving') {
      journalSaveStatus.style.color = 'var(--accent-amber)';
      journalSaveStatus.style.borderColor = 'rgba(245, 158, 11, 0.3)';
    } else {
      journalSaveStatus.style.color = 'var(--accent-emerald-light)';
      journalSaveStatus.style.borderColor = 'rgba(16, 185, 129, 0.25)';
    }
  }

  // Optimize & Compress uploaded book cover to keep localStorage fast & lightweight (GT 705 friendly)
  function processCoverImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Por favor, selecione um arquivo de imagem válido.', '⚠️');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 260;
        const maxHeight = 380;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
        currentDayBookCover = compressedDataUrl;
        updateBookCoverDisplay(currentDayBookCover);
        handleJournalInput();
        showToast('Capa do livro adicionada e salva!', '📕');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Cover Buttons Listeners
  btnUploadCover.addEventListener('click', () => {
    bookCoverFileInput.click();
  });

  bookCoverContainer.addEventListener('click', () => {
    bookCoverFileInput.click();
  });

  bookCoverFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      processCoverImageFile(e.target.files[0]);
    }
  });

  btnUrlCover.addEventListener('click', () => {
    const url = prompt('Cole a URL da imagem da capa do livro:');
    if (url && url.trim()) {
      currentDayBookCover = url.trim();
      updateBookCoverDisplay(currentDayBookCover);
      handleJournalInput();
      showToast('Link da capa salvo com sucesso!', '🔗');
    }
  });

  btnRemoveCover.addEventListener('click', (e) => {
    e.stopPropagation();
    if (confirm('Deseja remover a capa do livro?')) {
      currentDayBookCover = '';
      updateBookCoverDisplay('');
      handleJournalInput();
      showToast('Capa removida.', '🗑️');
    }
  });

  journalBookTitle.addEventListener('input', handleJournalInput);
  journalBookPage.addEventListener('input', handleJournalInput);
  if (journalBibleChapter) journalBibleChapter.addEventListener('input', handleJournalInput);
  journalEntryText.addEventListener('input', handleJournalInput);

  /* ==========================================================================
     Tab 1.5: Render Focus Sessions List
     ========================================================================== */
  function renderFocusTab() {
    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const focus = HabitStorage.getDayFocus(dateKey);

    dailyFocusSessionsList.innerHTML = '';

    if (!focus.sessions || focus.sessions.length === 0) {
      dailyFocusSessionsList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">⏱️</div>
          <div style="font-weight: 700; color: var(--text-main);">Nenhuma sessão de foco registrada no Dia ${selectedDay}</div>
          <div style="font-size: 0.82rem; margin-top: 0.25rem;">Inicie um timer Pomodoro no topo ou ao lado de qualquer hábito de foco!</div>
        </div>
      `;
      return;
    }

    focus.sessions.forEach((s, idx) => {
      const timeStr = new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const item = document.createElement('div');
      item.className = 'focus-session-item';
      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-weight: 800; color: #fbbf24; font-size: 1.1rem;">#${idx + 1}</span>
          <div>
            <div style="font-weight: 700; color: var(--text-main);">${s.habitTitle}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Realizada às ${timeStr}</div>
          </div>
        </div>
        <div style="font-family: 'Fira Code', monospace; font-weight: 700; color: var(--accent-emerald-light); font-size: 0.95rem;">
          +${HabitStorage.formatMinutes(s.minutes)}
        </div>
      `;
      dailyFocusSessionsList.appendChild(item);
    });
  }

  btnStartCustomPomodoro.addEventListener('click', () => {
    openPomodoroModal(null);
  });

  /* ==========================================================================
     Pomodoro Timer Logic (Continuous Focus / Overtime Support)
     ========================================================================== */
  function openPomodoroModal(habit) {
    if (!pomodoroIsRunning) {
      pomodoroCurrentHabit = habit;
      const minutes = habit && habit.defaultMinutes ? habit.defaultMinutes : 25;
      pomodoroInitialMinutes = minutes;
      pomodoroSecondsLeft = minutes * 60;
      pomodoroOvertimeSeconds = 0;
      pomodoroTargetReached = false;

      pomodoroPresetButtons.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.min, 10) === minutes);
      });
    }

    pomodoroActiveHabitName.textContent = pomodoroCurrentHabit 
      ? `${pomodoroCurrentHabit.emoji || '🎯'} ${pomodoroCurrentHabit.title}` 
      : 'Foco Geral';

    updatePomodoroDisplay();
    pomodoroModal.classList.add('active');
  }

  function updatePomodoroDisplay() {
    if (!pomodoroTargetReached) {
      const mins = Math.floor(pomodoroSecondsLeft / 60);
      const secs = pomodoroSecondsLeft % 60;
      const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      
      pomodoroTimerDigits.textContent = formatted;
      pomodoroTimerDigits.classList.remove('overtime');
      pomodoroStatusBadge.style.display = 'none';

      if (pomodoroIsRunning) {
        headerTimerText.textContent = formatted;
        document.title = `(${formatted}) Desafio 30 Dias`;
        btnPomodoroFinish.style.display = 'inline-flex';
        btnPomodoroFinish.textContent = '⏹️ Concluir';
      } else {
        headerTimerText.textContent = 'Pomodoro';
        document.title = 'Desafio 30 Dias de Setembro | Habit Tracker & Calendário';
        btnPomodoroFinish.style.display = 'none';
      }
    } else {
      const extraMins = Math.floor(pomodoroOvertimeSeconds / 60);
      const extraSecs = pomodoroOvertimeSeconds % 60;
      const formattedExtra = `+${String(extraMins).padStart(2, '0')}:${String(extraSecs).padStart(2, '0')}`;
      
      const totalElapsedMinutes = pomodoroInitialMinutes + Math.floor(pomodoroOvertimeSeconds / 60);

      pomodoroTimerDigits.textContent = formattedExtra;
      pomodoroTimerDigits.classList.add('overtime');
      pomodoroStatusBadge.style.display = 'inline-flex';
      pomodoroStatusBadge.textContent = `⭐ Meta de ${pomodoroInitialMinutes}m Atingida! Foco Extra Ativo`;

      btnPomodoroFinish.style.display = 'inline-flex';
      btnPomodoroFinish.textContent = `⏹️ Concluir (${totalElapsedMinutes}m)`;

      if (pomodoroIsRunning) {
        headerTimerText.textContent = `(${formattedExtra})`;
        document.title = `(${formattedExtra} Extra) Desafio 30 Dias`;
      } else {
        headerTimerText.textContent = `(${formattedExtra})`;
        document.title = `(Pausado ${formattedExtra}) Desafio 30 Dias`;
      }
    }
  }

  function togglePomodoro() {
    if (pomodoroIsRunning) {
      clearInterval(pomodoroInterval);
      pomodoroIsRunning = false;
      btnPomodoroToggle.textContent = '▶ Continuar';
      btnPomodoroToggle.style.background = 'var(--accent-emerald)';
      updatePomodoroDisplay();
      showToast('Timer pausado.', '⏸️');
    } else {
      pomodoroIsRunning = true;
      btnPomodoroToggle.textContent = '⏸️ Pausar';
      btnPomodoroToggle.style.background = 'var(--accent-amber)';
      SoundFx.playPop();

      pomodoroInterval = setInterval(() => {
        if (pomodoroSecondsLeft > 0) {
          pomodoroSecondsLeft--;
          
          if (pomodoroSecondsLeft === 0 && !pomodoroTargetReached) {
            handleTargetReached();
          }
        } else {
          pomodoroOvertimeSeconds++;
        }
        updatePomodoroDisplay();
      }, 1000);

      updatePomodoroDisplay();
      showToast(pomodoroTargetReached ? 'Foco contínuo retomado!' : 'Sessão de foco iniciada! Bom trabalho.', '🚀');
    }
  }

  function handleTargetReached() {
    pomodoroTargetReached = true;
    SoundFx.playVictory();
    Confetti.launch(45);

    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    
    if (pomodoroCurrentHabit && pomodoroAutoCheck.checked) {
      HabitStorage.setCheck(dateKey, pomodoroCurrentHabit.id, true, pomodoroCurrentHabit.targetCount || 1);
    }

    renderAllViews();
    showToast(`🎉 Meta de ${pomodoroInitialMinutes} min atingida! Hábito concluído! O timer continuará contando seu foco extra.`, '🏆');
  }

  function finishPomodoroSession() {
    clearInterval(pomodoroInterval);
    pomodoroIsRunning = false;

    const totalMinutes = pomodoroTargetReached 
      ? (pomodoroInitialMinutes + Math.floor(pomodoroOvertimeSeconds / 60))
      : Math.max(1, Math.round((pomodoroInitialMinutes * 60 - pomodoroSecondsLeft) / 60));

    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const habitId = pomodoroCurrentHabit ? pomodoroCurrentHabit.id : null;
    const habitTitle = pomodoroCurrentHabit ? pomodoroCurrentHabit.title : 'Foco Livre';

    HabitStorage.addFocusSession(dateKey, habitId, totalMinutes, habitTitle);

    if (pomodoroCurrentHabit && pomodoroAutoCheck.checked) {
      HabitStorage.setCheck(dateKey, pomodoroCurrentHabit.id, true, pomodoroCurrentHabit.targetCount || 1);
    }

    pomodoroSecondsLeft = pomodoroInitialMinutes * 60;
    pomodoroOvertimeSeconds = 0;
    pomodoroTargetReached = false;
    btnPomodoroToggle.textContent = '▶ Iniciar';
    btnPomodoroToggle.style.background = 'var(--accent-emerald)';
    btnPomodoroFinish.style.display = 'none';
    
    updatePomodoroDisplay();
    renderAllViews();
    SoundFx.playVictory();
    showToast(`🏆 Sessão finalizada com sucesso! Total de ${HabitStorage.formatMinutes(totalMinutes)} de foco registrados!`, '⭐');
  }

  function resetPomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroIsRunning = false;
    pomodoroSecondsLeft = pomodoroInitialMinutes * 60;
    pomodoroOvertimeSeconds = 0;
    pomodoroTargetReached = false;
    btnPomodoroToggle.textContent = '▶ Iniciar';
    btnPomodoroToggle.style.background = 'var(--accent-emerald)';
    btnPomodoroFinish.style.display = 'none';
    updatePomodoroDisplay();
    showToast('Timer reiniciado.', '↺');
  }

  btnPomodoroToggle.addEventListener('click', togglePomodoro);
  btnPomodoroFinish.addEventListener('click', finishPomodoroSession);
  btnPomodoroReset.addEventListener('click', resetPomodoro);
  
  btnPomodoroAdd5.addEventListener('click', () => {
    if (!pomodoroTargetReached) {
      pomodoroSecondsLeft += 5 * 60;
    } else {
      pomodoroOvertimeSeconds += 5 * 60;
    }
    updatePomodoroDisplay();
    showToast('+5 minutos adicionados!', '⏱️');
  });

  pomodoroPresetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (pomodoroIsRunning) {
        if (!confirm('O timer está rodando. Deseja trocar o tempo e reiniciar?')) return;
        clearInterval(pomodoroInterval);
        pomodoroIsRunning = false;
        btnPomodoroToggle.textContent = '▶ Iniciar';
      }
      pomodoroPresetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mins = parseInt(btn.dataset.min, 10);
      pomodoroInitialMinutes = mins;
      pomodoroSecondsLeft = mins * 60;
      pomodoroOvertimeSeconds = 0;
      pomodoroTargetReached = false;
      updatePomodoroDisplay();
    });
  });

  btnHeaderPomodoro.addEventListener('click', () => {
    openPomodoroModal(null);
  });

  btnClosePomodoroModal.addEventListener('click', () => {
    pomodoroModal.classList.remove('active');
  });

  /* ==========================================================================
     Tab 2: Render Calendar 30 Days (With Day Viewer Modal & Alert Badges)
     ========================================================================== */
  function renderCalendarGrid() {
    calendarDaysContainer.innerHTML = '';
    const habits = HabitStorage.getHabits();
    const totalHabits = habits.length;

    const firstDayIndex = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, 1).getDay();

    for (let i = 0; i < firstDayIndex; i++) {
      const placeholder = document.createElement('div');
      placeholder.className = 'calendar-day-card empty-placeholder';
      calendarDaysContainer.appendChild(placeholder);
    }

    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, day);
      const progress = HabitStorage.getDayProgress(CURRENT_YEAR, CURRENT_MONTH, day);
      const activity = HabitStorage.hasDayActivity(dateKey);
      const dayAlerts = HabitStorage.getDayAlerts(CURRENT_YEAR, CURRENT_MONTH, day);
      const isSelected = day === selectedDay;
      const isToday = todayDay === day;

      let statusIcon = '⚪';
      if (progress.percentage === 100) {
        statusIcon = '⭐';
      } else if (progress.percentage >= 70) {
        statusIcon = '🟢';
      } else if (progress.percentage >= 30) {
        statusIcon = '🔵';
      }

      const dayCard = document.createElement('div');
      dayCard.className = `calendar-day-card ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`;
      
      let badgesHtml = `<span title="${progress.percentage}% concluído">${statusIcon}</span>`;
      
      if (dayAlerts.length > 0) {
        const activeAlert = dayAlerts.find(a => !a.isDone) || dayAlerts[0];
        badgesHtml += `<span title="${activeAlert.title}" style="font-size: 0.88rem;">${activeAlert.icon || '🚨'}</span>`;
      }
      if (activity.hasJournal) {
        badgesHtml += `<span title="Diário/Leitura registrado" style="font-size: 0.85rem;">📝</span>`;
      }
      if (activity.hasFocus) {
        badgesHtml += `<span title="${HabitStorage.formatMinutes(activity.focusMinutes)} de foco" style="font-size: 0.85rem;">⏱️</span>`;
      }
      if (activity.hasTasks) {
        badgesHtml += `<span title="${activity.hasPendingTasks ? 'Possui tarefas pendentes acumuladas' : 'Possui tarefas'}" style="font-size: 0.85rem;">📋</span>`;
      }

      let focusLabelHtml = '';
      if (activity.hasFocus) {
        focusLabelHtml = `<div class="day-focus-label">⏱️ ${HabitStorage.formatMinutes(activity.focusMinutes)} foco</div>`;
      }

      dayCard.innerHTML = `
        <div class="day-card-header">
          <span class="day-number">${day}</span>
          <div class="day-indicators">${badgesHtml}</div>
        </div>
        <div class="day-card-footer">
          ${focusLabelHtml}
          <div class="day-progress-bar-bg">
            <div class="day-progress-bar-fill" style="width: ${progress.percentage}%; background: ${progress.percentage === 100 ? '#fbbf24' : 'var(--accent-emerald)'};"></div>
          </div>
          <div class="day-progress-text">
            <span>${progress.completed}/${totalHabits}</span>
            <span>${progress.percentage}%</span>
          </div>
        </div>
      `;

      dayCard.addEventListener('click', () => {
        openDayViewModal(day);
      });

      calendarDaysContainer.appendChild(dayCard);
    }
  }

  /* ==========================================================================
     Day View Modal (Viewing any day's alerts, journal, reading & cover)
     ========================================================================== */
  function openDayViewModal(day) {
    viewingModalDay = day;
    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, day);
    const dateObj = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, day);
    const dayOfWeek = WEEKDAY_NAMES[dateObj.getDay()];
    
    dayViewTitle.textContent = `Dia ${day} de Setembro (${dayOfWeek})`;
    dayViewBadge.textContent = (todayDay === day) ? 'HOJE' : `Dia ${day} dos 30d`;

    const progress = HabitStorage.getDayProgress(CURRENT_YEAR, CURRENT_MONTH, day);
    const journal = HabitStorage.getDayJournal(dateKey);
    const tasks = HabitStorage.getDayTasks(dateKey);
    const focus = HabitStorage.getDayFocus(dateKey);
    const dayAlerts = HabitStorage.getDayAlerts(CURRENT_YEAR, CURRENT_MONTH, day);

    let alertsHighlightHtml = '';
    if (dayAlerts.length > 0) {
      alertsHighlightHtml = `
        <div class="day-alert-highlight-box">
          <div style="font-weight: 800; font-size: 0.95rem; color: #f43f5e; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>🚨</span> Alertas & Compromissos Prioritários
          </div>
          ${dayAlerts.map(a => `
            <div style="font-size: 0.88rem; color: #ffffff; padding: 0.2rem 0; display: flex; align-items: center; justify-content: space-between;">
              <div>${a.icon || '🚨'} <strong>${a.title}</strong> ${a.time ? ` às ${a.time}` : ''}</div>
              <span class="save-status-pill" style="${a.isDone ? 'color:#34d399;' : 'color:#f43f5e; border-color: rgba(244,63,94,0.4);'}">${a.isDone ? '✓ Resolvido' : '⚠️ Pendente'}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    let journalTextHtml = journal.entry && journal.entry.trim() 
      ? `<div style="white-space: pre-wrap; font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">${journal.entry}</div>`
      : `<div style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Nenhum diário escrito para este dia ainda.</div>`;

    // Book Cover & Reading display in modal
    let coverThumbHtml = journal.bookCover 
      ? `<img src="${journal.bookCover}" alt="Capa" class="day-book-cover-thumb">` 
      : `<div class="day-book-cover-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.5rem;">📕</div>`;

    let readingHtml = (journal.bookTitle || journal.bookPage)
      ? `
        <div class="day-view-book-row">
          ${coverThumbHtml}
          <div>
            <div style="font-size: 0.95rem; font-weight: 700; color: #ffffff;">${journal.bookTitle || 'Livro Atual'}</div>
            <div style="font-size: 0.85rem; color: var(--accent-emerald-light); margin-top: 0.2rem;">
              📖 ${journal.bookPage ? `<strong>Pág / Cap:</strong> ${journal.bookPage}` : 'Leitura em andamento'}
            </div>
          </div>
        </div>
      `
      : `<div style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Nenhuma leitura registrada.</div>`;

    let tasksHtml = '';
    if (tasks.length > 0) {
      tasksHtml = tasks.map(t => `
        <div style="font-size: 0.85rem; color: ${t.done ? 'var(--text-muted)' : 'var(--text-main)'}; text-decoration: ${t.done ? 'line-through' : 'none'}; padding: 0.25rem 0; display: flex; align-items: center; justify-content: space-between;">
          <div>${t.done ? '✓' : '○'} ${t.title}</div>
          ${t.isCarriedOver ? `<span style="font-size: 0.7rem; color: #fbbf24;">(do Dia ${t.createdDay})</span>` : ''}
        </div>
      `).join('');
    } else {
      tasksHtml = '<div style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Sem tarefas neste dia.</div>';
    }

    dayViewBodyContent.innerHTML = `
      ${alertsHighlightHtml}

      <div class="day-summary-row">
        <div class="hero-stat-box" style="text-align: center;">
          <div class="hero-stat-value">${progress.completed}/${progress.total}</div>
          <div class="hero-stat-label">Hábitos (${progress.percentage}%)</div>
        </div>
        <div class="hero-stat-box" style="text-align: center;">
          <div class="hero-stat-value" style="color: #fbbf24;">${HabitStorage.formatMinutes(focus.totalMinutes)}</div>
          <div class="hero-stat-label">Foco / Pomodoro</div>
        </div>
        <div class="hero-stat-box" style="text-align: center;">
          <div class="hero-stat-value">${tasks.filter(t => t.done).length}/${tasks.length}</div>
          <div class="hero-stat-label">Tarefas Feitas</div>
        </div>
      </div>

      <div class="day-reading-preview-card">
        <div style="font-weight: 700; color: #ffffff; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>📖</span> Livro em Leitura
        </div>
        ${readingHtml}
      </div>

      <div class="day-journal-preview-card">
        <div style="font-weight: 700; color: #ffffff; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>📝</span> Diário do Dia & Reflexões
        </div>
        ${journalTextHtml}
      </div>

      <div class="day-reading-preview-card">
        <div style="font-weight: 700; color: #ffffff; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>📋</span> Tarefas Específicas / Pendentes
        </div>
        ${tasksHtml}
      </div>
    `;

    dayViewModal.classList.add('active');
  }

  btnDayViewPrev.addEventListener('click', () => {
    if (viewingModalDay > 1) {
      openDayViewModal(viewingModalDay - 1);
    }
  });

  btnDayViewNext.addEventListener('click', () => {
    if (viewingModalDay < TOTAL_DAYS) {
      openDayViewModal(viewingModalDay + 1);
    }
  });

  btnDayViewJumpChecklist.addEventListener('click', () => {
    selectedDay = viewingModalDay;
    dayViewModal.classList.remove('active');
    
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    const dailyTabBtn = document.querySelector('.nav-tab-btn[data-tab="tab-daily"]');
    if (dailyTabBtn) dailyTabBtn.classList.add('active');
    const dailyPanel = document.getElementById('tab-daily');
    if (dailyPanel) dailyPanel.classList.add('active');
    activeTab = 'tab-daily';

    renderAllViews();
    showToast(`Visualizando Dia ${selectedDay} no Checklist!`, '⚡');
  });

  btnCloseDayViewModal.addEventListener('click', () => {
    dayViewModal.classList.remove('active');
  });

  /* ==========================================================================
     Timeline Modal (All 30 Days Journal Reader with Book Cover)
     ========================================================================== */
  btnOpenAllJournalsTimeline.addEventListener('click', () => {
    timelineModalContent.innerHTML = '';
    const allJournals = HabitStorage.getAllJournals();
    let hasAnyEntry = false;

    for (let day = 1; day <= TOTAL_DAYS; day++) {
      const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, day);
      const dateObj = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, day);
      const dayOfWeek = WEEKDAY_NAMES[dateObj.getDay()];
      const journal = HabitStorage.getDayJournal(dateKey);
      const focus = HabitStorage.getDayFocus(dateKey);
      const progress = HabitStorage.getDayProgress(CURRENT_YEAR, CURRENT_MONTH, day);
      const dayAlerts = HabitStorage.getDayAlerts(CURRENT_YEAR, CURRENT_MONTH, day);

      const hasText = journal.entry && journal.entry.trim();
      const hasBook = journal.bookTitle || journal.bookPage;
      const hasAlert = dayAlerts.length > 0;

      if (hasText || hasBook || focus.totalMinutes > 0 || progress.completed > 0 || hasAlert) {
        hasAnyEntry = true;
        const uniqueAlertTitles = [...new Set(dayAlerts.map(a => `${a.icon || '🚨'} ${a.title}`))].join(' • ');

        let bookThumbHtml = '';
        if (hasBook) {
          bookThumbHtml = journal.bookCover 
            ? `<img src="${journal.bookCover}" class="timeline-book-thumb" alt="Capa">`
            : `<div class="timeline-book-thumb" style="display:flex;align-items:center;justify-content:center;background:var(--bg-card);font-size:1.3rem;">📕</div>`;
        }

        const card = document.createElement('div');
        card.className = 'timeline-day-card';
        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
            <div style="font-weight: 800; font-size: 1.1rem; color: #ffffff;">Dia ${day} de Setembro (${dayOfWeek})</div>
            <div style="display: flex; gap: 0.5rem; font-size: 0.78rem;">
              <span class="save-status-pill">⭐ ${progress.percentage}% Hábitos</span>
              ${focus.totalMinutes > 0 ? `<span class="save-status-pill" style="color:#fbbf24; border-color: rgba(245,158,11,0.3);">⏱️ ${HabitStorage.formatMinutes(focus.totalMinutes)} Foco</span>` : ''}
            </div>
          </div>

          ${hasAlert ? `<div style="margin-bottom: 0.6rem; padding: 0.45rem 0.75rem; background: rgba(244,63,94,0.12); border-left: 3px solid #f43f5e; border-radius: 4px; font-size: 0.85rem; color:#ffffff; font-weight: 600;">🚨 <strong>Compromissos do dia:</strong> ${uniqueAlertTitles}</div>` : ''}

          ${hasBook ? `
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.6rem; padding: 0.5rem 0.75rem; background: var(--bg-card); border-radius: 6px; border: 1px solid var(--border-color);">
              ${bookThumbHtml}
              <div>
                <div style="font-weight: 700; color: #ffffff; font-size: 0.92rem;">${journal.bookTitle || 'Livro Atual'}</div>
                <div style="font-size: 0.8rem; color: var(--accent-emerald-light);">📖 ${journal.bookPage ? `Pág / Cap: ${journal.bookPage}` : 'Lendo'}</div>
              </div>
            </div>
          ` : ''}

          ${hasText ? `<div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6; white-space: pre-wrap;">${journal.entry}</div>` : '<div style="font-size: 0.82rem; color: var(--text-dim); font-style: italic;">Sem anotações escritas no diário.</div>'}
        `;
        timelineModalContent.appendChild(card);
      }
    }

    if (!hasAnyEntry) {
      timelineModalContent.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📖</div>
          <h3>Nenhum registro ainda</h3>
          <p>Conforme você for marcando hábitos e escrevendo no seu diário, a linha do tempo completa aparecerá aqui!</p>
        </div>
      `;
    }

    timelineModal.classList.add('active');
  });

  btnCloseTimelineModal.addEventListener('click', () => {
    timelineModal.classList.remove('active');
  });

  /* ==========================================================================
     Tab 3: Render Heatmap Matrix
     ========================================================================== */
  function renderHeatmapMatrix() {
    const habits = HabitStorage.getHabits();
    let html = '<thead><tr><th class="habit-col-header">Hábito / Tarefa</th>';
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      html += `<th style="width: 32px; min-width: 32px; font-size: 0.75rem;">${day}</th>`;
    }
    html += '<th style="min-width: 60px;">Total</th></tr></thead><tbody>';

    habits.forEach(habit => {
      const targetCount = habit.targetCount || 1;
      const habitStats = HabitStorage.getHabitStats(habit.id, CURRENT_YEAR);
      html += `<tr><td class="habit-col-cell" title="${habit.title}">${habit.emoji || '🎯'} ${habit.title}</td>`;

      for (let day = 1; day <= TOTAL_DAYS; day++) {
        const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, day);
        const count = HabitStorage.getHabitCheckCount(dateKey, habit.id, targetCount);
        const isComplete = count >= targetCount && targetCount > 0;
        const isPartial = count > 0 && count < targetCount;

        let cellClass = '';
        let cellText = '';

        if (isComplete) {
          cellClass = 'checked';
          cellText = '✓';
        } else if (isPartial) {
          cellClass = 'partial';
          cellText = `${count}`;
        }

        html += `
          <td>
            <button class="matrix-cell-btn ${cellClass}" 
                    data-habit-id="${habit.id}" 
                    data-day="${day}" 
                    title="Dia ${day}: ${habit.title} (${count}/${targetCount})">
              ${cellText}
            </button>
          </td>
        `;
      }

      html += `<td style="font-weight: 700; color: #fbbf24;">${habitStats.completedDays}/30</td></tr>`;
    });

    html += '</tbody>';
    heatmapMatrixTable.innerHTML = html;

    const cellButtons = heatmapMatrixTable.querySelectorAll('.matrix-cell-btn');
    cellButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const hId = btn.dataset.habitId;
        const d = parseInt(btn.dataset.day, 10);
        const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, d);
        const habit = habits.find(h => h.id === hId);
        const target = habit ? (habit.targetCount || 1) : 1;

        if (target > 1) {
          HabitStorage.incrementHabitCheck(dateKey, hId, target);
        } else {
          HabitStorage.toggleCheck(dateKey, hId, target);
        }
        
        SoundFx.playPop();
        renderHeatmapMatrix();
        updateHeroSection();
        if (d === selectedDay) renderChecklist();
      });
    });
  }

  /* ==========================================================================
     Tab 4: Render Stats & Badges
     ========================================================================== */
  function renderStatsAndBadges() {
    const summary = HabitStorage.getSeptemberSummary(CURRENT_YEAR);

    statOverallPercentage.textContent = `${summary.overallPercentage}%`;
    statMaxStreak.textContent = `${summary.maxStreak} dias`;
    statTotalFocusMonth.textContent = HabitStorage.formatMinutes(summary.totalFocusMinutesMonth);
    statPerfectDays.textContent = `${summary.perfectDays} / 30`;
    statTotalChecks.textContent = `${summary.totalChecksDone}`;

    badgesContainer.innerHTML = '';
    summary.unlockedBadges.forEach(badge => {
      const card = document.createElement('div');
      card.className = `badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="badge-icon">${badge.icon}</div>
        <div>
          <div class="badge-name">${badge.title}</div>
          <div class="badge-desc">${badge.desc}</div>
        </div>
        <span class="badge-status">${badge.unlocked ? 'Conquistado' : 'Bloqueado'}</span>
      `;
      badgesContainer.appendChild(card);
    });
  }

  /* ==========================================================================
     Tab 5: Render Manage Habits
     ========================================================================== */
  function renderManageHabits() {
    const habits = HabitStorage.getHabits();
    manageHabitsList.innerHTML = '';

    habits.forEach((habit, index) => {
      const targetCount = habit.targetCount || 1;
      const countLabel = targetCount > 1 ? `<span style="font-size: 0.72rem; color: #34d399; background: rgba(16,185,129,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; margin-left: 0.4rem;">${targetCount}× ao dia</span>` : '';
      const pomodoroLabel = habit.hasPomodoro ? `<span style="font-size: 0.72rem; color: #fbbf24; background: rgba(245,158,11,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; margin-left: 0.4rem;">⏱️ ${habit.defaultMinutes || 25}m</span>` : '';

      const item = document.createElement('div');
      item.className = 'habit-manage-item';
      item.innerHTML = `
        <div class="habit-manage-info">
          <span style="font-size: 0.8rem; color: var(--text-dim); font-weight: 700; width: 24px;">#${index + 1}</span>
          <span style="font-size: 1.3rem;">${habit.emoji || '🎯'}</span>
          <div>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">
              ${habit.title} ${countLabel} ${pomodoroLabel}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${habit.category || 'Geral'} • ${habit.period || 'anytime'}</div>
          </div>
        </div>
        <div class="habit-manage-actions">
          <button class="btn-secondary btn-edit-habit" data-id="${habit.id}" title="Editar Hábito">✏️ Editar</button>
          <button class="btn-secondary btn-delete-habit" data-id="${habit.id}" title="Excluir Hábito" style="color: var(--accent-rose);">🗑️</button>
        </div>
      `;

      item.querySelector('.btn-edit-habit').addEventListener('click', () => {
        openEditHabitModal(habit);
      });

      item.querySelector('.btn-delete-habit').addEventListener('click', () => {
        if (confirm(`Tem certeza que deseja excluir o hábito "${habit.title}"?`)) {
          HabitStorage.deleteHabit(habit.id);
          renderAllViews();
          showToast('Hábito removido com sucesso!', '🗑️');
        }
      });

      manageHabitsList.appendChild(item);
    });
  }

  /* ==========================================================================
     Tab 6: Galeria de Treinos Estilo Notion (Treinos A, B, C, D)
     ========================================================================== */
  const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Seg, Ter, Qua, Qui, Sex, Sáb, Dom
  const WEEKDAY_SHORT = { 1: 'Seg', 2: 'Ter', 3: 'Qua', 4: 'Qui', 5: 'Sex', 6: 'Sáb', 0: 'Dom' };

  /* ==========================================================================
     Tab 6 & Subtab: Galeria de Treinos Estilo Notion & Grade Semanal
     ========================================================================== */
  function renderWeeklyScheduleBar() {
    if (!workoutWeeklyDaysGrid) return;
    const schedule = HabitStorage.getWeeklyWorkoutSchedule();
    const dateObj = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, selectedDay);
    const todayWeekday = dateObj.getDay(); // 0 a 6

    workoutWeeklyDaysGrid.innerHTML = '';

    WEEKDAY_ORDER.forEach(wDay => {
      const routineKey = schedule[wDay] || 'REST';
      const isToday = (wDay === todayWeekday);
      const isRoutineActive = (activeRoutineId === routineKey);

      const pill = document.createElement('div');
      pill.className = `workout-day-schedule-pill ${isToday ? 'today' : ''} ${isRoutineActive ? 'active' : ''}`;
      pill.dataset.weekday = wDay;
      pill.dataset.routine = routineKey;

      const routineDisplay = routineKey === 'REST' ? 'Descanso' : `Treino ${routineKey}`;

      pill.innerHTML = `
        ${isToday ? '<span class="pill-today-badge">HOJE</span>' : ''}
        <span class="pill-weekday-abbr">${WEEKDAY_SHORT[wDay]}</span>
        <span class="pill-routine-tag tag-${routineKey}">${routineDisplay}</span>
      `;

      pill.addEventListener('click', () => {
        if (routineKey !== 'REST') {
          activeRoutineId = routineKey;
          renderWorkoutTab();
        } else {
          showToast(`Hoje é dia de Descanso programado para ${WEEKDAY_NAMES[wDay]}. Você pode escolher qualquer treino (A, B, C, D) se quiser treinar!`, '🛋️');
        }
        renderWeeklyScheduleBar();
      });

      workoutWeeklyDaysGrid.appendChild(pill);
    });
  }

  function renderExerciseCardsTo(container, routineKey, dateKey, exercises, dayLog, onRefresh) {
    if (!container) return;
    container.innerHTML = '';

    exercises.forEach((exercise, index) => {
      const exLog = (dayLog.exercises && dayLog.exercises[exercise.id]) ? dayLog.exercises[exercise.id] : { setsDone: [], weight: '' };
      const setsDone = Array.isArray(exLog.setsDone) ? exLog.setsDone : [];
      const numSets = parseInt(exercise.sets, 10) || 4;
      const isAllDone = setsDone.length >= numSets;

      const lastWeight = exLog.weight || HabitStorage.getLastUsedWeight(exercise.id) || '';

      // Pills de tags estilo Notion
      let tagsHtml = '';
      const tagsList = Array.isArray(exercise.tags) 
        ? exercise.tags 
        : (exercise.tags ? String(exercise.tags).split(',').map(t => t.trim()).filter(Boolean) : []);
      
      tagsList.forEach(t => {
        const lower = t.toLowerCase();
        let tagClass = 'generic';
        if (lower.includes('aquec')) tagClass = 'aquecimento';
        else if (lower.includes('fortalec') || lower.includes('hipertrof')) tagClass = 'fortalecimento';
        else if (lower.includes('reabil') || lower.includes('joelho') || lower.includes('quadril') || lower.includes('perna')) tagClass = 'reabilitacao';
        tagsHtml += `<span class="notion-pill-tag ${tagClass}">${t}</span>`;
      });

      // Botões de série
      let setsButtonsHtml = '';
      for (let s = 1; s <= numSets; s++) {
        const isDone = setsDone.includes(s);
        setsButtonsHtml += `
          <button type="button" class="notion-set-btn ${isDone ? 'checked' : ''}" data-exercise-id="${exercise.id}" data-set-index="${s}" title="Marcar Série ${s}">
            ${isDone ? '✓' : s}
          </button>
        `;
      }

      const card = document.createElement('div');
      card.className = `notion-exercise-card ${isAllDone ? 'all-done' : ''}`;
      
      const gifSrc = exercise.gifUrl || exercise.gifFallback || 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Full_Squat/0.jpg';
      const orderNum = exercise.order || (index + 1);

      card.innerHTML = `
        <div class="notion-card-cover" data-exercise-id="${exercise.id}">
          <span class="notion-order-tag">#${orderNum}</span>
          <img src="${gifSrc}" alt="${exercise.name}" loading="lazy" onerror="this.src='${exercise.gifFallback || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop'}'">
          
          <div class="notion-cover-actions">
            <button type="button" class="notion-action-btn btn-zoom-gif" title="Ampliar GIF e Instruções">
              🔍 Zoom
            </button>
            <button type="button" class="notion-action-btn btn-edit-ex" title="Editar Exercício">
              ✏️ Editar
            </button>
          </div>
        </div>

        <div class="notion-card-body">
          <div class="notion-card-title-row">
            <h3 class="notion-card-title">💪 ${orderNum} - ${exercise.name}</h3>
          </div>

          ${tagsHtml ? `<div class="notion-tags-row">${tagsHtml}</div>` : ''}

          <div class="notion-card-meta">
            <strong>${numSets} séries</strong> × <strong>${exercise.reps || '10 a 12'} reps</strong> • ⏱️ ${exercise.restSeconds || 60}s descanso
          </div>

          <div class="notion-card-footer">
            <div class="notion-sets-group">
              ${setsButtonsHtml}
            </div>

            <div class="notion-weight-input-wrap" title="Carga utilizada">
              <input type="number" step="0.5" class="notion-weight-input" data-exercise-id="${exercise.id}" placeholder="0" value="${lastWeight}">
              <span class="notion-weight-unit">kg</span>
            </div>
          </div>
        </div>
      `;

      // Zoom no GIF ao clicar na capa ou no botão de zoom
      card.querySelector('.notion-card-cover').addEventListener('click', (e) => {
        if (e.target.closest('.btn-edit-ex')) return;
        openWorkoutGifModal(exercise);
      });

      // Editar Exercício
      const btnEdit = card.querySelector('.btn-edit-ex');
      if (btnEdit) {
        btnEdit.addEventListener('click', (e) => {
          e.stopPropagation();
          openEditExerciseModal(routineKey, exercise);
        });
      }

      // Check de Série
      card.querySelectorAll('.notion-set-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const exId = btn.dataset.exerciseId;
          const sIdx = parseInt(btn.dataset.setIndex, 10);
          const updatedSets = HabitStorage.toggleWorkoutSet(dateKey, exId, sIdx);
          
          SoundFx.playPop();
          if (updatedSets.includes(sIdx)) {
            startWorkoutRestTimer(exercise.restSeconds || 60);
          }

          if (typeof onRefresh === 'function') onRefresh();
        });
      });

      // Salvar peso
      const weightInput = card.querySelector('.notion-weight-input');
      weightInput.addEventListener('change', () => {
        const val = weightInput.value.trim();
        HabitStorage.setExerciseWeight(dateKey, exercise.id, val);
        showToast(`Carga salva: ${val} kg para ${exercise.name}!`, '🏋️');
      });

      container.appendChild(card);
    });
  }

  function renderWorkoutTab() {
    if (!notionWorkoutGallery) return;

    renderWeeklyScheduleBar();

    // Atualiza tabs ativas (A, B, C, D)
    const tabs = document.querySelectorAll('.notion-tab-btn');
    tabs.forEach(tab => {
      if (tab.dataset.routine === activeRoutineId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    const routines = HabitStorage.getWorkoutRoutines();
    const routine = routines[activeRoutineId] || {
      id: activeRoutineId,
      name: `Treino ${activeRoutineId}`,
      subtitle: 'Personalizado',
      badge: 'Ficha',
      exercises: []
    };

    if (notionRoutineTitle) notionRoutineTitle.textContent = `${routine.name} • ${routine.subtitle || ''}`;
    if (notionRoutineBadge) notionRoutineBadge.textContent = routine.badge || 'Ficha';

    const exercises = Array.isArray(routine.exercises) ? routine.exercises : [];
    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const dayLog = HabitStorage.getDayWorkoutLog(dateKey);

    notionWorkoutGallery.innerHTML = '';

    if (exercises.length === 0) {
      notionWorkoutGallery.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-color);">
          <div style="font-size: 3rem; margin-bottom: 0.75rem;">🏋️</div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin-bottom: 0.5rem;">Nenhum exercício neste treino ainda</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 480px; margin: 0 auto 1.25rem auto;">
            Clique no botão abaixo para adicionar exercícios, gifs e repetições para o ${routine.name}!
          </p>
          <button class="btn-primary" onclick="document.getElementById('btn-add-exercise').click()">
            + Adicionar Primeiro Exercício
          </button>
        </div>
      `;
      if (notionRoutineProgress) notionRoutineProgress.textContent = '0/0 feitos';
      return;
    }

    let totalCompletedExercises = 0;
    exercises.forEach(exercise => {
      const exLog = (dayLog.exercises && dayLog.exercises[exercise.id]) ? dayLog.exercises[exercise.id] : { setsDone: [] };
      const setsDone = Array.isArray(exLog.setsDone) ? exLog.setsDone : [];
      const numSets = parseInt(exercise.sets, 10) || 4;
      if (setsDone.length >= numSets) totalCompletedExercises++;
    });

    renderExerciseCardsTo(notionWorkoutGallery, activeRoutineId, dateKey, exercises, dayLog, () => {
      renderWorkoutTab();
      renderDailyWorkoutSubtab();
    });

    if (notionRoutineProgress) {
      notionRoutineProgress.textContent = `${totalCompletedExercises}/${exercises.length} concluídos`;
      notionRoutineProgress.style.color = (totalCompletedExercises === exercises.length && exercises.length > 0) ? 'var(--accent-emerald-light)' : '#fbbf24';
    }
  }

  // --- SUBTAB: Treino do Dia Conectado à Grade Semanal (Dentro da Visão do Dia) ---
  function renderDailyWorkoutSubtab() {
    if (!dailyWorkoutPanel) return;

    const dateKey = HabitStorage.formatDateKey(CURRENT_YEAR, CURRENT_MONTH, selectedDay);
    const dateObj = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, selectedDay);
    const dayOfWeek = WEEKDAY_NAMES[dateObj.getDay()];
    const routineKey = HabitStorage.getRoutineForDay(CURRENT_YEAR, CURRENT_MONTH, selectedDay);

    // Atualiza badge na barra de sub-abas
    if (subtabWorkoutBadge) {
      if (routineKey === 'REST') {
        subtabWorkoutBadge.textContent = 'Descanso';
        subtabWorkoutBadge.className = 'notification-badge badge-empty';
      } else {
        subtabWorkoutBadge.textContent = routineKey;
        subtabWorkoutBadge.className = 'notification-badge badge-green';
      }
    }

    dailyWorkoutPanel.innerHTML = '';

    if (routineKey === 'REST') {
      dailyWorkoutPanel.innerHTML = `
        <div class="daily-workout-banner">
          <div class="daily-workout-banner-info">
            <div class="daily-workout-banner-icon">🛋️</div>
            <div>
              <h3 class="daily-workout-banner-title">${dayOfWeek} • Dia de Descanso & Recuperação</h3>
              <p class="daily-workout-banner-desc">Recuperação muscular ativa, sono e hidratação. Ideal para caminhada leve, alongamento ou fisioterapia.</p>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="btn-secondary" id="btn-daily-open-schedule">
              ⚙️ Ajustar Grade Semanal
            </button>
            <button type="button" class="btn-primary" id="btn-daily-train-anyway">
              🏋️ Treinar Mesmo Assim
            </button>
          </div>
        </div>

        <div class="daily-workout-rest-card">
          <div style="font-size: 3rem; margin-bottom: 0.75rem;">🧘</div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin-bottom: 0.5rem;">Recuperação Muscular Programada</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 520px; margin: 0 auto 1.25rem auto; line-height: 1.5;">
            Os músculos se regeneram e fortalecem durante o descanso! Se você quiser treinar hoje mesmo assim, clique em <strong>Treinar Mesmo Assim</strong> para abrir a galeria e escolher sua ficha.
          </p>
        </div>
      `;

      const btnDailyOpenSchedule = dailyWorkoutPanel.querySelector('#btn-daily-open-schedule');
      if (btnDailyOpenSchedule) {
        btnDailyOpenSchedule.addEventListener('click', openWeeklyScheduleModal);
      }

      const btnTrainAnyway = dailyWorkoutPanel.querySelector('#btn-daily-train-anyway');
      if (btnTrainAnyway) {
        btnTrainAnyway.addEventListener('click', () => {
          const workoutTabBtn = document.querySelector('.nav-tab-btn[data-tab="tab-workout"]');
          if (workoutTabBtn) workoutTabBtn.click();
        });
      }
      return;
    }

    // Rotina ativa agendada para hoje (A, B, C ou D)
    const routines = HabitStorage.getWorkoutRoutines();
    const routine = routines[routineKey] || {
      id: routineKey,
      name: `Treino ${routineKey}`,
      subtitle: 'Personalizado',
      badge: 'Ficha',
      exercises: []
    };

    const dayLog = HabitStorage.getDayWorkoutLog(dateKey);
    const exercises = Array.isArray(routine.exercises) ? routine.exercises : [];

    let completedCount = 0;
    exercises.forEach(ex => {
      const exLog = (dayLog.exercises && dayLog.exercises[ex.id]) ? dayLog.exercises[ex.id] : { setsDone: [] };
      const setsDone = Array.isArray(exLog.setsDone) ? exLog.setsDone : [];
      if (setsDone.length >= (parseInt(ex.sets, 10) || 4)) completedCount++;
    });

    const isAllCompleted = completedCount === exercises.length && exercises.length > 0;

    const banner = document.createElement('div');
    banner.className = 'daily-workout-banner';
    banner.innerHTML = `
      <div class="daily-workout-banner-info">
        <div class="daily-workout-banner-icon">🏋️</div>
        <div>
          <h3 class="daily-workout-banner-title">${dayOfWeek} • ${routine.name} (${routine.subtitle || ''})</h3>
          <p class="daily-workout-banner-desc">
            <span style="color: ${isAllCompleted ? 'var(--accent-emerald-light)' : '#fbbf24'}; font-weight: 700;">
              ${completedCount}/${exercises.length} exercícios concluídos
            </span> • ${routine.badge || 'Ficha do Dia'}
          </p>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button type="button" class="btn-secondary" id="btn-daily-open-schedule">
          ⚙️ Grade Semanal
        </button>
        <button type="button" class="btn-primary" id="btn-daily-open-full-gallery">
          📂 Abrir no Modo Galeria
        </button>
      </div>
    `;

    banner.querySelector('#btn-daily-open-schedule').addEventListener('click', openWeeklyScheduleModal);
    banner.querySelector('#btn-daily-open-full-gallery').addEventListener('click', () => {
      activeRoutineId = routineKey;
      const workoutTabBtn = document.querySelector('.nav-tab-btn[data-tab="tab-workout"]');
      if (workoutTabBtn) workoutTabBtn.click();
    });

    dailyWorkoutPanel.appendChild(banner);

    const cardsGrid = document.createElement('div');
    cardsGrid.className = 'notion-gallery-grid';
    dailyWorkoutPanel.appendChild(cardsGrid);

    renderExerciseCardsTo(cardsGrid, routineKey, dateKey, exercises, dayLog, () => {
      renderDailyWorkoutSubtab();
      renderWorkoutTab();
    });
  }

  // --- MODAL: Grade Semanal de Treinos (Configuração) ---
  function openWeeklyScheduleModal() {
    if (!modalWeeklySchedule || !scheduleDaysList) return;
    const schedule = HabitStorage.getWeeklyWorkoutSchedule();
    const routines = HabitStorage.getWorkoutRoutines();

    scheduleDaysList.innerHTML = '';

    WEEKDAY_ORDER.forEach(wDay => {
      const currentVal = schedule[wDay] || 'REST';
      const row = document.createElement('div');
      row.className = 'schedule-day-row';

      row.innerHTML = `
        <div class="schedule-day-label">
          <span class="schedule-day-abbr">${WEEKDAY_SHORT[wDay]}</span>
          <span class="schedule-day-name">${WEEKDAY_NAMES[wDay]}</span>
        </div>
        <select class="form-select schedule-day-select" data-weekday="${wDay}">
          <option value="A" ${currentVal === 'A' ? 'selected' : ''}>Treino A (${routines.A ? routines.A.subtitle : 'Peito, Ombro & Tríceps'})</option>
          <option value="B" ${currentVal === 'B' ? 'selected' : ''}>Treino B (${routines.B ? routines.B.subtitle : 'Pernas & Fortalecimento'})</option>
          <option value="C" ${currentVal === 'C' ? 'selected' : ''}>Treino C (${routines.C ? routines.C.subtitle : 'Costas & Bíceps'})</option>
          <option value="D" ${currentVal === 'D' ? 'selected' : ''}>Treino D (${routines.D ? routines.D.subtitle : 'Ombros, Core & Mobilidade'})</option>
          <option value="REST" ${currentVal === 'REST' ? 'selected' : ''}>🛋️ Descanso / Recuperação Ativa</option>
        </select>
      `;

      scheduleDaysList.appendChild(row);
    });

    modalWeeklySchedule.classList.add('active');
  }

  function closeWeeklyScheduleModal() {
    if (modalWeeklySchedule) modalWeeklySchedule.classList.remove('active');
  }

  if (btnOpenWeeklyScheduleModal) {
    btnOpenWeeklyScheduleModal.addEventListener('click', openWeeklyScheduleModal);
  }
  if (btnCloseWeeklyScheduleModal) {
    btnCloseWeeklyScheduleModal.addEventListener('click', closeWeeklyScheduleModal);
  }
  if (btnCancelWeeklySchedule) {
    btnCancelWeeklySchedule.addEventListener('click', closeWeeklyScheduleModal);
  }

  if (formWeeklySchedule) {
    formWeeklySchedule.addEventListener('submit', (e) => {
      e.preventDefault();
      const selects = scheduleDaysList.querySelectorAll('.schedule-day-select');
      const newSchedule = {};
      selects.forEach(sel => {
        newSchedule[sel.dataset.weekday] = sel.value;
      });

      HabitStorage.saveWeeklyWorkoutSchedule(newSchedule);
      closeWeeklyScheduleModal();
      renderWeeklyScheduleBar();
      renderDailyWorkoutSubtab();
      renderWorkoutTab();
      updateHeroSection();
      showToast('Grade semanal de treinos salva com sucesso!', '🗓️');
    });
  }

  if (btnResetDefaultSchedule) {
    btnResetDefaultSchedule.addEventListener('click', () => {
      if (confirm('Deseja restaurar a grade semanal padrão (Seg A, Ter B, Qua Descanso, Qui C, Sex D, Sáb/Dom Descanso)?')) {
        HabitStorage.resetWeeklyWorkoutSchedule();
        openWeeklyScheduleModal();
        renderWeeklyScheduleBar();
        renderDailyWorkoutSubtab();
        renderWorkoutTab();
        showToast('Grade semanal restaurada para o padrão!', '↺');
      }
    });
  }

  function openNewExerciseModal() {
    if (!exerciseModal) return;
    exerciseModalTitle.textContent = '💪 Novo Exercício para o Treino';
    formExerciseId.value = '';
    formExerciseName.value = '';
    formExerciseRoutine.value = activeRoutineId;
    formExerciseSets.value = '4';
    formExerciseReps.value = '10 a 12';
    formExerciseRest.value = '60';
    formExerciseTags.value = 'Fortalecimento';
    formExerciseGif.value = '';
    formExerciseNotes.value = '';
    if (btnDeleteExercise) btnDeleteExercise.style.display = 'none';
    exerciseModal.classList.add('active');
    formExerciseName.focus();
  }

  function openEditExerciseModal(routineKey, exercise) {
    if (!exerciseModal) return;
    exerciseModalTitle.textContent = '✏️ Editar Exercício';
    formExerciseId.value = exercise.id;
    formExerciseName.value = exercise.name;
    formExerciseRoutine.value = routineKey;
    formExerciseSets.value = exercise.sets || 4;
    formExerciseReps.value = exercise.reps || '10 a 12';
    formExerciseRest.value = exercise.restSeconds || 60;
    formExerciseTags.value = Array.isArray(exercise.tags) ? exercise.tags.join(', ') : (exercise.tags || '');
    formExerciseGif.value = exercise.gifUrl || '';
    formExerciseNotes.value = exercise.notes || '';
    if (btnDeleteExercise) btnDeleteExercise.style.display = 'inline-flex';
    exerciseModal.classList.add('active');
    formExerciseName.focus();
  }

  function closeExerciseModal() {
    if (exerciseModal) exerciseModal.classList.remove('active');
  }

  if (btnAddExercise) btnAddExercise.addEventListener('click', openNewExerciseModal);
  if (btnCloseExerciseModal) btnCloseExerciseModal.addEventListener('click', closeExerciseModal);
  if (btnCancelExerciseModal) btnCancelExerciseModal.addEventListener('click', closeExerciseModal);

  if (btnResetWorkoutRoutines) {
    btnResetWorkoutRoutines.addEventListener('click', () => {
      if (confirm('Deseja restaurar as fichas de treino padrão do Notion (Treinos A, B, C, D)?')) {
        HabitStorage.resetWorkoutRoutinesToDefault();
        renderWorkoutTab();
        showToast('Fichas de treino restauradas para o padrão Notion!', '↺');
      }
    });
  }

  if (exerciseForm) {
    exerciseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = formExerciseId.value.trim();
      const name = formExerciseName.value.trim();
      const routineKey = formExerciseRoutine.value || activeRoutineId;
      const sets = parseInt(formExerciseSets.value, 10) || 4;
      const reps = formExerciseReps.value.trim() || '10 a 12';
      const restSeconds = parseInt(formExerciseRest.value, 10) || 60;
      const tagsStr = formExerciseTags.value.trim();
      const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : ['Fortalecimento'];
      const gifUrl = formExerciseGif.value.trim();
      const notes = formExerciseNotes.value.trim();

      if (!name) return;

      const exerciseData = {
        name,
        sets,
        reps,
        restSeconds,
        tags,
        gifUrl,
        notes
      };

      if (id) {
        exerciseData.id = id;
      }

      HabitStorage.saveExercise(routineKey, exerciseData);
      closeExerciseModal();
      activeRoutineId = routineKey;
      renderWorkoutTab();
      showToast(id ? 'Exercício atualizado com sucesso!' : 'Novo exercício adicionado ao treino!', '💪');
    });
  }

  if (btnDeleteExercise) {
    btnDeleteExercise.addEventListener('click', () => {
      const id = formExerciseId.value.trim();
      const routineKey = formExerciseRoutine.value || activeRoutineId;
      if (!id) return;
      if (confirm('Tem certeza que deseja excluir este exercício da ficha?')) {
        HabitStorage.deleteExercise(routineKey, id);
        closeExerciseModal();
        renderWorkoutTab();
        showToast('Exercício removido com sucesso!', '🗑️');
      }
    });
  }

  function openWorkoutGifModal(exercise) {
    if (!workoutGifModal) return;
    if (gifModalTitle) gifModalTitle.textContent = exercise.name;
    if (gifModalMuscle) {
      const tags = Array.isArray(exercise.tags) ? exercise.tags.join(' • ') : (exercise.tags || 'Exercício');
      gifModalMuscle.textContent = tags;
    }
    if (gifModalImage) {
      gifModalImage.src = exercise.gifUrl || exercise.gifFallback || '';
      gifModalImage.onerror = () => {
        if (exercise.gifFallback) gifModalImage.src = exercise.gifFallback;
      };
    }
    if (gifModalNotes) {
      gifModalNotes.innerHTML = `
        <strong>💡 Instruções & Biomecânica:</strong><br>${exercise.notes || 'Execução controlada mantendo postura correta e respiração ritmada.'}<br><br>
        <strong>🎯 Meta da Série:</strong> ${exercise.sets} séries de ${exercise.reps || '10 a 12'} repetições.<br>
        <strong>⏱️ Descanso Recomendado:</strong> ${exercise.restSeconds || 60} segundos entre séries.
      `;
    }
    workoutGifModal.classList.add('active');
  }

  function startWorkoutRestTimer(seconds = 60) {
    clearInterval(workoutRestInterval);
    workoutRestTargetSeconds = seconds;
    workoutRestSecondsLeft = seconds;
    updateRestTimerDisplay();

    if (btnStartRest) btnStartRest.style.display = 'none';
    if (btnStopRest) btnStopRest.style.display = 'inline-flex';

    workoutRestInterval = setInterval(() => {
      if (workoutRestSecondsLeft > 0) {
        workoutRestSecondsLeft--;
        updateRestTimerDisplay();
        if (workoutRestSecondsLeft === 0) {
          clearInterval(workoutRestInterval);
          SoundFx.playVictory();
          showToast('⏰ Tempo de descanso encerrado! Hora da próxima série!', '💪');
          if (btnStartRest) btnStartRest.style.display = 'inline-flex';
          if (btnStopRest) btnStopRest.style.display = 'none';
        }
      }
    }, 1000);
  }

  function stopWorkoutRestTimer() {
    clearInterval(workoutRestInterval);
    workoutRestSecondsLeft = workoutRestTargetSeconds;
    updateRestTimerDisplay();
    if (btnStartRest) btnStartRest.style.display = 'inline-flex';
    if (btnStopRest) btnStopRest.style.display = 'none';
  }

  function updateRestTimerDisplay() {
    if (!workoutRestDisplay) return;
    const m = Math.floor(workoutRestSecondsLeft / 60);
    const s = workoutRestSecondsLeft % 60;
    workoutRestDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // Notion Routine Tabs switching
  const notionTabs = document.querySelectorAll('.notion-tab-btn');
  notionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      notionTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeRoutineId = tab.dataset.routine;
      renderWorkoutTab();
    });
  });

  if (btnStartRest) {
    btnStartRest.addEventListener('click', () => {
      startWorkoutRestTimer(workoutRestTargetSeconds || 60);
    });
  }

  if (btnStopRest) {
    btnStopRest.addEventListener('click', stopWorkoutRestTimer);
  }

  const workoutRestPresets = document.querySelectorAll('.rest-pill');
  workoutRestPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      workoutRestPresets.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sec = parseInt(btn.dataset.sec, 10) || 60;
      workoutRestTargetSeconds = sec;
      workoutRestSecondsLeft = sec;
      updateRestTimerDisplay();
    });
  });

  if (btnCloseGifModal) {
    btnCloseGifModal.addEventListener('click', () => {
      workoutGifModal.classList.remove('active');
    });
  }

  if (btnDoneGifModal) {
    btnDoneGifModal.addEventListener('click', () => {
      workoutGifModal.classList.remove('active');
    });
  }

  function renderAllViews() {
    updateHeroSection();
    renderChecklist();
    renderTasks();
    renderDailyAlerts();
    renderJournal();
    renderFocusTab();
    renderDailyWorkoutSubtab();
    renderWeeklyScheduleBar();

    if (activeTab === 'tab-calendar') renderCalendarGrid();
    if (activeTab === 'tab-matrix') renderHeatmapMatrix();
    if (activeTab === 'tab-stats') renderStatsAndBadges();
    if (activeTab === 'tab-manage') renderManageHabits();
    if (activeTab === 'tab-workout') renderWorkoutTab();
  }

  /* ==========================================================================
     Navigation & Tab Switching
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      activeTab = btn.dataset.tab;
      const activePanel = document.getElementById(activeTab);
      if (activePanel) activePanel.classList.add('active');

      if (activeTab === 'tab-calendar') renderCalendarGrid();
      if (activeTab === 'tab-matrix') renderHeatmapMatrix();
      if (activeTab === 'tab-stats') renderStatsAndBadges();
      if (activeTab === 'tab-manage') renderManageHabits();
      if (activeTab === 'tab-workout') renderWorkoutTab();
    });
  });

  const dailySubtabButtons = document.querySelectorAll('.daily-subtab-btn');
  const dailySubtabContents = document.querySelectorAll('.daily-subtab-content');

  dailySubtabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dailySubtabButtons.forEach(b => b.classList.remove('active'));
      dailySubtabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      activeDailySubtab = btn.dataset.subtab;
      const activeSubContent = document.getElementById(activeDailySubtab);
      if (activeSubContent) activeSubContent.classList.add('active');
      
      if (activeDailySubtab === 'subtab-alerts') renderDailyAlerts();
      if (activeDailySubtab === 'subtab-journal') renderJournal();
      if (activeDailySubtab === 'subtab-focus') renderFocusTab();
      if (activeDailySubtab === 'subtab-workout') renderDailyWorkoutSubtab();
    });
  });

  const filterBtns = document.querySelectorAll('#period-filters .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePeriodFilter = btn.dataset.filter;
      renderChecklist();
    });
  });

  btnPrevDay.addEventListener('click', () => {
    if (selectedDay > 1) {
      selectedDay--;
      renderAllViews();
    } else {
      showToast('Você está no primeiro dia de Setembro.', 'ℹ️');
    }
  });

  btnNextDay.addEventListener('click', () => {
    if (selectedDay < TOTAL_DAYS) {
      selectedDay++;
      renderAllViews();
    } else {
      showToast('Você está no último dia de Setembro.', 'ℹ️');
    }
  });

  btnGoToday.addEventListener('click', () => {
    selectedDay = todayDay || 1;
    renderAllViews();
    showToast(`Navegando para o dia de hoje (Dia ${selectedDay})`, '📅');
  });

  btnSoundToggle.addEventListener('click', () => {
    const isMuted = SoundFx.isSoundEnabled();
    SoundFx.toggleSound(!isMuted);
    btnSoundToggle.textContent = !isMuted ? '🔔' : '🔕';
    showToast(!isMuted ? 'Efeitos sonoros ativados!' : 'Efeitos sonoros desativados.', '🔊');
  });

  /* ==========================================================================
     Habit Modal (Create & Edit)
     ========================================================================== */
  function openNewHabitModal() {
    modalHabitTitle.textContent = 'Novo Hábito para o Desafio';
    formHabitId.value = '';
    formHabitName.value = '';
    formHabitEmoji.value = '🎯';
    formHabitTargetCount.value = '1';
    formHabitPeriod.value = 'anytime';
    formHabitCategory.value = 'Saúde';
    formHabitPomodoro.checked = false;
    formHabitMinutes.value = '25';
    habitModal.classList.add('active');
    formHabitName.focus();
  }

  function openEditHabitModal(habit) {
    modalHabitTitle.textContent = 'Editar Hábito';
    formHabitId.value = habit.id;
    formHabitName.value = habit.title;
    formHabitEmoji.value = habit.emoji || '🎯';
    formHabitTargetCount.value = String(habit.targetCount || 1);
    formHabitPeriod.value = habit.period || 'anytime';
    formHabitCategory.value = habit.category || 'Saúde';
    formHabitPomodoro.checked = !!habit.hasPomodoro;
    formHabitMinutes.value = String(habit.defaultMinutes || 25);
    habitModal.classList.add('active');
    formHabitName.focus();
  }

  btnQuickAddHabit.addEventListener('click', openNewHabitModal);
  btnOpenNewHabitModal.addEventListener('click', openNewHabitModal);

  function closeHabitModal() {
    habitModal.classList.remove('active');
  }

  btnCloseHabitModal.addEventListener('click', closeHabitModal);
  btnCancelHabitModal.addEventListener('click', closeHabitModal);

  const quickEmojiButtons = document.querySelectorAll('#quick-emoji-picker .emoji-option');
  quickEmojiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formHabitEmoji.value = btn.textContent.trim();
    });
  });

  habitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = formHabitId.value;
    const title = formHabitName.value.trim();
    const emoji = formHabitEmoji.value.trim() || '🎯';
    const targetCount = parseInt(formHabitTargetCount.value, 10) || 1;
    const period = formHabitPeriod.value;
    const category = formHabitCategory.value;
    const hasPomodoro = formHabitPomodoro.checked;
    const defaultMinutes = parseInt(formHabitMinutes.value, 10) || 25;

    if (!title) return;

    if (id) {
      HabitStorage.updateHabit(id, { title, emoji, targetCount, period, category, hasPomodoro, defaultMinutes });
      showToast('Hábito atualizado com sucesso!', '✏️');
    } else {
      HabitStorage.addHabit({ title, emoji, targetCount, period, category, hasPomodoro, defaultMinutes });
      showToast('Novo hábito adicionado ao Desafio!', '✨');
    }

    closeHabitModal();
    renderAllViews();
  });

  /* ==========================================================================
     Backup & Restore Modal
     ========================================================================== */
  btnOpenBackup.addEventListener('click', () => {
    backupModal.classList.add('active');
    importJsonTextarea.value = '';
    updateCloudStatus();
  });

  btnCloseBackupModal.addEventListener('click', () => {
    backupModal.classList.remove('active');
  });

  btnDownloadBackup.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(HabitStorage.exportBackupJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `desafio_30d_setembro_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON completo baixado!', '📥');
  });

  btnCopyBackup.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(HabitStorage.exportBackupJSON());
      showToast('Backup copiado para a área de transferência!', '📋');
    } catch (e) {
      showToast('Erro ao copiar dados.', '❌');
    }
  });

  btnImportData.addEventListener('click', () => {
    const raw = importJsonTextarea.value.trim();
    if (!raw) {
      showToast('Cole o conteúdo JSON do backup antes de importar.', '⚠️');
      return;
    }
    const res = HabitStorage.importBackupJSON(raw);
    if (res.success) {
      backupModal.classList.remove('active');
      renderAllViews();
      showToast('Backup restaurado com sucesso!', '🎉');
    } else {
      showToast(res.message, '❌');
    }
  });

  btnResetDefaultHabits.addEventListener('click', () => {
    if (confirm('Deseja restaurar sua lista de 30 hábitos principais?')) {
      HabitStorage.resetHabitsToDefault();
      renderAllViews();
      showToast('Seus 30 hábitos foram restaurados!', '↺');
    }
  });

  btnResetEverything.addEventListener('click', () => {
    if (confirm('ATENÇÃO: Deseja apagar todos os hábitos, tarefas, alertas, focos e diários registrados?')) {
      HabitStorage.clearAllData();
      selectedDay = 1;
      backupModal.classList.remove('active');
      renderAllViews();
      showToast('Todos os dados foram resetados.', '⚠️');
    }
  });

  /* ==========================================================================
     Cloud Sync (GitHub Gist)
     ========================================================================== */
  function getGistId() {
    return localStorage.getItem(CLOUD_GIST_ID_KEY) || null;
  }

  function setGistId(id) {
    localStorage.setItem(CLOUD_GIST_ID_KEY, id);
  }

  function getCloudToken() {
    return localStorage.getItem(CLOUD_TOKEN_KEY) || null;
  }

  function updateCloudStatus() {
    const gistId = getGistId();
    const token = getCloudToken();
    if (token && gistId && cloudSyncStatus) {
      cloudSyncStatus.textContent = 'Nuvem vinculada';
      cloudSyncStatus.style.color = 'var(--accent-emerald-light)';
      cloudSyncStatus.style.borderColor = 'rgba(16,185,129,0.3)';
      if (cloudSyncInfo) {
        cloudSyncInfo.style.display = 'block';
        cloudSyncInfo.textContent = 'Sincronizado via GitHub Gist. Token configurado neste dispositivo.';
      }
    } else if (token && cloudSyncStatus) {
      cloudSyncStatus.textContent = 'Token configurado';
      cloudSyncStatus.style.color = '#fbbf24';
      cloudSyncStatus.style.borderColor = 'rgba(245,158,11,0.3)';
      if (cloudSyncInfo) {
        cloudSyncInfo.style.display = 'block';
        cloudSyncInfo.textContent = 'Salve na nuvem para criar seu primeiro backup.';
      }
    } else if (cloudSyncStatus) {
      cloudSyncStatus.textContent = 'Nao configurado';
      cloudSyncStatus.style.color = '';
      cloudSyncStatus.style.borderColor = '';
      if (cloudSyncInfo) {
        cloudSyncInfo.style.display = 'block';
        cloudSyncInfo.textContent = 'Clique em Salvar na Nuvem para configurar o token do GitHub.';
      }
    }
  }

  async function cloudSave() {
    let token = getCloudToken();
    if (!token) {
      token = window.prompt('Cole aqui seu GitHub Personal Access Token (ghp_...):\n\nCrie em: github.com/settings/tokens (marque scope "gist")');
      if (!token || !token.trim()) return;
      localStorage.setItem(CLOUD_TOKEN_KEY, token.trim());
      token = token.trim();
    }
    btnSaveCloud.disabled = true;
    btnSaveCloud.textContent = 'Salvando...';
    try {
      const backupData = HabitStorage.exportBackupJSON();
      const gistId = getGistId();
      const headers = {
        'Authorization': 'token ' + token,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Desafio30d-App'
      };
      const body = JSON.stringify({
        description: 'Desafio30d Backup - ' + new Date().toLocaleString('pt-BR'),
        public: false,
        files: { [CLOUD_GIST_FILENAME]: { content: backupData } }
      });

      let response;
      if (gistId) {
        response = await fetch('https://api.github.com/gists/' + gistId, {
          method: 'PATCH', headers, body
        });
      } else {
        response = await fetch('https://api.github.com/gists', {
          method: 'POST', headers, body
        });
      }

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem(CLOUD_TOKEN_KEY);
          throw new Error('Token invalido. Tente novamente.');
        }
        throw new Error('HTTP ' + response.status);
      }
      const data = await response.json();
      setGistId(data.id);
      // Salva o Gist ID para usar no outro dispositivo
      localStorage.setItem('desafio30d_gist_id_v1', data.id);
      updateCloudStatus();
      const shareMsg = 'No celular, abra o app, va em Backup, clique Carregar da Nuvem e cole este ID: ' + data.id;
      showToast('Dados salvos na nuvem! ' + shareMsg, 'ok');
      if (cloudSyncInfo) {
        cloudSyncInfo.style.display = 'block';
        cloudSyncInfo.textContent = 'Gist ID para o celular: ' + data.id;
      }
    } catch (e) {
      showToast('Erro: ' + e.message, 'erro');
    } finally {
      btnSaveCloud.disabled = false;
      btnSaveCloud.textContent = 'Salvar na Nuvem';
    }
  }

  async function cloudLoad() {
    let token = getCloudToken();
    if (!token) {
      token = window.prompt('Cole aqui seu GitHub Personal Access Token (ghp_...):\n\nCrie em: github.com/settings/tokens (marque scope "gist")');
      if (!token || !token.trim()) return;
      localStorage.setItem(CLOUD_TOKEN_KEY, token.trim());
      token = token.trim();
    }
    let gistId = getGistId();
    if (!gistId) {
      gistId = window.prompt('Cole aqui o Gist ID fornecido pelo outro dispositivo:');
      if (!gistId || !gistId.trim()) return;
      setGistId(gistId.trim());
      gistId = gistId.trim();
    }
    btnLoadCloud.disabled = true;
    btnLoadCloud.textContent = 'Carregando...';
    try {
      const headers = {
        'Authorization': 'token ' + token,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Desafio30d-App'
      };
      const response = await fetch('https://api.github.com/gists/' + gistId, { headers });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem(CLOUD_TOKEN_KEY);
          throw new Error('Token invalido. Tente novamente.');
        }
        throw new Error('HTTP ' + response.status);
      }
      const data = await response.json();
      const fileContent = data.files[CLOUD_GIST_FILENAME];
      if (!fileContent) throw new Error('Arquivo de backup nao encontrado no Gist.');
      const raw = fileContent.content || '';
      if (!raw) throw new Error('Backup vazio.');
      const res = HabitStorage.importBackupJSON(raw);
      if (res.success) {
        backupModal.classList.remove('active');
        renderAllViews();
        showToast('Dados carregados da nuvem com sucesso!', 'ok');
      } else {
        throw new Error(res.message);
      }
    } catch (e) {
      showToast('Erro: ' + e.message, 'erro');
    } finally {
      btnLoadCloud.disabled = false;
      btnLoadCloud.textContent = 'Carregar da Nuvem';
    }
  }

  if (btnSaveCloud) btnSaveCloud.addEventListener('click', cloudSave);
  if (btnLoadCloud) btnLoadCloud.addEventListener('click', cloudLoad);
  if (btnResetCloudToken) btnResetCloudToken.addEventListener('click', () => {
    if (confirm('Redefinir token e ID da nuvem? Voce precisara inserir o token novamente na proxima sincronizacao.')) {
      localStorage.removeItem(CLOUD_TOKEN_KEY);
      localStorage.removeItem(CLOUD_GIST_ID_KEY);
      updateCloudStatus();
      showToast('Token redefinido! Clique em Salvar na Nuvem para configurar novamente.', 'ok');
    }
  });

  // Keyboard navigation shortcuts
  window.addEventListener('keydown', (e) => {
    if (document.querySelector('.modal-overlay.active') || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT') {
      if (e.key === 'Escape') {
        closeHabitModal();
        backupModal.classList.remove('active');
        pomodoroModal.classList.remove('active');
        dayViewModal.classList.remove('active');
        timelineModal.classList.remove('active');
        if (workoutGifModal) workoutGifModal.classList.remove('active');
        if (exerciseModal) exerciseModal.classList.remove('active');
      }
      return;
    }

    if (e.key === 'ArrowLeft') {
      if (selectedDay > 1) {
        selectedDay--;
        renderAllViews();
      }
    } else if (e.key === 'ArrowRight') {
      if (selectedDay < TOTAL_DAYS) {
        selectedDay++;
        renderAllViews();
      }
    }
  });

  // Initial Boot
  renderAllViews();
});
