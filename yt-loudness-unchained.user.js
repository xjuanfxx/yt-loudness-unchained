// ==UserScript==
// @name         YouTube Loudness Unchained
// @namespace    yt-loudness-unchained
// @version      1.0
// @description  Kills YouTube's volume normalization. Hear the original master, as loud as it was made.
// @author       Claude
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY0ZDRkIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjY2MwMDAwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTQiIGZpbGw9InVybCgjZykiLz48cGF0aCBkPSJNMTIgMjVoOGwxMS05djMybC0xMS05aC04eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zNyAyNGExMSAxMSAwIDAgMSAwIDE2TTQyIDE4YTE5IDE5IDAgMCAxIDAgMjhNNDcgMTJhMjcgMjcgMCAwIDEgMCA0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPgo=
// @match        https://www.youtube.com/*
// @match        https://music.youtube.com/*
// @exclude      https://*.youtube.com/live_chat*
// @grant        none
// @run-at       document-start
// @homepageURL  https://github.com/xjuanfxx/yt-loudness-unchained
// @supportURL   https://github.com/xjuanfxx/yt-loudness-unchained/issues
// @updateURL    https://raw.githubusercontent.com/xjuanfxx/yt-loudness-unchained/main/yt-loudness-unchained.user.js
// @downloadURL  https://raw.githubusercontent.com/xjuanfxx/yt-loudness-unchained/main/yt-loudness-unchained.user.js
// @license      MIT
// ==/UserScript==

(() => {
  'use strict';

  const pageCode = () => {
    if (window.__ytLoudnessUnchained) return;
    window.__ytLoudnessUnchained = true;

    const proto = HTMLMediaElement.prototype;
    const { get, set } = Object.getOwnPropertyDescriptor(proto, 'volume');

    // Volume from YouTube's slider (0–1), or null if this isn't the player
    const wanted = (el) => {
      const v = el.closest('#movie_player')?.getVolume?.();
      return Number.isFinite(v) ? Math.min(1, Math.max(0, v / 100)) : null;
    };

    // Intercept the normalized volume and apply the slider volume instead
    Object.defineProperty(proto, 'volume', {
      configurable: true,
      get,
      set(value) {
        set.call(this, wanted(this) ?? value);
      },
    });

    // Fallback fix, only when something happens (no timers)
    const fix = (e) => {
      const el = e.target;
      if (!(el instanceof HTMLMediaElement)) return;
      setTimeout(() => {
        const w = wanted(el);
        if (w !== null && Math.abs(get.call(el) - w) > 0.001) set.call(el, w);
      });
    };
    for (const type of ['playing', 'volumechange']) {
      document.addEventListener(type, fix, true);
    }
  };

  // Inject into the page context (Trusted Types compatible)
  let policy = { createScript: (s) => s };
  try {
    policy = trustedTypes?.createPolicy('yt-loudness-unchained', policy) ?? policy;
  } catch {}

  const script = document.createElement('script');
  script.textContent = policy.createScript(`(${pageCode})();`);
  document.documentElement.append(script);
  script.remove();
})();
