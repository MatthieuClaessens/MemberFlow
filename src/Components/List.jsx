import { UserCircle2, Sparkles, Plus, Pencil, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import PersonService from '../service/PersonService';
import { useNavigate } from 'react-router-dom';

function List() {
    const [persons, setPersons] = useState([]);
    const navigate = useNavigate();

    // Récupération des personnes au montage du composant
    useEffect(() => {
        PersonService.getAll()
            .then(data => setPersons(data))
            .catch(err => console.error("Erreur lors de la récupération :", err));
    }, []);

    const onAdd = () => {
        navigate('/person/create');
    };

    // Naviguer vers le formulaire d'édition pour une personne (id attendu)
    const onEdit = (id) => {
        navigate(`/person/${encodeURIComponent(id)}/edit`);
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>

            <div className="relative max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg shadow-emerald-500/30">
                            <UserCircle2 size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">Gestion des Personnes</h1>
                            <p className="text-slate-400 text-sm">
                                {persons.length} {persons.length > 1 ? 'personnes enregistrées' : 'personne enregistrée(s)'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onAdd}
                        className="group relative flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                    >

                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Plus size={20} className="relative z-10" />
                        <span className="relative z-10">Nouvelle personne</span>
                    </button>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-700/50">
                            <th className="px-8 py-5 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider bg-slate-900/50">
                                ID
                            </th>
                            <th className="px-8 py-5 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider bg-slate-900/50">
                                Prénom
                            </th>
                            <th className="px-8 py-5 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider bg-slate-900/50">
                                Nom
                            </th>
                            <th className="px-8 py-5 text-right text-xs font-bold text-emerald-400 uppercase tracking-wider bg-slate-900/50">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map(person => (
                            <tr
                                key={person.id}
                                className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-all duration-300 group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 font-bold group-hover:scale-110 transition-transform duration-300">
                                        {person.id}
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="text-base font-semibold text-white">{person.firstname}</div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="text-base font-semibold text-white">{person.lastname}</div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => onEdit(person.id)}
                                            className="group/btn relative flex items-center gap-2 px-4 py-2.5 bg-slate-700/50 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 rounded-xl font-medium transition-all duration-300 border border-slate-600/50 hover:border-emerald-500/50">
                                            <Pencil size={16} className="transition-transform duration-300 group-hover/btn:rotate-12" />
                                            <span>Modifier</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(person.id)}
                                            className="group/btn relative flex items-center gap-2 px-4 py-2.5 bg-slate-700/50 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-xl font-medium transition-all duration-300 border border-slate-600/50 hover:border-red-500/50">
                                            <Trash2 size={16} className="transition-transform duration-300 group-hover/btn:scale-110" />
                                            <span>Supprimer</span>
                                        </button>
                                   </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default List;
