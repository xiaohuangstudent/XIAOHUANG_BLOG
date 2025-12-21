[TOC]

# 文件测试

```
if __name__=="__main__":
```

## pip

源

```
-i https://pypi.tuna.tsinghua.edu.cn/simple
```

回复默认镜像源

```
pip config unset global.index-url
```

包

```
pip install numpy
```

## cmd

切换路径

```
cd /d D:\桌面\apktest
```

- `/d` 参数用于切换驱动器（从 `C:` 切换到 `D:`）。
- `D:\桌面\apktest` 是目标路径

## apk 打包

```
cd /d D:\桌面\apktest
```

```
buildozer init
```

```
buildozer -v android debug
```

# numpy

```
import numpy as np
```

## 生成

### arange(X)

定间隔序列：生成从 0 到 10 等间隔为 0.1 的数据

```
import numpy as np
# 生成从0到10，步长为0.1的数据
data = np.arange(0, 10.1, 0.1)
# 打印结果
print(data)
```

输出

```
[ 0.   0.1  0.2  0.3  0.4  0.5  0.6  0.7  0.8  0.9  1.   1.1  1.2  1.3
  1.4  1.5  1.6  1.7  1.8  1.9  2.   2.1  2.2  2.3  2.4  2.5  2.6  2.7
  2.8  2.9  3.   3.1  3.2  3.3  3.4  3.5  3.6  3.7  3.8  3.9  4.   4.1
  4.2  4.3  4.4  4.5  4.6  4.7  4.8  4.9  5.   5.1  5.2  5.3  5.4  5.5
  5.6  5.7  5.8  5.9  6.   6.1  6.2  6.3  6.4  6.5  6.6  6.7  6.8  6.9
  7.   7.1  7.2  7.3  7.4  7.5  7.6  7.7  7.8  7.9  8.   8.1  8.2  8.3
  8.4  8.5  8.6  8.7  8.8  8.9  9.   9.1  9.2  9.3  9.4  9.5  9.6  9.7
  9.8  9.9 10. ]
```

### linspace(X,X,X)

等间隔序列

```
import numpy as np
# 生成从0到10的100个等间隔的数据
data = np.linspace(0, 10, 5)
# 打印结果
print(data)
```

输出

```
[ 0.   2.5  5.   7.5 10. ]
```

### full()

### array(X)

```
np.array(object)
```

- object：可以是列表、元组、其他 NumPy 数组或类似数组的对象。np.array() 会将这些数据转换为一个 NumPy 数组。

```
import numpy as np
boxes = [
    [100, 200, 150, 250],  # 第一个框
    [200, 300, 250, 350],  # 第二个框
    [50, 100, 75, 125]     # 第三个框
]
boxes_array = np.array(boxes)
print(boxes_array)
# 输出:
# [[100 200 150 250]
#  [200 300 250 350]
#  [ 50 100  75 125]]
```

含 dtype 设置

```
r_array = np.array([
    [-1, -1, -1, -1, 0, -1],
    [-1, -1, -1, 0, -1, 100],
    [-1, -1, -1, 0, -1, -1],
    [-1, 0, 0, -1, 0, -1],
    [0, -1, -1, 0, -1, 100],
    [-1, 0, -1, -1, 0, 100]], dtype=np.float32)
```

### zeros(X)

用来创建一个由零填充的数组。`X` 可以是一个整数或者整数元组，用来指定数组的形状。

```
import numpy as np
np.zeros(shape, dtype=float, order='C')
```

- `shape`：指定数组的形状。可以是一个整数（表示一维数组的大小），也可以是一个元组（表示多维数组的形状）。
- `dtype`：指定数组元素的数据类型。默认是 `float`。
- `order`：数组在内存中的存储顺序。`C` 表示按行存储（C-style），`F` 表示按列存储（Fortran-style）。

示例

一维全零数组

```
import numpy as np
# 创建一个包含 5 个零的一维数组
array1 = np.zeros(5)
print(array1)
# Output: [0. 0. 0. 0. 0.]
```

二维全零数组

```
import numpy as np
# 创建一个 2x3 的二维数组，元素为零
array2 = np.zeros((2, 3))
print(array2)
```

### meshgrid(X,X)

```
x = np.linspace(-1, 2, 5)  # x 从 -5 到 5，生成 100 个点
y = np.linspace(-5, 5, 10)  # y 从 -5 到 5，生成 100 个点
x, y = np.meshgrid(x, y)     # 生成二维网格数据
```

输出

```
x= [[-1.   -0.25  0.5   1.25  2.  ]
 [-1.   -0.25  0.5   1.25  2.  ]
 [-1.   -0.25  0.5   1.25  2.  ]
 [-1.   -0.25  0.5   1.25  2.  ]
 [-1.   -0.25  0.5   1.25  2.  ]
 [-1.   -0.25  0.5   1.25  2.  ]
 [-1.   -0.25  0.5   1.25  2.  ]
 [-1.   -0.25  0.5   1.25  2.  ]
 [-1.   -0.25  0.5   1.25  2.  ]
 [-1.   -0.25  0.5   1.25  2.  ]]
y= [[-5.         -5.         -5.         -5.         -5.        ]
 [-3.88888889 -3.88888889 -3.88888889 -3.88888889 -3.88888889]
 [-2.77777778 -2.77777778 -2.77777778 -2.77777778 -2.77777778]
 [-1.66666667 -1.66666667 -1.66666667 -1.66666667 -1.66666667]
 [-0.55555556 -0.55555556 -0.55555556 -0.55555556 -0.55555556]
 [ 0.55555556  0.55555556  0.55555556  0.55555556  0.55555556]
 [ 1.66666667  1.66666667  1.66666667  1.66666667  1.66666667]
 [ 2.77777778  2.77777778  2.77777778  2.77777778  2.77777778]
 [ 3.88888889  3.88888889  3.88888889  3.88888889  3.88888889]
 [ 5.          5.          5.          5.          5.        ]]
```

### concatenate(X)

用于将两个或多个数组沿指定轴（axis）连接（拼接）起来的函数。它可以用于一维、二维或多维数组的拼接。

- 沿着哪个轴拼，哪个轴就维度就变大

```
numpy.concatenate((a1, a2, ...), axis=0, out=None)
```

- **`a1, a2, ...`**：要连接的数组，传递一个序列（如列表或元组），其中包含多个数组。这些数组的形状必须在拼接轴上兼容，即除了拼接的轴之外，其他维度的大小必须相同。
- **`axis`**：指定拼接的轴（默认为 0）。如果为 0，则沿着第一个轴（行方向）拼接；如果为 1，则沿着第二个轴（列方向）拼接。对于更高维的数组，可以指定其他轴。
- **`out`**：可选参数，指定输出数组。如果没有提供，`concatenate` 会返回一个新的数组。
- `axis=-1` 代表沿着数组的最后一个轴进行操作

示例 1

```
import numpy as np

# 创建两个一维数组
arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])

# 沿着 axis=0（默认）拼接
result = np.concatenate((arr1, arr2))

print(result)

```

输出

```
[1 2 3 4 5 6]
```

示例 2：列变多（二维）

```
import numpy as np

# 创建两个二维数组
arr1 = np.array([[1, 2, 3], [4, 5, 6]])
arr2 = np.array([[7, 8, 9], [10, 11, 12]])

# 沿着 axis=1 拼接（列拼接，列变多）
result = np.concatenate((arr1, arr2), axis=1)

print(result)

```

输出

```
[[ 1  2  3  7  8  9]
 [ 4  5  6 10 11 12]]
```

示例 3：行变多

```
import numpy as np

# 创建两个二维数组
arr1 = np.array([[1, 2, 3], [4, 5, 6]])
arr2 = np.array([[7, 8, 9], [10, 11, 12]])

# 沿着 axis=0 拼接（行拼接）
result = np.concatenate((arr1, arr2), axis=0)

print(result)

```

输出

```
[[ 1  2  3]
 [ 4  5  6]
 [ 7  8  9]
 [10 11 12]]
```

### random

#### rand(X,X)

生成在 [0, 1) 范围内均匀分布的随机数

```
import numpy as np

# 生成一个 3x3 的二维数组，随机数均匀分布在 [0, 1)
random_array = np.random.rand(3, 3)
print(random_array)
```

输出

```
[[0.53211785 0.37498243 0.05767906]
 [0.05356777 0.9937622  0.35413349]
 [0.19451724 0.06929093 0.63572458]]
```

#### uniform(X,X,X)

生成在 `[low, high)` 范围内的均匀分布的随机数。

```
numpy.random.uniform(low, high, size)
```

示例

```
# 生成一个 3x3 的二维数组，随机数均匀分布在 [10, 20) 范围内
random_array = np.random.uniform(10, 20, size=(3, 3))
print(random_array)

```

输出

```
[[16.24967916 14.42991167 13.27096755]
 [12.83481596 16.82261884 18.46380928]
 [11.99405017 18.34118886 12.08456046]]
```

#### randn(X,X)

生成标准正态分布（均值 0，标准差 1）的随机数。

示例

```
# 生成一个 3x3 的二维数组，随机数符合标准正态分布
random_array = np.random.randn(3, 3)
print(random_array)
```

输出

```
[[ 0.01206453 -0.56885274  1.09912785]
 [-0.58104339  0.7795063   0.46722576]
 [ 0.1194159   1.37870185  1.35873444]]
```

#### normal(X,X,X)

生成均值为 `loc`、标准差为 `scale` 的正态分布随机数

```
numpy.random.normal(loc, scale, size)
```

示例

```
# 生成一个 3x3 的二维数组，随机数符合均值为 5，标准差为 2 的正态分布
random_array = np.random.normal(loc=5, scale=2, size=(3, 3))
print(random_array)
```

输出

```
[[ 4.04278939  5.53650695  5.32420281]
 [ 3.72218741  3.92079686  5.17382603]
 [ 7.04236052  4.4249029   6.74998278]]
```

#### randint(X,X,X)

生成在 `[low, high)` 范围内的随机整数。

```
numpy.random.randint(low, high, size)
```

示例

```
# 生成一个 3x3 的二维数组，随机整数范围在 [1, 10)
random_array = np.random.randint(1, 10, size=(3, 3))
print(random_array)
```

输出

```
[[4 9 3]
 [5 8 1]
 [6 7 3]]
```

#### choice

生成一个数组，数组元素从给定的 `a` 中选择，可以指定概率 `p`

```
numpy.random.choice(a, size, replace, p)
```

示例

```
# 生成一个 3x3 的布尔数组，随机选择 True 或 False
random_array = np.random.choice([True, False], size=(3, 3))
print(random_array)
```

输出

```
[[False  True False]
 [ True False  True]
 [False  True False]]
```

### split

- 可以实践 n 个一组分割数组，和 1 组 n 个分割数组
- 按索引分割

```
numpy.split(ary, indices_or_sections, axis=0)
```

- **`ary`**：要分割的数组。可以是任意形状的 NumPy 数组。
- `indices_or_sections`：
  - 如果是一个整数，表示将数组分割成该数量的子数组。
  - 如果是一个数组或列表，表示在指定的索引处进行分割（根据索引数组指定的点进行分割）。
- **`axis`**：默认是 `0`，表示沿着第一个轴（行方向）进行分割。如果将其设置为 `1`，则表示沿着第二个轴（列方向）分割。

示例：

```
import numpy as np
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
#分成5份
result1 = np.split(arr, 5)
print(result1)
#5个1组
result2 = np.split(arr, len(arr)//5)
print(result2)
```

输出

