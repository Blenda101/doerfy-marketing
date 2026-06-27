import { createClient } from '@supabase/supabase-js'
import { writeFileSync, mkdirSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const OUT_DIR = join(__dirname, '../public/images/app-logos')
mkdirSync(OUT_DIR, { recursive: true })

const { data: apps, error } = await supabase
  .from('apps')
  .select('name, logo')
  .order('name')

if (error) {
  console.error('Failed to fetch apps:', error.message)
  process.exit(1)
}

console.log(`Downloading logos for ${apps.length} apps...\n`)

let ok = 0, fail = 0

for (const app of apps) {
  if (!app.logo) {
    console.log(`  SKIP  ${app.name} — no logo URL`)
    fail++
    continue
  }

  try {
    const res = await fetch(app.logo)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const contentType = res.headers.get('content-type') || ''
    const extFromUrl = extname(new URL(app.logo).pathname).split('?')[0]
    const extFromType = contentType.includes('svg') ? '.svg'
      : contentType.includes('png') ? '.png'
      : contentType.includes('webp') ? '.webp'
      : contentType.includes('gif') ? '.gif'
      : '.jpg'
    const ext = extFromUrl || extFromType
    const slug = app.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const filename = slug + ext
    const buffer = Buffer.from(await res.arrayBuffer())

    writeFileSync(join(OUT_DIR, filename), buffer)
    console.log(`  OK    ${app.name} → ${filename}`)
    ok++
  } catch (err) {
    console.log(`  FAIL  ${app.name} — ${err.message}`)
    fail++
  }
}

console.log(`\nDone. ${ok} downloaded, ${fail} skipped/failed.`)
console.log(`Saved to: public/images/app-logos/`)
