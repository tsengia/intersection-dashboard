import { util } from '@aws-appsync/utils';

// GET_INTERSECTION

export function request(ctx) {
    const name = ctx.arguments.name.trim();
    return {
        operation: "GetItem",
        key: util.dynamodb.toMapValues({ name })
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