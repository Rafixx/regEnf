import { useIncidencia } from '../../context/IncidenciaContext';
import IncidenciaCard from './IncidenciaCard';
import { normalizeDate, formatDateForComparison, generateDateRange } from '../../utils/helper';
import { Card } from 'antd';
import { useEffect, useState } from 'react';

import "../../assets/css/dietario.css";

const Dietario = ({ numDays }) => {
  const { incidencias, startDay } = useIncidencia();
  const [filteredIncidencias, setFilteredIncidencias] = useState([]);
  const today = normalizeDate(startDay);
  const dateRange = generateDateRange(today, numDays);
  const cardWidth = `calc(${100 / numDays}% - 16px)`;

  // Actualiza `filteredIncidencias` cada vez que cambian `incidencias` o `startDay`
  useEffect(() => {
    // Crea el rango de fechas desde `startDay` hasta `startDay` - numDays días
    const days = dateRange.map(date => formatDateForComparison(date));

    // Filtra las incidencias que tienen su fecha dentro del rango exacto generado
    const filteredData = incidencias.filter((incidencia) => {
      const incidenciaDate = formatDateForComparison(normalizeDate(incidencia.fecha));
      return days.includes(incidenciaDate);
    });

    setFilteredIncidencias(filteredData);
  }, [incidencias, startDay, numDays]);

  return (
    <div className='contenedorDietario'>
      {dateRange.map((date, index) => {
        const formattedDate = date.toLocaleDateString();
        const dailyIncidences = filteredIncidencias.filter((incidencia) =>
          formatDateForComparison(incidencia.fecha) === formatDateForComparison(date)
        );

        return (
          <Card title={formattedDate} className='dietario' key={index} style={{ width: cardWidth }}>
            {dailyIncidences.map((incidencia, incIndex) => (
              <IncidenciaCard key={incidencia.idIncidencia || incIndex} incidencia={incidencia} />
            ))}
          </Card>
        );
      })}
    </div>
  );
}

export default Dietario;
