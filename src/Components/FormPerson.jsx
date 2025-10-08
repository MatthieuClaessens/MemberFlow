import { useState, useEffect } from 'react';
import { ArrowLeft, Save, UserPlus, UserCheck } from 'lucide-react';
import './formperson.css';
import PersonService from '../service/PersonService';
import { useNavigate, useParams } from 'react-router-dom';


function FormPerson({ person: propPerson }) {
    const params = useParams();
    const personId = params.id;
    const [person, setPerson] = useState(propPerson || null);
    const [firstname, setFirstname] = useState(person ? person.firstname : '');
    const [lastname, setLastname] = useState(person ? person.lastname : '');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (person || personId) {
                const idToUse = person ? person.id : personId;
                await PersonService.editPerson(idToUse, firstname, lastname);
            } else {
                await PersonService.createPerson(firstname, lastname);
            }
            navigate('/');
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
        }
        finally {
            setLoading(false);
        }
    };

    const onBack = () => {
        navigate('/');
    };

    useEffect(() => {
        let mounted = true;
        const fetchPerson = async () => {
            if (personId && !propPerson) {
                try {
                    const data = await PersonService.getPerson(personId);
                    if (mounted && data) {
                        setPerson(data);
                        setFirstname(data.firstname || '');
                        setLastname(data.lastname || '');
                    }
                } catch (err) {
                    console.error('Erreur récupération personne:', err);
                }
            }
        };
        fetchPerson();
        return () => { mounted = false };
    }, [personId, propPerson]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>

            <div className="relative max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-emerald-500/50 rounded-xl text-slate-400 hover:text-emerald-400 transition-all duration-300"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg shadow-emerald-500/30">
                            {person ? <UserCheck size={28} className="text-white" /> : <UserPlus size={28} className="text-white" />}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                {person ? 'Modifier une personne' : 'Nouvelle personne'}
                            </h1>
                            <p className="text-slate-400 text-sm mt-0.5">
                                {person ? 'Mettez à jour les informations' : 'Ajoutez une nouvelle personne'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="space-y-6">
                            { (person || personId) && (
                                <div className="group">
                                    <label htmlFor="id" className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        ID
                                    </label>
                                    <input
                                        type="text"
                                        id="id"
                                        value={person ? person.id : personId}
                                        readOnly
                                        className="w-full px-5 py-4 bg-slate-900/30 border border-slate-700/30 rounded-xl outline-none text-white"
                                    />
                                </div>
                            )}

                            <div className="group">
                                <label htmlFor="firstname" className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                    className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all duration-300 text-white placeholder-slate-500 group-hover:border-slate-600/50"
                                    placeholder="Entrez le prénom"
                                />
                            </div>

                            <div className="group">
                                <label htmlFor="lastname" className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                    className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all duration-300 text-white placeholder-slate-500 group-hover:border-slate-600/50"
                                    placeholder="Entrez le nom"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-semibold transition-all duration-300 flex-1 border border-slate-600/50 hover:border-slate-500/50"
                            >
                                <ArrowLeft size={20} />
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                disabled={loading || firstname.trim() === '' || lastname.trim() === ''}
                                className="group relative flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Save size={20} className="relative z-10" />
                                <span className="relative z-10">{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormPerson;