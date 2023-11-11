CREATE TABLE sucursal (
  IDSucursal INT(8) PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(20) UNIQUE,
  Direccion VARCHAR(40) NOT NULL,
  TiempoTurno INT(2) NOT NULL,
  Cocinas INT(2) NOT NULL
);

CREATE TABLE TipoMenu (
NombreTipoMenu VarChar(30),
PRIMARY KEY (TipoMenu)
)

CREATE TABLE reclamo (
  NReclamo INT(8) PRIMARY KEY AUTO_INCREMENT,
  DescripcionReclamo VARCHAR(500) NOT NULL,
 Resuelto BOOLEAN NOT NULL
);

CREATE TABLE RazonReclamo (
  NombreRazon VARCHAR(50) PRIMARY KEY
);

CREATE TABLE Vianda (
  NroVianda INT(8) PRIMARY KEY AUTO_INCREMENT,
  FechaVencimiento datetime NOT NULL
);

CREATE TABLE condicion (
  NombreCondicion VARCHAR(20) PRIMARY KEY
);

CREATE TABLE pago (
  IdPago INT(8) PRIMARY KEY AUTO_INCREMENT,
  Monto INT(8) NOT NULL,
  TipoPago VARCHAR(15) NOT NULL
);

CREATE TABLE estado (
  NombreEstado VARCHAR(20) PRIMARY KEY
);

