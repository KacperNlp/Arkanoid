import {Common, HIDDEN_SCREEN} from './Common.esm.js'
import { media } from './Media.esm.js';


const SETTINGS_SCREEN_ID ='js-settings-screen';
//game sounds
const GAME_SOUNDS_ON_OFF_BUTTON_ID = 'js-game-sounds';
const GAME_SOUNDS_INCREASE_BUTTON_ID ='js-game-sounds-increase';
const GAME_COUNDS_DECREASE_BUTTON_ID = 'js-game-sounds-decrease';
//music
const GAME_MUSIC_ON_OFF_BUTTON_ID = 'js-music';
const GAME_MUSIC_INCREASE_BUTTON_ID = 'js-musice-increase';
const GAME_MUSIC_DECREASE_BUTTON_ID = 'js-music-decrease';
//exite button
const EXITE_SETTINGS_BUTTON_ID = 'js-settings-exite';


class Settings extends Common{
    constructor(){
        super(SETTINGS_SCREEN_ID);
        this.bindToElements();
    }

    bindToElements(){
        const exitSettingsButton = this.bindToElement(EXITE_SETTINGS_BUTTON_ID);
        const musicOnOffButton = this.bindToElement(GAME_MUSIC_ON_OFF_BUTTON_ID);
        const musicIncrease = this.bindToElement(GAME_MUSIC_INCREASE_BUTTON_ID);
        const musicDecrease = this.bindToElement(GAME_MUSIC_DECREASE_BUTTON_ID);
        const soundOnOffButton = this.bindToElement(GAME_SOUNDS_ON_OFF_BUTTON_ID);
        const soundIncrease = this.bindToElement(GAME_SOUNDS_INCREASE_BUTTON_ID);
        const soundDecrease = this.bindToElement(GAME_COUNDS_DECREASE_BUTTON_ID);
        
        //music
        musicOnOffButton.addEventListener('click', ()=> media.toggleMusicOnOff());
        musicIncrease.addEventListener('click', ()=> media.increaseMusicVolume());
        musicDecrease.addEventListener('click', ()=> media.decreaseMusicVolume());

        //game sounds
        soundOnOffButton.addEventListener('click', ()=> media.toggleSoundOnOff());
        soundIncrease.addEventListener('click', ()=> media.increaseSoundVolume());
        soundDecrease.addEventListener('click', ()=> media.decreaseSoundVolume());

        exitSettingsButton.addEventListener('click', ()=> this.changeVisibilityOfScreen(this.element, HIDDEN_SCREEN))
    }
}

export const settings = new Settings();