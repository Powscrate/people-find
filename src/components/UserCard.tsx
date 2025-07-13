import type { User } from '../hooks/useUsers'
import { UserPlus2, MessageCircleMoreIcon, MoreVertical, MessageSquareDot } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Props {
  user: User
  onClick: () => void
  isListView?: boolean // Indique si nous sommes en vue liste
}

export const UserCard = ({ user, onClick, isListView }: Props) => {

  // Rendu de la vue simple (Liste)
  if (isListView) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-4 flex items-center justify-between cursor-pointer border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition duration-200"
        onClick={onClick}
      >
        <div className="flex items-center space-x-5 flex-grow">
          {/* Image */}
          <img
            src={user.picture.thumbnail}
            alt={`Photo de ${user.name.first}`}
            className="w-16 h-16 rounded-full "
          />

          <div className="flex flex-col space-y-1">
            {/* Nom */}
            <h3 className="font-bold text-xl text-gray-900 dark:text-white">
              {user.name.first} {user.name.last}
            </h3>
            {/* Localisation */}
            <p className="text-base text-gray-600 dark:text-gray-400">
              {user.location.city}, {user.location.country}
            </p>
          </div>
        </div>

        {/* Section des actions et contact (cachée sur petits écrans pour garder la liste propre) */}
        <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">

          {/* Contact (mail et numéro) */}
          <div className="flex flex-col items-end">
            <p className="text-gray-900 dark:text-gray-100 font-semibold">{user.email}</p>
            <p className="text-gray-700 dark:text-gray-300">{user.phone}</p>
          </div>

          {/* Boutons d'action */}
          <div className="flex space-x-3">
            <button
              className="p-2 rounded-full bg-gray-700 dark:bg-zinc-700 border-none text-white hover:bg-blue-600 transition"
              title="Ajouter"
              onClick={(e) => {
                e.stopPropagation()
                toast.success(`${user.name.first} a été ajouté(e) !`)
              }}
            >
              <UserPlus2 size={20} />
            </button>
            <button
              className="p-2 rounded-full bg-gray-700 dark:bg-zinc-700 border-none text-white hover:bg-green-600 transition"
              title="Envoyer un message"
              onClick={(e) => {
                e.stopPropagation()
                toast('Message envoyé !', { icon: <MessageSquareDot /> })
              }}
            >
              <MessageCircleMoreIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div
      className='bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition cursor-pointer dark:bg-zinc-800'
      onClick={onClick} // L'onClick est sur le conteneur principal pour la grille
    >
      <div className="flex gap-4">
        <div className="image">
          <img
            src={user.picture.large}
            alt={`Photo de ${user.name.first} ${user.name.last}`}
            className="rounded-full w-24 h-24 mb-4"
          />
        </div>
        <div className="informations text-left flex flex-col justify-center">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {user.name.first} {user.name.last}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.location.country}
          </p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
          <div className="mt-5 flex justify-between">
            <button
              className="bg-gray-200 dark:bg-zinc-700 rounded-xl p-3 text-gray-900 dark:text-white"
              onClick={(e) => {
                e.stopPropagation()
                toast.success(`${user.name.first} a été ajouté(e) !`)
              }}
            >
              <UserPlus2 size={20} />
            </button>
            <button
              className="bg-gray-200 dark:bg-zinc-700 rounded-xl p-2 text-gray-900 dark:text-white"
              onClick={(e) => {
                e.stopPropagation()
                toast('Message envoyé !', { icon: <MessageSquareDot /> })
              }}
            >
              <MessageCircleMoreIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};