# Multi Host Deployment
Deploy multi-host hyperledger 

Source : https://medium.com/@kctheservant/multi-host-deployment-for-first-network-hyperledger-fabric-v2-273b794ff3d

### Prerequisites
#### Open several ports for docker swarm:
##### login as admin sudo
##### Open ports using ufw
ufw allow 22/tcp
ufw allow 2376/tcp
ufw allow 7946/tcp 
ufw allow 7946/udp 
ufw allow 4789/udp
ufw allow 3000
##### Reload ufw
ufw reload
##### if ufw is disabled, enable it
ufw enable
##### restart docker daemon
systemctl restart docker
#### Pull hyperledger/fabric-nodeenv:2.5
docker pull --platform linux/x86_64 hyperledger/fabric-nodeenv:2.5

### Generate docker swarm
#### Generate docker swarm init
docker swarm init --advertise-addr <host-1 ip address>
#### Generate token manager
docker swarm join-token manager
#### Join another host
output from join-token manager --advertise-addr <host n ip>
#### Create overlay network
docker network create --attachable --driver overlay first-network

### Generate artifacts
#### Generate crypto-config
cryptogen generate --config=./crypto-config.yaml --output=./crypto-config
#### Generate genesis.block
configtxgen -profile OrdererGenesis -outputBlock ./channel-artifacts/genesis.block -channelID mainchannel
#### Generate channel.tx
configtxgen -profile ChannelProfile -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID dochannel
#### MSP Anchors
configtxgen -profile ChannelProfile -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID dochannel -asOrg Org1MSP
configtxgen -profile ChannelProfile -outputAnchorPeersUpdate ./channel-artifacts/Org2MSPanchors.tx -channelID dochannel -asOrg Org2MSP
configtxgen -profile ChannelProfile -outputAnchorPeersUpdate ./channel-artifacts/Org3MSPanchors.tx -channelID dochannel -asOrg Org3MSP
configtxgen -profile ChannelProfile -outputAnchorPeersUpdate ./channel-artifacts/Org4MSPanchors.tx -channelID dochannel -asOrg Org4MSP
configtxgen -profile ChannelProfile -outputAnchorPeersUpdate ./channel-artifacts/Org5MSPanchors.tx -channelID dochannel -asOrg Org5MSP
configtxgen -profile ChannelProfile -outputAnchorPeersUpdate ./channel-artifacts/Org6MSPanchors.tx -channelID dochannel -asOrg Org6MSP

### up each host

### up channel
./channelup.sh

### Check if node has been added to channel (for each host)
docker exec peer0.org1.lnsw.com peer channel getinfo -c dochannel
docker exec peer0.org2.co.com peer channel getinfo -c dochannel

### Create chaincodes
mkdir chaincodes/chaincode-kv-node
cd chaincodes/chaincode-kv-node
npm install fabric-contract-api crypto fabric-shim
cd ../..
### Zip chaincodes
peer lifecycle chaincode package ./channel-artifacts/chaincodes.tar.gz --path ./chaincodes/chaincode-kv-node --lang node --label chaincodesv1
### Install chaincodes
./chaincode-install.sh

### Check images for each host
docker images dev-*
dev-peer0.org1.lnsw.com-chaincodesv5-972c402c00d2ce67d0c88d883167548c52741db28a5199f629c067ba0101e562-195c83bb25dddb991bf6c798d202eda49e7c625729049781bb8d3b51f1985879   latest    9a82d089fcf4   8 minutes ago   385MB
Note: using 972c402c00d2ce67d0c88d883167548c52741db28a5199f629c067ba0101e562 as ID for approve chaincodes and chaincodesv5 as name. don't forget to update chaincodesapprove.sh

### Approve chaincodes of all hosts
./chaincode-approve.sh

### Check approval status
docker exec cli peer lifecycle chaincode checkcommitreadiness --channelID dochannel --name chaincodes --version 1 --sequence 1

### Commit Chaincode
./chaincode-commit.sh

### Check commit status
docker exec cli peer lifecycle chaincode querycommitted --channelID dochannel --name chaincodes

## Instalasi Hyperledger Explorer
### Konfigurasi folder explorer mengikuti environment host berada
### Mount ke folder explorer
cd explorer
### Jalankan Service Kontainer
docker-compose up -d
### Matikan Service Kontainer jika dibutuhkan
docker-compose down -v