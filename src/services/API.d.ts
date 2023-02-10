declare namespace API {
  /**
   * 分页信息
   */
  interface PageInfo<T> {
    current: number;
    pageSize: number;
    total: number;
    list?: T[];
  }

  /**
   * 分页请求
   */
  interface PageRequest {
    current?: number;
    pageSize?: number;
  }
}
