import { util } from '@aws-appsync/utils';

// LIST_INTERSECTIONS

export function request(ctx) {
    return {
        operation: "Scan"
    };
}

export function response(ctx) {
    if (ctx.error) {
        util.appendError(ctx.error.message, ctx.error.type, ctx.result);
        return null;
    }
    return ctx.result.items;
}