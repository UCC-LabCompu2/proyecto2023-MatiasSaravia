const canvas = document.querySelector('canvas')
canvas.height = 700;
canvas.width = 680;
const c2d = canvas.getContext('2d');
const C_puntos = document.querySelector('#C_puntos');
const img1 = document.getElementById("pac");
const img2 = document.getElementById("fant");
const img3 = document.getElementById("fant2");
const img4 = document.getElementById("fant3");
const img5 = document.getElementById("fant4");
const img6 = document.getElementById("ladr");

// Definir la variable velocidad2
let velocidad2 = 0;

/**
 * Pide al usuario que elija un nivel y realiza las acciones correspondientes en la velocidad de los fantasmas.
 */
function pedirNivel() {
    /**
     * @type {string} nivel - El nivel elegido por el usuario.
     */
    var nivel = prompt("Por favor, elige un nivel: [Facil / Normal / Dificil]").toLowerCase();

    while (nivel !== "facil" && nivel !== "normal" && nivel !== "dificil") {
        nivel = prompt("Nivel inválido. Por favor, elige un nivel válido: [Fácil / Normal / Difícil]").toLowerCase();
    }

    /**
     * Realiza las acciones correspondientes al nivel elegido por el usuario.
     * @param {string} nivel - El nivel elegido por el usuario.
     */
    function realizarAcciones(nivel) {
        if (nivel === "facil") {
            // Acciones para el nivel fácil
            console.log("Has elegido el nivel fácil.");
            velocidad2 = 1;
        } else if (nivel === "normal") {
            // Acciones para el nivel normal
            console.log("Has elegido el nivel normal.");
            velocidad2 = 2;
        } else if (nivel === "dificil") {
            // Acciones para el nivel difícil
            console.log("Has elegido el nivel difícil.");
            velocidad2 = 2.5;
        }
    }

    realizarAcciones(nivel);
}

// Llama a la función para iniciar el proceso de pedir al usuario que elija un nivel.
pedirNivel();


/**
 * Clase que representa a Pacman.
 * @class
 */
class Pacman {
    /**
     * Constructor de la clase Pacman.
     * @constructor
     * @param {Object} posicion - La posición inicial de Pacman.
     * @param {number} posicion.x - La coordenada x de la posición inicial.
     * @param {number} posicion.y - La coordenada y de la posición inicial.
     * @param {Object} velocidad - La velocidad de movimiento de Pacman.
     * @param {number} velocidad.x - La componente x de la velocidad.
     * @param {number} velocidad.y - La componente y de la velocidad.
     */
    constructor({posicion, velocidad}) {
        /**
         * El tamaño del cuerpo de Pacman.
         * @type {number}
         */
        this.cuerpo = 12;
        /**
         * La posición actual de Pacman.
         * @type {Object}
         * @property {number} x - La coordenada x de la posición.
         * @property {number} y - La coordenada y de la posición.
         */
        this.posicion = posicion;
        /**
         * La velocidad de movimiento de Pacman.
         * @type {Object}
         * @property {number} x - La componente x de la velocidad.
         * @property {number} y - La componente y de la velocidad.
         */
        this.velocidad = velocidad;
        /**
         * La rotación actual de Pacman.
         * @type {number}
         */
        this.rotacion = 0;
    }

    /**
     * Método para dibujar a Pacman.
     */
    Dibujar() {
        c2d.save();
        c2d.translate(this.posicion.x, this.posicion.y);
        c2d.rotate(this.rotacion);
        c2d.translate(-this.posicion.x, -this.posicion.y);
        c2d.drawImage(img1, this.posicion.x - 15, this.posicion.y - 15, 30, 30);
        c2d.restore();
    }

    /**
     * Método para actualizar la posición de Pacman y dibujarlo.
     */
    actualizar() {
        this.Dibujar()
        this.posicion.x += this.velocidad.x;
        this.posicion.y += this.velocidad.y;
    }
}

/**
 * Clase que representa a un Fantasma.
 * @class
 */
