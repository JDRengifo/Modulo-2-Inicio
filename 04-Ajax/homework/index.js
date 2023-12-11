
$('#boton').click(function(){
  $('#lista li').remove();
    $.get("http://localhost:5000/amigos", (amigo)=>{
        const listaAmigos = document.querySelector("#lista")
        amigo.forEach(amistad => {
          const li = document.createElement("li");
          li.innerHTML = amistad.name;
          listaAmigos.appendChild(li)
      });
    })
  });

$('#search').click(function(){
  const idAmigo = $('#input').val();
  console.log(idAmigo)
  $.get("http://localhost:5000/amigos", (amigo)=>{
    const listaAmigos = document.querySelector("#lista")
    for(let i= 0; i<amigo.length; i++){
         if(amigo[i].id == idAmigo){
            $('#amigo').text(amigo[i].name)
      }
    }
  })
})

$('#delete').click(function(){
   const idAmigo = $('#inputDelete').val();
  $.get("http://localhost:5000/amigos", (amigo)=>{
    const listaAmigos = document.querySelector("#lista")
    for(let i= 0; i<amigo.length; i++){
      if(amigo[i].id == idAmigo){
         $.ajax({
          url: `http://localhost:5000/amigos/${idAmigo}`,
          type: 'DELETE',
          success: () => {
            $('#success').text(`Tu ex-amigo ${amigo[i].name} ha sido eliminado`)
          }
        })
       }
     }
   })
})
    
    // let indice = amigo.findIndex(function(persona) {
    //   return persona.id === idAmigo;
    // });
    
    
  // console.log(amigo[id].nombre)
  // const amigoAEliminar = `http://localhost:5000/amigos/${idAmigo}`,
  // console.log(amigoAEliminar)


  
  //   $.ajax({
    //     type:'DELETE',
    //     success: (){
      //     $('#success').text(`${amistad[idAmigo]} ha sido eliminado de la lista`)
      //   }