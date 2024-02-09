'use strict';
const showmodal = document.querySelectorAll(".show-modal");
const modal=document.querySelector(".modal");

function openmodal()
{
    modal.classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden')
}
function closemodal()
{
    modal.classList.add("hidden");
    document.querySelector('.overlay').classList.add('hidden');
}
document.querySelector('.overlay').addEventListener('click', closemodal);

for(let i=0;i<showmodal.length;i++)
{
    showmodal[i].addEventListener("click",openmodal);
}
document.querySelector('.close-modal').addEventListener("click",closemodal)

document.addEventListener('keydown',function(event)
{
    if(event.key=="Escape" && !modal.classList.contains("hidden") )
    {
         closemodal();
    }
})
