import { resolve } from "dns";
import Axios from "./core/Axios";
import { extend } from "./helpers/util";
import { AxiosInstance } from "./types";

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instacnce = Axios.prototype.request.bind(context)
  extend(instacnce, context)
  return instacnce as AxiosInstance
}
const axios = createInstance()
// axios.interceptors.request.use(config=>{
//   console.log(config)
//   return config
// },rejected)
export default axios