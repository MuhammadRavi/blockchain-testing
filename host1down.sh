docker-compose -f host1.yaml down --volume --remove-orphans
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
