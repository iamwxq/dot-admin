export enum ContentTypeEnum {
  TEXT = "text/plain;charset=UTF-8",
  JSON = "application/json;charset=UTF-8",
  FORM_DATA = "multipart/form-data;charset=UTF-8",
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
}

export enum HttpEnum {
  TIMEOUT = 30_000,

  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPTION = "OPTION",
}

export enum CodeEnum {
  SUCCESS = 200,
  ERROR = 500,
  OVERDUE = 401,
}
