const { devPool, prodPool, webPool } = require('../config/dbConfig'); // Asegúrate de que la ruta sea correcta

// Selecciona el pool de conexiones según el entorno
const pool = process.env.NODE_ENV === 'production' ? prodPool : devPool;

const infoCtrl={};
infoCtrl.getGeneral = async(req, res)=>{
    try {
        const response = await pool.query(`
        select * from sis_catastro_estadistica.historial_estadisticas order by fecha_actualizacion desc
        `)
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  
    } catch (error) {
        console.error('Error getHitos: ', error);
        res.status(403).json({message: "Error consulta getHitos ",error, success: false})
    }
} 


infoCtrl.getAvaluosAll = async(req, res)=>{
    try {
        const response = await pool.query(`
        select 
            fecha_actualizacion,
            avaluo_total,avaluocatastrtalurbano,avaluocatastrtalrural, corte, vigencia
        from sis_catastro_estadistica.historial_estadisticas
        ORDER BY 
            fecha_actualizacion asc
       `)
            if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  
        
    } catch (error) {
        console.error('Error getAvaluosAll: ', error);
        res.status(403).json({message: "Error consulta getAvaluosAll ",error, success: false}) 
    }
}

infoCtrl.getPrediosAll= async(req, res)=>{
try {
    const response = await pool.query(`
        select 
            fecha_actualizacion,
         	cantidad_de_predios,
			prediosurbanos,
			prediosrual,
			corte
        from sis_catastro_estadistica.historial_estadisticas
        ORDER BY 
            fecha_actualizacion asc
       `);
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  } 
} catch (error) {
    console.error('Error getPrediosAll: ', error);
    res.status(403).json({message: "Error consulta getPrediosAll ",error, success: false})  
}
}


