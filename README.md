# 4host-swarm
Deploy multi-host First Network (using Fabric v2.2)

Source of article: https://medium.com/@kctheservant/multi-host-deployment-for-first-network-hyperledger-fabric-v2-273b794ff3d

sudo npm install -g npm@10.8.1

### Create chaincodes
mkdir chaincodes/chaincode-kv-node
cd chaincodes/chaincode-kv-node
touch index.js
npm install fabric-contract-api crypto
cd ../..
### Zip chaincodes
peer lifecycle chaincode package ./channel-artifacts/chaincodes.tar.gz --path /chaincodes/chaincode-kv-node --lang node --label chaincodesv5
### Install chaincodes on host1
docker exec cli peer lifecycle chaincode install ./channel-artifacts/chaincodes.tar.gz
### Install chaincodes on host2
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.sl.com/users/Admin@org2.sl.com/msp -e CORE_PEER_ADDRESS=peer0.org2.sl.com:9051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.sl.com/peers/peer0.org2.sl.com/tls/ca.crt cli peer lifecycle chaincode install ./channel-artifacts/chaincodes.tar.gz
### Check images for each host
docker images dev-*
dev-peer0.org1.co.com-chaincodesv5-972c402c00d2ce67d0c88d883167548c52741db28a5199f629c067ba0101e562-195c83bb25dddb991bf6c798d202eda49e7c625729049781bb8d3b51f1985879   latest    9a82d089fcf4   8 minutes ago   385MB
Note: using 972c402c00d2ce67d0c88d883167548c52741db28a5199f629c067ba0101e562 as ID for approve chaincodes and chaincodesv5 as name.
### Approve chaincodes on both org
#### Org 1
docker exec cli peer lifecycle chaincode approveformyorg --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channelID dochannel --name chaincodes --version 5 --sequence 1 --waitForEvent --package-id chaincodesv5:972c402c00d2ce67d0c88d883167548c52741db28a5199f629c067ba0101e562
#### Org 2
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.sl.com/users/Admin@org2.sl.com/msp -e CORE_PEER_ADDRESS=peer0.org2.sl.com:9051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.sl.com/peers/peer0.org2.sl.com/tls/ca.crt cli peer lifecycle chaincode approveformyorg --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --channelID dochannel --name chaincodes --version 5 --sequence 1 --waitForEvent --package-id chaincodesv5:972c402c00d2ce67d0c88d883167548c52741db28a5199f629c067ba0101e562