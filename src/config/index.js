/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  development:{
    baseApi:'/',
    mockApi:'https://www.fastmock.site/mock/ebb7d3b3c089086456e77d88d4393db6/api',
  },
  test:{
    baseApi:'/',
    mockApi:'https://www.fastmock.site/mock/ebb7d3b3c089086456e77d88d4393db6/api',
  },
  prod:{
    baseApi:'/',
    mockApi:'https://www.fastmock.site/mock/ebb7d3b3c089086456e77d88d4393db6/api',
  }
}

export default {
  env,
  mock:true,
  namespace:"manager",
  ...EnvConfig[env]
}
