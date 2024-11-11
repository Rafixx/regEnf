import React, { useState, useEffect, useMemo } from 'react';
import { getCamasOcupadas, getCamasGrua,
         getAisladosEnf, getAisladosPreve,
         getCamasInhabilitadas } from '../../services/mapaCamas';
import { usePlanta } from '../../context/PlantaContext'
import { usePatient } from '../../context/PatientContext'
import { useUser } from '../../context/UserContext';
import CamaPopover from './CamaPopover'; // Asegúrate de que la ruta de importación sea correcta
import { agruparCamasPorHabitacion } from '../../utils/mapaCamas';
import '../../assets/css/mapaCamas.css';
import { useIncidencia } from '../../context/IncidenciaContext';

const CamasPorPlanta = ({ planta, mapaCamas }) => {
  // const camasFiltradas = mapaCamas.filter(item => item.planta === planta);
  // const { planta } = usePlanta();
  const { user } = useUser()
  const { setPatient } = usePatient();
  const { incidencia } = useIncidencia();
  const [ camasGrua, setCamasGrua ] = useState([]);
  const [ ocupacionCamas, setOcupacionCamas ] = useState([]);
  const [ aisladosPreve, setAisladosPreve ] = useState([]);
  const [ aisladosEnf, setAisladosEnf ] = useState([]);
  const [ camasInhabilitadas, setCamasInhabilitadas ] = useState([]);
  // const [ camasAgrupadas, setCamaAgrupadas ] = useState([{}]);
  // const camasAgrupadas= agruparCamasPorHabitacion(mapaCamas.filter(item => item.planta === planta));
  
  // useEffect(() => {
  //   if(planta && mapaCamas){
  //     const camasPorPlanta = agruparCamasPorHabitacion(mapaCamas.filter(item => item.planta === planta));
  //     setCamaAgrupadas(camasPorPlanta);
  //   }
  // }, [planta]);
  const camasAgrupadas = useMemo(() => {
    if (planta && mapaCamas && mapaCamas.length > 0) {
      return agruparCamasPorHabitacion(mapaCamas.filter(item => item.planta === planta));
    }
    return [];
  }, [mapaCamas, planta]);


  useEffect(() => {
    const cargarOcupacionCamas = async () => {
      try {
        const datos = await getCamasOcupadas();
        setOcupacionCamas(datos);
      } catch (error) {
        console.error('Error al cargar la ocupación de camas:', error);
      }
    };
    const cargarCamasGrua = async () => {
      try {
        const datos = await getCamasGrua();
        setCamasGrua(datos);
      } catch (error) {
        console.error('Error al cargar las camas con grúa:', error);
      }
    };
    const cargaAisladosPreve = async () => {
      try {
        const datos = await getAisladosPreve();
        setAisladosPreve(datos);
      } catch (error) {
        console.error('Error al cargar las camas aisladas por Preventiva:', error);
      }
    };
    const cargaAisladosEnf = async () => {
      try {
        const datos = await getAisladosEnf();
        setAisladosEnf(datos);
      } catch (error) {
        console.error('Error al cargar las camas aisladas por enfermería:', error);
      }
    };
    const cargarCamasInhabilitadas = async () => {
      try {
        const datos = await getCamasInhabilitadas();
        setCamasInhabilitadas(datos);
      } catch (error) {
        console.error('Error al cargar las camas inhabilitadas:', error);
      }
    };

    cargarOcupacionCamas();
    cargarCamasGrua();
    cargaAisladosPreve();
    cargaAisladosEnf();
    cargarCamasInhabilitadas();
  }, []);

  const obtenerDatosOcupacion = (camaId) => {
    return ocupacionCamas.find(oc => oc.cama === camaId);
  }

  const camaTieneGrua = (camaId) => {
    const camaConGrua = camasGrua.find(cg => cg.cama === camaId);
    return camaConGrua ? camaConGrua.fecha : null;
  };

  const obtenerAisladoPreve = (camaId) => {
    const camaAislada = aisladosPreve.find(ap => ap.cama === camaId);
    return camaAislada ? camaAislada.aisla_preve : null;
  };
  
  const obtenerAisladoEnf = (camaId) => {
    const camaAislada = aisladosEnf.find(ae => ae.cama === camaId);
    if (camaAislada && camaAislada.aisla_enf !== "-") {
      return {
        aislaEnf: camaAislada.aisla_enf,
        otro: camaAislada.otro 
      };
    }
    return null
  };

  const camaEstaInhabilitada = (camaId) => {
    // console.log('camaId', camaId, 'camasInhabilitadas:', camasInhabilitadas);
    const camaIdNormalizado = camaId.trim();

    const camaEstaInhabilitada = camasInhabilitadas.find(ci => ci.cama.trim() === camaIdNormalizado);
    // console.log('camaEstaInhabilitada:', camaEstaInhabilitada, 'camaId:', camaId);
    
    return camaEstaInhabilitada ? true : false;
  };
  
  const handleCardCamaClick = (camaId, e) => {
    const ocupacion = obtenerDatosOcupacion(camaId);
    // console.log('CamasPorPlanta - Ocupación:', ocupacion);
    
    const myPatient = {
      nombre: ocupacion.paciente.trim(),
      cama: camaId,
      programa: ocupacion.serv_med,
    }
    setPatient(myPatient);
  }

  return (
    <div className="mapaCamasContent">
      {camasAgrupadas.map((habitacion, index) => (
        <div className="cardHabitacion" key={index} >
            {habitacion.camas.map((cama, idx) => {
              const datosOcupacion = obtenerDatosOcupacion(cama);
              const fechaGrua = camaTieneGrua(cama);
              const detalleAisladoPreve = obtenerAisladoPreve(cama);
              const detalleAisladoEnf = obtenerAisladoEnf(cama);
              const camaInhabilitada = camaEstaInhabilitada(cama)? "camaInhabilitada" : "";

              const aislamientoEnf = detalleAisladoEnf ? detalleAisladoEnf.aislaEnf : null;
              const detalleEnfOtro = detalleAisladoEnf ? detalleAisladoEnf.otro : null;
              const noDoblarHabitacion =  ((datosOcupacion && datosOcupacion.serv_med === "UCPA") 
                                          || aislamientoEnf 
                                          || detalleAisladoPreve) ? "noDoblarHabitacion" : "";
            
              return (
                <div key={idx} className={`cardCama ${noDoblarHabitacion} ${camaInhabilitada}`}>
                  <div className='textAislamiento'> 
                    {detalleAisladoPreve && `🟢`} 
                    {aislamientoEnf && `🟣`} </div>
                  <div className='textCama'>{cama}</div>                     
                  {datosOcupacion && (
                    <>                      
                      <div className='emojisContent' onClick={(e) => user.username && handleCardCamaClick(cama, e)}>
                        {datosOcupacion.sexo.trim() === "Hombre" ? "🧔🏻" : "👩🏻‍🦰"}
                        {fechaGrua && "⛠"}
                      </div>
                      <CamaPopover 
                        datosOcupacion={datosOcupacion} 
                        fechaGrua={fechaGrua}
                        detalleAisladoPreve={detalleAisladoPreve}
                        detalleAisladoEnf={aislamientoEnf}
                        detalleAisladoEnfOtro={detalleEnfOtro}
                      >
                        <div className='textServicio'>{datosOcupacion && datosOcupacion.serv_med}</div>
                      </CamaPopover>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}

export default CamasPorPlanta;
