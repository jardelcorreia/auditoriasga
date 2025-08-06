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

const uapsTemplate = {
  name: "Checklist de Auditoria para UAPS",
  version: "1.0",
  sections: [
    {
      id: "infra",
      title: "Infraestrutura",
      questions: [
        { id: "infra_01", text: "A unidade possui uma sala de recepção adequada?", type: "yes_no_na", points: { yes: 10, no: 0, na: 0 } },
        { id: "infra_02", text: "Os consultórios médicos garantem a privacidade do paciente?", type: "yes_no", points: { yes: 10, no: 0 } },
        { id: "infra_03", text: "A unidade possui banheiro para pacientes?", type: "yes_no", points: { yes: 5, no: 0 } },
        { id: "infra_04", text: "A unidade possui rampa de acesso para cadeirantes?", type: "yes_no", points: { yes: 10, no: 0 } }
      ]
    },
    {
      id: "rh",
      title: "Recursos Humanos",
      questions: [
        { id: "rh_01", text: "A equipe de saúde da família está completa (médico, enfermeiro, técnico, ACS)?", type: "yes_no", points: { yes: 20, no: 0 } },
        { id: "rh_02", text: "Qual o número de Agentes Comunitários de Saúde (ACS)?", type: "number", points: null },
        { id: "rh_03", text: "Há profissional de saúde bucal na equipe?", type: "yes_no", points: { yes: 10, no: 0 } }
      ]
    },
    {
      id: "farmacia",
      title: "Farmácia",
      questions: [
        { id: "farm_01", text: "O armazenamento de medicamentos está adequado (temperatura, organização)?", type: "yes_no", points: { yes: 15, no: 0 } },
        { id: "farm_02", text: "Há controle de validade dos medicamentos?", type: "yes_no", points: { yes: 15, no: 0 } }
      ]
    }
  ]
};

async function main() {
  console.log(`Start seeding establishments...`);
  // Clear existing data
  await prisma.auditTemplate.deleteMany({});
  await prisma.establishment.deleteMany({});

  for (const e of establishmentData) {
    await prisma.establishment.create({
      data: e,
    });
  }
  console.log(`Finished seeding establishments.`);

  console.log(`Start seeding audit templates...`);
  await prisma.auditTemplate.create({
    data: {
      name: 'Modelo Padrão de UAPS',
      establishment_type: 'UAPS',
      template_data: uapsTemplate as any, // Cast to any to avoid type issues with JSON structure
    },
  });
  console.log(`Finished seeding audit templates.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
