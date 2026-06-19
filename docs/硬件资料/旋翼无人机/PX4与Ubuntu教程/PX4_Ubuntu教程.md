# PX4 Ubuntu教程

## mid360教程

mid360快速使用指南： [Livox_Mid-360_Quick_Start_Guide_multi.pdf](PX4_Ubuntu教程.assets\Livox_Mid-360_Quick_Start_Guide_multi.pdf) 

mid360上位机使用指南： [Livox_Viewer_2_User_Manual_chs_v1.2.pdf](PX4_Ubuntu教程.assets\Livox_Viewer_2_User_Manual_chs_v1.2.pdf) 

### 设置静态IP驱动上位机

1. **打开“网络连接”窗口**

   - 按下键盘快捷键 `Win + R`，输入 `ncpa.cpl`，然后点击“确定”。
   - 或者：右键点击任务栏右下角的网络图标 → 选择“打开网络和 Internet 设置” → 点击“更改适配器选项”。

2. **找到您正在使用的网卡**

   - 通常名为“以太网”或“本地连接”。如果使用的是 USB 转网口，可能会显示为“Realtek USB GbE Family”等。
   - 确认网线已连接 Livox 设备。

3. **打开网卡属性**

   - 右键点击该网卡 → 选择 **“属性”**。

4. **选择 Internet 协议版本 4 (TCP/IPv4)**

   - 在列表中双击 **“Internet 协议版本 4 (TCP/IPv4)”** 或选中后点击“属性”。

5. **填写静态 IP 地址**

   - 选择 **“使用下面的 IP 地址”**。

   - 在对应框中输入：

     text

     ```
     IP 地址：192.168.1.2
     子网掩码：255.255.255.0
     默认网关：192.168.1.1
     ```

   - **首选 DNS 服务器** 可以留空，或填 `8.8.8.8`（不影响设备通信）。

6. **确认并保存**

   - 依次点击“确定” → “关闭”。
   - 设置立即生效，无需重启电脑。

7. **验证（可选）**

   - 打开命令提示符（`Win + R` → 输入 `cmd` → 回车）。
   - 输入 `ipconfig`，查看对应网卡是否显示上述 IP 地址。



### 驱动配置

