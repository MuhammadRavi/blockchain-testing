# Create channel
docker exec cli peer channel create -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/channel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

sleep 5

# menambahkan peer0.org1.co.com ke dalam channel
docker exec cli peer channel join -b ./channel-artifacts/dochannel.block

# menambahkan peer0.org2.sl.com ke dalam channel
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.sl.com/users/Admin@org2.sl.com/msp -e CORE_PEER_ADDRESS=peer0.org2.sl.com:9051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.sl.com/peers/peer0.org2.sl.com/tls/ca.crt cli peer channel join -b ./channel-artifacts/dochannel.block

docker exec cli peer channel update -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/Org1MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.sl.com/users/Admin@org2.sl.com/msp -e CORE_PEER_ADDRESS=peer0.org2.sl.com:9051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.sl.com/peers/peer0.org2.sl.com/tls/ca.crt cli peer channel update -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/Org2MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem