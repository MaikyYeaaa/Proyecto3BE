
var intentos = 5;


$(document).ready(function() {
    $("#form-contra").submit(function(event) {
        event.preventDefault();
            getDatos();
        }
    )
}
)




function getDatos(){

    let contrasenaActual = $("#cont").val();
    let contrasenaNueva = $("#newCont").val();
    let contrasenaNuevaVer = $("#newCont2").val();

    fetch("../persistencia/userInstance.json")
    .then((u) => u.json())
    .then((u) => {
        var usuario = Object.values(u);
        var userID=usuario[0].Index;
        console.log(usuario[0].Index);
        fetch("../logica/getUserData.php")
        .then((r) => r.json())
        .then((r) => {
            const usuarios = Object.values(r);

                if (usuarios[userID] && contrasenaActual === usuarios[userID].contrasena) {
                    if(validatePassword(contrasenaNueva,contrasenaNuevaVer)){
                        if( /[A-Z]/.test(contrasenaNueva) && /[a-z]/.test(contrasenaNueva) && /[\d]/.test(contrasenaNueva)){
                            $("#feedback").html("Contraseña actualizada!");
                        $.ajax({
                            url: "../logica/cambioContra.php", // Update the URL to the correct PHP file
                            type: "POST",
                            data: { id: userID, newCont: contrasenaNueva},
                        });
                        }else{
                            $("#feedback").html("La contraseña no es segura");
                        }
                        
                    }else{
                        $("#feedback").html("Las contraseñas no coinciden");
                    }


                  } else {
                    intentos --;
                    $("#feedback").html("CONTRASEÑA ERRONEA te quedan " + intentos + " intento/s");
                    if(intentos <= 0){
                        $("#feedback").html("realiza el captcha");
                        $("#btn").prop("disabled", true);

                    }
                  }
           


            
              })
    })




    



}

function validatePassword(contra,contraRepit){
  let contrasenaVerif = false;
  let contrasenaSecure = false;

  if (contra === contraRepit) {
    console.log(contra +" "+ contraRepit)
    return true;
  }else{
    return false;
  }
}

