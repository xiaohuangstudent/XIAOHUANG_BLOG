# ROS2工作空间

## 编译工作空间

```
colcon build 
```

**工作空间的名称我们可以自己定义**，数量也并不是唯一的，比如：

```
工作空间1：ros2_ws_a, 用于A机器人的开发
工作空间1：ros2_ws_b, 用于B机器人的开发
工作空间1：ros2_ws_c, 用于C机器人的开发
```

以上情况是完全允许的，就像是我们在集成开发环境中创建了多个新工程一样，都是并列存在的关系。

## 设置环境变量

编译成功后，为了让系统能够找到我们的功能包和可执行文件，还需要设置环境变量：

```
# 仅在当前终端生效
source install/setup.bash   
# 所有终端均生效
echo "source ~/yahboomcar_ws/install/setup.bash" >> ~/.bashrc   
```

# ROS2功能包

## 创建功能包

使用这个格式的指令创建一个功能包：

```
ros2 pkg create <package_name> --build-type <build-type> --dependencies <dependencies> --node-name <node-name>
```

- **pkg**：表示功能包相关的功能；
- **create**：表示创建功能包；
- **package_name**：新建功能包的名字；
- **build-type**：表示新创建的功能包是C++还是Python的，如果使用C++或者C，那这里就跟ament_cmake，如果使用Python，就跟ament_python；
- **dependencies**：表示功能包的依赖项，C++功能包需包含rclcpp，Python功能包需包含rclpy ,还有其它需要的依赖；
- **node-name**：可执行程序的名称，会自动生成对应的源文件并生成配置文件；

比如在终端中分别创建C++和Python版本的功能包：

```
cd ~/yahboomcar_ros2_ws/yahboomcar_ws/src
# 创建C++功能包
ros2 pkg create pkg_helloworld_cpp --build-type ament_cmake --dependencies rclcpp --node-name helloworld  
# 创建Python功能包
ros2 pkg create pkg_helloworld_py --build-type ament_python --dependencies rclpy --node-name helloworld
```

## 编译功能包

在创建好的功能包中，我们可以继续完成代码的编写，之后需要编译和配置环境变量，才能正常运行：

```
# 编译工作空间所有功能包
colcon build   
# 编译指定功能包（一个或多个）
colcon build --packages-select 功能包列表
source install/setup.bash
```

## 带功能包的完整工作空间结构

ROS2工作空间的目录结构如下：

```
WorkSpace --- 自定义的工作空间。
    |--- build：存储中间文件的目录，该目录下会为每一个功能包创建一个单独子目录。
    |--- install：安装目录，该目录下会为每一个功能包创建一个单独子目录。
    |--- log：日志目录，用于存储日志文件。
    |--- src：用于存储功能包源码的目录。
        |-- C++功能包
            |-- package.xml：包信息，比如:包名、版本、作者、依赖项。
            |-- CMakeLists.txt：配置编译规则，比如源文件、依赖项、目标文件。
            |-- src：C++源文件目录。
            |-- include：头文件目录。
            |-- msg：消息接口文件目录。
            |-- srv：服务接口文件目录。
            |-- action：动作接口文件目录。
        |-- Python功能包
            |-- package.xml：包信息，比如:包名、版本、作者、依赖项。
            |-- setup.py：与C++功能包的CMakeLists.txt类似。
            |-- setup.cfg：功能包基本配置文件。
            |-- resource：资源目录。
            |-- test：存储测试相关文件。
            |-- 功能包同名目录：Python源文件目录。
```

另外，无论是Python功能包还是C++功能包，都可以自定义一些配置文件相关的目录。

```
|-- C++或Python功能包
    |-- launch：存储launch文件。
    |-- rviz：存储rviz2配置相关文件。
    |-- urdf：存储机器人建模文件。
    |-- params：存储参数文件。
    |-- world：存储仿真环境相关文件。
    |-- map：存储导航所需地图文件。
    |-- ......
```

上述这些目录也可以定义为其他名称，或者根据需要创建其他一些目录。