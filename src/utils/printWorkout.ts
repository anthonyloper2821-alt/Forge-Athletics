import { DaySessionLog, SportProgram, WorkoutDay } from '../types/sport';
import { downloadBlob } from './workoutExport';

export interface PrintWorkoutOptions {
  program: SportProgram;
  scope: 'day' | 'phase' | 'program';
  activePhaseIndex: number;
  activeDayNumber: number;
  activeWeek: number;
  sessionLogs: Record<string, DaySessionLog>;
  currentSessionLog?: DaySessionLog;
  includeLogs: boolean; // true = print logged weights & reps, false = blank gym-floor logging worksheet
  athleteName?: string;
}

/**
 * Builds a clean, high-contrast, ink-friendly HTML document
 * formatted specifically for standard Letter/A4 printing and PDF saving.
 */
export function buildPrintableHTML(options: PrintWorkoutOptions, withDownloadBar: boolean = false): string {
  const {
    program,
    scope,
    activePhaseIndex,
    activeDayNumber,
    activeWeek,
    sessionLogs,
    currentSessionLog,
    includeLogs,
    athleteName = 'Athlete'
  } = options;

  const currentPhase = (program && program.phases && program.phases[activePhaseIndex]) || 
    (program && program.phases && program.phases[0]) || {
      id: 'p1',
      title: 'Foundation Block',
      weeks: 'Weeks 1-2',
      weekNumbers: [1, 2],
      focus: 'Hypertrophy & Work Capacity',
      description: 'Building base structural integrity',
      days: []
    };

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Determine which days to include based on scope
  interface DayToPrint {
    phaseTitle: string;
    phaseWeeks: string;
    phaseIndex: number;
    weekNumber: number;
    day: WorkoutDay;
    sessionLog?: DaySessionLog;
  }

  const daysToPrint: DayToPrint[] = [];

  if (scope === 'day') {
    const day = (currentPhase.days || []).find(d => d.dayNumber === activeDayNumber) || currentPhase.days?.[0];
    if (day) {
      const sessionKey = `${program.id}_p${activePhaseIndex}_d${day.dayNumber}_w${activeWeek}`;
      const log = currentSessionLog || sessionLogs[sessionKey];
      daysToPrint.push({
        phaseTitle: currentPhase.title,
        phaseWeeks: currentPhase.weeks,
        phaseIndex: activePhaseIndex,
        weekNumber: activeWeek,
        day,
        sessionLog: log
      });
    }
  } else if (scope === 'phase') {
    (currentPhase.days || []).forEach(day => {
      const sessionKey = `${program.id}_p${activePhaseIndex}_d${day.dayNumber}_w${activeWeek}`;
      const log = sessionLogs[sessionKey];
      daysToPrint.push({
        phaseTitle: currentPhase.title,
        phaseWeeks: currentPhase.weeks,
        phaseIndex: activePhaseIndex,
        weekNumber: activeWeek,
        day,
        sessionLog: log
      });
    });
  } else {
    // Entire Program
    (program.phases || []).forEach((phase, pIdx) => {
      (phase.days || []).forEach(day => {
        const sessionKey = `${program.id}_p${pIdx}_d${day.dayNumber}_w${phase.weekNumbers?.[0] || 1}`;
        const log = sessionLogs[sessionKey];
        daysToPrint.push({
          phaseTitle: phase.title,
          phaseWeeks: phase.weeks,
          phaseIndex: pIdx,
          weekNumber: phase.weekNumbers?.[0] || 1,
          day,
          sessionLog: log
        });
      });
    });
  }

  // Render individual day section HTML
  const renderedDays = daysToPrint.map((item, dayIndex) => {
    const { day, phaseTitle, phaseWeeks, weekNumber, sessionLog } = item;

    // Build exercise table rows
    const exercises = day.exercises || [];
    const exerciseRows = exercises.map((ex, exIdx) => {
      const swapped = sessionLog?.swappedExercises?.[ex.id];
      const exName = swapped?.name || ex.name || 'Exercise';
      const swapBadge = swapped ? `<span style="font-size: 8.5px; color: #64748b; font-style: italic;"> (Swapped: ${swapped.equipment || 'Alt'})</span>` : '';
      
      // Determine max set count (up to 5 sets)
      const supersetTag = ex.supersetGroup 
        ? `<span class="superset-badge">${ex.supersetGroup}</span>` 
        : `<span class="superset-none">${exIdx + 1}</span>`;

      return `
        <tr>
          <td class="col-num">${supersetTag}</td>
          <td class="col-name">
            <div class="ex-title">${exName}${swapBadge}</div>
            ${ex.notes ? `<div class="ex-note">${ex.notes}</div>` : ''}
          </td>
          <td class="col-target">${ex.targetSetsReps || '3 x 8-10'}</td>
          <td class="col-rest">${ex.rest || '90s'}</td>
          <td class="col-cue">${ex.progressionCue || 'Double progression: 2 RIR standard'}</td>
        </tr>
      `;
    }).join('');

    const isLastDay = dayIndex === daysToPrint.length - 1;
    const pageBreakClass = isLastDay ? '' : 'page-break';

    return `
      <section class="workout-sheet ${pageBreakClass}">
        <!-- Header Banner -->
        <div class="sheet-header">
          <div class="header-left">
            <div class="brand-row">
              <span class="brand-name">FORGE</span>
              <span class="brand-sep">|</span>
              <span class="brand-program">${program.name}</span>
            </div>
            <h1 class="sheet-title">${day.name}</h1>
            <div class="sheet-meta">
              <span><strong>Phase:</strong> ${phaseTitle} (${phaseWeeks})</span>
              <span class="sep">•</span>
              <span><strong>Week:</strong> ${weekNumber}</span>
              <span class="sep">•</span>
              <span><strong>Focus:</strong> ${day.focus}</span>
              <span class="sep">•</span>
              <span><strong>Target:</strong> ~${day.timeBudgetMinutes} min</span>
            </div>
          </div>
          <div class="header-right">
            <div class="athlete-badge">
              <div class="athlete-label">ATHLETE</div>
              <div class="athlete-val">${athleteName}</div>
            </div>
            <div class="date-badge">
              <div class="athlete-label">DATE / LOGGED</div>
              <div class="athlete-val">${sessionLog?.date || currentDateStr}</div>
            </div>
          </div>
        </div>

        <!-- Warm-Up Protocol Box -->
        ${day.warmUpProtocol ? `
          <div class="protocol-box warmup-box">
            <span class="protocol-title">WARM-UP PROTOCOL (8-10 Min):</span>
            <span class="protocol-content">${day.warmUpProtocol}</span>
          </div>
        ` : ''}

        <!-- Exercises Table with Fixed Column Distribution (Fits 100% of standard paper with zero clipping) -->
        <table class="workout-table">
          <thead>
            <tr>
              <th class="th-num">Grp</th>
              <th class="th-name">Exercise Name &amp; Technique</th>
              <th class="th-target">Target Sets × Reps</th>
              <th class="th-rest">Rest</th>
              <th class="th-cue">Progression Standard &amp; Cues</th>
            </tr>
          </thead>
          <tbody>
            ${exerciseRows}
          </tbody>
        </table>

        <!-- Coaching Notes & Cool-Down Footer -->
        <div class="sheet-footer">
          ${day.coachingNotes ? `
            <div class="footer-box coaching-box">
              <strong>COACHING DIRECTIVE:</strong> ${day.coachingNotes}
            </div>
          ` : ''}
          ${day.coolDownProtocol ? `
            <div class="footer-box cooldown-box">
              <strong>COOL-DOWN &amp; MOBILITY:</strong> ${day.coolDownProtocol}
            </div>
          ` : ''}
          ${sessionLog?.sessionNotes ? `
            <div class="footer-box notes-box">
              <strong>SESSION LOG NOTES / RPE:</strong> ${sessionLog.sessionNotes} (RPE: ${sessionLog.rpe || 7}/10 | Duration: ${sessionLog.durationMinutes || day.timeBudgetMinutes}m)
            </div>
          ` : ''}
        </div>

        <div class="sheet-bottom-bar">
          <span>Forge · Built under pressure · Driven by science</span>
          <span>Double Progression System · 2 RIR Standard</span>
          <span>Sheet ${dayIndex + 1} of ${daysToPrint.length}</span>
        </div>
      </section>
    `;
  }).join('');

  const topDownloadBar = withDownloadBar ? `
    <div class="download-bar no-print">
      <div class="bar-left">
        <strong>Forge</strong> — ${program.name} Printable Workout Card
      </div>
      <div class="bar-right">
        <button onclick="window.print()" class="print-action-btn">
          🖨️ Print / Save as PDF
        </button>
      </div>
    </div>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forge - ${program.name} Workout Card</title>
  <style>
    @page {
      size: letter portrait;
      margin: 8mm 10mm 8mm 10mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 11px;
      line-height: 1.35;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      width: 100%;
    }

    .page-break {
      page-break-after: always;
      break-after: page;
    }

    .workout-sheet {
      padding: 6px 0;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Standalone Download Bar (Hidden during actual print) */
    .download-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 18px;
      background: #0f172a;
      color: #ffffff;
      border-bottom: 2px solid #059669;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      margin-bottom: 16px;
    }

    .print-action-btn {
      background: #059669;
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s;
    }
    .print-action-btn:hover {
      background: #047857;
    }

    /* Header */
    .sheet-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 6px;
      margin-bottom: 6px;
    }

    .brand-row {
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #047857;
      margin-bottom: 2px;
    }

    .brand-sep {
      color: #94a3b8;
      margin: 0 4px;
    }

    .brand-program {
      color: #475569;
      font-weight: 700;
    }

    .sheet-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 6px;
      margin-bottom: 6px;
      gap: 12px;
    }

    .header-left {
      flex: 1;
      min-width: 0;
    }

    .sheet-title {
      font-size: 19px;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.25;
      letter-spacing: -0.01em;
      margin-bottom: 4px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      white-space: normal;
    }

    .sheet-meta {
      font-size: 10px;
      color: #334155;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      line-height: 1.4;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }

    .sheet-meta .sep {
      color: #cbd5e1;
    }

    .header-right {
      display: flex;
      gap: 10px;
      text-align: right;
      flex-shrink: 0;
    }

    .athlete-badge, .date-badge {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 3px 7px;
      min-width: 85px;
    }

    .athlete-label {
      font-size: 8px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .athlete-val {
      font-size: 10.5px;
      font-weight: 800;
      color: #0f172a;
    }

    /* Protocol Boxes - clean wrapping and clear readability */
    .protocol-box {
      background: #f1f5f9;
      border-left: 3px solid #0f172a;
      padding: 6px 10px;
      font-size: 9.5px;
      line-height: 1.4;
      margin-bottom: 6px;
      border-radius: 0 4px 4px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      white-space: normal;
    }

    .protocol-title {
      font-weight: 800;
      color: #0f172a;
      margin-right: 6px;
    }

    .protocol-content {
      color: #334155;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }

    /* Table with Fixed Column Distribution & Guaranteed Text Wrapping (Zero Clipped Letters) */
    .workout-table {
      width: 100% !important;
      table-layout: fixed;
      border-collapse: collapse;
      margin-bottom: 6px;
    }

    .workout-table th {
      background: #0f172a !important;
      color: #ffffff !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 6px 5px;
      text-align: left;
      border: 1px solid #0f172a;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      box-sizing: border-box;
    }

    .workout-table th.th-set {
      text-align: center;
      padding: 6px 2px;
    }

    .workout-table td {
      border: 1px solid #cbd5e1;
      padding: 5px 6px;
      vertical-align: top;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      white-space: normal;
      box-sizing: border-box;
    }

    .col-num, .th-num {
      text-align: center;
      width: 28px;
      padding: 5px 2px !important;
      vertical-align: middle;
    }

    .superset-badge {
      display: inline-block;
      background: #0f172a !important;
      color: #ffffff !important;
      font-weight: 800;
      font-size: 8.5px;
      border-radius: 3px;
      padding: 2px 4px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .superset-none {
      font-weight: 700;
      color: #64748b;
      font-size: 9.5px;
    }

    .col-num, .th-num {
      width: 6%;
      text-align: center;
      padding: 6px 2px !important;
      vertical-align: middle;
    }

    .col-name, .th-name {
      width: 44%;
    }

    .ex-title {
      font-weight: 800;
      color: #0f172a;
      font-size: 11px;
      line-height: 1.35;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      white-space: normal;
    }

    .ex-note {
      font-size: 9px;
      color: #64748b;
      margin-top: 3px;
      line-height: 1.3;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      white-space: normal;
    }

    .col-target, .th-target {
      font-weight: 800;
      color: #047857;
      width: 18%;
      font-size: 10px;
      line-height: 1.35;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      white-space: normal;
    }

    .col-rest, .th-rest {
      color: #334155;
      font-size: 9.5px;
      width: 10%;
      text-align: center;
      line-height: 1.35;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      white-space: normal;
    }

    .col-cue, .th-cue {
      font-size: 9.5px;
      color: #475569;
      width: 22%;
      line-height: 1.35;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      white-space: normal;
    }

    .set-cell.logged {
      background: #f8fafc;
    }

    .set-val {
      font-size: 9.5px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }

    .set-sub {
      font-size: 7.5px;
      color: #64748b;
      line-height: 1.15;
      white-space: normal;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    .set-cell.blank {
      background: #ffffff;
    }

    .blank-box {
      border: 1px dashed #94a3b8;
      border-radius: 3px;
      padding: 4px 1px 2px 1px;
      min-height: 25px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      box-sizing: border-box;
    }

    .blank-line {
      border-bottom: 1px solid #94a3b8;
      margin: 0 3px 2px 3px;
    }

    .blank-sub {
      font-size: 7px;
      color: #94a3b8;
      text-transform: uppercase;
      line-height: 1;
    }

    .set-cell.unused {
      color: #cbd5e1;
      font-size: 9px;
      background: #fafafa;
    }

    /* Footer - Full Width with Complete Text Wrapping */
    .sheet-footer {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-bottom: 6px;
    }

    .footer-box {
      padding: 4.5px 8px;
      border-radius: 3px;
      font-size: 9px;
      line-height: 1.35;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: normal;
      white-space: normal;
    }

    .coaching-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      color: #334155;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }

    .cooldown-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #166534;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }

    .notes-box {
      background: #fefce8;
      border: 1px solid #fef08a;
      color: #854d0e;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }

    .sheet-bottom-bar {
      display: flex;
      justify-content: space-between;
      font-size: 8px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      padding-top: 3px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @media screen {
      body {
        background: #f1f5f9;
        padding: 16px;
      }
      .workout-sheet {
        background: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        margin-bottom: 20px;
      }
    }

    @media print {
      .no-print, .download-bar {
        display: none !important;
      }
      body {
        background: #ffffff !important;
        padding: 0 !important;
      }
      .workout-sheet {
        box-shadow: none !important;
        padding: 0 !important;
      }
    }
  </style>
</head>
<body>
  ${topDownloadBar}
  ${renderedDays}
</body>
</html>`;
}

