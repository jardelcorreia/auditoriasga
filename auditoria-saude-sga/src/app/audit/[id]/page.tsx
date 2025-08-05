"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define the type for an establishment
type Establishment = {
  id: string;
  name: string;
  code: string;
  type: 'Hospital' | 'Specialized' | 'Support' | 'UAPS';
};

export default function AuditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (id && status === 'authenticated') {
      async function fetchEstablishment() {
        try {
          setLoading(true);
          const response = await fetch(`/api/establishments/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch establishment details');
          }
          const data = await response.json();
          setEstablishment(data);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      }
      fetchEstablishment();
    }
  }, [id, status]);

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center min-h-screen"><p>Carregando...</p></div>;
  }

  if (!session) {
    // This will be handled by the useEffect redirect, but it's good practice
    return null;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen"><p className="text-red-500">Erro: {error}</p></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
       <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">&larr; Voltar ao Painel</Link>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 mt-2">
            Auditoria: {establishment?.name}
          </h1>
          <p className="mt-1 text-md text-gray-600">
            Código: {establishment?.code} | Tipo: {establishment?.type}
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Checklist de Auditoria</h2>
                <p className="text-gray-600">O formulário de checklist específico para este tipo de estabelecimento ({establishment?.type}) será exibido aqui.</p>
                <div className="mt-6 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <p className="text-gray-500">Módulo de formulário em desenvolvimento.</p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
