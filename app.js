const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function preencherEaplanarCamposPDF(origem, destino, valores) {
  const pdfBytes = fs.readFileSync(origem);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  // Preencher os campos de formulário com os valores fornecidos
  for (const [fieldName, value] of Object.entries(valores)) {
    const field = form.getTextField(fieldName);
    if (field) {
      field.setText(value);
    }
  }

  // Aplanar os campos de formulário preenchidos
  form.flatten();

  // Salvar o novo PDF com os campos aplanados
  const pdfBytesAplanado = await pdfDoc.save();
  fs.writeFileSync(destino, pdfBytesAplanado);
}

const valoresDosCampos = {
  TITULO:
    "Assistência jurídica mútua internacional para acesso de provas digitais no Brasil: plataforma de compartilhamento de evidências para cadeia de custódia em crimes cibernéticos",
  ALUNO1: "DIEGO SOUZA LIMA MARQUES",
  DIA: "28",
  MES: "Setembro",
  ANO: "2023",
  DATA: "28 de Setembro de 2023",
  ORIENTADOR: "IVAN CARLOS ALCANTARA DE OLIVEIRA",
  AVALIADOR1: "LEANDRO CARLOS FERNANDES",
  AVALIADOR2: "ARNALDO RABELLO DE AGUIAR VALLIM FILHO",

  // Adicione mais campos e valores conforme necessário
};

preencherEaplanarCamposPDF(
  "declaracao10.pdf",
  "arquivo_preenchido.pdf",
  valoresDosCampos
);