class Fantasma {
    /**
     * Constructor de la clase Fantasma.
     * @constructor
     * @param {Object} posicion - La posición inicial del Fantasma.
     * @param {number} posicion.x - La coordenada x de la posición inicial.
     * @param {number} posicion.y - La coordenada y de la posición inicial.
     * @param {Object} velocidad - La velocidad de movimiento del Fantasma.
     * @param {number} velocidad.x - La componente x de la velocidad.
     * @param {number} velocidad.y - La componente y de la velocidad.
     * @param {string} img - La imagen del Fantasma.
     */
    constructor({posicion, velocidad, img = img2}) {
        /**
         * El tamaño del cuerpo del Fantasma.
         * @type {number}
         */
        this.cuerpo = 12;
        /**
         * La posición actual del Fantasma.
         * @type {Object}
         * @property {number} x - La coordenada x de la posición.
         * @property {number} y - La coordenada y de la posición.
         */
        this.posicion = posicion;
        /**
         * La velocidad de movimiento del Fantasma.
         * @type {Object}
         * @property {number} x - La componente x de la velocidad.
         * @property {number} y - La componente y de la velocidad.
         */
        this.velocidad = velocidad;
        /**
         * Las colisiones anteriores del Fantasma.
         * @type {Array}
         */
        this.Colisiones_anteriores = [];
        /**
         * La imagen del Fantasma.
         * @type {string}
         */
        this.img = img;
    }

    /**
     * Método para dibujar al Fantasma.
     */
    Dibujar2() {
        c2d.drawImage(this.img, this.posicion.x - 15, this.posicion.y - 15, 30, 30);
    }

    /**
     * Método para actualizar la posición del Fantasma y dibujarlo.
     */
    actualizar() {
        this.Dibujar2()
        this.posicion.x += this.velocidad.x;
        this.posicion.y += this.velocidad.y;
    }
}

/**
 * Clase que representa las Monedas.
 * @class
 */
class Monedas {
    /**
     * Constructor de la clase Monedas.
     * @constructor
     * @param {Object} posicion - La posición de las Monedas.
     * @param {number} posicion.x - La coordenada x de la posición.
     * @param {number} posicion.y - La coordenada y de la posición.
     */
    constructor({posicion}) {
        /**
         * El tamaño del cuerpo de las Monedas.
         * @type {number}
         */
        this.cuerpo = 5;
        /**
         * La posición de las Monedas.
         * @type {Object}
         * @property {number} x - La coordenada x de la posición.
         * @property {number} y - La coordenada y de la posición.
         */
        this.posicion = posicion;

    }

    /**
     * Método para dibujar las Monedas en el lienzo.
     */
    Dibujar3() {
        c2d.beginPath();
        c2d.arc(this.posicion.x, this.posicion.y, this.cuerpo, 0, Math.PI * 2);
        c2d.fillStyle = 'rgb(255,183,0)';
        c2d.fill();
        c2d.closePath();
    }
}

/**
 * Clase que representa las Paredes.
 * @class
 */
class Paredes {
    /**
     * El ancho predeterminado de las Paredes.
     * @type {number}
     */
    static width = 40;
    /**
     * La altura predeterminada de las Paredes.
     * @type {number}
     */
    static height = 40;

    /**
     * Constructor de la clase Paredes.
     * @constructor
     * @param {Object} posicion - La posición de las Paredes.
     * @param {number} posicion.x - La coordenada x de la posición.
     * @param {number} posicion.y - La coordenada y de la posición.
     */
    constructor({posicion}) {
        /**
         * La posición de las Paredes.
         * @type {Object}
         * @property {number} x - La coordenada x de la posición.
         * @property {number} y - La coordenada y de la posición.
         */
        this.posicion = posicion;
        /**
         * El ancho de las Paredes.
         * @type {number}
         */
        this.width = 40;
        /**
         * La altura de las Paredes.
         * @type {number}
         */
        this.height = 40;
    }

    /**
     * Método para dibujar las Paredes.
     */
    Dibujar4() {
        c2d.beginPath()
        c2d.drawImage(img6, this.posicion.x, this.posicion.y, 40, 40);
    }
}

/**
 * Hace que el pacman tengan una posicion y velocidad predeterminda
 * @method pacman
 */
const pacman = new Pacman({
    posicion: {
        x: Paredes.width * 8 + Paredes.width / 2,
        y: Paredes.height * 2 + Paredes.height / 2
    },
    velocidad: {
        x: 0,
        y: 0
    }
});
/**
 *Hace que los fantasmas tengan una posicion y velocidad predeterminada.
 *@method fantasma
 */
const fantasma =
    [new Fantasma({
        posicion: {
            x: Paredes.width * 8 + Paredes.width / 2,
            y: Paredes.height * 8 + Paredes.height / 2
        },
        velocidad: {x: 0, y: velocidad2}

    }),
        new Fantasma({
            posicion: {
                x: Paredes.width * 8 + Paredes.width / 2,
                y: Paredes.height * 8 + Paredes.height / 2
            },
            velocidad: {x: -velocidad2, y: 0},
            img: img3


        }),
        new Fantasma({
            posicion: {
                x: Paredes.width * 8 + Paredes.width / 2,
                y: Paredes.height * 8 + Paredes.height / 2
            },
            velocidad: {x: velocidad2, y: 0},
            img: img4
        }),
        new Fantasma({
            posicion: {
                x: Paredes.width * 8 + Paredes.width / 2,
                y: Paredes.height * 8 + Paredes.height / 2
            },
            velocidad: {x: 0, y: -velocidad2},
            img: img5

        })
    ];