CREATE TABLE pedido (
  ID INT(8) PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE comida (
  IDComida INT(8) PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(20) NOT NULL,
  Descripcion VARCHAR(30) NOT NULL,
  ImagenURL VARCHAR(200) NOT NULL,
  TiempoCocinado INT(2) NOT NULL
);

CREATE TABLE dieta (
  IDDieta INT(2) PRIMARY KEY AUTO_INCREMENT,
  Tipodieta VARCHAR(15) UNIQUE
);

CREATE TABLE publicacion (
  IDPublicacion INT(8) PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(15) NOT NULL,
  FotoURL VARCHAR(200) NOT NULL,
  Descripcion VARCHAR(30) NOT NULL
);

CREATE TABLE menu (
  IDMenu INT(8) PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(20) NOT NULL,
  MenuIMG VARCHAR(300) NOT NULL,
  MenuDescripcion VARCHAR(150) NOT NULL,
  Precio INT(8) NOT NULL,
  StockMaximo INT(2) NOT NULL,
  StockColchon INT(2) NOT NULL,
  StockReal INT(2) NOT NULL,
  FechaVencimiento datetime NOT NULL,
  Descuento float,
);

CREATE TABLE usuario (
  IDUser INT(8) PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(20) NOT NULL,
  Contrasena VARCHAR(20) NOT NULL,
  Rol VARCHAR(10) NOT NULL,
  Mail VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE cliente (
  Nro INT(8) PRIMARY KEY AUTO_INCREMENT,
  Mail VARCHAR(30) NOT NULL UNIQUE,
  Autorizado VARCHAR(7) NOT NULL,
  Dir VARCHAR(30) NOT NULL,
  Telefono INT(8)
);

CREATE TABLE web (
  Nro INT(8) PRIMARY KEY,
  CI INT(8) UNIQUE,
  Nombre VARCHAR(15) NOT NULL,
  Apellido VARCHAR(15)
);

CREATE TABLE empresa (
  Nro INT(8) PRIMARY KEY,
  Rut VARCHAR(9) UNIQUE,
  Nombre VARCHAR(20) NOT NULL
);




CREATE TABLE Implica (
  NroVianda INT(8),
  IDMenu INT(8),
  PRIMARY KEY (NroVianda),
  FOREIGN KEY (NroVianda) REFERENCES Vianda(NroVianda),
  FOREIGN KEY (IDMenu) REFERENCES menu(IDMenu),
  FOREIGN KEY (IDMenu) REFERENCES menu(IDMenu)
);

CREATE TABLE posee (
  NroVianda INT(8),
  NombreCondicion INT(8),
  FechaComienzo datetime ,
  FechaFin datetime ,
  PRIMARY KEY (NroVianda),
  FOREIGN KEY (NroVianda) REFERENCES Vianda(NroVianda),
  FOREIGN KEY (NombreCondicion) REFERENCES condicion(NombreCondicion)
);

CREATE TABLE realiza (
  NReclamo INT(8),
  Nro INT(8),
  PRIMARY KEY (NReclamo),
  FOREIGN KEY (NReclamo) REFERENCES reclamo(NReclamo),
  FOREIGN KEY (Nro) REFERENCES cliente(Nro)
);

CREATE TABLE incorpora (
  NReclamo INT(8),
  NombreRazon VARCHAR(50),
  PRIMARY KEY (NReclamo),
  FOREIGN KEY (NReclamo) REFERENCES reclamo(NReclamo),
  FOREIGN KEY (NombreRazon) REFERENCES RazonReclamo(NombreRazon)
);

CREATE TABLE integra (
  IDComida INT(8),
  IDMenu INT(8),
  PRIMARY KEY (IDComida, IDMenu),
  FOREIGN KEY (IDComida) REFERENCES comida(IDComida),
  FOREIGN KEY (IDMenu) REFERENCES menu(IDMenu)
);

CREATE TABLE corresponde (
  IDDieta INT(2),
  IDPublicacion INT(8),
  PRIMARY KEY (IDDieta, IDPublicacion),
  FOREIGN KEY (IDDieta) REFERENCES dieta(IDDieta),
  FOREIGN KEY (IDPublicacion) REFERENCES publicacion(IDPublicacion)
);

CREATE TABLE pertenece (
  IDComida INT(8),
  IDDieta INT(2),
  PRIMARY KEY (IDComida, IDDieta),
  FOREIGN KEY (IDComida) REFERENCES comida(IDComida),
  FOREIGN KEY (IDDieta) REFERENCES dieta(IDDieta)
);

CREATE TABLE conforma (
  ID INT(8),
  NroVianda INT(8),
  PRIMARY KEY (ID, NroVianda),
  FOREIGN KEY (ID) REFERENCES pedido(ID),
  FOREIGN KEY (NroVianda) REFERENCES Vianda(NroVianda)
);



CREATE TABLE incluye (
  IDPublicacion INT(8),
  IDMenu INT(8),
  PRIMARY KEY (IDPublicacion),
  FOREIGN KEY (IDPublicacion) REFERENCES publicacion(IDPublicacion),
  FOREIGN KEY (IDMenu) REFERENCES menu(IDMenu)
);

CREATE TABLE tiene (
  ID INT(8),
  NombreEstado VARCHAR(20),
  FechaInicio datetime NOT NULL,
  FechaFin datetime ,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID) REFERENCES pedido(ID),
  FOREIGN KEY (NombreEstado) REFERENCES estado(NombreEstado)
);

CREATE TABLE llega (
  ID INT(8),
  IDSucursal INT(8),
  PRIMARY KEY(ID),
  FOREIGN KEY (ID) REFERENCES pedido(ID),
  FOREIGN KEY (IDSucursal) REFERENCES sucursal(IDSucursal)
);

CREATE TABLE pide (
  ID INT(8),
  Nro INT(8),
  Fecha datetime NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID) REFERENCES pedido(ID),
  FOREIGN KEY (Nro) REFERENCES cliente(Nro)
);

CREATE TABLE contiene (
  ID INT(8),
  IDPago INT(8),
  PRIMARY KEY (ID),
  FOREIGN KEY (ID) REFERENCES pedido(ID),
  FOREIGN KEY (IDPago) REFERENCES pago(IdPago)
);

CREATE TABLE Asocia (
  ID_menu INT(8),
  NombreTipoMenu VARCHAR(30),
  PRIMARY KEY (ID_menu),
  FOREIGN KEY (ID_menu) REFERENCES menu(IDMenu),
  FOREIGN KEY (NombreTipoMenu) REFERENCES TipoMenu(NombreTipoMenu)
);
