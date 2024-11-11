export const getFormatDate = (myDate, format = 'short') => {
  switch (format) {
    case 'short':
      return myDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric' });
    case 'long':
      return myDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    case 'textlong':
      return myDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    case 'datetime':
      return myDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    case 'hour':
      return myDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    default:
      return myDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric' });
  }
}

export const getDay = ( date, days ) => {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000) 
}

// Normaliza una fecha a medianoche para ignorar la hora en comparaciones
export const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Genera un array de fechas desde hoy hacia atrás el número de días especificados
export const generateDateRange = (day, numDays) => {
  const dates = [];
  // const today = normalizeDate(new Date('2024-01-25T00:00:00.000Z')); // Asegúrate de que hoy esté normalizado
  // const today = normalizeDate(new Date()); // Asegúrate de que hoy esté normalizado

  const myToday = numDays > 2? getDay(day, -2): day;

  for (let i = numDays - 1; i >= 0; i--) {
    const date = new Date(myToday);
    date.setDate(date.getDate() - i);
    dates.push( normalizeDate( date ));
  }

  return dates;
};

export const toCamelCase = (label) => {
  // Eliminar acentos
  label = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Convertir todo a minúsculas
  label = label.toLowerCase();

  // Convertir a camelCase si es necesario
  return label.split(' ')
    .map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.substring(1))
    .join('');
}

export const formatDateForComparison = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};


export default {}; // Exporta un objeto vacío para evitar errores de importación