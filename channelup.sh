# Create channel
docker exec cli peer channel create -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/channel.tx --outputBlock ./channel-artifacts/dochannel.block --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

sleep 15

# menambahkan peer0.org1.lnsw.com ke dalam channel
docker exec cli peer channel join -b ./channel-artifacts/dochannel.block
# update peer0.org1.lnsw.com 
docker exec cli peer channel update -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/Org1MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# menambahkan peer0.org2.co.com ke dalam channel
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/users/Admin@org2.co.com/msp -e CORE_PEER_ADDRESS=10.216.74.133:8051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt cli peer channel join -b ./channel-artifacts/dochannel.block
# update peer0.org2.co.com
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/users/Admin@org2.co.com/msp -e CORE_PEER_ADDRESS=10.216.74.133:8051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt cli peer channel update -o orderer.example.com:7050 -c dochannel -f ./channel-artifacts/Org2MSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
