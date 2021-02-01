import {Common, HIDDEN_SCREEN, VISIBLE_SCREEN} from './Common.esm.js';

const LOADER_ELEMENT_ID = 'js-loading-screen';
const LOADER_CURRENT_PROGRESS_ID = 'js-loading-screen-current';
const LOADER_TOTAL_PROGRESS_ID = 'js-loading-screen-total';

export const DATALOADED_EVENT_NAME = 'dataLoaded'

class Loader extends Common{
    constructor(){
        super(LOADER_ELEMENT_ID)
        this.bindToElements();
        this.clearFlags();
    }

    bindToElements(){
        this.currentElement = this.bindToElement(LOADER_CURRENT_PROGRESS_ID);
        this.totalElement = this.bindToElement(LOADER_TOTAL_PROGRESS_ID);
    }

    loadImage(imageUrl){
        this.changeVisibilityOfScreen(this.element, VISIBLE_SCREEN);
        this.isAllLoaded = false;
        this.totalCounter++;
        this.totalElement.textContent = this.totalCounter;

        const image = new Image();
        image.src = imageUrl;
        image.addEventListener('load', (e)=> this.itemLoaded(e), false)

        return image;
    }

    loadSound(soundUrl){
        this.changeVisibilityOfScreen(this.element, VISIBLE_SCREEN);
        this.isAllLoaded = false;
        this.totalCounter++;

        const audio = new Audio();

        audio.addEventListener('canplaythrough', event => this.itemLoaded(event), false)
        audio.src = soundUrl;

        return audio;
    }

    itemLoaded(e){
        e.target.removeEventListener(e.type, this.itemLoaded, false);
        this.currentCounter++;
        this.currentElement.textContent = this.currentCounter;

        if(this.currentCounter == this.totalCounter){
            this.clearFlags();
            this.changeVisibilityOfScreen(this.element, HIDDEN_SCREEN);
            window.dispatchEvent(new CustomEvent(DATALOADED_EVENT_NAME))
        }
    }

    clearFlags(){
        this.isAllLoaded = true;
        this.currentCounter = 0;
        this.totalCounter = 0;
    }
}

export const loader = new Loader();