```
[array([1, 2]), array([3, 4]), array([5, 6]), array([7, 8]), array([ 9, 10])]
[array([1, 2, 3, 4, 5]), array([ 6,  7,  8,  9, 10])]
```

示例 2：

按索引分割

```
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
indices = [3, 7]  # 在索引 3 和 7 处进行分割
result = np.split(arr, indices)
print(result)
```

输出

```
[array([1, 2, 3]), array([4, 5, 6, 7]), array([ 8,  9, 10])]
```

### 切片

#### [0]与 0

```
import numpy as np
mask_array=np.random.rand(30,20,50)
print(mask_array[:,:,[0]].shape)
print(mask_array[:, :, 0].shape)
```

输出

```
(30, 20, 1)
(30, 20)
```

## 运算

### true_divide(X,X)

真除法

```
x = np.array([5, 10, 15])
y = np.array([2, 4, 5])
result = np.true_divide(x, y)
print(result)  # 输出: [2.5 2.5 3. ] (即使输入是整数，结果仍为浮动数)
```

- 除数为零的情况是不会报错，对应项输出 inf
- **处理整数除法**：在 Python 3 中，`/` 运算符默认执行浮点除法。然而，如果两个操作数是整数，`//` 执行的是整数除法。`np.true_divide` 确保了无论输入是否为整数，结果始终是浮点数。
- **避免溢出**：`np.true_divide` 能够以浮动精度的方式进行除法，避免了使用普通整数除法时可能会出现的溢出问题。

## 比较

### min(X)

```
np.max([1,2,3,4])
```

注意[]

### max(X)

```
np.max([1,2,3,4])
```

注意[]

### maximun(X,X)

逐位取大

```
np.maximum(x1, x2)
```

```
np.maximun(1,5)  #这个可以但是如果是max就会报错，必须加[]
np.maximum([1,2,3,4],2)   #np.max([1,2,3,4])
#不能超过三个
print(np.maximum([1,2,3,4],2))
print(np.maximum(2,[1,2,3,4]))
```

## 排序

### argsort()

`argsort()` 用于返回数组排序后元素的索引。

`argsort()` 返回的是原始数组中元素按照排序顺序的索引（而不是排序后的值）。

X.argsort()

np.argsort(X)

```
numpy.argsort(a, axis=-1, kind='quicksort', order=None)
```

- `a`：输入数组，可以是任意形状的数组。
- `axis`：指定沿哪个轴排序，默认为 `-1`（即最后一个轴）。如果数组是二维的，`axis=0` 表示按列排序，`axis=1` 表示按行排序。
- `kind`：指定排序算法，可选值为 `'quicksort'`, `'mergesort'`, `'heapsort'` 或 `'stable'`。默认值是 `'quicksort'`。
- `order`：如果输入的是结构化数组，可以通过该参数指定按照某些字段排序。
- 按升序排序，要降序则反转

示例

升序

```
import numpy as np

arr = np.array([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])
indices_1 = np.argsort(arr)
indices_2 = arr.argsort()
print("原始数组:", arr)
print("排序后的索引1:", indices_1)
print("排序后的索引2:", indices_2)

```

输出

```
原始数组: [3 1 4 1 5 9 2 6 5 3 5]
排序后的索引1: [ 1  3  6  0  9  2  8  4 10  7  5]
排序后的索引2: [ 1  3  6  0  9  2  8  4 10  7  5]
```

降序

```
arr = np.array([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])

# 降序排序
indices_desc = np.argsort(arr)[::-1]

print("按降序排列的索引:", indices_desc)

```

## 查找

### where(X)

```
numpy.where(condition, [x, y])
```

- **`condition`**: 一个布尔型数组或条件表达式。该条件会对输入数组的每个元素进行评估，结果是一个布尔值数组。
- **`x`**: 如果条件为 `True`，则返回此值。
- **`y`**: 如果条件为 `False`，则返回此值。
- way1:获取满足条件的元素索引：np.where(X> 3)
- way2:根据条件返回不同的值:np.where(arr > 3, 'greater', 'less or equal')

示例 1

```
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
result = np.where(arr > 3, 'g', 'lore')
print(result)
```

输出

```
['lore' 'lore' 'lore' 'g' 'g']
```

示例 2

```
import numpy as np
arr2 = np.array([[1, 2, 3, 4, 5],[5,4,3,2,1]])
result2 = np.where(arr2 > 3)
print(result2)
```

输出

```
(array([0, 0, 1, 1]), array([3, 4, 0, 1]))
```

## 统计

### unique

返回频数

```
import numpy as np

data = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
values, counts = np.unique(data, return_counts=True)
print(dict(zip(values, counts)))
```

输出

```
{'apple': 3, 'banana': 2, 'orange': 1}
```

## 数组类方法

### X.reshape(X)

# panda

## panda 类方法

### X.value_counts()

频数统计

```
import pandas as pd

data = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
series = pd.Series(data)
freq = series.value_counts()
print(freq)
```

输出：

```
apple     3
banana    2
orange    1
Name: count, dtype: int64
```

# zip

```
a=(2,4,6,7)
print(list(zip(a,a)))
```

输出

```
[(2, 2), (4, 4), (6, 6), (7, 7)]
```

# matplotlib

```
pip install matplotlib
```

```
%matplotlib inline  #jupyter的内嵌显示
```

## pyplot

### rcParams[]

绘图显示问题解决

```
import matplotlib.pyplot as plt
# 设置中文显示
plt.rcParams['font.sans-serif'] = ['Microsoft YaHei']  # 使用微软雅黑字体
plt.rcParams['axes.unicode_minus'] = False  # 解决负号显示问题
```

```
import matplotlib
matplotlib.use('TkAgg')  # 或者 'Agg' 后端
```

### plot

参数

| 参数         | 说明     | 示例值                          |
| ------------ | -------- | ------------------------------- |
| `x`, `y`     | 数据点   | `x = np.linspace(0, 10, 100)`   |
| `linestyle`  | 线型     | `'-', '--', ':', '-.'`          |
| `color`      | 线条颜色 | `'r', 'g', 'b', 'k', '#FF5733'` |
| `marker`     | 标记样式 | `'o', 'x', 's', '^'`            |
| `markersize` | 标记大小 | `10`                            |
| `linewidth`  | 线条宽度 | `2`                             |
| `alpha`      | 透明度   | `0.5`                           |
| `label`      | 图例标签 | `'sin(x)'`                      |
| `xlim`       | x 轴范围 | `[0, 10]`                       |
| `ylim`       | y 轴范围 | `[-1, 1]`                       |
| `zorder`     | 绘制顺序 | `10`                            |

```
# 示例数据
x = np.linspace(0, 10, 100)
y = np.sin(x)

# 绘制带有多种定制的图形
plt.plot(x, y,
         linestyle='--',  # 虚线
         marker='o',      # 圆形标记
         color='b',       # 蓝色
         markersize=5,    # 标记大小
         linewidth=2,     # 线宽
         alpha=0.7,       # 透明度
         label='sin(x)')  # 标签
```

- 一维绘图

exp1

绘制以下函数曲线

$$
f(x)=x^2-8sin(2x+\pi)
$$

```
from scipy.optimize import brent, fmin_ncg, minimize
import numpy as np
import matplotlib.pyplot as pyplot
# 1. Demo1：单变量无约束优化问题(Scipy.optimize.brent)
def objf(x):  # 目标函数
    fx = x**2 - 8*np.sin(2*x+np.pi)
    return fx
x=np.arange(-8,5,0.01)
pyplot.plot(x,objf(x))
```

<img src="/docs/python语法/代码语法_localdata/image-20250124145146176.png" alt="image-20250124145146176" style="zoom: 33%;" />

exp2

```
import matplotlib.pyplot as plt
# 创建数据
x = [0, 1, 2, 3, 4]
y = [0, 1, 4, 9, 16]
# 绘制折线图
plt.plot(x, y)
# 添加标题和标签
plt.title("Basic Line Plot")
plt.xlabel("X Axis")
plt.ylabel("Y Axis")
# 显示图表
plt.show()
```

输出

<img src="/docs/python语法/代码语法_localdata/image-20250124151049413.png" alt="image-20250124151049413" style="zoom:33%;" />

### figure(X)

提高绘图像素

```
plt.figure(dpi=300)  # 提高分辨率
```

#### 类方法

#### add_axes

##### add_subplot()

- 创建 3D 坐标轴

```
# 创建图形对象
fig = plt.figure(dpi=300)
# 创建 3D 坐标轴
ax = fig.add_axes([0, 0, 1, 1], projection='3d')
```

##### plot_surface(X,X,X)

```
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# 创建网格数据
x = np.linspace(-5, 5, 100)  # x 从 -5 到 5，生成 100 个点
y = np.linspace(-5, 5, 100)  # y 从 -5 到 5，生成 100 个点
x, y = np.meshgrid(x, y)     # 生成二维网格数据

# 定义 z = f(x, y) 函数（例如：z = sin(sqrt(x^2 + y^2))）
z = np.sin(np.sqrt(x**2 + y**2))

# 创建图形对象
fig = plt.figure(dpi=300)
# 创建 3D 坐标轴
ax = fig.add_axes([0, 0, 1, 1], projection='3d')
# 绘制曲面图
ax.plot_surface(x, y, z, cmap='viridis')
# 设置标题和标签
ax.set_title('3D Surface Plot')
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
# 显示图形
plt.show()
```

- **left**：坐标轴左侧距离画布左边缘的相对位置，取值范围为 0 到 1，其中 0 表示完全靠左，1 表示完全靠右。
- **bottom**：坐标轴底部距离画布底边缘的相对位置，取值范围为 0 到 1，其中 0 表示完全靠底，1 表示完全靠上。
- **width**：坐标轴的宽度，取值范围为 0 到 1，表示相对于画布的宽度的比例。
- **height**：坐标轴的高度，取值范围为 0 到 1，表示相对于画布的高度的比例。

- `left = 0`：坐标轴的左边界与画布的左边界对齐。
- `bottom = 0`：坐标轴的底边界与画布的底边界对齐。
- `width = 1`：坐标轴的宽度占满整个画布的宽度。
- `height = 1`：坐标轴的高度占满整个画布的高度。

<img src="/docs/python语法/代码语法_localdata/image-20250124175308429.png" alt="image-20250124175308429" style="zoom: 25%;" />

透明度修改

```
ax.plot_surface(x,y,z,cmap='viridis',alpha=0.2)
```

##### plot3D

绘制三维曲线

## use(X)

绘图后端报错解决

> Traceback (most recent call last):
> canvas_class = module.FigureCanvas
> AttributeError: module 'backend_interagg' has no attribute 'FigureCanvas'
>
> ```
> import matplotlib
> matplotlib.use('TkAgg')  # 或者 'Qt5Agg'
> import matplotlib.pyplot as plt
> ```

# collections

## Counter

频数统计

```
from collections import Counter

data = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
freq = Counter(data)
print(freq)
```

输出

```
Counter({'apple': 3, 'banana': 2, 'orange': 1})
```

# scipy

## optimize

- brent()：单变量无约束优化问题，混合使用牛顿法/二分法。
- fmin()：多变量无约束优化问题，使用单纯性法，只需要利用函数值，不需要函数的导数或二阶导数。
- leatsq()：非线性最小二乘问题，用于求解非线性最小二乘拟合问题。
- minimize()：约束优化问题，使用拉格朗日乘子法将约束优化转化为无约束优化问题。

### brent()

单变量无约束优化问题

**optimize.brent() 的主要参数：**

