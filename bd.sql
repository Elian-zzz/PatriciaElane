#create database DB_Pato;
use DB_Pato;
#tabla cliente
create table cliente (
    id_cliente int auto_increment key,
    nombre varchar(30) not null,
    referencia varchar(25) not null, # puede ser tanto el apellido como una referencia ej: de las cortinas
    direccion varchar(50) not null,
    contacto varchar(50) not null # puede ser tanto un numero de telefono, celular como  un correo
);
#consulta tabla cliente
select * from cliente;
#agregar un cliente
insert into cliente(nombre,referencia,direccion,contacto) values("Siro","Gutierrez","Gral Leandro Gomez 3843 casa de ladrillos","sirogurierrez@gmail.com");
#eliminar un cliente
delete from cliente where id_cliente =1;

# tabla pedido
create table pedido(
id_pedido int auto_increment key,
id_cliente int not null,
tipo enum("arreglo","hacer"), # arreglar algo hecho / hacer desde cero
descripcion varchar(90) not null,
remuneracion int not null,
inicio date not null,
final date not null,
foreign key (id_cliente) references cliente(id_cliente)
);
delete from pedido where id_pedido > 0;
select * from estadoPedido;

# consultar tabla pedido
select * from pedido;
# ingresar un pedido
insert into pedido(id_cliente, tipo, descripcion,remuneracion, inicio,final) values(2,"arreglo","hacer dos dobladillos en los puños del pantalón", 250,curdate(),"2025-09-24");
# eliminar un pedido
delete from pedido where id_pedido=2;
# buscar cliente por id:
select * from cliente where id_cliente = 2;
# buscar pedido por id:
select * from pedido where id_pedido = 3;
# obtener todos los nombres e IDs de los clientes por aproximaxión de nombre:
select id_cliente,nombre from cliente where nombre like "eli%";
# obtener todos los pedido hechos por el id de un cliente
# select id_pedido,id_cliente, tipo, descripcion,remuneracion,inicio,final from pedido where id_cliente = 2;
select id_pedido,id_cliente, tipo, descripcion,remuneracion,final from pedido where id_cliente = 2;
# obtener los datos formateados de la tabla pedido con nombre del cliente
SELECT pedido.id_pedido, pedido.id_cliente, cliente.nombre AS nombre_cliente, pedido.tipo, pedido.descripcion, pedido.remuneracion,
        DATE_FORMAT(pedido.inicio, '%Y-%m-%d') AS inicio,
        DATE_FORMAT(pedido.final, '%Y-%m-%d') AS final
       FROM pedido
       JOIN cliente ON pedido.id_cliente = cliente.id_cliente 
       ;
# buscar pedido por cliente y fecha       
select pedido.id_pedido, pedido.id_cliente, cliente.nombre AS nombre_cliente, pedido.tipo, pedido.descripcion, pedido.remuneracion,
        DATE_FORMAT(pedido.inicio, '%Y-%m-%d') AS inicio,
        DATE_FORMAT(pedido.final, '%Y-%m-%d') AS final
       FROM pedido
       JOIN cliente ON pedido.id_cliente = cliente.id_cliente where inicio = "2025-09-22" and cliente.nombre like "eli%";     
       
# tabla estado del pedido
create table estadoPedido(
id_pedido int key,
estado enum("pendiente","concretado") default "pendiente",
foreign key (id_pedido) references pedido(id_pedido)
);
# la anterior tabla recibe un id por pedido y tiene un estado, la fila deberá de editarse "UPDATE" para que no existan dos id_pedido iguales
select * from estadoPedido;

#ingresar el estado de un pedido
insert into estadoPedido(id_pedido) values(9);
# cambiar estado del pedido
update estadoPedido set estado = "concretado" where id_pedido = 3;
# consulta todos los datos de el pedido y de el cliente + el estado del pedido
SELECT
  pedido.id_cliente,
  cliente.nombre AS nombre_cliente,
  pedido.id_pedido,
  pedido.tipo,
  pedido.descripcion,
  pedido.remuneracion,
  DATE_FORMAT(pedido.inicio, '%Y-%m-%d') AS inicio,
  DATE_FORMAT(pedido.final, '%Y-%m-%d') AS final,
  estadoPedido.estado
FROM pedido
JOIN cliente ON pedido.id_cliente = cliente.id_cliente
JOIN estadoPedido ON pedido.id_pedido = estadoPedido.id_pedido where estado = "pendiente" limit 15;

# id_cliente, nombre_cliente, id_pedido,tipo,descripcion,remuneracion,inicio,final,estado

# obtiene solo el nombre de los clientes
select nombre,referencia from cliente where nombre like "elian";
