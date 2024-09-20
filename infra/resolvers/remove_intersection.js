import { util } from '@aws-appsync/utils';

// REMOVE_INTERSECTION

export function request(ctx) {
    const name = ctx.arguments.name.trim();
    return {
        operation: "DeleteItem",
        key: util.dynamodb.toMapValues({ name })
    };
}

export function response(ctx) {
    const { error, result } = ctx;
    if (error) {
        return util.appendError(error.message, error.type, result);
    }
    return result;
}