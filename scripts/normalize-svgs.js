import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIR = join(__dirname, '../public/images/app-logos')

const files = readdirSync(DIR).filter(f => extname(f) === '.svg')

if (files.length === 0) {
  console.log('No SVG files found.')
  process.exit(0)
}

console.log(`Normalizing ${files.length} SVG files...\n`)

let changed = 0

for (const file of files) {
  const filepath = join(DIR, file)
  const original = readFileSync(filepath, 'utf8')
  const normalized = original
    .replace(/(<svg[^>]*)\s+width="[^"]*"/i, '$1')
    .replace(/(<svg[^>]*)\s+height="[^"]*"/i, '$1')

  if (normalized !== original) {
    writeFileSync(filepath, normalized)
    console.log(`  FIXED  ${file}`)
    changed++
  } else {
    console.log(`  OK     ${file}`)
  }
}

console.log(`\nDone. ${changed} files updated, ${files.length - changed} unchanged.`)
