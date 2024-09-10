const  cron = require('node-cron');
const { devPool, prodPool, webPool } = require('../dbConfig'); // Asegúrate de que la ruta sea correcta
const pool = process.env.NODE_ENV === 'production' ? prodPool : devPool;


cron.schedule('00 04 * * 1-5', () => {
    console.log('Running a job at 4:00 am llama al procedimiento de actualizacion base general');
    sendCallProcedureGeneral().catch(console.error);
    // main().catch(console.error);
  }, {
    scheduled: true,
     timezone: "America/Bogota"
  });

  async function sendCallProcedureGeneral() {
    try {
        console.log('Inicia el llamado al procedimiento, por favor espere...');
        const response = await pool.query(`
           	call sis_catastro_estadistica.actualizar_vista_y_guardar_historial()
        `);
    
        console.log('Procedimiento almacenado ejecutado exitosamente.');
        await getResult(); 
    } catch (error) {
        console.error("Error al enviar el reporte de avalúos:", error);
    }
}


async function getResult(){
    try {
        const response = await pool.query(`select * from sis_catastro_estadistica.historial_estadisticas ORDER BY fecha_actualizacion DESC LIMIT 1`);
     if (response.rows.length > 0) {
        const data = response.rows; // Asumiendo que tu API devuelve los datos en `response.data`
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          // Suponiendo que data[i].corte tiene el valor "Sat Dec 30 2017 00:00:00 GMT-0500 (hora estándar de Colombia)"
          const corteFecha = new Date(data[i].corte);  // Crear un objeto de fecha
          const corteISO = corteFecha.toISOString();   // Convertir al formato ISO 8601
          await webPool.query(` 
            INSERT INTO  catastro.estadisticas_general(
              avaluo_total,
              avaluocatastrtalurbano,
              avaluocatastrtalrural,
              base_gravable,
              cantidad_de_predios,
              total_propietarios,
              propietariosurbanos,
              propietariosrurales,
              total_cmbl, 
              lotes_usopredial,
              lotes_urbano, 
              lotes_rural, 
              prediosurbanos,
              prediosrual,
              foliomatricula,
              foliomatricula_urbano,
              foliomatricula_rural,
              sinfoliomatricula,
              sinfoliomatricula_urbano,
              sinfoliomatricula_rural,
              areaconstruida_m2,
              areaconstruida_ha,
              areaconstruidaha_urbano, 
              areaconstruidaha_rural,
              areaconstruidam2_urbano,
              areaconstruidam2_rural,
              areamedellin, 
              areaurbanam2,
              areaurbanaha,
              arearuralm2,
              arearuralha, 
              usopredial1,
              avaluousopredial1,
              usopredial2, 
              avaluousopredial2,
              usopredial3, 
              avaluousopredial3,
              usopredial4, 
              avaluousopredial4,
              usopredial5, 
              avaluousopredial5,
              usopredial6,
              avaluousopredial6,
              usopredial7, 
              avaluousopredial7,
              usopredial8,
              avaluousopredial8,
              usopredial9,
              avaluousopredial9,
              usopredial10,
              avaluousopredial10,
              vigencia, 
              corte)
            VALUES (
              ${data[i].avaluo_total},
              ${data[i].avaluocatastrtalurbano},
              ${data[i].avaluocatastrtalrural},
              ${data[i].base_gravable},
              ${data[i].cantidad_de_predios},
              ${data[i].total_propietarios},
              ${data[i].propietariosurbanos},
              ${data[i].propietariosrurales},
              ${data[i].total_cmbl},
              ${data[i].lotes_usopredial},
              ${data[i].lotes_urbano},
              ${data[i].lotes_rural},
              ${data[i].prediosurbanos},
              ${data[i].prediosrual},
              ${data[i].foliomatricula},
              ${data[i].foliomatricula_urbano},
              ${data[i].foliomatricula_rural},
              ${data[i].sinfoliomatricula},
              ${data[i].sinfoliomatricula_urbano},
              ${data[i].sinfoliomatricula_rural},
              ${data[i].areaconstruida_m2},
              ${data[i].areaconstruida_ha},
              ${data[i].areaconstruidaha_urbano},
              ${data[i].areaconstruidaha_rural},
              ${data[i].areaconstruidam2_urbano},
              ${data[i].areaconstruidam2_rural},
              ${data[i].areamedellin},
              ${data[i].areaurbanam2},
              ${data[i].areaurbanaha},
              ${data[i].arearuralm2},
              ${data[i].arearuralha},
              ${data[i].usopredial1},
              ${data[i].avaluousopredial1},
              ${data[i].usopredial2},
              ${data[i].avaluousopredial2},
              ${data[i].usopredial3},
              ${data[i].avaluousopredial3},
              ${data[i].usopredial4},
              ${data[i].avaluousopredial4},
              ${data[i].usopredial5},
              ${data[i].avaluousopredial5},
              ${data[i].usopredial6},
              ${data[i].avaluousopredial6},
              ${data[i].usopredial7},
              ${data[i].avaluousopredial7},
              ${data[i].usopredial8},
              ${data[i].avaluousopredial8},
              ${data[i].usopredial9},
              ${data[i].avaluousopredial9},
              ${data[i].usopredial10},
              ${data[i].avaluousopredial10},
              ${data[i].vigencia},
              '${corteISO}'
            );
          `)
          console.log(data[i].corte, " ok")   
        }
      } else {
        res.status(401).json({ success: false });
      }
        
    } catch (error) {
        console.error("Error getResult:", error); 
    }
}


// async function 

module.exports = {sendCallProcedureGeneral };