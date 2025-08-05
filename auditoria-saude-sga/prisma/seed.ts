import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const establishmentData = [
  // Hospitais e Clínicas Especializadas
  { name: 'Hospital Geral Luiza Alcântara e Silva (HGLAS)', code: '24.271.25', type: 'Hospital' },
  { name: 'Clínica Municipal de Fisioterapia', code: '67.798.24', type: 'Specialized' },
  { name: 'Unidade de Pronto Atendimento (UPA 24hs)', code: '73.968.05', type: 'Hospital' },
  { name: 'Centro de Atenção Psicossocial (CAPS II - SGA)', code: '74.675.59', type: 'Specialized' },
  { name: 'Policlínica Municipal de São Gonçalo do Amarante', code: '90.996.46', type: 'Specialized' },

  // Serviços de Apoio
  { name: 'Central de Abastecimento Farmacêutico (CAF)', code: '93.059.63', type: 'Support' },
  { name: 'Laboratório Municipal', code: '99.589.32', type: 'Support' },
  { name: 'Serviço de Atendimento Móvel de Urgência (SOS)', code: '04.823.15', type: 'Support' },
  { name: 'CER Maria da Conceição Rodrigues de Andrade', code: '40.648.95', type: 'Specialized' },

  // Unidades de Atenção Primária à Saúde (UAPS)
  { name: 'UAPS ACENDE CAMPO', code: '26.839.81', type: 'UAPS' },
  { name: 'UAPS CARRAPICHO', code: '26.840.07', type: 'UAPS' },
  { name: 'UAPS CROATÁ', code: '26.840.15', type: 'UAPS' },
  { name: 'UAPS CUSTÓDIO', code: '26.840.31', type: 'UAPS' },
  { name: 'UAPS ESTRELA', code: '26.840.58', type: 'UAPS' },
  { name: 'UAPS GENIPAPO', code: '26.840.74', type: 'UAPS' },
  { name: 'UAPS GUARDA', code: '26.840.82', type: 'UAPS' },
  { name: 'UAPS LAGOA DAS COBRAS', code: '26.841.04', type: 'UAPS' },
  { name: 'UAPS LAGOA DO SERROTE', code: '26.841.20', type: 'UAPS' },
  { name: 'UAPS MELANCIAS', code: '26.841.47', type: 'UAPS' },
  { name: 'UAPS PARADA', code: '26.841.63', type: 'UAPS' },
  { name: 'UAPS PECÉM', code: '26.841.71', type: 'UAPS' },
  { name: 'UAPS SADITE', code: '26.841.98', type: 'UAPS' },
  { name: 'UAPS SALMON', code: '26.842.10', type: 'UAPS' },
  { name: 'UAPS SERROTE', code: '26.842.36', type: 'UAPS' },
  { name: 'UAPS SIUPÉ', code: '26.842.52', type: 'UAPS' },
  { name: 'UAPS TAIBA', code: '26.842.60', type: 'UAPS' },
  { name: 'UAPS VÁRZEA REDONDA', code: '26.842.87', type: 'UAPS' },
  { name: 'UAPS UMARITUBA', code: '26.842.79', type: 'UAPS' },
  { name: 'UAPS SEDE', code: '26.842.28', type: 'UAPS' },
  { name: 'UAPS HARMONIA', code: '09.303.49', type: 'UAPS' },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const e of establishmentData) {
    const establishment = await prisma.establishment.create({
      data: e,
    });
    console.log(`Created establishment with id: ${establishment.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
