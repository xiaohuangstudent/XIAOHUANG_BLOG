# Windows下PX4与Simulink配置教程

## 环境与源码准备（避免网络/TLS问题）

1. **在WSL2 Ubuntu中拉取PX4源码**
   - 使用 `git clone --recursive` 克隆，但国内网络容易遇到 `gnutls_handshake` 失败。
   - **解决方案**：

     bash

     ```
     git config --global http.version HTTP/1.1
     git config --global --unset http.proxy
     git config --global --unset https.proxy
     ```

   - 如果个别子模块（如 `nlohmann/json`）克隆失败，手动下载zip并解压到对应路径，或改用 `git submodule update --force --recursive`。

2. **切换到与MATLAB R2024b兼容的PX4版本**
   - 官方要求 v1.14.3，你已从 v1.14.0 升级：

     bash

     ```
     git checkout v1.14.3
     git submodule update --init --recursive --force
     ```

## 解决固件体积超限（FLASH溢出）

使用 `px4_fmu-v5_multicopter` 代替 `px4_fmu-v5_default`，它去掉了固定翼、UUV、小车等模块，能将固件大小控制在2MB以内。

- **在Simulink中修改**：
  `Model Configuration Parameters` → `Hardware Implementation` → `Target hardware resources` → `Build options` → `CMake configuration` → 选择 `px4_fmu-v5_multicopter`。

## 启动脚本（rc.txt）的正确用法

**你的目标**：只用Simulink外部模式（Monitor & Tune）通过USB读取数据，不依赖QGC。

**正确配置**（SD卡根目录下的 `rc.txt`）：

bash

```
# 禁用PX4原生多旋翼控制器（关键！）
mc_att_control stop
mc_pos_control stop

# 启动基本传感器和估计器
sensors start
ekf2 start
commander start   # 用于解锁/上锁，但不干扰你的控制

# 启动你的Simulink模型
px4_simulink_app start

# 注意：不要启动 MAVLink！否则会和外部模式争抢USB端口
```

**绝对不要**包含 `mavlink start -d /dev/ttyACM0`，否则Simulink外部模式无法连接。

## Simulink模型搭建（读取姿态+位置）

### 正确读取uORB消息（避免总线错误）

- 使用 **PX4 uORB Read** 模块，设置 `Topic name`：
  - `vehicle_attitude` → 输出四元数（`q[0..3]`）或欧拉角
  - `vehicle_local_position` → 输出 `x, y, z`（米）
- **每个 uORB Read 后面必须紧跟 Bus Selector**，从中勾选你需要的具体信号：
  - 例如勾选 `q[0]` `q[1]` `q[2]` `q[3]`
- 将 Bus Selector 输出的四元数连接到 **Quaternion to Rotation Angles** 模块，得到 roll/pitch/yaw（弧度）。
- 用 Gain (180/pi) 转为度数，最后接 **Display** 模块。

### 错误案例

- 直接把 uORB Read 的整个总线连到 Display → 报错“需要非总线信号”
- 使用 Bus to Vector 但输入不是虚拟总线 → 报错“不接受非虚拟总线”

**正确连接**：
`uORB Read` → `Bus Selector`（选具体信号）→ `Quaternion to Rotation Angles`（可选）→ `Display`/`Scope`

## Simulink配置（求解器与运行模式）

- **求解器**：`Fixed-step`, `discrete (no continuous states)`, 步长 `0.01` (100Hz)
- **硬件设置**：
  `Hardware Implementation` → `Target hardware resources` → `External mode`
  - 取消勾选 `Use the same host serial port...`
  - 手动填入串口号（如COM5，Windows设备管理器中查看）
- **运行模式**：
  点击 **Hardware** 选项卡 → `Mode: Run on board` → **Monitor & Tune**
  **不要**用 `Connected I/O`（那是临时读取，不会运行你的模型）
  **不要**用普通绿色“运行”（那是纯电脑仿真）

## 常见问题与解决

| 现象                              | 原因                      | 解决                                   |
| :-------------------------------- | :------------------------ | :------------------------------------- |
| `gnutls_handshake()` 失败         | Git TLS/代理问题          | 设置 `http.version HTTP/1.1`，清除代理 |
| `FLASH_AXIM overflowed`           | 固件太大                  | 使用 `px4_fmu-v5_multicopter` 配置     |
| QGC能连，但Simulink外部模式连不上 | `rc.txt` 中启动了 MAVLink | 注释掉 `mavlink start`                 |
| 外部模式连接超时                  | 串口号错误或端口被占用    | 关闭QGC，在设备管理器中确认COM号       |
| `Display` 报错“需要非总线信号”    | 直接把总线接到Display     | 加 `Bus Selector` 提取标量             |
| `Bus to Vector` 报错              | 输入不是虚拟总线          | 改用 `Bus Selector` 直接提取信号       |
| 编译成功但上电后无数据            | SD卡中残留旧 `rc.txt`     | 删除 `rc.txt`，只保留你写的新版        |

## 最终成功流程

1. WSL中拉取PX4 v1.14.3，用 `px4_fmu-v5_multicopter` 配置。
2. SD卡中放入不含MAVLink且禁用原生控制器的 `rc.txt`。
3. Simulink模型中每个 `uORB Read` 后接 `Bus Selector` 提取具体信号。
4. 设置固定步长0.01s，选择 `Monitor & Tune` 模式，指定正确COM口。
5. 烧录一次，以后调参可直接在Simulink中改Gain值实时生效。

你现在已经完全走通了从“编译固件”到“实时读取姿态”的完整链路。下一步可以基于这些数据设计你自己的控制器（将控制输出写入 `actuator_controls_0` 等主题）。

如果还有任何细节不清楚，随时告诉我，我可以针对某个环节再展开讲解。
