function getParametros(){
    
    fetch("../persistencia/getParametros.php")
        .then((r) => r.json())
        .then((response) => {
            console.log(response);
            const ParamArray = Object.values(response);
            
            
            $("#cocinasinput").attr("placeholder", ParamArray[0]);
            $("#tiempoinput").attr("placeholder", ParamArray[1]);
            $("#stockminimoinput").attr("placeholder", ParamArray[2]);
            $("#stockmaximoinput").attr("placeholder", ParamArray[3]);
            $("#tiempoturnoinput").attr("placeholder", ParamArray[4]);

        })

    
       

}

getParametros();