- **func: callable f(x,\*args)** 　目标函数 f(x)f(x)，以函数形式表示，可以通过 \*args 传递参数
- **args: tuple**　　可选项，以 f(x,\*args) 的形式将可变参数 p 传递给目标函数 f(x,p)f(x,p) 。
- **brack: tuple**　　可选项，搜索算法的开始区间（不是指 x 的上下限）

**optimize.brent() 的主要返回值：**

- **xmin: ** 　　返回函数达到最小值时的 x（注意是局部最优，不一定是全局最优）。
- **fval: ** 　　返回函数的最优值（默认不返回，仅当 full_output 为 1 时返回）。

例题

$$
f(x)=x^2-8*sin(2x+\pi)
$$

代码

最简

```
from scipy.optimize import brent
import numpy as np
import matplotlib.pyplot as plt
# 1. Demo1：单变量无约束优化问题(Scipy.optimize.brent)
def objf(x):  # 目标函数
    fx = x**2 - 8*np.sin(2*x+np.pi)
    return fx
plt.figure()
# 初始值
xIni = -5.0
# 调用brent进行优化
xOpt = brent(objf, brack=(xIni, 1))
print("最优自变量{0:.4f},最优目标函数{1:.4f}".format(xOpt,objf(xOpt)))

```

绘图

```
from scipy.optimize import brent
import numpy as np
import matplotlib.pyplot as plt
recorder=[[],[]]
# 1. Demo1：单变量无约束优化问题(Scipy.optimize.brent)
def objf(x):  # 目标函数
    global recorder
    fx = x**2 - 8*np.sin(2*x+np.pi)
    recorder[0].append(x)
    recorder[1].append(fx)
    return fx
plt.figure()
# 初始值
xIni = -5.0
# 调用brent进行优化
xOpt = brent(objf, brack=(xIni, 1))
print("最优自变量{0:.4f},最优目标函数{1:.4f}".format(xOpt,objf(xOpt)))
# 绘制目标函数曲线
x = np.arange(-8, 12, 0.01)
plt.plot(x, objf(x)) #原始数据
plt.plot(recorder[0][:-1],recorder[1][:-1],linestyle="--")  #迭代过程
plt.scatter(recorder[0][:-1],recorder[1][:-1],c="r")  #迭代过程
plt.title("brent优化")
plt.show()

```

<img src="/docs/python语法/代码语法_localdata/image-20250124173356967.png" alt="image-20250124173356967" style="zoom:33%;" />

### fmin()

多变量无约束优化问题

**optimize.fmin() 的主要参数：**

- **func: callable f(x,\*args)** 　目标函数 f(x)f(x)，以函数形式表示，可以通过 \*args 传递参数。
- **x0: nadarray**　　搜索算法的初值。
- **args: tuple**　　可选项，以 f(x,\*args) 的形式将可变参数 p 传递给目标函数 f(x,p) 。

**optimize.fmin() 的主要返回值：**

- **xopt: ** 　　返回最小值时的 x 值。
- **fopt: ** 　　返回最小值时的目标函数值，fopt=func(xopt)。

exp1

测试以下函数（Rosenbrock 测试函数），自变量为$(x_1,x_2,\dots,x_n)$

$$
f(x)=\sum_{i=1}^{n-1}[100(x_{i+1}-x_i^2)^2+(1-x_i)^2]
$$

当函数为

$$
f(x)=100(x_1-x_0^2)^2+(1-x_0)^2
$$

代码

最简

```
from scipy.optimize import brent, fmin, minimize
import numpy as np

# 2. Demo2：多变量无约束优化问题(Scipy.optimize.brent)
# Rosenbrock 测试函数
def objf2(x):  # Rosenbrock benchmark function
    fx = sum(100.0 * (x[1:] - x[:-1] ** 2.0) ** 2.0 + (1 - x[:-1]) ** 2.0)
    return fx

xIni = np.array([-2, -2])
xOpt = fmin(objf2, xIni)
print("最优自变量{0},最优目标函数{1:.4f}".format(xOpt,objf2(xOpt)))
```

绘图

exp2：测试以下函数

$$
f(x)=\sum_{i=1}^{n}[x_i^2-10cos(2\pi x_i)+10]
$$

二维示例

```python
#fmin二维测试显示
from scipy.optimize import  fmin, minimize
import numpy as np
import matplotlib.pyplot as plt
recorder=[[],[],[]] #x,y,val
# 2. Demo2：多变量无约束优化问题(Scipy.optimize.brent)
# Rosenbrock 测试函数
def objf2(x):  # Rosenbrock benchmark function
    fx = sum(x**2-10*np.cos(2*np.pi*x)+10)
    recorder[0].append(x[0])
    recorder[1].append(x[1])
    recorder[2].append(fx)
    return fx
def objf2_f(x,y):
    fx = x**2-10*np.cos(2*np.pi*x)+10+y**2-10*np.cos(2*np.pi*y)+10
    return fx
xIni = np.array([-2, -2])
xOpt = fmin(objf2, xIni)
x=np.arange(-4,2,0.01)
y=np.arange(-4,2,0.01)
z=np.array([[objf2_f(x[i],y[j]) for i in range(len(x))] for j in range(len(y))]) #生成z
x,y=np.meshgrid(x,y) #生成x,y
fig=plt.figure(dpi=100)
ax=fig.add_axes([0,0,1,1],projection='3d')
ax.plot_surface(x,y,z,cmap='viridis',alpha=0.1)
ax.plot3D(recorder[0],recorder[1],recorder[2],'r-')
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
print("最优自变量{0},最优目标函数{1:.4f}".format(xOpt,objf2(xOpt)))
plt.show()

```

绘图（显然落入局部最优解）

<img src="/docs/python语法/代码语法_localdata/image-20250124185951933.png" alt="image-20250124185951933" style="zoom:33%;" />

### minimize()

调用多种算法，支持约束优化和无约束优化

**optimize.minimize() 的默认算法为 BFGS, L-BFGS-B, SLSQP（取决于问题有没有边界条件和约束条件），可以通过 "method=None" 选项调用多种算法：**

**optimize.minimize() 的主要参数：**

- **fun: callable f(x,\*args)** 　目标函数 f(x)f(x)，以函数形式表示，可以通过 \*args 传递参数。
- **x0: nadarray**, shape(n,)　　搜索算法的初值，n 是决策变量个数。
- **args: tuple**　　可选项，将可变参数传递给目标函数 fun、导数函数 jac 和二阶导数函数 hess。
- **method: str**　　可选项，选择优化算法。默认算法为 BFGS, L-BFGS-B, SLSQP（取决于问题有没有边界条件和约束条件）
- **jac: **　　可选项，梯度计算方法。可以以函数形式表示，或选择 '2-point', '3-point', 'cs'。该选项只能用于 CG, BFGS, Newton-CG, L-BFGS-B, TNC, SLSQP, dogleg, trust-ncg, trust-krylov, trust-exact 和 trust-constr 算法。
- **hess: **　　可选项，Hessian 矩阵计算方法。可以以函数形式表示，或选择 '2-point', '3-point', 'cs'。该选项只能用于 Newton-CG, dogleg, trust-ncg, trust-krylov, trust-exact 和 trust-constr 算法。
- **bounds: **　　可选项，变量的边界条件（上下限，lb<=x<=ub）。该选项只能用于 Nelder-Mead, L-BFGS-B, TNC, SLSQP, Powell 和 trust-constr 算法。
- **constraints: **　　可选项，定义约束条件 f(x)>=0。该选项只能用于 COBYLA, SLSQP 和 trust-constr 算法，注意不同算法中对于约束条件的定义是不同的。

**optimize.minimize() 的主要返回值：**

- **res: ** 　　返回优化结果，以对象方式表示，主要包括优化是否成功、决策变量的优化值 xOpt。

**无约束问题优化算法**

- **method=‘CG’ **：　　非线性共轭梯度算法，只能处理无约束优化问题，需要使用一阶导数函数。
- **method=‘BFGS’ **：　　 BFGS 拟牛顿法，只能处理无约束优化问题，需要使用一阶导数函数。BFGS 算法性能良好，是无约束优化问题的默认算法。
- **method=‘Newton-CG’ **：　　截断牛顿法，只能处理无约束优化问题，需要使用一阶导数函数，适合处理大规模问题。
- **method=‘dogleg’ **：　　 dog-leg 信赖域算法，需要使用梯度和 Hessian（必须正定），只能处理无约束优化问题，
- **method=‘trust-ncg’ **：　　采用牛顿共轭梯度信赖域算法，需要使用梯度和 Hessian（必须正定），只能处理无约束优化问题，适合大规模问题。
- **method=‘trust-exact’**：　　求解无约束极小化问题的信赖域方法，需要梯度和 Hessian（不需要正定）。
- **method=‘trust-krylov’**：　　使用 Newton-GLTR 信赖域算法度，需要使用梯度和 Hessian（必须正定），只能处理无约束优化问题，适合中大规模问题。

**边界约束条件问题优化算法**

- **method=‘Nelder-Mead’**：　　下山单纯性法，可以处理边界约束条件（决策变量的上下限），只使用目标函数，不使用导数函数、二阶导数，鲁棒性强。
- **method=‘L-BFGS-B’ **：　　改进的 BFGS 拟牛顿法，L- 指有限内存，-B 指边界约束，可以处理边界约束条件，需要使用一阶导数函数。L-BFGS_B 算法性能良好，消耗内存量很小，适合处理大规模问题，是边界约束优化问题的默认算法。
- **method=‘Powell’**：　　改进的共轭方向法，可以处理边界约束条件（决策变量的上下限）。
- **method=‘TNC’ **：　　截断牛顿法，可以处理边界约束条件

**带有约束条件问题优化算法**

- **method=‘COBYLA’ **：　　线性近似约束优化方法，通过对目标函数和约束条件的线性逼近处理非线性问题。只使用目标函数，不需要导数或二阶导数值，可以处理约束条件。
- **method=‘SLSQP’ **：　　序贯最小二乘规划算法，可以处理边界约束、等式约束和不等式约束条件。SLSQP 算法性能良好，是带有约束条件优化问题的默认算法。
- **method=‘trust-constr’ **：　　信赖域算法，通用的约束最优化方法，适合处理大规模问题。

# torch

## manual_seed(X)

固定随机种子

```
import torch
import numpy as np
import random

def set_seed(seed):
    # 固定Python的随机种子
    random.seed(seed)

    # 固定NumPy的随机种子
    np.random.seed(seed)

    # 固定PyTorch的随机种子
    torch.manual_seed(seed)

    # 如果使用GPU，还需要固定CUDA的随机种子
    torch.cuda.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)  # 如果使用多个GPU

    # 保证每次运行时的结果完全一致
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False

# 设置随机种子
seed = 42
set_seed(seed)
```

## tensor(X)

```
input_tensor = torch.tensor([[[[1, 2, 3, 4],
                               [5, 6, 7, 8],
                               [9, 10, 11, 12],
                               [13, 14, 15, 16]]]], dtype=torch.float32)
```

\# 创建一个示例输入，大小为 (1, 1, 4, 4)，即 1 个样本，1 个通道，4x4 的特征图

- > **RuntimeError**: Found dtype Long but expected Float
  >
  > dtype=torch.float32 声明很重要，用于解决该问题

### dot(X,X)

- 含求和

$$
dot product=1×4+2×5+3×6=32
$$

```
import torch

# 创建两个一维张量（向量）
vec1 = torch.tensor([1, 2, 3])
vec2 = torch.tensor([4, 5, 6])

# 计算点乘
dot_product = torch.dot(vec1, vec2)
print(dot_product)  # 输出: tensor(32)
```

### mul \*

