import View from "./View";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView";
class BookmarksView extends View{
    _parentElement=document.querySelector(".bookmarks__list");
    _errorMsg="0 bookmarks  found!!!";
    _msg="let's get cooking";

    addHandlerRender(handler)
    {
        window.addEventListener("load",handler);
    }

     _generateMarkup()
     {
        this._clear();
         return this._data
        .map(result=>previewView.render(result,false))
        .join(" ") 
     }
     

} 
export default new BookmarksView();