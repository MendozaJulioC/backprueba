const  cron = require('node-cron');
const { transporter } = require('../mailer')
const infoCtrl = require('../../controllers/info.controllers')
const formatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});
var numberFormat = new Intl.NumberFormat("es-ES");

async function main(data) {
  // console.log('datos::::', data);
  // send mail with defined transport object
  const info = await transporter.sendMail({
      from: `"CatastroVirtualApp" <${process.env.K_EMAIL}>`, // sender address
      to: ` jmvcap@gmail.com, berriovillabogados@gmail.com, saereba@gmail.com,
            juank.gomez05@gmail.com, kelotrucho@gmail.com, juliomendoza.medellin@gmail.com`,  // list of receivers

    //    cc: [
    //      `  jonnyolarteb@hotmail.com,
    //         diegalex22@gmail.com,
    //         jpbedoya@gmail.com,geandre7@gmail.com,
    //         marinellaalarcon6@gmail.com,
    //         jonnyolarteb@hotmail.com,
    //         diealex22@gmail.com,
    //         jpbedoya@gmail.com,
    //         geandre7@gmail.com,
    //         marinellaalarcon6@gmail.com,
    //         juliquintero770@gmail.com
    //    `],
        cc: ["juliquintero770@gmail.com"] ,
        subject: "Informe Base Gravable ✔", // Subject line
        text: "Información Catastro Medellín", // plain text body
        html: `
        <div style="text-align: left;">
            <br>
              <a href="https://www.medellin.gov.co/es/secretaria-gestion-y-control-territorial/" style="display: inline-block;">
                <img src="https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/themes/theme_alcaldia/logos/logo_footer.png"
                alt="Secretaria de Gestión y Control Territorial"
                style="width:100px;height:90px;"/>
              </a>
          </div>
          <br>
          <h1>Base Gravable Catastro Medellín</h1>
          <div style="text-align: center;">
            <div style="overflow-x:auto;">
               <style>
                    tr:nth-child(even) {background-color: #f2f2f2;}
                    table { margin: auto; }
                </style>
                <table style="border-collapse: collapse; width: 100%; border: 1px solid #dededf;">
                  <thead>
                      <tr style="background-color: #eceff1;">
                          <th style="border: 1px solid #dededf; padding: 8px; width:20%;">Variables</th>
                          <th style="border: 1px solid #dededf; padding: 8px;">Corte: &nbsp; ${new Date(data[0].corte).toISOString().substring(0, 10)}</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Avaluo total</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${formatter.format(data[0].avaluo_total)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Avaluo catastral urbano</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${formatter.format(data[0].avaluocatastrtalurbano)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Avaluo catastral rural</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${formatter.format(data[0].avaluocatastrtalrural)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Cantidad de predios</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].cantidad_de_predios)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Predios urbanos</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].prediosurbanos)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Predios rurales</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].prediosrual)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Total propietarios</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].total_propietarios)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Folios matricula</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].foliomatricula)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Sin folios matricula</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].sinfoliomatricula)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Área Medellín (m²)</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].areamedellin)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Área Urbana (m²)</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].areaurbanam2)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Área Rural (m²)</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].arearuralm2)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Área Construida (m²)</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].areaconstruida_m2)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Área Construida Urbana (m²)</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].areaconstruidam2_urbano)}</td>
                      </tr>
                      <tr>
                          <td style="border: 1px solid #dededf; padding: 8px;">Área Construida Rural (m²)</td>
                          <td style="border: 1px solid #dededf; padding: 8px;">${numberFormat.format(data[0].areaconstruidam2_rural)}</td>
                      </tr>
                  </tbody>
            <tfoot>
                  <tr>
                      <td colspan="2" style="text-align: right; color: gray; font-size: 10px;">
                          Equipo de Apoyo a los Sistemas de Información Catastral <br>
                          Business Plaza, Calle 44a No 55-44, Piso 14<br>
                          Subsecretaría de Catastro
                      </td>
                  </tr>
              </tfoot>
              </table>
          </div>
             </div>
      `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}



  cron.schedule('00 07 * * 1-5', () => {
    console.log('Running a job at 7:00 am envia emailBase Gravable Catastro Medellin');
    sendAvaluosReport().catch(console.error);
    // main().catch(console.error);
  }, {
    scheduled: true,
    timezone: "America/Bogota"
  });


  async function sendAvaluosReport() {
    try {
        const avaluosData = await infoCtrl.getBaseGrabable();
        // console.log('sendAvaluosReport:     ',avaluosData);
        await main(avaluosData);  // Pasas los datos obtenidos a la función main
    } catch (error) {
        console.error("Error al enviar el reporte de avalúos:", error);
    }
}


module.exports = {sendAvaluosReport,   main };