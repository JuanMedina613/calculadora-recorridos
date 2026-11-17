// Datos de líneas, ramales y secciones.
// Para agregar una línea o ramal, editá solo este archivo.

const rutasData = {
    '188': {
        'A': {
            nombre: 'Ramal A (Budge - Pza. Italia)',
            ida: [
                {name: 'Cruce de Lomas a Budge', km: 4.70},
                {name: 'Budge a Recondo', km: 7.00},
                {name: 'Recondo a Armenia', km: 9.60},
                {name: 'Armenia a Pompeya', km: 2.20},
                {name: 'Pompeya a Caseros', km: 2.90},
                {name: 'Caseros a Once', km: 3.60},
                {name: 'Once a Htal. Niños', km: 3.60},
                {name: 'Htal. Niños a Las Heras', km: 1.90},
                {name: 'Las Heras a Plaza Italia', km: 1.30}
            ],
            vuelta: [
                {name: 'Plaza Italia a Las Heras', km: 1.10},
                {name: 'Las Heras a Htal. Niños', km: 2.10},
                {name: 'Htal. Niños a Once', km: 2.40},
                {name: 'Once a Caseros', km: 4.10},
                {name: 'Caseros a Pompeya', km: 3.20},
                {name: 'Pompeya a Armenia', km: 2.00},
                {name: 'Armenia a Recondo', km: 9.50},
                {name: 'Recondo a Budge', km: 2.70},
                {name: 'Budge a Cruce de Lomas', km: 4.70}
            ]
        },
        'B': {
            nombre: 'Ramal B (L. de la Torre - Pza. Italia)',
            ida: [
                {name: 'Cruce de Lomas a Olmos', km: 4.90},
                {name: 'Olmos a Tribunales', km: 2.80},
                {name: 'Tribunales a Recondo', km: 3.80},
                {name: 'Recondo a Sadop', km: 5.20},
                {name: 'Sadop a Armenia', km: 3.60},
                {name: 'Armenia a Pompeya', km: 2.20},
                {name: 'Pompeya a Caseros', km: 2.90},
                {name: 'Caseros a Once', km: 3.60},
                {name: 'Once a Htal. Niños', km: 3.60},
                {name: 'Htal. Niños a Las Heras', km: 1.90},
                {name: 'Las Heras a Plaza Italia', km: 1.30}
            ],
            vuelta: [
                {name: 'Plaza Italia a Las Heras', km: 1.10},
                {name: 'Las Heras a Htal. Niños', km: 2.10},
                {name: 'Htal. Niños a Once', km: 2.40},
                {name: 'Once a Caseros', km: 4.10},
                {name: 'Caseros a Pompeya', km: 3.20},
                {name: 'Pompeya a Armenia', km: 2.00},
                {name: 'Armenia a Sadop', km: 3.40},
                {name: 'Sadop a Recondo', km: 5.30},
                {name: 'Recondo a Tribunales', km: 4.30},
                {name: 'Tribunales a Olmos', km: 2.70},
                {name: 'Olmos a Cruce de Lomas', km: 4.20}
            ]
        },
        'E': {
            nombre: 'Ramal E (Expreso)',
            ida: [
                {name: 'Cruce de Lomas a Tribunales', km: 6.50},
                {name: 'Tribunales a Recondo', km: 3.80},
                {name: 'Recondo a Pompeya', km: 9.20},
                {name: 'Pompeya a Caseros', km: 2.90},
                {name: 'Caseros a Once', km: 3.50},
                {name: 'Once a Htal. Niños', km: 3.60},
                {name: 'Htal. Niños a Las Heras', km: 1.90},
                {name: 'Las Heras a Plaza Italia', km: 1.30}
            ],
            vuelta: [
                {name: 'Plaza Italia a S. Ortiz', km: 0.80},
                {name: 'Las Heras a Htal. Niños', km: 2.10},
                {name: 'Htal. Niños a Once', km: 2.40},
                {name: 'Once a Caseros', km: 3.10},
                {name: 'Caseros a Pompeya', km: 3.50},
                {name: 'Pompeya a Recondo', km: 9.80},
                {name: 'Recondo a Tribunales', km: 3.70},
                {name: 'Tribunales a Cruce de Lomas', km: 6.20}
            ]
        },
        'C': {
            nombre: 'Ramal C (Camino Negro - Once)',
            ida: [
                {name: 'Cruce de Lomas a Tribunales', km: 6.50},
                {name: 'Tribunales a Recondo', km: 3.80},
                {name: 'Recondo a Sadop', km: 5.20},
                {name: 'Sadop a Armenia', km: 3.60},
                {name: 'Armenia a Pompeya', km: 2.20},
                {name: 'Pompeya a Caseros', km: 2.90},
                {name: 'Caseros a Once', km: 5.30}
            ],
            vuelta: [
                {name: 'Once a Caseros', km: 4.10},
                {name: 'Caseros a Pompeya', km: 3.20},
                {name: 'Pompeya a Armenia', km: 2.00},
                {name: 'Armenia a Sadop', km: 3.40},
                {name: 'Sadop a Recondo', km: 5.30},
                {name: 'Recondo a Tribunales', km: 4.30},
                {name: 'Tribunales a Cruce de Lomas', km: 6.20}
            ]
        },
        'G': {
            nombre: 'Ramal G (Budge - Once)',
            ida: [
                {name: 'Cruce de Lomas a Budge', km: 4.70},
                {name: 'Budge a Recondo', km: 7.00},
                {name: 'Recondo a Pompeya', km: 9.20},
                {name: 'Pompeya a Caseros', km: 2.90},
                {name: 'Caseros a Once', km: 5.20}
            ],
            vuelta: [
                {name: 'Once a Caseros', km: 3.10},
                {name: 'Caseros a Pompeya', km: 3.50},
                {name: 'Pompeya a Recondo', km: 9.80},
                {name: 'Recondo a Budge', km: 2.70},
                {name: 'Budge a Cruce de Lomas', km: 4.70}
            ]
        },
        'G_CORTO': {
            nombre: 'Ramal G Corto (Budge - Pompeya)',
            ida: [
                {name: 'Cruce de Lomas a Pompeya', km: 19.50}
            ],
            vuelta: [
                {name: 'Pompeya a Recondo', km: 9.80},
                {name: 'Recondo a Budge', km: 2.70},
                {name: 'Budge a Cruce de Lomas', km: 4.70}
            ]
        }
    },
    '20': {
        'A': {
            nombre: 'Ramal A (Itatí - Retiro)',
            ida: [
                {name: 'Cruce de Lomas a Siritto', km: 3.16},
                {name: 'Siritto a Larroque', km: 3.20},
                {name: 'Larroque a Hornos', km: 4.78},
                {name: 'Hornos a Viamonte', km: 2.71},
                {name: 'Viamonte a Alsina', km: 2.98},
                {name: 'Alsina a Pte. V. Sarfield', km: 2.97},
                {name: 'Pte. V. Sarfield a M. Oca', km: 2.61},
                {name: 'M. Oca a Alte. Brown', km: 2.46},
                {name: 'Alte. Brown a Belgrano', km: 3.81},
                {name: 'Belgrano a Retiro', km: 4.34}
            ],
            vuelta: [
                {name: 'Retiro a Belgrano', km: 3.24},
                {name: 'Belgrano a Alte. Brown', km: 3.61},
                {name: 'Alte. Brown a M. Oca', km: 2.37},
                {name: 'M. Oca a Pte. V. Sarfield', km: 2.72},
                {name: 'Pte. V. Sarfield a Alsina', km: 2.40},
                {name: 'Alsina a Viamonte', km: 2.73},
                {name: 'Viamonte a Hornos', km: 2.63},
                {name: 'Hornos a Larroque', km: 4.60},
                {name: 'Larroque a Siritto', km: 3.00},
                {name: 'Siritto A Cruce de Lomas', km: 3.15}
            ]
        },
        'B': {
            nombre: 'Ramal B (Rodríguez - Retiro)',
            ida: [
                {name: 'Cruce de Lomas a Olmos', km: 4.85},
                {name: 'Olmos a Las Tropas', km: 3.11},
                {name: 'Las Tropas a Hornos', km: 4.42},
                {name: 'Hornos a Viamonte', km: 2.71},
                {name: 'Viamonte a Alsina', km: 2.98},
                {name: 'Alsina a Pte. V. Sarfield', km: 2.97},
                {name: 'Pte. V. Sarfield a M. Oca', km: 2.61},
                {name: 'M. Oca a Alte. Brown', km: 2.46},
                {name: 'Alte. Brown a Belgrano', km: 3.81},
                {name: 'Belgrano a Retiro', km: 4.34}
            ],
            vuelta: [
                {name: 'Retiro a Belgrano', km: 3.24},
                {name: 'Belgrano a Alte. Brown', km: 3.61},
                {name: 'Alte. Brown a M. Oca', km: 2.37},
                {name: 'M. Oca a Pte. V. Sarfield', km: 2.72},
                {name: 'Pte. V. Sarfield a Alsina', km: 2.40},
                {name: 'Alsina a Viamonte', km: 2.73},
                {name: 'Viamonte a Hornos', km: 2.63},
                {name: 'Hornos a Las Tropas', km: 4.51},
                {name: 'Las Tropas a Olmos', km: 3.07},
                {name: 'Olmos a Cruce de Lomas', km: 4.21}
            ]
        }
    }
};

const KM_LA_NORIA = 11.50;
const KM_117 = 3.50;
