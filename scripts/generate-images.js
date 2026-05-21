/**
 * Doerfy — AI Image Generation Script
 * Uses fal.ai (Flux) to generate editorial lifestyle images.
 *
 * Usage:
 *   FAL_API_KEY=your_full_key node scripts/generate-images.js
 *
 * Saves images to: public/images/
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

const FAL_KEY = process.env.FAL_API_KEY
if (!FAL_KEY) { console.error('FAL_API_KEY not set'); process.exit(1) }

const OUTPUT_DIR = path.join(__dirname, '../public/images')
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

const IMAGES = [
  {
    id: 'hero',
    filename: 'hero-editorial.jpg',
    prompt: 'Editorial lifestyle photograph, person at a clean minimal desk in early morning warm light, single open notebook with handwritten notes, ceramic coffee cup, soft cream and linen surfaces, warm golden hour light from a window, film grain texture, intentional composition, shot from slightly above at 45 degrees, no laptop screens, no clutter, soft bokeh background, warm tones: cream ivory stone beige, photorealistic, high-end magazine quality, 4:5 portrait orientation',
    image_size: 'portrait_4_3',
  },
  {
    id: 'manifesto',
    filename: 'manifesto-type.jpg',
    prompt: 'Close-up editorial photograph of a single line of elegant italic typography printed on aged cream paper, dramatic raking light from the upper left casting deep shadows across half the frame, high contrast chiaroscuro, warm amber and cream tones, film grain, macro lens, the text is slightly soft focus at edges, feels like a page from an important published book, no specific readable text visible, photorealistic, editorial magazine quality',
    image_size: 'landscape_4_3',
  },
  {
    id: 'feature-design',
    filename: 'feature-design.jpg',
    prompt: 'Editorial close-up of a hand writing in an open journal on a cream linen surface, warm natural morning light, single bold italic brushstroke word partially visible on the page, minimalist composition, warm cream and stone tones, slight motion blur on the pen hand, no face visible, high-end lifestyle photography, film grain, photorealistic',
    image_size: 'portrait_4_3',
  },
  {
    id: 'doey-ambient',
    filename: 'doey-dark-texture.jpg',
    prompt: 'Abstract dark navy indigo linen fabric texture, close-up macro photography, subtle weave detail, dark moody atmosphere, deep purple-navy tones, minimal, no people, no text, could be used as a dark background texture, photorealistic',
    image_size: 'landscape_4_3',
  },
]

async function falRequest(prompt, imageSize) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      prompt,
      image_size: imageSize,
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
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {})
      reject(err)
    })
  })
}

async function main() {
  console.log(`Generating ${IMAGES.length} images via fal.ai Flux...\n`)

  for (const img of IMAGES) {
    console.log(`[${img.id}] Requesting...`)
    try {
      const result = await falRequest(img.prompt, img.image_size)
      const imageUrl = result?.images?.[0]?.url

      if (!imageUrl) {
        console.error(`[${img.id}] No image URL in response:`, JSON.stringify(result, null, 2))
        continue
      }

      const filepath = path.join(OUTPUT_DIR, img.filename)
      console.log(`[${img.id}] Downloading to public/images/${img.filename}`)
      await downloadImage(imageUrl, filepath)
      console.log(`[${img.id}] Done.\n`)
    } catch (err) {
      console.error(`[${img.id}] Error:`, err.message)
    }
  }

  console.log('All done. Images saved to public/images/')
  console.log('Update src/app/page.tsx to use <Image src="/images/..." /> where placeholders are.')
}

main()
