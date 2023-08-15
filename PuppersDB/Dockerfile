FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=PuppersDB
COPY DogWalker-DB.sql /docker-entrypoint-initdb.d/
COPY DogWaler-Script.sql /docker-entrypoint-initdb.d/