- 不含求和—张量间的逐元素乘法（Hadamard 乘积）
- mul
- `tensor1 * tensor2`：是逐元素乘法（Hadamard Product），即对两个张量中对应位置的元素执行乘法操作。

```
# 逐元素乘法
tensor1 = torch.tensor([1, 2, 3])
tensor2 = torch.tensor([4, 5, 6])
result = torch.mul(tensor1, tensor2)
print(result)  # 输出: tensor([4, 10, 18])
```

### 矩阵乘法 matmul @

```
# 创建两个矩阵
matrix1 = torch.tensor([[1, 2], [3, 4]])
matrix2 = torch.tensor([[5, 6], [7, 8]])

# 矩阵乘法
matrix_result = torch.matmul(matrix1, matrix2)
print(matrix_result)
# 输出:
# tensor([[19, 22],
#         [43, 50]])
```

### sum(X,X)

`torch.sum()` 对不同维度进行求和

选择哪个维度，哪个维度就消失，从左往右维度因此增大

示例

```
import torch

# 创建一个随机的 4D tensor，形状为 [2, 3, 4, 5]
tensor = torch.randn(2, 3, 4, 5)
print(tensor.shape)
sum_dim0 = torch.sum(tensor, dim=0)
print(sum_dim0.shape)
sum_dim1 = torch.sum(tensor, dim=1)
print(sum_dim1.shape)
sum_dim2 = torch.sum(tensor, dim=2)
print(sum_dim2.shape)
sum_dim3 = torch.sum(tensor, dim=3)
print(sum_dim3.shape)
```

输出

```
torch.Size([2, 3, 4, 5])
torch.Size([3, 4, 5])
torch.Size([2, 4, 5])
torch.Size([2, 3, 5])
torch.Size([2, 3, 4])
```

二维例子

```
import torch

tensor = torch.randn(4, 5)
print(tensor)
sum_dim0 = torch.sum(tensor, dim=0)
print(sum_dim0)
sum_dim1 = torch.sum(tensor, dim=1)
print(sum_dim1)
```

输出

```
tensor([[-0.1844,  0.3563,  0.5837,  0.5701, -1.5140],
        [-0.0333, -0.0310,  1.2362, -1.1672,  0.0206],
        [ 0.2273, -1.7302,  0.3273, -0.5446,  0.7029],
        [-0.6730, -1.3433, -0.1589,  0.0871,  0.4764]])
tensor([-0.6634, -2.7482,  1.9882, -1.0547, -0.3140])
tensor([-0.1884,  0.0253, -1.0173, -1.6117])
```

二维含 keepdim=True

```
import torch

# 创建一个随机的 4D tensor，形状为 [4, 5]
tensor = torch.randn(4, 5)
print(tensor)
sum_dim0 = torch.sum(tensor, dim=0,keepdim=True)
print(sum_dim0)
sum_dim1 = torch.sum(tensor, dim=1,keepdim=True)
print(sum_dim1)

```

输出

```
tensor([[ 0.4784, -0.2342, -0.1696, -2.3909,  0.0512],
        [-2.8756,  0.3617,  0.2353,  0.4298,  0.9255],
        [ 0.9035,  0.3142,  0.1474, -1.0814, -0.3236],
        [-0.3079, -1.4627,  0.0399,  0.2887,  0.4411]])
tensor([[-1.8016, -1.0210,  0.2531, -2.7538,  1.0942]])
tensor([[-2.2651],
        [-0.9232],
        [-0.0399],
        [-1.0008]])
```

### 类方法

#### X.shape

返回 tensor 类型的数据形状

```
predata=torch.tensor([0.1, 0.9, 0.2, 0.8, 0.7, 0.3])
N=predata.shape #torch.Size([6])
```

返回单一数值

```
predata=torch.tensor([0.1, 0.9, 0.2, 0.8, 0.7, 0.3])
N=predata.shape[0]  #6
```

元组返回形状

```
predata=torch.tensor([[0.1, 0.9, 0.2, 0.8, 0.7, 0.3],
                      [0.1, 0.9, 0.2, 0.8, 0.7, 0.3]])
N=tuple(predata.shape)  #(2, 6)
```

#### X.sum(X,axis=X)

- 不含维度数据：全部求和
- 含维度数据：压缩对应维度

```
predata = torch.tensor([[[0.1, 0.9, 0.2],  # 样本1的三个预测值
                        [0.8, 0.7, 0.3],  # 样本2的三个预测值
                        [0.4, 0.1, 0.6],
                        [0.4, 0.1, 0.6]],
                        [[0.1, 0.9, 0.2],  # 样本1的三个预测值
                        [0.8, 0.7, 0.3],  # 样本2的三个预测值
                        [0.4, 0.1, 0.6],
                        [0.4, 0.1, 0.6]]]) # 样本3的三个预测值
print(predata.shape)
print(torch.sum(predata,dim=1).shape)
print(torch.sum(predata).shape)
```

输出

```
torch.Size([2, 4, 3])
torch.Size([2, 3])
torch.Size([])
```

#### X.t()

```
import torch
a=torch.tensor([[1,2,3,4],
            [5,6,7,8],
            [9,10,11,12]])  #定义一个（3，4）的数据
print(a.t())
```

输出

```
tensor([[ 1,  5,  9],
        [ 2,  6, 10],
        [ 3,  7, 11],
        [ 4,  8, 12]])
```

#### X.reshape(X)

- `torch.reshape` 用来返回一个新的张量，形状改变为指定的形状。如果形状不兼容，PyTorch 会自动处理内存布局。`reshape` 方法总是会返回一个新的张量，无论输入张量是连续的还是非连续的。

```
from torch import reshape,tensor
a=tensor([[[[1,2,3,4],
            [5,6,7,8],
            [9,10,11,12]],

            [[1,2,3,4],
            [5,6,7,8],
            [9,10,11,12]]]])  #定义一个（1，2，3，4）的数据
a.reshape(1,4,1,6)
```

输出

```
tensor([[[[ 1,  2,  3,  4,  5,  6]],
         [[ 7,  8,  9, 10, 11, 12]],
         [[ 1,  2,  3,  4,  5,  6]],
         [[ 7,  8,  9, 10, 11, 12]]]])
```

#### X.view(X)

```
from torch import reshape,tensor
a=tensor([[[[1,2,3,4],
            [5,6,7,8],
            [9,10,11,12]],

            [[1,2,3,4],
            [5,6,7,8],
            [9,10,11,12]]]])  #定义一个（1，2，3，4）的数据
print(a.view(4,6))
```

输出

```
tensor([[ 1,  2,  3,  4,  5,  6],
        [ 7,  8,  9, 10, 11, 12],
        [ 1,  2,  3,  4,  5,  6],
        [ 7,  8,  9, 10, 11, 12]])
```

- 连续张量
  当对张量进行某些操作（如转置、切片、索引等）时，结果可能是非连续的。即使原始张量是连续的，经过这些操作后，得到的新张量可能在内存中并不是连续的。
  例如，当你对张量进行转置时，PyTorch 会返回一个 非连续张量，即使在数学上转置后的形状是有效的。
  如果你想对非连续张量使用 .view()，你必须先通过 .contiguous() 方法确保它是连续的。

  ```
  import torch
  # 创建一个张量
  x = torch.tensor([[1, 2], [3, 4]])
  print(x.is_contiguous())  # 输出: True
  # 对张量进行转置，结果是非连续张量
  y = x.t()  # `t()` 是转置操作
  print(y.is_contiguous())  # 输出: False
  # 使用 .contiguous() 转换为连续张量
  y_contiguous = y.contiguous()
  # 现在可以安全地使用 .view
  y_reshaped = y_contiguous.view(2, 2)
  print(y_reshaped)
  ```

#### X.permute(X)

该函数是进行维度移动，重排维度

例如形状为（2,3,4,5）变换成（3,2,5,4）

```
import torch
data=torch.randn(2,3,4,5)
print(data.shape)
# 形状变换  #交换0,1维度（最高，次最高位）,交换2,3维度(次低位，最低位)
data_new=data.permute(1,0,3,2)
print(data_new.shape)
```

输出

```
torch.Size([2, 3, 4, 5])
torch.Size([3, 2, 5, 4])
```

#### X.long()

`.long()` 是一个张量方法，用于将张量的数据类型转换为 **`torch.int64`**（即 64 位整数类型）

- 是整数，用于去小数

```
import torch

# 创建一个浮点数张量
tensor = torch.tensor([1.2, 2.3, 3.4])

# 将浮点数张量转换为长整型张量
long_tensor = tensor.long()

print(long_tensor)  # 输出：tensor([1, 2, 3])
```

输出

```
tensor([1, 2, 3])
```

#### X.item()

`.item()` 返回一个 Python 原生的数据类型（如 `float`、`int` 等），它从一个只有单个元素的张量中提取该元素的值。如果张量中有多个元素，使用 `.item()` 会引发错误。

示例

```
import torch

# 创建一个浮点数张量
tensor = torch.tensor([2.3])
print(tensor.item())
```

输出

```
2.299999952316284
```

## randn(X)

创建一个（2，3，4，5）的 torch 数组

```
# 均方损失MseLoss
import torch
data=torch.randn(2,3,4,5)  #或者data=torch.randn([2,3,4,5])
print(data)
```

输出：

<img src="/docs/python语法/代码语法_localdata/image-20250121121717051.png" alt="image-20250121121717051" style="zoom: 50%;" />

比较

```
temp=torch.randn(10)
```

输出

```
tensor([-1.2891,  1.2495,  1.2514, -0.3571, -2.3269,  1.1780, -1.7351,  1.5985,
        -0.0320, -0.0367])
```

比较

```
temp=torch.randn(1,10)
```

输出

```
tensor([[-0.0276,  0.9589, -0.7749,  0.1158, -0.0168, -0.5705, -0.0094,  2.1249,
          0.3064,  0.2421]])
```

## hsitc(X,X,X,X)

`torch.histc` 是 PyTorch 中用于计算张量（tensor）数据分布的一个函数，它可以生成一个张量的直方图。该函数会返回一个包含指定区间内数据分布的直方图张量。

```
torch.histc(input, bins=100, min=0, max=1)
```

桶宽

$$
桶的宽度=\frac{max - min}{bins}
$$

示例

```
import torch
# 创建一个包含随机数的张量
data = torch.randn(100)
# 设置参数
min_value = -3
max_value = 3
bins =10
# 计算数据的直方图，分成 10 个桶，数据区间为 -3 到 3
histogram = torch.histc(data, bins=bins, min=min_value,
max=max_value)
print(histogram)

#打印桶的范围
# 计算每个桶的宽度
bin_width = (max_value - min_value) / bins
# 打印每个桶的范围
bucket_ranges = [(min_value + i * bin_width, min_value + (i + 1) * bin_width) for i in range(bins)]
# 打印结果
for i, (start, end) in enumerate(bucket_ranges):
    print(f"桶 {i+1}: [{start}, {end})")

```

## cat()

向量连接

exp1

```
a1=torch.randn(3)
a2=torch.randn(4)
print(a1)
print(a2)
print(torch.cat([a1,a2]))
```

输出

```
tensor([ 0.6208, -0.0760, -0.4030])
tensor([ 0.6336,  0.6729,  0.5137, -0.6282])
tensor([ 0.6208, -0.0760, -0.4030,  0.6336,  0.6729,  0.5137, -0.6282])
```

exp2 （向量带 t()连接，不变结果）

```
a1=torch.randn(3)
a2=torch.randn(4).t()
print(a1)
print(a2)
print(torch.cat([a1,a2]))
```

