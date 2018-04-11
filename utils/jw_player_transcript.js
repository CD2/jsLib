import { get } from "lib/utils/api_http"

let global_chapters = []
let global_captions = []
let global_caption = -1
let global_query = ``

let global_transcript = null
let global_search = null
let global_match = null

let global_captionUrl = null
let global_chapterUrl = null

export const transcriptComponentIds = {
  transcript: `transcript-container`,
  search: `transcript-search`,
  match: `transcript-match`,
}

export default class TranscriptService {
  constructor() {
    this._jwplayer = window.jwplayer
  }

  loadTranscript(video, chapterListUrl, transcriptUrl) {
    if (global_transcript) {
      this._clearTranscriptGlobals()
    }

    global_transcript = window.document.getElementById(transcriptComponentIds.transcript)
    global_search = window.document.getElementById(transcriptComponentIds.search)
    global_match = window.document.getElementById(transcriptComponentIds.match)

    this._transcriptSetup(video, chapterListUrl, transcriptUrl)
  }

  _transcriptSetup(video, chapterListUrl, transcriptUrl) {
    if (this._jwplayer()) {
      global_captionUrl = transcriptUrl
      global_chapterUrl = chapterListUrl
      this._setupTranscript()
      this._setupEventListeners()
    }
  }

  changeTranscript(video) {
    this._clearTranscriptGlobals()
    this._transcriptSetup(video)
  }

  _clearTranscriptGlobals() {
    global_chapters = []
    global_captions = []
    global_caption = -1
    global_query = ``

    global_captionUrl = null
    global_chapterUrl = null

    while (global_transcript && global_transcript.firstChild) {
      global_transcript.removeChild(global_transcript.firstChild)
    }
    while (global_search && global_search.firstChild) {
      global_search.removeChild(global_search.firstChild)
    }
    while (global_match && global_match.firstChild) {
      global_match.removeChild(global_match.firstChild)
    }
  }

  _setupTranscript() {
    if (!global_chapterUrl) {
      this._setupCaptions()
      return
    }
    if (!global_chapterUrl) return
    get(global_chapterUrl).then(({ data: chapters }) => {
      if (chapters) {
        const t = chapters.split(/\n\r?\n/)
        t.shift()
        for (let i = 0; i < t.length; i++) {
          const c = this.parse(t[i])
          global_chapters.push(c)
        }
      }
      this._setupCaptions()
    })
  }

  parse(d) {
    const a = d.split(`\n`)
    const i = a[1].indexOf(` --> `)
    let t = a[2]
    if (a[3]) {
      t += ` ${a[3]}`
    }
    t = t.
      replace(/&/g, `&amp;`).
      replace(/</g, `&lt;`).
      replace(/>/g, `&gt;`)
    return {
      begin: this.seconds(a[1].substr(0, i)),
      btext: a[1].substr(3, i - 7),
      end: this.seconds(a[1].substr(i + 5)),
      text: t,
    }
  }

  seconds(s) {
    const a = s.split(`:`)
    if (a) {
      let r = Number(a[a.length - 1]) + Number(a[a.length - 2]) * 60
      if (a.length > 2) {
        r += Number(a[a.length - 3]) * 3600
      }
      return r
    }

    return 0
  }

  _setupCaptions() {
    if (!global_captionUrl || !global_transcript) return
    get(global_captionUrl).then(({ data: captions }) => {
      window.captions = captions
      if (!captions) return
      const t = captions.split(/\n\r?\n/)
      t.shift()
      let h = `<p>`
      let s = 0
      for (let i = 0; i < t.length; i++) {
        const c = this.parse(t[i])
        if (s < global_chapters.length && c.begin > global_chapters[s].begin) {
          h += `</p><h4>${global_chapters[s].text}</h4><p>`
          s++
        }
        h += `<span id='caption${i}'>${c.text}</span>`
        global_captions.push(c)
      }
      global_transcript.innerHTML = `${h}</p>`
    })
  }

  _setupEventListeners() {
    // Highlight current caption and chapter
    this._jwplayer().on(`time`, e => {
      const p = e.position
      for (let j = 0; j < global_captions.length; j++) {
        if (global_captions[j].begin < p && global_captions[j].end > p) {
          if (j !== global_caption) {
            const c = window.document.getElementById(`caption${j}`)
            if (global_caption > -1) {
              window.document.getElementById(`caption${global_caption}`).className = ``
            }
            c.className = `current`
            global_transcript.scrollTop = c.offsetTop
            if (global_query === ``) {
              global_transcript.scrollTop = c.offsetTop - global_transcript.offsetTop - 40
            }
            global_caption = j
          }
          break
        }
      }
    })

    // Hook up interactivity
    if (global_transcript) {
      global_transcript.addEventListener(`click`, this.handleTranscriptClick)
    }

    if (global_search) {
      global_search.addEventListener(`focus`, () => {
        window.setTimeout(() => {
          global_search.select()
        }, 100)
      })
    }
  }

  handleTranscriptClick(e) {
    if (e.target.id.indexOf(`caption`) === 0) {
      const i = Number(e.target.id.replace(`caption`, ``))
      window.jwplayer().seek(global_captions[i].begin)
    }
  }
}
