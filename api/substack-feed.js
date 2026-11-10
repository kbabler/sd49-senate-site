const FEED_URL = `https://www.toptal.com/developers/feed2json/convert?url=${encodeURIComponent('https://krisbabler.substack.com/feed')}`;

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const upstreamResponse = await fetch(FEED_URL, { signal: AbortSignal.timeout(10000) });
    if (!upstreamResponse.ok) {
      throw new Error(`Substack feed service failed with status ${upstreamResponse.status}`);
    }

    const feed = await upstreamResponse.json();
    if (!Array.isArray(feed.items)) {
      throw new Error('Substack feed service returned an invalid response');
    }

    const items = feed.items.map((item) => ({
      title: item.title,
      pubDate: item.date_published,
      link: item.url,
      guid: item.guid,
      description: item.summary || item.content_text || item.content_html || '',
    }));

    response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=300');
    return response.status(200).json({ status: 'ok', items });
  } catch (error) {
    console.error('Failed to fetch Substack feed:', error);
    response.setHeader('Cache-Control', 'no-store');
    return response.status(502).json({
      status: 'error',
      message: 'Substack feed is temporarily unavailable',
    });
  }
}
