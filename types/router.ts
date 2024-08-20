import type React from "react";
import type { Params, RouteObject } from "react-router-dom";

export interface RouteMeta {
  key: string;
  label: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  hideInMenu?: boolean;
  hideInTab?: boolean;
  disabled?: boolean;
  outlet?: any;
  timestamp?: string;
  params?: Params<string>;
}

export type AppRouteObject = {
  order?: number;
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, "children">;
