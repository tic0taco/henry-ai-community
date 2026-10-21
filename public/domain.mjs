// Community demo rules. No legal invoice validation or payment authorization.
export function reviewInvoice(invoice) {
  if (!invoice || ![invoice.net, invoice.tax, invoice.gross].every(Number.isSafeInteger)
      || invoice.net <= 0 || invoice.tax < 0 || invoice.gross <= 0
      || !Number.isSafeInteger(invoice.net + invoice.tax)) {
    return { status: 'review', reason: 'Betraege fehlen oder sind ungueltig.' };
  }
  if (invoice.net + invoice.tax !== invoice.gross) {
    return { status: 'review', reason: 'Netto plus Steuer stimmt nicht mit Brutto ueberein.' };
  }
  if (invoice.evidence !== true) {
    return { status: 'review', reason: 'Ein synthetischer Pruefnachweis fehlt.' };
  }
  return { status: 'consistent', reason: 'Demo-Summen plausibel; keine Zahlungsfreigabe.' };
}

export function advanceJob(status) {
  const next = { planned: 'active', active: 'done', done: 'planned' };
  if (!Object.hasOwn(next, status)) throw new Error('Ungueltiger Auftragsstatus');
  return next[status];
}

export function elapsedMinutes(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) throw new Error('Ungueltiger Zeitraum');
  return Math.floor((end - start) / 60000);
}

export function createTimer(clock = () => performance.now()) {
  let started = null;
  let total = 0;
  return {
    start() { if (started !== null) throw new Error('Timer laeuft bereits'); started = clock(); },
    stop() {
      if (started === null) throw new Error('Timer ist nicht gestartet');
      const end = clock();
      if (end < started) throw new Error('Ungueltige Uhr');
      total += end - started; started = null;
      return Math.floor(total / 60000);
    },
    minutes() { return Math.floor((total + (started === null ? 0 : Math.max(0, clock() - started))) / 60000); },
    reset() { started = null; total = 0; }
  };
}
