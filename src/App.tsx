import { useUsers } from './hooks/useUsers'
import { UserCard } from './components/UserCard'
import { UserModal } from './components/UserModal'
import { useState, useEffect } from 'react'

import { Toaster } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import type { User } from './hooks/useUsers'
import { Search, Filter, Moon, Sun } from 'lucide-react'

// Importation des icônes Lucide React pour les vues Grille et Liste
import { LayoutGrid, List } from 'lucide-react';

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  // Initialisation de l'état avec localStorage et les préférences système en fallback
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Si aucun thème n'est sauvegardé, on vérifie les préférences système
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [genderFilter, setGenderFilter] = useState<'male' | 'female' | undefined>(undefined)
  const { data, isLoading, isError } = useUsers(genderFilter)

  const [isGridView, setIsGridView] = useState(true);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen p-10 bg-[#fefabe] dark:bg-zinc-900">
      <Toaster position="bottom-right" />
      <h1 className="text-3xl font-bold text-orange-600 dark:text-white mb-8">
        PeopleFind
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Bienvenue sur PeopleFind, recherchez les personnes que vous connaissez.</p>
      <div className="flex justify-between mt-4 mb-4">
        <div className="relative w-[60%]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" placeholder="Recherchez quelqu'un..." className="block w-full pl-10 pr-3 py-2 rounded-md bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <label htmlFor="gender-select" className="sr-only">Filtrer par genre</label>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 pointer-events-none">
              <Filter size={18} />
            </div>
            <select
              id="gender-select"
              value={genderFilter || ''}
              onChange={(e) => {
                const value = e.target.value as 'male' | 'female' | '';
                setGenderFilter(value === '' ? undefined : value);
              }}
              className="appearance-none pl-10 pr-6 py-2 rounded-md bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous</option>
              <option value="male">Hommes</option>
              <option value="female">Femmes</option>
            </select>
          </div>

          {/* Bouton grille / liste */}
          <button
            onClick={toggleView}
            className="p-2 rounded-md bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors duration-200"
            aria-label={isGridView ? "Changer en vue liste" : "Changer en vue grille"}
          >
            {isGridView ? <List size={24} /> : <LayoutGrid size={24} />}
          </button>
          {/* Toggle Dark Mode */}
  <button
    onClick={() => setIsDarkMode(!isDarkMode)}
    className="p-2 rounded-md bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors duration-200"
    aria-label="Toggle dark mode"
  >
    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
  </button>
        </div>



      </div>

      {isLoading && (
        <div className="text-center">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      )}
      {isError && (
        <p className="text-center text-red-500">Erreur de chargement 😥</p>
      )}

      {/* Rendu conditionnel de la liste en fonction de la vue sélectionnée */}
      <div
        className={
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "flex flex-col gap-4" // Classes pour la vue liste (flex vertical)
        }
      >
        {/* Note : Le composant UserCard doit gérer son propre affichage en fonction du contexte de la vue (grille ou liste) */}
        {data?.map((user) => (
          <UserCard
            key={user.login.uuid}
            user={user}
            onClick={() => setSelectedUser(user)}
            isListView={!isGridView} // Passer une prop pour informer UserCard du style de vue
          />
        ))}
      </div>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}



    </div>
  )
}

export default App