use `dogwalker-db`;

insert into franjaHoraria (start_minute,end_minute, convertido)
values
	(420,480,'7:00-8:00'),
    (480,540,'8:00-9:00'),
    (540,600,'9:00-10:00'),
    (600,660,'10:00-11:00'),
    (660,720,'11:00-12:00'),
    (720,780,'12:00-13:00'),
    (780,840,'13:00-14:00'),
    (840,900,'14:00-15:00'),
    (900,960,'15:00-16:00'),
    (960,1020,'16:00-17:00'),
    (1020,1080,'17:00-18:00'),
    (1080,1140,'18:00-19:00'),
    (1140,1200,'19:00-20:00')
    ;

insert into area (area_name)
values
	('Ceibos'),
    ('Samborondón'),
    ('Vía a la Costa')
    ;

INSERT INTO location (location_name, area_id)
values 
	('Puerto Azul',3),
    ('Villas del Bosque',3),
    ('Costal Mar II',3),
    ('Palma Mayorca',2),
    ('Santa María 3',2),
    ('Tenis Club',2),
    ('El Río',2),
    ('Paz',2),
    ('Mocolí Golf Club',2),
    ('Isla Sol',2),
    ('Laguna del Sol',2),
    ('Lago Sol',2),
    ('Vista al Parque',2),
	('Ceibos',1)
        ;
        
INSERT INTO clientes (client_name,client_ID, start_date,client_user, client_password, client_salt ,client_tel, location_id)
VALUES
	('Maria Cristina Lila','0994336000',"2023-02-07",'marlil','0b3327847df7ee3db2535cf0dd65e72b03b242878d15f8e43c78f44eed2e88fe','09943360000994336000','0994336000', 1),
    ('Piedad Mupi','0904821089',"2023-05-02",'piemup','067cd60b236d94730f6639106d9e975f077d94246ca597b0da14ae006444a8e5','09048210890904821089','0998595854', 1), -- 1
    ('Giovanna Guarna','1714505219',"2020-05-19",'giogua','ebcf83899c5b91ba40e1e4ad80101eb1ed16d623909e575c55d19ad3eed65b95','17145052191714505219','0998824124', 1), --
    ('Nikki Mackliff','0918009580',"2020-05-19",'nikmac','36516940526a3795ab8a6a7efbe8a606e28b560e369dc570cb537406eb9f67a1','09180095800918009580','0994602847', 1), --
--    ('Ali Sabi','0994468796',"2021-03-11",'alisab','2089464c0ae9b0b0f04964ce8145d5441ddd57ed2dfebcba7b40b7c2803d682a','09944687960994468796','0994468796',1),
--    ('Andrea Rodriguez','0995078954',"2023-02-27",'androd','32da4cfa6110330b6f8827a6f7e4c6fc974e2c0e2148e7902a9e625f8017f935','09950789540995078954','0995078954', 2),
    ('Luli Salvatierra','0915290837',"2022-01-29",'lulsal','e4dd144446cdea1e29e357226c7bff08dc6e53f3ca53ee664ef400fee93a22ae','09152908370915290837','0999778855', 1), -- 
--    ('Betzi Jaramillo','0994862899',"2023-04-24",'betjar','f6643af414a78fd015243a788f2dca17064a1eb1d91c81be64c114281217a15f','09948628990994862899','0994862899', 3),
    ('Franchesca Achi','0922105507',"2019-04-24",'fraach','afbc3f216b2727d3565365d7c716ff26a01f453eb7e9ee309efbc7468fc5cf60','09221055070922105507','0997203019', 4), -- 
    ('Irene Robles','0908604796',"2020-03-20",'irerob','6accda698f78860b95fb87b7df116acea4728b5d616c7bf60bc404976b839f2e','09086047960908604796','0999517857', 5), -- 
  --  ('Nathalie Carmigniani','0991349192',"2019-10-29",'natcar','c9e13a2a40e55f24e30af4cfc6e4f4ec616d48c5215f43a9da7d85a0d5704043','09913491920991349192','0991349192', 6),
    ('Alejandro Pere','0905028924',"2020-08-17",'aleper','3321894ddeeec622fafbd6424c8354b2d21170db74d38feacd65c55093383ad2','09050289240905028924','0999503107', 7), --
    ('Ana Cecilia Alvarado','0905014115',"2022-02-11",'anaalv','eab1b8eded97fabf6e0ebb8f1e8833bb3dbeb4c3c3a88b4fbf7067435a5911e8','09050141150905014115','13052053870', 8), -- 1
    ('Laurise Achi','0997203018',"2022-03-31",'lauach','58ba3f88080c1f5e72296e491cc0d2b28f6befe986b378dcf74b9d968262509a','09972030180997203018','0997203018', 9),
 --   ('Maria Paula Herrera','0969984102',"2019-09-05",'marher','a6f6787d4c1d8abcaf0c22d07b72c3dc9c3100ce1451d8f14638e8cc756c6809','09699841020969984102','0969984102', 10),
    ('Daniela Martinez','0912975141',"2019-07-03",'danmar','4417d48d5cd00432e1104d4834bbcec391931b02d8e29c34c56be2fd1f50c547','09129751410912975141','0999421190', 11), -- 1
 --   ('Helen Vanegas','0999400004',"2023-05-10",'helvan','eb573163d735b624c9acce27cf75431b87d03d68ccace683675d8fa3d8ac48a3','09994000040999400004','0999400004', 12),
 --   ('Luciana Arosemena','0968464426',"2023-05-24",'lucaro','08e055a4e240bf838a45b27a006340f6d8f8e0b4e44332875a51220791195ca5','09684644260968464426','0968464426', 13),
    ('Jorge Porras','0705403145',"2023-01-24",'jorpor','b2b336de8b280a24e25d3bcdd2be7ce65165901412acdffca922dfe4aa75b30f','07054031450705403145','0979921398', 14) -- sin perro
    ;
   -- ('nombre',"2023-12-31",'username','password','tel', 'lugar', 'area');

