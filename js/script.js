function generarId(long) {
    let id = '';
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let caracteresLength = caracteres.length;
    for (let i = 0; i < long; i++)
        id += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    return id;
}

class Nota { //id, titulo, contenido, modificacion
    constructor(titulo, contenido) {
        this.id = generarId(20);
        this.titulo = titulo;
        this.contenido = contenido;
        this.modificacion = new Date();
    }
}

function agregarNotas(){
    let notas = JSON.parse(localStorage.getItem('notas')) || [];
    let titulo = document.getElementById('tituloModal1');
    let contenido = document.getElementById('contenidoModal1');
    let modificacion = document.getElementById('modificacionModal1');
    if(titulo.value != "" && contenido.value != ""){
        notas.push(new Nota(titulo.value, contenido.value, notas.length));
        localStorage.setItem('notas',JSON.stringify(notas));

        titulo.value = ""
        contenido.value = ""
       

        listarNotas();
        Swal.fire({
            title: 'Nota creada',
            text: 'Nota guardado con exito!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
            })
        $('#addContactModal').modal('hide');
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            showConfirmButton: false,
            timer: 1500
          })
    }
}

function listarNotas(notas = null) {
    if(!notas)
        notas = JSON.parse(localStorage.getItem('notas'));
    
    let bloques = "";
    if(!notas || notas.length<1) {
        bloques += '<tr><td colspan="2">Agregue una nota para empezar</td><td colspan="2"></td><td><button type="button" class="btn mr-3 btn-outline-primary" data-toggle="modal" data-target="#addContactModal"><i class="fas fa-user-plus mr-3"></i>Agregar Contacto</button></td></tr>';
    }
    else {
        for (let i = 0; i < notas.length; i++)
            tabla += '<tr><td colspan="2">'+ notas[i].nombre + '</td><td colspan="2">' + notas[i].telefono + '</td><td><button type="button" class="btn btn-outline-warning mr-3" data-toggle="modal" data-target="#editContactModal" onclick="actualizarContacto(' + notas[i].id + ')"> <i class="fas fa-user-edit mr-3"></i>Editar</button><button class="btn btn-outline-danger" onclick="eliminarContacto(' + notas[i].id + ')"><i class="fas fa-trash-alt mr-3"></i>Eliminar</button></td></tr>';
    }
    document.getElementById('tablaNotas').innerHTML = tabla;
}