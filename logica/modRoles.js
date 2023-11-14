fetch("../persistencia/getUsers.php")
  .then((r) => r.json())
  .then(async (users) => {
    let tabla = "<table> <tr> <th>Id</th> <th>Nombre</th> <th>Mail</th> <th>Rol</th> </tr>";
    for (const user of users) {
      tabla += `<tr><td>#${user.IDUser}</td><td>${user.Nombre}</td><td>${user.Mail}</td><td>${await rolesSelect(user)}</td></tr>`;
    }
    tabla += "</table>";
    $("#tabla").html(tabla);

    $("select.user-role").change(changeRol);
  });

const roles = ["gerente", "admin", "NULL", "jefe", "CService"];
async function rolesSelect(user) {
  const rol = user.Rol;
  let select = `<select class="user-role" data-user-id="${user.IDUser}">`;

  for (const role of roles) {
    select += `<option value="${role}" ${role === rol ? "selected" : ""}>${role}</option>`;
  }

  select += "</select>";

  return select;
}

function changeRol() {
  const selectedRole = $(this).val();
  const userId = $(this).data("user-id");
  const datos = new FormData();
  datos.append("rol", selectedRole);
  datos.append("id", userId);

  fetch("../persistencia/updateRol.php", {
    method: "post",
    body: datos,
  })
    .then((r) => r.text())
    .then((r) => {
    });
}
