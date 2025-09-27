import React, { useState, useCallback, useMemo, useEffect } from 'react';

// --- Ícones e Emojis ---
const OCEAN_LIFE = ['🐠', '🦀', '🐢', '🐙', '⭐️', '🐬'];
const POLLUTION = ['🧴', '🗑️', '🥤'];
const ALL_PIECES = [...OCEAN_LIFE, ...POLLUTION];

const InfoIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg>
);

// --- Configurações do Jogo ---
const BOARD_SIZE = 12;
const STARTING_MOVES = 50;
const STARTING_SHUFFLES = 3;

// --- Componentes da UI ---
const StartScreen = ({ onStart }) => (
    <div className="w-full max-w-lg flex flex-col items-center text-white text-center p-8 bg-black/50 backdrop-blur-sm rounded-2xl animate-fade-in">
        <h1 className="text-4xl font-bold text-cyan-300 mb-2">Joguinho ODS 14</h1>
        <h2 className="text-2xl mb-6">Limpeza do Oceano</h2>
        <div className="bg-cyan-50/20 border-l-4 border-cyan-400 p-4 rounded-r-lg text-left mb-8">
            <h3 className="font-bold mb-2 text-xl">Como Jogar?</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>Troque peças adjacentes para formar linhas de 3 ou mais itens iguais.</li>
                <li>O objetivo principal é combinar a <b>poluição</b> (🧴, 🗑️, 🥤).</li>
                <li><b>Dica:</b> Combinar poluição limpa o oceano <b>muito mais rápido</b>!</li>
                <li>Ficou sem jogadas? Use o botão <b>Trocar</b> para embaralhar o tabuleiro! (Custa um movimento).</li>
                <li>Alcance <b>100% de limpeza</b> antes que os movimentos acabem!</li>
            </ul>
        </div>
        <button onClick={onStart} className="w-full bg-yellow-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-yellow-600 transition text-2xl transform hover:scale-105">
            Começar a Limpeza!
        </button>
    </div>
);

const InfoModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full text-gray-800 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-cyan-600">ODS 14: Vida na Água</h2>
                <button onClick={onClose} className="text-gray-500 text-3xl">&times;</button>
            </div>
            <p className="mb-4">Conservar e usar de forma sustentável os oceanos, os mares e os recursos marinhos.</p>
             <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
                <h3 className="font-bold mb-2">Como Jogar?</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Troque peças adjacentes para formar linhas de 3 ou mais.</li>
                    <li>Combine <b>poluição</b> (🧴, 🗑️) para limpar o oceano mais rápido.</li>
                    <li>Use o botão <b>Trocar</b> se não houver mais jogadas (custa 1 movimento).</li>
                    <li>Seu objetivo é alcançar <b>100% de limpeza</b> antes que os movimentos acabem!</li>
                </ul>
            </div>
            <button onClick={onClose} className="mt-6 w-full bg-cyan-600 text-white font-bold py-3 rounded-lg hover:bg-cyan-700 transition">Continuar Jogo</button>
        </div>
    </div>
);

const GameEndModal = ({ title, message, onRestart }) => (
     <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-white animate-fade-in z-20">
      <h2 className="text-4xl font-bold mb-2">{title}</h2>
      <p className="text-xl mb-6">{message}</p>
      <button onClick={onRestart} className="bg-yellow-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-yellow-600 transition">Jogar Novamente</button>
    </div>
)

// --- Lógica do Jogo ---
const createBoard = () => {
    const newBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            let piece;
            do {
                piece = ALL_PIECES[Math.floor(Math.random() * ALL_PIECES.length)];
            } while (
                (c >= 2 && piece === newBoard[r][c - 1] && piece === newBoard[r][c - 2]) ||
                (r >= 2 && piece === newBoard[r - 1][c] && piece === newBoard[r - 2][c])
            );
            newBoard[r][c] = piece;
        }
    }
    return newBoard;
};


