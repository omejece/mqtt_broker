const AWS = require("aws-sdk");
const bcrypt = require("bcrypt");

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




async function loginClient(data){
    try{
        let params = {
            TableName:"clients",
            FilterExpression:"#username = :username",
            ExpressionAttributeNames:{
               "#username":"username"
            },
            ExpressionAttributeValues:{
                ":username":data.username
            }
        };

        let result = await dynamoDb.scan(params).promise();
        if(result.Items.length > 0){
            const myClient = result.Items[0];
            const isPasswordOk = await bcrypt.compare(data.password,myClient.password);
            if(isPasswordOk){
                return true;
            }
            else{
                throw "invalid password"
            }
        }
        else{
            throw "invalid username"
        }
    }
    catch(err){
        console.log(err);
        return false
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
    updateClient,
    loginClient
}




