import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// --- Database Connection Code (Ready to be enabled) ---
// 1. Instantiate Prisma Client
// const prisma = new PrismaClient();
//
// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params;
//     const establishment = await prisma.establishment.findUnique({
//       where: { id },
//     });
//     if (establishment) {
//       return NextResponse.json(establishment);
//     } else {
//       return NextResponse.json({ error: 'Establishment not found' }, { status: 404 });
//     }
//   } catch (error) {
//     console.error(`API Error fetching establishment ${params.id}:`, error);
//     return NextResponse.json({ error: 'Failed to fetch data from database' }, { status: 500 });
//   }
// }
// ---------------------------------------------------------


// --- Mock Data Code (Currently active) ---
const mockEstablishments = [
    { id: '1', name: 'Hospital Geral Luiza Alcântara e Silva (HGLAS)', code: '24.271.25', type: 'Hospital', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Clínica Municipal de Fisioterapia', code: '67.798.24', type: 'Specialized', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', name: 'Unidade de Pronto Atendimento (UPA 24hs)', code: '73.968.05', type: 'Hospital', createdAt: new Date(), updatedAt: new Date() },
    { id: '4', name: 'Centro de Atenção Psicossocial (CAPS II - SGA)', code: '74.675.59', type: 'Specialized', createdAt: new Date(), updatedAt: new Date() },
    { id: '5', name: 'Policlínica Municipal de São Gonçalo do Amarante', code: '90.996.46', type: 'Specialized', createdAt: new Date(), updatedAt: new Date() },
    { id: '6', name: 'Central de Abastecimento Farmacêutico (CAF)', code: '93.059.63', type: 'Support', createdAt: new Date(), updatedAt: new Date() },
    { id: '7', name: 'Laboratório Municipal', code: '99.589.32', type: 'Support', createdAt: new Date(), updatedAt: new Date() },
    { id: '8', name: 'Serviço de Atendimento Móvel de Urgência (SOS)', code: '04.823.15', type: 'Support', createdAt: new Date(), updatedAt: new Date() },
    { id: '9', name: 'CER Maria da Conceição Rodrigues de Andrade', code: '40.648.95', type: 'Specialized', createdAt: new Date(), updatedAt: new Date() },
    { id: '10', name: 'UAPS ACENDE CAMPO', code: '26.839.81', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '11', name: 'UAPS CARRAPICHO', code: '26.840.07', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '12', name: 'UAPS CROATÁ', code: '26.840.15', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '13', name: 'UAPS CUSTÓDIO', code: '26.840.31', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '14', name: 'UAPS ESTRELA', code: '26.840.58', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '15', name: 'UAPS GENIPAPO', code: '26.840.74', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '16', name: 'UAPS GUARDA', code: '26.840.82', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '17', name: 'UAPS LAGOA DAS COBRAS', code: '26.841.04', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '18', name: 'UAPS LAGOA DO SERROTE', code: '26.841.20', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '19', name: 'UAPS MELANCIAS', code: '26.841.47', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '20', name: 'UAPS PARADA', code: '26.841.63', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '21', name: 'UAPS PECÉM', code: '26.841.71', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '22', name: 'UAPS SADITE', code: '26.841.98', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '23', name: 'UAPS SALMON', code: '26.842.10', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '24', name: 'UAPS SERROTE', code: '26.842.36', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '25', name: 'UAPS SIUPÉ', code: '26.842.52', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '26', name: 'UAPS TAIBA', code: '26.842.60', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '27', name: 'UAPS VÁRZEA REDONDA', code: '26.842.87', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '28', name: 'UAPS UMARITUBA', code: '26.842.79', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '29', name: 'UAPS SEDE', code: '26.842.28', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
    { id: '30', name: 'UAPS HARMONIA', code: '09.303.49', type: 'UAPS', createdAt: new Date(), updatedAt: new Date() },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const establishment = mockEstablishments.find(e => e.id === id);
  if (establishment) {
    return NextResponse.json(establishment);
  } else {
    return NextResponse.json({ error: 'Establishment not found' }, { status: 404 });
  }
}
// ---------------------------------------------------------
