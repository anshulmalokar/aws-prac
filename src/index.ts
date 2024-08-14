import { S3Client,GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import process from "process";

const clientParams = {
    region: 'ap-south-1',
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY as string,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY as string
    }
}

const client = new S3Client(clientParams);

class AwsService{
    private static instance: AwsService;
    private AwsService(){}
    public static getInstance(): AwsService{
        if(!this.instance){
            return new AwsService();
        }
        return this.instance;
    }

    public async getPreSignedUrl(key: string){
        const getObjectParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: key
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(client, command);
        return url;
    }
}

async function main(){
    const url = await AwsService.getInstance().getPreSignedUrl('download-goku.jpg');
    console.log(url);
}

main();