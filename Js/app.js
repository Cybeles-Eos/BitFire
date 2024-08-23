
// Game State
let gameEnded = false;

// Sounds  
const fightMusic = document.getElementById("fightMusic");
const atckBtnSound = document.getElementById("atckbtn-sound");
const hitSound = document.getElementById("hit");
const someBtnSound = document.getElementById("somebtn-sound");

function sBtnsound(){
   someBtnSound.play();
   someBtnSound.volume = .3;
}
function resetFightMusic(){
   fightMusic.play();
   fightMusic.currentTime = 0;
   fightMusic.volume = 0.1;
}

// Attack Btn 
const atckBtn = document.querySelector('.btn');

const gstart = document.querySelector('.gameStart');
atckBtn.style.display = 'none';
// Disable the event if the game started:
function gamestart(){
   setTimeout(()=>{
      atckBtn.style.display = 'block';
      document.querySelector('.characterUser').style.opacity = 1;
      document.querySelector('.characterEnemy').style.opacity = 1;
      document.querySelector('.grass').style.opacity = 1;

      gstart.classList.add('starGame');
      if(gstart.classList.contains('starGame')){
         gstart.removeEventListener('click', gamestart);     
      }
   }, 1000);
}
gstart.addEventListener('click', gamestart); 

// Character Container
const usercharContainer = document.querySelector('.characterUser');
const enemycharContainer = document.querySelector('.characterEnemy');

// Character
const userchar = document.querySelector('.userchar');
const enemychar = document.querySelector('.enemychar');

// Character Skill
const userCharSkill = document.querySelector('.userSkill');
const enemyCharSkill = document.querySelector('.enemySkill');

// Character Hp :
const virtualUserHp = document.querySelector('.userHp');
const virtualEnemyHp = document.querySelector('.enemyHp');
let userHp = 90;
let enemyHp = 90;

// Score
const virtualWinCount = document.getElementById('winCount');
const virtualLoseCount = document.getElementById('loseCount'); 
let wincount = JSON.parse(localStorage.getItem("winCountSave"));
let losecount = JSON.parse(localStorage.getItem("loseCountSave"));   
function updateScore(){
   virtualWinCount.textContent = `${wincount <= 0 ? 0 : wincount}`;
   virtualLoseCount.textContent = `${losecount <= 0 ? 0 : losecount}`;
}
updateScore();

// Skills :
const skills = [
   {  
      name: 'Bullet',
      damage: 8,
      imgStart: 'Bullet.png',
      imgEnd: 'BulletGone.png',
      imgSizeSt: '1rem',
      imgSizeEn: '2rem'
   },
   {
      name: 'FireBall',
      damage: 13,
      imgStart: 'FireBall.gif',
      imgEnd: 'FireBallGone.gif',
      imgSizeSt: '1.8rem',
      imgSizeEn: '2rem'
   }
];

// Game Functions :
function charChangeAppearanceAtck(char, sTime = 0, charSkill, skill){
   // Char Atck Time
   setTimeout(()=>{
      char.src = 'Images/AtckTrunk.gif';
      char.style.width = '6.8rem';
   }, sTime);
   charSkill.src = `Images/${skill.imgStart}`;
   charSkill.style.width = skill.imgSizeSt;
}

function characterAtck(charSkill, atckActive, fSt, sSt, skill, charHp){
   // Time Of Bullet
   setTimeout(()=>{
      charSkill.classList.add(`${atckActive}`);
   },fSt);

   // BulletHit
   setTimeout(()=>{
      if(!gameEnded && charHp > 0){ // Check if game is not ended and character has HP
         hitSound.play();
         hitSound.volume = .4;
      } else {
         hitSound.pause();
         hitSound.volume = 0;
      }

      charSkill.src = `Images/${skill.imgEnd}`;
      charSkill.style.width = skill.imgSizeEn; // For SkillEnd Size

      setTimeout(()=>{
         if (navigator.vibrate) {
            // Trigger a vibration pattern: 300ms of vibration
            navigator.vibrate(300);
         }
         charSkill.src = '';
         charSkill.classList.remove(`${atckActive}`);
      },200);
   },sSt);
}

function charChangeAppearanceIdle(char, sTime){
   // Reset Char To Idle Time
   setTimeout(()=>{
      char.src = 'Images/IdleTrunk.gif';
      char.style.width = '6.5rem';
   }, sTime);
}

