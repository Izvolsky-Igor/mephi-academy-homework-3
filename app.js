//Готовая механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts
  if (filter === 'passed') return attempts.filter((attempt) => attempt.passed === true)
  if (filter === 'failed') return attempts.filter((attempt) => attempt.passed === false)
  return attempts
}

function renderAttempts(attempts, list = document.querySelector('#result-list')) {
  let markup = ''
  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'
    markup += `
      <li class="result-item">
        <span class="result-name">${escapeHtml(attempt.name)}</span>
        <span>${attempt.score} из ${attempt.questionCount} (${attempt.percentage}%) — ${status}</span>
      </li>`
  })
  list.innerHTML = markup
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const filter = document.querySelector('#filter')
  const count = document.querySelector('#result-count')
  const list = document.querySelector('#result-list')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const attempts = selectAttempts(filter.value)
    count.innerHTML = `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
    renderAttempts(attempts, list)
  })
}

startFilter()
