function generarId(long) {
  let id = "";
  let caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let caracteresLength = caracteres.length;
  for (let i = 0; i < long; i++)
    id += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
  return id;
}

class Nota {
  constructor(titulo, contenido, categoria) {
    this.id = generarId(20);
    this.titulo = titulo;
    this.categoria = categoria;
    this.contenido = contenido;
    this.modificacion = new Date();
  }
}

function agregarCategoria() {
  let category = document.getElementById("nombreCategoria"), categorias = JSON.parse(localStorage.getItem('categorias')) || [];
  if (category.value != "") {
    if (categorias.indexOf(category.value.toUpperCase()) > -1)
    Swal.fire({
      icon: "error",
      title: "La categoria ya existe",
      showConfirmButton: false,
      timer: 1500
    });
    else {
    categorias.push(category.value.toUpperCase());
    Swal.fire({
      title: "Categoría creada",
      text: "Categoría agregada con exito!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    localStorage.setItem("categorias", JSON.stringify(categorias));
    $("#addCategoriaModal").modal("hide");
    $("#addCategoriaModal").on("hidden.bs.modal", function () {
      category.value = "";
    });
    listarCategorias();
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Campos incompletos",
      showConfirmButton: false,
      timer: 1500
    });
  }
}

function eliminarCategoria(id) {
  let categorias = JSON.parse(localStorage.getItem('categorias')), b = true, notas = JSON.parse(localStorage.getItem('notas')) || [];
    for(let j = 0; j < notas.length; j++) {
        let cat = notas[j].categoria;
        if(cat == id) {
            b = false;
            j = notas.length;
        }            
        else if(cat > id)
            notas[j].categoria--;
    }
    if(b){
  Swal.fire({
    title: "¿Está seguro?",
    text: "No podrá recuperar los datos!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#000000",
    confirmButtonColor: "red",
    confirmButtonText: "Borrar"
  }).then(result => {
    if (result.value) {
      Swal.fire({
        title: "Borrado!",
        text: "La categoría fue eliminada.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      categorias.splice(id, 1);
      localStorage.setItem("categorias", JSON.stringify(categorias));
      listarCategorias();
      buscar();
    }
  });
  } else {
    Swal.fire({
      icon: "error",
      title: "La categoria esta siento utilizada no se puede borrar",
      showConfirmButton: false,
      timer: 2000
    });
  }
}

function listarCategorias() {
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  let list ='<h4 class="text-dark border-bottom border-dark pb-2 mt-4">Categoria</h4><div class="form-check"><label class="form-check-label text-dark"><input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios0" value="" onclick="buscar()" checked="">Todas</label></div>';
  if (categorias.length < 1) {
    list += '<button class="btn btn-success mr-3 my-2 my-md-0" style="font-size: 12px;" type="button" data-toggle="modal" data-target="#addCategoriaModal"><i class="fas fa-plus-square mr-2"></i>Agregar Categoria</button>';
  } else {
    for (let i = 0; i < categorias.length; i++)
      list += '<div class="row"><div class="col-8"><div class="form-check"><label class="form-check-label text-dark"><input type="radio" class="form-check-input" name="optionsRadios" onclick="filtrar(' + i + ')" id="optionsRadios' + parseInt(i + 1) + '" value="' + i + '">' + categorias[i] + '</label></div></div><div class="col-2"><button class="btn-sm px-2 py-0 btn btn-danger"  onclick="eliminarCategoria(\'' + i + '\')"><i class="fas fa-times p-0"></i></button></div></div>';
  }
  list += "</div>";
  document.getElementById("listDeCategorias").innerHTML = list;
  mostrarOrdenamiento();
  listarNotas();
}

function agregarNota() {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  let titulo = document.getElementById("tituloModal1");
  let contenido = document.getElementById("contenidoModal1");
  let categoria = document.getElementById("categoriaModal1");
  if (titulo.value != "" && contenido.value != "" && categoria.value > -1) {
    notas.push(new Nota(titulo.value, contenido.value, categoria.value));
    localStorage.setItem("notas", JSON.stringify(notas));
    Swal.fire({
      title: "Nota creada",
      text: "Nota guardado con exito!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    $("#addNotaModal").modal("hide");
    $("#addNotaModal").on("hidden.bs.modal", function () {
      titulo.value = "";
      contenido.value = "";
    });
    listarNotas();
  } else {
    Swal.fire({
      icon: "error",
      title: "Campos incompletos",
      showConfirmButton: false,
      timer: 1500
    });
  }
}

function listarNotas(notas = null) {
  if (!notas) notas = JSON.parse(localStorage.getItem("notas")) || [];
  let bloc = "";
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    if (categorias.length < 1) {
      bloc += '<div class="card text-center my-1 mx-1 border-warning rounded-pill" style="background-image:url(2.png); background-position: center; background-size: 100% auto; background-repeat: no-repeat; max-width: 18rem;"><div class="card-body"><div class="container mb-2"><button type="button" class="btn mr-3 btn-warning animated infinite pulse" data-toggle="modal" data-target="#addCategoriaModal"><i class="fas fa-user-plus mr-3"></i>Agregar Categoria</button></div></div></div>';
  } else {
      if (notas.length < 1) {
        bloc += '<div class="card text-center my-1 mx-1 border-primary rounded-pill" style="background-image:url(2.png); background-position: center; background-size: 100% auto; background-repeat: no-repeat; max-width: 18rem;"><div class="card-body"><div class="container mb-2"><button type="button" class="btn mr-3 btn-primary animated infinite pulse" data-toggle="modal" data-target="#addNotaModal"><i class="fas fa-user-plus mr-3"></i>Agregar Nota</button></div></div></div>';
    } else {
      for (let i = 0; i < notas.length; i++)
        bloc += '<div class="card text-center my-2 mx-2 mr-5 pb-2 mt-5 wow animated swing " style="max-width: 18rem; background-image: url(Notas.jpg); top-center; background-size: cover; background-repeat: no-repeat;"><div class="card-body mt-5 "><h5 class="card-text border-top border-bottom border-dark pt-2"><label class="mr-2" style="font-size: 18px;" for="categoriaNota' + i + '"><i class="fas fa-bookmark mr-2 mb-2"></i>Categoria: </label>' + categorias[notas[i].categoria] +'</h5><h5 class="card-title mt-2 py-2 mb-2" style="font-size: 25px;">' + notas[i].titulo +'</h5><p class="card-text border-top border-bottom border-dark py-1 mb-4" style="font-size: 20px;">' + notas[i].contenido +'</p><div class="container mb-1"><button class="btn btn-outline-primary mr-2" data-toggle="modal" data-target="#editNotaModal" onclick="actualizarNota(\'' + notas[i].id + '\')"><i class="fas fa-user-edit mr-2"></i> Editar </button><button class="btn btn-outline-danger" onclick="eliminarNota(\'' + notas[i].id + '\')"><i class="fas fa-trash-alt mr-2"></i>Eliminar</button></div></div><div class="card-footer text-muted">Última modificación: ' + moment(notas[i].modificacion).fromNow() + "</div></div>";
    }
  }
  document.getElementById("blocDeNotas").innerHTML = bloc;
}

function eliminarNota(id) {
  Swal.fire({
    title: "¿Está seguro?",
    text: "No podrá recuperar los datos!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#000000",
    confirmButtonColor: "red",
    confirmButtonText: "Borrar"
  }).then(result => {
    if (result.value) {
      Swal.fire({
        title: "Borrado!",
        text: "La nota fue eliminada.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      let notas = JSON.parse(localStorage.getItem("notas")),
        i = 0;
      while (notas[i].id != id) i++;
      notas.splice(i, 1);
      localStorage.setItem("notas", JSON.stringify(notas));
      buscar();
    }
  });
}

function actualizarNota(id) {
  let notas = JSON.parse(localStorage.getItem("notas")),
    i = 0;
  while (notas[i].id != id) i++;
  let nota = notas[i];
  $("#editNotaModal").on("show.bs.modal", function () {
    let categorias = JSON.parse(localStorage.getItem("categorias")) || [],
      opciones = "<option>Seleccione una Categoría</option>;";
    for (let j = 0; j < categorias.length; j++) {
      let select = "";
      if (nota.categoria == j) select = ' selected=""';
      opciones += '<option class="text-capitalize" ' + select + 'value="' + j + '">' +categorias[j] + "</option>;";
    }
    document.getElementById("tituloModal").value = nota.titulo;
    document.getElementById("contenidoModal").value = nota.contenido;
    document.getElementById("categoriaModal").innerHTML = opciones;
    document.getElementById("idModal").value = id;
  });
}

function editarNota() {
  let titulo = document.getElementById("tituloModal");
  let contenido = document.getElementById("contenidoModal");
  let categoria = document.getElementById("categoriaModal");
  let id = document.getElementById("idModal").value;
  if (titulo.value != "" && contenido.value != "" && categoria.value > -1) {
    let notas = JSON.parse(localStorage.getItem("notas")),
      i = 0;
    while (notas[i].id != id) i++;
    notas[i].titulo = titulo.value;
    notas[i].contenido = contenido.value;
    notas[i].categoria = categoria.value;
    notas[i].modificacion = new Date();
    localStorage.setItem("notas", JSON.stringify(notas));
    listarNotas();
    Swal.fire({
      title: "Notas Actualizado",
      text: "Notas modificado con exito!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    $("#editNotaModal").modal("hide");
  } else {
    Swal.fire({
      icon: "error",
      title: "Campos incompletos",
      showConfirmButton: false,
      timer: 1500
    });
  }
}

function buscar() {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  let search = document.getElementById("Buscar").value.toLowerCase();
  if (event.type == "submit") event.preventDefault();
  let resultado = [];
  if (notas && search) {
    for (let i = 0; i < notas.length; i++)
      if (notas[i].titulo.toLowerCase().includes(search) || notas[i].contenido.toLowerCase().includes(search))
        resultado.push(notas[i]);
    if (resultado.length > 0) {
      listarNotas(resultado);
    } else {
      Swal.fire({
        icon: "error",
        title: "No se encontró"
      });
      cancelar();
    }
  } else {
    listarNotas();
  }
}

function cancelar() {
  document.getElementById("Buscar").value = "";
  listarNotas();
}

function filtrar(categoria) { 
  let notas = JSON.parse(localStorage.getItem('notas')).filter(nota => nota.categoria == categoria) || [];
  mostrarOrdenamiento();
  listarNotas(notas);
}

function ordenar(campo) {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  let checked = -1;
  if (notas.length > 1) {
    for (let i = 0; i < notas.length; i++) {
      let actual = notas[i],
        j = 0;
      if (campo == "Titulo") {
        for (j = i; j > 0 && notas[j - 1].titulo > actual.titulo; j--)
          notas[j] = notas[j - 1];
        notas[j] = actual;
      } else if (campo == "Modificacion") {
        for (j = i; j > 0 && notas[j - 1].modificacion < actual.modificacion; j--)
          notas[j] = notas[j - 1];
          notas[j] = actual;
      }
    }
    if (campo == "Titulo") 
      checked = 0;
    else if (campo == "Modificacion") 
      checked = 1;
    localStorage.setItem("notas", JSON.stringify(notas));
    listarCategorias();
    mostrarOrdenamiento(checked);
    listarNotas();
  }
}

function mostrarOrdenamiento(checked = -1) {
  let lista ='<div class="custom-control custom-radio border-top border-dark pt-2"><input type="radio" id="customRadio9" name="customRadio" class="custom-control-input" onclick="ordenar(\'Titulo\')"';
  if (checked == 0) lista += ' checked=""';
  lista += '><label class="custom-control-label text-dark" for="customRadio9">Título</label></div><div class="custom-control custom-radio"><input type="radio" id="customRadio10" name="customRadio" class="custom-control-input" onclick="ordenar(\'Modificacion\')"';
  if (checked == 1) lista += ' checked=""';
  lista += '"><label class="custom-control-label text-dark" for="customRadio10">Modificación</label></div>'; 
    document.getElementById("seccionOrdenamiento").innerHTML = lista;
}

$("#addNotaModal").on("shown.bs.modal", function () {
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [],
    opciones = "";
  if (categorias.length < 1) {
    Swal.fire({
      icon: "error",
      title: "Primero debe crear una categoría",
      showConfirmButton: false,
      timer: 2000
    });
    $("#addNotaModal").modal("hide");
    listarNotas();
    $("#addCategoriaModal").modal("show");
  } else {
    opciones = '<option selected="">Seleccione una Categoría</option>;';
    for (let i = 0; i < categorias.length; i++)
      opciones += '<option class="text-capitalize" value="' + i + '">' + categorias[i] + "</option>;";
    document.getElementById("categoriaModal1").innerHTML = opciones;
  }
});
listarCategorias();
listarNotas();
