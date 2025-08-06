import { NextResponse } from 'next/server';

// In a real application, you would fetch this from the database
// const template = await prisma.auditTemplate.findFirst({ where: { establishment_type: type } });

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


export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const { type } = params;

  if (type.toUpperCase() === 'UAPS') {
    return NextResponse.json(uapsTemplate);
  } else {
    // In the future, you would fetch other templates here
    return NextResponse.json({ error: `No audit template found for type: ${type}` }, { status: 404 });
  }
}