INSERT INTO paseadores (walker_name, walker_ID, start_date,walker_user, walker_password, walker_salt,walker_tel,walker_address, walker_linkaddress,walker_photoURL, walker_bloodtype)
VALUES
    ('Dave Bone','0927364109',"2019-06-24",'davbon','73f3626f69140a34765fa27b20937a78b8412f986c35fe2f0749f410d186a8f2','09273641090927364109','0991635260','','','',''),
    ('Isaias Quispe','0956588776',"2023-06-28",'isaqui','db4bbb53d8a8d9a297ad5b2dece3897bcbb725d83893dcdb0f24c5d5471c9ecc','09565887760956588776','0983526424','','','',''),
    ('Bryan Velasco','0952063576',"2023-05-30",'bryvel','7d95921b119865bebf4c14307878c5d27c10d1aa61c6b9eedba73b90d0ff36e5','09520635760952063576','0978920812','','','',''),
    ('No Asignado','0000000000', '2023-06-24','empty','','empty','0000000000','','','','');  #paseador para no tener que borrar perro
  --  ('nombre', 'walker_id',"2023-12-31",'username','password','salt','telf', 'address', 'address link', 'photourl', 'bloodtype');
    
INSERT INTO mascotas (client_ID, pet_name, service, pet_breed)  -- renovation date missing
VALUES
	('0994336000',"Leia",'5P',"Pastor Aleman"),
    ('0904821089',"Emma",'3P',"Golden Retriever"),
    ('1714505219',"Saki",'5P',"Chihuahua"),
    ('1714505219',"Tiago",'5P',"Chihuahua"),
    ('1714505219',"Niko",'5P',"Chihuahua"),
    ('0994602847',"Lali",'3P',"Chihuahua"),
    ('0994602847',"Emilia",'3P',"Chihuahua"),
    ('0994602847',"Tiaga",'3P',"Chihuahua"),
    ('0994602847',"Dolce",'3P',"Chihuahua"),
 --   ('0994468796',"Sabi",'3P',"Ridgeback rhodesian"),
--    ('0995078954',"Oreo",'5P',"Weimeraner"),
    ('0915290837',"Rocky",'5P',"Labrador"),
--    ('0994862899',"Lanoso",'5P',"Husky"),
    ('0997203019',"Lulo",'5P',"Labrador"),
   -- ('0991349192',"Anzo",'5P',"Weimeraner"),
   -- ('0991349192',"Millie",'5P',"Labrador"),
    ('0905028924',"Figo",'5P',"Standford Terrier"),
    ('0905014115',"Ecco",'5P',"Mixed"),
    ('0997203018',"Harry",'5P',"Sheltie"),
    ('0912975141',"Coco",'3P',"Beagle"),
    ('0908604796',"Coby","5P","Mixed"),
    ("0705403145","Max","5P","Pitbull"),
    ("0705403145","Mia","5P","Pitbull");
  --  ('0999400004',"Mali",'5P',"Pastor Belga"),
   -- ('0999400004',"Noa",'5P',"Pastor Belga"),
   -- ('0999400004',"Yuca",'5P',"Weimeraner"),
   -- ('0999400004',"Nala",'5P',"Weimeraner");
 --   ('0968464426',"Nala",'3P',"Border Collie");
 --   ('client ID',"name", "3P-5P", raza");

insert into servicio (pet_token,walker_ID,franja_ID)
	values
    (1,'0927364109',1),
    (2,'0927364109',1),
    (3,'0927364109',1),
    (4,'0927364109',1),
    (5,'0927364109',1),
    (6,'0927364109',1),
    (7,'0927364109',1),
    (8,'0927364109',1),
    (9,'0927364109',1),
    (10,'0956588776',1),
    (11,'0956588776',1),
    (12,'0952063576',1),
    (13,'0956588776',1),
    (14,'0956588776',1),
    (15,'0956588776',1),
    (18,'0956588776',1),
    (16,'0956588776',1),
    (17,'0956588776',1);

#insert into paseo (pet_token,walker_ID,servicio_ID,start_date,end_date,evidenceURL)
#	values
#    (),
#    ();

INSERT INTO admin (admin_username, admin_password, admin_salt)
	values
    ("admin","276fadfc9edc49f5f9af96d97636731def7525d4bfa16bc07699534873a474cc","01234567890123456789"),
    ("ricardoadmin","6ed23cf3464d9b2ac0d04608e6edf577a83cd0de3ab02fd27dbbc3743223fefe","131183485500113118");
    -- salt= 131183485500113118
    -- adminpassword