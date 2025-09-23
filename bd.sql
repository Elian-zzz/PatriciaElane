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
select id_cliente,nombre,referencia,direccion,contacto from cliente where nombre like "el%" ;
#agregar un cliente
insert into cliente(nombre,referencia,direccion,contacto) values("Siro","Gutierrez","Gral Leandro Gomez 3843 casa de ladrillos","sirogurierrez@gmail.com");
#eliminar un cliente
delete from cliente where id_cliente =1;
# contar cantidad de clientes:
select count(*) from cliente;

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
# consultar tabla pedido
select id_pedido,id_cliente, tipo, descripcion,remuneracion, inicio,final from pedido;
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
