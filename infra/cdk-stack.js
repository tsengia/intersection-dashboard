import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "IntersectionAPI-CDK", {
      name: "IntersectionAPI-CDK",
      definition: appsync.Definition.fromFile(path.join(__dirname, 'schema.graphql')),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        }
      },
      xrayEnabled: true
    });

    const table = new dynamodb.TableV2(this, "IntersectionTable-CDK", {
      partitionKey: { name: "name", type: dynamodb.AttributeType.STRING },
      billing: dynamodb.Billing.onDemand(),
      removalPolicy: RemovalPolicy.DESTROY
    });

    const dataSource = api.addDynamoDbDataSource("dynamoDataSource", table);

    const functionList = [
      ["LIST_INTERSECTIONS","Query","intersectionList","list_intersections.js"],
      ["GET_INTERSECTION","Query","intersection","get_intersection.js"],
      ["ADD_INTERSECTION","Mutation","addIntersection","add_intersection.js"],
      ["UPDATE_INTERSECTION","Mutation","updateIntersection","update_intersection.js"],
      ["REMOVE_INTERSECTION","Mutation","removeIntersection","remove_intersection.js"]
    ];

    for (const [name, typeName, fieldName, filename] of functionList) {

        const f = new appsync.AppsyncFunction(this, name, {
          name: name,
          typeName: typeName,
          fieldName: fieldName,
          api,
          dataSource: dataSource,
          runtime: appsync.FunctionRuntime.JS_1_0_0,
          code: appsync.Code.fromAsset(path.join(__dirname, "resolvers/", filename))
        });

        new appsync.Resolver(this, name + "_RESOLVER", {
          api: api,
          fieldName: fieldName,
          typeName: typeName,
          pipelineConfig: [f],
          runtime: appsync.FunctionRuntime.JS_1_0_0,
          code: appsync.Code.fromInline(`
              export function request(ctx) {
                  return {};
              }

              export function response(ctx) {
                  return ctx.prev.result;
              }
            `)
        });
    }


  }
}

export { CdkStack };
