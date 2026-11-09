import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PrintWorkoutOptions } from './printWorkout';
import { WorkoutDay } from '../types/sport';

/**
 * Generates a clean, vector-sharp, ink-friendly PDF workout card using jsPDF.
 * Runs 100% client-side in JavaScript — zero server roundtrips, zero iframe sandbox issues.
 */
export function generateWorkoutPDF(options: PrintWorkoutOptions): jsPDF {
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

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36; // 0.5 inch margins (36 pt)
  const contentWidth = pageWidth - margin * 2;

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

  interface DayToPrint {
    phaseTitle: string;
    phaseWeeks: string;
    phaseIndex: number;
    weekNumber: number;
    day: WorkoutDay;
    sessionLog?: any;
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

  // Iterate over each workout day to render
  daysToPrint.forEach((item, dayIdx) => {
    if (dayIdx > 0) {
      doc.addPage('letter', 'portrait');
    }

    let yPos = margin;

    const { day, phaseTitle, phaseWeeks, weekNumber, sessionLog } = item;

    // 1. BRAND HEADER
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(4, 120, 87); // Emerald 700
    doc.text('FORGE', margin, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); // Slate 400
    const brandSepX = margin + doc.getTextWidth('FORGE') + 4;
    doc.text('|', brandSepX, yPos);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105); // Slate 600
    doc.text(program.name.toUpperCase(), brandSepX + 8, yPos);

    // Right-aligned Athlete & Date Badges
    const dateText = sessionLog?.date || currentDateStr;
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`ATHLETE: ${athleteName.toUpperCase()}   |   DATE: ${dateText}`, pageWidth - margin, yPos, { align: 'right' });

    yPos += 16;

    // 2. DAY TITLE
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text(day.name, margin, yPos);
    yPos += 14;

    // 3. METADATA ROW
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const metaStr = `Phase: ${phaseTitle} (${phaseWeeks})  •  Week: ${weekNumber}  •  Focus: ${day.focus}  •  Target: ~${day.timeBudgetMinutes}m`;
    doc.text(metaStr, margin, yPos);
    yPos += 8;

    // Dividing rule
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(1.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // 4. WARM-UP PROTOCOL (if present)
    if (day.warmUpProtocol) {
      doc.setFillColor(241, 245, 249); // Slate 100
      doc.rect(margin, yPos, contentWidth, 20, 'F');
      
      doc.setDrawColor(15, 23, 42);
      doc.setLineWidth(2.5);
      doc.line(margin, yPos, margin, yPos + 20);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text('WARM-UP (8-10m):', margin + 6, yPos + 13);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const warmUpLines = doc.splitTextToSize(day.warmUpProtocol, contentWidth - 110);
      doc.text(warmUpLines[0] || '', margin + 95, yPos + 13);
      
      yPos += 26;
    }

    // 5. EXERCISES TABLE (Using autoTable - Clean Workout Prescription without Performed Set Space)
    const tableHeaders = [
      'Grp',
      'Exercise Name & Directive',
      'Target Sets × Reps',
      'Rest',
      'Progression Standard & Cues'
    ];

    const exercises = day.exercises || [];
    const tableBody = exercises.map((ex, exIdx) => {
      const swapped = sessionLog?.swappedExercises?.[ex.id];
      const exName = swapped?.name || ex.name || 'Exercise';
      const swapNotice = swapped ? `\n(Alt: ${swapped.equipment || 'Swapped'})` : '';
      const notes = ex.notes ? `\n• ${ex.notes}` : '';
      const fullExText = `${exName}${swapNotice}${notes}`;
      const grp = ex.supersetGroup || String(exIdx + 1);

      return [
        grp,
        fullExText,
        ex.targetSetsReps || '3 x 8-10',
        ex.rest || '90s',
        ex.progressionCue || 'Double progression: 2 RIR standard'
      ];
    });

    autoTable(doc, {
      startY: yPos,
      head: [tableHeaders],
      body: tableBody,
      theme: 'grid',
      margin: { left: margin, right: margin, bottom: 45 },
      styles: {
        font: 'helvetica',
        fontSize: 8.5,
        cellPadding: 5.5,
        overflow: 'linebreak',
        textColor: [15, 23, 42],
        lineColor: [226, 232, 240],
        lineWidth: 0.5
      },
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
        halign: 'left',
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 32, halign: 'center', fontStyle: 'bold', textColor: [71, 85, 105] }, // Grp
        1: { cellWidth: 220, fontStyle: 'bold' }, // Exercise & Directive
        2: { cellWidth: 85, textColor: [4, 120, 87], fontStyle: 'bold' }, // Target Sets/Reps
        3: { cellWidth: 55, halign: 'center', textColor: [51, 65, 85] }, // Rest
        4: { cellWidth: 148, textColor: [71, 85, 105] } // Progression Standard & Cues
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    // 6. FOOTER NOTES & DIRECTIVES
    const finalY = (doc as any).lastAutoTable?.finalY || yPos + 200;
    let footerY = Math.min(finalY + 10, pageHeight - 50);

    if (day.coachingNotes && footerY < pageHeight - 35) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, footerY, contentWidth, 16, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.rect(margin, footerY, contentWidth, 16, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text('DIRECTIVE:', margin + 6, footerY + 11);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const noteLines = doc.splitTextToSize(day.coachingNotes, contentWidth - 75);
      doc.text(noteLines[0] || '', margin + 65, footerY + 11);

      footerY += 20;
    }

    // 7. BOTTOM SYSTEM BAR
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 24, pageWidth - margin, pageHeight - 24);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text('Forge · Built under pressure · Driven by science  •  Double Progression Standard (2 RIR)', margin, pageHeight - 14);
    doc.text(`Sheet ${dayIdx + 1} of ${daysToPrint.length}`, pageWidth - margin, pageHeight - 14, { align: 'right' });
  });

  return doc;
}

/**
 * Downloads the workout card directly as a pristine .pdf file
 */
export function downloadWorkoutPDFFile(options: PrintWorkoutOptions): void {
  const doc = generateWorkoutPDF(options);
  const scopeStr = options.scope === 'day' 
    ? `Day${options.activeDayNumber}` 
    : options.scope === 'phase' 
      ? `Phase${options.activePhaseIndex + 1}` 
      : 'FullProgram';
  const filename = `Forge-${options.program.id}-${scopeStr}-WorkoutCard.pdf`;
  doc.save(filename);
}

/**
 * Generates and returns a Blob URL for the PDF (can be embedded or viewed in an iframe/tab)
 */
export function getWorkoutPDFBlobUrl(options: PrintWorkoutOptions): string {
  const doc = generateWorkoutPDF(options);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}
