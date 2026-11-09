<p align="center"><img src="icon.png" width="96" alt=""></p>

# YouTube Loudness Unchained

A userscript that turns off YouTube's volume normalization, so videos play at their original loudness instead of being turned down.

## Why

YouTube lowers the volume of loud videos to a target of about -14 LUFS. If you produce music or just want to hear a track as it was mastered, that gets in the way. YouTube has no setting to turn it off.

## How it works

YouTube applies normalization by setting the `<video>` element's `volume` lower than the slider shows. The script hooks that setter in the page context and always uses the slider value (`player.getVolume()`), so the player's normalized value never reaches the video. A small fallback on `playing` and `volumechange` corrects it if anything gets through. There are no timers.

## Install

1. Install a userscript manager: [ScriptCat](https://scriptcat.org), [Tampermonkey](https://www.tampermonkey.net) or [Violentmonkey](https://violentmonkey.github.io).
2. Open [`yt-loudness-unchained.user.js`](yt-loudness-unchained.user.js), click **Raw**, and your manager will offer to install it.
3. Reload YouTube.

## Check that it works

Open the browser console (F12) on a video and run:

```js
document.querySelector('#movie_player video').volume
```

With the slider at 100% it should print `1`.

**Stats for nerds** will still show something like `100% / 41%`. That is the value YouTube *tried* to set, not what's playing.

## Notes

- Loud videos will really be loud now. Be careful with headphones.
- This only removes normalization. YouTube's **Stable Volume** setting is a separate compressor; turn it off in the player's settings menu if you don't want it.
- Works on `youtube.com` and `music.youtube.com`.

## License

MIT
