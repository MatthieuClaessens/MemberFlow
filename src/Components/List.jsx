/*
    List.jsx

    Composant affichant la liste des personnes.
    - Récupère les personnes depuis l'API via `PersonService.getAll()` au montage.
    - Affiche la liste soit en table (desktop) soit en « cartes » (mobile) pour être responsive.
    - Propose des actions : Ajouter, Modifier, Supprimer.
    - Les actions appellent `PersonService` pour communiquer avec l'API puis rafraîchissent la liste.

    Remarques :
    - Les labels et messages sont en français pour une meilleure lisibilité.
    - La suppression demande confirmation avant d'appeler l'API.
*/
import { UserCircle2, Sparkles, Plus, Pencil, Trash2, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import PersonService from '../service/PersonService';
import { useNavigate } from 'react-router-dom';

function List() {
    const [persons, setPersons] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Récupération des personnes au montage du composant
    useEffect(() => {
        PersonService.getAll()
            .then(data => setPersons(data))
            .catch(err => console.error("Erreur lors de la récupération :", err));
    }, []);

    const onAdd = () => {
        navigate('/person/create');
        setIsMobileMenuOpen(false);
    };

    // Naviguer vers le formulaire d'édition pour une personne (id attendu)
    const onEdit = (id) => {
        navigate(`/person/${encodeURIComponent(id)}/edit`);
        setIsMobileMenuOpen(false);
    };

    // Supprimer une personne puis recharger la liste
    const onDelete = async (id) => {
        if (!window.confirm('Supprimer cette personne ?')) return;
        try {
            await PersonService.deletePerson(id);
            const data = await PersonService.getAll();
            setPersons(data);
        } catch (err) {
            console.error('Erreur suppression:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header avec bouton mobile */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-500/30">
                            <UserCircle2 size={24} className="sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">
                                Gestion des Personnes
                            </h1>
                            <p className="text-slate-400 text-xs sm:text-sm">
                                {persons.length} {persons.length > 1 ? 'personnes enregistrées' : 'personne enregistrée(s)'}
                            </p>
                        </div>
                    </div>
                    
                    {/* Bouton desktop */}
                    <button 
                        onClick={onAdd}
                        className="hidden sm:flex group relative items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Plus size={18} className="sm:w-5 sm:h-5 relative z-10" />
                        <span className="relative z-10 text-sm sm:text-base">Nouvelle personne</span>
                    </button>

                    {/* Bouton mobile menu */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="sm:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-lg shadow-emerald-500/30"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Menu mobile */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden mb-4 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                        <button 
                            onClick={onAdd}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-lg font-semibold shadow-lg shadow-emerald-500/30 mb-3"
                        >
                            <Plus size={18} />
                            <span>Nouvelle personne</span>
                        </button>
                    </div>
                )}

                {/* Table desktop */}
                <div className="hidden lg:block">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700/50">
                                <th className="px-6 lg:px-8 py-4 lg:py-5 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider bg-slate-900/50">
                                    ID
                                </th>
                                <th className="px-6 lg:px-8 py-4 lg:py-5 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider bg-slate-900/50">
                                    Prénom
                                </th>
                                <th className="px-6 lg:px-8 py-4 lg:py-5 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider bg-slate-900/50">
                                    Nom
                                </th>
                                <th className="px-6 lg:px-8 py-4 lg:py-5 text-right text-xs font-bold text-emerald-400 uppercase tracking-wider bg-slate-900/50">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {persons.map(person => (
                                <tr
                                    key={person.id}
                                    className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-all duration-300 group">
                                    <td className="px-6 lg:px-8 py-4 lg:py-5">
                                        <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-sm lg:text-base group-hover:scale-110 transition-transform duration-300">
                                            {person.id}
                                        </div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-4 lg:py-5">
                                        <div className="text-sm lg:text-base font-semibold text-white">{person.firstname}</div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-4 lg:py-5">
                                        <div className="text-sm lg:text-base font-semibold text-white">{person.lastname}</div>
                                    </td>
                                    <td className="px-6 lg:px-8 py-4 lg:py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 lg:gap-3">
                                            <button
                                                onClick={() => onEdit(person.id)}
                                                className="group/btn relative flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-slate-700/50 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 rounded-lg lg:rounded-xl font-medium transition-all duration-300 border border-slate-600/50 hover:border-emerald-500/50 text-sm lg:text-base">
                                                <Pencil size={14} className="lg:w-4 lg:h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
                                                <span>Modifier</span>
                                            </button>
                                            <button
                                                onClick={() => onDelete(person.id)}
                                                className="group/btn relative flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-slate-700/50 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg lg:rounded-xl font-medium transition-all duration-300 border border-slate-600/50 hover:border-red-500/50 text-sm lg:text-base">
                                                <Trash2 size={14} className="lg:w-4 lg:h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                                                <span>Supprimer</span>
                                            </button>
                                       </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Version tablette (cards) */}
                <div className="hidden md:block lg:hidden">
                    <div className="grid grid-cols-1 gap-4">
                        {persons.map(person => (
                            <div 
                                key={person.id}
                                className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:bg-slate-700/30"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 font-bold">
                                            {person.id}
                                        </div>
                                        <div>
                                            <div className="text-base font-semibold text-white">{person.firstname} {person.lastname}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onEdit(person.id)}
                                            className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 rounded-lg font-medium transition-all duration-300 border border-slate-600/50 hover:border-emerald-500/50 text-sm"
                                        >
                                            <Pencil size={14} />
                                            <span>Modifier</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(person.id)}
                                            className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg font-medium transition-all duration-300 border border-slate-600/50 hover:border-red-500/50 text-sm"
                                        >
                                            <Trash2 size={14} />
                                            <span>Supprimer</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Version mobile (cards compactes) */}
                <div className="md:hidden">
                    <div className="grid grid-cols-1 gap-3">
                        {persons.map(person => (
                            <div 
                                key={person.id}
                                className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-sm">
                                            {person.id}
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">{person.firstname} {person.lastname}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(person.id)}
                                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-slate-700/50 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 rounded-lg font-medium transition-all duration-300 border border-slate-600/50 hover:border-emerald-500/50 text-xs"
                                    >
                                        <Pencil size={12} />
                                        <span>Modifier</span>
                                    </button>
                                    <button
                                        onClick={() => onDelete(person.id)}
                                        className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-slate-700/50 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg font-medium transition-all duration-300 border border-slate-600/50 hover:border-red-500/50 text-xs"
                                    >
                                        <Trash2 size={12} />
                                        <span>Supprimer</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;