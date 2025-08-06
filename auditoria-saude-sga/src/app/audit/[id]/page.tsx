"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuditForm from '@/components/audit/AuditForm';
import { AuditTemplate } from '@/types/audit'; // Import the main template type

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
  const [template, setTemplate] = useState<AuditTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Effect to fetch establishment details
  useEffect(() => {
    if (id && status === 'authenticated') {
      async function fetchEstablishment() {
        try {
          setLoading(true);
          const response = await fetch(`/api/establishments/${id}`);
          if (!response.ok) throw new Error('Failed to fetch establishment details');
          const data = await response.json();
          setEstablishment(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
      }
      fetchEstablishment();
    }
  }, [id, status]);

  // Effect to fetch the audit template once the establishment is loaded
  useEffect(() => {
    if (establishment) {
      async function fetchTemplate() {
        try {
          const response = await fetch(`/api/audit-templates/${establishment.type}`);
          if (!response.ok) throw new Error(`No audit template for type: ${establishment.type}`);
          const data = await response.json();
          setTemplate(data);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
      }
      fetchTemplate();
    }
  }, [establishment]);

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center min-h-screen"><p>Carregando dados da auditoria...</p></div>;
  }

  if (!session) return null; // Redirect handled by effect

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
            {template ? (
              <AuditForm template={template} />
            ) : (
                <p>Carregando modelo de auditoria...</p>
            )}
        </div>
      </main>
    </div>
  );
}
