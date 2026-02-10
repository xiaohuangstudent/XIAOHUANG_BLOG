# OpenMV

函数参考：[Python背景知识 · OpenMV中文入门教程](https://book.openmv.cc/python-background.html)

官方函数参考：[Search — MicroPython 1.24 documentation](https://docs.openmv.io/search.html?q=lab&check_keywords=yes&area=default#)

[image — 机器视觉 — MicroPython 1.22 文档](https://docs.singtown.com/micropython/zh/latest/openmvcam/library/omv.image.html)

## 色域

### LAB

**LAB**（又称**CIE LAB**）是一个颜色空间，它基于人类视觉感知的方式来表示颜色，常用于图像分析和处理。LAB颜色空间的三个分量分别为：

1. **L**：表示亮度（Lightness），从0到100，0代表黑色，100代表白色。
2. **A**：表示绿色到红色的色差，值范围通常为-128到128，负值表示绿色，正值表示红色。
3. **B**：表示蓝色到黄色的色差，值范围通常为-128到128，负值表示蓝色，正值表示黄色。

## helloworld

```python
# 本作品采用MIT许可证授权。
# 版权所有 (c) 2013-2023 OpenMV LLC。保留所有权利。
# https://github.com/openmv/openmv/blob/master/LICENSE
#
# 你好世界示例
#
# 欢迎使用OpenMV IDE！点击下方的绿色运行箭头按钮来运行脚本！

import sensor
import time

sensor.reset()  # 重置并初始化传感器。
sensor.set_pixformat(sensor.RGB565)  # 将像素格式设置为RGB565 (or GRAYSCALE)
sensor.set_framesize(sensor.QVGA)  # 将帧大小设置为QVGA (320x240)
sensor.skip_frames(time=2000)  # 等待设置生效。
clock = time.clock()  # 创建一个时钟对象来跟踪FPS。

while True:
    clock.tick()  # 更新FPS时钟。
    img = sensor.snapshot()  # 拍照并返回图像。
    print(clock.fps())  # 注意：OpenMV摄像头在连接至IDE时运行速度会降低约一半。
    # 断开连接后，帧率应会提升。
```

## 延时拍照

```python
# 保存图片例程
#
# 注意:您需要一张SD卡来运行这个例子
#
# 你可以使用你的OpenMV摄像头来保存图像文件

import sensor
import time
import machine

sensor.reset()  # 初始化sensor
sensor.set_pixformat(sensor.RGB565)  # 设置图像色彩格式，有RGB565色彩图和GRAYSCALE灰度图两种
sensor.set_framesize(sensor.QVGA)  # 设置图像像素大小 QVGA (320x240)
sensor.skip_frames(time=2000)  # 让新的设置生效

led = machine.LED("LED_BLUE")

start = time.ticks_ms()
while time.ticks_diff(time.ticks_ms(), start) < 3000:
    sensor.snapshot()
    led.toggle()

led.off()

img = sensor.snapshot()
img.save("example.jpg")  # or "example.bmp" (or others)

raise (Exception("Please reset the camera to see the new file."))
```

## 像素操作

- 获取/设置像素点

```
img = sensor.snapshot()
img.get_pixel(10,10)
img.set_pixcel(10,10,(255,0,0))#设置坐标(10,10)的像素点为红色(255,0,0)
```

- 获取图像的宽度和高度、灰度还是彩图、图像大小

```
image.width()
返回图像的宽度(像素)

image.height()
返回图像的高度(像素)

image.format()
灰度图会返回 sensor.GRAYSCALE，彩色图会返回 sensor.RGB565。

image.size()
返回图像的大小(byte)
```

- 二值化图像反色

```
image.invert()
取反，对于二值化的图像，0(黑)变成1(白)，1(白)变成0(黑)。
```

- 两图像与非、或非、异或、异或非

```
image.nand(image)
与另一个图片进行与非（NAND）运算。

image.nor(image)
与另一个图片进行或非（NOR）运算。

image.xor(image)
与另一个图片进行异或（XOR）运算。

image.xnor(image)
与另一个图片进行异或非（XNOR）运算。
```

- 两图像相减

```
image.difference(image)
从这张图片减去另一个图片。比如，对于每个通道的每个像素点，取相减绝对值操作。这个函数，经常用来做移动检测。
```

## 统计信息与图像算法

### ROI感兴趣区域

```
roi的格式是(x, y, w, h)的tupple.

x:ROI区域中左上角的x坐标
y:ROI区域中左上角的y坐标
w:ROI的宽度
h:ROI的高度
```

### statistics

先试用 **img.get_statistics(roi=ROI)**和ROI获得statistics对象，再点访问获取参数

```python
ROI=(80,30,15,15)

img = sensor.snapshot()         # Take a picture and return the image.
statistics=img.get_statistics(roi=ROI)
color_l=statistics.l_mode()
```

灰度

- statistics.mean() 返回灰度的**平均数**(0-255) (int)。你也可以通过statistics[0]获得。
- statistics.median() 返回灰度的**中位数**(0-255) (int)。你也可以通过statistics[1]获得。
- statistics.mode() 返回灰度的**众数**(0-255) (int)。你也可以通过statistics[2]获得。
- statistics.stdev() 返回灰度的**标准差**(0-255) (int)。你也可以通过statistics[3]获得。
- statistics.min() 返回灰度的**最小值**(0-255) (int)。你也可以通过statistics[4]获得。
- statistics.max() 返回灰度的**最大值**(0-255) (int)。你也可以通过statistics[5]获得。
- statistics.lq() 返回灰度的**第一四分数**(0-255) (int)。你也可以通过statistics[6]获得。
- statistics.uq() 返回灰度的**第三四分数**(0-255) (int)。你也可以通过statistics[7]获得。

LAB通道

- l_mean，l_median，l_mode，l_stdev，l_min，l_max，l_lq，l_uq，
- a_mean，a_median，a_mode，a_stdev，a_min，a_max，a_lq，a_uq，
- b_mean，b_median，b_mode，b_stdev，b_min，b_max，b_lq，b_uq，

是LAB三个通道的平均数，中位数，众数，标准差，最小值，最大值，第一四分数，第三四分数。

```python
import sensor, image, time

sensor.reset() # 初始化摄像头
sensor.set_pixformat(sensor.RGB565) # 格式为 RGB565.
sensor.set_framesize(sensor.QVGA)
sensor.skip_frames(10) # 跳过10帧，使新设置生效
sensor.set_auto_whitebal(False)               # Create a clock object to track the FPS.

ROI=(80,30,15,15)

while(True):
    img = sensor.snapshot()         # Take a picture and return the image.
    statistics=img.get_statistics(roi=ROI)
    color_l=statistics.l_mode()
    color_a=statistics.a_mode()
    color_b=statistics.b_mode()
    print(color_l,color_a,color_b)
    img.draw_rectangle(ROI)
```

### 滤波器与图像变换

#### 镜头校正

```python
# 本示例展示了如何运用镜头校正方法来修正图像中的镜头
# 畸变。进行二维码/条形码/数据矩阵识别时需此操作。
# 逐步增强下方参数直至画面中的线条呈现笔直状态。
# 放大（数值调高）或缩小（数值调低）直至获得合适视野。

import sensor
import time

sensor.reset()
sensor.set_pixformat(sensor.RGB565)
sensor.set_framesize(sensor.QVGA)
sensor.skip_frames(time=2000)
clock = time.clock()

while True:
    clock.tick()

    img = sensor.snapshot().lens_corr(strength=1.8, zoom=1.0)

    print(clock.fps())
```



####  自适应直方图均衡化

```python
img = sensor.snapshot().histeq(adaptive=True, clip_limit=3)
```

#### 核滤波器

```
# 在图像的每个像素上运行内核。
img.morph(kernel_size, kernel)
```

#### 高斯滤波器对图像进行模糊处理

```
# 在图像的每个像素上运行内核。
img.gaussian(1)
```

#### 在彩色图像上使用双边滤波器

```
# color_sigma 控制像素在颜色上必须有多接近才能
# 一起模糊。较小的值意味着它们必须更接近。
# 较大的值则不那么严格。

# space_sigma 控制像素在空间上必须有多接近才能
# 一起模糊。较小的值意味着它们必须更接近。
# 较大的值则不那么严格。

# 在图像的每个像素上运行内核。
img.bilateral(3, color_sigma=0.1, space_sigma=1)

# 请注意，如果您将 color_sigma/space_sigma 设置得过于激进，
# 双边滤波器可能会引入图像缺陷。增加 sigma 值直到
# 如果你看到了缺陷，它们就会消失。
```

#### 灰度图像上应用双边滤波

```
img.bilateral(3, color_sigma=0.1, space_sigma=1)
```

#### 强光抑制

```
img = sensor.snapshot().binary([thresholds], invert=False, zero=True)
```

#### 拉普拉斯滤波器检测边缘

```
 img.laplacian(1)
```

#### Canny边缘检测

```
# Use Canny edge detector
img.find_edges(image.EDGE_CANNY, threshold=(50, 80))
```

#### 腐蚀和膨胀

```python
# 腐蚀和膨胀示例
#
# 此示例展示了腐蚀和膨胀功能的应用，您可以在
# 二值图像上运行这些功能以去除噪声。此示例最初是一个测试，但它
# 对于展示这些功能的工作原理非常有用。

import sensor

sensor.reset()
sensor.set_framesize(sensor.QVGA)

grayscale_thres = (170, 255)
rgb565_thres = (70, 100, -128, 127, -128, 127)

while True:
    sensor.set_pixformat(sensor.GRAYSCALE)
    for i in range(20):
        img = sensor.snapshot()
        img.binary([grayscale_thres])
        img.erode(2)
    for i in range(20):
        img = sensor.snapshot()
        img.binary([grayscale_thres])
        img.dilate(2)

    sensor.set_pixformat(sensor.RGB565)
    for i in range(20):
        img = sensor.snapshot()
        img.binary([rgb565_thres])
        img.erode(2)
    for i in range(20):
        img = sensor.snapshot()
        img.binary([rgb565_thres])
        img.dilate(2)
```

#### 伽马校正以使图像更亮

```
 img = sensor.snapshot().gamma_corr(gamma=0.5, contrast=1.0, brightness=0.0)
```

#### 灰度二值化

```
while True:
    # 测试低阈值
    for i in range(100):
        clock.tick()
        img = sensor.snapshot()
        img.binary([low_threshold])
        print(clock.fps())

    # 测试高阈值
    for i in range(100):
        clock.tick()
        img = sensor.snapshot()
        img.binary([high_threshold])
        print(clock.fps())

    # 测试非低阈值
    for i in range(100):
        clock.tick()
        img = sensor.snapshot()
        img.binary([low_threshold], invert=1)
        print(clock.fps())

    # 测试非高阈值
    for i in range(100):
        clock.tick()
        img = sensor.snapshot()
        img.binary([high_threshold], invert=1)
        print(clock.fps())
```

#### 极坐标变换

- 线性极坐标变换

```
img = sensor.snapshot().linpolar(reverse=False)
```

- 对数极坐标变换

```
img = sensor.snapshot().logpolar(reverse=False)
```

### 形状匹配

#### 找圆

```

```

## 画图

### 画线

```
image.draw_line((10,10,20,30), color=(255,0,0))
```

- image.draw_line(line_tuple, color=White) 在图像中画一条直线。
  - line_tuple的格式是(x0, y0, x1, y1)，意思是(x0, y0)到(x1, y1)的直线。
  - 颜色可以是灰度值(0-255)，或者是彩色值(r, g, b)的tupple。默认是白色

### 画框

- image.draw_rectangle(rect_tuple, color=White) 在图像中画一个矩形框。
  - rect_tuple 的格式是 (x, y, w, h)。

### 画圆

- image.draw_circle(x, y, radius, color=White) 在图像中画一个圆。
  - x,y是圆心坐标
  - radius是圆的半径

### 画十字

- image.draw_cross(x, y, size=5, color=White) 在图像中画一个十字
  - x,y是坐标
  - size是两侧的尺寸

### 写字

- image.draw_string(x, y, text, color=White) 在图像中写字 8x10的像素
  - x,y是坐标。使用\n, \r, and \r\n会使光标移动到下一行。
  - text是要写的字符串。

例子

```python
# Hello World Example
#
# Welcome to the OpenMV IDE! Click on the green run arrow button below to run the script!

import sensor, image, time

sensor.reset() # 初始化摄像头
sensor.set_pixformat(sensor.RGB565) # 格式为 RGB565.
sensor.set_framesize(sensor.QQVGA)
sensor.skip_frames(10) # 跳过10帧，使新设置生效
while(True):
    img = sensor.snapshot()         # Take a picture and return the image.
    img.draw_line((20, 30, 40, 50))
    img.draw_line((80, 50, 100, 100), color=(255,0,0))
    img.draw_rectangle((20, 30, 41, 51), color=(255,0,0))
    img.draw_circle(50, 50, 30)
    img.draw_cross(90,60,size=10)
    img.draw_string(10,10, "hello world!")
```

### 绘制箭头

```
r = randint(0, 127) + 128
g = randint(0, 127) + 128
b = randint(0, 127) + 128

# If the first argument is a scaler then this method expects
# to see x0, y0, x1, and y1. Otherwise, it expects a (x0,y0,x1,y1) tuple.
img.draw_arrow(x0, y0, x1, y1, color=(r, g, b), size=30, thickness=2)
```

### 画圆

- 查看x、y和半径。否则，它需要一个(x,y,半径)元组。

```
img.draw_circle(x, y, radius, color=(r, g, b), thickness=2, fill=False)
```

### 画十字

```
# If the first argument is a scaler then this method expects
# to see x and y. Otherwise, it expects a (x,y) tuple.
img.draw_cross(x, y, color=(r, g, b), size=10, thickness=2)
```

### 绘制椭圆

```
# If the first argument is a scaler then this method expects
# to see x, y, radius x, and radius y.
# Otherwise, it expects a (x,y,rx,ry) tuple.
img.draw_ellipse(
    x, y, rx, ry, rot, color=(r, g, b), thickness=2, fill=False
)
```

### 绘制正边矩形

```
img.draw_rectangle(x, y, w, h, color=(r, g, b), thickness=2, fill=False)
```

## 功能函数

### 寻找色块 find_blobs

```
image.find_blobs(thresholds, roi=Auto, x_stride=2, y_stride=1, invert=False, area_threshold=10, pixels_threshold=10, merge=False, margin=0, threshold_cb=None, merge_cb=None)
```

色域为LAB

- `minL` 和 `maxL`：分别定义了亮度（L）通道的最小值和最大值。用于限制颜色的亮度范围。
- `minA` 和 `maxA`：分别定义了 A 通道（绿色到红色的色差）的最小值和最大值。用于限制颜色在绿色和红色之间的范围。
- `minB` 和 `maxB`：分别定义了 B 通道（蓝色到黄色的色差）的最小值和最大值。用于限制颜色在蓝色和黄色之间的范围。

- thresholds是颜色的阈值，注意：这个参数是一个列表，可以包含多个颜色。如果你只需要一个颜色，那么在这个列表中只需要有一个颜色值，如果你想要多个颜色阈值，那这个列表就需要多个颜色阈值。注意：在返回的色块对象blob可以调用code方法，来判断是什么颜色的色块。，如

```
red = (xxx,xxx,xxx,xxx,xxx,xxx)
blue = (xxx,xxx,xxx,xxx,xxx,xxx)
yellow = (xxx,xxx,xxx,xxx,xxx,xxx)

img=sensor.snapshot()
red_blobs = img.find_blobs([red])

color_blobs = img.find_blobs([red,blue, yellow])
```

- roi是“感兴趣区”。在[使用统计信息](https://book.openmv.cc/image/statistics.html)中已经介绍过了。

  left_roi = [0,0,160,240]
  blobs = img.find_blobs([red],roi=left_roi)

- x_stride 就是查找的色块的x方向上最小宽度的像素，默认为2，如果你只想查找宽度10个像素以上的色块，那么就设置这个参数为10：

  blobs = img.find_blobs([red],x_stride=10)

- y_stride 就是查找的色块的y方向上最小宽度的像素，默认为1，如果你只想查找宽度5个像素以上的色块，那么就设置这个参数为5：

  blobs = img.find_blobs([red],y_stride=5)

- invert 反转阈值，把阈值以外的颜色作为阈值进行查找

- area_threshold 面积阈值，如果色块被框起来的面积小于这个值，会被过滤掉

- pixels_threshold 像素个数阈值，如果色块像素数量小于这个值，会被过滤掉

- merge 合并，如果设置为True，那么合并所有重叠的blob为一个。
  注意：这会合并所有的blob，无论是什么颜色的。如果你想混淆多种颜色的blob，只需要分别调用不同颜色阈值的find_blobs。

```
all_blobs = img.find_blobs([red,blue,yellow],merge=True)

red_blobs = img.find_blobs([red],merge=True)
blue_blobs = img.find_blobs([blue],merge=True)
yellow_blobs = img.find_blobs([yellow],merge=True)
Copy
```

- margin 边界，如果设置为1，那么两个blobs如果间距1一个像素点，也会被合并。

#### blob返回对象

find_blobs对象返回的是多个blob的列表

```
blobs = img.find_blobs([red])
```

blobs参数

- blob.rect() 返回这个色块的外框——矩形元组(x, y, w, h)，可以直接在image.draw_rectangle中使用。

- blob.x() 返回色块的外框的x坐标（int），也可以通过blob[0]来获取。

- blob.y() 返回色块的外框的y坐标（int），也可以通过blob[1]来获取。

- blob.w() 返回色块的外框的宽度w（int），也可以通过blob[2]来获取。

- blob.h() 返回色块的外框的高度h（int），也可以通过blob[3]来获取。

- blob.pixels() 返回色块的像素数量（int），也可以通过blob[4]来获取。

- blob.cx() 返回色块的外框的中心x坐标（int），也可以通过blob[5]来获取。

- blob.cy() 返回色块的外框的中心y坐标（int），也可以通过blob[6]来获取。

- blob.rotation() 返回色块的旋转角度（单位为弧度）（float）。如果色块类似一个铅笔，那么这个值为0~180°。如果色块是一个圆，那么这个值是无用的。如果色块完全没有对称性，那么你会得到0~360°，也可以通过blob[7]来获取。

- blob.code() 返回一个16bit数字，每一个bit会对应每一个阈值。举个例子：

  blobs = img.find_blobs([red, blue, yellow], merge=True)

如果这个色块是红色，那么它的code就是0001，如果是蓝色，那么它的code就是0010。注意：一个blob可能是合并的，如果是红色和蓝色的blob，那么这个blob就是0011。这个功能可以用于查找颜色代码。也可以通过blob[8]来获取。

- blob.count() 如果merge=True，那么就会有多个blob被合并到一个blob，这个函数返回的就是这个的数量。如果merge=False，那么返回值总是1。也可以通过blob[9]来获取。
- blob.area() 返回色块的外框的面积。应该等于(w * h)
- blob.density() 返回色块的密度。这等于色块的像素数除以外框的区域。如果密度较低，那么说明目标锁定的不是很好。
  比如，识别一个红色的圆，返回的blob.pixels()是目标圆的像素点数，blob.area()是圆的外接正方形的面积。

#### 阈值选择工具

工具 → Mechine Vision → Threshold Editor

## 多功能图像处理

### AprilTag标记追踪

### 模板匹配NCC

### 摄像头测距

## 外设与文件操作

### 文件操作

- 显示与加载图像

```python
# 将图像复制到帧缓冲区。
# 此示例展示了如何加载和显示图像。

import image
import time

# Load image
img = image.Image("/example.bmp", copy_to_fb=True)

# Add a small delay to allow the IDE to read the loaded image.
time.sleep_ms(1000)
```

### 闪灯

```python
import time
from machine import LED

led = LED("LED_BLUE")

while True:
    led.on()
    time.sleep_ms(500)
    led.off()
    time.sleep_ms(500)
```

