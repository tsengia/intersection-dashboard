import { util } from '@aws-appsync/utils';

// ADD_INTERSECTION

export function request(ctx) {
    const name = ctx.arguments.name.trim();
    
    const defaults = {
        "ble_state":"connected",
        "light1":"red",
        "light2":"red"
    };
    return {
        operation: "PutItem",
        key: util.dynamodb.toMapValues({ name }),
        attributeValues: util.dynamodb.toMapValues(defaults),
        condition: {
            expression: "attribute_not_exists(#n)",
            expressionNames: {"#n":"name"}
        }
    };
}

export function response(ctx) {
    const { error, result } = ctx;
    if (error) {
        util.appendError(error.message, error.type, result);
        return null;
    }
    return result;
}