```
tensor([ 0.6208, -0.0760, -0.4030])
tensor([ 0.6336,  0.6729,  0.5137, -0.6282])
tensor([ 0.6208, -0.0760, -0.4030,  0.6336,  0.6729,  0.5137, -0.6282])
```

## eq,lt,gt,le,ge

## log()

计算自然对数

```
import torch
# 创建一个张量
tensor = torch.tensor([1.0, 2.0, 3.0, 4.0])
# 计算自然对数
log_tensor = torch.log(tensor)
#输出tensor([0.0000, 0.6931, 1.0986, 1.3863])
```

## pow(X,X) \*\*

## optim

### Adam

adam 优化器求解的都是无约束优化问题

- exp1:目标函数

$$
f(x)=\sum_{i=1}^{n}[x_i^2-10cos(2\pi x_i)+10]
$$

的二维形式$f(x)=\sum_{i=1}^{2}[x_i^2-10cos(2\pi x_i)+10]$

代码

```
import torch
import torch.optim as optim
from tqdm import tqdm
import numpy as np
import matplotlib

matplotlib.use('TkAgg')  # 或者 'Qt5Agg'
import matplotlib.pyplot as plt

recorder = [[], [], []]  # 用于记录x, y, val

# 目标函数
def f(x):
    fx = torch.sum(x ** 2 - 10 * torch.cos(2 * torch.pi * x) + 10)
    recorder[0].append(x[0].clone().detach().numpy())  # 记录x[0]（保留Tensor类型）
    recorder[1].append(x[1].clone().detach().numpy())  # 记录x[1]（保留Tensor类型）
    recorder[2].append(fx.clone().detach().numpy())  # 记录目标函数值（保留Tensor类型）
    return fx


# 计算目标函数值（非Tensor）
def objf2_f(x, y):
    fx = x ** 2 - 10 * np.cos(2 * np.pi * x) + 10 + y ** 2 - 10 * np.cos(2 * np.pi * y) + 10
    return fx


# 计算损失（罚函数）
def penalty(x):
    f_vals = f(x)
    return f_vals


if __name__ == "__main__":
    num_x = 2  # 决策变量个数
    # 初始化决策变量
    x = torch.tensor([-2.5,-2.5],requires_grad=True,dtype=torch.float32)

    # 优化器
    iters = 1000  # 迭代次数
    optimizer = optim.Adam([x], lr=0.01)
    processbar = tqdm(range(iters), desc="Adam优化", unit="批次")

    # 训练过程
    for iter in processbar:
        # 清空梯度
        optimizer.zero_grad()
        f_vals = f(x)  # 目标函数值
        loss = penalty(x)  # 罚函数做目标函数
        loss.backward()  # 反向传播计算梯度
        optimizer.step()  # 参数更新

        # 损失显示
        processbar.set_postfix(loss=loss.item(), val=f_vals.item())

    # 输出最终结果
    print("目标函数:", f(x).detach().numpy())  # 输出目标函数
    print("解:", x.detach().numpy())  # 输出优化结果

    # 创建网格数据
    x_vals = np.arange(-4, 2, 0.01)
    y_vals = np.arange(-4, 2, 0.01)
    z = np.array([[objf2_f(x_vals[i], y_vals[j]) for i in range(len(x_vals))] for j in range(len(y_vals))])
    x_vals, y_vals = np.meshgrid(x_vals, y_vals)

    # 绘图
    fig = plt.figure(dpi=100)
    ax = fig.add_axes([0, 0, 1, 1], projection='3d')
    ax.plot_surface(x_vals, y_vals, z, cmap='viridis', alpha=0.1)
    ax.plot3D( recorder[0], recorder[1],
             recorder[2], 'r-')

    # 设置坐标轴标签
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')

    # 显示图形
    plt.show()

```

绘图

<img src="/docs/python语法/代码语法_localdata/image-20250124212317436.png" alt="image-20250124212317436" style="zoom:33%;" />
$$

$$

- exp2:未解决（带约束无法生效）


$$

min \sum\_{i=1}^{10}x_i^2

$$
约束
$$

x_0^2+x_1^2<=1\\
x_2^2+x_3^2<=1\\
x_0^4+x_5^2<=1\\
x_0^6+x_7^2<=1\\
x_8^2+x_9^2<=1\\
x_0+x_1=1\\
x_2=x_3

$$
代码

```
# 最优化，所有函数只能返回一个Tensor参数，不能返回其他
import torch
import torch.optim as optim
from tqdm import tqdm
def f(x): #目标函数
    fx=torch.sum(x**2)
    return fx
def neqc(x): #不等式约束
    neqcx=torch.tensor([
        [x[0]**2 + x[1]**2 - 1],  #每个约束都要有[]
        [x[2]**2 + x[3]**2 - 1],
        [x[4]**2 + x[5]**2 - 1],
        [x[6]**2 + x[7]**2 - 1],
        [x[8]**2 + x[9]**2 - 1],
    ])
    return neqcx
def eqc(x):  #等式约束
    eqcx=torch.tensor([
        [x[0] + x[1] - 1],
        [x[2] - x[3]]
    ])
    return eqcx
def penalty(x,num_neq,lambda_vals):  #根据x、和拉格朗日项(lambda_vals)计算罚函数
    f_vals=f(x)
    neq_penalty=torch.sum(lambda_vals[:num_neq]*torch.relu(neqc(x)))
    eq_penalty=torch.sum(lambda_vals[num_neq:]*torch.abs(eqc(x)))
    return f_vals+neq_penalty+eq_penalty
def update_lambda(lambda_vals,alpha=0.1):  #根据损失(x计算)更新拉格朗日乘子（梯度上升）
    # 更新拉格朗日乘子：对于违反不等式约束的部分，增加乘子的值
    lambda_vals=lambda_vals+alpha*torch.cat([torch.relu(neqc(x)),eqc(x)])  #不能用+=,避免原地修改
    return lambda_vals

if __name__=="__main__":
    # 初始化决策变量
    x=torch.randn(10,requires_grad=True)
    lambda_vals=torch.zeros(7,requires_grad=True)
    num_neq=5 #不等式约束的个数,剩下的都是等式约束
    #优化器
    iters=2000 #迭代次数
    optimizer=optim.Adam([x,lambda_vals],lr=0.001)
    processbar=tqdm(range(iters),desc="Adam优化",unit="批次")
    #训练
    for iter in processbar:
        #清空梯度
        optimizer.zero_grad()
        f_vals=f(x)  #目标函数值
        loss=penalty(x,num_neq=num_neq,lambda_vals=lambda_vals)  #罚函数做目标函数
        loss.backward() #反向传播计算梯度
        lambda_vals=update_lambda(lambda_vals)
        optimizer.step() #参数更新
        # 损失显示
        processbar.set_postfix(loss=loss.item(),val=f_vals.item())
# 输出最终结果
print("目标函数:", f(x).detach().numpy())
print("解:", x.detach().numpy())
```

输出

```
Adam优化: 100%|██████████| 2000/2000 [00:06<00:00, 303.84批次/s, loss=-1.24e+3, val=0.0692]
目标函数: 0.06900671
解: [ 3.0376939e-02 -9.4526002e-12 -2.7419755e-03  2.4194285e-01
  2.5643762e-43  9.3386642e-04 -5.2020042e-03  9.3502715e-02
  2.7738018e-02  2.6624671e-43]

Adam优化: 100%|██████████| 100/100 [00:00<00:00, 2195.74批次/s, loss=-0.925, val=0.73]
```



## nn

```
import torch.nn as nn
```

### Module

```
class GrowthNet(nn.Module):
    def __init__(self,inc,num_classes=100):
        super(GrowthNet, self).__init__()
        self.aapool=nn.AdaptiveAvgPool2d((1,1))
        self.fc1 = nn.Linear(16, num_classes)  # 假设输入图像大小为32x32
    def forward(self, x):
        x=self.aapool(x)
        x = x.view(-1, 16)  # 展平操作
        x = self.fc1(x)
        return x
```

#### load/load_state_dict

```
torch.save(model.state_dict(), "model_weights.pth")
torch.save(model, "model.pth")
```

```
model.load_state_dict(torch.load("model_weights.pth"))
model.to(device)

# OR, load the full model
model = torch.load("model.pth")
model.to(device)
```

### Sequential([X,X,X])

定义

```
self.pre_layer = nn.Sequential(
            nn.Conv2d(3, 10, kernel_size=3, stride=1),  # 10*10*3
            # nn.BatchNorm2d(10),
            nn.PReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2,padding=0),  # 5*5*10
            nn.Conv2d(10, 16, kernel_size=3, stride=1),  # 3*3*16
            # nn.BatchNorm2d(16),
            nn.PReLU(),
            nn.Conv2d(16, 32, kernel_size=3, stride=1),  # 1*1*32
            # nn.BatchNorm2d(32),
            nn.PReLU()
        )
```

使用

```
x = self.pre_layer(x)
```

### Conv2d

形状
$$

H'=1+\lfloor \frac{H-K+P}{S} \rfloor

$$


$$

W'=1+\lfloor \frac{W-K+P}{S} \rfloor

$$

索引
$$

(H'_{m},W'_{n})\overset{Conv}{\leftarrow}\begin{bmatrix}(H'_{m}\*S,W'_{n}*S) & \dots &(H'\_{m}*S,W'_{n}\*S+K) \\ \dots & \dots & \dots \\ (H'_{m}*S+K,W'\_{n}*S) & \dots &(H'_{m}\*S+K,W'_{n}\*S+K) \end{bmatrix}

$$

```
nn.Conv2d(3, 10, kernel_size=3, stride=1)
```

### BatchNorm2d(X)

### LeakyReLU(X)

要输入小于0是的斜率

### MaxPool2d

定义

```
self.max_pool=nn.MaxPool2d(kernel_size=2, stride=2,padding=0)
```

用法

```
output_tensor = self.max_pool(input_tensor)
```

### AdaptiveAvgPool2d(X)

自适应池化，自动填充，以达到池化后输出长宽形状为X

```
import torch
import torch.nn as nn
pool=nn.AdaptiveAvgPool2d((7,7))
data=torch.randn(5,3,2,1)
out1=pool(data)
print(out1.shape)
```

输出

```
torch.Size([5, 3, 7, 7])
```



### ReLU()


$$

f(x)=max(0,x)

$$

### PReLU()


$$

f(x)=\begin{cases}x & \text{if } x>0 \\ a \cdot x & \text{if } x \leq 0\end{cases}

$$

- 当输入值大于 0 时，PReLU 和标准的 ReLU 一样，直接返回输入值。
- 当输入值小于等于 0 时，PReLU 会通过学习的参数 `a` 来调整负值的斜率。
- 这个参数 `a` 可以在训练过程中进行更新，因此，PReLU 使得模型能够更好地拟合数据，尤其是在负值的部分。

```
#way1
nn.PReLU()
```

```
#way2
nn.PReLU(num_parameters=1, init=0.25)
```

- `num_parameters`: 参数的数量，通常是 1（表示每个通道一个参数）或者与输入的维度相同（例如，如果输入是 2D 卷积图像特征图，可以为每个通道设置一个参数）。默认值是 1。
- `init`: 初始化参数的值，默认值是 0.25。这个值决定了初始时负值的斜率。

### BCELoss()

nn.BCELoss()是二进制交叉熵损失（Binary Cross-Entropy Loss），简称 BCELoss。它通常用于二分类问题或多标签二分类问题。
$$

L=-\frac{1}{N}\sum\_{i=1}^{N}[y_i\cdot log(\hat{y_i})+(1-y_i)\cdot log(1-\hat{y_i})]

$$
定义

```
self.cls_loss_fn = nn.BCELoss()
```

使用

