export const sounds = {
    click: new Audio("src/assets/audio/click.mp3"),
    gameover: new Audio("src/assets/audio/game_over.mp3"),
    game: new Audio("src/assets/audio/game.mp3"),
    line: new Audio("src/assets/audio/line.mp3")
};

export let soundsLoaded = false;

export const loadSounds = async () => {
  if (soundsLoaded) {
    return;
  }

  await Promise.all(
    Object.entries(sounds).map(
      ([key, sound]) =>
        new Promise((resolve) => {
          sound.addEventListener(
            "canplaythrough",
            () => {
              resolve();
            },
            { once: true }
          );
        })
    )
  );
  soundsLoaded = true;
};

export function playAudio(sound) {
  if (soundsLoaded) {
    // サウンドが再生中でない場合のみ再生
    if (sound.paused) {
      sound.play().catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Audio playback error:", error);
        }
      });
    }
  }
}

export function stopAudio(sound) {
  sound.pause();
  sound.currentTime = 0;
}
