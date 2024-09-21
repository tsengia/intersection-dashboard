#!/usr/bin/env node

import { App } from "aws-cdk-lib";

import { CdkStack } from "./cdk-stack.js";

import { simpleGit } from 'simple-git';


const app = new App();
let amplifyBranchName = await simpleGit().revparse(['--abbrev-ref', 'HEAD']);
new CdkStack(app, 'CdkStack', {
    branchName: amplifyBranchName
});