```
cls_loss = self.cls_loss_fn(output_category, category)#置信度损失
```

exp

- BCELoss 二进制交叉熵损失(向量)

```
# BCELoss 二进制交叉熵损失(向量)
import torch.nn as nn
predata=torch.tensor([0.1, 0.9, 0.2, 0.8, 0.7, 0.3])
truedata=torch.tensor([0,1,0,1,1,0], dtype=torch.float32)
calbceloss=nn.BCELoss()
print("-BCELoss is-",calbceloss(predata,truedata))
```

- BCELoss 二进制交叉熵损失(矩阵)

假设我们有一个批量数据，其中每个样本有多个类别的二分类问题。这样，`predata` 和 `truedata` 就会是二维张量。

更高维度的 `predata` 和 `truedata`，并通过 `BCELoss` 计算它们的损失。`BCELoss` 会对每个元素的二进制交叉熵损失进行独立计算，并返回每个元素的损失的平均值。

一行一个样本（一列一个指标）

```
# BCELoss 二进制交叉熵损失(矩阵)
# 假设模型输出（logits），每个样本有多个类别的预测值
predata = torch.tensor([[0.1, 0.9, 0.2],  # 样本1的三个预测值
                        [0.8, 0.7, 0.3],  # 样本2的三个预测值
                        [0.4, 0.2, 0.6]]) # 样本3的三个预测值

# 对应的真实标签，真实标签也是二维的，每个样本的每个类别的标签
truedata = torch.tensor([[0, 1, 0],  # 样本1的真实标签
                         [1, 1, 0],  # 样本2的真实标签
                         [0, 0, 1]], # 样本3的真实标签
                         dtype=torch.float32)
calbceloss=nn.BCELoss()
print("calbceloss(predata,truedata) 's BCELoss is-",calbceloss(predata,truedata))
```

- 函数实现

```
#手动实现
def calBCE(predata,truedata):
    N=predata.shape[0]
    #先归一化概率
    # predata=predata/torch.sum(predata)
    print(predata)
    bceloss=-1/N*torch.sum(truedata*torch.log(predata)+(1-truedata)*torch.log(1-predata))
    return bceloss
print("-BCELoss is-",calBCE(predata,truedata))
```

输出

```
-BCELoss is- tensor(0.2284)
```

注意，predata可以概率化后再输出

### MSELoss()

均方误差损失
$$

MSE(y,\hat y)=\frac{1}{N} \sum\_{i=1}^{N}(y_i-\hat y_i)^2

$$

```
import torch
import torch.nn as nn
# 真实值 (labels)
y = torch.tensor([3.0, -0.5, 2.0, 7.0])
# 预测值 (predictions)
y_pred = torch.tensor([2.5, 0.0, 2.0, 8.0])
# 使用 MSELoss 计算损失
mse_loss = nn.MSELoss()
loss = mse_loss(y_pred, y)
print("MSE Loss:", loss.item())
```

### Parameter(X)

`nn.Parameter` 用于将张量转换为模型的参数，确保该张量可以在训练过程中进行自动求导和优化。

```
import torch
import torch.nn as nn

# 创建一个 nn.Parameter
param = nn.Parameter(torch.randn(3, 3))

# 将它作为模型的一部分
class MyModel(nn.Module):
    def __init__(self):
        super(MyModel, self).__init__()
        self.my_param = nn.Parameter(torch.randn(3, 3), requires_grad=True)  # 使其成为可训练参数

    def forward(self, x):
        return x + self.my_param  # 使用自定义参数进行运算

# 创建模型并打印
model = MyModel()
print(model)

```

### functional

#### normalize(X,X)

```
torch.nn.functional.normalize(input, p=2, dim=None, eps=1e-12, out=None)
```

1. **`input`**：输入张量，通常是一个多维张量（例如，形状为 `[batch_size, feature_dim]`）。
2. **`p`** (可选)：标量，表示范数的类型。默认值是 `2`，意味着进行 L2 范数标准化。也可以选择 `p=1` 来进行 L1 范数标准化。L2 范数就是计算每个向量元素的平方和再开根号，L1 范数是计算每个向量元素的绝对值和。
3. **`dim`** (可选)：指定沿着哪个维度进行标准化。通常，在机器学习中，我们会沿着特征维度进行标准化。对于 2D 输入，`dim=1` 通常用于对每一行（每个样本的特征）进行标准化；`dim=0` 用于对每一列（每个特征）进行标准化。
4. **`eps`** (可选)：为了避免除零错误，指定一个非常小的数值以防止标准化时出现除以零的情况。默认值是 `1e-12`。
5. **`out`** (可选)：用于存放结果的输出张量。如果给定了该参数，结果会被存储到它中。

示例

```
import torch
import torch.nn.functional as F

# 创建一个 2D 张量（例如，一个 batch of 2D 特征向量）
input_tensor = torch.tensor([[3.0, 4.0], [1.0, 2.0]])

# 对输入张量进行 L2 标准化（每一行单独标准化）
normalized_tensor = F.normalize(input_tensor, p=2, dim=1)

print(normalized_tensor)
```

输出

```
tensor([[0.6000, 0.8000],
        [0.4472, 0.8944]])
```

#### interpolate(X,X,X)

用于上采样

```
torch.nn.functional.interpolate(input, size=None, scale_factor=None, mode='nearest', align_corners=None)
```

1. **input** (`Tensor`): 输入的张量，通常是一个 4D 张量，形状为 `(N, C, H, W)`，其中 `N` 是批量大小，`C` 是通道数，`H` 和 `W` 是图像的高度和宽度。
2. **size** (`int` 或 `tuple` 或 `None`): 输出的目标尺寸，指定目标图像的大小。如果 `size` 为 `None`，则必须提供 `scale_factor`。
3. **scale_factor** (`float` 或 `tuple` 或 `None`): 缩放因子，用于调整输入的尺寸。如果提供了 `scale_factor`，则输入的每个维度会乘以该因子。与 `size` 互斥，只能提供其中一个。
4. **mode** (`str`): 指定插值方法。常见的模式包括：
   - `'nearest'`：最近邻插值。
   - `'linear'`：线性插值（通常用于 3D 数据或视频）。
   - `'bilinear'`：双线性插值（常用于 2D 图像）。
   - `'bicubic'`：立方插值（用于 2D 图像）。
   - `'trilinear'`：三线性插值（用于 3D 数据）。
5. **align_corners** (`bool` 或 `None`): 仅在 `mode` 是 `'bilinear'` 或 `'bicubic'` 时使用。若为 `True`，则对输入图像和目标图像的角点进行对齐。若为 `False`，则不对齐。默认值为 `None`，表示使用 PyTorch 的默认行为（通常是对齐角点）。

示例

使用size

```
import torch
import torch.nn.functional as F

# 假设输入是一个 1x1x4x4 的张量（1 个样本，1 个通道，4x4 的图像）
input_tensor = torch.randn(2, 1, 2, 2)

# 使用双线性插值将图像放大为 8x8
output_tensor = F.interpolate(input_tensor, size=(4,4), mode='bilinear')
print(input_tensor)
print(output_tensor)  # 输出: torch.Size([2, 1, 4,4])

```

输出

```
tensor([[[[-1.0672,  0.3810],
          [ 0.0268,  1.2190]]],


        [[[ 0.6784, -0.0329],
          [ 1.5050, -0.2383]]]])
tensor([[[[-1.0672, -0.7051,  0.0190,  0.3810],
          [-0.7937, -0.4476,  0.2445,  0.5905],
          [-0.2467,  0.0674,  0.6955,  1.0095],
          [ 0.0268,  0.3249,  0.9210,  1.2190]]],


        [[[ 0.6784,  0.5006,  0.1449, -0.0329],
          [ 0.8851,  0.6428,  0.1581, -0.0842],
          [ 1.2984,  0.9270,  0.1844, -0.1870],
          [ 1.5050,  1.0692,  0.1975, -0.2383]]]])
```

使用scale_factor

```
import torch
import torch.nn.functional as F

# 假设输入是一个 1x1x4x4 的张量（1 个样本，1 个通道，4x4 的图像）
input_tensor = torch.randn(2, 1, 2, 2)

# 使用双线性插值将图像放大为 8x8
output_tensor = F.interpolate(input_tensor, scale_factor=2, mode='bilinear')
print(input_tensor)
print(output_tensor)  # 输出: torch.Size([2, 1, 4,4])
```

输出

```
tensor([[[[-0.4952,  0.7631],
          [ 1.5991,  0.4327]]],


        [[[-0.1891,  0.0338],
          [-0.5376,  1.0497]]]])
tensor([[[[-0.4952, -0.1806,  0.4485,  0.7631],
          [ 0.0284,  0.1914,  0.5175,  0.6805],
          [ 1.0755,  0.9355,  0.6553,  0.5153],
          [ 1.5991,  1.3075,  0.7243,  0.4327]]],


        [[[-0.1891, -0.1334, -0.0219,  0.0338],
          [-0.2762, -0.1352,  0.1468,  0.2878],
          [-0.4504, -0.1389,  0.4842,  0.7957],
          [-0.5376, -0.1408,  0.6529,  1.0497]]]])
```

#### conv2d()

示例1

```
import torch
import torch.nn.functional as F

# 假设我们有一个输入张量，大小为 (1, 1, 5, 5)，即一个批次，1个通道，5x5的图像
input_tensor = torch.randn(1, 1, 5, 5)  # 随机生成一个输入图像

# 定义卷积核，大小为 (1, 1, 3, 3)，即一个卷积核，1个输入通道，大小为3x3
weight = torch.randn(1, 1, 3, 3)  # 随机生成一个卷积核

# 偏置项（可选），如果需要的话
bias = torch.randn(1)

# 使用 nn.functional.conv2d 进行卷积操作
output_tensor = F.conv2d(input_tensor, weight, bias, stride=1, padding=1)

print("输入张量的形状:", input_tensor.shape)
print("卷积核的形状:", weight.shape)
print("输出张量的形状:", output_tensor.shape)

```

输出

```
输入张量的形状: torch.Size([1, 1, 5, 5])
卷积核的形状: torch.Size([1, 1, 3, 3])
输出张量的形状: torch.Size([1, 1, 5, 5])
```

分组卷积

```
import torch
import torch.nn.functional as F

# 假设 input_tensor 是一个大小为 (1, 3, 5, 5) 的张量
input_tensor = torch.zeros(1, 3, 5, 5)  # (batch_size=1, in_channels=3, height=5, width=5)

# 修改卷积核的形状为 (3, 1, 3, 3)，表示 3 个输出通道，每个分组 1 个输入通道
weight = torch.randn(3, 1, 3, 3)  # (out_channels=3, in_channels_per_group=1, kernel_height=3, kernel_width=3)

# 使用分组卷积 (groups=3)
output_tensor = F.conv2d(input_tensor, weight, groups=3)

print("输入张量的形状:", input_tensor.shape)
print("卷积核的形状:", weight.shape)
print("输出张量的形状:", output_tensor.shape)
```

假设输入张量 X*X* 的形状是 (1,3,5,5)(1,3,5,5)，卷积核 W*W* 的形状是 (3,1,3,3)(3,1,3,3)，`groups=3`，则分组卷积的过程如下：

1. **输入分组**：
   - 输入张量 X*X* 被分成 3 组，每组 1 个通道：
     - 组 1：X[:,0:1,:,:]*X*[:,0:1,:,:]
     - 组 2：X[:,1:2,:,:]*X*[:,1:2,:,:]
     - 组 3：X[:,2:3,:,:]*X*[:,2:3,:,:]
