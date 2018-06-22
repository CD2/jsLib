import { get } from "lib/utils/api_http"
import { observable } from 'mobx' 
import { Transcript } from 'utils/store'
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
  
  @observable videoTranscript

  loadTranscript(video, a, b, transcript_id) {
    if (global_transcript) {
      this._clearTranscriptGlobals()
    }

    global_transcript = window.document.getElementById(transcriptComponentIds.transcript)
    global_search = window.document.getElementById(transcriptComponentIds.search)
    global_match = window.document.getElementById(transcriptComponentIds.match)

    this._transcriptSetup(video, transcript_id)
  }

  async _transcriptSetup(video, id) {
    if (this._jwplayer()) {
      await this.fetchTranscript(id)
      this.setupTranscript(video)
      this._setupEventListeners()
    }
  }

  setupTranscript(video){
    if(!this.videoTranscript) return
    window.captions = this.videoTranscript.body
    if (!this.videoTranscript.body) return
    const script = this.videoTranscript.body
    let h = `<p>`
    let s = 0
    for (let i = 0; i < script.length; i++) {
      const part = {
        begin: script[i]['timeStart'],
        end: script[i]['timeEnd'],
        btext: script[i]['text'].substr(3, i - 7),
        text: script[i]['text'],
      }
      h += `<span id='caption${i}'>${part.text}</span>`
      global_captions.push(part)
    }
    global_transcript.innerHTML = `${h}</p>`
  }

  fetchTranscript = async(id) => {
    this.videoTranscript = await Transcript.withAttributes(['body']).find(id)
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
