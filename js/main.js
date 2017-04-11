var Usuarios;
$(function(){
    var tacosDB = firebase.database().ref('/usuarios');
    //para que se actualice la informacion en cuanto algo pase.
    tacosDB.on('value', function(data){
        console.log("value", data.key, data.val());
        var usuarios = data.val();
        $.get("views/_tbTacos.html", function(template)
             {
            $("#rolTable-content").handlebars(template,usuarios);
            Usuarios = usuarios;
        });

    });
    //solo cuando algo cambia.
    //tacosDB.on("child_changed", function(data){
    //    console.log("child_changed",data.key, data.val());
   // });
     $(document).on("click",".avatar", function(){
     var id = $(this).data("id");
     var usuario = $.Enumerable.From(Usuarios).Where(function(el){
         return el.Value.id === id;
     }).FirstOrDefault();
     console.log(usuario);
         $.get("views/Usuario.html", function(template){
             $("#tacoContainer").handlebars(template,usuario.Value);
         });
     navigator.vibrate(100);
 });
});
function nuevoUsuario(userId, nombre, foto, fecha, listo){
    
}
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
    var config = {
        quality: (device.platform !== 'Android') ? 10 : 50,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: (device.platform !== 'Android') ? 150 : 750
    };
    
    $(".tacoContainer>img").on("click",function(){
        getPicture({
            config: config,
            onSuccess: function(imageData) {
                $("#NewImg").attr("src", "data:image/jpeg;base64," + imageData)
            },
            onFail: function(message) {
                alert(message);
            }
        });
    })
    
    function getPicture(d){
    navigator.camera.getPicture(d.onSuccess, d.onFail, d.config);
}
    function onOffline()
    {
        $("#estatus").text("buuu!");
    }
    function onOnline()
    {
        $("#estatus").text("eaaa!");
    }
}


