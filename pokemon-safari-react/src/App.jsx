// src/App.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './index.css'; // Importa o Tailwind CSS

// --- Constantes do Jogo ---
const GAME_TIME = 30; // Tempo em segundos
const SPAWN_INTERVAL = 900; // Intervalo de spawn (em ms)
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // API de backend simulada

// --- Lista de 20 Pokémon (importada diretamente) ---
const POKEMON_LIST = [
    { id: 1, name: 'Bulbasaur', points: 10, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { id: 4, name: 'Charmander', points: 10, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { id: 7, name: 'Squirtle', points: 10, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { id: 25, name: 'Pikachu', points: 20, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { id: 10, name: 'Caterpie', points: 5, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png' },
    { id: 16, name: 'Pidgey', points: 5, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png' },
    { id: 41, name: 'Zubat', points: 5, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png' },
    { id: 129, name: 'Magikarp', points: 1, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png' },
    { id: 123, name: 'Scyther', points: 50, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png' },
    { id: 127, name: 'Pinsir', points: 60, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png' },
    { id: 128, name: 'Tauros', points: 60, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png' },
    { id: 63, name: 'Abra', points: 75, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png' },
    { id: 113, name: 'Chansey', points: 100, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png' },
    { id: 147, name: 'Dratini', points: 30, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png' },
    { id: 54, name: 'Psyduck', points: 15, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png' },
    { id: 92, name: 'Gastly', points: 25, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png' },
    { id: 52, name: 'Meowth', points: 12, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png' },
    { id: 84, name: 'Doduo', points: 18, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png' },
    { id: 133, name: 'Eevee', points: 40, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
    { id: 143, name: 'Snorlax', points: 80, img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' }
];

// --- Sub-componente Pokémon (renderiza cada Pokémon) ---
const Pokemon = ({ pokemon, onCatch }) => {
    const { instanceId, name, points, img, x, y, isCaught } = pokemon;

    const handleCatch = () => {
        if (!isCaught) { // Evita múltiplos cliques
            onCatch(instanceId, name, points);
        }
    };

    return (
        <img
            src={img}
            alt={name}
            className={`absolute w-20 h-20 cursor-pointer transition-all duration-300 ease-out 
                        hover:scale-110 active:scale-90 select-none
                        ${isCaught ? 'animate-shrink-out' : 'animate-pop-in'}`} // Animações do Tailwind
            style={{ top: y, left: x }}
            onClick={handleCatch}
            onMouseDown={(e) => e.preventDefault()} // Impede que a imagem seja arrastada
        />
    );
};

// --- Componente Principal App ---
function App() {
    // --- Estados do Jogo ---
    const [playerName, setPlayerName] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_TIME);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [activePokemon, setActivePokemon] = useState([]); // Pokémon na tela
    const [caughtPokemonList, setCaughtPokemonList] = useState([]); // Para o JSON
    const [currentSessionId, setCurrentSessionId] = useState(null);
    
    // --- Estados do Modal e API ---
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Refs ---
    const gameAreaRef = useRef(null);
    const pokemonCounterRef = useRef(0); // Para dar IDs únicos aos Pokémon na tela
    const gameTimerRef = useRef(null);
    const spawnTimerRef = useRef(null);

    // --- Lógica de Resetar o Jogo ---
    const resetGame = () => {
        setScore(0);
        setTimeLeft(GAME_TIME);
        setIsGameRunning(false);
        setActivePokemon([]);
        setCaughtPokemonList([]);
        setCurrentSessionId(null);
        setShowModal(false);
        setIsSubmitting(false);
        // Mantém o nome do jogador
    };

    // --- Lógica de Iniciar o Jogo ---
    const startGame = () => {
        if (!playerName.trim()) {
            alert("Por favor, digite seu nome de jogador!");
            return;
        }

        resetGame(); 
        setCurrentSessionId(`safari_${Date.now()}`); // Gera um ID único
        setIsGameRunning(true);
    };

    // --- Lógica de Spawna Pokémon ---
    const spawnPokemon = useCallback(() => {
        if (!gameAreaRef.current) return;

        const randomPokemonData = POKEMON_LIST[Math.floor(Math.random() * POKEMON_LIST.length)];
        const { width, height } = gameAreaRef.current.getBoundingClientRect();
        
        const x = Math.random() * (width - 80); // 80 é o tamanho do Pokémon
        const y = Math.random() * (height - 80);

        const newPokemon = {
            ...randomPokemonData,
            instanceId: pokemonCounterRef.current++, // ID único para este Pokémon
            x,
            y,
            isCaught: false,
            // Pokémon mais valiosos fogem mais rápido
            fleeTime: 2500 - (randomPokemonData.points * 15) 
        };

        setActivePokemon((prev) => [...prev, newPokemon]);

        // Remove o Pokémon após um tempo (fuga)
        setTimeout(() => {
            // Remove apenas se não foi pego (isCaught === false)
            setActivePokemon((prev) => 
                prev.filter(p => p.instanceId !== newPokemon.instanceId || p.isCaught)
            );
        }, Math.max(newPokemon.fleeTime, 900)); // Mínimo de 900ms na tela
    }, []);

    // --- Lógica de Capturar Pokémon ---
    const catchPokemon = useCallback((instanceId, name, points) => {
        if (!isGameRunning) return;

        setScore((prevScore) => prevScore + points);
        setCaughtPokemonList((prevList) => [
            ...prevList,
            { POKEMON: name, PONTUACAO: points } // Formato do JSON
        ]);

        // Marca como "pego" para a animação
        setActivePokemon((prev) => 
            prev.map(p => 
                p.instanceId === instanceId ? { ...p, isCaught: true } : p
            )
        );

        // Remove o Pokémon do estado após a animação
        setTimeout(() => {
            setActivePokemon((prev) => prev.filter(p => p.instanceId !== instanceId));
        }, 300); // Duração da animação 'animate-shrink-out'
    }, [isGameRunning]);

    // --- Lógica de Encerrar o Jogo ---
    const endGame = useCallback(() => {
        setIsGameRunning(false);
        clearInterval(gameTimerRef.current);
        clearInterval(spawnTimerRef.current);
        setShowModal(true);
    }, []);

    // --- Efeito para os Timers do Jogo ---
    useEffect(() => {
        if (isGameRunning) {
            // Timer principal do jogo (contagem regressiva)
            gameTimerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        endGame();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            // Timer para gerar Pokémon
            spawnTimerRef.current = setInterval(spawnPokemon, SPAWN_INTERVAL);
        }

        // Cleanup: Limpa os timers
        return () => {
            clearInterval(gameTimerRef.current);
            clearInterval(spawnTimerRef.current);
        };
    }, [isGameRunning, spawnPokemon, endGame]);

    // --- Lógica de Envio da Pontuação (API) ---
    const handleSubmitScore = async () => {
        if (!playerName.trim()) {
            alert("Por favor, digite seu nome.");
            return;
        }
        
        setIsSubmitting(true);

        // 1. Gera o JSON
        const gameData = {
            id: currentSessionId,
            nome_jogador: playerName,
            pontuacao_total: score,
            pokemons_capturados: caughtPokemonList
        };

        try {
            // 2. Envia para a API usando axios
            const response = await axios.post(API_URL, gameData);
            
            console.log('Dados enviados:', gameData);
            console.log('Resposta da API (simulada):', response.data);

            alert(`Pontuação de ${playerName} (${score}) enviada com sucesso!`);
            
        } catch (error) {
            console.error("Erro ao enviar pontuação:", error);
            alert("Houve um erro ao enviar sua pontuação. Tente novamente.");
        } finally {
            // 3. Reseta o jogo após o envio
            resetGame();
        }
    };

    // --- Renderização ---
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-300 to-green-400 flex flex-col items-center justify-center p-4 font-pixel tracking-tighter">
            
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 [text-shadow:_4px_4px_0_rgb(42_117_187)] mb-8 text-center leading-tight">
                Pokémon Safari Zone
            </h1>

            {/* --- Container do Jogo --- */}
            <div className="flex flex-col items-center w-full max-w-2xl bg-white p-6 rounded-lg shadow-xl border-4 border-blue-500">
                
                {/* Controles */}
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
                        className="px-6 py-3 bg-yellow-400 text-blue-800 font-bold rounded-md shadow-md hover:bg-yellow-500 transition-colors duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto active:scale-95"
                    >
                        {isGameRunning ? "Safari em..." : "Iniciar Safari!"}
                    </button>
                </div>

                {/* Estatísticas */}
                <div className="flex justify-around w-full mb-6 text-xl md:text-2xl font-bold text-gray-700">
                    <p>Pontuação: <span className="text-green-600">{score}</span></p>
                    <p>Tempo: <span className="text-red-600">{timeLeft}s</span></p>
                </div>

                {/* Área de Jogo */}
                <div
                    ref={gameAreaRef}
                    className="relative w-full h-96 bg-green-200 border-4 border-green-700 rounded-lg overflow-hidden cursor-crosshair"
                    style={{ 
                        // Imagem de grama pixelada para o fundo
                        backgroundImage: "url('https://raw.githubusercontent.com/jennieroo/pokemon-safari-zone/master/public/img/grass-bg.png')", 
                        backgroundSize: '32px', 
                        backgroundRepeat: 'repeat',
                        imageRendering: 'pixelated' // Mantém o estilo pixelado
                    }}
                >
                    {activePokemon.map((pokemon) => (
                        <Pokemon
                            key={pokemon.instanceId}
                            pokemon={pokemon}
                            onCatch={catchPokemon}
                        />
                    ))}
                </div>
            </div>

            {/* --- Modal de Fim de Jogo --- */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Tempo Esgotado!</h2>
                        <p className="text-xl mb-6 text-gray-600">
                            Sua pontuação: <span className="font-bold text-blue-600">{score}</span>
                        </p>
                        
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