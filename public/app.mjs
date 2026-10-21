import { reviewInvoice, advanceJob, createTimer } from './domain.mjs';
const $ = id => document.getElementById(id);
const money = cents => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
function element(tag, text, className) {
  const node = document.createElement(tag); node.textContent = text;
  if (className) node.className = className;
  return node;
}
try {
  const response = await fetch('/demo.json');
  if (!response.ok) throw new Error('Demo-Daten nicht verfuegbar.');
  const demo = await response.json();
  if (demo.synthetic !== true) throw new Error('Nur synthetische Demo-Daten erlaubt.');
  $('invoice-count').textContent = demo.invoices.length;
  $('review-count').textContent = demo.invoices.filter(x => reviewInvoice(x).status === 'review').length;
  for (const invoice of demo.invoices) {
    const result = reviewInvoice(invoice);
    const row = element('article', '', 'invoice');
    const detail = element('div', '');
    detail.append(element('h3', invoice.supplier), element('p', invoice.id), element('p', result.reason));
    row.append(detail, element('span', money(invoice.gross), 'amount'), element('span', result.status === 'review' ? 'Manuell pruefen' : 'Demo plausibel', `status ${result.status}`));
    $('invoices').append(row);
  }
  const labels = { planned: 'Geplant', active: 'In Arbeit', done: 'Erledigt' };
  function renderJobs() {
    $('jobs').replaceChildren();
    $('job-count').textContent = demo.jobs.filter(x => x.status !== 'done').length;
    for (const job of demo.jobs) {
      const row = element('article', '', 'job'); const detail = element('div', '');
      detail.append(element('h3', job.title), element('p', `${job.id} · ${job.customer}`));
      const button = element('button', labels[job.status], 'secondary');
      button.setAttribute('aria-label', `${job.title}: ${labels[job.status]}, Status weiterschalten`);
      button.addEventListener('click', () => { job.status = advanceJob(job.status); renderJobs(); });
      row.append(detail, button); $('jobs').append(row);
    }
  }
  renderJobs();
  for (const job of demo.jobs) {
    const option = element('option', job.title); option.value = job.id; $('timer-job').append(option);
  }
  const timer = createTimer();
  const update = () => { $('minutes').textContent = timer.minutes(); };
  function running(value) { $('start').disabled = value; $('stop').disabled = !value; $('timer-job').disabled = value; }
  $('start').addEventListener('click', () => { timer.start(); running(true); $('timer-state').textContent = 'Laeuft fuer ' + $('timer-job').value; update(); });
  $('stop').addEventListener('click', () => { timer.stop(); running(false); $('timer-state').textContent = 'Gestoppt. Fortsetzen oder zuruecksetzen.'; update(); });
  $('reset').addEventListener('click', () => { timer.reset(); running(false); $('timer-state').textContent = 'Bereit zum Start'; update(); });
  // A new job starts a new demonstration total; no time is silently reassigned.
  $('timer-job').addEventListener('change', () => { timer.reset(); $('timer-state').textContent = 'Bereit zum Start'; update(); });
  setInterval(update, 1000);
} catch (error) { $('error').textContent = error.message; }