/**
 * Triggers clean, ink-friendly native printing.
 * Primary: Injects printable markup into #print-mount-root (native DOM).
 * Fallback: Detects iframe sandbox or printing failure and triggers PDF download.
 */
export function triggerPrintWorkout(options: PrintWorkoutOptions): { success: boolean; fallbackTriggered?: boolean } {
  const htmlContent = buildPrintableHTML(options, false);

  // Check if we are inside a sandboxed iframe where window.print() is blocked by browser security
  const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top;

  const printMount = document.getElementById('print-mount-root');
  if (printMount) {
    // Extract inner content from HTML document to mount inside root
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const innerContent = bodyMatch ? bodyMatch[1] : htmlContent;
    
    // Extract stylesheet
    const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*)<\/style>/i);
    const styles = styleMatch ? `<style>${styleMatch[1]}</style>` : '';

    printMount.innerHTML = `${styles}<div class="apex-printable-wrapper">${innerContent}</div>`;

    let fallbackFired = false;

    // Wait a tick for styles and DOM to settle
    requestAnimationFrame(() => {
      setTimeout(() => {
        let isCleaned = false;
        const cleanup = () => {
          if (isCleaned) return;
          isCleaned = true;
          printMount.innerHTML = '';
          window.removeEventListener('afterprint', cleanup);
        };

        window.addEventListener('afterprint', cleanup);
        setTimeout(cleanup, 45000);

        try {
          window.print();
        } catch (err) {
          console.warn('window.print failed or was blocked by sandbox', err);
          fallbackFired = true;
          cleanup();
          fallbackIframePrint(htmlContent);
        }
      }, 80);
    });

    return { success: true, fallbackTriggered: isInsideIframe || fallbackFired };
  }

  // 2. Secondary Strategy: If #print-mount-root is absent
  fallbackIframePrint(htmlContent);
  return { success: true, fallbackTriggered: isInsideIframe };
}

