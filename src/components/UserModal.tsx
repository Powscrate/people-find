import type { User } from '../hooks/useUsers'
import { Mail, Phone, MapPin, Calendar, UserPlus2, Send, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Props {
  user: User
  onClose: () => void
}

export const UserModal = ({ user, onClose }: Props) => {
  return (
    // Arrière-plan avec effet de flou et animation d'apparition
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Conteneur de la modale avec animation */}
      <div
        className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-lg relative transform transition-all duration-300 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête avec dégradé et photo de profil */}
        <div className="relative h-32 rounded-t-2xl bg-gradient-to-r from-blue-500 to-purple-600">
          <img
            src={user.picture.large}
            alt={`Profil de ${user.name.first}`}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors rounded-full p-1 hover:bg-white/20"
            aria-label="Fermer la fenêtre modale"
          >
            <X size={24} />
          </button>
        </div>

        {/* Informations de l'utilisateur */}
        <div className="pt-20 pb-6 px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-md text-gray-500 dark:text-gray-400">
            @{user.login.username}
          </p>
        </div>

        {/* Section des détails */}
        <div className="px-8 pb-8 space-y-4 text-left">
          <div className="flex items-center text-gray-700 dark:text-gray-300"><Mail size={18} className="mr-4 text-gray-400 flex-shrink-0" /><span>{user.email}</span></div>
          <div className="flex items-center text-gray-700 dark:text-gray-300"><Phone size={18} className="mr-4 text-gray-400 flex-shrink-0" /><span>{user.phone}</span></div>
          <div className="flex items-center text-gray-700 dark:text-gray-300"><MapPin size={18} className="mr-4 text-gray-400 flex-shrink-0" /><span>{user.location.city}, {user.location.state}, {user.location.country}</span></div>
          <div className="flex items-center text-gray-700 dark:text-gray-300"><Calendar size={18} className="mr-4 text-gray-400 flex-shrink-0" /><span>Né(e) le {new Date(user.dob.date).toLocaleDateString('fr-FR')} ({user.dob.age} ans)</span></div>
        </div>

        {/* Boutons d'action */}
        <div className="px-8 py-5 bg-gray-50 dark:bg-zinc-900/50 rounded-b-2xl flex justify-end space-x-3">
          <button className="bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white font-semibold py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors" onClick={() => toast.success(`${user.name.first} a été ajouté(e) !`)}><UserPlus2 size={18} />Ajouter</button>
          <button className="bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors" onClick={() => toast('Message envoyé !', { icon: '✉️' })}><Send size={18} />Message</button>
        </div>
      </div>
    </div>
  )
}
