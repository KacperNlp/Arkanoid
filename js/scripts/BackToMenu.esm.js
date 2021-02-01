import {Common} from './Common.esm.js';


const BACK_TO_MENU_BUTTON_ID = 'js-return-to-menu';

class BackToMenu extends Common{
    constructor(){
        super(BACK_TO_MENU_BUTTON_ID);
    }
}

export const backToMenu = new BackToMenu();