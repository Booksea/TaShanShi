FROM python:3.7
MAINTAINER Jeffrey
WORKDIR /root/server
ADD . /root/server
RUN rm -f /etc/localtime
RUN ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone
RUN python3.7 -m pip install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple/
RUN python3.7 -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
ENTRYPOINT gunicorn -w 1 -b 0.0.0.0:5000 starter:app --worker-class eventlet --reload