/**
 * Esqueleto del laberinto (#) son las paredes,(º) son las monedas y el espacio vacio es donde empieza el pacman.
 * @type {string[][]}
 */
const laberinto = [
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', '#'],
    ['#', 'º', '#', 'º', '#', '#', 'º', '#', ' ', '#', 'º', '#', '#', 'º', '#', 'º', '#'],
    ['#', 'º', 'º', 'º', 'º', '#', 'º', 'º', 'º', 'º', 'º', '#', 'º', 'º', 'º', 'º', '#'],
    ['#', '#', 'º', '#', 'º', '#', 'º', '#', '#', '#', 'º', '#', 'º', '#', 'º', '#', '#'],
    ['#', 'º', 'º', 'º', 'º', 'º', 'º', 'º', '#', 'º', 'º', 'º', 'º', 'º', 'º', 'º', '#'],
    ['#', 'º', '#', 'º', '#', 'º', '#', 'º', 'º', 'º', '#', 'º', '#', 'º', '#', 'º', '#'],
    ['#', 'º', 'º', 'º', 'º', 'º', 'º', '#', 'º', '#', 'º', 'º', 'º', 'º', 'º', 'º', '#'],
    ['#', 'º', '#', 'º', '#', '#', 'º', 'º', 'º', 'º', 'º', '#', '#', 'º', '#', 'º', '#'],
    ['#', 'º', 'º', 'º', 'º', 'º', 'º', '#', 'º', '#', 'º', 'º', 'º', 'º', 'º', 'º', '#'],
    ['#', 'º', '#', 'º', '#', 'º', '#', 'º', 'º', 'º', '#', 'º', '#', 'º', '#', 'º', '#'],
    ['#', 'º', 'º', 'º', 'º', 'º', 'º', 'º', '#', 'º', 'º', 'º', 'º', 'º', 'º', 'º', '#'],
    ['#', '#', 'º', '#', 'º', '#', 'º', '#', '#', '#', 'º', '#', 'º', '#', 'º', '#', '#'],
    ['#', 'º', 'º', 'º', 'º', '#', 'º', 'º', 'º', 'º', 'º', '#', 'º', 'º', 'º', 'º', '#'],
    ['#', 'º', '#', 'º', '#', '#', 'º', '#', 'º', '#', 'º', '#', '#', 'º', '#', 'º', '#'],
    ['#', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', 'º', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
];

const moneda = [];
const paredes = [];
/**
 * Creacion del laberinto.
 * @method laberinto
 */
laberinto.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '#':
                paredes.push(
                    new Paredes({
                        posicion: {x: Paredes.width * j, y: Paredes.height * i},
                    })
                )
                break
            case 'º':
                moneda.push(
                    new Monedas({
                        posicion: {
                            x: Paredes.width * j + Paredes.width / 2,
                            y: Paredes.height * i + Paredes.width / 2
                        },
                    })
                )
                break
        }
    });
});

//Controles
let ul_control = '';
/**
 * Hace que los controles W,A,S,D sean falsas por predeterminado.
 * @method controles
 */
const controles = {
    w: {presionado: false},
    s: {presionado: false},
    a: {presionado: false},
    d: {presionado: false}
};

//para saber que tecla presionaste.
addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'w':
            controles.w.presionado = true
            ul_control = 'w'
            break
        case 's':
            controles.s.presionado = true
            ul_control = 's'
            break
        case 'a':
            controles.a.presionado = true
            ul_control = 'a'
            break
        case 'd':
            controles.d.presionado = true
            ul_control = 'd'
            break
    }
});

//para frenar cuando se cambia de tecla.
addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'w':
            controles.w.presionado = false
            break
        case 'a':
            controles.a.presionado = false
            break
        case 's':
            controles.s.presionado = false
            break
        case 'd':
            controles.d.presionado = false
            break
    }
});

