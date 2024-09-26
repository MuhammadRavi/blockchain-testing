#!/bin/bash

# Define variables
CHAINCODE_NAME="chaincodes"
CHANNEL_NAME="dochannel"
VERSION="1"
SEQUENCE="1"
PACKAGE_ID="chaincodesv1:eaf28f1364bbe18784c4f585136529ff82e26d2a0e63207bbd46c0a53a0c082f"
ORDERER_CA="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

# Approve Chaincode on LNSW Host
docker exec cli peer lifecycle chaincode approveformyorg --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE --waitForEvent --package-id $PACKAGE_ID

# Approve chaincode on CO Host
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/users/Admin@org2.co.com/msp -e CORE_PEER_ADDRESS=10.239.54.36:8051 -e CORE_PEER_LOCALMSPID="Org2MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt cli peer lifecycle chaincode approveformyorg --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE --waitForEvent --package-id $PACKAGE_ID

# Approve chaincode on SL Host
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/users/Admin@org3.sl.com/msp -e CORE_PEER_ADDRESS=10.239.54.38:9051 -e CORE_PEER_LOCALMSPID="Org3MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt cli peer lifecycle chaincode approveformyorg --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE --waitForEvent --package-id $PACKAGE_ID

# Approve chaincode on TO Host
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.to.com/users/Admin@org4.to.com/msp -e CORE_PEER_ADDRESS=10.239.54.39:10051 -e CORE_PEER_LOCALMSPID="Org4MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org4.to.com/peers/peer0.org4.to.com/tls/ca.crt cli peer lifecycle chaincode approveformyorg --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE --waitForEvent --package-id $PACKAGE_ID

# Approve chaincode on INAPORT Host
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.inaport.com/users/Admin@org5.inaport.com/msp -e CORE_PEER_ADDRESS=10.239.54.33:11051 -e CORE_PEER_LOCALMSPID="Org5MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.inaport.com/peers/peer0.org5.inaport.com/tls/ca.crt cli peer lifecycle chaincode approveformyorg --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE --waitForEvent --package-id $PACKAGE_ID

# Approve chaincode on BANK Host
docker exec -e CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org6.bank.com/users/Admin@org6.bank.com/msp -e CORE_PEER_ADDRESS=10.239.54.23:12051 -e CORE_PEER_LOCALMSPID="Org6MSP" -e CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org6.bank.com/peers/peer0.org6.bank.com/tls/ca.crt cli peer lifecycle chaincode approveformyorg --tls --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name $CHAINCODE_NAME --version $VERSION --sequence $SEQUENCE --waitForEvent --package-id $PACKAGE_ID