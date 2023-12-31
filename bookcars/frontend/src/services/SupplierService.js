import axios from 'axios'
import Env from '../config/env.config'
import * as UserService from './UserService'

export const getAllCompanies = () => axios.get(`${Env.API_HOST}/api/all-suppliers`).then((res) => res.data)

export const getCompanies = (keyword, page, size) =>
  axios.get(`${Env.API_HOST}/api/suppliers/${page}/${size}/?s=${encodeURIComponent(keyword)}`, { headers: UserService.authHeader() }).then((res) => res.data)
