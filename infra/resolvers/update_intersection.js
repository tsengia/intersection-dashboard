import { util } from '@aws-appsync/utils';

// UPDATE_INTERSECTION

export function request(ctx) {
    let { name, ...values } = ctx.arguments;
    name = name.trim();
    
    let set_expressions = [];
    let set_expression_values = {};
    for (const [key, value] of Object.entries(values)) {
        set_expressions.push(`${key} = :${key}`);
        set_expression_values[`:${key}`] = {"S": value};
    }
    let update_expression = set_expressions.length ? `SET ${set_expressions.join(", ")}` : "";

    return {
        operation: "UpdateItem",
        key: util.dynamodb.toMapValues({ name }),
        update: {
            expression: update_expression,
            expressionValues: set_expression_values
        },
        condition: {
            expression: "attribute_exists(#n)",
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