// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from './gax';
import {GrpcClient, GrpcClientOptions, ClientStubOptions} from './grpc';
import {GrpcClient as FallbackGrpcClient} from './fallback';
import {createApiCall} from './createApiCall';
import {GoogleAuth, GoogleAuthOptions, OAuth2Client} from 'google-auth-library';
import {ProjectIdCallback} from 'google-auth-library/build/src/auth/googleauth';
import * as routingHeader from './routingHeader';

import {
  LongrunningDescriptor,
  PageDescriptor,
  StreamDescriptor,
  BundleDescriptor,
} from './descriptor';
import * as gapicConfig from './iam_policy_service_client_config.json';
import * as protosTypes from '../protos/iam_service';
import * as fallback from './fallback';
import * as path from 'path';
let version = require('../../package.json').version;

interface Descriptors {
  page: {[name: string]: PageDescriptor};
  stream: {[name: string]: StreamDescriptor};
  longrunning: {[name: string]: LongrunningDescriptor};
  batching?: {[name: string]: BundleDescriptor};
}

interface ClientOptions
  extends GrpcClientOptions,
    GoogleAuthOptions,
    ClientStubOptions {
  libName?: string;
  libVersion?: string;
  clientConfig?: gax.ClientConfig;
  fallback?: boolean;
  apiEndpoint?: string;
}

interface Callback<ResponseObject, NextRequestObject, RawResponseObject> {
  (
    err: Error | null | undefined,
    value?: ResponseObject | null,
    nextRequest?: NextRequestObject,
    rawResponse?: RawResponseObject
  ): void;
}
/**
 *  Google Cloud IAM Client.
 *  This is manually written for providing methods [setIamPolicy, getIamPolicy, testIamPerssion] to the KMS client.
 *  We don't support it now in micro-generators.
 *  New feature request link: [https://github.com/googleapis/gapic-generator-typescript/issues/315]
 */
