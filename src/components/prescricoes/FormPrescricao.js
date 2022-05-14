import { jsPDF } from "jspdf";
import * as PDFObject from "pdfobject";
import "./FormPrescricao.scss";
import logo from "./generic-logo.jpg";

export default function FormPrescricao() {
  const gerarPDF = () => {
    let preview = document.getElementById('prescricao');
    let doc = jsPDF('p', 'pt', 'a4');
    doc.html(preview, {
      callback: function (doc) {
        PDFObject.embed(doc.output('datauristring'), "#preview");
      },
      x: 0,
      y: 0,
      html2canvas: { scale: 0.75 },
   });
  };

  return (
    <>
      <div id="preview">
      </div>

      <button onClick={() => gerarPDF()}>Gerar PDF</button>

      <div className="main-page" id="prescricao">
        <div className="sub-page">
          <img src={logo} alt="Logo" className="logo"/>
          <h3 align='center'>A4 Page in Portrait.(210mm X 297mm)</h3>
          <p>Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.A ordem dos tratores não altera o pão duris.Si num tem leite então bota uma pinga aí cumpadi!Suco de cevadiss deixa as pessoas mais interessantis.</p>
          <p>Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.A ordem dos tratores não altera o pão duris.Si num tem leite então bota uma pinga aí cumpadi!Suco de cevadiss deixa as pessoas mais interessantis.</p>
          <p>Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.A ordem dos tratores não altera o pão duris.Si num tem leite então bota uma pinga aí cumpadi!Suco de cevadiss deixa as pessoas mais interessantis.</p>
          <p>Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.A ordem dos tratores não altera o pão duris.Si num tem leite então bota uma pinga aí cumpadi!Suco de cevadiss deixa as pessoas mais interessantis.</p>

          <div className="flex">
            <div className="caixa"><p>Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.A ordem dos tratores não altera o pão duris.Si num tem leite então bota uma pinga aí cumpadi!Suco de cevadiss deixa as pessoas mais interessantis.</p></div>
            <div className="caixa"><p>Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.A ordem dos tratores não altera o pão duris.Si num tem leite então bota uma pinga aí cumpadi!Suco de cevadiss deixa as pessoas mais interessantis.</p></div>
          </div>
        </div>    
      </div>
    </>
  );
};