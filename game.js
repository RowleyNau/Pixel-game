import * as drawFun from './drawFun.js';
import * as actionsFun from './actionsFun.js';
import * as LDFun from './LevelDialogFun.js';
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// var img;//персонаж
var imgCharacter = {command: "left",position: 2};// координаты картинки персонажа
var imgBush;//куст 7
var imgStone;//камень 6
var imgWarrior;//стражник 4
var imgCoin;//монетка 3
var imgpeopleSPRT;//спрайт человеков 1
var imgpeopleFace;//спрайт человеков
var imgPoints;//точки 9
var imgEyesSprite;//глаза 8
var imgMagician;//маг 2
var imgDream;//сон 10
var imgFireball;//фаербол 11
var imgFire;//огонь 12
var imgBed;//кровать 13
var imgFloor;//пол дома 
var imgPeopleSleeping;//спящий персонаж 
var speaksNow={"why":"people", "what":"start"};
var actionEyes={"must":2, "nowX":4, "nowY":2, "may":"down", "state":0, "active":0, "live":true}; // надо, сейчас, направление, состояние
var situationMagician={"active":false, "side":"left", "must":2,"live":false};
var backpack={"coin":0, "bush":0, "dream":0};
var character = {x:9,y:3,"step":true};

var map=[];
function start(){
   setTimeout(()=>{
      imgBush = document.getElementById("bush");
      imgStone = document.getElementById("stone");
      imgWarrior = document.getElementById("warrior");
      imgCoin = document.getElementById("coin");
      imgpeopleSPRT=document.getElementById("peopleSPRT");
      imgpeopleFace=document.getElementById("peopleFace");
      imgPoints=document.getElementById("points");
      imgEyesSprite=document.getElementById("eyesSprite");
      imgMagician=document.getElementById("magician");
      imgDream=document.getElementById("dream");
      imgFireball=document.getElementById("fireball");
      imgFire=document.getElementById("fire");
      imgBed=document.getElementById("bed");
      imgFloor=document.getElementById("floor");
      imgPeopleSleeping=document.getElementById("peopleSleeping");
      let [open,now] = LDFun.readingCookies();
      LDFun.levelShow(open,now);
      levelElement(now);
      draw();

   }, 50)
}
function draw(){
   ctx.clearRect(0,0,canvas.width,canvas.height);
   drawGrid(ctx);
   level();
   if (actionEyes.live)
   {
      if(drawEyeAll(ctx))
      drawFun.drawCharacter(ctx, imgCharacter.command, peopleSPRT, imgPeopleSleeping, imgCharacter.position, character.x, character.y);
      else{
         [speaksNow.what, speaksNow.why, character.step]=characterDeath(speaksNow.what, speaksNow.why, character.step);
      }
   }
   else {
      drawFun.drawCharacter(ctx, imgCharacter.command, peopleSPRT, imgPeopleSleeping, imgCharacter.position, character.x, character.y); 
   }
   LDFun.Dialog (speaksNow.what,speaksNow.why, backpack.coin, backpack.bush, backpack.dream);
}
function characterDeath(what, why, step){
   what="noWay";
   why="people";
   step=false;
   return [what, why, step];
}
function level()
{
   for (let i=0; i<map.length; i++)
   {
     for (let j=0; j<map[i].length; j++)
     {
      if(map[i][j]==2)
      {
         drawFun.drawMagician(ctx, [j], [i], imgMagician);
         if (!situationMagician.active)drawFun.drawPoints(ctx, [j], [i], imgPoints);
      }
      if(map[i][j]==4)
      {
         drawFun.drawWarrior(ctx, [j], [i], imgWarrior);
      }
      if(map[i][j]==3)
      {
         drawFun.drawCoin(ctx, [j], [i], imgCoin);
      }      
      if(map[i][j]==6)
      {
         drawFun.drawStone(ctx, [j], [i], imgStone);
      }
      if(map[i][j]==7)
      {
         drawFun.drawBush(ctx, [j], [i], imgBush);
      }
      if(map[i][j]==10)
      {
         drawFun.drawDream(ctx, [j], [i], imgDream);
      }
      if(map[i][j]==11)
      {
         drawFun.drawFireball(ctx, [j], [i], imgFireball);
      }
      if(map[i][j]==12)
      {
         drawFun.drawFire(ctx, [j], [i], imgFire);
         [speaksNow.what, speaksNow.why, character.step]=characterDeath(speaksNow.what, speaksNow.why, character.step);
      }
      if(map[i][j]==13)
      {
         drawFun.drawBedroom(ctx, [j], [i], imgFloor, imgBed);
      }
     }
   }
   // ctx.drawImage(imgPoints,2*100+20,2*100-15);
}
function drawGrid(ctx){
   ctx.globalAlpha=0.4
   ctx.strokeStyle = '#F2850D';
   ctx.beginPath();
   
   for(let x=0;x<=1000;x+=100){
      ctx.moveTo(x,0);
      ctx.lineTo(x,canvas.height);
   }
   for(let y=0;y<=800;y+=100){
      ctx.moveTo(0,y);
      ctx.lineTo(canvas.width,y);
   }
   ctx.stroke();
   ctx.globalAlpha=1
}
function GoDown() {
   if (character.y+1<6 && (map[character.y+1][character.x]==0||map[character.y+1][character.x]==11||map[character.y+1][character.x]==13))
      {
         imgCharacter.command= "down";
         if (imgCharacter.position==1){imgCharacter.position= 3;}
         else {imgCharacter.position= 1;}
         map[character.y][character.x]==0;
         character.y++;
         switch(map[character.y][character.x]){
            case 0:map[character.y][character.x]=1;return true;
            case 11:map[character.y][character.x]=12;return false;
            case 13:map[character.y][character.x]=13;return true;
         }      
      }
   else {
      return false;
   }
}
function GoUp() {
   if (character.y-1>-1 && (map[character.y-1][character.x]==0||map[character.y-1][character.x]==11||map[character.y-1][character.x]==13))
      {
         
         imgCharacter.command= "up";
         if (imgCharacter.position==1){imgCharacter.position= 3;}
         else {imgCharacter.position= 1;}
         map[character.y][character.x]=0;
         character.y -= 1;
         switch(map[character.y][character.x]){
            case 0:map[character.y][character.x]=1;return true;
            case 11:map[character.y][character.x]=12;return false;
            case 13:map[character.y][character.x]=13;return true;
         }
      }
   else {
      return false;
   }
}
function GoLeft() {
   if(character.x-1>-1 && (map[character.y][character.x-1]==0||map[character.y][character.x-1]==11||map[character.y][character.x-1]==13))
      {  
 
         imgCharacter.command= "left";
         if (imgCharacter.position==1){imgCharacter.position= 3;}
         else {imgCharacter.position= 1;}         
         map[character.y][character.x]=0;
         character.x -= 1;
         switch(map[character.y][character.x]){
            case 0:map[character.y][character.x]=1;return true;
            case 11:map[character.y][character.x]=12;return false;
            case 13:map[character.y][character.x]=13;return true;
         } 
      }
   else {
      return false;
   }
}
function GoRight() {
   if(character.x+1<10 && (map[character.y][character.x+1]==0||map[character.y][character.x+1]==11||map[character.y][character.x+1]==13))
      {
         imgCharacter.command= "right";
         if (imgCharacter.position==0){imgCharacter.position= 2;}
         else {imgCharacter.position= 0;}
         map[character.y][character.x]=0;
         character.x++;
         switch(map[character.y][character.x]){
            case 0:map[character.y][character.x]=1;return true;
            case 11:map[character.y][character.x]=12;return false;
            case 13:map[character.y][character.x]=13;return true;
         }  
      }
   else {
      return false;
   }
}
var next = false;
async  function AnimationGo (commond) {
         next=0;
         switch (commond){
            case 'up':
               next=GoUp();
               break;
            case 'down':
               next=GoDown();
               break;
            case 'left':
               next=GoLeft();
               break;
            case 'right':
               next=GoRight();
               break;
         }
}
function EyeState(){
   console.log('!');
   if(actionEyes.active==0){   
      if (actionEyes.must==0){
         actionEyes.must=2;
         if (actionEyes.may=="down"){
            actionEyes.may="up";
         }
         else {
            if(actionEyes.may=="up")
            actionEyes.may="down";
         }
      }
   
      switch (actionEyes.may)
      {
         case "left": 
            if (actionEyes.must!=0){
               map[actionEyes.nowY][actionEyes.nowX]=0;
               actionEyes.nowX--;
               actionEyes.must--;
               map[actionEyes.nowY][actionEyes.nowX]=8;
            }
            break;

         case "right": 
            if (actionEyes.must!=0){
               map[actionEyes.nowY][actionEyes.nowX]=0;
               actionEyes.nowX++;
               actionEyes.must--;
               map[actionEyes.nowY][actionEyes.nowX]=8;
            }
            break;

         case "down": 
            if (actionEyes.must!=0){
               map[actionEyes.nowY][actionEyes.nowX]=0;
               actionEyes.nowY++;
               actionEyes.must--;
               map[actionEyes.nowY][actionEyes.nowX]=8;
            }
            break;

         case "up": 
            if (actionEyes.must!=0){
               map[actionEyes.nowY][actionEyes.nowX]=0;
               actionEyes.nowY--;
               actionEyes.must--;
               map[actionEyes.nowY][actionEyes.nowX]=8;
            }
            break;
      }
   }
   else {
      actionEyes.active--;
   }
}
function drawEyeAll(ctx){
   if (statusCheck()){
      drawFun.drawEye1(ctx, imgEyesSprite, actionEyes.may, actionEyes.nowX, actionEyes.nowY);
      if(actionEyes.active!=0){ 
         drawFun.drawPoints(ctx, actionEyes.nowX, actionEyes.nowY, imgPoints);
      }
      return true;
   }
   else{
      
      if(actionEyes.active!=0){ 
         drawFun.drawPoints(ctx, actionEyes.nowX, actionEyes.nowY, imgPoints);
         drawFun.drawEye1(ctx, imgEyesSprite, actionEyes.may, actionEyes.nowX, actionEyes.nowY);
         return true;
      }
      drawFun.drawEye2(ctx, imgEyesSprite, actionEyes.may, actionEyes.nowX, actionEyes.nowY);
      return false;
   }
}
var maypr;
function statusCheck(){
   let a=false
   if (actionEyes.may=="left"||actionEyes.may=="right")
   {
      actionEyes.may=maypr;
   }
   if(actionEyes.nowY-1==character.y&&actionEyes.nowX==character.x)
   {
      maypr=actionEyes.may;
      actionEyes.may="up";
      return a;
   }
   if(actionEyes.nowY==character.y&&actionEyes.nowX-1==character.x)
   {
      maypr=actionEyes.may;
      actionEyes.may="left";
      return a;
   }
   if(actionEyes.nowY+1==character.y&&actionEyes.nowX==character.x)
   {
      maypr=actionEyes.may;
      actionEyes.may="down";
      return a;
   }
   if(actionEyes.nowY==character.y&&actionEyes.nowX+1==character.x)
   {
      maypr=actionEyes.may;
      actionEyes.may="right";
      return a;
   }
   a=true
   return a;
}
var Fx, Fy;
async function action(command, i, st){
   let j = i;
   if (st){
      Fx=character.x; Fy=character.y;
   }
   if(actionEyes.live){
      EyeState();
   }
   if(situationMagician.live){
      if (situationMagician.active){
      
         [situationMagician.side, map]=drawFun.magicianAction(situationMagician.side, map, character.x, character.y);
      }
      else{
         if(situationMagician.must==0){situationMagician.active=true;}
         else{situationMagician.must--;}}
   }
   // console.log(actionEyes.nowX,actionEyes.nowY);
   switch(command[i]){  
      case 'up':
         if (typeof(command[i+1])=='number')
         {
            if (st&&character.y-command[i+1]>-1){
               Fy=character.y-command[i+1];
               // console.log(Fy,character.y);
               st=false;
            }
            AnimationGo ('up');
            // console.log('next');
         } 
         break;
      case 'down':
         if(typeof(command[i+1])=='number'){
            
            if (st&&character.y+command[i+1]<6){
               Fy=character.y+command[i+1];
               st=false;
            }
               AnimationGo ('down');
         }
         break;
      case 'right':
         if(typeof(command[i+1])=='number')
         {
            if (st&&character.x+command[i+1]<10){
               Fx=character.x+command[i+1];
               st=false;
            }
               AnimationGo ('right');
         }         
         break;
      case 'left':   
            if (typeof(command[i+1])=='number')
            {
               // console.log(character.x,command[i+1]);
               if (st&&character.x-command[i+1]>-1){
                  Fx=character.x-command[i+1];
                  st=false;
               }
               AnimationGo ('left');
            }
         break;
      case 'raise': //поднять. 2 слово сторона от персонажа
         if (command[i+1]=="down"){
            [map, backpack.coin, backpack.bush, backpack.dream]=actionsFun.raiseAction(character.x,character.y+1, map, backpack.coin, backpack.bush, backpack.dream);
            next =true;
            break;
         }
         if (command[i+1]=="up"){
            [map, backpack.coin, backpack.bush, backpack.dream]=actionsFun.raiseAction(character.x,character.y-1, map, backpack.coin, backpack.bush, backpack.dream);
            next =true;
            break;
         }
         if (command[i+1]=='left'){
            [map, backpack.coin, backpack.bush, backpack.dream]=actionsFun.raiseAction(character.x-1,character.y, map, backpack.coin, backpack.bush, backpack.dream);
            next =true;
            break;
         }
         if (command[i+1]=="right"){
            [map, backpack.coin, backpack.bush, backpack.dream]=actionsFun.raiseAction(character.x+1,character.y, map, backpack.coin, backpack.bush, backpack.dream);
            next =true;
            break;
         }
      case 'drop': //кинуть. Команда что куда сколкько
         if (typeof(command[i+3])=='number'){
            if (command[i+1]=="coin" && backpack.coin>0){
            switch (command[i+2]){
               case 'up': 
                  [backpack.coin, map, speaksNow.what, speaksNow.why, actionEyes.active, situationMagician.active, situationMagician.must]=actionsFun.dropAction(character.x, character.y-Number(command[i+3]),backpack.coin,"coin", map, speaksNow.what, speaksNow.why, actionEyes.nowY, actionEyes.nowX, actionEyes.active, situationMagician.active, situationMagician.must);
                  break;
               case 'down':
                  [backpack.coin, map, speaksNow.what, speaksNow.why, actionEyes.active, situationMagician.active, situationMagician.must]=actionsFun.dropAction(character.x, character.y+Number(command[i+3]),backpack.coin,"coin", map, speaksNow.what, speaksNow.why, actionEyes.nowY, actionEyes.nowX, actionEyes.active, situationMagician.active, situationMagician.must);
                  break;
               case 'right':
                  [backpack.coin, map, speaksNow.what, speaksNow.why, actionEyes.active, situationMagician.active, situationMagician.must]=actionsFun.dropAction(character.x+Number(command[i+3]), character.y,backpack.coin,"coin", map, speaksNow.what, speaksNow.why, actionEyes.nowY, actionEyes.nowX, actionEyes.active, situationMagician.active, situationMagician.must);         
                  break;
               case 'left':   
                  [backpack.coin, map, speaksNow.what, speaksNow.why, actionEyes.active, situationMagician.active, situationMagician.must]=actionsFun.dropAction(character.x-Number(command[i+3]), character.y,backpack.coin,"coin", map, speaksNow.what, speaksNow.why, actionEyes.nowY, actionEyes.nowX, actionEyes.active, situationMagician.active, situationMagician.must);
                  break;
               }
            next =true;
            }
            if (command[i+1]=="bush" && backpack.bush>0){
               switch (command[i+2]){
                  case 'up': 
                     [backpack.bush, map, speaksNow.what, speaksNow.why, actionEyes.active, situationMagician.active, situationMagician.must]=actionsFun.dropAction(character.x, character.y-Number(command[i+3]),backpack.bush,"bush", map, speaksNow.what, speaksNow.why, actionEyes.nowY, actionEyes.nowX, actionEyes.active, situationMagician.active, situationMagician.must);
                     break;
                  case 'down':
                     [backpack.bush, map, speaksNow.what, speaksNow.why, actionEyes.active, situationMagician.active, situationMagician.must]=actionsFun.dropAction(character.x, character.y+Number(command[i+3]),backpack.bush,"bush", map, speaksNow.what, speaksNow.why, actionEyes.nowY, actionEyes.nowX, actionEyes.active, situationMagician.active, situationMagician.must);
                     break;
                  case 'right':
                     [backpack.bush, map, speaksNow.what, speaksNow.why, actionEyes.active, situationMagician.active, situationMagician.must]=actionsFun.dropAction(character.x+Number(command[i+3]), character.y,backpack.bush,"bush", map, speaksNow.what, speaksNow.why, actionEyes.nowY, actionEyes.nowX, actionEyes.active, situationMagician.active, situationMagician.must);        
                     break;
                  case 'left':   
                     [backpack.bush, map, speaksNow.what, speaksNow.why, actionEyes.active, situationMagician.active, situationMagician.must]=actionsFun.dropAction(character.x-Number(command[i+3]), character.y,backpack.bush,"bush", map, speaksNow.what, speaksNow.why, actionEyes.nowY, actionEyes.nowX, actionEyes.active, situationMagician.active, situationMagician.must); 
                     break;
                  }
            next =true;
            }
         }
         st=false;
         j+=2;
      break;
      case 'hit': //Если кто-то рядом, то удар убивает 
         switch (command[i+1]){
            case 'up': 
               [map, speaksNow.what, speaksNow.why, actionEyes.live]=actionsFun.hitAction(character.x, character.y-1, map, speaksNow.what, speaksNow.why, actionEyes.live);
               break;
            case 'down':
               [map, speaksNow.what, speaksNow.why, actionEyes.live]=actionsFun.hitAction(character.x, character.y+1, map, speaksNow.what, speaksNow.why, actionEyes.live);
               break;
            case 'right':
               [map, speaksNow.what, speaksNow.why, actionEyes.live]=actionsFun.hitAction(character.x+1, character.y, map, speaksNow.what, speaksNow.why, actionEyes.live);        
               break;
            case 'left':   
               [map, speaksNow.what, speaksNow.why, actionEyes.live]=actionsFun.hitAction(character.x-1, character.y, map, speaksNow.what, speaksNow.why, actionEyes.live);
               break;
         }
         next =true;
         st=false;
         break;
      case 'give': //команда что куда 
         if (command[i+1]=="coin" && backpack.coin>0){
            switch (command[i+2]){
               case 'up': 
                  [backpack.coin, map, speaksNow.what, speaksNow.why]=actionsFun.giveAction(character.x, character.y-1,backpack.coin, map, speaksNow.what, speaksNow.why);
                  next =true;
                  break;
               case 'down':
                  [backpack.coin, map, speaksNow.what, speaksNow.why]=actionsFun.giveAction(character.x, character.y+1,backpack.coin, map, speaksNow.what, speaksNow.why);
                  next =true;
                  break;
               case 'right':
                  [backpack.coin, map, speaksNow.what, speaksNow.why]=actionsFun.giveAction(character.x+1, character.y,backpack.coin, map, speaksNow.what, speaksNow.why);
                  next =true;
                  break;
               case 'left':   
                  [backpack.coin, map, speaksNow.what, speaksNow.why]=actionsFun.giveAction(character.x-1, character.y,backpack.coin, map, speaksNow.what, speaksNow.why);
                  next =true;
                  break;
               default:
                  next = false;
            }
         }
         if (command[i+1]=="bush" && backpack.bush>0){
            switch (command[i+2]){
               case 'up': 
                  [backpack.bush, map, speaksNow.what, speaksNow.why]=actionsFun.giveAction(character.x, character.y-1,backpack.bush, map, speaksNow.what, speaksNow.why);
                  next =true;
                  break;
               case 'down':
                  [backpack.bush, map, speaksNow.what, speaksNow.why]=actionsFun.giveAction(character.x, character.y+1,backpack.bush, map, speaksNow.what, speaksNow.why);
                  next =true;
                  break;
               case 'right':
                  [backpack.bush, map, speaksNow.what, speaksNow.why]=actionsFun.giveAction(character.x+1, character.y,backpack.bush, map, speaksNow.what, speaksNow.why);
                  next =true;
                  break;
               case 'left':   
                  [backpack.bush, map, speaksNow.what, speaksNow.why]=actionsFun.giveAction(character.x-1, character.y,backpack.bush, map, speaksNow.what, speaksNow.why);
                  next =true;
                  break;
               default:
                  next = false;
            }
         }
         // st=false;  
         j+=1;
         break;
      case 'backpackShow': //Показывает предметы в рюкзаке
         speaksNow.what="backpac";
         speaksNow.why="people";
         // i++;
         j-=1;
         st=false;
         next =true;
         break;
      case 'restart': //начать заново
         let [open,now]=LDFun.readingCookies();
         levelElement(now);
         // next = true;
         await new Promise(r => setTimeout(
            () => {
               // draw();
               return 0;
            },
            1 * 1000
            ));
         break;
      default:
         next = false;
         break;
   }
   if(!next){
      // console.log("Здесь");
      // character.step=false;
      speaksNow.what="cannot";
      speaksNow.why="people";
      imgCharacter.position= 0;
      imgCharacter.command="down";
         
      await new Promise(r => setTimeout(
         () => {
            draw();
            // return 0;
         },
         1 * 1000
         ));
      
   }
   if(LDFun.winConditions(character.x, character.y, map, backpack.dream)){
      let [open,now]=LDFun.readingCookies();
      if (now!=5){
         console.log(now, typeof(now));
         LDFun.openNewLevel();
         character.step=false;
         speaksNow.what="goNextLevel";
         speaksNow.why="people";
         if (command[i]=='right')
            {imgCharacter.position= 1;}
         else
            {imgCharacter.position= 0;}
      }
      else{
         character.step=false;
         speaksNow.what="victory";
         speaksNow.why="people";
         imgCharacter.position= 0;
         imgCharacter.command="sleep";
      }
      
         
         await new Promise(r => setTimeout(
            () => {
               draw();
               return 0;
            },
            1 * 1000
            ));
   }
   if (character.x==Fx && character.y==Fy)
   { 

      if((command.length==i+2 && (command[i]=='up'||command[i]=='down'||command[i]=='right'||command[i]=='left'||command[i]=='hit'||command[i]=='raise')) 
      ||(command[i]=='drop'&& command.length==i+4)
      ||(command[i]=='give'&& command.length==i+3)
      ||((command[i]=='backpackShow'||command[i]=='restart')&& command.length==i+1))
      
      {
         if (command[i]!='restart'){
            if (command[i]=='right')
               {imgCharacter.position= 1;}
            else
               {imgCharacter.position= 0;}
         }
         else{
            character.step=true;
         }
         await new Promise(r => setTimeout(
            () => {
               draw();
               return 0;
            },
            1 * 1000
            ));

      }
      else{            
         j+=2;
         st=true;
      }
   }  
   if (next){
      
      if ((command.length>i+2 && (command[i]=='up'||command[i]=='down'||command[i]=='right'||command[i]=='left'||command[i]=='hit'||command[i]=='raise'))
      ||(command[i]=='drop'&& command.length>i+4)
      ||(command[i]=='give'&& command.length>i+3)
      ||((command[i]=='backpackShow'||command[i]=='restart') && command.length>i)
      ||(character.x!=Fx || character.y!=Fy)) 
         {
            await new Promise(r => setTimeout(
         () => {
            draw();
            next = false;
            action(command, j, st);
         },
         1 * 1000
         ));}
   }
   next = false;
}
function execution(){
   let command = document.getElementById('code').value.split(/["\n"]|[" "]/);
   // console.log(command,character);
   if(character.step)
   {
      const regNum = new RegExp('[0-9]');
      for (let k=0; k<command.length; k++)
      {
         if (regNum.test(command[k]))
         {
            command[k]=parseInt(command[k]);
         }
      }
      action(command, 0, true)
   }
   else{
      if(command[0]=="restart"&&command.length==1){
         character.step=true;
         action(command, 0, true);
      }
      else
      {
         speaksNow.what="blockingSteps";
         speaksNow.why="people";
      }
   }
   // console.log("!!!");

} 
export function levelAction(num){
   let [open,now]=LDFun.readingCookies();
   if (open>=num){
      var reg = new XMLHttpRequest();
      reg.open('GET', 'c.php', false);
      reg.send();  
      document.cookie="now="+String(num);
      levelElement(num);
      draw();
   }
   else{
      speaksNow.what="closedLevel";
      speaksNow.why="people";
      LDFun.Dialog(speaksNow.what,speaksNow.why, backpack.coin, backpack.bush, backpack.dream);
   }
}
function levelElement(now){
   switch(now){
      case 1: 
         map=[
            [0,0,6,0,0,0,0,0,0,0],
            [0,0,6,0,0,0,0,0,0,0],
            [0,0,4,0,0,0,0,0,0,0],
            [6,6,0,0,0,0,3,0,0,1],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
         ];
         situationMagician={"active":false, "side":"left", "must":2,"live":false};
         actionEyes={"must":2, "nowX":4, "nowY":2, "may":"down", "state":0, "active":0, "live":false};
         speaksNow={"why":"people", "what":"start"};
         character = {x:9,y:3,"step":true};
         imgCharacter = {command: "left",position: 2};
         backpack={"coin":0, "bush":0, "dream":0};
         break;
      case 2: 
         map=[
            [6,0,6,6,6,6,6,0,0,0],
            [6,0,6,0,0,0,6,0,0,6],
            [6,6,0,0,6,0,0,6,6,0],
            [0,0,0,6,6,6,0,0,0,1],
            [6,0,6,0,0,0,0,6,6,0],
            [6,6,0,6,6,6,6,0,0,6]
         ];
         situationMagician={"active":false, "side":"left", "must":2,"live":false};
         actionEyes={"must":2, "nowX":4, "nowY":2, "may":"down", "state":0, "active":0, "live":false};
         speaksNow={"why":"people", "what":"levelTwo"};
         character = {x:9,y:3,"step":true};
         imgCharacter = {command: "left",position: 2};
         backpack={"coin":0, "bush":0, "dream":0};
         break;
      case 3:
         map=[
            [0,0,0,6,7,7,7,7,7,7],
            [0,0,0,6,0,0,0,0,0,0],   
            [0,0,0,6,8,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,6,0,0,0,0,0,0],
            [0,0,0,6,7,7,7,7,7,7]
         ]
         situationMagician={"active":false, "side":"left", "must":2,"live":false};
         actionEyes={"must":2, "nowX":4, "nowY":2, "may":"down", "state":0, "active":0, "live":true};
         speaksNow={"why":"people", "what":"levelThree"};
         character = {x:9,y:3,"step":true};
         imgCharacter = {command: "left",position: 2};
         backpack={"coin":0, "bush":0, "dream":0};
         break;
      case 4:
         map=[
            [7,0,0,0,0,0,7,0,7,0],
            [0,0,0,7,0,0,0,7,0,0],   
            [0,0,7,0,0,0,7,0,0,7],
            [10,0,0,0,0,0,0,0,0,0],
            [2,0,0,0,0,0,0,0,0,0],
            [0,0,0,7,0,0,7,7,7,0]
         ]
         situationMagician={"active":true, "side":"left", "must":2,"live":true};
         actionEyes={"must":2, "nowX":4, "nowY":2, "may":"down", "state":0, "active":0, "live":false};
         speaksNow={"why":"people", "what":"levelFour"};
         character = {x:9,y:3,"step":true};
         imgCharacter = {command: "left",position: 2};
         backpack={"coin":0, "bush":0, "dream":0};
         break;
      case 5:
         map=[
            [13,0,6,7,7,7,7,7,6,6],
            [0,0,6,3,3,3,0,6,7,7],   
            [0,0,6,4,4,4,8,6,7,7],
            [0,0,0,0,2,4,0,0,0,0],
            [6,6,6,4,4,4,0,6,7,7],
            [0,0,0,0,0,0,0,6,7,7]
         ]
         // map=[
         //    [13,0,6,7,7,7,7,7,6,6],
         //    [0,0,6,0,3,3,0,6,7,7],   
         //    [0,0,6,0,0,0,0,6,7,7],
         //    [0,0,0,0,0,0,0,0,0,0],
         //    [6,6,6,0,0,0,0,6,7,7],
         //    [0,0,0,0,0,0,0,6,7,7]
         // ]
         situationMagician={"active":true, "side":"left", "must":2,"live":true};
         actionEyes={"must":2, "nowX":6, "nowY":2, "may":"down", "state":0, "active":0, "live":true};
         // situationMagician={"active":false, "side":"left", "must":2,"live":false};
         // actionEyes={"must":2, "nowX":6, "nowY":2, "may":"down", "state":0, "active":0, "live":false};
         speaksNow={"why":"people", "what":"levelFive"};
         character = {x:9,y:3,"step":true};
         imgCharacter = {command: "left",position: 2};
         backpack={"coin":0, "bush":0, "dream":0};
         break;
   }
}
export function startMove(){
   execution();
   draw();
}
window.onload=start();