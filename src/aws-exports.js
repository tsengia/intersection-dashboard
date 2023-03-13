const aws_settings = {
    aws_appsync_graphqlEndpoint: process.env.REACT_APP_AWS_GRAPHQLENDPOINT,
    aws_appsync_realtimeEndpoint: process.env.REACT_aPP_AWS_REALTIMEENDPOINT,
    aws_appsync_region: process.env.REACT_APP_AWS_REGION,
    aws_appsync_authenticationType: process.env.REACT_APP_AWS_AUTHENTICATIONTYPE,
    aws_appsync_apiKey: process.env.REACT_APP_AWS_APIKEY,
};

export default aws_settings;