# miniconda安装

## cuda安装

```
#安装cuda
sudo apt install nvidia-cuda-toolkit
#查看cuda
nvcc --version
```

## anaconda安装

x86_64位版

```
#anaconda安装
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

aarch64版

```
#pi zero 2w版本（anaconda安装）
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-aarch64.sh
bash Miniconda3-latest-Linux-aarch64.sh
```

激活conda（base）

```
source ~/miniconda3/bin/activate
conda init
conda --version
```

32位版本

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-armv7l.sh
bash Miniconda3-latest-Linux-armv7l.sh
source ~/miniconda3/bin/activate
```

## conda新建环境

```
#使用conda新建环境(先conda deactivate)
conda create --name torch_py_3p9 python=3.9
#激活新环境
conda activate torch_py_3p9
```

```
#列出所有的conda环境
conda env list
#列出所有包的版本
pip list
#退出虚拟环境
conda deactivate
```

#
