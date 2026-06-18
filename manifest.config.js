import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: "Block YouTube Shorts, Instagram Reels & addictive social media feed.",
  icons: {
    48: 'public/AntiBrainrotIcon.png',
  },
  permissions: [
    'storage'
  ],
  action: {
    default_icon: {
      48: 'public/AntiBrainrotIcon.png',
    },
    default_popup: 'src/popup/index.html',
  },
  content_scripts: [{
    js: [
      'src/popup/main.jsx',
      'src/utils/content.js'
    ],
    matches: [
      "*://www.youtube.com/*",
      "*://www.instagram.com/*",
      "*://www.facebook.com/*",
      "*://www.tiktok.com/*"
    ],
    run_at: "document_start"
  }],
})