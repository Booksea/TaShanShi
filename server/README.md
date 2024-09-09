# server

![build](https://img.shields.io/badge/build-passing-brightgreen)
![build](https://img.shields.io/badge/license-Apache%202-blue)


## 项目结构

- /app 应用包
    - /api 接口包
    - /config 配置包
    - /lib 工具包
    - /manger 第三方包
    - /model 模型包
    - /patch 增强包
    - /service 业务包
    - /validator 校验包
- /log 日志目录
- /sql 数据库文件
- .env_template 环境变量模板
- gconfig.py gunicorn配置
- starter.py 启动文件

## 开发使用

**1. 开发环境**

- Python 3.7.9
- MySQL 5.7.28

**2. 安装依赖**

方式一（推荐）：使用 pipenv 安装依赖

```shell
pipenv install
```

方式二：使用 pip 安装依赖

```shell
pip install -r requirements.txt
```

**3. 配置环境变量**

- 方式一（推荐）：配置 `.env_templaet` 文件，修改所有 `xxx` 的环境变量，比将文件重命名为 `.env`
- 方式二：直接 `config/base.py` 修改对应配置

**4. 用到的第三方服务**

- 七牛云 https://www.qiniu.com/
- Server酱 https://sct.ftqq.com/
- 腾讯位置服务 https://lbs.qq.com/

**5. 导入数据库文件**

创建一个名为 `july` 的数据库，字符集 `utf8mb4`，排序规则 `utf8mb4_general_ci`，之后将 `sql/july.sql` 导入到该数据库中即可

**6. 修改数据库模型**

若需要修改数据库模型，在 `model` 模型包中修改对应模型的字段后，执行下方命令。需要注意，必须配置好环境变量才可运行

```shell
# 初始化数据库
flask db init

# 生成迁移脚本
flask db migrate

# 更新数据库模型
flask db upgrade
```

**7. 运行**

```shell
python starter.py
```

**8. 导出依赖（无需执行）**

```shell
pipenv run pip freeze > requirements.txt
```

## 生产使用

**在此之前，请按照开发使用的第3步修改环境变量**

方式一（推荐）：Docker启动

```shell
# 构建 Dockerfile
docker build -t server .

# 运行
docker run -d -p 5000:5000 -v $(pwd):/root/server --env-file .env --name server server
```

方式二：直接启动

```shell
# 运行
gunicorn -w 1 -b 0.0.0.0:5000 starter:app --worker-class eventlet --reload

# 停止
ps aux | grep gunicorn | awk '{print $2}' | xargs kill -9
```
