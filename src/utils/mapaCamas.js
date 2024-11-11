export const agruparCamasPorHabitacion = (mapaCamas) => {
  const agrupacion = mapaCamas.reduce((acc, cama) => {
    // Extraemos el número de la habitación y la planta de cada cama
    const numeroHabitacion = cama.cama.split(' ')[0];
    const clave = `${cama.planta}-${numeroHabitacion}`;

    // Si no existe la clave en el acumulador, inicializamos un nuevo array
    if (!acc[clave]) {
      acc[clave] = [];
    }

    // Agregamos la cama al array de su respectiva habitación
    acc[clave].push(cama.cama);

    return acc;
  }, {});

  // Convertimos el objeto acumulador en un array de objetos para un manejo más sencillo
  return Object.keys(agrupacion).map((clave) => ({
    habitacion: clave.split('-')[1],
    planta: clave.split('-')[0],
    camas: agrupacion[clave],
  }));
};
