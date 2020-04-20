# Creating a new network for the webserver container and my mysql database container
sudo docker network create berkeleyindex-network

# Run mysql container but add it to berkeleyindex-network
sudo docker run --name bit-db -e MYSQL_ROOT_PASSWORD=password  -e MYSQL_DATABASE=bit-db -v /home/ec2-user/public_html/GRIT/webapp/database:/var/lib/mysql --network berkeleyindex-network -dit mysql:latest --default-authentication-plugin=mysql_native_password

sudo docker build -t bit_image .
sudo docker run  -dit --name=bit_web -e FLASK_APP=main.py -p 80:80 --network berkeleyindex-network bit_image
