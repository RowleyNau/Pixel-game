function winConditions(x, y, map, dream){
    let [open,now]=readingCookies();
    switch(now){
       case 1: 
          if(x>=0&&x<=1&&y>=0&&x<=2){
                return true;
          }
          break;
       case 2: 
          if(x==0&&y==3){
                return true;          
          }
          break;
       case 3: 
          if(x==2&&y==3){
                return true;     
          }
          break;
       case 4: 

          if(dream>0){
            return true;
          }
          break;
       case 5: 
          if(map[y][x]==13){
             return true;
          }
          break;
    }
    return false;
}
function openNewLevel(){
    let [open,now]=readingCookies();
    if(open==now)
    {
       var reg = new XMLHttpRequest();
       reg.open('GET', 'c.php', false);
       reg.send();
       console.log(typeof(open));  
       console.log("open="+String(open+1));
       document.cookie="open="+String(open+1); 
       levelShow(open+1);
    }
}
export function readFile(what, coin, bush, dream){
    var position = document.getElementById('textShow');
    fetch("t.json").then(response => response.json()).then(json => {
       switch(what){
          case "start":
             position.innerText=json.start;
             break;
          case 'warrior':
             position.innerText=json.reactionBribery;
             break;
          case 'what':
             position.innerText=json.what;
             break;
          case 'backpac':
             let str="coin: ";
             str+=String(coin)+"\nbush: "+String(bush)+"\ndream: "+String(dream);
             position.innerText=str;
             break;
          case 'ComList':
             var position2 = document.getElementById('commandListText');
             position2.innerText=json.commandList;
             break;
          case 'cannot':
             position.innerText=json.cannot;
             break;
          case 'opponentAir':
             position.innerText=json.opponentAir;
             break;
          case 'opponentSubject':
             position.innerText=json.opponentSubject;
             break;
          case 'nothing':
             position.innerText=json.nothing;
             break;
          case 'opponentEye':
             position.innerText=json.opponentEye;
             break;
          case 'levelTwo':
             position.innerText=json.levelTwo;
             break;
          case 'levelThree':
             position.innerText=json.levelThree;
             break;
          case 'levelFour':
             position.innerText=json.levelFour;
             break;
          case 'levelFive':
             position.innerText=json.levelFive;
             break;
          case 'closedLevel':
             position.innerText=json.closedLevel;
             break;
          case 'goNextLevel':
             position.innerText=json.goNextLevel;
             break;
          case 'blockingSteps':
             position.innerText=json.blockingSteps;
             break;
          case 'victory':
             position.innerText=json.victory;
             break;
          case 'noWay':
             position.innerText=json.noWay;
             break;
       }
    })
}
function SayPerson(picture){
    let position = document.getElementById('SpeakPeopleNow');
    switch(picture){
       case "people":
          position.src="pictures\\i1.png";
          break;
       case 'warrior':
          position.src="pictures\\warrior.png";
          break;
       case 'magician':
          position.src="pictures\\magician.png";
          break;
       case 'eye':
          position.src="pictures\\eye.png";
          break;
    }
}
function Dialog(what,why, coin, bush, dream){
    readFile(what, coin, bush, dream);
    SayPerson(why);
}
function levelShow(open){
    for(let i=1;i<=5;i++)
    {   
       let str="level";
       str+=String(i);
       let level = document.getElementById(str);
       let str2="dut"+str;
       if(open>=i)
          str2="pictures\\level\\"+str+".png";
       else{
          str2="pictures\\level\\"+str+"Closed.png";
       }
       level.src=str2;
    }
}
function readingCookies(){
    var reg = new XMLHttpRequest();
    reg.open('GET', 'c.php', false);
    reg.send();  
    // document.cookie="a=8765";     
    let str= document.cookie;
    str=str.replace(' ', '');
    let array = str.split(/[";"]/);
    for (let i=0; i<array.length;i++){
       array[i]=array[i].split(/["="]/);
    }
    let open,now;
    for (let i=0; i<array.length;i++){
       if (array[i][0]=='open'){
          open=Number(array[i][1]);
       }
       if (array[i][0]=='now'){
          now=Number(array[i][1]);
       }
    }
    return [open,now];
}
export {readingCookies, levelShow, Dialog, openNewLevel, winConditions};