import {Common, HIDDEN_SCREEN, VISIBLE_SCREEN} from './Common.esm.js';
import {levelSelect} from './LevelSelect.esm.js';
import {CANVAS_HEIGHT, CANVAS_WIDTH} from './Canvas.esm.js'
import { settings } from './Settings.esm.js';
import { backToMenu } from './BackToMenu.esm.js';

export const SCALE_PROPERTY = '--scale-value';
const START_SCREEN_ID = 'js-start-screen';
const START_SCREEN_GAME_BUTTON_ID = 'js-game-button';
const START_SCREEN_SETTINGS_BUTTON_ID = 'js-settings-button';

const MINI_SETTINGS_LAYER_ID = 'js-mini-settings-layer';
const MINI_SETTINGS_BUTTON_ID = 'js-mini-settings-button';


class MainMenu extends Common{
    constructor(){
        super(START_SCREEN_ID);
        this.bindToGameElements();
        this.resizeGameWindow();
        window.addEventListener('resize', this.resizeGameWindow)
    }
    #levelSelect = levelSelect;

    bindToGameElements(){
        const gameStartButton = this.bindToElement(START_SCREEN_GAME_BUTTON_ID);
        const gameSettingsButton = this.bindToElement(START_SCREEN_SETTINGS_BUTTON_ID);
        const miniSettingsButton = this.bindToElement(MINI_SETTINGS_BUTTON_ID);

        this.miniSettingsLayer = this.bindToElement(MINI_SETTINGS_LAYER_ID);

        gameStartButton.addEventListener('click', this.showLevelScreen);
        gameSettingsButton.addEventListener('click', this.showSettingsSecreen);
        miniSettingsButton.addEventListener('click', this.showSettingsSecreen)
    }

    showLevelScreen=()=>{
        this.#levelSelect.createButtons();
        this.changeVisibilityOfScreen(this.element, HIDDEN_SCREEN)
        this.changeVisibilityOfScreen(this.#levelSelect.element, VISIBLE_SCREEN)
        this.changeVisibilityOfScreen(backToMenu.element, VISIBLE_SCREEN);
        backToMenu.element.addEventListener('click', this.#returnToMenu)
    }

    showSettingsSecreen=()=>{
        this.changeVisibilityOfScreen(settings.element, VISIBLE_SCREEN);
    }

    resizeGameWindow(){
        const {innerWidth: width, innerHeight: height} = window;
        
        const scale = Math.min(width/CANVAS_WIDTH, height/CANVAS_HEIGHT);

        document.documentElement.style.setProperty(SCALE_PROPERTY, scale);
    }

    #returnToMenu=()=>{
        this.changeVisibilityOfScreen(this.element, VISIBLE_SCREEN)
        this.changeVisibilityOfScreen(this.#levelSelect.element, HIDDEN_SCREEN)
        this.changeVisibilityOfScreen(backToMenu.element, HIDDEN_SCREEN);
    }

}

export const mainMenu = new MainMenu();