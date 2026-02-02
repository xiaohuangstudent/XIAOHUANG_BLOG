# Linux常用代码指令

## 基础指令

- 打开终端

```bash
ctrl+alt+T
```

- 显示当前目录

```bash
pw
```

- 显示当前目录下的所有文件

```bash
ls
```

- 显示包含隐藏文件的所有文件

```bash
ls -a
```

- 回到工作目录

```bash
cd ~
```

- 进入根目录

```bash
cd /
```

- 创建文件夹

```bash
mkdir folder1
```

- 创建空白文件

```bash
touch hello_world.txt
```

- 编辑文件

```bash
sudo apt update
sudo apt install nano
nano hello_world.txt
```

- 终端显示文件内容

```bash
cat hello_world.txt
```

- 帮助

```bash
rm --help
```

- 删除文件

```bash
rm hello_world.txt
```

- 查看历史指令

```bash
history
```

- 输出指令，即输出“hello”

```bash
echo hello
```

- 查看ROS版本（通过环境变量$）

```bash
echo $ROS_VERSION
echo $ROS_DISTRO
printenv  #打印所有环境变量
```

- 过滤指令

```bash
#对printenv的结果进行过滤找到关于AMENT的指令
printenv  | grep AMENT
#输出：AMENT_PREFIX_PATH=/opt/ros/jazzy
```

- 查看发行版本信息

AM970 运行的是**定制化的嵌入式Linux**

```bash
cat /etc/os-release
```

使用的是Buildroot系统

```bash
root@AMICRO:~#cat /etc/os-release
NAME=Buildroot
VERSION=2021.02
ID=buildroot
VERSION_ID=2021.02
PRETTY_NAME="Buildroot 2021.02"
```

PC使用的是ubuntu

```bash
xiaohuang@xiaohuang:~$ cat /etc/os-release
PRETTY_NAME="Ubuntu 24.04.3 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
VERSION="24.04.3 LTS (Noble Numbat)"
VERSION_CODENAME=noble
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=noble
LOGO=ubuntu-logo
```

关机、重启

```
sudo poweroff
sudo reboot
```

查看系统使用

```
#gpu温度
vcgencmd measure_temp
#gpu用度
vcgencmd get_mem gpu
```