/**
 * Comprueba si un círculo colisiona con un cuadrado.
 * @param {Object} circulo - El objeto del círculo.
 * @param {number} circulo.cuerpo - El radio del círculo.
 * @param {Object} circulo.posicion - La posición del círculo.
 * @param {number} circulo.posicion.x - La coordenada x de la posición del círculo.
 * @param {number} circulo.posicion.y - La coordenada y de la posición del círculo.
 * @param {Object} circulo.velocidad - La velocidad del círculo.
 * @param {number} circulo.velocidad.x - La velocidad en el eje x del círculo.
 * @param {number} circulo.velocidad.y - La velocidad en el eje y del círculo.
 * @param {Object} cuadrado - El objeto del cuadrado.
 * @param {number} cuadrado.height - La altura del cuadrado.
 * @param {number} cuadrado.width - El ancho del cuadrado.
 * @param {Object} cuadrado.posicion - La posición del cuadrado.
 * @param {number} cuadrado.posicion.x - La coordenada x de la posición del cuadrado.
 * @param {number} cuadrado.posicion.y - La coordenada y de la posición del cuadrado.
 * @returns {boolean} Devuelve true si hay colisión, de lo contrario devuelve false.
 */
function circulo_colisiona({circulo, cuadrado}) {
    const padding = Paredes.width / 2 - circulo.cuerpo - 1;
    return (circulo.posicion.y - circulo.cuerpo + circulo.velocidad.y <= cuadrado.posicion.y + cuadrado.height + padding &&
        circulo.posicion.x + circulo.cuerpo + circulo.velocidad.x >= cuadrado.posicion.x - padding &&
        circulo.posicion.y + circulo.cuerpo + circulo.velocidad.y >= cuadrado.posicion.y - padding &&
        circulo.posicion.x - circulo.cuerpo + circulo.velocidad.x <= cuadrado.posicion.x + cuadrado.width + padding);
}

let puntos = 0;
let animacion2;

/**
 * Desarrollo del juego.
 * @method animacion
 * @return Devuelve los posibles caminos que tomara el fantasma
 */
