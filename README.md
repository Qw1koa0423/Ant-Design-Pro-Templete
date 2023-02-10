# Ant Design 后台开发模板

## 开发步骤

- yarn
- yarn start

项目基本0配置

`.gitlab-ci.yml`和`Makefile`已删除如需要自行添加至根目录

请修改`package.json`中的git地址

## 开发规范

- **Commit messages**
  - [Angular Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
  - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - 格式要求：
    ```
    # 标题行：50个字符以内，描述主要变更内容
    #
    # 主体内容：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
    #
    # * 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
    # * 他如何解决这个问题? 具体描述解决问题的步骤
    # * 是否存在副作用、风险?
    #
    # 如果需要的话可以添加一个链接到其它文档或地址
    ```

# 代码规范

| 名称 | 说明 |
| --- | --- |
| 命名规范 | 1. 普通命名采用小驼峰式命名 2. 命名是复数的时候需要加 s 3. 命名需要符合语义化，尽量减少缩写的情况发生，做到见名知意，如果函数命名，可以采用加上动词前缀 |
| 变量规范 | 1. 变量定义尽量使用 const、let 2. 变量兜底 |
| 数组 | 1. 用扩展运算符（...）做数组浅拷贝 2. 使用数组解构 |
| 对象 | 1. ES6 使用属性值缩写，将属性的缩写放在对象声明的开头 2. 对象浅拷贝时，更推荐使用扩展运算符 ...使用对象解构 |
| 函数 | 1. 函数参数使用默认值替代使用条件语句进行赋值 2. 函数参数越少越好，如果参数超过两个，要使用 ES6 的解构语法，不用考虑参数的顺序。把默认参数赋值放在最后 3. 尽量使用箭头函数 4. 用命名函数表达式而不是函数声明,函数声明作用域会提升，降低了代码可读性和可维护性 5. 不要改参数，不要对参数重新赋值 6. 功能函数使用纯函数，输入一致，输出结果永远唯一 7. 优先使用函数式编程 |

- 业务数据请求推荐按照业务维度放置于[src/services]目录

## 文件目录结构

同功能放在同一个文件目录下，目录结构不要嵌套过深，文件名语义化一些，方便后续维护。

- 文件夹名称全部采用小写+"-" 来隔开；
- 避免多层嵌套，单个项目中的目录嵌套控制在最多三到四个层级内；

例子：

```css
   - src 开发目录
      - pages 视图
          - module-a 模块A
            - components 私有组件
              - ComA.tsx
              - ComB.tsx
            - index.tsx
          - module-b 模块B
      - components 公共组件
        - index.tsx 导出所有组件
        - Header
          - index.tsx
      - utils 这里是以utils为后缀，JS工具库
        - index.tsx 导出所有工具
        - a.utils.tsx
        - b.utils.tsx
      - hooks 这里是以hooks为后缀
        - index.tsx 导出所有hooks
        - a.hooks.tsx
        - b.hooks.tsx
      - services api请求,这里是以api为后缀
		- Home 按照后端微服务进行划分
        	- api.ts 请求方式
        	- typings.d.ts 类型
      - constans 常量
	  - API.d.ts 通用类型
```

## 函数命名

**命名方式** : 小驼峰方式 ( 构造函数使用大驼峰命名法 ) **命名规则** : 前缀为动词

| 动词 | 含义                            | 返回值                                            |
| ---- | ------------------------------- | ------------------------------------------------- |
| can  | 判断是否可执行某个动作 ( 权限 ) | 函数返回一个布尔值。true：可执行；false：不可执行 |
| has  | 判断是否含有某个值              | 函数返回一个布尔值。true：可执行；false：不可执行 |
| is   | 判断是否为某个值                | 函数返回一个布尔值。true：可执行；false：不可执行 |
| get  | 获取某个值                      | 函数返回一个非布尔值                              |
| set  | 设置某个值                      | 无返回值、返回是否设置成功或者返回链式对象        |

例子：

```javascript
// 是否可跳舞
function canDance(){
  return true;
}

// 获取工作
function getWork{
  return this.work
}
```

## 常量命名

**命名方法** : 全部大写**命名规范** : 使用大写字母和下划线来组合命名，下划线用以分割单词。

例子：

```javascript
const PATH = 'xxxx';
```

## 函数（方法）注释

函数(方法)注释也是多行注释的一种，但是包含了特殊的注释要求

```javascript
/**
 * 函数说明
 * @关键字
 */
复制代码;
```

常用注释关键字

| 注释名 | **语法** | 含义 | **示例** |
| --- | --- | --- | --- |
| @param | @param 参数名 {参数类型} 描述信息 | 描述参数的信息 | @param name {String} 传入名称 |
| @return | @param 参数名 {参数类型} 描述信息 | 描述返回值的信息 | @param name {String} 传入名称 |
| @author | @author 作者信息 [附属信息：如邮箱] | 描述返回值的信息 | @author 李四 2022/12/16 |
| @version | @version XX.XX.XX | 描述此函数的版本号 | @version 1.1.1 |
| @example | @example 示例代码 | 描述此函数的版本号 |  |

## 请求

**请求方法** : 小驼峰方式语义化，使用`request`。

例子：

```javascript
// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

//GET 请求

/**
 * @name 获取设备列表
 * @params current {number} 列表页码
 * @return  deviceModel {string} 设备型号
 */
export async function getDeviceList(params: DeviceType.DeviceReq /**请求参数类型*/) {
  return request<API.PageInfo<DeviceType.DeviceRes>/**返回参数类型*/>(`${API_URL/**统一的url前缀*/ }/device/list`, {
    method: 'GET',
    params,
  });
}
//POST 请求

/**
 * @name 登录接口
 * @params mobile {number} 手机号
 * @return token {string} 用户token
 */
export async function login(body: User.LoginReq /**请求参数类型*/) {
  return request<User.LoginRes/**返回参数类型*/>(`${API_URL/**统一的url前缀*/}/account/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
```
