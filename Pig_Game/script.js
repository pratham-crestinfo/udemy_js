'use strict';
let curr_p0=0;
let curr_p1=0;
let score_p0=0;
let score_p1=0;
let turn = true;
document.querySelector(".btn--new").addEventListener("click",function()
{
    document.querySelector("#score--0").textContent=0;
    document.querySelector("#score--1").textContent=0;
    document.querySelector(".dice").classList.add("hidden");
    curr_p0=0;
    curr_p1=0;
    score_p0=0;
    score_p1=0;
    turn = true;
    document.querySelector(".btn--hold").disabled=false;
            document.querySelector(".btn--roll").disabled=false;
    document.querySelector("#sec-0").classList.remove("player--winner");
    document.querySelector("#sec-1").classList.remove("player--winner");
    document.querySelector("#sec-0").classList.add("player--active");
    document.querySelector("#sec-1").classList.remove("player--active");
})
document.querySelector(".btn--roll").addEventListener("click",function()
{
    // if(turn)
    // {
    //     document.querySelector("#sec-0").classList.add("player--active");
    //     document.querySelector("#sec-1").classList.remove("player--active");
    //     console.log("hello");
    // }
    // else
    // {
    //     document.querySelector("#sec-1").classList.add("player--active");
    //     document.querySelector("#sec-0").classList.remove("player--active");
    //     console.log("me")
    // }
    let roll=Math.trunc(Math.random()*6)+1;
    switch(roll)
    {
        case 1:
        {
            document.querySelector(".dice").src="dice-1.png";
            document.querySelector(".dice").classList.remove("hidden");
            (turn)?(curr_p0=0):(curr_p1=0);
            document.querySelector("#current--1").textContent=0;
            document.querySelector("#current--0").textContent=0;
            if(turn)
            {
                document.querySelector("#sec-1").classList.add("player--active");
                document.querySelector("#sec-0").classList.remove("player--active");
            }
            else
            {
                document.querySelector("#sec-0").classList.add("player--active");
                document.querySelector("#sec-1").classList.remove("player--active");;
            }
            (turn==true)?(turn=false):(turn=true);
        break;
        }
        case 2:
        {
            document.querySelector(".dice").src="dice-2.png";
            document.querySelector(".dice").classList.remove("hidden");
            if(turn)
            {
                curr_p0=curr_p0+2;
                document.querySelector("#current--0").textContent=curr_p0;
            }else
            {
                curr_p1=curr_p1+2;
                document.querySelector("#current--1").textContent=curr_p1;
            }
        break;
        }
        case 3:
        {
            document.querySelector(".dice").src="dice-3.png";
            document.querySelector(".dice").classList.remove("hidden");
            if(turn)
            {
                curr_p0=curr_p0+3;
                document.querySelector("#current--0").textContent=curr_p0;
            }else
            {
                curr_p1=curr_p1+3;
                document.querySelector("#current--1").textContent=curr_p1;
            }
        break;
        }
        case 4:
        {
            document.querySelector(".dice").src="dice-4.png";
            document.querySelector(".dice").classList.remove("hidden");
            if(turn)
            {
                curr_p0=curr_p0+4;
                document.querySelector("#current--0").textContent=curr_p0;
            }else
            {
                curr_p1=curr_p1+4;
                document.querySelector("#current--1").textContent=curr_p1;
            }
        break;
        }
        case 5:
        {
            document.querySelector(".dice").src="dice-5.png";
            document.querySelector(".dice").classList.remove("hidden");
            if(turn)
            {
                curr_p0=curr_p0+5;
                document.querySelector("#current--0").textContent=curr_p0;
            }else
            {
                curr_p1=curr_p1+5;
                document.querySelector("#current--1").textContent=curr_p1;
            }
        break;
        }
        case 6:
        {
            document.querySelector(".dice").src="dice-6.png";
            document.querySelector(".dice").classList.remove("hidden");
            if(turn)
            {
                curr_p0=curr_p0+6;
                document.querySelector("#current--0").textContent=curr_p0;
            }else
            {
                curr_p1=curr_p1+6;
                document.querySelector("#current--1").textContent=curr_p1;
            }
        break;
        }
    }    
})
document.querySelector(".btn--hold").addEventListener("click",function()
{
    if(turn)
    {
        score_p0=score_p0+curr_p0;
        curr_p0=0;
        document.querySelector("#score--0").textContent=score_p0;
        document.querySelector("#current--0").textContent=curr_p0;
        if(score_p0>=100)
        {
            document.querySelector("#sec-0").classList.add("player--winner");
            document.querySelector(".btn--hold").disabled=true;
            document.querySelector(".btn--roll").disabled=true;
        }
        document.querySelector("#sec-1").classList.add("player--active");
        document.querySelector("#sec-0").classList.remove("player--active");
        
    }
    else
    {
        score_p1=score_p1+curr_p1;
        curr_p1=0;
        document.querySelector("#score--1").textContent=score_p1;
        document.querySelector("#current--1").textContent=curr_p1;
        if(score_p1>=100)
        {
            document.querySelector("#sec-1").classList.add("player--winner");
            document.querySelector(".btn--hold").disabled=true;
            document.querySelector(".btn--roll").disabled=true;
        }
        document.querySelector("#sec-0").classList.add("player--active");
        document.querySelector("#sec-1").classList.remove("player--active");
    }
    turn = !turn;
})

