# 4host-swarm
Deploy multi-host First Network (using Fabric v2.2)

Source of article: https://medium.com/@kctheservant/multi-host-deployment-for-first-network-hyperledger-fabric-v2-273b794ff3d

sudo npm install -g npm@10.8.1


mkdir chaincodes/chaincode-kv-node
cd chaincodes/chaincode-kv-node
touch index.js
npm install fabric-contract-api crypto
cd ../..
d
peer lifecycle chaincode package ./channel-artifacts/chaincodes.tar.gz --path /chaincodes/chaincode-kv-node --lang node --label chaincodesv5

docker exec cli peer lifecycle chaincode install ./channel-artifacts/chaincodes.tar.gz

docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp -e CORE_PEER_ADDRESS=peer0.org2.example.com:9051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt cli peer lifecycle chaincode install ./channel-artifacts/chaincodes.tar.gz