export const HIDDEN_CLASS = 'hidden'; 
export const VISIBLE_SCREEN = true;
export const HIDDEN_SCREEN = false; 
 
 export class Common{
     constructor(elementId){

        if(typeof elementId === 'undefined') return;
         this.element = this.bindToElement(elementId);
     }

     //find element by id if it doesn't exist throw error
     bindToElement(elementToFindById){
         const element = document.getElementById(elementToFindById);

         if(!element) throw new Error(`Element o id '${elementToFindById}' nie istnieje`);

         return element;
     }

     changeVisibilityOfScreen(element, mode){
         mode === VISIBLE_SCREEN 
            ? element.classList.remove(HIDDEN_CLASS)
            : element.classList.add(HIDDEN_CLASS)
     }
 }