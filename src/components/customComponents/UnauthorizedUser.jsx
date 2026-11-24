import { Alert } from "antd";

const textMessage = 'Debe acceder desde ORION CLINIC para poder cambiar el estado de la incidencia'

export const itemNoUser = [
  {
    label: (<Alert message = {textMessage} type='warning' showIcon  />),
    key: 'noUser',
    // icon: <DeleteTwoTone twoToneColor='#ff0000' style={{ fontSize: iconSize }} />      
  },
]