教程：[Ubuntu 20.04使用Livox Mid-360](http://www.lryc.cn/news/266645.html?action=onClick)

教程：[使用ros2跑mid360的fastlio2算法详细教程_mid360 ros2-CSDN博客](https://blog.csdn.net/2301_79618994/article/details/150475756)

**完整流程**

#### linux硬件驱动安装

安装CMAKE库`$ sudo apt install cmake`

 然后用下面的代码，确认一下gcc版本大于4.8.1

```cmd
gcc -v
```

执行如下命令克隆、编译、安装库。

```
git clone https://github.com/Livox-SDK/Livox-SDK2.git
cd ./Livox-SDK2/
mkdir build
cd build
cmake .. && make -j
sudo make install
```

#### ros2驱动安装

在linux硬件安装的基础上安装ros2的驱动

新建ros_ws文件夹作为ROS2的工作目录，并在目录下新建src文件存放套件源码

```
mkdir -p ros_ws/src/
cd ros_ws/src/
```

克隆livox_ros_driver2 到src目录

```
git clone https://github.com/Livox-SDK/livox_ros_driver2.git
```

编译驱动

```
source /opt/ros/humble/setup.sh
./build.sh humble
```

~/mid360/ros_ws/src/livox_ros_driver2一般在这个目录下可以找到build.sh

**修改，ros_ws/install/livox_ros_driver2/share/livox_ros_driver2/config/MID360_config.json**中的本机ip 和设备ip

- **`host_net_info` 下所有 IP**：填 Orange Pi **有线网卡**的 IP（`192.168.1.50`）
- **`lidar_configs` 下的 `"ip"`**：填雷达实际 IP（`192.168.1.195`）
- **注意检查**`src` 和 `install` 两个目录下的配置文件需同步修改，修改后需重新编译。

```
{
  "lidar_summary_info" : {
    "lidar_type": 8
  },
  "MID360": {
    "lidar_net_info" : {
      "cmd_data_port": 56100,
      "push_msg_port": 56200,
      "point_data_port": 56300,
      "imu_data_port": 56400,
      "log_data_port": 56500
    },
    "host_net_info" : {
      "cmd_data_ip" : "192.168.1.50",//网口ip
      "cmd_data_port": 56101,
      "push_msg_ip": "192.168.1.50",
      "push_msg_port": 56201,
      "point_data_ip": "192.168.1.50",
      "point_data_port": 56301,
      "imu_data_ip" : "192.168.1.50",
      "imu_data_port": 56401,
      "log_data_ip" : "",
      "log_data_port": 56501
    }
  },
  "lidar_configs" : [
    {
      "ip" : "192.168.1.195",//雷达ip,最后俩位查看雷达的sn码来修改
      "pcl_data_type" : 1,
      "pattern_mode" : 0,
      "extrinsic_parameter" : {
        "roll": 0.0,
        "pitch": 0.0,
        "yaw": 0.0,
        "x": 0,
        "y": 0,
        "z": 0
      }
    }
  ]
}
```

驱动代码

```
source ../../install/setup.sh
ros2 launch livox_ros_driver2 rviz_MID360_launch.py
```

运行之后就可以得到点云图。

<img src="https://i-blog.csdnimg.cn/direct/5debc46b85eb4ca68e7ca6a76232db2c.png" alt="img" style="zoom: 25%;" />

> [!WARNING]
>
> **编译 Livox-SDK2 时进程被 Killed**
>
> > [!Tip]
> >
> > 增大交换空间（参考ROS2博客）

### fastlio2算法包

```
cd ros_ws/src # cd into a ros2 workspace folder
git clone https://github.com/Ericsii/FAST_LIO.git --recursive
cd ..
rosdep install --from-paths src --ignore-src -y
colcon build --symlink-install     //务必使用这个来编译，其他指令很容易报错
```

**编译 FAST-LIO2**

```
cd ~/px4_mid360_project/mid360_fastlio_ws
colcon build --packages-select fast_lio
source install/setup.bash
```

> [!Warning]
>
> **Fastlio2不支持PointCloud2格式数据**
>
> > [!Tip]
> >  **修改 `mid360.yaml` 配置文件中的 `lidar_type`**
> >
> > 将 `lidar_type` 从 `1`（Livox CustomMsg）改为 `2`（Velodyne/通用 PointCloud2 格式）

**启动命令与 RViz2 设置**

- **启动雷达驱动**（需指定 `xfer_format:=0` 以输出标准 PointCloud2）：

  ```bash
  ros2 launch livox_ros_driver2 rviz_MID360.launch.py xfer_format:=0
  ```

- **启动 FAST-LIO 算法**（另开终端）：

  ```
  ros2 launch fast_lio mapping.launch.py
  ```

- `ros2 topic hz /livox/lidar` 显示非零频率（如 10Hz）

### 网络配置

重要工具：**wireshake**

**网络分工**：

- **WiFi (wlan0)**：连接外网，用于 SSH 远程调试，IP：`192.168.1.12`
- **有线网卡 (eth0)**：直连雷达，专用于接收点云数据，IP：`192.168.1.50`
- **雷达 IP**：`192.168.1.195`（通过 Windows 上位机 Livox Viewer 2 修改）

<img src="./PX4_Ubuntu教程.assets/image-20260619104659174.png" alt="image-20260619104659174" style="zoom: 25%;" />

> [!Tip]
>
> **注意使用mid360上位机修改mid360ip后，不要再次用上位机连接，ip会被重置的**

网络先后顺序配置

```
sudo nmcli connection modify "Wired connection 1" ipv4.route-metric 200
sudo nmcli connection modify "FeatureDynamic" ipv4.route-metric 100
sudo nmcli connection modify "Wired connection 1" +ipv4.routes "192.168.1.195/32 0.0.0.0"
sudo nmcli connection up "Wired connection 1"
sudo nmcli connection up "FeatureDynamic"
```

> [!WARNING]
>
> **插上网线后 WiFi 无法上网 / SSH 断开**
>
> > [!Tip]
> >
> > **降低有线网卡优先级**，**提高 WiFi 优先级**，**删除有线网卡的默认网关**（防止抢网），**添加专属路由**（强制 `192.168.1.195` 只走有线网卡），**重启连接**
> >
> > ```
> > sudo nmcli connection modify "Wired connection 1" ipv4.route-metric 200
> > ```
> >
> > ```
> > sudo nmcli connection modify "FeatureDynamic" ipv4.route-metric 100
> > ```
> >
> > ```
> > sudo nmcli connection modify "Wired connection 1" ipv4.gateway ""
> > ```
> >
> > ```
> > sudo nmcli connection modify "Wired connection 1" +ipv4.routes "192.168.1.195/32 0.0.0.0"
> > ```
> >
> > ```
> > sudo nmcli connection up "Wired connection 1"
> > sudo nmcli connection up "FeatureDynamic"
> > ```
