function getNotif(){
    var notifN = 0;
    fetch("../persistencia/getMenusAReponer.php")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((notif) => {
        if(notifN != NaN && notifN >= 9){
          notifN = "+9";
        }else{
          notifN ++;
        }
       

      });
      if(notifN > 0){
        $("#stockbtn").prepend(`
        <section id="NotificationOP">${notifN}</section>
        `);
    }
    })
}

getNotif();