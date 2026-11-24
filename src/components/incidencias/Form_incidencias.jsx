import { Collapse } from "antd";
import MyFormIncidencia from "../customComponents/MyFormIncidencia";
import { useEffect, useState } from "react";
import { getMotivosAlta, getMotivosBloqueo, getDestinoAlta, 
  getLugarCaida, getMotivoAusente, getProgramasAsistenciales,
  getTipoBloqueo, getTipoSalidaRegreso, loadData } from '../../services/masterData';
import { useIncidencia } from "../../context/IncidenciaContext";

const Form_incidencias = ( {drawerVisible } ) => {
  const { incidenciaEdited } = useIncidencia();
  const [activeKeys, setActiveKeys] = useState([]);

  const [options, setOptions] = useState({
    motivosAlta: [],   
    motivosBloqueo: [],
    destinoAlta: [],
    lugarCaida: [],
    motivoAusente: [],
    programasAsistenciales: [],
    tipoBloqueo: [],
    // unidades: ['UHF 1', 'UHF 2A','UHF 2B','UHF 3A','UHF 3B'],
    tipoSalidaRegreso: [],
    // const destinoAltaRouter = masterData.destinoAlta()
    // const lugarCaidaRouter = masterData.lugar_caida()
    // const motivoAusenteRouter = masterData.motivoAusente()
    // const programasAsistencialesRouter = masterData.programasAsistenciales()
    // const tipoBloqueoRouter = masterData.tipoBloqueo()

  });

  useEffect(() => {
    // Esto asegura que el Collapse siempre se reinicie cuando el Drawer se abra
    if (drawerVisible) {
      setActiveKeys([]);
    }
  }, [drawerVisible]);

  useEffect(() => {
    loadData(getMotivosAlta, 'motivosAlta', setOptions, 'motivo')
    loadData(getMotivosBloqueo, 'motivosBloqueo', setOptions, 'motivo')
    loadData(getDestinoAlta, 'destinoAlta', setOptions, 'destino')
    loadData(getLugarCaida, 'lugarCaida', setOptions, 'lugar')
    loadData(getMotivoAusente, 'motivoAusente', setOptions, 'motivo')
    loadData(getProgramasAsistenciales, 'programasAsistenciales', setOptions, 'programa')
    loadData(getTipoBloqueo, 'tipoBloqueo', setOptions, 'tipo')   
    loadData(getTipoSalidaRegreso, 'tipoSalidaRegreso', setOptions, 'tipo') 
  }, []);

  const items = [
    {
      fields: [
        {type: 'Select', label: 'Motivo', name: 'motivo', options: options.motivosAlta},
        // {type: 'Input', label: 'Destino', name: 'destino'},
        {type: 'TimePicker', label: 'Hora', name: 'horaAlta'},
      ],
      label: 'ALTA',
      key: 'alta',
    },
    // {
    //   fields: [
    //     {type: 'Select', label: 'Motivo', name: 'motivo', options: options.motivoAusente},
    //     {type: 'TimePicker', label: 'Hora de regreso', name: 'horaRegreso'},
    //   ],
    //   label: 'AUSENTE',
    //   key: 'ausente',
    // },
    {
      fields: [
        {type: 'Select', label: 'Indicación', name: 'indicacion', options: options.motivosBloqueo},
        {type: 'Input', label: 'Responsable', name: 'responsable'},
        // {type: 'Input', label: 'Tipo', name: 'tipo', options: options.tipoBloqueo},
      ],
      label: 'BLOQUEO',
      key: 'bloqueo',
    },
    {
      fields: [
        {type: 'Select', label: 'Lugar', name: 'lugar', options: options.lugarCaida},
        {type: 'TimePicker', label: 'Hora caida', name: 'horaCaida'},
      ],
      label: 'CAIDA',
      key: 'caida',
    },
    {
      fields: [
        {type: 'Select', label: 'Porgrama destino', name: 'programaDestino', options: options.programasAsistenciales},
        {type: 'Input', label: 'Responsable', name: 'responsable'},
      ],
      label: 'CAMBIO PROGRAMA',
      key: 'cambioPrograma',
    },
    {
      fields: [
        {type: 'Input', label: 'Médico', name: 'medico'},
        {type: 'TimePicker', label: 'Hora de exitus', name: 'horaExitus'},
      ], 
      label: 'EXITUS',
      key: 'exitus',
    },
    {
      fields: [
        {type: 'Input', label: 'Médico', name: 'medico'},
        {type: 'TimePicker', label: 'Hora de ingreso', name: 'horaIngreso'},
        {type: 'Checkbox', label: 'Grúa', name: 'grua'},
      ],
      label: 'INGRESO PROGRAMADO',
      key: 'ingresoProgramado',
    },
    {
      fields: [
        {type: 'Input', label: 'Médico', name: 'medico'},
        {type: 'TimePicker', label: 'Hora de ingreso', name: 'horaIngreso'},
        // {type: 'Select', label: 'Unidad', name: 'unidad', options: options.unidades},
        {type: 'Input', label: 'Hospital de referencia', name: 'hospReferencia'},
        {type: 'Checkbox', label: 'Grúa', name: 'grua'},
      ],
      label: 'INGRESO URGENTE',
      key: 'ingresoUrgente',
    },
    {
      fields: [
        {type: 'Select', label: 'Tipo', name: 'tipo', options: options.tipoSalidaRegreso }, 
        {type: 'DatePicker', label: 'Fecha', name: 'fechaSalida'},
        {type: 'TimePicker', label: 'Hora', name: 'horaSalida'},
        {type: 'Input', label: 'Centro de destino', name: 'centroDestino'},
      ],
      label: 'SALIDA HOSPITAL',
      key: 'salidaHospital',
    },
    {
      fields: [
        {type: 'Select', label: 'Tipo', name: 'tipo', options: options.tipoSalidaRegreso },
        {type: 'DatePicker', label: 'Fecha', name: 'fechaRegreso'},
        {type: 'TimePicker', label: 'Hora', name: 'horaRegreso'},
        {type: 'Checkbox', label: 'Informe', name: 'informe'},
      ],
      label: 'REGRESO HOSPITAL',
      key: 'regresoHospital',
    },
    {
      fields: [
        {type: 'Input', label: 'Responsable', name: 'responsable'},
      ],
      label: 'RETIRADA BLOQUEO',
      key: 'retiradaBloqueo',
    },
    {
      fields: [
        {type: 'Input', label: 'Cama de destino', name: 'camaDestino'},
        {type: 'TimePicker', label: 'Hora', name: 'horaTraslado'},
      ],
      label: 'TRASLADO CAMA',
      key: 'trasladoCama',
    },
    // {
    //   fields: [
    //     {type: 'Input', label: 'Médico', name: 'medico'},
    //     {type: 'DatePicker', label: 'Fecha de regreso', name: 'horaRegreso'},
    //     {type: 'Input', label: 'Tipo', name: 'tipo'},
    //   ],
    //   label: 'PERMISO',
    // },
    // {
    //   fields: [
    //     {type: 'Input', label: 'Centro de destino', name: 'centroDestino'},
    //     {type: 'Input', label: 'Motivo', name: 'motivo'},
    //     {type: 'Checkbox', label: 'Informe', name: 'informe'},
    //     {type: 'Checkbox', label: 'Regresa', name: 'regresa'},
    //   ], 
    //   label: 'PRUEBA CONSULTA',
    // },
    // {
    //   fields: [
    //     {type: 'Input', label: 'Centro de destino', name: 'centroDestino'},
    //     {type: 'Input', label: 'Responsable', name: 'responsable'},
    //   ],
    //   label: 'TRASLADO HOSPITAL',
    // },
    // {
    //   fields: [
    //     {type: 'Input', label: 'Cama de destino', name: 'camaDestino'},
    //     {type: 'TimePicker', label: 'Hora del traslado', name: 'horaTraslado'},
    //   ],
    //   label: 'TRASLADO INTERNO',
    // },
  ]
 
  const itemsToDisplay = items.map((item) => ({
    key: item.label.trim().toUpperCase(),
    label: item.label,
    children: <MyFormIncidencia fieldList={item} />
  }));

  const itemsFiltered = () => {
    if (incidenciaEdited != undefined) {
      return itemsToDisplay.filter((item) => 
        item.label.trim().toUpperCase() === incidenciaEdited.tipo.trim().toUpperCase()
      )
    }else{
      return itemsToDisplay
    }
  }
  
  // const activeKey = () => {
  //   if (incidenciaEdited != undefined) {
  //     return incidenciaEdited.tipo.trim().toUpperCase()
  //   }else{
  //     return items[0].label.trim().toUpperCase()
  //   }
  // }

  return (
    <>
      <Collapse 
        accordion
        // defaultActiveKey={[]}
        activeKey={activeKeys}
        onChange={setActiveKeys}
        items={itemsFiltered()}
      />
    </>
  );
}


export default Form_incidencias;