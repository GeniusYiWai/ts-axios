import { transformRequest, transformResponse } from "../helpers/data";
import { processHeaders } from "../helpers/headers";
import { buildURL } from "../helpers/url";
import { AxiosRequestConfig, AxiosResponse } from "../types";
import xhr from "./xhr";

function dispatchRequest(config: AxiosRequestConfig) {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformData(config)
}
function transformURL(config: AxiosRequestConfig) {
  return buildURL(config.url!, config.params)
}
function transformData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transformResponseData(res: AxiosResponse) {
  res.data = transformResponse(res.data)
  return res
}
export default dispatchRequest