2. **卷积核分组**：
   - 卷积核 W*W* 被分成 3 组，每组 1 个卷积核：
     - 组 1：W[0:1,:,:,:]*W*[0:1,:,:,:]
     - 组 2：W[1:2,:,:,:]*W*[1:2,:,:,:]
     - 组 3：W[2:3,:,:,:]*W*[2:3,:,:,:]
3. **分组卷积**：
   - 组 1 的输入与组 1 的卷积核进行卷积，生成第 1 个输出通道。
   - 组 2 的输入与组 2 的卷积核进行卷积，生成第 2 个输出通道。
   - 组 3 的输入与组 3 的卷积核进行卷积，生成第 3 个输出通道。
4. **输出拼接**：
   - 将 3 个输出通道拼接起来，得到最终的输出张量 Y*Y*，形状为 (1,3,3,3)(1,3,3,3)。'

输出

```
输入张量的形状: torch.Size([1, 3, 5, 5])
卷积核的形状: torch.Size([3, 1, 3, 3])
输出张量的形状: torch.Size([1, 3, 3, 3])
```

## utils

### data

#### Dataset

```
from torch.utils.data import Dataset
```

```
class Data_RandGen():
    def __init__(self,datanum=1000,val_test_ratio=0.15,batch_size=5,num_timestamp=10,num_nodes=50,feature_dim=3):
        #数据格式
        self.datanum=datanum
        self.val_test_ratio=val_test_ratio
        self.batch_size=batch_size
        #相关系数矩阵形状[num_nodes,num_nodes]
        upper_triangle =torch.tensor(np.random.rand(num_nodes,num_nodes)) #随机生成一个0-1矩阵
        self.correlation_matrix = np.triu(upper_triangle) + np.triu(upper_triangle, 1).T  #生成一个相关系数矩阵
        for i in range(num_nodes):
            self.correlation_matrix[i,i]/=2
        #特征矩阵【batch_size,时间 步长,节点数，节点特征维度】
        self.feature_matrix = torch.randn([datanum,num_timestamp,num_nodes,feature_dim]) #生成特征矩阵
        # 预测矩阵【batch_size,时间 步长=1,节点数，节点特征维度】，预测下一个时间
        self.label_matrix=torch.rand([datanum,1,num_nodes,feature_dim])
    def data_gen(self):
        print(self.correlation_matrix.shape)
        print(self.feature_matrix.shape)
        test_size=self.val_test_ratio*self.datanum
        x_train, x_test,y_train, y_test = model_selection.train_test_split(self.feature_matrix, self.label_matrix,
                                                                            test_size=int(test_size),
                                                                             random_state=42)
        return self.correlation_matrix,x_train, x_test,y_train, y_test
#数据集
class PCBDataset(Dataset):
    def __init__(self,data,label):  #自己随机产生数据来模拟
        self.data=data
        self.label=label
    def __len__(self):
        return len(self.data)
    def __getitem__(self,index):
        return self.data[index],self.label[index]
```

```
datarandgenerator=Data_RandGen()
    correlation_matrix,x_train, x_test,y_train, y_test=datarandgenerator.data_gen()
    train_dataset = PCBDataset(x_train, y_train)
    test_dataset = PCBDataset(x_test, y_test)
```

## softmax(X,dim)

对于4维的torch数组shape为（0维，1维，2维，3维）

```
import torch
import torch.nn as nn
x = torch.randn(2,2,2,2)
print(x)
softmax_output = torch.softmax(x, 0)
print("0维度",softmax_output,softmax_output.shape,sep="\n")
softmax_output = torch.softmax(x, 1)
print("1维度",softmax_output,softmax_output.shape,sep="\n")
softmax_output = torch.softmax(x, 2)
print("2维度",softmax_output,softmax_output.shape,sep="\n")
softmax_output = torch.softmax(x, 3)
print("3维度",softmax_output,softmax_output.shape,sep="\n")
```

输出

```
tensor([[[[ 1.3436, -0.6011],
          [-0.0820,  0.2757]],

         [[-0.1782, -0.8730],
          [-0.7761, -0.2443]]],


        [[[ 0.8724, -0.6155],
          [ 0.4941, -0.6893]],

         [[ 0.0416, -1.2847],
          [-0.2367, -2.0729]]]])
0维度
tensor([[[[0.6157, 0.5036],
          [0.3598, 0.7241]],

         [[0.4453, 0.6015],
          [0.3683, 0.8616]]],


        [[[0.3843, 0.4964],
          [0.6402, 0.2759]],

         [[0.5547, 0.3985],
          [0.6317, 0.1384]]]])
torch.Size([2, 2, 2, 2])
1维度
tensor([[[[0.8208, 0.5676],
          [0.6669, 0.6272]],

         [[0.1792, 0.4324],
          [0.3331, 0.3728]]],


        [[[0.6965, 0.6613],
          [0.6750, 0.7996]],

         [[0.3035, 0.3387],
          [0.3250, 0.2004]]]])
torch.Size([2, 2, 2, 2])
2维度
tensor([[[[0.8062, 0.2938],
          [0.1938, 0.7062]],

         [[0.6452, 0.3478],
          [0.3548, 0.6522]]],


        [[[0.5935, 0.5185],
          [0.4065, 0.4815]],

         [[0.5691, 0.6874],
          [0.4309, 0.3126]]]])
torch.Size([2, 2, 2, 2])
3维度
tensor([[[[0.8749, 0.1251],
          [0.4115, 0.5885]],

         [[0.6670, 0.3330],
          [0.3701, 0.6299]]],


        [[[0.8158, 0.1842],
          [0.7656, 0.2344]],

         [[0.7902, 0.2098],
          [0.8625, 0.1375]]]])
torch.Size([2, 2, 2, 2])
```



## masked_select(X,X )

掩码取值

```
import torch

a =  torch.tensor([1,2,3,4,5])

print(a<4)
print(torch.lt(a,4)) #lt gt eq le ge

print(a[a<4])
print(torch.masked_select(a, a<4))

print(torch.nonzero(a<4))
```

输出

```
tensor([ True,  True,  True, False, False])
tensor([ True,  True,  True, False, False])
tensor([1, 2, 3])
tensor([1, 2, 3])
tensor([[0],
        [1],
        [2]])
```

## nonzero(X)

取非0元素的索引

## dist(X,X)

```
torch.dist(word, w) 计算词 word 和词向量 w 之间的欧几里得距离。
```

## index_select(X)

可以根据给定的索引，从一个张量中选择指定维度上的特定元素。

(0维，1维，...)

```
torch.index_select(input, dim, index)
```

示例1

torch矩阵选择第[0,2,1,3,2,2]行，并进行堆叠

```
import torch

# 创建一个 4x3 的张量
tensor = torch.tensor([[1, 2, 3],
                       [4, 5, 6],
                       [7, 8, 9],
                       [10, 11, 12]])

index=torch.tensor([0,2,1,3,2,2])
selected_tensor=torch.index_select(tensor,dim=0,index=index)
print(selected_tensor)
```

输出

```
tensor([[ 1,  2,  3],
        [ 7,  8,  9],
        [ 4,  5,  6],
        [10, 11, 12],
        [ 7,  8,  9],
        [ 7,  8,  9]])
```

示例2对象方法调用

```
import torch

# 创建一个 4x3 的张量
tensor = torch.tensor([[1, 2, 3],
                       [4, 5, 6],
                       [7, 8, 9],
                       [10, 11, 12]])

index=torch.tensor([0,2,1,3,2,2])
selected_tensor=tensor.index_select(dim=0,index=index)
print(selected_tensor)
```

输出与上方一致

## device()

```
device = torch.device('cuda')
```

# torchvision

## transforms

### Compose([X,X,X])

用于组合多个图像转换操作。其目的是将多个转换步骤按顺序应用到图像上，从而一次性完成多个预处理操作。

定义：

```
self.__image_transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
```

使用：

```
img_data = self.__image_transform(img)
```

### ToTensor()

这个转换操作将输入的图像从 PIL 图像或 NumPy 数组转换为 PyTorch 的张量（tensor）。转换后的张量会有以下特点：

1. 图像的像素值会被标准化到 [0, 1] 的范围。
   对于彩色图像，转换后的形状是 (C, H, W)，其中 C 是颜色通道数（如 RGB 为 3），H 是图像高度，W 是图像宽度
   。

```
image = transforms.ToTensor()(pimg.open(r"testpic1.jpg"))
```

```
from PIL import Image
import torch
import torchvision.transforms as transforms

# 打开图像
img = Image.open(r"testpic1.jpg")

# 将图像转换为张量
transform = transforms.ToTensor()
img_tensor = transform(img)

# 现在 img_tensor 是一个 PyTorch 张量
print(img_tensor.shape)  # 打印张量形状，通常是 (C, H, W)
```



### Normalize(mean, std)

```
transforms.Normalize(mean, std)
```

每个通道的每个像素值减去对应的均值 mean，并除以对应的标准差 std。
这有助于让模型对不同图像的亮度和对比度的变化更加鲁棒，通常是为了加速训练和提高模型性能。

处理一个 RGB 图像，并且希望对其进行标准化，使得每个通道的像素值具有指定的均值和标准差

```
import torch
from torchvision import transforms
from PIL import Image
# 加载图像
image = Image.open('example_image.jpg')
# 定义标准化的转换操作
transform = transforms.Compose([
    transforms.ToTensor(),  # 转换图像为 Tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # 标准化
])
# 对图像应用转换
normalized_image = transform(image)
# 输出标准化后的图像数据
print(normalized_image)
```

# torchaudio

## load(X)

```
import torchaudio
#读入语音
filename=r"0_0_0_0_1_1_1_1.wav"
waveform,sample_rate=torchaudio.load(filename)
print(waveform,"\n",sample_rate)
```

输出

```
tensor([[ 3.0518e-05,  6.1035e-05,  3.0518e-05,  ..., -1.8616e-03,
         -2.2583e-03, -1.3733e-03]])
 8000
```

# tqdm

```
pip install tqdm
```

## tqdm

添加进度条

原始：

```
 # for i, (img_data_, category_, offset_) in enumerate(train_dataloader):
```

```
for i, (img_data_, category_, offset_) in enumerate(tqdm(validate_dataloader, desc="验证数据加载", unit="批次")):
```

完整使用方法

```
#tqdm
from tqdm import tqdm
iters=100
processbar=tqdm(range(iters),desc="Adam优化",unit="批次")
for iter in processbar:
    loss=torch.randn(1)
    f_vals=torch.randn(1)
    # 损失显示
    processbar.set_postfix(loss=loss.item(),val=f_vals.item())
```

输出

Adam优化: 100%|██████████| 100/100 [00:00<00:00, 2195.74批次/s, loss=-0.925, val=0.73]

# math

## modf(X)



# sklearn

```
pip install scikit-learn
```



# PIL

## Image

```
from PIL import Image
```

### open(X)

打开图像并读取图像的大小

```
Image.open(image_file)
```

```
with Image.open(image_file) as img:
	img_w, img_h = img.size
```

### fromarray(X,X)

```
PIL.Image.fromarray(obj, mode=None)
```

- **`obj`**：这是一个 `numpy` 数组，通常是一个多维数组，表示图像的数据。
  - 对于灰度图像，数组的形状通常是 `(height, width)`，即二维数组。
  - 对于 RGB 图像，数组的形状通常是 `(height, width, 3)`，表示每个像素有 3 个通道（红色、绿色和蓝色）。
  - 对于 RGBA 图像，数组的形状通常是 `(height, width, 4)`，表示每个像素有 4 个通道（红色、绿色、蓝色和透明度通道）。
