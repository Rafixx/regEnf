import {usePatient} from '../../context/PatientContext'
import {usePlanta} from '../../context/PlantaContext'
import {useIncidencia} from '../../context/IncidenciaContext'
import { Form, Button } from "antd";
import MyFormItem from "./MyFormItem";
import { postIncidencia, putIncidencia } from "../../services/incidencias";
import { useEffect } from 'react';
import {toCamelCase} from '../../utils/helper'
import { useUser } from '../../context/UserContext';
import dayjs from 'dayjs';

const MyFormIncidencia = ({ fieldList }) => {
  const [form] = Form.useForm();
  const { user } = useUser();
  const { patient } = usePatient();
  const { planta } = usePlanta();
  const { setIncidenciaEdited, incidenciaEdited, setDrawerVisible, startDay } = useIncidencia();

  useEffect(() => {
    if (incidenciaEdited && incidenciaEdited.detalle && fieldList.fields) {
      const normalizedData = {};      
      
      Object.keys(incidenciaEdited.detalle).forEach(key => {
        const camelCaseKey = toCamelCase(key); // Convierte cada clave a camelCase
        const field = fieldList.fields.find(field => field.name === camelCaseKey);
        
        if (field && (field.type === 'DatePicker' || field.type === 'TimePicker')) {
          const format = field.type === 'DatePicker'? 'YYYY-MM-DD': 'HH:mm';
          const dateTimeValue = dayjs(incidenciaEdited.detalle[key], format);
          
          if (dateTimeValue.isValid()) {  // Asegúrate de que el objeto dayjs es válido
            normalizedData[camelCaseKey] = dateTimeValue;
          }  
        } else {
          normalizedData[camelCaseKey] = incidenciaEdited.detalle[key];
        }
      });
  
      form.setFieldsValue(normalizedData);
    }
  }, [incidenciaEdited, form, fieldList]);
  
  // Función que determina el estado inicial basado en ciertas condiciones
  const getInitState = (startDay, currentDate = new Date()) => {
    console.log('getInitState startDay:', startDay);
  
    const horasLimite = 3; // Número de horas que deben pasar para considerar el estado 'REVISAR'
  
    // Normaliza startDay y currentDate para que solo se comparen las fechas (sin las horas)
    const normalizedStartDay = new Date(startDay);
    normalizedStartDay.setHours(0, 0, 0, 0);
    const normalizedCurrentDate = new Date(currentDate);
    normalizedCurrentDate.setHours(0, 0, 0, 0);
  
    // Verifica si startDay es un día anterior al actual
    if (normalizedStartDay < normalizedCurrentDate) {
      return 'REVISAR';
    }
  
    // Ajusta el `startDay` sumándole las horas límite para la comparación horaria
    const adjustedStartDay = new Date(startDay);
    adjustedStartDay.setHours(adjustedStartDay.getHours() + horasLimite);
  
    // Verifica si la fecha ajustada es menor que la fecha actual
    if (adjustedStartDay < currentDate) {
      return 'REVISAR';
    }
  
    // Puedes agregar más condicionantes aquí según sea necesario
    return 'PENDIENTE';
  };
  

  const addIncidencia = async (values) => {
    // console.log('addIncidencia: values:', values)
    const estado = getInitState(startDay)
    const incidenciaInfo = { 
      detalle: {
        ...values
      }, 
      incidencia:{
        fecha: new Date( startDay ),
        nhc: patient.nhc,
        usuario: user.username,
        programa: patient.programa,
        estado: estado,
        paciente: patient.nombre,
        planta: planta,
        cama: patient.cama,
        tipo: fieldList.label,
      },
    }
    try{
      const response = await postIncidencia(incidenciaInfo);
      return response;
    } catch (error) { 
      console.error('Error al agregar la incidencia:', error)
      throw error
    }
  }

  const editIncidencia = async (values) => {
    const incidenciaInfo = { 
      incidencia: {
        ...incidenciaEdited,
        detalle: {
          ...values
        }
      }
    }
    // console.log('editIncidencia: Incidencia info:', incidenciaInfo);    
    try{
      const response = await putIncidencia(incidenciaInfo);
      return response;
    } catch (error) { 
      console.error('Error al editar la incidencia:', error)
      throw error
    }
  }

  const handleSubmit = async (values) => {
    try {
      // Inicializa un nuevo objeto para los valores formateados
      const formattedValues = { ...values };

      // Recorre los campos para identificar y procesar fechas y horas
      fieldList.fields.forEach(field => {
        if (field.type === 'DatePicker' || field.type === 'TimePicker') {
          // Solo procesa el campo si realmente viene incluido en los valores del formulario
          if (values[field.name]) {
            // Formatea según el tipo de campo
            formattedValues[field.name] = field.type === 'DatePicker' ?
              dayjs(values[field.name]).format('YYYY-MM-DD') : // Formato de fecha
              dayjs(values[field.name]).format('HH:mm');   // Formato de hora
          }
        }
      });
      const response = incidenciaEdited? await editIncidencia(formattedValues): await addIncidencia(formattedValues);

      form.resetFields();
      setDrawerVisible(false);
      setIncidenciaEdited(null);
      console.log("Respuesta del servidor:", response);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  
  const onFormValuesChange = (changedValues, allValues) => {
  }
  
  return( 
    <>
      <Form 
        form={form} 
        onFinish={handleSubmit} 
        onValuesChange={onFormValuesChange} 
        layout="vertical" 
        wrapperCol={{ span: 24 }}
      >
        {fieldList.fields.map(( field, index ) => (
            <MyFormItem key={index} field={field} style={{ margin: '5px 0 10px 0' }}/> 
          ))
        }
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default MyFormIncidencia;