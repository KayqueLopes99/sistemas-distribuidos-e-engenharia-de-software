/* Config */
const GRID = 7;
const START_MONEY = 1500;
const NUM_PLAYERS = 6;

/* estado */
const grid = [];
const pathCoords = [];
let properties = [];
let players = [];
let current = 0;
let canBuy = false;

/* DOM */
const boardEl = document.getElementById('board');
const playersEl = document.getElementById('players');
const logEl = document.getElementById('log');
const rollBtn = document.getElementById('rollBtn');
const buyBtn = document.getElementById('buyBtn');
const endBtn = document.getElementById('endBtn');
const playerInfoEl = document.getElementById('player-info');

/* NOVO: DOM do Modal */
const nameModalOverlay = document.getElementById('name-modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalInput = document.getElementById('modal-input');
const modalOkBtn = document.getElementById('modal-ok-btn');

/* Funções do Jogo (sem modificações) */
function createGridAndPath(){
  for(let r=0;r<GRID;r++){ grid[r]=[]; for(let c=0;c<GRID;c++){ const cell = document.createElement('div'); cell.className='cell'; boardEl.appendChild(cell); grid[r][c]=cell; } }
  pathCoords.length = 0;
  for(let c=0;c<GRID;c++) pathCoords.push({r:0,c:c});
  for(let r=1;r<GRID;r++) pathCoords.push({r:r,c:GRID-1});
  for(let c=GRID-2;c>=0;c--) pathCoords.push({r:GRID-1,c:c});
  for(let r=GRID-2;r>=1;r--) pathCoords.push({r:r,c:0});
}
function createProperties(){
  const names = ['Início','Avenida 1','Sorte/Revés','Avenida 2','Imposto','Avenida 3','Cadeia/Visita','Avenida 4','Avenida 5','Sorte/Revés','Avenida 6','Imposto','Avenida 7','Parada Livre','Avenida 8','Sorte/Revés','Avenida 9','Avenida 10','Imposto','Avenida 11','Sorte/Revés','Avenida 12','Avenida 13','Multa'];
  properties = names.map((name,i) => {
    const special = /Sorte|Imposto|Cadeia|Início|Parada|Multa/i.test(name);
    return {id: i, name, price: special ? 0 : 100+((i*10)%300), rent: special?0:Math.max(10,Math.floor((100+((i*10)%300))/6)), owner:null};
  });
  for(let i=0;i<properties.length;i++){
    const {r,c} = pathCoords[i]; const cell = grid[r][c]; cell.dataset.pos = i;
    cell.innerHTML = `<div class="prop-name">${properties[i].name}</div>${properties[i].price?`<div class="prop-price">R$ ${properties[i].price}</div>`:''}`;
    if(/Início/i.test(properties[i].name)) cell.classList.add('special-inicio'); if(/Cadeia/i.test(properties[i].name)) cell.classList.add('special-cadeia'); if(/Sorte/i.test(properties[i].name)) cell.classList.add('special-sorte'); if(/Imposto|Multa/i.test(properties[i].name)) cell.classList.add('special-imposto'); if(/Parada/i.test(properties[i].name)) cell.classList.add('special-parada');
    if(/Início|Cadeia|Parada|Multa|Imposto/i.test(properties[i].name)){ cell.classList.add('corner');}
  }
}
function showPlayerInfo(playerId) {
  const player = players.find(p => p.id === playerId); if (!player) return;
  const ownedProperties = properties.filter(prop => prop.owner === playerId).map(prop => prop.name).join(', ');
  playerInfoEl.innerHTML = `<strong style="color:${player.color};">${player.name}</strong><span><strong>💰 Dinheiro:</strong> R$ ${player.money}</span><span><strong>🏠 Propriedades:</strong> ${ownedProperties||'Nenhuma'}</span>`;
}
function renderPlayersUI(){
  document.querySelectorAll('.token').forEach(t=>t.remove()); const placedCount={};
  players.forEach(p=>{
    if(p.bankrupt) return; const pos=p.pos; placedCount[pos]=(placedCount[pos]||0)+1; const {r,c}=pathCoords[pos]; const cell=grid[r][c];
    const token=document.createElement('div'); token.className='token'; token.style.background=p.color;
    const offset=placedCount[pos]-1; token.style.left=(6+(offset*18))+'px'; token.style.top=(6)+'px'; token.title=p.name;
    token.dataset.playerId=p.id;
    token.addEventListener('click',(e)=>{ e.stopPropagation(); const id=parseInt(e.currentTarget.dataset.playerId); showPlayerInfo(id);});
    cell.appendChild(token);
  });
  playersEl.innerHTML='';
  players.forEach((p,idx)=>{
    const div=document.createElement('div'); div.className='player-line';
    div.innerHTML=`<div style="display:flex;gap:8px;align-items:center"><div style="width:12px;height:12px;border-radius:50%;background:${p.color}"></div><strong>${p.name}</strong></div><div>${p.bankrupt?'<em>Falido</em>':'R$ '+p.money}${current===idx?' ← turno':''}</div>`;
    playersEl.appendChild(div);
  });
}
function renderOwners(){
  properties.forEach((prop,i)=>{ const {r,c}=pathCoords[i]; const cell=grid[r][c]; cell.style.background=""; cell.classList.remove("owned"); });
  properties.forEach((prop,i)=>{
    const {r,c}=pathCoords[i]; const cell=grid[r][c]; if(prop.owner!==null){ const color=players[prop.owner].color; cell.style.background=color; cell.classList.add("owned");}
    else{ if(/Início/i.test(prop.name)) cell.classList.add('special-inicio'); if(/Cadeia/i.test(prop.name)) cell.classList.add('special-cadeia'); if(/Sorte/i.test(prop.name)) cell.classList.add('special-sorte'); if(/Imposto|Multa/i.test(prop.name)) cell.classList.add('special-imposto'); if(/Parada/i.test(prop.name)) cell.classList.add('special-parada');}
  });
  document.querySelectorAll('.owner-tag').forEach(t=>t.remove());
  properties.forEach((prop,i)=>{ if(prop.owner!==null){ const {r,c}=pathCoords[i]; const cell=grid[r][c]; const tag=document.createElement('div'); tag.className='owner-tag'; tag.textContent=players[prop.owner].name; cell.appendChild(tag);} });
}
function log(msg){ const d=document.createElement('div'); d.textContent=`[${new Date().toLocaleTimeString()}] ${msg}`; logEl.prepend(d); }
let alreadyRolled=false;
function rollDice(){
  const p=players[current]; if(p.bankrupt){nextTurn();return;} if(alreadyRolled){log("Você já rolou o dado neste turno. Passe a vez."); return;}
  const d=Math.floor(Math.random()*6)+1; log(`${p.name} rolou ${d}`);
  p.pos=(p.pos+d); if(p.pos>=pathCoords.length){ p.pos=p.pos%pathCoords.length; p.money+=200; log(`${p.name} passou pelo INÍCIO e recebeu R$200!`);}
  handleLanding(p); renderPlayersUI(); renderOwners();
  if(d===6){ log(`${p.name} tirou 6 e pode jogar de novo!`); alreadyRolled=false;} else { alreadyRolled=true; rollBtn.disabled=true;}
  const prop=properties[p.pos]; canBuy=(prop&&prop.price>0&&prop.owner===null&&!p.bankrupt); buyBtn.disabled=!canBuy;
}
function handleLanding(player){
  const prop=properties[player.pos]; log(`${player.name} caiu em ${prop.name}`);
  if(prop.price===0){ if(/Imposto|Multa/i.test(prop.name)){ const amt=100; player.money-=amt; log(`${player.name} pagou imposto: R$${amt}`); checkBankruptcy(player);} else if(/Sorte/i.test(prop.name)){ const val=Math.floor(Math.random()*301)-100; player.money+=val; log(`${player.name} obteve carta: ${val>=0?'+':'-'}R$${Math.abs(val)}`); checkBankruptcy(player);} else if(/Cadei/i.test(prop.name)){ log(`${player.name} está apenas visitando a cadeia.`);} else if(/Início/i.test(prop.name)){ player.money+=200; log(`${player.name} recebeu R$200 no Início.`);}}
  else{ if(prop.owner===null){ log(`Propriedade disponível: ${prop.name} por R$${prop.price}`);} else if(prop.owner!==player.id){ const rent=prop.rent; player.money-=rent; players[prop.owner].money+=rent; log(`${player.name} pagou R$${rent} de aluguel a ${players[prop.owner].name}`); checkBankruptcy(player);} else { log(`${player.name} caiu na sua própria propriedade (${prop.name}).`);}}
}
function buyProperty(){
  const p=players[current]; const prop=properties[p.pos]; if(!prop||prop.price===0||prop.owner!==null){log('Nada para comprar aqui.');return;} if(p.money<prop.price){log('Dinheiro insuficiente para comprar.');return;}
  p.money-=prop.price; prop.owner=p.id; log(`${p.name} comprou ${prop.name} por R$${prop.price}`); canBuy=false; buyBtn.disabled=true; renderOwners(); renderPlayersUI();
}
function checkBankruptcy(player){
  if(player.money<0&&!player.bankrupt){
    player.bankrupt=true; properties.forEach(pr=>{if(pr.owner===player.id)pr.owner=null;}); log(`${player.name} faliu e saiu do jogo.`); renderOwners(); renderPlayersUI();
    const alive=players.filter(p=>!p.bankrupt);
    if(alive.length===1){ log(`🏆 Vitória: ${alive[0].name}`); rollBtn.disabled=true; buyBtn.disabled=true; endBtn.disabled=true;}
  }
}
function nextTurn(){
  canBuy=false; buyBtn.disabled=true; rollBtn.disabled=false; alreadyRolled=false;
  let next=current; for(let i=1;i<=players.length;i++){ const idx=(current+i)%players.length; if(!players[idx].bankrupt){next=idx;break;}} current=next; renderPlayersUI(); log(`Agora é a vez de ${players[current].name}.`);
}

/* --- NOVA LÓGICA PARA CRIAÇÃO DE JOGADORES COM MODAL --- */
let playerIndexToCreate = 0;
const colors = ['#e74c3c','#3498db','#2ecc71','#f1c40f','#9b59b6','#e67e22'];

// Função que abre e prepara o modal para o jogador atual
function askForPlayerName() {
    if (playerIndexToCreate >= NUM_PLAYERS) {
        // Se todos os jogadores foram criados, inicia o jogo
        nameModalOverlay.classList.add('modal-hidden');
        renderPlayersUI();
        renderOwners();
        log('Jogo iniciado. É a vez de ' + players[current].name);
        return;
    }
    
    // Configura e exibe o modal
    modalTitle.textContent = `Digite o nome do Jogador ${playerIndexToCreate + 1}:`;
    modalInput.value = `Jogador ${playerIndexToCreate + 1}`;
    nameModalOverlay.classList.remove('modal-hidden');
    modalInput.focus();
    modalInput.select();
}

// Função chamada quando o botão OK do modal é clicado
function submitPlayerName() {
    let playerName = modalInput.value.trim();
    if (!playerName) {
        playerName = `Jogador ${playerIndexToCreate + 1}`;
    }
    
    // Cria o objeto do jogador
    players.push({
        id: playerIndexToCreate,
        name: playerName,
        money: START_MONEY,
        pos: 0,
        bankrupt: false,
        color: colors[playerIndexToCreate]
    });
    
    // Passa para o próximo jogador
    playerIndexToCreate++;
    askForPlayerName(); // Chama a função novamente para o próximo jogador ou para iniciar o jogo
}

// Adiciona os listeners para o modal
modalOkBtn.addEventListener('click', submitPlayerName);
modalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitPlayerName();
    }
});


/* Listeners dos botões de controle */
rollBtn.addEventListener('click', ()=>{ rollDice(); });
buyBtn.addEventListener('click', ()=>{ buyProperty(); });
endBtn.addEventListener('click', ()=>{ nextTurn(); });

/* Inicialização do Jogo */
function init(){
  createGridAndPath();
  createProperties();
  askForPlayerName(); // Inicia o processo de cadastro de jogadores
}

init();