function animacion() {
    /**
     * Inicia una nueva animación y llama a la función 'animacion'.
     * @type {number} animacion2 - Identificador de la animación.
     */
    animacion2 = requestAnimationFrame(animacion)
    // Limpia los movimientos anteriores del pacman.
    c2d.clearRect(0, 0, canvas.width, canvas.height)
    pacman.actualizar()
    //Detecta la colision con la pared en direccion -Y.
    if (controles.w.presionado && ul_control === 'w') {
        for (let i = 0; i < paredes.length; i++) {
            const Paredes = paredes[i]
            if (circulo_colisiona({
                circulo: {...pacman, velocidad: {x: 0, y: -2}},
                cuadrado: Paredes
            })
            ) {
                pacman.velocidad.y = 0
                break
            } else {
                pacman.velocidad.y = -2
            }
        }


    }

    //Detecta la colision con la pared en direccion Y.
    else if (controles.s.presionado && ul_control === 's') {
        for (let i = 0; i < paredes.length; i++) {
            const Paredes = paredes[i]
            if (circulo_colisiona({
                circulo: {...pacman, velocidad: {x: 0, y: 2}},
                cuadrado: Paredes
            })
            ) {
                pacman.velocidad.y = 0
                break
            } else {
                pacman.velocidad.y = 2
            }
        }
    }

    //Detecta la colision con la pared en direccion -X.
    else if (controles.a.presionado && ul_control === 'a') {
        for (let i = 0; i < paredes.length; i++) {
            const Paredes = paredes[i]
            if (circulo_colisiona({
                circulo: {...pacman, velocidad: {x: -2, y: 0}},
                cuadrado: Paredes
            })
            ) {
                pacman.velocidad.x = 0
                break
            } else {
                pacman.velocidad.x = -2
            }
        }

    }

    //Detecta la colision con la pared en direccion X.
    else if (controles.d.presionado && ul_control === 'd') {
        for (let i = 0; i < paredes.length; i++) {
            const Paredes = paredes[i]
            if (circulo_colisiona({
                circulo: {...pacman, velocidad: {x: 2, y: 0}},
                cuadrado: Paredes
            })
            ) {
                pacman.velocidad.x = 0
                break
            } else {
                pacman.velocidad.x = 2
            }
        }
    }

    /**
     * Detecta las monedas, elimina las monedas e incremento del puntaje.
     * @method moneda
     */
    moneda.forEach((monedas, i) => {
        monedas.Dibujar3()
        if (Math.hypot(monedas.posicion.x - pacman.posicion.x,
            monedas.posicion.y - pacman.posicion.y) < monedas.cuerpo + pacman.cuerpo) {
            moneda.splice(i, 1)
            puntos += 5;
            C_puntos.innerHTML = puntos;
        }
    });

    /**
     * Detecta la colision del pacman con una pared (Causa que la velocidad se modifique a 0).
     * @method paredes
     */
    paredes.forEach((Paredes) => {
        Paredes.Dibujar4()
        if (circulo_colisiona({
            circulo: pacman,
            cuadrado: Paredes
        })
        ) {
            pacman.velocidad.x = 0
            pacman.velocidad.y = 0
        }
    });

    /**
     * Detecta la colision entre fantasma y pacman.
     * @method fantasma
     */
    fantasma.forEach(fantasma => {
        fantasma.actualizar()

        //Condicion para perder
        if (
            Math.hypot(
                fantasma.posicion.x - pacman.posicion.x,
                fantasma.posicion.y - pacman.posicion.y) < fantasma.cuerpo + pacman.cuerpo) {
            cancelAnimationFrame(animacion2)
            alert("!!! Game Over ¡¡¡");
            alert("Un fantasma te a pillado");
        }
        //Condicion para ganar
        if (moneda.length === 0) {
            cancelAnimationFrame(animacion2)
            alert("!!! You Win ¡¡¡");
            alert("Has comido todos los pac-dots");
        }

        const colision = [];
        /**
         * Detecta cuando colisionan con las paredes los fantasmas.
         * @method paredes
         */
        paredes.forEach((Paredes) => {
            if (!colision.includes('arriba') && circulo_colisiona({
                circulo: {...fantasma, velocidad: {x: 0, y: -velocidad2}},
                cuadrado: Paredes
            })
            ) {
                colision.push('arriba')
            }
            if (!colision.includes('abajo') && circulo_colisiona({
                circulo: {...fantasma, velocidad: {x: 0, y: velocidad2}},
                cuadrado: Paredes
            })
            ) {
                colision.push('abajo')
            }
            if (!colision.includes('izq') && circulo_colisiona({
                circulo: {...fantasma, velocidad: {x: -velocidad2, y: 0}},
                cuadrado: Paredes
            })
            ) {
                colision.push('izq')
            }
            if (!colision.includes('der') && circulo_colisiona({
                circulo: {...fantasma, velocidad: {x: velocidad2, y: 0}},
                cuadrado: Paredes
            })
            ) {
                colision.push('der')
            }
        });

        //Guarda la posicion anterior del fantasma.
        if (colision.length > fantasma.Colisiones_anteriores.length) {
            fantasma.Colisiones_anteriores = colision
        }
        //Detecta posibles caminos de los fantasmas.
        if (JSON.stringify(colision) !== JSON.stringify(fantasma.Colisiones_anteriores)) {
            if (fantasma.velocidad.y < 0) {
                fantasma.Colisiones_anteriores.push('arriba')
            } else if (fantasma.velocidad.y > 0) {
                fantasma.Colisiones_anteriores.push('abajo')
            } else if (fantasma.velocidad.x < 0) {
                fantasma.Colisiones_anteriores.push('izq')
            } else if (fantasma.velocidad.x > 0) {
                fantasma.Colisiones_anteriores.push('der')
            }

            /**
             * Hace que los fantasmas vean que direccion pueden tomar.
             * @method caminos
             * @return si no hay colision
             */
            const caminos = fantasma.Colisiones_anteriores.filter((colision1) => {
                return !colision.includes(colision1)
            });
            /**
             * Hace que la direccion que toman los fantasmas sean aleatoria.
             * @method direccion
             */
            const direccion = caminos[Math.floor(Math.random() * caminos.length)];
            switch (direccion) {
                case'arriba':
                    fantasma.velocidad.x = 0;
                    fantasma.velocidad.y = -velocidad2;
                    break
                case'abajo':
                    fantasma.velocidad.x = 0;
                    fantasma.velocidad.y = velocidad2;
                    break
                case'izq':
                    fantasma.velocidad.x = -velocidad2;
                    fantasma.velocidad.y = 0;
                    break
                case'der':
                    fantasma.velocidad.x = velocidad2;
                    fantasma.velocidad.y = 0;
                    break

            }
            fantasma.Colisiones_anteriores = []
        }
    });

    //Detecta en que direccion va el pacman y rota la imagen del pacman.
    if (pacman.velocidad.x > 0) {
        pacman.rotacion = 0
    } else if (pacman.velocidad.x < 0) {
        pacman.rotacion = Math.PI
    } else if (pacman.velocidad.y > 0) {
        pacman.rotacion = Math.PI / 2
    } else if (pacman.velocidad.y < 0) {
        pacman.rotacion = Math.PI * 1.5
    }

}

animacion()