export class IamClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _defaults: {[method: string]: gax.CallSettings};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _protos: any;
  private _gaxGrpc: GrpcClient | FallbackGrpcClient;
  auth?: GoogleAuth | OAuth2Client;
  descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  innerApiCalls: {[name: string]: Function} = {};
  iamPolicyStub?: Promise<{[name: string]: Function}>;
  gaxGrpc: GrpcClient | FallbackGrpcClient;

  constructor(
    gaxGrpc: GrpcClient | FallbackGrpcClient,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: ClientOptions
  ) {
    this.gaxGrpc = gaxGrpc;
    // Ensure that options include the service address and port.
    const opts = Object.assign(
      {
        servicePath: options.servicePath,
        port: options.port,
        clientConfig: options.clientConfig,
        apiEndpoint: options.apiEndpoint,
        fallback: options.fallback,
      },
      options
    ) as ClientOptions & ClientStubOptions;
    version = opts.fallback ? fallback.version : version;
    this._gaxGrpc = opts.fallback
      ? new FallbackGrpcClient(opts)
      : new GrpcClient(opts);
    opts.scopes = (this.constructor as typeof IamClient).scopes;
    // Save options to use in initialize() method.
    this._opts = opts;
    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth;

    // Determine the client header string.
    const clientHeader = [`gax/${version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'iam_service.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback
        ? // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../protos/iam_service.json')
        : nodejsProtoPath
    );
    // Put together the default options sent with requests.
    this._defaults = gaxGrpc.constructSettings(
      'google.iam.v1.IAMPolicy',
      gapicConfig as gax.ClientConfig,
      opts!.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.iamPolicyStub) {
      return this.iamPolicyStub;
    }
    // Put together the "service stub" for
    // google.iam.v1.IAMPolicy.
    this.iamPolicyStub = this.gaxGrpc.createStub(
      this._opts.fallback
        ? this._protos.lookupService('google.iam.v1.IAMPolicy')
        : this._protos.google.iam.v1.IAMPolicy,
      this._opts
    ) as Promise<{[method: string]: Function}>;
    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const iamPolicyStubMethods = [
      'getIamPolicy',
      'setIamPolicy',
      'testIamPermissions',
    ];

    for (const methodName of iamPolicyStubMethods) {
      const innerCallPromise = this.iamPolicyStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );
      this.innerApiCalls[methodName] = createApiCall(
        innerCallPromise,
        this._defaults[methodName],
        this.descriptors.page[methodName]
      );
    }
    return this.iamPolicyStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'cloudkms.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'cloudkms.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }
  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/cloudkms',
    ];
  }

  /**
   * Get the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to be called with
   *   the current project Id.
   */
  getProjectId(): Promise<string>;
  getProjectId(callback: ProjectIdCallback): void;
  getProjectId(callback?: ProjectIdCallback): void | Promise<string> {
    if (this.auth && 'getProjectId' in this.auth) {
      return this.auth.getProjectId(callback!);
    }
    if (callback) {
      callback(new Error('Cannot determine project ID.'));
    } else {
      return Promise.reject('Cannot determine project ID.');
    }
  }

  getIamPolicy(
    request: protosTypes.google.iam.v1.GetIamPolicyRequest,
    options?: gax.CallOptions
  ): Promise<protosTypes.google.iam.v1.Policy>;
  getIamPolicy(
    request: protosTypes.google.iam.v1.GetIamPolicyRequest,
    options: gax.CallOptions,
    callback: protosTypes.google.iam.v1.IAMPolicy.GetIamPolicyCallback
  ): void;
  getIamPolicy(
    request: protosTypes.google.iam.v1.GetIamPolicyRequest,
    callback: protosTypes.google.iam.v1.IAMPolicy.GetIamPolicyCallback
  ): void;
  getIamPolicy(
    request: protosTypes.google.iam.v1.GetIamPolicyRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | protosTypes.google.iam.v1.IAMPolicy.GetIamPolicyCallback,
    callback?: protosTypes.google.iam.v1.IAMPolicy.GetIamPolicyCallback
  ): Promise<protosTypes.google.iam.v1.Policy> {
    let options: gax.CallOptions;
    if (optionsOrCallback instanceof Function && callback === undefined) {
      callback = (optionsOrCallback as unknown) as protosTypes.google.iam.v1.IAMPolicy.GetIamPolicyCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = routingHeader.fromParams({
      resource: request.resource,
    });
    return this.innerApiCalls.getIamPolicy(request, options, callback);
  }

  setIamPolicy(
    request: protosTypes.google.iam.v1.SetIamPolicyRequest,
    options?: gax.CallOptions
  ): Promise<protosTypes.google.iam.v1.Policy>;
  setIamPolicy(
    request: protosTypes.google.iam.v1.SetIamPolicyRequest,
    options: gax.CallOptions,
    callback: protosTypes.google.iam.v1.IAMPolicy.SetIamPolicyCallback
  ): void;
  setIamPolicy(
    request: protosTypes.google.iam.v1.SetIamPolicyRequest,
    callback: protosTypes.google.iam.v1.IAMPolicy.SetIamPolicyCallback
  ): void;
  setIamPolicy(
    request: protosTypes.google.iam.v1.SetIamPolicyRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | protosTypes.google.iam.v1.IAMPolicy.SetIamPolicyCallback,
    callback?: protosTypes.google.iam.v1.IAMPolicy.SetIamPolicyCallback
  ): Promise<protosTypes.google.iam.v1.Policy> {
    let options: gax.CallOptions;
    if (optionsOrCallback instanceof Function && callback === undefined) {
      callback = (optionsOrCallback as unknown) as protosTypes.google.iam.v1.IAMPolicy.SetIamPolicyCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = routingHeader.fromParams({
      resource: request.resource,
    });
    return this.innerApiCalls.setIamPolicy(request, options, callback);
  }
  testIamPermissions(
    request: protosTypes.google.iam.v1.TestIamPermissionsRequest,
    options?: gax.CallOptions
  ): Promise<protosTypes.google.iam.v1.TestIamPermissionsResponse>;
  testIamPermissions(
    request: protosTypes.google.iam.v1.TestIamPermissionsRequest,
    callback: protosTypes.google.iam.v1.IAMPolicy.TestIamPermissionsCallback
  ): void;
  testIamPermissions(
    request: protosTypes.google.iam.v1.TestIamPermissionsRequest,
    options: gax.CallOptions,
    callback: protosTypes.google.iam.v1.IAMPolicy.TestIamPermissionsCallback
  ): void;
  testIamPermissions(
    request: protosTypes.google.iam.v1.TestIamPermissionsRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | protosTypes.google.iam.v1.IAMPolicy.TestIamPermissionsCallback,
    callback?: protosTypes.google.iam.v1.IAMPolicy.TestIamPermissionsCallback
  ): Promise<protosTypes.google.iam.v1.TestIamPermissionsResponse> {
    let options: gax.CallOptions;
    if (optionsOrCallback instanceof Function && callback === undefined) {
      callback = (optionsOrCallback as unknown) as protosTypes.google.iam.v1.IAMPolicy.TestIamPermissionsCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = routingHeader.fromParams({
      resource: request.resource,
    });

    return this.innerApiCalls.testIamPermissions(request, options, callback);
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    console.warn('initialized');
    if (!this._terminated) {
      return this.iamPolicyStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    try {
      return Promise.resolve();
    } catch (err) {
      throw new Error(err);
    }
  }
}
export interface IamClient {
  getIamPolicy(request: protosTypes.google.iam.v1.GetIamPolicyRequest): void;
  getIamPolicy(
    request: protosTypes.google.iam.v1.GetIamPolicyRequest,
    options?: gax.CallOptions,
    callback?: protosTypes.google.iam.v1.IAMPolicy.GetIamPolicyCallback
  ): Promise<protosTypes.google.iam.v1.Policy>;
  setIamPolicy(request: protosTypes.google.iam.v1.SetIamPolicyRequest): void;
  setIamPolicy(
    request: protosTypes.google.iam.v1.SetIamPolicyRequest,
    options?: gax.CallOptions,
    callback?: protosTypes.google.iam.v1.IAMPolicy.SetIamPolicyCallback
  ): Promise<protosTypes.google.iam.v1.Policy>;
  testIamPermissions(
    request: protosTypes.google.iam.v1.TestIamPermissionsRequest
  ): void;
  testIamPermissions(
    request: protosTypes.google.iam.v1.TestIamPermissionsRequest,
    options?: gax.CallOptions,
    callback?: protosTypes.google.iam.v1.IAMPolicy.TestIamPermissionsCallback
  ): Promise<protosTypes.google.iam.v1.TestIamPermissionsResponse>;
}