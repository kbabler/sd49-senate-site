import React, { useEffect, useState } from 'react';

const SUBSTACK_URL = 'https://krisbabler.substack.com';
const API_ENDPOINT = '/api/substack-feed';
const REFRESH_INTERVAL = 5 * 60 * 1000;

const getSafePostUrl = (value) => {
  if (typeof value !== 'string') return null;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
};

const getExcerpt = (description) => {
  if (typeof description !== 'string') return '';

  return new DOMParser()
    .parseFromString(description, 'text/html')
    .body.textContent?.replace(/\s+/g, ' ')
    .trim() || '';
};

const getPublicationTime = (post) => {
  const timestamp = Date.parse(post.pubDate);
  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
};

export default function SubstackFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let requestInProgress = false;

    const loadPosts = async () => {
      if (requestInProgress) return;
      requestInProgress = true;

      try {
        const response = await fetch(API_ENDPOINT, { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Substack feed request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.items)) {
          throw new Error(data.message || 'Substack feed service returned an invalid response');
        }

        const latestPosts = data.items
          .filter((post) => post && typeof post === 'object')
          .map((post) => ({
            ...post,
            pubDate: post.pubDate || post.date_published,
            description: post.description || post.summary || post.content_text || post.content_html,
            safeLink: getSafePostUrl(post.link || post.url),
          }))
          .filter((post) => typeof post.title === 'string' && post.safeLink)
          .sort((first, second) => getPublicationTime(second) - getPublicationTime(first))
          .slice(0, 2);

        setPosts(latestPosts);
        setFeedError(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch Substack feed:', error);
          setFeedError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          requestInProgress = false;
          setLoading(false);
        }
      }
    };

    loadPosts();
    const intervalId = window.setInterval(loadPosts, REFRESH_INTERVAL);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') loadPosts();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section id="newsletter" className="py-16 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-100 rounded-[2rem] shadow-xl p-8 md:p-12">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8 border-b border-slate-200 pb-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black tracking-tight text-brand-navy">
                What is BablerParty?
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mt-3">
                Launched before my independent run for office, BablerParty is a dedicated journal for policy analysis and the occasional musing on sports. Drawing on my Public Affairs background, I look at every issue through a simple formula: fact plus message equals truth.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
              <img
                src="/images/bablerparty.png"
                alt="BablerParty — A Party of One"
                className="w-full max-w-[240px] object-contain"
              />
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-cyan-700 hover:text-cyan-800 transition"
              >
                View All Posts <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {loading && (
            <p className="text-slate-600" role="status">Loading the latest dispatches…</p>
          )}

          {feedError && (
            <p className="text-slate-600">
              Dispatches are temporarily unavailable. Visit{' '}
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-cyan-700 hover:text-cyan-800 underline"
              >
                BablerParty on Substack
              </a>{' '}
              to read the latest.
            </p>
          )}

          {!loading && !feedError && posts.length === 0 && (
            <p className="text-slate-600">No dispatches are available right now.</p>
          )}

          <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post, index) => {
                const timestamp = Date.parse(post.pubDate);
                const formattedDate = Number.isNaN(timestamp)
                  ? ''
                  : new Date(timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });

                return (
                  <article
                    key={post.guid || post.safeLink || index}
                    className="flex flex-col justify-between p-6 bg-white border-2 border-slate-200 rounded-2xl shadow-sm hover:border-cyan-700/40 transition"
                  >
                    <div>
                      {formattedDate && (
                        <time
                          dateTime={Number.isNaN(timestamp) ? undefined : new Date(timestamp).toISOString()}
                          className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                        >
                          {formattedDate}
                        </time>
                      )}
                      <h3 className="text-lg font-bold text-brand-navy mt-2 mb-3 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {getExcerpt(post.description)}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <a
                        href={post.safeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-bold text-brand-navy hover:text-cyan-700 transition"
                      >
                        Read Dispatch <span className="ml-1" aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </article>
                );
              })}

              <aside className="flex flex-col justify-center rounded-2xl bg-brand-navy p-6 text-center text-white">
                <h3 className="text-xl font-bold mb-2">Subscribe to BablerParty</h3>
                <p className="text-sm text-slate-200 leading-relaxed mb-6">
                  Independent civic oversight delivered straight to your inbox.
                </p>
                <a
                  href={`${SUBSTACK_URL}/subscribe`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-brand-navy hover:bg-cyan-400 transition"
                >
                  Subscribe
                </a>
              </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