/**
 * Fallback iframe printing with real dimensions to prevent blank page bugs
 */
function fallbackIframePrint(htmlContent: string): void {
  const iframe = document.createElement('iframe');
  iframe.id = 'apex-print-frame';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.zIndex = '-9999';
  iframe.style.opacity = '0.01'; // Non-zero geometry ensures Chrome computes layout
  iframe.style.border = '0';
  iframe.style.pointerEvents = 'none';

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (doc) {
    doc.open();
    doc.write(htmlContent);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.warn('Iframe print error', err);
        window.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 15000);
      }
    }, 200);
  } else {
    window.print();
  }
}

/**
 * Opens the high-fidelity printable workout card in a clean standalone browser tab.
 */
export function openPrintableInNewTab(options: PrintWorkoutOptions): void {
  const htmlContent = buildPrintableHTML(options, true);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const blobUrl = URL.createObjectURL(blob);
  const newWin = window.open(blobUrl, '_blank');
  if (!newWin) {
    // If popup was blocked, fallback to downloading the file
    downloadWorkoutHTMLFile(options);
  }
}

/**
 * Downloads a standalone, responsive HTML workout card
 */
export function downloadWorkoutHTMLFile(options: PrintWorkoutOptions): void {
  const html = buildPrintableHTML(options, true);
  const scopeStr = options.scope === 'day' 
    ? `Day${options.activeDayNumber}` 
    : options.scope === 'phase' 
      ? `Phase${options.activePhaseIndex + 1}` 
      : 'FullProgram';
  const filename = `Forge-${options.program.id}-${scopeStr}-WorkoutCard.html`;
  downloadBlob(html, filename, 'text/html');
}

