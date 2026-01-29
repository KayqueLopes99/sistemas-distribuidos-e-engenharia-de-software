import React, { useState, useEffect } from 'react';

//  --- DATA AND CONFIGURATION ---

 // Cores para cada tipo de Pokémon. Essencial para o estilo das seções.
 const pokemonTypeColors = {
   normal: '#A8A77A',
   fire: '#FF6723',
   water: '#3393F2',
   electric: '#F9D839',
   grass: '#60D352',
   ice: '#4DD2C1',
   fighting: '#D94255',
   poison: '#B654D9',
   ground: '#D5B45A',
   flying: '#90A8F1',
   psychic: '#FA65B5',
   bug: '#AABE2B',
   rock: '#C9B767',
   ghost: '#7A72D4',
   dragon: '#0C6ACD',
   dark: '#595761',
   steel: '#5A8EA1',
   fairy: '#EE90E6',
   stellar: '#4CE4AD',  // Type added in Scarlet & Violet
 };

  // --- HELPER FUNCTION ---
 // Esta função organiza uma lista de favoritos por tipo.
 const populateTypesFromFavorites = (favoriteList) => {
   const types = {};
   favoriteList.forEach(pokemon => {
     if (pokemon.types && Array.isArray(pokemon.types)) {
       pokemon.types.forEach(({ type }) => {
         const typeName = type.name;
         if (!types[typeName]) {
           types[typeName] = [];
         }
         if (!types[typeName].some(p => p.id === pokemon.id)) {
           types[typeName].push(pokemon);
         }
       });
     }
   });
   return types;
 };


  // --- REUSABLE COMPONENTS ---

 // Ícone de Estrela para Favoritos (SVG)
 const FavoriteIcon = ({ isFavorite, ...props }) => (
   <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
   </svg>
 );

  //Card para exibir um Pokémon
 const PokemonCard = ({ pokemon, onFavoriteToggle, isFavorite, onClick }) => {
   const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  
   return (
     <div className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg shadow-md hover:shadow-xl hover:border-gray-500 transition-all duration-300 p-4 flex flex-col items-center text-center">
       <div onClick={() => onClick(pokemon)} className="cursor-pointer">
         <img src={imageUrl} alt={pokemon.name} className="w-32 h-32 object-contain drop-shadow-lg group-hover:scale-110 transition-transform" />
         {/* MODIFICADO: Cor do texto para branco/cinza claro para melhor visibilidade */}
         <h3 className="mt-2 text-lg font-bold text-gray-100 capitalize">{pokemon.name.replace(/-/g, ' ')}</h3>
         <p className="text-sm text-gray-400">#{String(pokemon.id).padStart(3, '0')}</p>
         <div className="flex gap-1 mt-2 justify-center min-h-[20px]">
           {pokemon.types?.map(({ type }) => (
             <span
               key={type.name}
               className="px-2 py-0.5 text-xs text-white rounded-full font-semibold capitalize"
               style={{ backgroundColor: pokemonTypeColors[type.name] || '#A8A77A' }}
             >
               {type.name}
             </span>
           ))}
         </div>
       </div>
       {onFavoriteToggle && (
         <button onClick={() => onFavoriteToggle(pokemon)} className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-500 transition-colors z-10">
           <FavoriteIcon isFavorite={isFavorite} />
         </button>
       )}
     </div>
   );
 };

  //Componente para os cabeçalhos das seções
 const SectionHeader = ({ title, color }) => (
      <div className="flex items-center gap-4 mb-6 p-3 rounded-lg shadow-md" style={{ backgroundColor: `${color}20` }}>
          <div className="w-2 h-8 rounded-full" style={{ backgroundColor: color }}></div>
          <h2 className="text-3xl font-bold capitalize" style={{ color }}>{title}</h2>
      </div>
 );

  //Seção para um tipo de Pokémon
 const TypeSection = ({ type, color, pokemons, onFavoriteToggle, favorites, onCardClick }) => (
   <section id={type} className="mb-12 scroll-mt-20">
     <SectionHeader title={type} color={color} />
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
       {pokemons.map(p => (
         <PokemonCard 
           key={p.id} 
           pokemon={p} 
           onFavoriteToggle={onFavoriteToggle}
           isFavorite={favorites.some(fav => fav.id === p.id)}
           onClick={onCardClick}
         />
       ))}
     </div>
   </section>
 );

  //Modal para exibir detalhes do Pokémon
 const PokemonModal = ({ pokemon, onClose, isLoading }) => {
   if (!pokemon) return null;

   const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

   return (
     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
       <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-md mx-auto p-6 relative text-gray-900" onClick={(e) => e.stopPropagation()}>
         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
         <div className="flex flex-col items-center text-center">
           <img src={imageUrl} alt={pokemon.name} className="w-48 h-48 object-contain drop-shadow-xl" />
           <h2 className="text-3xl font-bold text-gray-900 mt-4 capitalize">{pokemon.name.replace(/-/g, ' ')}</h2>
           <p className="text-sm text-gray-500">#{String(pokemon.id).padStart(3, '0')}</p>
           <div className="flex gap-2 mt-2 justify-center">
             {pokemon.types?.map(({ type }) => (
               <span key={type.name} className="px-3 py-1 text-sm text-white rounded-full font-semibold capitalize" style={{ backgroundColor: pokemonTypeColors[type.name] || '#A8A77A' }}>
                 {type.name}
               </span>
             ))}
           </div>
           <div className="mt-4 text-gray-700 w-full text-left p-4 bg-gray-50 rounded-lg min-h-[100px]">
             <h4 className="font-bold mb-2">Entrada da Pokédex</h4>
             {isLoading ? (
               <p>Carregando descrição...</p>
             ) : (
               <p>{pokemon.description || 'Nenhuma descrição disponível.'}</p>
             )}
           </div>
         </div>
       </div>
     </div>
   );
 };

 // Barra de Navegação por Tipo
 const TypeNavigation = ({ types }) => (
 //   MODIFICADO: Fundo mais escuro para melhor contraste com o texto
   <nav className="mb-12 p-4 bg-black/20 backdrop-blur-md rounded-lg shadow-inner">
     {/* MODIFICADO: Cor do texto para branco */}
     <h3 className="text-xl font-bold text-center text-white mb-4">Navegar para Seção</h3>
     <div className="flex flex-wrap justify-center gap-2">
       <a href="#mega-evolutions" className="px-4 py-1 text-sm text-white font-semibold rounded-full shadow-md hover:scale-105 transform transition-transform duration-200" style={{ backgroundColor: '#4A5568' }}>Mega Evoluções</a>
       <a href="#gigantamax" className="px-4 py-1 text-sm text-white font-semibold rounded-full shadow-md hover:scale-105 transform transition-transform duration-200" style={{ backgroundColor: '#EF4444' }}>Gigantamax</a>
       <a href="#items" className="px-4 py-1 text-sm text-white font-semibold rounded-full shadow-md hover:scale-105 transform transition-transform duration-200" style={{ backgroundColor: '#A0A0A0' }}>Itens</a>
       {Object.entries(types).map(([typeName, typeColor]) => (
         <a
           key={typeName}
           href={`#${typeName}`}
           className="px-4 py-1 text-sm text-white font-semibold rounded-full shadow-md hover:scale-105 transform transition-transform duration-200 capitalize"
           style={{ backgroundColor: typeColor }}
         >
           {typeName}
         </a>
       ))}
     </div>
   </nav>
 );

 // --- COMPONENTES DO TEAM BUILDER ---
 const TeamBuilder = ({ favorites, onSaveTeam }) => {
   const [currentTeam, setCurrentTeam] = useState([]);

   const handleAddToTeam = (pokemon) => {
     if (currentTeam.length < 6 && !currentTeam.some(p => p.id === pokemon.id)) {
       setCurrentTeam([...currentTeam, pokemon]);
     }
   };

   const handleRemoveFromTeam = (pokemon) => {
     setCurrentTeam(currentTeam.filter(p => p.id !== pokemon.id));
   };

   const handleFinalize = () => {
     if (currentTeam.length > 0) {
       onSaveTeam(currentTeam);
       setCurrentTeam([]);
     }
   };

   const teamSlots = Array(6).fill(null);
   currentTeam.forEach((p, i) => teamSlots[i] = p);

   return (
     <section id="team-builder" className="mb-12 scroll-mt-20">
       <SectionHeader title="Montador de Equipe" color="#6366F1" />
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div>
           {/* MODIFICADO: Cor do texto para branco/cinza claro */}
           <h3 className="text-xl font-bold text-gray-100 mb-4">Equipe Atual</h3>
           <div className="grid grid-cols-3 gap-4 bg-black/20 p-4 rounded-lg">
            
             {teamSlots.map((pokemon, index) => (
                // MODIFICADO: Fundo do slot e cor do texto para melhor contraste
               <div key={index} className="h-28 bg-gray-900/50 rounded-lg flex justify-center items-center border-2 border-dashed border-gray-600">
                 {pokemon ? (
                   <img
                     src={pokemon.sprites.front_default}
                     alt={pokemon.name}
                     className="w-20 h-20 object-contain cursor-pointer"
                     onClick={() => handleRemoveFromTeam(pokemon)}
                     title={`Remover ${pokemon.name}`}
                   />
                 ) : (
                   <span className="text-gray-400 text-sm">Slot {index + 1}</span>
                 )}
               </div>
             ))}
           </div>
           <div className="mt-4 flex gap-4">
               <button
                 onClick={handleFinalize}
                 disabled={currentTeam.length === 0}
                 className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
               >
                 Finalizar Equipe
               </button>
               <button
                 onClick={() => setCurrentTeam([])}
                 className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors"
               >
                 Limpar
               </button>
           </div>
         </div>
         <div>
           {/* MODIFICADO: Cor do texto para branco/cinza claro */}
           <h3 className="text-xl font-bold text-gray-100 mb-4">Escolha dos Favoritos</h3>
           {favorites.length > 0 ? (
             <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto bg-black/20 p-4 rounded-lg">
               {favorites.map(p => (
                 <div key={p.id} className="text-center cursor-pointer p-2 rounded-lg hover:bg-gray-700/50" onClick={() => handleAddToTeam(p)}>
                   <img src={p.sprites.front_default} alt={p.name} className="w-20 h-20 mx-auto" />
                   {/* MODIFICADO: Cor do texto para branco */}
                   <p className="text-sm capitalize font-semibold text-white">{p.name}</p>
                 </div>
               ))}
             </div>
           ) : (
             // MODIFICADO: Cor do texto para cinza claro
             <p className="text-gray-400 italic">Adicione Pokémon aos seus favoritos para montar uma equipe.</p>
           )}
         </div>
       </div>
     </section>
   );
 };

 const SavedTeams = ({ teams, onDeleteTeam }) => (
   <section id="saved-teams" className="mb-12 scroll-mt-20">
     <SectionHeader title="Minhas Equipes" color="#8B5CF6" />
     {teams.length > 0 ? (
       <div className="space-y-6">
         {teams.map((team, index) => (
           // MODIFICADO: Fundo do card da equipe
           <div key={index} className="bg-gray-800/50 p-4 rounded-lg shadow-md relative">
             <h4 className="font-bold text-lg mb-2 text-white">Equipe {index + 1}</h4>
             <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
               {team.map(pokemon => (
                   <div key={pokemon.id} className="flex flex-col items-center">
                     <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20" />
                     <p className="text-xs capitalize font-semibold text-gray-200">{pokemon.name}</p>
                   </div>
               ))}
             </div>
               <button onClick={() => onDeleteTeam(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold text-xl">&times;</button>
           </div>
         ))}
       </div>
     ) : (
       // MODIFICADO: Cor do texto para cinza claro
        <p className="text-gray-400 italic pl-4">Você ainda não salvou nenhuma equipe.</p>
     )}
   </section>
 );

  //--- COMPONENTES DE ITENS ---
 const ItemCard = ({ item, onClick }) => (
   <div
     onClick={() => onClick(item)}
      // MODIFICADO: Fundo do card de item
     className="group cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg shadow-md hover:shadow-xl hover:border-gray-500 transition-all duration-300 p-4 flex flex-col items-center text-center"
   >
     <img src={item.sprites.default} alt={item.name} className="w-16 h-16 object-contain group-hover:scale-125 transition-transform" />
     {/* MODIFICADO: Cor do texto do item */}
     <h3 className="mt-2 text-md font-bold text-gray-100 capitalize">{item.name.replace(/-/g, ' ')}</h3>
   </div>
 );

 const ItemsSection = ({ items, onCardClick, isLoading, error }) => (
   <section id="items" className="mb-12 scroll-mt-20">
     <SectionHeader title="Itens Pokémon" color="#A0A0A0" />
     {/* MODIFICADO: Cor do texto de loading */}
     {isLoading && <p className="text-gray-400 italic pl-4">Carregando itens...</p>}
     {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
     {!isLoading && !error && (
       <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
         {items.map(item => (
           <ItemCard key={item.id} item={item} onClick={onCardClick} />
         ))}
       </div>
     )}
   </section>
 );

 const ItemModal = ({ item, onClose }) => {
   if (!item) return null;
  
   const effectEntry = item.effect_entries.find(entry => entry.language.name === 'en');
   const description = effectEntry ? effectEntry.short_effect : 'Nenhuma descrição disponível.';

   return (
     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
       <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-md mx-auto p-6 relative text-gray-900" onClick={(e) => e.stopPropagation()}>
         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
         <div className="flex flex-col items-center text-center">
           <img src={item.sprites.default} alt={item.name} className="w-24 h-24 object-contain drop-shadow-lg" />
           <h2 className="text-2xl font-bold text-gray-900 mt-4 capitalize">{item.name.replace(/-/g, ' ')}</h2>
           <div className="mt-4 text-gray-700 w-full text-left p-4 bg-gray-50 rounded-lg min-h-[100px]">
             <h4 className="font-bold mb-2">Efeito</h4>
             <p>{description}</p>
           </div>
         </div>
       </div>
     </div>
   );
 };

 // --- COMPONENTES DE MECÂNICAS ESPECIAIS ---

 const SpecialFormCard = ({ pokemon, onClick, onFavoriteToggle, isFavorite }) => {
   const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default;
   return (
     <div
        // MODIFICADO: Fundo do card
       className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg shadow-md hover:shadow-xl hover:border-gray-500 transition-all duration-300 p-4 flex flex-col items-center text-center"
     >
       <div onClick={() => onClick(pokemon)} className="cursor-pointer">
         {imageUrl ? (
           <img src={imageUrl} alt={pokemon.name} className="w-32 h-32 object-contain drop-shadow-lg group-hover:scale-110 transition-transform" />
         ) : (
           <div className="w-32 h-32 flex items-center justify-center text-gray-400">Sem Imagem</div>
         )}
         {/* MODIFICADO: Cor do texto */}
         <h3 className="mt-2 text-lg font-bold text-gray-100 capitalize">{pokemon.name.replace(/-/g, ' ')}</h3>
       </div>
       {onFavoriteToggle && (
            <button onClick={() => onFavoriteToggle(pokemon)} className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-500 transition-colors z-10">
            <FavoriteIcon isFavorite={isFavorite} />
          </button>
        )}
     </div>
   );
 };

 const SpecialMechanicSection = ({ id, title, color, data, cardComponent: CardComponent, onCardClick, isLoading, onFavoriteToggle, favorites }) => (
   <section id={id} className="mb-12 scroll-mt-20">
     <SectionHeader title={title} color={color} />
     {isLoading ? (
       // MODIFICADO: Cor do texto de loading
       <p className="text-gray-400 italic pl-4">Carregando...</p>
     ) : (
         data.length > 0 ? (
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
             {data.map(item => (
               <CardComponent 
                 key={item.id} 
                 pokemon={item}
                 onClick={onCardClick}
                 onFavoriteToggle={onFavoriteToggle}
                 isFavorite={favorites?.some(fav => fav.id === item.id)}
               />
             ))}
           </div>
         ) : (
           // MODIFICADO: Cor do texto de aviso
          <p className="text-gray-400 italic pl-4">Pesquise por Pokémon e adicione aos favoritos para vê-los aqui.</p>
         )
     )}
   </section>
 );


//  --- MAIN COMPONENT: App ---
 function App() {
   const [searchTerm, setSearchTerm] = useState('');
   const [searchResult, setSearchResult] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   // ADDED: Estados para autocompletar
   const [allPokemonNames, setAllPokemonNames] = useState([]);
   const [suggestions, setSuggestions] = useState([]);
  
   const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('pokedex-favorites')) || []);
   const [megaEvolutions, setMegaEvolutions] = useState(() => JSON.parse(localStorage.getItem('pokedex-megas')) || []);
   const [gigantamaxForms, setGigantamaxForms] = useState(() => JSON.parse(localStorage.getItem('pokedex-gmax')) || []);
  
   const [pokemonsByType, setPokemonsByType] = useState(() => populateTypesFromFavorites(JSON.parse(localStorage.getItem('pokedex-favorites')) || []));
  
   const [selectedPokemon, setSelectedPokemon] = useState(null);
   const [isModalLoading, setIsModalLoading] = useState(false);

   const [savedTeams, setSavedTeams] = useState(() => JSON.parse(localStorage.getItem('pokedex-teams')) || []);

   const [items, setItems] = useState([]);
   const [isLoadingItems, setIsLoadingItems] = useState(true);
   const [itemsError, setItemsError] = useState(null);
   const [selectedItem, setSelectedItem] = useState(null);
  
    // ADDED: Busca a lista completa de nomes na inicialização
    useEffect(() => {
        const fetchAllNames = async () => {
            try {
                // limit=2000 garante que pegamos todos os pokemons existentes
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
                if(!response.ok) return;
                const data = await response.json();
                setAllPokemonNames(data.results.map(p => p.name));
            } catch (err) {
                console.error("Erro ao carregar lista de nomes", err);
            }
        };
        fetchAllNames();
    }, []);

   useEffect(() => {
     if (searchTerm.trim() === '') {
       setSearchResult(null);
       setError(null);
       setSuggestions([]); // Limpa sugestões se vazio
     }
   }, [searchTerm]);

   useEffect(() => {
     const fetchItems = async () => {
         try {
             const response = await fetch('https://pokeapi.co/api/v2/item?limit=40');
             if (!response.ok) throw new Error('Não foi possível buscar a lista de itens.');
             const listData = await response.json();

             const itemPromises = listData.results.map(item => fetch(item.url).then(res => res.json()));
             const itemsData = await Promise.all(itemPromises);
             setItems(itemsData);
         } catch (err) {
             setItemsError(err.message);
         } finally {
             setIsLoadingItems(false);
         }
     };
    
     fetchItems();
   }, []);

   // ADDED: Função para lidar com a digitação e filtro
   const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
        // Filtra os nomes que contêm o texto digitado (limite de 5 sugestões)
        const filteredSuggestions = allPokemonNames
            .filter(name => name.includes(value.toLowerCase()))
            .slice(0, 5);
        setSuggestions(filteredSuggestions);
    } else {
        setSuggestions([]);
    }
   };

   // ADDED: Função ao clicar em uma sugestão
   const handleSuggestionClick = (name) => {
       setSearchTerm(name);
       setSuggestions([]);
       // Opcional: Disparar a busca automaticamente?
       // Se quiser, pode chamar handleSearch({ preventDefault: () => {} }) aqui,
       // mas precisaria refatorar handleSearch para aceitar o nome como argumento opcional.
       // Por enquanto, apenas preenche o campo.
   };

   const handleSearch = async (e) => {
     e.preventDefault();
     if (!searchTerm) return;
     setIsLoading(true);
     setError(null);
     setSearchResult(null);
     setSuggestions([]); // Esconde sugestões ao buscar
     try {
       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim().replace(/ /g, '-')}`);
       if (!response.ok) throw new Error('Pokémon não encontrado!');
       const data = await response.json();
       setSearchResult(data);
     } catch (err) {
       setError(err.message);
     } finally {
       setIsLoading(false);
     }
   };

   const handleFavoriteToggle = (pokemon) => {
     const isAlreadyFavorite = favorites.some(fav => fav.id === pokemon.id);
     let updatedFavorites = [...favorites];
     let updatedMegas = [...megaEvolutions];
     let updatedGmax = [...gigantamaxForms];

     if (isAlreadyFavorite) {
       updatedFavorites = favorites.filter(fav => fav.id !== pokemon.id);
       if (pokemon.name.includes('-mega')) {
         updatedMegas = megaEvolutions.filter(p => p.id !== pokemon.id);
       }
       if (pokemon.name.includes('-gmax')) {
         updatedGmax = gigantamaxForms.filter(p => p.id !== pokemon.id);
       }
     } else {
       updatedFavorites.push(pokemon);
       if (pokemon.name.includes('-mega')) {
         updatedMegas.push(pokemon);
       }
       if (pokemon.name.includes('-gmax')) {
         updatedGmax.push(pokemon);
       }
     }

     setFavorites(updatedFavorites);
     setMegaEvolutions(updatedMegas);
     setGigantamaxForms(updatedGmax);
     setPokemonsByType(populateTypesFromFavorites(updatedFavorites));

     localStorage.setItem('pokedex-favorites', JSON.stringify(updatedFavorites));
     localStorage.setItem('pokedex-megas', JSON.stringify(updatedMegas));
     localStorage.setItem('pokedex-gmax', JSON.stringify(updatedGmax));
   };


   const handleCardClick = async (pokemon) => {
     setIsModalLoading(true);
     setSelectedPokemon(pokemon);

     try {
       const speciesUrl = pokemon.species?.url || `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`;
       const response = await fetch(speciesUrl);
       if (!response.ok) throw new Error('Não foi possível obter detalhes da espécie.');
       const speciesData = await response.json();
       const englishEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
       const description = englishEntry ? englishEntry.flavor_text.replace(/[\n\f]/g, ' ') : 'Nenhuma descrição encontrada.';
      
       setSelectedPokemon(prev => ({ ...prev, description }));
     } catch (err) {
       console.error(err);
       setSelectedPokemon(prev => ({ ...prev, description: 'Não foi possível carregar a descrição.' }));
     } finally {
       setIsModalLoading(false);
     }
   };

   const handleCloseModal = () => {
     setSelectedPokemon(null);
   };

   const handleSaveTeam = (team) => {
     const newSavedTeams = [...savedTeams, team];
     setSavedTeams(newSavedTeams);
     localStorage.setItem('pokedex-teams', JSON.stringify(newSavedTeams));
   };

   const handleDeleteTeam = (teamIndex) => {
     const newSavedTeams = savedTeams.filter((_, index) => index !== teamIndex);
     setSavedTeams(newSavedTeams);
     localStorage.setItem('pokedex-teams', JSON.stringify(newSavedTeams));
   };
  
   const handleItemCardClick = (item) => {
     setSelectedItem(item);
   };

   const handleCloseItemModal = () => {
     setSelectedItem(null);
   };

   return (
     // MODIFICADO: Gradiente de cinza escuro para cinza médio e cor de texto padrão para branco
     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 font-sans text-white" style={{scrollBehavior: 'smooth'}}>
       <div className="container mx-auto px-4 py-8 max-w-7xl">
        
         <header className="text-center mb-12">
           <div className="flex justify-center items-center gap-4 mb-4">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Poké Ball" className="w-12 h-12" />
             <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">Integrated Pokédex</h1>
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Poké Ball" className="w-12 h-12" />
           </div>
           
           {/* MODIFICADO: Relativo para posicionar as sugestões */}
           <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
             <input
               type="text"
               value={searchTerm}
               onChange={handleInputChange} // Usando o novo handler
               placeholder="Digite o nome ou número do pokémon..."
               className="w-full px-4 py-2 rounded-full bg-white/90 text-gray-900 placeholder-gray-500 shadow-lg shadow-red-800/20 border-2 border-transparent focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none transition"
             />
            
             {/* ADDED: Lista de Sugestões */}
             {suggestions.length > 0 && (
                <ul className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden text-gray-900">
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer capitalize font-medium transition-colors"
                        >
                            {suggestion.replace(/-/g, ' ')}
                        </li>
                    ))}
                </ul>
             )}
           </form>
         </header>

         <main>
           <section id="search-results" className="mb-12">
             {isLoading && <p className="text-center text-white">Procurando...</p>}
             {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
             {searchResult && (
               <div>
                   <SectionHeader title="Resultado da Busca" color="#EF4444" />
                   <div className="flex justify-center">
                     <PokemonCard
                         pokemon={searchResult}
                         onFavoriteToggle={handleFavoriteToggle}
                         isFavorite={favorites.some(fav => fav.id === searchResult.id)}
                         onClick={handleCardClick}
                     />
                   </div>
               </div>
             )}
           </section>

           <TypeNavigation types={pokemonTypeColors} />

           <section id="favorites" className="mb-12 scroll-mt-20">
             <SectionHeader title="Favoritos" color="#FBBF24" />
             {favorites.length > 0 ? (
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                 {favorites.map(p => (
                   <PokemonCard 
                     key={p.id} 
                     pokemon={p} 
                     onFavoriteToggle={handleFavoriteToggle} 
                     isFavorite={true}
                     onClick={handleCardClick}
                   />
                 ))}
               </div>
             ) : (
               // MODIFICADO: Cor do texto de aviso
               <p className="text-gray-400 italic pl-4">Você ainda não adicionou nenhum Pokémon aos seus favoritos.</p>
             )}
           </section>

           <TeamBuilder favorites={favorites} onSaveTeam={handleSaveTeam} />
          
           <SavedTeams teams={savedTeams} onDeleteTeam={handleDeleteTeam} />
          
           <SpecialMechanicSection
             id="mega-evolutions"
             title="Mega Evoluções"
             color="#4A5568"
             data={megaEvolutions}
             cardComponent={SpecialFormCard}
             onCardClick={handleCardClick}
             onFavoriteToggle={handleFavoriteToggle}
             favorites={favorites}
           />

           <SpecialMechanicSection
             id="gigantamax"
             title="Gigantamax"
             color="#EF4444"
             data={gigantamaxForms}
             cardComponent={SpecialFormCard}
             onCardClick={handleCardClick}
             onFavoriteToggle={handleFavoriteToggle}
             favorites={favorites}
           />
          
           <ItemsSection
             items={items}
             onCardClick={handleItemCardClick}
             isLoading={isLoadingItems}
             error={itemsError}
           />
          
           {Object.entries(pokemonTypeColors).map(([type, color]) => (
             pokemonsByType[type] && pokemonsByType[type].length > 0 && (
               <TypeSection
                 key={type}
                 type={type}
                 color={color}
                 pokemons={pokemonsByType[type]}
                 onFavoriteToggle={handleFavoriteToggle}
                 favorites={favorites}
                 onCardClick={handleCardClick}
               />
             )
           ))}
         </main>
       </div>

       {selectedPokemon && (
         <PokemonModal 
           pokemon={selectedPokemon} 
           onClose={handleCloseModal}
           isLoading={isModalLoading} 
         />
       )}

       {selectedItem && (
         <ItemModal 
           item={selectedItem}
           onClose={handleCloseItemModal}
         />
       )}

     </div>
   );
 }



 export default App;