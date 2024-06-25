"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const util_1 = require("util");
const execPromisify = (0, util_1.promisify)(child_process_1.exec);
let AppService = class AppService {
    async requestDo(data) {
        const parsedData = data.replace(/"/g, '\\"');
        const command = `docker exec cli peer chaincode invoke -o ordererCo.example.com:8050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererCo.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt -c '{\"Args\": [\"DOContract:requestDO\", \"${parsedData}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr.includes('Chaincode invoke successful')) {
                const resultMatch = stderr.match(/payload:"(.*)"/);
                const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
                return resultJson;
            }
            else {
                throw new Error(stderr);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to Request DO:", error.message);
        }
    }
    async getAllDo() {
        const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryAllOrders", "{}"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to query all DO', error.message);
        }
    }
    async getStatusDo(orderId) {
        const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:getStatusDO", \"${orderId}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to get status DO", error.message);
        }
    }
    async updateStatusDoCo(orderId, data) {
        const { status, note } = data;
        const command = `docker exec cli peer chaincode invoke -o ordererCo.example.com:8050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererCo.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt -c '{"Args": ["DOContract:updateStatusDO", \"${orderId}\", \"${status}\", \"${note}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr.includes('Chaincode invoke successful')) {
                const resultMatch = stderr.match(/payload:"(.*)"/);
                const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
                return resultJson;
            }
            else {
                throw new Error(stderr);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to Update Status DO:", error.message);
        }
    }
    async updateStatusDoSl(orderId, data) {
        const { status, note } = data;
        const command = `docker exec cli peer chaincode invoke -o ordererSl.example.com:9050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererSl.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt -c '{"Args": ["DOContract:updateStatusDO", \"${orderId}\", \"${status}\", \"${note}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr.includes('Chaincode invoke successful')) {
                const resultMatch = stderr.match(/payload:"(.*)"/);
                const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
                return resultJson;
            }
            else {
                throw new Error(stderr);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to Update Status DO:", error.message);
        }
    }
    async updateDoCo(orderId, data) {
        const parsedData = data.replace(/"/g, '\\"');
        const command = `docker exec cli peer chaincode invoke -o ordererCo.example.com:8050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererCo.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt -c '{"Args": ["DOContract:updateDO", \"${orderId}\", \"${parsedData}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr.includes('Chaincode invoke successful')) {
                const resultMatch = stderr.match(/payload:"(.*)"/);
                const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
                return resultJson;
            }
            else {
                throw new Error(stderr);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to Update DO:", error.message);
        }
    }
    async updateDoSl(orderId, data) {
        const parsedData = data.replace(/"/g, '\\"');
        const command = `docker exec cli peer chaincode invoke -o ordererSl.example.com:9050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererSl.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt -c '{"Args": ["DOContract:updateDO", \"${orderId}\", \"${parsedData}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr.includes('Chaincode invoke successful')) {
                const resultMatch = stderr.match(/payload:"(.*)"/);
                const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
                return resultJson;
            }
            else {
                throw new Error(stderr);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to Update DO:", error.message);
        }
    }
    async releaseDo(orderId) {
        const command = `docker exec cli peer chaincode invoke -o ordererSl.example.com:9050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererSl.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt -c '{"Args": ["DOContract:releaseDO", \"${orderId}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr.includes('Chaincode invoke successful')) {
                const resultMatch = stderr.match(/payload:"(.*)"/);
                const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
                return resultJson;
            }
            else {
                throw new Error(stderr);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to Release DO:", error.message);
        }
    }
    async rejectDo(orderId) {
        const command = `docker exec cli peer chaincode invoke -o ordererSl.example.com:9050 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/ordererSl.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C dochannel -n chaincodes --peerAddresses peer0.org1.lnsw.com:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.lnsw.com/peers/peer0.org1.lnsw.com/tls/ca.crt --peerAddresses peer0.org2.co.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.co.com/peers/peer0.org2.co.com/tls/ca.crt --peerAddresses peer0.org3.sl.com:9051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.sl.com/peers/peer0.org3.sl.com/tls/ca.crt -c '{"Args": ["DOContract:rejectDO", \"${orderId}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr.includes('Chaincode invoke successful')) {
                const resultMatch = stderr.match(/payload:"(.*)"/);
                const resultJson = JSON.parse(resultMatch[1].replace(/\\"/g, '"'));
                return resultJson;
            }
            else {
                throw new Error(stderr);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to Reject DO:", error.message);
        }
    }
    async getDoByOrderId(orderId) {
        const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryOrderById", \"${orderId}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to Get DO Data By Order Id", error.message);
        }
    }
    async getDoRelease() {
        const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryAllOrdersRelease", "{}"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to Get DO Release", error.message);
        }
    }
    async getAllDoCo(coName) {
        const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryAllOrdersCO", \"${coName}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to query all DO CO', error.message);
        }
    }
    async getAllDoSl(slName) {
        const command = `docker exec cli peer chaincode query -n chaincodes -C dochannel -c '{"Args": ["DOContract:queryAllOrdersSL", \"${slName}\"]}'`;
        try {
            const { stdout, stderr } = await execPromisify(command);
            if (stderr) {
                throw new Error(stderr);
            }
            return stdout;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to query all DO SL', error.message);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map