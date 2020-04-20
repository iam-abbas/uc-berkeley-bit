# Creating a new network for the webserver container and my mysql database container
docker network create berkeleyindex-network

# Run mysql container but add it to berkeleyindex-network
docker run --name bit-db -e MYSQL_ROOT_PASSWORD=password  -e MYSQL_DATABASE=bit-db -v E:/Github/GRIT/webapp/database:/var/lib/mysql --network berkeleyindex-network -dit mysql:latest --default-authentication-plugin=mysql_native_password

docker build -t bit_image .
docker run  -dit --name=bit_web -e FLASK_APP=main.py -p 80:80 --network berkeleyindex-network bit_image