/**
 * Downloads a clean CSV formatted for spreadsheets
 */
export function downloadWorkoutScopeCSV(options: PrintWorkoutOptions): void {
  const { program, scope, activePhaseIndex, activeDayNumber, activeWeek, sessionLogs, currentSessionLog } = options;
  const currentPhase = (program.phases && program.phases[activePhaseIndex]) || (program.phases && program.phases[0]);
  if (!currentPhase) return;

  const headers = [
    'Sport',
    'Phase',
    'Week',
    'Day',
    'DayName',
    'Exercise',
    'Superset',
    'TargetPrescription',
    'Rest',
    'ProgressionCue',
    'SetNumber',
    'LoggedWeight',
    'LoggedReps',
    'Completed'
  ];

  const rows: string[][] = [];

  const processDay = (day: WorkoutDay, phaseTitle: string, weekNum: number, pIdx: number) => {
    const sessionKey = `${program.id}_p${pIdx}_d${day.dayNumber}_w${weekNum}`;
    const log = (pIdx === activePhaseIndex && day.dayNumber === activeDayNumber) 
      ? (currentSessionLog || sessionLogs[sessionKey]) 
      : sessionLogs[sessionKey];

    (day.exercises || []).forEach((ex) => {
      const swapped = log?.swappedExercises?.[ex.id];
      const exName = swapped?.name || ex.name || 'Exercise';
      const targetMatch = (ex.targetSetsReps || '').match(/^(\d+)\s*x/i);
      const targetCount = targetMatch ? parseInt(targetMatch[1], 10) : 3;

      for (let s = 0; s < targetCount; s++) {
        const entry = log?.exerciseLogs?.[ex.id]?.[s];
        rows.push([
          `"${program.name.replace(/"/g, '""')}"`,
          `"${phaseTitle.replace(/"/g, '""')}"`,
          String(weekNum),
          String(day.dayNumber),
          `"${day.name.replace(/"/g, '""')}"`,
          `"${exName.replace(/"/g, '""')}"`,
          `"${ex.supersetGroup || ''}"`,
          `"${(ex.targetSetsReps || '').replace(/"/g, '""')}"`,
          `"${(ex.rest || '').replace(/"/g, '""')}"`,
          `"${(ex.progressionCue || '').replace(/"/g, '""')}"`,
          String(s + 1),
          `"${(entry?.load || '').replace(/"/g, '""')}"`,
          `"${(entry?.reps || '').replace(/"/g, '""')}"`,
          entry?.completed ? 'TRUE' : 'FALSE'
        ]);
      }
    });
  };

  if (scope === 'day') {
    const day = (currentPhase.days || []).find(d => d.dayNumber === activeDayNumber) || currentPhase.days?.[0];
    if (day) processDay(day, currentPhase.title, activeWeek, activePhaseIndex);
  } else if (scope === 'phase') {
    (currentPhase.days || []).forEach(d => processDay(d, currentPhase.title, activeWeek, activePhaseIndex));
  } else {
    (program.phases || []).forEach((p, pIdx) => {
      (p.days || []).forEach(d => processDay(d, p.title, p.weekNumbers?.[0] || 1, pIdx));
    });
  }

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const scopeStr = scope === 'day' 
    ? `Day${activeDayNumber}` 
    : scope === 'phase' 
      ? `Phase${activePhaseIndex + 1}` 
      : 'FullProgram';
  const filename = `Forge-${program.id}-${scopeStr}-WorkoutData.csv`;
  downloadBlob(csvContent, filename, 'text/csv');
}
