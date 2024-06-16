// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.1
//   protoc               v3.20.3
// source: libs/grpc/src/protos/auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface CheckTokenReq {
  token: string;
}

export interface CheckTokenRes {
  data: CheckTokenResData | undefined;
  error?: string | undefined;
}

export interface CheckTokenResData {
  email: string;
  id: string;
}

export interface AuthServiceGrpcClient {
  checkToken(request: CheckTokenReq, ...rest: any): Observable<CheckTokenRes>;
}

export interface AuthServiceGrpcController {
  checkToken(request: CheckTokenReq, ...rest: any): Promise<CheckTokenRes> | Observable<CheckTokenRes> | CheckTokenRes;
}

export function AuthServiceGrpcControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["checkToken"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthServiceGrpc", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthServiceGrpc", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_GRPC_SERVICE_NAME = "AuthServiceGrpc";
