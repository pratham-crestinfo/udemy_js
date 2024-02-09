import View from "./View";
import icons from "url:../../img/icons.svg"
class PaginationView extends View{
    _parentElement=document.querySelector(".pagination");
    addHandlerClick(handler)
    {
      this._parentElement.addEventListener("click",function(e)
      {
        // e.preventDefault
        const btn=e.target.closest(".btn--inline");
        console.log(btn);
        if(!btn) return;
        const goToPage=+btn.dataset.goto;
        console.log(goToPage);
        handler(goToPage);
      })
    }
    _generateMarkup()
    {
        const curpage=this._data.page;
        this._clear();
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        if(curpage === 1 && numPages >1)
        {
            return `<button data-goto="${curpage + 1}"class="btn--inline pagination__btn--next">
            <span>Page${curpage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }
        if(curpage === numPages && numPages>1)
        {
            return`
            <button data-goto="${curpage - 1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curpage-1}</span>
          </button>`;
        }
        if(curpage<numPages)
        {
            return `<button data-goto="${curpage - 1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curpage-1}</span>
          </button>
          <button data-goto="${curpage + 1}"class="btn--inline pagination__btn--next">
            <span>Page${curpage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }
        return "only 1 page"          
    }
}

export default new PaginationView() 