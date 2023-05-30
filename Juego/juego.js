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

class Pacman {
    constructor({posicion, velocidad}) {
        this.cuerpo = 12;
        this.posicion = posicion;
        this.velocidad = velocidad;
        this.rotation = 0;
    }

    Dibujar() {
        c2d.save();
        c2d.translate(this.posicion.x, this.posicion.y);
        c2d.rotate(this.rotation);
        c2d.translate(-this.posicion.x, -this.posicion.y);
        c2d.drawImage(img1, this.posicion.x-15, this.posicion.y-15,30,30);
        c2d.beginPath()
        c2d.closePath()
        c2d.restore()
    }

    actualizar() {
        this.Dibujar()
        this.posicion.x += this.velocidad.x;
        this.posicion.y += this.velocidad.y;
    }
}
class Fantasma {
    constructor({posicion, velocidad,img=img2}) {
        this.cuerpo = 12;
        this.posicion = posicion;
        this.velocidad = velocidad;
        this.Colisiones_anteriores = [];
        this.img = img;
    }

    Dibujar2() {
        c2d.drawImage(this.img, this.posicion.x-15, this.posicion.y-15,30,30);
    }

    actualizar() {
        this.Dibujar2()
        this.posicion.x += this.velocidad.x;
        this.posicion.y += this.velocidad.y;
    }
}

class Monedas {
    constructor({posicion}) {
        this.cuerpo = 5;
        this.posicion = posicion;

    }

    Dibujar3() {
        c2d.beginPath();
        c2d.arc(this.posicion.x, this.posicion.y, this.cuerpo, 0, Math.PI * 2);
        c2d.fillStyle = 'rgb(255,183,0)';
        c2d.fill();
        c2d.closePath();
    }
}

class Paredes {
    static width = 40;
    static height = 40;

    constructor({posicion}) {
        this.posicion = posicion;
        this.width = 40;
        this.height = 40;
    }

    Dibujar4() {
        c2d.drawImage(img6, this.posicion.x, this.posicion.y,40,40);
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
})
/**
 *Hace que los fantasmas tengan una posicion y velocidad predeterminada
 *@method fantasma
 */
const fantasma =
    [new Fantasma({
        posicion: {
            x: Paredes.width * 8 + Paredes.width / 2,
            y: Paredes.height * 8 + Paredes.height / 2
        },
        velocidad: {x: 0, y: 2}

    }),
        new Fantasma({
            posicion: {
                x: Paredes.width * 8 + Paredes.width / 2,
                y: Paredes.height * 8 + Paredes.height / 2
            },
            velocidad: {x: -2, y: 0},
            img: img3


        }),
        new Fantasma({
            posicion: {
                x: Paredes.width * 8 + Paredes.width / 2,
                y: Paredes.height * 8 + Paredes.height / 2
            },
            velocidad: {x: 2, y: 0},
            img: img4
        }),
        new Fantasma({
            posicion: {
                x: Paredes.width * 8 + Paredes.width / 2,
                y: Paredes.height * 8 + Paredes.height / 2
            },
            velocidad: {x: 0, y: -2},
            img: img5

        })
    ];

//Esqueleto del laberinto (#) son las paredes,(º) son las monedas y el espacio vacio es donde empieza el pacman
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
]

const moneda = [];
const paredes = [];
/**
 * Creacion del laberinto
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
    })
});

//Controles
let ul_control = '';
/**
 * Hace que los controles W,A,S,D sean falsas por predeterminado
 * @method controles
 */
const controles = {
    w: {presionado: false},
    s: {presionado: false},
    a: {presionado: false},
    d: {presionado: false}
}

//para saber que tecla presionaste
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
})

//para frenar cuando se cambia de tecla
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
})

/**
 * Detecta cuando un circulo choca contra una pared
 * @method circulo_colisiona
 * @param {int} posicion, velocidad y cuerpo - posicion: posicion del circulo - velocidad: rapidez del circulo - cuerpo: tamaño del circulo
 * @param {int} posicion, alto y ancho - posicion: posicion de las paredes - alto y ancho: tamaño del cuadrado
 * @return Devuelve contra que pared choco el circulo
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
 * Desarrollo del juego
 * @method animacion
 * @return Devuelve los posibles caminos que tomara el fantasma
 */
