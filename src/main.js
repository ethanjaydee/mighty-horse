import './style.css'
import horseVideo from './assets/horse.mp4'
import horseNoddingVideo from './assets/horse-nodding.mp4'
import noGif from './assets/tenor.gif'
import horseAudio from './assets/horse.mp3'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="min-h-screen bg-stone-100 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-5xl">
      <header class="mb-10 flex items-center gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-3 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-2xl shadow-inner">🐎</div>
          <div>
            <h1 class="text-2xl font-black tracking-tight text-slate-900">Mighty Horse</h1>
          </div>
        </div>
      </header>

      <section class="grid gap-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.16)] lg:grid-cols-[1.2fr_0.8fr]">
        <div class="p-6 sm:p-8 lg:p-10">
          <h2 class="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-5xl">Ask a question. Let the horse decide.</h2>

          <form id="question-form" class="mt-8 space-y-5">
            <label for="question" class="sr-only">Your question</label>
            <textarea
              id="question"
              name="question"
              rows="4"
              required
              placeholder="Should I take the leap, chase the dream, or trust my instincts?"
              class="w-full resize-none rounded-2xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/40"
            ></textarea>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-xl"
              >
                Ask Mighty Horse
              </button>
              <button
                type="button"
                id="clear-btn"
                class="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-400 hover:text-white"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <aside class="flex items-center border-t border-slate-700/80 bg-slate-900/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div class="w-full rounded-[1.5rem] border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-inner">
            <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Verdict</p>
            <div id="result-pill" class="mt-4 inline-flex rounded-full border border-amber-300/50 bg-amber-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-200">Awaiting fate</div>
            <p id="result-text" class="mt-5 text-lg leading-relaxed text-slate-200">
              The horse is listening. Ask a question and the answer will arrive.
            </p>
            <div id="video-container" class="fixed inset-0 z-50 hidden flex-col items-center justify-center bg-slate-950/80 p-6 text-center backdrop-blur-sm">
              <video id="result-video" class="max-h-[70vh] max-w-full rounded-2xl border border-slate-700 bg-black object-contain shadow-2xl" autoplay loop muted playsinline></video>
              <img id="result-gif" class="hidden max-h-[70vh] max-w-full rounded-2xl border border-slate-700 bg-black object-contain shadow-2xl" alt="The Mighty Horse gives a no verdict" />
              <p id="video-text" class="mt-5 max-w-xl text-xl font-bold text-white sm:text-2xl"></p>
              <button
                type="button"
                id="ask-more-btn"
                class="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-xl"
              >
                Ask more questions
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </main>
`

const form = document.querySelector('#question-form')
const question = document.querySelector('#question')
const resultPill = document.querySelector('#result-pill')
const resultText = document.querySelector('#result-text')
const videoContainer = document.querySelector('#video-container')
const resultVideo = document.querySelector('#result-video')
const resultGif = document.querySelector('#result-gif')
const videoText = document.querySelector('#video-text')
const clearBtn = document.querySelector('#clear-btn')
const askMoreBtn = document.querySelector('#ask-more-btn')
const resultAudio = new Audio(horseAudio)
resultAudio.loop = true

question.addEventListener('input', () => {
  question.setCustomValidity('')
})

const yesResponses = [
  'The stars are aligned. Yes, this is the right move.',
  'A strong wind is at your back. Proceed with confidence.',
  'The universe nudges you forward. Trust the path ahead.',
  'A bold answer is yours: yes, and do it with heart.',
]

const maybeResponses = [
  'The horse tilts its head. There may be something worth exploring here.',
  'A curious maybe. Gather a little more courage and information first.',
  'The path is foggy, but not closed. Give it time.',
]

const noResponses = [
  'Not now. The timing is not quite right yet.',
  'The horse snorts at this idea. Better to wait and watch.',
  'A different path is calling, and it is wiser to turn away.',
  'No — protect your energy and hold steady for now.',
]

const setResult = (verdict, message) => {
  const isYes = verdict === 'yes'
  const isMaybe = verdict === 'maybe'
  const videoSource = isYes ? horseNoddingVideo : isMaybe ? horseVideo : ''
  const videoMessage = isYes
    ? 'The mighty horse agrees with you.'
    : isMaybe
      ? 'The mighty horse thinks it might be worth considering.'
      : 'The mighty horse says no — trust your instincts and choose another path.'

  resultPill.textContent = verdict === 'yes' ? 'Yes' : verdict === 'maybe' ? 'Maybe' : 'No'
  resultPill.className = isYes
    ? 'mt-4 inline-flex rounded-full border border-emerald-400/50 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-emerald-200'
    : isMaybe
      ? 'mt-4 inline-flex rounded-full border border-amber-300/50 bg-amber-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-200'
      : 'mt-4 inline-flex rounded-full border border-rose-400/50 bg-rose-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-rose-200'

  resultText.textContent = message

  resultAudio.pause()
  resultAudio.currentTime = 0
  resultAudio.play().catch(() => {})
  resultVideo.pause()
  if (videoSource) {
    resultVideo.src = videoSource
    resultGif.classList.add('hidden')
    resultVideo.classList.remove('hidden')
    videoText.textContent = videoMessage
    videoContainer.classList.remove('hidden')
    videoContainer.classList.add('flex')
    resultVideo.play().catch(() => {})
  } else if (verdict === 'no') {
    resultVideo.removeAttribute('src')
    resultVideo.load()
    resultVideo.classList.add('hidden')
    resultGif.src = noGif
    resultGif.classList.remove('hidden')
    videoText.textContent = videoMessage
    videoContainer.classList.remove('hidden')
    videoContainer.classList.add('flex')
  } else {
    resultVideo.removeAttribute('src')
    resultVideo.load()
    resultVideo.classList.remove('hidden')
    resultGif.classList.add('hidden')
    videoContainer.classList.add('hidden')
    videoContainer.classList.remove('flex')
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const value = question.value.trim()
  if (!value) {
    question.setCustomValidity('Please enter a question before asking the Mighty Horse.')
    question.reportValidity()
    return
  }

  question.setCustomValidity('')
  const verdictRoll = Math.random()
  const verdict = verdictRoll < 1 / 3 ? 'yes' : verdictRoll < 2 / 3 ? 'maybe' : 'no'
  const responses = verdict === 'yes' ? yesResponses : verdict === 'maybe' ? maybeResponses : noResponses
  const chosen = responses[Math.floor(Math.random() * responses.length)]

  setResult(verdict, `${chosen} You asked: “${value}”`)
})

askMoreBtn.addEventListener('click', () => {
  question.value = ''
  resultPill.textContent = 'Awaiting fate'
  resultPill.className = 'mt-4 inline-flex rounded-full border border-amber-300/50 bg-amber-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-200'
  resultText.textContent = 'The horse is listening. Ask a question and the answer will arrive.'
  resultAudio.pause()
  resultAudio.currentTime = 0
  resultVideo.pause()
  resultVideo.removeAttribute('src')
  resultVideo.load()
  resultVideo.classList.remove('hidden')
  resultGif.removeAttribute('src')
  resultGif.classList.add('hidden')
  videoText.textContent = ''
  videoContainer.classList.add('hidden')
  videoContainer.classList.remove('flex')
  question.focus()
})

clearBtn.addEventListener('click', () => {
  question.value = ''
  question.focus()
  resultPill.textContent = 'Awaiting fate'
  resultPill.className = 'mt-4 inline-flex rounded-full border border-amber-300/50 bg-amber-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-200'
  resultText.textContent = 'The horse is listening. Ask a question and the answer will arrive.'
  resultAudio.pause()
  resultAudio.currentTime = 0
  resultVideo.pause()
  resultVideo.removeAttribute('src')
  resultVideo.load()
  resultVideo.classList.remove('hidden')
  resultGif.removeAttribute('src')
  resultGif.classList.add('hidden')
  videoText.textContent = ''
  videoContainer.classList.add('hidden')
  videoContainer.classList.remove('flex')
})
