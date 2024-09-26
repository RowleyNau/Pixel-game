//предметы
function drawStone(ctx, x, y, imgStone){
    ctx.drawImage(imgStone,x*100,y*100);
}
function drawBush(ctx, x, y, imgBush){
    ctx.drawImage(imgBush,x*100,y*100);
}
function drawFire(ctx, x, y, imgFire){
    ctx.drawImage(imgFire,x*100,y*100);
}
function drawFireball(ctx, x, y, imgFireball){
    ctx.drawImage(imgFireball,x*100+25,y*100+25);
}
function drawCoin(ctx, x, y, imgCoin){
    ctx.drawImage(imgCoin,x*100+25,y*100+25);
}
function drawDream(ctx, x, y, imgDream){
    ctx.drawImage(imgDream,x*100,y*100);
}
function drawBedroom(ctx, x, y, imgFloor, imgBed){
    for (let i=0; i<4; i++)
    {
      for (let j=0; j<2; j++)
      {
       ctx.drawImage(imgFloor,j*100,i*100);
      }
    }
    ctx.drawImage(imgBed,x*100,y*100);
}
function drawPoints(ctx, x, y, imgPoints){
    ctx.drawImage(imgPoints,x*100+25,y*100-25);
}

//персонажи
function drawMagician(ctx, x, y, imgMagician){
    ctx.drawImage(imgMagician,x*100,y*100);
}
function drawWarrior(ctx, x, y, imgWarrior){
    ctx.drawImage(imgWarrior,x*100,y*100);
}
function drawCharacter(ctx, command, peopleSPRT, imgPeopleSleeping, position, x, y){
    switch (command)
    {
       case "left": 
          ctx.drawImage(peopleSPRT, 53.5*position, 80*2, 53.5, 80, x*100+25,y*100+5,53.5,80);
          break;
 
       case "right": 
          ctx.drawImage(peopleSPRT, 53.5*position, 80*3, 53.5, 80, x*100+25,y*100+5,53.5,80);
          break;
 
       case "down": 
          ctx.drawImage(peopleSPRT, 53.5*position, 0, 53.5, 80, x*100+25,y*100+5,53.5,80);
          break;
 
       case "up": 
          ctx.drawImage(peopleSPRT, 53.5*position, 80, 53.5, 80, x*100+25,y*100+5,53.5,80);
          break;
       case "sleep": 
          ctx.drawImage(imgPeopleSleeping, x*100, y*100);
          break;
    }
}
function drawEye1(ctx,imgEyesSprite, may, nowX, nowY){
    switch (may)
    {
       case "left": 
          ctx.drawImage(imgEyesSprite, 100, 0, 100, 80,nowX*100,nowY*100+15,100,80);
          
          break;
 
       case "right": 
          ctx.drawImage(imgEyesSprite, 0, 0, 100, 80, nowX*100,nowY*100+15,100,80);
          break;
 
       case "down": 
          ctx.drawImage(imgEyesSprite, 200, 0, 100, 100, nowX*100,nowY*100,100,100);
          break;
 
       case "up": 
          ctx.drawImage(imgEyesSprite, 285, 0, 100, 100, nowX*100,nowY*100,100,100);
          break;
    }
}
function drawEye2(ctx,imgEyesSprite, may, nowX, nowY){
switch (may)
{
    case "left": 
        ctx.drawImage(imgEyesSprite, 100, 100, 100, 80,nowX*100,nowY*100+10,100,80);
        break;

    case "right": 
        ctx.drawImage(imgEyesSprite, 0, 100, 100, 80,nowX*100,nowY*100+10,100,80);
        break;

    case "down": 
        ctx.drawImage(imgEyesSprite, 210, 100, 90, 100,nowX*100+15,nowY*100,90,100);
        break;

    case "up": 
        ctx.drawImage(imgEyesSprite, 300, 100, 100, 100,nowX*100+10,nowY*100,100,100);
        break;
}
}

//фаерболы мага
function magicianAction(a, map, x, y){
    map= lightsClearing(map);
    switch(a){
       case "up": 
          a="right"; 
          lightingArrangement(x+11, 0, map[0].length-1, map.length-1, map);
          break;
       case "right": 
          a="down"; 
          lightingArrangement(0, y+1, map[0].length-1, map.length-1, map);
          break;
       case "down": 
          a="left"; 
          lightingArrangement(0, 0, x-1, map.length-1, map);
          break;
       case "left": 
          a="up"; 
          lightingArrangement(0, 0, map[0].length-1, y-1, map);
          break;
    }
    return [a, map];
}
//не на экспорт
function lightsClearing(map){
    for (let i=0; i<map.length; i++)
    {
      for (let j=0; j<map[i].length; j++)
      {
       if(map[i][j]==11)
       {
          map[i][j]=0;
       }
      }
    }
    return map;  
}
 //не на экспорт
function lightingArrangement(x, y, x1, y1, map){
    if(x<map[0].length&&x>=0&&x1<map[0].length&&x1>=0&&y<map.length&&y>=0&&y1<map.length&&y1>=0)
    {   for (let i=y; i<=y1; i++)
       {
          for (let j=x; j<=x1; j++)
          {
             if(map[i][j]==0||map[i][j]==1)
             {
                map[i][j]=11;
             }
          }
       }
    }  
}


export {drawStone,drawBush, drawFire, drawFireball, drawCoin, drawDream, drawBedroom, drawPoints, drawWarrior, drawCharacter, drawEye1, drawEye2, drawMagician, magicianAction};