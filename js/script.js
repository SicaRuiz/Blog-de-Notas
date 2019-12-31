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
        /*this.modificacion = new Date();*/
    }
}

function agregarNota(){
    let notas = JSON.parse(localStorage.getItem('notas')) || [];
    let titulo = document.getElementById('tituloModal1');
    let contenido = document.getElementById('contenidoModal1');
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
        $('#addNotaModal').modal('hide');
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
    
    let bloc = "";
    if(!notas || notas.length<1) {
        bloc += '<div class="card text-center my-5 mx-3" style="width: 18rem;"><div class="card-body"><div class="form-group"><label for="exampleSelect1">Categoria</label><select class="form-control btn-primary" id="exampleSelect1"><option>1</option><option>2</option><option>3</option></select></div>';
    }
    else {
        for (let i = 0; i < notas.length; i++)
            bloc += '<h5 class="card-title">'+ notas[i].titulo +'</h5><p class="card-text">' + notas[i].contenido + '</p><button href="#" class="btn btn-outline-primary" data-toggle="modal" data-target="#editNotaModal" onclick="actualizarNota(' + notas[i].id + ')"> Editar </button><button class="btn btn-outline-dangeronclick="eliminarNota(' + notas[i].id + ')"><i class="fas fa-trash-alt mr-3"></i>Eliminar</button></div></div>';
    }
    document.getElementById('blocdeNotas').innerHTML = bloc;
}

    
    function eliminarNota(id) {
        Swal.fire({
            title: "¿Está seguro?",
            text: "No podrá recuperar los datos!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Borrar"
            }).then((result) => {
            let notas = JSON.parse(localStorage.getItem('notas'));
            contactos.splice(id, 1);
            for(let i=0; i<notas.length; i++)
                notas[i].id = i;
            localStorage.setItem('contactos',JSON.stringify(notas));
            if(result.value) {
                Swal.fire({
                          title: "Borrado!", 
                          text: "El contacto fue eliminado.",
                          icon: 'success',
                          showConfirmButton: false,
                          timer: 1500
                          })
                    buscar();
                }
            })
    }

    function actualizarNota(id) {
        let notas = JSON.parse(localStorage.getItem('notas'));
        document.getElementById('tituloModal').value = notas[id].titulo;
        document.getElementById('contenidoModal').value = parseInt(notas[id].contenido);
        document.getElementById('idModal').value = parseInt(id)
    }