- **`mode`**：这是一个可选的参数，用于指定输出图像的模式。常见的图像模式包括：
  - `'1'`：1 位像素（黑白图像）
  - `'L'`：8 位像素，灰度图（每个像素是一个 0-255 之间的灰度值）
  - `'RGB'`：每个像素由红色、绿色和蓝色三种颜色通道组成
  - `'RGBA'`：每个像素由红色、绿色、蓝色和透明度四个通道组成
  - `'CMYK'`：每个像素由青色、品红色、黄色和黑色四个通道组成

示例

```
import numpy as np
from PIL import Image
# 创建一个 100x100 的 RGB 图像（随机的红、绿、蓝通道值）
array = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)
# 从 NumPy 数组创建 RGB 图像
img = Image.fromarray(array, mode='RGB')
# 显示图像
img.show()
# 保存图像
img.save("rgb_image.png")

```

输出

<img src="/docs/python语法/代码语法_localdata/image-20250211215519335.png" alt="image-20250211215519335" style="zoom: 25%;" />

原始格式不匹配的使用astype('uint8')转换

```
img = Image.fromarray(res.astype('uint8'), mode='RGBA')
```

### new(X,X,X)

用于创建一张新的图像。这个方法可以用来生成空白的图像，也可以用来创建一个特定颜色的背景图像。

```
PIL.Image.new(mode, size, color=0)
```

1. **mode**：图像的色彩模式，定义了图像每个像素的颜色数据的结构。常见的模式有：
   - `'1'`：1位像素（黑白二值图像）
   - `'L'`：8位像素（灰度图像）
   - `'RGB'`：24位像素（红、绿、蓝三色通道的彩色图像）
   - `'RGBA'`：32位像素（包括红、绿、蓝通道和透明度通道）
   - `'CMYK'`：每个像素有四个通道：青色（Cyan）、洋红色（Magenta）、黄色（Yellow）、黑色（Key）
   - `'P'`：调色板模式（用于每个像素用一个索引表示色彩）
   - `'I'`：32位整型像素
   - `'F'`：32位浮动小数型像素
2. **size**：图像的大小，通常是一个元组 `(width, height)`，表示图像的宽度和高度。
3. **color**：可选，填充颜色。如果你创建的图像是空白的，或者你希望用特定颜色填充整个图像，这个参数就很有用。它的默认值为 `0`（黑色）。对于 `'RGB'` 模式，`color` 参数通常是一个元组，表示 RGB 颜色值，如 `(255, 255, 255)` 表示白色；对于 `'L'` 模式，`color` 是一个灰度值（例如 `128` 表示灰色）。

示例

```
from PIL import Image

# 创建一个 200x200 的黑色背景图像
img = Image.new("RGB", (200, 200), (0, 0, 0))
img.show()  # 显示图像
```

输出

<img src="/docs/python语法/代码语法_localdata/image-20250212003440182.png" alt="image-20250212003440182" style="zoom:25%;" />

示例2

```
from PIL import Image

# 创建一个 150x150 的半透明背景图像（RGBA模式）
img = Image.new("RGBA", (150, 150), (255, 0, 0, 128))  # 红色半透明
img.show()  # 显示图像

```

输出

<img src="/docs/python语法/代码语法_localdata/image-20250212003503036.png" alt="image-20250212003503036" style="zoom: 33%;" />

### 返回值：

- 返回一个新的 `Image` 对象，表示创建的图像。

### 类方法

#### X.size

获取图片长宽

```
w1, h1 = img.size
```

#### crop(X)

图像裁剪，X是一个包含四个元素的元组 `(left, upper, right, lower)`，定义了裁剪区域

```
img.crop(crop_box)
```

```
from PIL import Image
img = Image.open("image.jpg")
crop_box = (100, 100, 400, 400)  # 裁剪区域的左、上、右、下坐标
face_crop = img.crop(crop_box)
face_crop.show()  # 显示裁剪后的图像
```

#### resize(X)

```
resized =Image.resize(size, resample=0)
```

size：一个包含两个整数的元组 (width, height)，表示目标图像的宽度和高度。
resample：可选参数，指定调整大小时使用的重采样算法。常用的值包括：
Image.NEAREST：最邻近算法（最快，但图像可能不平滑）。
Image.BILINEAR：双线性插值（更平滑的效果）。
Image.BICUBIC：立方插值（效果最好，但计算量较大）。
Image.LANCZOS：高质量下采样。

#### X.show(X)

显示图片

#### X.save(X)

保存图片

#### X.thumbnail(X)

用于修改图像的大小，同时保持其纵横比。这个方法会原地修改图像（即改变原图），并不会返回一个新的图像对象

- **(width, height)**：一个元组，指定缩略图的最大宽度和高度。图像会根据这个尺寸进行缩放，同时保持原始图像的纵横比。如果图像的宽高比不同于提供的宽高比，图像的缩略图会在保证宽度或高度不超过限制的情况下进行缩放，另外一个维度会自适应。

示例

```
from PIL import Image
# 打开图像
image = Image.open('1.jpg')
# 设置最大宽度和高度
max_size = (150, 150)
# 创建缩略图
image.thumbnail(max_size)
print(np.array(image).shape)
# 保存为新的文件
image.save('example_thumbnail.jpg')
```

输出

```
(123, 150, 3)
```



# sum()

可对单层列表求和，返回1个数，否则报错

# time

## 类方法

### time()

使用time计算一段代码的执行时间

粗计时

```
import time
# 记录开始时间
start_time = time.time()
# 需要测量执行时间的代码
for i in range(1000000):
    pass  # 示例代码：循环一百万次
# 记录结束时间
end_time = time.time()
# 计算执行时间
execution_time = end_time - start_time
print(f"代码执行时间: {execution_time} 秒")
```

  精计时

```
import time
# 记录开始时间
start_time = time.perf_counter()
# 需要测量执行时间的代码
for i in range(1000000):
    pass  # 示例代码：循环一百万次
# 记录结束时间
end_time = time.perf_counter()
# 计算执行时间
execution_time = end_time - start_time
print(f"代码执行时间: {execution_time} 秒")
```



# random

```
import random
```

## random.uniform(X)

返回的值是区间 `[a, b]` 中的一个随机浮点数

```
random.uniform(a, b)
```

## random.choice(X)

从列表中随机选择一个元素

```
my_list = [1, 2, 3, 4, 5]
random_element = random.choice(my_list)
print(random_element)  # 输出：1，2，3，4，或5（随机）
```

从字符串中随机选择一个字符

```
my_string = "hello"
random_char = random.choice(my_string)
print(random_char)  # 输出：'h'，'e'，'l'，'o' 中的一个字符
```

## random.randint

生成一个 1 到 10 之间的随机整数

```
random_int = random.randint(1, 10)
print(random_int)  # 输出：1，2，3，4，5，6，7，8，9，或10（随机）
```

# cv2

# open()

```
file = open("file_path", "w")
```

## write()

```
file.write(string)
```

write()

1. 仅接受一个字符串作为参数
2. 不会自动添加换行符。如果你需要换行，需要手动添加 \n

```
positive_anno_file.write("Hello, world!\n")  # 写入一行文本并换行
```

# format()

format() 是 Python 中的字符串方法，用于将指定的值插入到字符串中的占位符 {} 中。它可以接收多个参数并按顺序插入到对应的位置。

exp1:f

```
"string {0} and {1}".format(value1, value2)
```

exp2:

```
print("最优自变量{0:.4f},最优目标函数{1:.4f}".format(xOpt,objf(xOpt)))
```



# os

## path

### exists(X)

```
if os.path.exists("X"):
	pass
```

## makedirs(X)

```
os.makedirs("./param")
```

# tensorflow

## V1

```
pip uninstall tensorflow
pip install tensorflow==1.15 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### placeholder(X)

### Variable(X)

### global_variables_initializer(X)

### 类方法



## V2

# torchtext

```
pip install torchtext -i https://pypi.tuna.tsinghua.edu.cn/simple
```

```
import torchtext
```

## vocab

### GloVe(X)

建立词表

```
gv = torchtext.vocab.GloVe(name="6B", dim=50)
```

- `torchtext.vocab.GloVe` 是用于加载 GloVe 预训练词向量的函数。
- `name="6B"` 表示加载 "GloVe 6B" 预训练模型。这个模型是基于 6 亿词的语料库进行训练的。
- `dim=50` 表示每个词的词向量将被表示为 50 维的向量。

#### 类方法

#### 类变量

#### stoi

根据word获取索引

`gv.stoi[word]` 是将词 `word` 转换为它在词汇表中的索引。

##### vectors

该函数返回给定词 `word` 的词向量，是一个矩阵，每一行对应一个词的词向量

```
def get_wv(word):
    return gv.vectors[gv.stoi[word]]
```

- `gv.stoi[word]` 是将词 `word` 转换为它在词汇表中的索引。
- `gv.vectors` 是一个矩阵，每一行对应一个词的词向量。`gv.vectors[gv.stoi[word]]` 获取该词的词向量。
- 该函数返回给定词 `word` 的词向量。

##### itos

根据索引 `i` 获取词汇表中的词。

```
gv.itos[i]
```



## dist

# moviepy

```
pip install moviepy
```

##

> 报错ModuleNotFoundError: No module named 'moviepy.editor'
>
> 改为
>
> ```
> from moviepy import VideoFileClip, AudioFileClip
> ```

# argparse

使用双引号

```
#参数
import argparse
parser=argparse.ArgumentParser(description="SGCN_Module")
#训练参数
parser.add_argument("--epochs",default=300,type=int,metavar="N",help="迭代次数")#迭代次数
parser.add_argument("--outputdict", default={}, type=dict,metavar="N",help="输出数据")
#模型参数
parser.add_argument("--num_nodes", default={}, type=dict,metavar="N",help="节点个数")
parser.add_argument("--in_channels", default={}, type=dict,metavar="N",help="节点特征数")
parser.add_argument("--batch_size", default=5, type=int,metavar="N",help="批大小")
parser.add_argument("--timesteps", default={}, type=dict,metavar="N",help="输入时间序列长度")
parser.add_argument("--predictsteps", default={}, type=dict,metavar="N",help="输出数据")
args = parser.parse_args()
if __name__=="__main__":
    # 打印解析后的参数
    print("Epochs:", args.epochs)
    print("Output dict:", args.outputdict)
    print("Number of nodes:", args.num_nodes)
    print("Input channels:", args.in_channels)
    print("Batch size:", args.batch_size)
    print("Timesteps:", args.timesteps)
    print("Predict steps:", args.predictsteps)
```



# 环境

工作文件夹

安装torch、cuda、cudnn、cudatoolkit

```
activate aiclass_torch_3p11
```

不破坏安装

```
pip install torchaudio --no-deps
```

>    import cv2
>    ModuleNotFoundError: No module named 'cv2'
>
>    ```
>    pip install opencv-python
>    ```

> 查看cuda能否使用
>
> ```
> import torch
>
> # 检查是否有可用的 CUDA 设备
> print(torch.cuda.is_available())
>
> # 输出当前 CUDA 设备的信息
> if torch.cuda.is_available():
>      print(f"CUDA Device Name: {torch.cuda.get_device_name(0)}")
>      print(f"CUDA Device Memory: {torch.cuda.get_device_properties(0).total_memory}")
> else:
>      print("CUDA is not available.")
> ```

> conda新建环境安装路径修改
>
> ```
> envs_dirs:
>   - D://Anaconda//envs
> ```

> CondaValueError: You have chosen a non-default solver backend (libmamba) but it was not recognized. Choose one of: classic
>
> ```
> conda config --set solver classic
> ```

****
$$
