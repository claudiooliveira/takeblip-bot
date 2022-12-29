const configs = require('./../../bin/config');
const hubspot = require('@hubspot/api-client')
const hubspotClient = new hubspot.Client({ accessToken: configs['hubSpot'] });

var Contacts = {
    create : async (data) => {
        if (!data.name || !data.email) {
            throw { message : 'name and email is mandatory' };
        }
        var splitName = data.name.split(" ");
        const properties = {
            email: data.email,
            firstname: splitName.length > 0 ? splitName[0] : data.name,
            lastname: splitName.length > 0 ? splitName[1] : '',
        };
        return await hubspotClient.crm.contacts.basicApi.create({
            properties,
        });
    },
    getByEmail : async (email) => {

        if (!email) {
            throw { message : 'email is mandatory' };
        }

        const filter = { 
            propertyName: 'email', 
            operator: 'EQ', 
            value: email,
        };

        const publicObjectSearchRequest = {
            filterGroups: [{ 
                filters: [filter] 
            }],
        };

        return (await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest)).results;
    }
};

module.exports = {
    Contacts,
};