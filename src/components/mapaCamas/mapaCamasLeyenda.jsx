import { Tooltip } from 'antd'
import '../../assets/css/mapaCamas.css'

const mapaCamasLeyenda = () => {
  return (
    <div className='containerLeyenda'>
      <ul>
        <li><Tooltip title='Aislamiento por Preventiva'>🟢 AP </Tooltip></li>
        <li><Tooltip title='Aislamiento por Enfermería'>🟣 AE </Tooltip></li>
        <li>🧔🏻 Hombre </li>
        <li>👩🏻‍🦰 Mujer </li>
        <li>⛠ Grúa </li>
        <li> <span className='noDoblarHabitacion'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> No doblar </li>
        <li> <span className='camaInhabilitada'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Inhabilitada </li>
      </ul>
    </div>
  )
}

export default mapaCamasLeyenda
