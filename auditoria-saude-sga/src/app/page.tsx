"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define the type for an establishment based on our data model
type Establishment = {
  id: string;
  name: string;
  code: string;
  type: 'Hospital' | 'Specialized' | 'Support' | 'UAPS';
};

const establishmentTypes: Establishment['type'][] = ['Hospital', 'UAPS', 'Specialized', 'Support'];

import { signOut } from 'next-auth/react';

export default function AuditDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [filter, setFilter] = useState<Establishment['type'] | 'All'>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/establishments');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEstablishments(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredEstablishments = useMemo(() => {
    if (filter === 'All') {
      return establishments;
    }
    return establishments.filter(e => e.type === filter);
  }, [establishments, filter]);

  const getBadgeColor = (type: Establishment['type']) => {
    switch (type) {
      case 'Hospital': return 'bg-red-100 text-red-800';
      case 'UAPS': return 'bg-blue-100 text-blue-800';
      case 'Specialized': return 'bg-green-100 text-green-800';
      case 'Support': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading' || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Painel de Auditoria - Saúde SGA
            </h1>
            <p className="mt-1 text-md text-gray-600">
              Bem-vindo, {session.user?.name || 'Auditor'}.
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Filter Controls */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('All')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                Todos
              </button>
              {establishmentTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === type ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {type === 'UAPS' ? 'UAPS' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Establishments List */}
          {loading && <p>Carregando estabelecimentos...</p>}
          {error && <p className="text-red-500">Erro: {error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEstablishments.map(est => (
                <div key={est.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{est.name}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(est.type)}`}>
                        {est.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Código: {est.code}</p>
                    <Link href={`/audit/${est.id}`} passHref>
                      <button className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors">
                        Iniciar Auditoria
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
