class Media {
  constructor() {
    this.musicVolume = 0.3;
    this.soundVolume = 0.3;
    this.allowedMusic = true;
    this.allowedSound = true;
    this._swapSound = null;
    this._backgroundMusic = null;
    this.isInLevel = false;
  }

  #spriteImg = null;

  //increase or decrease music
  increaseMusicVolume() {
    this.musicVolume += 0.1;

    if (this.musicVolume > 1) this.musicVolume = 1;

    if (this._backgroundMusic) this._backgroundMusic.volume = this.musicVolume;
  }

  decreaseMusicVolume() {
    this.musicVolume -= 0.1;

    if (this.musicVolume < 0) this.musicVolume = 0;

    if (this._backgroundMusic) this._backgroundMusic.volume = this.musicVolume;
  }

  //increase or decrease sound
  increaseSoundVolume() {
    this.soundVolume += 0.1;

    if (this.soundVolume > 1) this.soundVolume = 1;

    if (this._swapSound) this._swapSound.volume = this.soundVolume;
  }

  decreaseSoundVolume() {
    this.soundVolume -= 0.1;

    if (this.soundVolume < 0) this.soundVolume = 0;

    if (this._swapSound) this._swapSound.volume = this.soundVolume;
  }

  //play or pause musice
  playBackgroundMusic() {
    if (!this.allowedMusic) return;

    this._backgroundMusic.loop = true;
    if (this._backgroundMusic) this._backgroundMusic.play();
  }

  stopBackgroundMusice() {
    if (this._backgroundMusic) this._backgroundMusic.pause();
  }

  //game sound
  playSwapSound() {
    if (!this.allowedSound) return;

    if (this._swapSound) this._swapSound.play();
  }

  set swapSound(sound) {
    this._swapSound = sound;
    this._swapSound.volume = this.soundVolume;
  }

  get swapSound() {
    return !!this._swapSound;
  }

  set backgroundMusic(music) {
    this._backgroundMusic = music;
    this._backgroundMusic.volume = this.musicVolume;
  }

  get backgroundMusic() {
    return !!this._backgroundMusic;
  }

  set spriteImg(imageObject) {
    if (!imageObject instanceof Image) return null;

    this.#spriteImg = imageObject;
  }

  get spriteImg() {
    return this.#spriteImg;
  }

  toggleMusicOnOff() {
    if (this.allowedMusic) {
      this.allowedMusic = false;
      this.stopBackgroundMusice();
    } else {
      this.allowedMusic = true;
      this.playBackgroundMusic();
    }
  }

  toggleSoundOnOff() {
    if (this.allowedSound) {
      this.allowedSound = false;
    } else {
      this.allowedSound = true;
    }
  }
}

export const media = new Media();
