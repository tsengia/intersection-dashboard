#!/usr/bin/env node

import { App } from "aws-cdk-lib";

import { CdkStack } from "./cdk-stack.js";

const app = new App();
new CdkStack(app, 'CdkStack', {});
