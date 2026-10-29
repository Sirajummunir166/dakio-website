// Records Nova's hello on dakio.io, one clip per page kind and language
// (components/voice/greetings.json → public/nova-guide/welcome-[<page>-]<lang>.mp3),
// played free before any live call. Voice: Gemini "Leda", Nova's voice in the films.
// Uses dakio-api's AI Gateway key (read from dakio-api/.env, never printed) and the
// ffmpeg from dakio-commercial. Run from the website repo:
//   node scripts/make-welcome-voice.mjs public/nova-guide            (every page)
//   node scripts/make-welcome-voice.mjs public/nova-guide pricing    (some pages)
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
const API = '/Users/hasan/Dakio Project/Dakio Apps/Dakio Repos/dakio-api'
const COM = '/Users/hasan/Dakio Project/Dakio Apps/Dakio Repos/dakio-commercial'
const ffmpeg = (await import(pathToFileURL(path.join(COM, 'node_modules/ffmpeg-static/index.js')).href)).default
const keyLine = fs.readFileSync(path.join(API, '.env'), 'utf8').split('\n').find((l) => l.startsWith('AI_GATEWAY_API_KEY='))
process.env.AI_GATEWAY_API_KEY = keyLine.slice('AI_GATEWAY_API_KEY='.length).trim().replace(/^["']|["']$/g, '')
const { generateSpeech } = await import(pathToFileURL(path.join(API, 'node_modules/ai/dist/index.js')).href)
const { gateway } = await import(pathToFileURL(path.join(API, 'node_modules/@ai-sdk/gateway/dist/index.js')).href)
const [OUT, ...only] = process.argv.slice(2)
const GREET = JSON.parse(fs.readFileSync(new URL('../components/voice/greetings.json', import.meta.url), 'utf8'))
const HOW = {
  en: "Speak as Nova, a warm, calm, confident young woman from Dhaka welcoming a visitor to a website. Friendly and natural, a small smile in the voice, never salesy. The last sentence is in natural Bangladeshi Bangla.",
  bn: "Speak in natural Bangladeshi Bangla as Nova, a warm, calm, confident young woman from Dhaka welcoming a visitor to a website. Friendly and natural, a small smile in the voice, never salesy. The last sentence is in English.",
}
const LINES = {}
for (const [page, langs] of Object.entries(GREET.pages)) {
  if (only.length && !only.includes(page)) continue
  for (const lang of ['en', 'bn']) LINES[`${page === 'home' ? '' : `${page}-`}${lang}`] = { text: `${langs[lang].say} ${GREET.ask[lang]}`, instructions: HOW[lang] }
}
for (const [k, v] of Object.entries(LINES)) {
  const res = await generateSpeech({ model: gateway.speechModel('google/gemini-3.8-flash-tts'), text: v.text, voice: 'Leda', instructions: v.instructions, outputFormat: 'wav' })
  const buf = Buffer.from(res.audio?.uint8Array ?? [])
  if (!buf.length) throw new Error('no audio ' + k)
  const raw = `${OUT}/raw-${k}.${/wav/.test(res.audio?.mediaType ?? '') ? 'wav' : 'mp3'}`
  fs.writeFileSync(raw, buf)
  const dst = `${OUT}/welcome-${k}.mp3`
  const r = spawnSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-i', raw, '-af', 'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.2,areverse,atempo=1.05,loudnorm=I=-18:TP=-1.5', '-ac', '1', '-ar', '44100', '-b:a', '64k', dst])
  fs.rmSync(raw)
  if (r.status) throw new Error(r.stderr)
  const d = spawnSync(ffmpeg, ['-hide_banner', '-i', dst, '-f', 'null', '-'], { encoding: 'utf8' }).stderr.match(/time=(\S+)/g)?.pop()
  console.log(k, dst, fs.statSync(dst).size, 'bytes', d)
}
