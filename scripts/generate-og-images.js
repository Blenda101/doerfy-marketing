/**
 * Doerfy — OG Image Generation Script
 * Generates 4 Open Graph image options (1200x630) via fal.ai Flux.
 *
 * Usage:
 *   FAL_API_KEY=your_key node scripts/generate-og-images.js
 *
 * Saves to: public/images/og/
 * Pick your favourite and set it as og-image.png in layout.tsx
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const FAL_KEY = process.env.FAL_API_KEY
if (!FAL_KEY) { console.error('FAL_API_KEY not set'); process.exit(1) }

const OUTPUT_DIR = path.join(__dirname, '../public/images/og')
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

const OG_IMAGES = [
  {
    id: 'option-a-typographic',
    filename: 'og-a-typographic.jpg',
    prompt: 'Minimalist typographic poster, deep dark navy indigo background (#1A1A2E), large elegant italic serif typeface reading "Design. Visualize. Do." in soft cream white, subtle purple violet glow behind the text, small abstract geometric logomark in upper left corner, clean editorial layout, no clutter, luxury brand aesthetic, high contrast, cinematic lighting, wide landscape format, photorealistic render, 4K quality',
  },
  {
    id: 'option-b-editorial',
    filename: 'og-b-editorial.jpg',
    prompt: 'Editorial split-panel wide landscape composition, left half: warm cream parchment surface with elegant italic serif text "Author your life." in dark ink, right half: deep dark navy indigo panel with a glowing soft purple pyramid diagram showing hierarchy levels, dividing line between panels is crisp, warm amber lighting on left, cool purple ambient on right, luxury magazine quality, minimalist, photorealistic render',
  },
  {
    id: 'option-c-cinematic',
    filename: 'og-c-cinematic.jpg',
    prompt: 'Cinematic wide landscape photograph of a person sitting at a minimal desk in a dark moody room, soft purple violet ambient light from a monitor, open journal visible, intentional calm atmosphere, heavy deep purple and navy color grade overlay, elegant white italic serif text "Design the life you truly desire." overlaid in lower third, film grain texture, editorial lifestyle photography, high-end magazine quality, photorealistic',
  },
  {
    id: 'option-d-abstract',
    filename: 'og-d-abstract.jpg',
    prompt: 'Abstract wide landscape digital art, deep dark navy background, glowing purple violet geometric shapes forming an upward-pointing pyramid or triangle, soft particle light effects, subtle grid lines, premium tech-meets-philosophy aesthetic, luxury brand feel, dark mode, vibrant purple (#7C5CFF) accent glow, cream white text area reserved in lower left, cinematic atmosphere, 4K quality render',
  },
]

async function falRequest(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      prompt,
      image_size: { width: 1200, height: 630 },
      num_inference_steps: 28,
      guidance_scale: 3.5,
      num_images: 1,
      enable_safety_checker: true,
    })

    const options = {
      hostname: 'fal.run',
      path: '/fal-ai/flux/dev',
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch (e) { reject(new Error(`Parse error: ${data}`)) }
      })
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (res2) => {
          res2.pipe(file)
          file.on('finish', () => { file.close(); resolve() })
        }).on('error', reject)
        return
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {})
      reject(err)
    })
  })
}

async function main() {
  console.log(`Generating ${OG_IMAGES.length} OG image options via fal.ai Flux...\n`)

  for (const img of OG_IMAGES) {
    console.log(`[${img.id}] Requesting...`)
    try {
      const result = await falRequest(img.prompt)
      const imageUrl = result?.images?.[0]?.url

      if (!imageUrl) {
        console.error(`[${img.id}] No image URL. Response:`, JSON.stringify(result, null, 2))
        continue
      }

      const filepath = path.join(OUTPUT_DIR, img.filename)
      console.log(`[${img.id}] Downloading → public/images/og/${img.filename}`)
      await downloadImage(imageUrl, filepath)
      console.log(`[${img.id}] ✓ Done\n`)
    } catch (err) {
      console.error(`[${img.id}] Error:`, err.message)
    }
  }

  console.log('All done. Check public/images/og/ for your options.')
  console.log('Copy your favourite to public/images/og-image.png and update layout.tsx.')
}

main()
