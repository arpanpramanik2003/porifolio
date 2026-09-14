export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'GPTBot',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'CCBot'
        ],
        allow: '/',
      }
    ],
    sitemap: 'https://arpanpramanik.tech/sitemap.xml',
    host: 'https://arpanpramanik.tech',
  }
}