// --- Componente Principal ---
export default function App() {
    const [board, setBoard] = useState(createBoard);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [moves, setMoves] = useState(STARTING_MOVES);
    const [oceanCleanliness, setOceanCleanliness] = useState(0);
    const [shuffles, setShuffles] = useState(STARTING_SHUFFLES);
    const [showInfo, setShowInfo] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'win', 'lose'

    useEffect(() => {
        if (gameState !== 'playing') return;
        if (oceanCleanliness >= 100) {
            setGameState('win');
        } else if (moves <= 0) {
            setGameState('lose');
        }
    }, [oceanCleanliness, moves, gameState]);

    const checkMatches = useCallback((currentBoard) => {
        const matches = new Set();
        // Horizontais
        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE - 2; c++) {
                if (currentBoard[r][c] && currentBoard[r][c] === currentBoard[r][c + 1] && currentBoard[r][c] === currentBoard[r][c + 2]) {
                    for(let i=0; i<3; i++) matches.add(`${r}-${c+i}`);
                }
            }
        }
        // Verticais
        for (let r = 0; r < BOARD_SIZE - 2; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (currentBoard[r][c] && currentBoard[r][c] === currentBoard[r + 1][c] && currentBoard[r][c] === currentBoard[r + 2][c]) {
                   for(let i=0; i<3; i++) matches.add(`${r+i}-${c}`);
                }
            }
        }
        return Array.from(matches);
    }, []);

    const processTurn = useCallback(async (currentBoard) => {
        setIsProcessing(true);
        let boardToProcess = currentBoard.map(row => [...row]);

        while (true) {
            const matches = checkMatches(boardToProcess);
            if (matches.length === 0) break;

            let pollutionCleared = 0;
            let lifeCleared = 0;
            matches.forEach(coord => {
                const [r, c] = coord.split('-').map(Number);
                 if(POLLUTION.includes(boardToProcess[r][c])) pollutionCleared++;
                 else lifeCleared++;
            });
            setOceanCleanliness(prev => Math.min(100, prev + (pollutionCleared * 2) + (lifeCleared * 0.5)));

            matches.forEach(coord => {
                const [r, c] = coord.split('-').map(Number);
                boardToProcess[r][c] = null;
            });
            setBoard([...boardToProcess]);
            await new Promise(res => setTimeout(res, 300));

            for (let c = 0; c < BOARD_SIZE; c++) {
                let emptyRow = BOARD_SIZE - 1;
                for (let r = BOARD_SIZE - 1; r >= 0; r--) {
                    if (boardToProcess[r][c]) {
                        if (r !== emptyRow) {
                           [boardToProcess[r][c], boardToProcess[emptyRow][c]] = [null, boardToProcess[r][c]];
                        }
                        emptyRow--;
                    }
                }
            }
            setBoard([...boardToProcess]);
            await new Promise(res => setTimeout(res, 200));

            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (!boardToProcess[r][c]) {
                        boardToProcess[r][c] = ALL_PIECES[Math.floor(Math.random() * ALL_PIECES.length)];
                    }
                }
            }
             setBoard([...boardToProcess]);
             await new Promise(res => setTimeout(res, 200));
        }
        setIsProcessing(false);
    }, [checkMatches]);

    const handlePieceClick = (r, c) => {
        if (isProcessing || gameState !== 'playing') return;

        if (selectedPiece) {
            const [sr, sc] = selectedPiece;
            const isAdjacent = Math.abs(sr - r) + Math.abs(sc - c) === 1;

            if (isAdjacent) {
                const newBoard = board.map(row => [...row]);
                [newBoard[sr][sc], newBoard[r][c]] = [newBoard[r][c], newBoard[sr][sc]];

                 if (checkMatches(newBoard).length > 0) {
                    setMoves(m => m - 1);
                    processTurn(newBoard);
                }
            }
            setSelectedPiece(null);
        } else {
            setSelectedPiece([r, c]);
        }
    };
    
    const shuffleBoard = useCallback(() => {
        if (isProcessing || gameState !== 'playing' || shuffles <= 0) return;
        
        setShuffles(s => s - 1);
        setMoves(m => m - 1);
        setBoard(createBoard());
    }, [isProcessing, gameState, shuffles]);

    const restartGame = useCallback(() => {
        setGameState('playing');
        setBoard(createBoard());
        setMoves(STARTING_MOVES);
        setOceanCleanliness(0);
        setSelectedPiece(null);
        setIsProcessing(false);
        setShuffles(STARTING_SHUFFLES);
    }, []);

    const startGame = () => {
        restartGame();
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-400 to-blue-900 font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
            {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
            
            {gameState === 'start' && <StartScreen onStart={startGame} />}

            {gameState !== 'start' &&
                <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
                    <div className="w-full p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg mb-4 text-white">
                        <div className="flex justify-between items-center mb-2 font-bold text-lg">
                            <span>Movimentos: {moves}</span>
                            <button
                                onClick={shuffleBoard}
                                disabled={isProcessing || shuffles <= 0 || gameState !== 'playing'}
                                className="bg-purple-500 text-white font-bold py-1 px-3 rounded-lg shadow-md hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-sm"
                            >
                                Trocar ({shuffles})
                            </button>
                            <div className="flex items-center gap-2">
                               <span>Limpeza: {oceanCleanliness.toFixed(0)}%</span>
                               <button onClick={() => setShowInfo(true)} className="text-white hover:text-cyan-200 transition">
                                    <InfoIcon className="h-7 w-7" />
                               </button>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200/50 rounded-full h-5"><div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-5 rounded-full transition-all duration-500" style={{ width: `${oceanCleanliness}%` }}></div></div>
                    </div>

                    <main className="relative grid grid-cols-12 grid-rows-12 gap-1 p-3 bg-blue-800/50 rounded-2xl shadow-2xl">
                        {board.map((row, r) => row.map((piece, c) => (
                            <div key={`${r}-${c}`} onClick={() => handlePieceClick(r, c)}
                                className={`w-12 h-12 flex justify-center items-center text-3xl rounded-lg cursor-pointer transition-transform duration-200 
                                ${selectedPiece && selectedPiece[0] === r && selectedPiece[1] === c ? 'bg-yellow-400/50 scale-110' : ''}`}>
                                <span className="transform transition-transform duration-300 hover:scale-125">{piece}</span>
                            </div>
                        )))}
                        
                        {gameState === 'win' && <GameEndModal title="Parabéns!" message="Você limpou o oceano!" onRestart={restartGame} />}
                        {gameState === 'lose' && <GameEndModal title="Fim de Jogo!" message="Faltou pouco para limpar tudo." onRestart={restartGame} />}
                    </main>
                </div>
            }
             <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
             `}</style>
        </div>
    );
}

