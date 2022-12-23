# Server

[Express Typescript](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
[Sequelize](https://sequelize.org/docs/v6/getting-started/)

# EEzy Flight Computer

# To Do

- NODE ROUTES

- Map fertig
- METAR departure / destination -> Warnings / CAVOK
- Wind
- Fuel
- Airports (lat long)
- WARNING EXCEED FUEL CAPACITY
- WARNING EDUCATIONAL PURPOSE ONLY

- TABLE FOR CUSTOM AIRCRAFT
- LOGIN

## Formular

- [**Autocomplete**](https://mui.com/material-ui/react-autocomplete/)

## Docker

[Link](https://migueldoctor.medium.com/run-mysql-phpmyadmin-locally-in-3-steps-using-docker-74eb735fa1fc)

### MYSQL

docker run --name eezy-db -e MYSQL_ROOT_PASSWORD=KtorLDelta1 -d mysql:latest

// docker run --name=eezy-db -e MYSQL_ROOT_HOST=% -e MYSQL_ROOT_PASSWORD=KtorLDelta1 -p 3306:3306 -d mysql:latest

### PHPmyadmin

docker run --name eezy-phpmyadmin -d --link eezy-db:db -p 8081:80 phpmyadmin/phpmyadmin

### DATABASE

eezy

#### TABLE

1: aircraft

1. id AUTO_INCREMENT
2. manufacturer VARCHAR
3. model VARCHAR
4. fuel type VARCHAR | AVGAS | JETFUEL | DIESEL | SUPER
5. fuel capacity LITERS
6. cruise speed (KTS at 75% power) -> kts = 0.54 \* kph
7. cruise fuel consumption LITERS PER H

- aircraft
- fuel type
- fuel consumption
- cruise speed
- cruise fuel capacity

2: save queries

- aircraft
- mag deviation
- Departure VARCHAR 4
- Destination VARCHAR 4
- duration
- fuel consumption
- wind
- mag var
