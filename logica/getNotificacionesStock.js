function getNotif(){
    var notifN = 0;
    fetch("../persistencia/getMenusAReponer.php")
    .then((response) => response.json())
    .then((data) => {
      console.log("Holanda");
      data.forEach((notif) => {
        notifN ++;

      });
      $("#stockbtn").prepend(`
        <section id="NotificationOP">${notifN}</section>
        `);
        console.log(notifN);
    })
}

getNotif();