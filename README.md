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
```
npm start
```

To build a deployment version of this app, run this command: `npm run build`.

This will create a set of static files in the `build` directory.  
You can copy/move these files into your `/var/www/html` directory to serve them to your users.

## CDK Deployment

Make sure that you have bootstrapped your target environment before following the steps below.

Powershell:
```powershell
# First, set the AMPLIFY_APP_ID
$Env:AMPLIFY_APP_ID='**************'

# Next, deploy the application to your environment
cdk deploy
```

Linux/Bash:
```bash
# First, set the AMPLIFY_APP_ID
export AMPLIFY_APP_ID='**************'

# Next, deploy the application to your environment
cdk deploy
```