// Main Function Of The Game :
function userShot(){
   atckBtnSound.play();
   atckBtnSound.volume = .3;
   atckBtn.classList.add('turnEnd');

   //User Attack :
   let userIndex = Math.floor(Math.random() * skills.length);
   let enemyIndex = Math.floor(Math.random() * skills.length);
 

   charChangeAppearanceAtck(userchar, 0, userCharSkill, skills[userIndex]);
   characterAtck(userCharSkill, 'userAtckActivate', 700, 1200, skills[userIndex], userHp);
   
   // User Hit The Enemy
   setTimeout(()=>{
      enemyHp -= skills[userIndex].damage;
      virtualEnemyHp.style.width = `${enemyHp}%`;

      if(enemyHp <= 0){
         gameEnded = true; // Mark the game as ended
         wincount++;
         localStorage.setItem("winCountSave", JSON.stringify(wincount));
         updateScore();
         enemycharContainer.style.display = 'none';
         atckBtn.style.display = "none";
         userHp = 90;

         document.querySelector('.win-box').classList.add('activatePopup');
         document.querySelector('.win-box').addEventListener('click', ()=>{
            sBtnsound();
            setTimeout(()=>{
               gameEnded = false; // Reset game state
               userHp = 90;
               enemyHp = 90;
               virtualEnemyHp.style.width = `${enemyHp}%`;
               virtualUserHp.style.width = `${userHp}%`;
               
               enemycharContainer.style.display = 'block';
               atckBtn.style.display = "block";
               document.querySelector('.win-box').classList.remove('activatePopup');
            }, 1300);
         });
      }
   }, 1200);
   charChangeAppearanceIdle(userchar, 1200);

   // Enemy Attack :
   charChangeAppearanceAtck(enemychar, 1500, enemyCharSkill, skills[enemyIndex]);
   characterAtck(enemyCharSkill, 'enemyAtckActivate', 2200, 2700, skills[enemyIndex], enemyHp);
   
   // Enemy Hit The User
   setTimeout(()=>{
      userHp -= skills[enemyIndex].damage;
      virtualUserHp.style.width = `${userHp}%`;

      if(userHp <= 0){
         gameEnded = true; // Mark the game as ended
         losecount++;
         localStorage.setItem("loseCountSave", JSON.stringify(losecount));
         updateScore();
         usercharContainer.style.display = 'none';
         atckBtn.style.display = "none";
         enemyHp = 90;
         
         document.querySelector('.lose-box').classList.add('activatePopup');
         document.querySelector('.lose-box').addEventListener('click', ()=>{
            sBtnsound();
            setTimeout(()=>{
               gameEnded = false; // Reset game state
               userHp = 90;
               enemyHp = 90;
               virtualEnemyHp.style.width = `${enemyHp}%`;
               virtualUserHp.style.width = `${userHp}%`;

               usercharContainer.style.display = 'block';
               atckBtn.style.display = "block";
               document.querySelector('.lose-box').classList.remove('activatePopup');
            }, 1500);  
         });
      } 
   }, 2700);
   charChangeAppearanceIdle(enemychar, 2800);

   // Time For UserApp To Atck Button 🎫
   setTimeout(()=>{
      atckBtn.style.opacity = 1;
      atckBtn.addEventListener('click', userShot);
      atckBtn.classList.remove('turnEnd');
   }, 3300);
   atckBtn.removeEventListener('click', userShot);
   atckBtn.style.opacity = 0.5;
}
atckBtn.addEventListener('click', userShot);

// Setting
const settingMenu = document.querySelector('.setting-menus');
const resetScores = document.getElementById('resetScore');
const muteSound = document.getElementById('muteSound');
let muteS = true;
function remadd(active, deactive, rotStart, rotEnd){
   settingMenu.classList.remove(active);
   settingMenu.classList.add(deactive);
   document.querySelector('.settingIcon').classList.remove(rotStart);
   document.querySelector('.settingIcon').classList.add(rotEnd);
}
document.querySelector('.setting').addEventListener('click', ()=>{
   sBtnsound();
   if(settingMenu.classList.contains('activeMenu')){
      remadd('activeMenu', 'deactiveMenu', 'rotSetStart', 'rotSetEnd');
   }else{
      remadd('deactiveMenu', 'activeMenu', 'rotSetEnd', 'rotSetStart');
   }
});

resetScores.addEventListener('click',()=>{
   sBtnsound();
   localStorage.removeItem("winCountSave");
   localStorage.removeItem("loseCountSave");  
   wincount = 0;
   losecount = 0;
   updateScore();
});

muteSound.addEventListener('click',()=>{
   sBtnsound();
   muteS = !muteS;

   if(muteS){
      muteSound.textContent = 'Play Sound';
      setTimeout(() => {
         fightMusic.volume = 0.0;
      }, 100);
   }else{
      muteSound.textContent = 'Mute Sound';
      setTimeout(() => {
         fightMusic.play();
         fightMusic.loop = true; 
         fightMusic.volume = 0.1;
      }, 100);
   }
});









