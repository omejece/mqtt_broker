const AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-west-1"
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();


async function saveClient(data){
    try{

    }
    catch(err){
        console.log(err);
    }
}


async function deleteClient(data){
    try{

    }
    catch(err){
        console.log(err);
    }
}



async function updateClient(data){
    try{

    }
    catch(err){
        console.log(err);
    }
}


module.exports = {
    saveClient,
    deleteClient,
    updateClient
}




