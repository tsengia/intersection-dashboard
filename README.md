# Traffic Light Dashboard
<img align="left" width="128" height="128" alt="Illustration of a traffic light with red, yellow, and green lights" src="public/logo192.png" >  
This is a simple React JS single page application (SPA) for controlling virtual Traffic Intersections.    
The backend is powered by AWS AppSync and DynamoDB.   

This frontend app was originally built for a [previous IoT project of mine](https://github.com/tsengia/iot-thingy91-traffic-lights) and has been refactored to use AWS AppSync and DynamoDB. Deployment is handled via the JavaScript AWS CDK.

__[Try it out here!](https://traffic-lights.tsengia.net/)__  

--- 
## Development
Before developing, you will need to install the required node modules, run the following command to install them:
```bash
npm ci
```

To launch the development server, run the following command from this directory: 
```bash
npm start
```

To build a deployment version of this app, run this command: `npm run build`.

This will create a set of static files in the `build` directory.  
You can copy/move these files into your `/var/www/html` directory to serve them to your users.

## CDK Deployment

If you have [bootstrapped](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) your target environment with a different `qualifier`, then update the `@aws-cdk/core:bootstrapQualifier` context value in `cdk.json`.

If you did not bootstrap with as custom qualifier, then remove the `@aws-cdk/core:bootstrapQualifier` context value in `cdk.json` so that the stacks are deployed with the default qualifier.

Once you have the correct qualifier set, run the below command:
```bash
cdk deploy
```

