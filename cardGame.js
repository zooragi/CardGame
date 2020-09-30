(function(){
    "use strict";
    const qs = x => document.querySelector(x);
    const color = ["red","red","green","green", "yellow","yellow","white","white","orange","orange","pink","pink"];
    let shuffleColor = [];
    let allCard = [];
    let clickCount = 0;
    let firstSelect = -1;
    let secondSelect = -1;
    // const GAME_READY = "ready";
    // const GAME_START = "start";
    // let gameState = "";

    function cardGame(){
        const ver = 3;
        const hor = 4;

        function init(){
            cardUiMake();
            cardGameReady();
        }

        function cardUiMake(){
            cardShuffle();
            for(let i = 0; i < hor*ver ; i++){
                let entire = qs(".app-entire");
                let card = document.createElement("div");
                card.className = "card";
                let cardInner = document.createElement("div");
                cardInner.className = "card-inner";
                let cardFront = document.createElement("div");
                cardFront.className = "card-front";
                let cardBack = document.createElement("div");
                cardBack.className = "card-back";
                allCard.push({
                    cardData : card,
                    flag : false,
                    color : shuffleColor[i]
                });
                cardBack.style.backgroundColor = allCard[i].color;

                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);    
                card.appendChild(cardInner);

                card.addEventListener("click", e => {
                    const cardNode = e.target.parentNode.parentNode;
                    if (allCard[i].flag === false){
                        clickCount++;
                        whatCardFind(cardNode);
                        console.log("클릭시 : " ,firstSelect,secondSelect);
                        card.classList.toggle("flipped");
                    }
                    isTwoPair();
                });
                entire.appendChild(card);
                document.body.appendChild(entire);
            }

        }

        function cardGameReady(){
            for(let i = 0 ; i < shuffleColor.length ; i ++){
                setTimeout(()=>{
                    document.querySelectorAll(".card")[i].click();
                    allCard[i].flag = true;
                },50*i);
            }
            
            setTimeout(()=>{
                for(let i = 0 ; i < shuffleColor.length ; i ++){
                    allCard[i].flag = false;
                    document.querySelectorAll(".card")[i].click();
                }
            },50*shuffleColor.length+500);
        }

        function whatCardFind(cardNode){
            let cardIdx = allCard.indexOf(allCard.filter(item=> item.cardData === cardNode)[0]);
            if(clickCount%2 === 1){
                firstSelect = cardIdx;
                return;
            }
            secondSelect = cardIdx;
        }

        function isTwoPair(){
            if (firstSelect > 0 && secondSelect > 0){
                if (allCard[firstSelect].color[0] !== allCard[secondSelect].color[0]){
                    console.log(firstSelect,secondSelect);
                    console.log(allCard[firstSelect].color , allCard[secondSelect].color);
                    console.log(allCard[firstSelect].color[0] === allCard[secondSelect].color[0]);
                    allCard[firstSelect].cardData.classList.remove("flipped");
                    allCard[secondSelect].cardData.classList.remove("flipped");
                    firstSelect = -1;
                    secondSelect = -1;
                    return;
                }    
                console.log(allCard[firstSelect].color[0] === allCard[secondSelect].color[0]);
                allCard[firstSelect].flag = true;
                allCard[secondSelect].flag = true;
                firstSelect = -1;
                secondSelect = -1;

            }
            return;


        }

        function cardShuffle(){
            for(let i = color.length; i >0; i--){
                shuffleColor.push(color.splice(Math.floor(Math.random()*i),1));
            } 
        }
        init();
    }
    cardGame();
})();