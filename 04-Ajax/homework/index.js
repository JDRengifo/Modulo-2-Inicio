

const URL_AMIGOS = "http://localhost:5000/amigos";
const listaAmigos = document.querySelector("#lista");

const funcionInterna1 = (amigo)=>{
  amigo.forEach(amistad => {
    const li = document.createElement("li");
    li.innerHTML = amistad.name;
    listaAmigos.appendChild(li)
  })
};
  
const funcionInterna2 = (amigo)=>{
  const idAmigo = $('#input').val();
  for(let i= 0; i<amigo.length; i++){
    if(amigo[i].id == idAmigo){
      $('#amigo').text(amigo[i].name)
      console.log(amigo[i])
      console.log(amigo[i].id)
      console.log(i)

    }
  }
};
      
const funcionInterna3 = (amigo)=>{
  const idAmigo = $('#inputDelete').val();
  for(let i= 0; i<amigo.length; i++){
    if(amigo[i].id == idAmigo){
      $.ajax({
        url: `http://localhost:5000/amigos/${idAmigo}`,
        type: 'DELETE',
         success: () => {
          funcionBoton1();
         $('#success').text(`Tu ex-amigo ${amigo[i].name} ha sido eliminado`)
         }
      })
    }
  }
};
              
const funcionBoton1 = function(){
    document.querySelector("img").style.display = "none";
    $('#lista li').remove();
    $.get(URL_AMIGOS, funcionInterna1 )};
                
const funcionBoton2 = function(){
  $.get(URL_AMIGOS, funcionInterna2)};
                  
const funcionBoton3 = function(){
  $.get(URL_AMIGOS, funcionInterna3)};
                    
$('#boton').click(funcionBoton1);
                    
$('#search').click(funcionBoton2)
                    
$('#delete').click(funcionBoton3)
    