infoCtrl.getPropietariosAll = async (req, res) => {
  try {
    const response = await pool.query(`
        select 
            fecha_actualizacion,
            total_propietarios, propietariosurbanos,propietariosrurales,
            corte
        from sis_catastro_estadistica.historial_estadisticas
        ORDER BY 
        fecha_actualizacion asc
    `);
    if (response.rows.length > 0) {
      res.status(200).json({ data: response.rows, success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (error) {
    console.error("Error getPropietariosAll: ", error);
    res
      .status(403)
      .json({
        message: "Error consulta getPropietariosAll ",
        error,
        success: false,
      });
  }
};


infoCtrl.getBaseGrabable = async(req, res)=>{

    try {
        const response = await pool.query(`
            SELECT 
        fecha_actualizacion,
        avaluo_total,
        avaluocatastrtalurbano,
        avaluocatastrtalrural,
        cantidad_de_predios,
        prediosurbanos,
        prediosrual,
        total_propietarios,
        foliomatricula,
        sinfoliomatricula,
        areamedellin,
        areaurbanam2,
        arearuralm2,
        areaconstruida_m2,
        areaconstruidam2_urbano,
        areaconstruidam2_rural,
        corte
    FROM 
        sis_catastro_estadistica.historial_estadisticas
    ORDER BY 
        fecha_actualizacion DESC
    LIMIT 1
           `)

           
           if (response.rows.length > 0) {
            const data = response.rows; // Asumiendo que tu API devuelve los datos en `response.data`
            console.log(response.rows);
                    return data;


          } else {
            res.status(401).json({ success: false });
          }



} 
    
    
    catch (error) {
        console.error('Error getBaseGrabable: ', error);
        res.status(403).json({message: "Error consulta getBaseGrabable ",error, success: false})  
    }
}
infoCtrl.getBaseGrabableApi = async(req, res) =>{
    try {
        const response = await pool.query(`
            SELECT 
        fecha_actualizacion,
        avaluo_total,
        avaluocatastrtalurbano,
        avaluocatastrtalrural,
        cantidad_de_predios,
        prediosurbanos,
        prediosrual,
        total_propietarios,
        foliomatricula,
        sinfoliomatricula,
        areamedellin,
        areaurbanam2,
        arearuralm2,
        areaconstruida_m2,
        areaconstruidam2_urbano,
        areaconstruidam2_rural,
        corte
    FROM 
        sis_catastro_estadistica.historial_estadisticas
    ORDER BY 
        fecha_actualizacion DESC
    LIMIT 1
           `)
           if (response.rows.length > 0) {res.status(200).json({ data: response.rows, success: true });
           } else { res.status(401).json({ success: false });
          }
    } catch (error) {
        console.error('Error getBaseGrabableApi: ', error);
        res.status(403).json({message: "Error consulta getBaseGrabableApi ",error, success: false})  
    }
}



infoCtrl.getLotesAll = async(req, res)=>{
    try {
        const response = await pool.query(`
          select 
            fecha_actualizacion,
            lotes_usopredial,
		    lotes_urbano,
		    lotes_rural,
			corte
        from sis_catastro_estadistica.historial_estadisticas
        ORDER BY 
        fecha_actualizacion asc
        `)
           if (response.rows.length > 0) {res.status(200).json({ data: response.rows, success: true });
           } else { res.status(401).json({ success: false });
          }
        
    } catch (error) {
        console.error('Error getLotesAll: ', error);
        res.status(403).json({message: "Error consulta getLotesAll ",error, success: false})  
    }
}

infoCtrl.getCompareBase = async(req, res)=>{
    try {
        const response = await pool.query(`
            WITH datos_recientes AS (
    SELECT 
        fecha_actualizacion,
        avaluo_total,
        avaluocatastrtalurbano,
        avaluocatastrtalrural,
        cantidad_de_predios,
        prediosurbanos,
        prediosrual,
        total_propietarios,
        foliomatricula,
        sinfoliomatricula,
        areamedellin,
        areaurbanam2,
        arearuralm2,
        areaconstruida_m2,
        areaconstruidam2_urbano,
        areaconstruidam2_rural,
        corte
    FROM 
        sis_catastro_estadistica.historial_estadisticas
    ORDER BY 
        fecha_actualizacion DESC
    LIMIT 2
)
SELECT
    fecha_actualizacion,
    avaluo_total,
    avaluocatastrtalurbano,
    avaluocatastrtalrural,
    cantidad_de_predios,
    prediosurbanos,
    prediosrual,
    total_propietarios,
    foliomatricula,
    sinfoliomatricula,
    areamedellin,
    areaurbanam2,
    arearuralm2,
    areaconstruida_m2,
    areaconstruidam2_urbano,
    areaconstruidam2_rural,
    corte,
    
    -- Variación porcentual para avaluo_total
    CASE 
        WHEN LAG(avaluo_total) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((avaluo_total - LAG(avaluo_total) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(avaluo_total) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
   END AS variacion_porcentual_avaluo_total,
    
    
        -- Variación porcentual para avaluocatastrtalurbano
    CASE 
        WHEN LAG(avaluocatastrtalurbano) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((avaluocatastrtalurbano - LAG(avaluocatastrtalurbano) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(avaluocatastrtalurbano) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_avaluo_total_urbano,
  -- Variación porcentual para avaluocatastrtalrural
    CASE 
        WHEN LAG(avaluocatastrtalrural) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((avaluocatastrtalrural - LAG(avaluocatastrtalrural) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(avaluocatastrtalrural) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_avaluo_total_rural,

    -- Variación porcentual para cantidad_de_predios
    CASE 
        WHEN LAG(cantidad_de_predios) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((cantidad_de_predios - LAG(cantidad_de_predios) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(cantidad_de_predios) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_cantidad_predios,
                
                -- Variación porcentual para cantidad_de_predios_urbano
    CASE 
        WHEN LAG(prediosurbanos) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((prediosurbanos - LAG(prediosurbanos) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(prediosurbanos) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_cantidad_predios_urbano,

                -- Variación porcentual para cantidad_de_predios_rural
    CASE 
        WHEN LAG(prediosrual) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((prediosrual - LAG(prediosrual) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(prediosrual) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_cantidad_predios_rural,

                  -- Variación porcentual para propietarios
    CASE 
        WHEN LAG(total_propietarios) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((total_propietarios - LAG(total_propietarios) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(total_propietarios) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_total_propietarios,

                                 -- Variación porcentual con folio
    CASE 
        WHEN LAG(foliomatricula) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((foliomatricula - LAG(foliomatricula) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(foliomatricula) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_predios_con_folio,

                                 -- Variación porcentual sin folio
    CASE 
        WHEN LAG(sinfoliomatricula) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((sinfoliomatricula - LAG(sinfoliomatricula) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(sinfoliomatricula) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_predios_sin_folio,

    -- Variación porcentual para areamedellin
    CASE 
        WHEN LAG(areamedellin) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((areamedellin - LAG(areamedellin) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(areamedellin) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_areamedellin,
                
                   -- Variación porcentual para areamedellinm2_urbano
    CASE 
        WHEN LAG(areaconstruidam2_urbano) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((areaconstruidam2_urbano - LAG(areaconstruidam2_urbano) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(areaconstruidam2_urbano) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_areamedellinm2_urbano,

                   -- Variación porcentual para areamedellinm2_rural
    CASE 
        WHEN LAG(areaconstruidam2_rural) OVER (ORDER BY fecha_actualizacion DESC) != 0 THEN
            ((areaconstruidam2_rural - LAG(areaconstruidam2_rural) OVER (ORDER BY fecha_actualizacion DESC)) 
            / LAG(areaconstruidam2_rural) OVER (ORDER BY fecha_actualizacion DESC)) * 100
        ELSE 
            NULL
    END AS variacion_porcentual_areamedellinm2_rural


FROM
    datos_recientes;

            `) 
            if (response.rows.length > 0) {res.status(200).json({ data: response.rows, success: true });
        } else { res.status(401).json({ success: false });
       }
        
    } catch (error) {
        console.error('Error getCompareBase: ', error);
        res.status(403).json({message: "Error consulta getCompareBase ",error, success: false})  
    }
}

module.exports = infoCtrl;