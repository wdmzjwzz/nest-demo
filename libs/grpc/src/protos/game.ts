// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.1
//   protoc               v3.20.3
// source: libs/grpc/src/protos/game.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface GetPlayerReq {
  id: string;
}

export interface EnterGameReq {
  email: string;
  id: string;
}

export interface EnterGameRes {
  player: string;
  error?: string | undefined;
}

/** 获取当前玩家的角色列表 */
export interface ListActorReq {
}

export interface ListActorRes {
  data: string;
  error?: string | undefined;
}

/** 创建角色 */
export interface CreateActorReq {
  nickname: string;
}

export interface CreateActorRes {
  data: CreateActorResData | undefined;
  error?: string | undefined;
}

export interface CreateActorResData {
}

/** 进入场景 */
export interface EnterSceneReq {
  actorId: number;
}

export interface EnterSceneRes {
  data: EnterSceneResData | undefined;
  error?: string | undefined;
}

export interface EnterSceneResData {
  sceneId: number;
}

/** 切换场景 */
export interface ChangeSceneReq {
  sceneId: number;
}

export interface ChangeSceneRes {
  data: ChangeSceneResData | undefined;
  error?: string | undefined;
}

export interface ChangeSceneResData {
}

/** 创建副本 */
export interface CreateReplicationReq {
  replicationType: number;
}

export interface CreateReplicationRes {
  data: CreateReplicationResData | undefined;
  error?: string | undefined;
}

export interface CreateReplicationResData {
}

/** 离开副本 */
export interface LeaveReplicationReq {
}

export interface LeaveReplicationRes {
  data: LeaveReplicationReqData | undefined;
  error?: string | undefined;
}

export interface LeaveReplicationReqData {
  sceneId: number;
}

export interface IActor {
  id: number;
  nickname: string;
  posX: number;
  posY: number;
  type: number;
  email: string;
  sceneId: number;
}

/** 客户端操作同步 */
export interface InputFromClient {
  id: number;
  directionX: number;
  directionY: number;
  dt: number;
}

export interface State {
  actors: IActor[];
}

/** 服务端状态同步 */
export interface StateFromServer {
  state: State | undefined;
  input: InputFromClient[];
}

export interface GameServiceGrpcClient {
  enterGame(request: EnterGameReq, ...rest: any): Observable<EnterGameRes>;

  getPlayer(request: GetPlayerReq, ...rest: any): Observable<EnterGameRes>;

  getPlayers(request: ListActorReq, ...rest: any): Observable<ListActorRes>;
}

export interface GameServiceGrpcController {
  enterGame(request: EnterGameReq, ...rest: any): Promise<EnterGameRes> | Observable<EnterGameRes> | EnterGameRes;

  getPlayer(request: GetPlayerReq, ...rest: any): Promise<EnterGameRes> | Observable<EnterGameRes> | EnterGameRes;

  getPlayers(request: ListActorReq, ...rest: any): Promise<ListActorRes> | Observable<ListActorRes> | ListActorRes;
}

export function GameServiceGrpcControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["enterGame", "getPlayer", "getPlayers"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("GameServiceGrpc", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("GameServiceGrpc", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const GAME_SERVICE_GRPC_SERVICE_NAME = "GameServiceGrpc";