function animacion() {
    animacion2 = requestAnimationFrame(animacion)
    // Limpia los movimientos anteriores del pacman
    c2d.clearRect(0, 0, canvas.width, canvas.height)
    pacman.actualizar()
    //Detecta la colision con la pared en direccion -Y
    if (controles.w.presionado && ul_control === 'w') {
        for (let i = 0; i < paredes.length; i++) {
            const Paredes = paredes[i]
            if (circulo_colisiona({
                circulo: {...pacman, velocidad: {x: 0, y: -2}},
                cuadrado: Paredes
            })
            ) {
                pacman.velocidad.y = 0;
                break
            } else {
                pacman.velocidad.y = -2;
            }
        }


    }

    //Detecta la colision con la pared en direccion Y
    else if (controles.s.presionado && ul_control === 's') {
        for (let i = 0; i < paredes.length; i++) {
            const Paredes = paredes[i]
            if (circulo_colisiona({
                circulo: {...pacman, velocidad: {x: 0, y: 2}},
                cuadrado: Paredes
            })
            ) {
                pacman.velocidad.y = 0;
                break
            } else {
                pacman.velocidad.y = 2;
            }
        }
    }

    //Detecta la colision con la pared en direccion -X
    else if (controles.a.presionado && ul_control === 'a') {
        for (let i = 0; i < paredes.length; i++) {
            const Paredes = paredes[i]
            if (circulo_colisiona({
                circulo: {...pacman, velocidad: {x: -2, y: 0}},
                cuadrado: Paredes
            })
            ) {
                pacman.velocidad.x = 0;
                break
            } else {
                pacman.velocidad.x = -2;
            }
        }

    }

    //Detecta la colision con la pared en direccion X
    else if (controles.d.presionado && ul_control === 'd') {
        for (let i = 0; i < paredes.length; i++) {
            const Paredes = paredes[i]
            if (circulo_colisiona({
                circulo: {...pacman, velocidad: {x: 2, y: 0}},
                cuadrado: Paredes
            })
            ) {
                pacman.velocidad.x = 0;
                break
            } else {
                pacman.velocidad.x = 2;
            }
        }
    }

    /**
     * Detecta las monedas, elimina las monedas e incremento del puntaje
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
    })

    /**
     * Detecta la colision del pacman con una pared (Causa que la velocidad se modifique a 0)
     * @method paredes
     */
    paredes.forEach((Paredes) => {
        Paredes.Dibujar4()
        if (circulo_colisiona({
            circulo: pacman,
            cuadrado: Paredes
        })
        ) {
            pacman.velocidad.x = 0;
            pacman.velocidad.y = 0;
        }
    })

    /**
     * Detecta la colision entre fantasma y pacman
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

        const colision = []
        /**
         * Detecta cuando colisionan con las paredes los fantasmas
         * @method paredes
         */
        paredes.forEach((Paredes) => {
            if (!colision.includes('arriba') && circulo_colisiona({
                circulo: {...fantasma, velocidad: {x: 0, y: -2}},
                cuadrado: Paredes
            })
            ) {
                colision.push('arriba')
            }
            if (!colision.includes('abajo') && circulo_colisiona({
                circulo: {...fantasma, velocidad: {x: 0, y: 2}},
                cuadrado: Paredes
            })
            ) {
                colision.push('abajo')
            }
            if (!colision.includes('izq') && circulo_colisiona({
                circulo: {...fantasma, velocidad: {x: -2, y: 0}},
                cuadrado: Paredes
            })
            ) {
                colision.push('izq')
            }
            if (!colision.includes('der') && circulo_colisiona({
                circulo: {...fantasma, velocidad: {x: 2, y: 0}},
                cuadrado: Paredes
            })
            ) {
                colision.push('der')
            }
        })

        //Guarda la posicion anterior del fantasma
        if (colision.length > fantasma.Colisiones_anteriores.length) {
            fantasma.Colisiones_anteriores = colision
        }
        //Detecta posibles caminos de los fantasmas
        if (JSON.stringify(colision) !== JSON.stringify(fantasma.Colisiones_anteriores)) {
            if (fantasma.velocidad.y < 0) fantasma.Colisiones_anteriores.push('arriba')
            else if (fantasma.velocidad.y > 0) fantasma.Colisiones_anteriores.push('abajo')
            else if (fantasma.velocidad.x < 0) fantasma.Colisiones_anteriores.push('izq')
            else if (fantasma.velocidad.x > 0) fantasma.Colisiones_anteriores.push('der')

            /**
             * Hace que los fantasmas vean que direccion pueden tomar
             * @method caminos
             * @return si no hay colision
             */
            const caminos = fantasma.Colisiones_anteriores.filter((colision1) => {
                return !colision.includes(colision1)
            })
            /**
             * Hace que la direccion que toman los fantasmas sean aleatoria
             * @method direccion
             */
            const direccion = caminos[Math.floor(Math.random() * caminos.length)]
            switch (direccion) {
                case'arriba':
                    fantasma.velocidad.x = 0;
                    fantasma.velocidad.y = -2;
                    break
                case'abajo':
                    fantasma.velocidad.x = 0;
                    fantasma.velocidad.y = 2;
                    break
                case'izq':
                    fantasma.velocidad.x = -2;
                    fantasma.velocidad.y = 0;
                    break
                case'der':
                    fantasma.velocidad.x = 2;
                    fantasma.velocidad.y = 0;
                    break

            }
            fantasma.Colisiones_anteriores = []
        }
    })
    if (pacman.velocidad.x > 0) pacman. rotation = 0
    else if (pacman.velocidad.x < 0) pacman. rotation = Math.PI
    else if (pacman.velocidad.y > 0) pacman. rotation = Math.PI / 2
    else if (pacman.velocidad.y < 0) pacman. rotation = Math.PI * 1.5

}

animacion()

