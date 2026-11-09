<p align="center">
  <img src="assets/logo.png" width="112" alt="YouTube Loudness Unchained logo">
</p>

<h1 align="center">YouTube Loudness Unchained</h1>

<p align="center">
  <b>Turn off YouTube's volume normalization.</b><br>
  Hear the original master, as loud as it was made.
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/xjuanfxx/yt-loudness-unchained/main/yt-loudness-unchained.user.js"><img src="https://img.shields.io/badge/-Install%20userscript-F38BA8?style=for-the-badge&logo=youtube&logoColor=white&labelColor=1E1E2E" alt="Install userscript"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/dynamic/regex?url=https%3A%2F%2Fraw.githubusercontent.com%2Fxjuanfxx%2Fyt-loudness-unchained%2Fmain%2Fyt-loudness-unchained.user.js&search=%40version%5Cs%2B(%5CS%2B)&replace=v%241&label=version&style=flat-square&color=CBA6F7&labelColor=1E1E2E" alt="Version">
  <img src="https://img.shields.io/badge/size-~3_KB-A6E3A1?style=flat-square&labelColor=1E1E2E" alt="Size about 3 KB">
  <img src="https://img.shields.io/badge/timers-none-A6E3A1?style=flat-square&labelColor=1E1E2E" alt="No timers">
  <img src="https://img.shields.io/badge/license-MIT-F5C2E7?style=flat-square&labelColor=1E1E2E" alt="MIT license">
</p>

---

## 🎚️ The problem

YouTube turns down any video that's louder than about **-14 LUFS**. A modern master at -7 LUFS ends up playing at less than half volume, and there's no setting to turn that off.

That's fine for casual watching. It's not fine if you **make music** and want to hear your track the way you mastered it, or you just want to hear it as loud as it was made.

## ✨ What it does

|  | Without the script | With the script |
|---|---|---|
| Volume slider | 100% | 100% |
| What the `<video>` actually plays at | **41%** | **100%** |
| Changing the volume | Goes back to normalized | Stays at what you set |

<sub>Example values from a beat mastered at -7.6 LUFS.</sub>

## 📥 Install

1. Get a userscript manager:
   [**ScriptCat**](https://scriptcat.org) · [**Tampermonkey**](https://www.tampermonkey.net) · [**Violentmonkey**](https://violentmonkey.github.io)
2. Click **[Install userscript](https://raw.githubusercontent.com/xjuanfxx/yt-loudness-unchained/main/yt-loudness-unchained.user.js)** and confirm in your manager.
3. Reload YouTube. Done.

Your manager will check this repo for updates on its own.

## ✅ Check that it works

Open a video, press <kbd>F12</kbd>, go to **Console** and run:

```js
document.querySelector('#movie_player video').volume
```

With the slider at 100% you should get **`1`**.

> [!NOTE]
> **Stats for nerds** will still say something like `100% / 41%`. That's the value YouTube *tried* to set. The script intercepts it before it reaches the video, so trust the console, not the stats.

## ⚙️ How it works

YouTube normalizes by setting the `<video>` element's `volume` lower than the slider shows. The script:

1. **Injects into the page** (with Trusted Types support), where YouTube's player lives.
2. **Hooks the `volume` setter** on `HTMLMediaElement`. Whenever YouTube sets a normalized volume, the script swaps in the slider value from `player.getVolume()`.
3. **Double-checks** on `playing` and `volumechange` in case anything gets through.

No polling and no timers: it only runs when the volume actually changes.

## 📝 Notes

- 🔊 **Loud videos will really be loud now.** Be careful with headphones.
- 🎛️ This removes **normalization** only. YouTube's **Stable Volume** is a separate compressor; turn it off in the player's ⚙️ menu if you don't want it.
- 🎵 Works on `youtube.com` and `music.youtube.com`.
- 🎧 Want to hear something the way most people will? Turn the script off in your manager and reload.

## 📄 License

[MIT](LICENSE) · Made by [JuanFX](https://github.com/xjuanfxx) with Claude
