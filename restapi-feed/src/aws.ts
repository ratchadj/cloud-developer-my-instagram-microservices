import AWS = require('aws-sdk');
import { config } from './config/config';

const c = config.dev;

//Configure AWS
// var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
var credentials = new AWS.SharedIniFileCredentials({profile: c.aws_profile});
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_reigion,
  params: {Bucket: c.aws_media_bucket}
});


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string{

  const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
      });

    return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl( key: string ){

    const signedUrlExpireSeconds = 60 * 5

    // const url = s3.getSignedUrl('putObject', {
    //   Bucket: c.aws_media_bucket,
    //   Key: key,
    //   Expires: signedUrlExpireSeconds
    // }, function(err: any, url: any)
    // {
    //   console.log("error:" + err);
    //   console.log("url:" + url);
    //    if (err) { throw {msg:err, code:"AWS_ERROR"}; }
    //    else { return url; }
    // });

    // return url;

    // let url = {};
    // const signedUrlPromise = s3.getSignedUrl('putObject', {
    //   Bucket: c.aws_media_bucket,
    //   Key: key,
    //   Expires: signedUrlExpireSeconds
    // }).promise();
    
    // signedUrlPromise.then(function(data: any) {
    //   // url = data;
    //   console.log(data);
    //   console.log('Success');
    // }).catch(function(err: any) {
    //   console.log(err);
    // });

    // const params = {
    //   Bucket: c.aws_media_bucket,
    //   Key: key,
    //   Body: 'Uploaded text using the promise-based method!'
    // };
    // const url = {};
    // const putObjectPromise = s3.putObject(params).promise();
    // putObjectPromise.then(function(data: any) {
    //   console.log(data);
    //   console.log('Success');
    // }).catch(function(err: any) {
    //   console.log(err);
    // });

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', {
            Bucket: c.aws_media_bucket,
            Key: key,
            Expires: signedUrlExpireSeconds
          }, (err: any, url: any) => {
            if (err) {
                reject(err);
            }
            console.log(url);
            resolve(url);
        });
    });
}