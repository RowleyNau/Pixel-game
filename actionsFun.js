function dropAction(x, y, a, anName, map, what, why, eyesNowY, eyesNowX, eyesActive, magActive, magMust){
    if (map[y][x]==0){
       a--;
       if(anName=="coin")
       map[y][x]=3;
       if(anName=="bush")
       map[y][x]=7;
    } 
    if (y==eyesNowY&&x==eyesNowX){
       a--;
       //добавить 3 точки и остановить действия глаза на 2 шага 
       eyesActive=3;
    }    
    if (map[y][x]==4){
       a--;
       what="warriorWhat";
       why="warrior";
    }    
    if (map[y][x]==2){
       a--;
       what="nothing";
       why="magician";
       magActive=false;
       magMust=2;
    }
    if (map[y][x]==6 || map[y][x]==7){
       what="cannot";
       why="people";
    } 
    return [a, map, what, why, eyesActive, magActive, magMust];    
}
function hitAction(x, y, map, what, why, live){
    if (map[y][x]==0){
       what="opponentAir";
       why="people";
    }    
    if (map[y][x]==4){
       what="nothing";
       why="warrior";
    }   
    if (map[y][x]==2){
       what="nothing";
       why="magician";
    } 
    if (map[y][x]==6||map[y][x]==7){
       what="opponentSubject";
       why="people";
    }
    if (map[y][x]==8){
       map[y][x]=0;
       live=false;
       what="opponentEye";
       why="people";
    } 
    return [map, what, why, live];
}
function giveAction(x, y, a, map, what, why){
    console.log(a);
    if (map[y][x]==0||map[y][x]==6||map[y][x]==7){
       what="cannot";
       why="people";
    }    
    if (map[y][x]==4){
       what="warrior";
       why="warrior";
       map[y][x]=0;
       console.log("подкупили");
       a--;
    }   
    if (map[y][x]==2){
       what="nothing";
       why="magician";
    } 
    if (map[y][x]==8){
       what="nothing";
       why="eye";
    }
    return [a, map, what, why]; 
}
function raiseAction(x, y, map, coin, bush, dream){
    switch (map[y][x])
    {
       case 3:
          map[y][x]=0;
          coin+=1;
          break;
       case 7:
          map[y][x]=0;
          bush+=1;         
          break;
       case 10:
          map[y][x]=0;
          dream+=1;         
          break;
    }
    return [map, coin, bush, dream];    
}
export {dropAction, hitAction, giveAction, raiseAction};