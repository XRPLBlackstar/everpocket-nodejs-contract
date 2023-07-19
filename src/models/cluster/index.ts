import { AcquiredNode, PendingAcquire } from "../evernode";

export interface ClusterOptions {
  maturityLclThreshold?: number;
  quorumPercentage?: number;
  targetSignerPercentage?: number;
}

export interface ClusterNode extends AcquiredNode {
  createdOnLcl: number;
  addedToUnlOnLcl?: number;
  ackReceivedOnLcl?: number;
  activeOnLcl?: number;
  isUnl: boolean;
  signerAddress?: string;
  createdOnTimestamp?: number;
  lifeMoments: number;
  targetLifeMoments: number;
}

export interface PendingNode extends PendingAcquire {
  targetLifeMoments: number;
  aliveCheckCount: number;
}

export interface ClusterData {
  initialized: boolean;
  nodes: ClusterNode[];
  pendingNodes: PendingNode[];
}

export interface ClusterMessage {
  type: ClusterMessageType;
  data?: any;
}

export interface ClusterMessageResponse {
  type: ClusterMessageType;
  status: ClusterMessageResponseStatus;
  data?: any;
}

export enum ClusterMessageType {
  MATURED = "maturity_ack",
  CLUSTER_NODES = "cluster_nodes",
  UNKNOWN = "unknown"
}

export enum ClusterMessageResponseStatus {
  OK = "ok",
  FAIL = "fail",
  UNHANDLED = "unhandled"
}
