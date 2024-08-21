const {dblocal} = require('../config/dbConfig')

const infoCtrl={};
infoCtrl.geLotesGeneral = async(req, res)=>{
    try {
        const response = await dblocal.query(`
        select * from sis_catastro_estadistica.historial_estadisticas order by fecha_actualizacion desc
        `)
        if(response.rows.length>0){res.status(200).json({data: response.rows, success: true}) }else{res.status(401).json({success: false})  }  
    } catch (error) {
        console.error('Error getHitos: ', error);
        res.status(403).json({message: "Error consulta getHitos ",error, success: false})
    }
} 

module.exports = infoCtrl;