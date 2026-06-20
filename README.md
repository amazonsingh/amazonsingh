# Service Worker Iframe Caching Demo

This demo shows how to use a Service Worker to cache iframe content for offline viewing.

## Features

- Cache iframe sources via Service Worker
- Click to load different games in fullscreen iframe
- Offline caching for cached resources

## How It Works

1. The page registers a Service Worker (`sw.js`)
2. When a game is clicked, the iframe src is set to the game URL
3. The Service Worker intercepts navigation requests and caches the responses
4. On subsequent visits, cached content is served from the Service Worker cache

## Games Currently Included

- Super Mario Bros (via iframe)
- XYZ (placeholder)

## Deployment

This project is configured for deployment on Vercel.

## Service Worker Details

The Service Worker caches:
- Iframe navigation requests (via the fetch handler)
- Uses a cache-first strategy for navigation requests
- Falls back to network for non-navigation requests

## Development

This is a static site - no build step required.

## License

MIT