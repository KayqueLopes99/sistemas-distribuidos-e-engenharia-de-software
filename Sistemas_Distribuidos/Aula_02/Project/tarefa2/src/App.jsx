import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './index.css'; // Tailwind / estilos

// --- Constantes do Jogo ---
const GAME_TIME = 30; // segundos
const SPAWN_INTERVAL = 900; // ms
const POKEMON_STAY_TIME = 10000; // ms

// --- Endpoints ---
const SCORES_API = 'https://g7ei7esoti.execute-api.us-east-1.amazonaws.com/v1/items';

// --- Lista completa de Pokémons (com imagens públicas) ---
const POKEMON_LIST = [
  { id: 1, name: 'Bulbasaur', points: 10, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: 4, name: 'Charmander', points: 10, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: 7, name: 'Squirtle', points: 10, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { id: 25, name: 'Pikachu', points: 20, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { id: 10, name: 'Caterpie', points: 5, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/10.png' },
  { id: 16, name: 'Pidgey', points: 5, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/16.png' },
  { id: 41, name: 'Zubat', points: 5, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/41.png' },
  { id: 129, name: 'Magikarp', points: 1, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/129.png' },
  { id: 123, name: 'Scyther', points: 50, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/123.png' },
  { id: 127, name: 'Pinsir', points: 60, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/127.png' },
  { id: 128, name: 'Tauros', points: 60, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/128.png' },
  { id: 63, name: 'Abra', points: 75, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/63.png' },
  { id: 113, name: 'Chansey', points: 100, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/113.png' },
  { id: 147, name: 'Dratini', points: 30, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/147.png' },
  { id: 54, name: 'Psyduck', points: 15, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/54.png' },
  { id: 92, name: 'Gastly', points: 25, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/92.png' },
  { id: 52, name: 'Meowth', points: 12, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/52.png' },
  { id: 84, name: 'Doduo', points: 18, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/84.png' },
  { id: 133, name: 'Eevee', points: 40, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
  { id: 143, name: 'Snorlax', points: 80, img: 'https://raw.githack.com/PokeAPI/sprites/master/sprites/pokemon/143.png' }
];

// --- Subcomponente Pokémon ---
const Pokemon = ({ pokemon, onCatch }) => {
  const { instanceId, name, points, img, x, y, isCaught } = pokemon;
  const handleCatch = () => { if (!isCaught) onCatch(instanceId, name, points); };
  return (
    <img
      src={img}
      alt={name}
      className={`absolute w-20 h-20 cursor-pointer transition-all duration-300 ease-out 
                  hover:scale-110 active:scale-90 select-none
                  ${isCaught ? 'opacity-0' : 'opacity-100'}`}
      style={{ top: y, left: x }}
      onClick={handleCatch}
      onMouseDown={(e) => e.preventDefault()}
    />
  );
};

// --- App principal ---
function App() {
  // Estados do jogo
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [activePokemon, setActivePokemon] = useState([]);
  const [caughtPokemonList, setCaughtPokemonList] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // Modal / envio
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Leaderboard por jogador (agregado)
  const [playersRanking, setPlayersRanking] = useState([]);
  const [isLoadingScores, setIsLoadingScores] = useState(false);
  const [scoresError, setScoresError] = useState(null);

  // refs
  const gameAreaRef = useRef(null);
  const pokemonCounterRef = useRef(0);
  const gameTimerRef = useRef(null);
  const spawnTimerRef = useRef(null);

  // Reset
  const resetGame = () => {
    if (gameTimerRef.current) { clearInterval(gameTimerRef.current); gameTimerRef.current = null; }
    if (spawnTimerRef.current) { clearInterval(spawnTimerRef.current); spawnTimerRef.current = null; }

    setScore(0);
    setTimeLeft(GAME_TIME);
    setIsGameRunning(false);
    setActivePokemon([]);
    setCaughtPokemonList([]);
    setCurrentSessionId(null);
    setShowModal(false);
    setIsSubmitting(false);
  };

  // Start
  const startGame = () => {
    if (!playerName.trim()) { alert('Por favor, digite seu nome de jogador!'); return; }
    resetGame();
    setCurrentSessionId(`safari_${Date.now()}`);
    setIsGameRunning(true);
  };

  // Spawn
  const spawnPokemon = useCallback(() => {
    if (!gameAreaRef.current || !isGameRunning) return;
    const randomPokemonData = POKEMON_LIST[Math.floor(Math.random() * POKEMON_LIST.length)];
    const { width, height } = gameAreaRef.current.getBoundingClientRect();
    const x = Math.random() * (width - 80);
    const y = Math.random() * (height - 80);
    const newPokemon = { ...randomPokemonData, instanceId: pokemonCounterRef.current++, x, y, isCaught: false };
    setActivePokemon(prev => [...prev, newPokemon]);
    setTimeout(() => {
      setActivePokemon(prev => prev.filter(p => p.instanceId !== newPokemon.instanceId || p.isCaught));
    }, POKEMON_STAY_TIME);
  }, [isGameRunning]);

  // Catch
  const catchPokemon = useCallback((instanceId, name, points) => {
    if (!isGameRunning) return;
    setScore(prev => prev + points);
    setCaughtPokemonList(prev => [...prev, { POKEMON: name, PONTUACAO: points }]);
    setActivePokemon(prev => prev.map(p => p.instanceId === instanceId ? { ...p, isCaught: true } : p));
    setTimeout(() => setActivePokemon(prev => prev.filter(p => p.instanceId !== instanceId)), 300);
  }, [isGameRunning]);

  // Timers
  useEffect(() => {
    if (isGameRunning) {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameRunning(false);
            setShowModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      spawnTimerRef.current = setInterval(spawnPokemon, SPAWN_INTERVAL);
      spawnPokemon();
    } else {
      if (gameTimerRef.current) { clearInterval(gameTimerRef.current); gameTimerRef.current = null; }
      if (spawnTimerRef.current) { clearInterval(spawnTimerRef.current); spawnTimerRef.current = null; }
    }
    return () => {
      if (gameTimerRef.current) clearInterval(gameTimerRef.current);
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [isGameRunning, spawnPokemon]);

  // --- Função para buscar pontuações e agregar por jogador (melhor pontuação) ---
  const fetchScores = useCallback(async () => {
    setIsLoadingScores(true);
    setScoresError(null);
    try {
      const resp = await axios.get(SCORES_API);
      const data = resp.data;

      // Normaliza a lista de items do formato possível da API
      let items = [];
      if (Array.isArray(data)) items = data;
      else if (data.Items) items = data.Items;
      else if (data.items) items = data.items;
      else if (data.body) {
        // caso a API retorne um wrapper
        try {
          const parsed = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
          if (Array.isArray(parsed)) items = parsed;
          else if (parsed.Items) items = parsed.Items;
        } catch (e) {
          // ignore
        }
      } else {
        // fallback (se data for objeto simples)
        items = Array.isArray(data) ? data : [];
      }

      // Normalizar campos de cada item para: id, nome, pontuacao
      const normalized = items.map(i => ({
        id: i.id ?? i.ID ?? i.Id ?? '',
        nome: i.nome ?? i.nome_jogador ?? i.NOME ?? i.name ?? i.nome_jogador ?? '',
        pontuacao: Number(i.pontuacao ?? i.pontuacao_total ?? i.PONTUACAO ?? i.points ?? 0)
      }));

      // Agregar por jogador: manter a maior pontuação por nome
      const byPlayer = {};
      normalized.forEach(item => {
        const key = (item.nome || 'Anônimo').trim();
        if (!byPlayer[key]) {
          byPlayer[key] = { nome: key, best: item.pontuacao, plays: 1 };
        } else {
          byPlayer[key].plays += 1;
          if (item.pontuacao > byPlayer[key].best) byPlayer[key].best = item.pontuacao;
        }
      });

      const players = Object.values(byPlayer);

      // Ordenar por melhor pontuação desc
      players.sort((a, b) => b.best - a.best);

      setPlayersRanking(players);
    } catch (err) {
      console.error('Erro ao buscar pontuações:', err);
      setScoresError(err.message || 'Erro desconhecido');
      setPlayersRanking([]);
    } finally {
      setIsLoadingScores(false);
    }
  }, []);

  // Busca inicial
  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  // --- Envio da pontuação para a API (PUT /items) ---
  const handleSubmitScore = async () => {
  if (!playerName.trim()) { alert('Por favor, digite seu nome.'); return; }
  setIsSubmitting(true);
  const payload = {
    id: currentSessionId || `safari_${Date.now()}`,
    nome: playerName,
    pontuacao: score
  };

  try {
  console.log('Enviando payload:', payload);
  const url = `${SCORES_API}`; // envia para /v1/items via POST
  const resp = await axios.post(url, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('POST resp:', resp.status, resp.data);
  alert(`Pontuação de ${playerName} (${score}) enviada com sucesso!`);
  await fetchScores();
}
catch (err) {
    console.error('Erro ao enviar pontuação (detalhes):', err);
    if (err.response) {
      console.error('Resposta da API:', err.response.status, err.response.data);
      alert(`Erro da API: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
    } else {
      alert(`Erro de rede/CORS: ${err.message}`);
    }
  } finally {
    setIsSubmitting(false);
    resetGame();
  }
};


  // Render
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-green-400 flex flex-col items-center justify-center p-4 font-pixel tracking-tighter">
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6 text-center">Pokémon Safari Zone</h1>

      <div className="flex flex-col md:flex-row items-start w-full max-w-6xl gap-6">
        {/* Jogo */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-xl border-4 border-blue-500">
          <div className="flex flex-col md:flex-row items-center justify-between w-full mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Seu nome de jogador"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              disabled={isGameRunning}
              className="p-2 border-2 border-gray-300 rounded-md text-lg w-full md:w-auto flex-grow text-gray-700"
            />
            <button
              onClick={startGame}
              disabled={isGameRunning || !playerName.trim()}
              className="px-6 py-3 bg-yellow-400 text-blue-800 font-bold rounded-md shadow-md hover:bg-yellow-500 transition-colors duration-200 text-lg disabled:opacity-50 w-full md:w-auto"
            >
              {isGameRunning ? 'Safari em Andamento...' : 'Iniciar Safari!'}
            </button>
          </div>

          <div className="flex justify-around w-full mb-6 text-xl md:text-2xl font-bold text-gray-700">
            <p>Pontuação: <span className="text-green-600">{score}</span></p>
            <p>Tempo: <span className="text-red-600">{timeLeft}s</span></p>
          </div>

          <div
            ref={gameAreaRef}
            className="relative w-full h-96 bg-green-200 border-4 border-green-700 rounded-lg overflow-hidden cursor-crosshair"
            style={{
              backgroundImage: "url('https://raw.githack.com/jennieroo/pokemon-safari-zone/master/public/img/grass-bg.png')",
              backgroundSize: '32px',
              backgroundRepeat: 'repeat',
              imageRendering: 'pixelated'
            }}
          >
            {activePokemon.map(p => <Pokemon key={p.instanceId} pokemon={p} onCatch={catchPokemon} />)}
          </div>
        </div>

        {/* Ranking / painel lateral */}
        <div className="w-80 bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200">
          <h3 className="text-xl font-bold mb-3">Ranking (melhor por jogador)</h3>

          <div className="mb-3 flex gap-2">
            <button onClick={fetchScores} className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Atualizar
            </button>
            <button onClick={() => { setPlayersRanking([]); fetchScores(); }} className="px-3 bg-gray-200 rounded hover:bg-gray-300">
              Limpar
            </button>
          </div>

          {isLoadingScores && <p>Carregando...</p>}
          {scoresError && <p className="text-red-600">Erro: {scoresError}</p>}

          {!isLoadingScores && !scoresError && (
            <div className="overflow-y-auto max-h-72">
              {playersRanking.length === 0 ? (
                <p className="text-sm text-gray-500">Nenhuma pontuação registrada</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left">#</th>
                      <th className="text-left">Nome</th>
                      <th className="text-right">Melhor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playersRanking.map((p, idx) => (
                      <tr key={p.nome || idx} className="border-t">
                        <td className="py-1">{idx + 1}</td>
                        <td className="py-1">{p.nome}</td>
                        <td className="py-1 text-right font-bold">{p.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal fim de jogo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Tempo Esgotado!</h2>
            <p className="text-xl mb-6 text-gray-600">Sua pontuação: <span className="font-bold text-blue-600">{score}</span></p>

            <p className="text-left text-gray-700 font-bold mb-2">Salvar pontuação:</p>
            <input
              type="text"
              placeholder="Confirme seu nome"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-4 text-lg text-gray-700"
            />

            <button
              onClick={handleSubmitScore}
              disabled={isSubmitting || !playerName.trim()}
              className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg font-bold hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Pontuação'}
            </button>

            <button
              onClick={resetGame}
              disabled={isSubmitting}
              className="w-full bg-gray-300 text-gray-700 p-2 rounded-lg text-md font-bold hover:bg-gray-400 transition-colors mt-3"
            >
              Jogar Novamente (Sem Salvar)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
