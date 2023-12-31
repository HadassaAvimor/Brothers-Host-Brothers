const myModule = require("../models/hostModel");
const validHost = myModule.validHost;
const HostModel = myModule.HostModel;

const HostRepo = require("../repositories/hostRepo");
const repo = new HostRepo()

module.exports = class HostService {

    async getAll() {
        return await repo.getAll();
    }

    async getByEmailAndPassword(email) {
        return repo.getByEmailAndPassword(email)
    }

    async insert(data) {
        const validBody = validHost(data);
        if (validBody.error) {
            return validBody;
        } else {
            return await repo.insert(data);
        }
    }

    async update(id, data) {
        let validBody = validHost(data);
        if (validBody.error) {
            return validBody;
        } else {
            return await repo.update(id,data);
        }
    }

    async delete(id) {
        return await repo.delete(id);
    }
    
    async validateByEmail(email){
        return await repo.validateByEmail(email);
    }

}