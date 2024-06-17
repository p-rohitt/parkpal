const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");
require('dotenv').config();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'ap-south-1', 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const createTable = async () => {
    const params = {
        TableName: "Users",
        KeySchema: [
            { AttributeName: "userId", KeyType: "HASH" } // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: "userId", AttributeType: "S" },
            { AttributeName: "email", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
        GlobalSecondaryIndexes: [
            {
                IndexName: "EmailIndex",
                KeySchema: [
                    { AttributeName: "email", KeyType: "HASH" } // Partition key
                ],
                Projection: {
                    ProjectionType: "ALL"
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            }
        ]
    };

    try {
        const data = await client.send(new CreateTableCommand(params));
        console.log("Table created successfully", data);
    } catch (err) {
        console.error("Error creating table", err);
    }
};

createTable();
