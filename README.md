# Multi Host Deployment
Deploy multi-host hyperledger 

Source : https://medium.com/@kctheservant/multi-host-deployment-for-first-network-hyperledger-fabric-v2-273b794ff3d

### Prerequisites
Open several ports for docker swarm:
#### login as admin sudo
#### Open ports using ufw
ufw allow 22/tcp
ufw allow 2376/tcp
ufw allow 7946/tcp 
ufw allow 7946/udp 
ufw allow 4789/udp
#### Reload ufw
ufw reload
#### if ufw is disabled, enable it
ufw enable
#### restart docker daemon
systemctl restart docker

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

### Check if node has been added to channel
docker exec peer0.org1.lnsw.com peer channel getinfo -c dochannel
docker exec peer0.org2.co.com peer channel getinfo -c dochannel

### Create chaincodes
mkdir chaincodes/chaincode-kv-node
cd chaincodes/chaincode-kv-node
touch index.js
npm install fabric-contract-api crypto fabric-shim
cd ../..
### Zip chaincodes
peer lifecycle chaincode package ./channel-artifacts/chaincodes.tar.gz --path ./chaincodes/chaincode-kv-node --lang node --label chaincodesv1
### Install chaincodes on host1
docker exec cli peer lifecycle chaincode install ./channel-artifacts/chaincodes.tar.gz
### Install chaincodes on host2
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/users/Admin@org2.co.com/msp -e CORE_PEER_ADDRESS=peer0.org2.co.com:9051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt cli peer lifecycle chaincode install ./channel-artifacts/chaincodes.tar.gz
### Check images for each host
docker images dev-*
dev-peer0.org1.lnsw.com-chaincodesv5-972c402c00d2ce67d0c88d883167548c52741db28a5199f629c067ba0101e562-195c83bb25dddb991bf6c798d202eda49e7c625729049781bb8d3b51f1985879   latest    9a82d089fcf4   8 minutes ago   385MB
Note: using 972c402c00d2ce67d0c88d883167548c52741db28a5199f629c067ba0101e562 as ID for approve chaincodes and chaincodesv5 as name.
### Approve chaincodes on both org
#### Org 1
docker exec cli peer lifecycle chaincode approveformyorg --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channelID dochannel --name chaincodes --version 1 --sequence 1 --waitForEvent --package-id chaincodesv1:5680ca78671470e86902a8a3d8fb702c368373bee305ab5ccc10a1f79f417e93
#### Org 2
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/users/Admin@org2.co.com/msp -e CORE_PEER_ADDRESS=peer0.org2.co.com:9051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt cli peer lifecycle chaincode approveformyorg --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channelID dochannel --name chaincodes --version 1 --sequence 1 --waitForEvent --package-id chaincodesv1:5680ca78671470e86902a8a3d8fb702c368373bee305ab5ccc10a1f79f417e93
### Check approval status
docker exec cli peer lifecycle chaincode checkcommitreadiness --channelID dochannel --name chaincodes --version 1 --sequence 1
### Commit Chaincode
docker exec cli peer lifecycle chaincode commit -o orderer.example.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --peerAddresses peer0.org1.lnsw.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --channelID dochannel --name chaincodes --version 1 --sequence 1
### Check commit status
docker exec cli peer lifecycle chaincode querycommitted --channelID dochannel --name chaincodes

### testing chaincode
#### Request DO
docker exec cli peer chaincode invoke -o ordererCo.example.com:8050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererCo.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt -c '{"Args": ["DOContract:requestDO", "{\"assetID\":\"asset1\",\"newValue\":\"100\"}"]}'

docker exec cli peer chaincode invoke -o ordererSl.example.com:9050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererSl.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt -c '{"Args": ["DOContract:requestDO", "{\"assetID\":\"asset2\",\"newValue\":\"100\"}"]}'

#### Query All DO
docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryAllOrders", "{}"]}'
#### Get Status DO
docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:getStatusDO", "ebb99c74f2664b015bed614ef5863b29450afed0201
f7d55aebe61e8e1f6e962"]}'
#### update status DO
docker exec cli peer chaincode invoke -o ordererCo.example.com:8050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererCo.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt -c '{"Args": ["DOContract:updateStatusDO", "ebb99c74f2664b015bed614ef5863b29450afed0201
f7d55aebe61e8e1f6e962", "Cancelled", "hahaha"]}'
#### update do
docker exec cli peer chaincode invoke -o ordererCo.example.com:8050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererCo.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt -c '{"Args": ["DOContract:updateStatusDO", "ebb99c74f2664b015bed614ef5863b29450afed0201
f7d55aebe61e8e1f6e962", "Cancelled", "hahaha"]}'

## Instalasi Hyperledger Explorer
### Konfigurasi folder explorer mengikuti environment host berada
### Mount ke folder explorer
cd explorer
### Jalankan Service Kontainer
docker-compose up -d
### Matikan Service Kontainer jika dibutuhkan
docker-compose down -v