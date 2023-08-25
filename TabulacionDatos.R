#Resultados de Sistemas distribuidos

#Se muestran los pods por segundo en un minuto activos para comprobar pruebas de fallos
pods_segundo <- c(5,5,5,5,5,5,5,0,2,2,3,4,5,5,5,5,5,1,4,4,5,5,3,3,4,5,5,3,3,5,5,5,3,3,5,5,5,1,3,3,5,5,5,5,5,2,3,5,5,5,5,5,3,3,5,5,1,2,5,5)

pods_segundo2 <- c(5,5,5,5,0,4,5,5,1,5,5,5,4,5,5,3,5,2,4,4,5,5,5,5,4,5,5,0,3,5,5,5,4,5,5,5,5,0,3,3,5,5,5,5,5,1,4,5,5,5,5,5,2,4,5,5,0,5,5,5)

pods_timeseries <- ts(pods_segundo)
pods_timeseries2 <- ts(pods_segundo2)

plot.ts(pods_timeseries,ylab="Cantidad de pods disponibles",xlab="Tiempo (s)", main="Cantidad de pods disponibles por segundo al eliminar contenedores")

plot.ts(pods_timeseries2,ylab="Cantidad de pods disponibles",xlab="Tiempo (s)", main="Cantidad de pods disponibles por segundo al eliminar contenedores")

#Pruebas de dispinibilidad, tiempo que demora para llegar a los pods estables nuevamente

recuperacion_segundo <- c(5,0,2,2,3,4,5,5,1,4,4,5,5,3,3,4,5,5,3,3,5,5,3,3,5,5,1,3,3,5,5,2,3,5,5,3,3,5,5,1,2,5)

recuperacion_segundo2 <- c(5,0,4,5,5,1,5,5,4,5,5,3,5,5,2,4,4,5,5,4,5,5,0,3,5,5,4,5,5,0,3,3,5,5,1,4,5,5,2,4,5,5,0,5)

rec_timeseries <- ts(recuperacion_segundo)
rec_timeseries2 <- ts(recuperacion_segundo2)

plot.ts(rec_timeseries,ylab="Cantidad de pods disponibles",xlab="Tiempo (s)", main="Pods disponibles a través del tiempo")

plot.ts(rec_timeseries2,ylab="Cantidad de pods disponibles",xlab="Tiempo (s)", main="Pods disponibles a través del tiempo")

#Tiempo de recuperacion a partir de pods disponibles por segundo
tiempos_rec <- c(6,4,4,3,3,4,3,3,3,2)

tiempos_rec2 <- c(3,2,2,2,4,2,3,2,4,3,3,2)


hist(tiempos_rec, main="Tiempo de recuperacion de un servicio a partir de pods disponibles por segundo", ylab="Frecuencia",xlab="Tiempo (s)")
mean(tiempos_rec)

hist(tiempos_rec2, main="Tiempo de recuperacion de un servicio a partir de pods disponibles por segundo", ylab="Frecuencia",xlab="Tiempo (s)")
mean(tiempos_rec2)

#Pruebas de disponibilidad
#Tiempos de solicitud pre eliminacion

tiempos_pre <- c(78,100,75,10,25,70,45,47,23,55,63,72,77,73,44,33,19,71,50,120,13,78,72,80,92,72,32,67,44,110)
hist(tiempos_pre, main="Tiempo de peticion del API antes de la eliminacion del pod", ylab="Frecuencia",xlab="Tiempo (ms)")
mean(tiempos_pre)
#Tiempos post eliminacion
tiempos_post <- c(174,225,180,110,163,190,240,120,98,140,203,180,193,320,175,143,148,176,199,186,146,153,147,165,196,226,93,166,171,229)
hist(tiempos_post, main="Tiempo de peticion del API luego de la eliminacion del pod", ylab="Frecuencia",xlab="Tiempo (ms)")
mean(tiempos_post)