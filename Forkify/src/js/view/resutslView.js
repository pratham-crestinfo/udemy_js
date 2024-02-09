import View from "./View";
import icons from "url:../../img/icons.svg"
import previewView  from "./previewView";
class ResultsView extends View{
    _parentElement=document.querySelector(".results");
    _errorMsg="0 receipes found!!!";
    _msg="let's get cooking";

    
    _generateMarkup()
    {
       this._clear();
        return this._data
       .map(result=>previewView.render(result,false))
       .join(" ") 
    }
} 
export default new ResultsView();