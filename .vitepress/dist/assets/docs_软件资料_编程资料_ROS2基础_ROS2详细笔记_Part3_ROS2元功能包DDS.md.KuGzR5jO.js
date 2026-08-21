import{_ as a,o as n,c as p,a4 as e}from"./chunks/framework.75w6ylfU.js";const l="/XIAOHUANG_BLOG/assets/image-20220528020740057.B6noCfhK.jpg",i="/XIAOHUANG_BLOG/assets/image-20220528020937717.CNfIeJc4.jpg",t="/XIAOHUANG_BLOG/assets/image-20250827115245194.BICUg4lE.png",o="/XIAOHUANG_BLOG/assets/image-20250827115358309.CLyig84V.png",c="/XIAOHUANG_BLOG/assets/image-20250827120250112.Dbhdpgq8.png",r="/XIAOHUANG_BLOG/assets/image-20250905153513257.S_OTsChd.png",d="/XIAOHUANG_BLOG/assets/image-20250905153734043.BdCylCIe.png",g="/XIAOHUANG_BLOG/assets/image-20250905155146210.CsK4Z4FR.png",v=JSON.parse('{"title":"ROS2元功能包","description":"","frontmatter":{},"headers":[],"relativePath":"docs/软件资料/编程资料/ROS2基础/ROS2详细笔记/Part3_ROS2元功能包DDS.md","filePath":"docs/软件资料/编程资料/ROS2基础/ROS2详细笔记/Part3_ROS2元功能包DDS.md"}'),u={name:"docs/软件资料/编程资料/ROS2基础/ROS2详细笔记/Part3_ROS2元功能包DDS.md"};function h(_,s,m,b,D,S){return n(),p("div",null,[...s[0]||(s[0]=[e(`<h1 id="ros2元功能包" tabindex="-1">ROS2元功能包 <a class="header-anchor" href="#ros2元功能包" aria-label="Permalink to &quot;ROS2元功能包&quot;">​</a></h1><h2 id="元功能包简介" tabindex="-1">元功能包简介 <a class="header-anchor" href="#元功能包简介" aria-label="Permalink to &quot;元功能包简介&quot;">​</a></h2><p>完成一个系统性的功能，可能涉及到多个功能包，比如实现了机器人导航模块，该模块下有地图、定位、路径规划...等不同的子级功能包。那么调用者安装该模块时，需要逐一的安装每一个功能包吗？</p><p>显而易见的，逐一安装功能包的效率低下，在ROS2中，提供了一种方式可以将不同的功能包打包成一个功能包，当安装某个功能模块时，直接调用打包后的功能包即可，该包又称之为元功能包(metapackage)。</p><p>MetaPackage是Linux的一个文件管理系统的概念。是 ROS2 中的一个虚包，里面没有实质性的内容，但是它依赖了其他的软件包，通过这种方法可以把其他包组合起来，我们可以认为它是一本书的目录索引，告诉我们这个包集合中有哪些子包，并且该去哪里下载。</p><p>例如：sudo apt install ros-humle-desktop 命令安装 ros2 时就使用了元功能包，该元功能包依赖于 ROS2 中的其他一些功能包，安装该包时会一并安装依赖。</p><p>元功能包经典案例：navigation2</p><ul><li>navigation2 github仓库：<a href="https://github.com/ros-navigation/navigation2" target="_blank" rel="noreferrer">GitHub - ros-navigation/navigation2: ROS 2 Navigation Framework and System</a></li></ul><p>方便用户的安装，我们只需要这一个包就可以把其他相关的软件包组织到一起安装了。</p><h2 id="ros2实现元功能包" tabindex="-1">ROS2实现元功能包 <a class="header-anchor" href="#ros2实现元功能包" aria-label="Permalink to &quot;ROS2实现元功能包&quot;">​</a></h2><ul><li>新建一个功能包</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ros2 pkg create pkg_metapackage</span></span></code></pre></div><ul><li>修改 package.xml 文件，添加执行时所依赖的包</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot;?&gt;</span></span>
<span class="line"><span>&lt;?xml-model href=&quot;http://download.ros.org/schema/package_format3.xsd&quot; schematypens=&quot;http://www.w3.org/2001/XMLSchema&quot;?&gt;</span></span>
<span class="line"><span>&lt;package format=&quot;3&quot;&gt;</span></span>
<span class="line"><span>  &lt;name&gt;pkg_metapackage&lt;/name&gt;</span></span>
<span class="line"><span>  &lt;version&gt;0.0.0&lt;/version&gt;</span></span>
<span class="line"><span>  &lt;description&gt;TODO: Package description&lt;/description&gt;</span></span>
<span class="line"><span>  &lt;maintainer email=&quot;1461190907@qq.com&quot;&gt;root&lt;/maintainer&gt;</span></span>
<span class="line"><span>  &lt;license&gt;TODO: License declaration&lt;/license&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;buildtool_depend&gt;ament_cmake&lt;/buildtool_depend&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;exec_depend&gt;pkg_interfaces&lt;/exec_depend&gt;</span></span>
<span class="line"><span>  &lt;exec_depend&gt;pkg_helloworld_py&lt;/exec_depend&gt;</span></span>
<span class="line"><span>  &lt;exec_depend&gt;pkg_topic&lt;/exec_depend&gt;</span></span>
<span class="line"><span>  &lt;exec_depend&gt;pkg_service&lt;/exec_depend&gt;</span></span>
<span class="line"><span>  &lt;exec_depend&gt;pkg_action&lt;/exec_depend&gt;</span></span>
<span class="line"><span>  &lt;exec_depend&gt;pkg_param&lt;/exec_depend&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;test_depend&gt;ament_lint_auto&lt;/test_depend&gt;</span></span>
<span class="line"><span>  &lt;test_depend&gt;ament_lint_common&lt;/test_depend&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;export&gt;</span></span>
<span class="line"><span>    &lt;build_type&gt;ament_cmake&lt;/build_type&gt;</span></span>
<span class="line"><span>  &lt;/export&gt;</span></span>
<span class="line"><span>&lt;/package&gt;</span></span></code></pre></div><ul><li>修改CMakeLists.txt，文件CMakeLists.txt内容如下</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cmake_minimum_required(VERSION 3.5)</span></span>
<span class="line"><span>project(pkg_metapackage)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES &quot;Clang&quot;)</span></span>
<span class="line"><span>  add_compile_options(-Wall -Wextra -Wpedantic)</span></span>
<span class="line"><span>endif()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>find_package(ament_cmake REQUIRED)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ament_package()</span></span></code></pre></div><p>4.编译元功能包</p><ul><li>不会有任何实际可执行文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>colcon build --packages-select pkg_metapackage</span></span></code></pre></div><h1 id="ros2分布式通讯" tabindex="-1">ROS2分布式通讯 <a class="header-anchor" href="#ros2分布式通讯" aria-label="Permalink to &quot;ROS2分布式通讯&quot;">​</a></h1><h2 id="ros2-dds简介" tabindex="-1">ROS2-DDS简介 <a class="header-anchor" href="#ros2-dds简介" aria-label="Permalink to &quot;ROS2-DDS简介&quot;">​</a></h2><p>多机通讯即分布式通信是指可以通过网络在不同主机之间实现数据交互的一种通信策略。</p><p>ROS2本身是一个分布式通信框架，可以很方便的实现不同设备之间的通信，ROS2所基于的中间件是DDS，当处于同一网络中时，通过DDS的域ID机制(ROS_DOMAIN_ID)可以实现分布式通信，大致流程是：在启动节点之前，可以设置域ID的值，不同节点如果域ID相同，那么可以自由发现并通信，反之，如果域ID值不同，则不能实现。默认情况下，所有节点启动时所使用的域ID为0，换言之，只要保证在同一网络，你不需要做任何配置，不同ROS2设备上的不同节点即可实现分布式通信。</p><p>分布式通信的应用场景是较为广泛的，无人车编队、无人机编队、远程控制等等， 这些数据的交互都依赖于分布式通信。</p><h2 id="实现主从局域网通信" tabindex="-1">实现主从局域网通信 <a class="header-anchor" href="#实现主从局域网通信" aria-label="Permalink to &quot;实现主从局域网通信&quot;">​</a></h2><p>只需要将主机和从机【可以有多个】处于同一个网络中，就已经实现了分布式通讯。比如主机和从机连接同一个WiFi或者同一个路由器。</p><p>Windows中虚拟机设置网络为【桥接模式】就和主机处于同一个网络了。</p><ul><li>ROS2提供了一个DOMAIN的机制，就类似分组一样，处于同一个DOMAIN中的计算机才能通信，我们可以在主机端【小车】和从机端【虚拟机】的.bashrc中加入这样一句配置，即可将两者分配到一个小组中：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ export ROS_DOMAIN_ID=&lt;your_domain_id&gt;</span></span></code></pre></div><p>如果主机端【小车】和从机端【虚拟机】分配的ID不同，则两者无法实现通信，达到分组的目的。</p><ul><li>主机端【小车】执行：</li></ul><p>这里演示的是小车处于docker中，docker使用的网络模式是host模式，host模式简单来说就是和小车共用一个网络，所以跟在小车上执行没有区别。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>echo &quot;export ROS_DOMAIN_ID=6&quot; &gt;&gt; ~/.bashrc  # 这里的6是ROS_DOMAIN_ID, 不一定要用6，符合ROS_DOMAIN_ID的规则即可</span></span>
<span class="line"><span>source ~/.bashrc</span></span>
<span class="line"><span>ros2 run demo_nodes_py talker</span></span></code></pre></div><ul><li>从机端【虚拟机】执行：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>echo &quot;export ROS_DOMAIN_ID=6&quot; &gt;&gt; ~/.bashrc  # 这里和主机端的值保持一致</span></span>
<span class="line"><span>source ~/.bashrc</span></span>
<span class="line"><span>ros2 run demo_nodes_py listener</span></span></code></pre></div><ul><li>注意，在设置ROS_DOMAIN_ID的值时并不是随意的，也是有一定约束的：</li></ul><ol><li>建议ROS_DOMAIN_ID的取值在[0,101] 之间，包含0和101；</li><li>每个域ID内的节点总数是有限制的，需要小于等于120个；</li><li>如果域ID为101，那么该域的节点总数需要小于等于54个。</li></ol><ul><li>域ID值的相关计算规则如下：</li></ul><ol><li>DDS是基于TCP/IP或UDP/IP网络通信协议的，网络通信时需要指定端口号，端口号由2个字节的无符号整数表示，其取值范围在[0,65535]之间；</li><li>端口号的分配也是有其规则的，并非可以任意使用的，根据DDS协议规定以7400作为起始端口，也即可用端口为[7400,65535]，又已知按照DDS协议默认情况下，每个域ID占用250个端口，那么域ID的个数为：(65535-7400)/250 = 232(个)，对应的其取值范围为[0,231]；</li><li>操作系统还会设置一些预留端口，在DDS中使用端口时，还需要避开这些预留端口，以免使用中产生冲突，不同的操作系统预留端口又有所差异，其最终结果是，在Linux下，可用的域ID为[0,101]与[215-231]，在Windows和Mac中可用的域ID为[0,166]，综上，为了兼容多平台，建议域ID在[0,101] 范围内取值。</li><li>每个域ID默认占用250个端口，且每个ROS2节点需要占用两个端口，另外，按照DDS协议每个域ID的端口段内，第1、2个端口是Discovery Multicast端口与User Multicast端口，从第11、12个端口开始是域内第一个节点的Discovery Unicast端口与User Unicast，后续节点所占用端口依次顺延，那么一个域ID中的最大节点个数为：(250-10)/2 = 120(个)；</li><li>特殊情况：域ID值为101时，其后半段端口属于操作系统的预留端口，其节点最大个数为54个。</li></ol><h1 id="ros2-dds详细" tabindex="-1">ROS2 DDS详细 <a class="header-anchor" href="#ros2-dds详细" aria-label="Permalink to &quot;ROS2 DDS详细&quot;">​</a></h1><h2 id="dds简介" tabindex="-1">DDS简介 <a class="header-anchor" href="#dds简介" aria-label="Permalink to &quot;DDS简介&quot;">​</a></h2><p>DDS的全称是Data Distribution Service，也就是数据分发服务，2004年由对象管理组织OMG发布和维护，是一套专门为实时系统设计的数据分发/订阅标准，最早应用于美国海军， 解决舰船复杂网络环境中大量软件升级的兼容性问题，现在已经成为强制标准。</p><p>DDS强调以数据为中心，可以提供丰富的服务质量策略，以保障数据进行实时、高效、灵活地分发，可满足各种分布式实时通信应用需求。</p><p><strong>参考资料：</strong></p><ul><li>Fast DDS官网文档：<a href="https://fast-dds.docs.eprosima.com/en/latest/" target="_blank" rel="noreferrer">3.3.0</a></li><li>ros2官方文档DDS进阶功能：<a href="https://docs.ros.org/en/humble/Tutorials/Advanced/Discovery-Server/Discovery-Server.html" target="_blank" rel="noreferrer">点击跳转</a></li></ul><p>DDS的核心是通信，能够实现通信的模型和软件框架非常多，这里我们列出常用的四种模型。</p><img src="`+l+'" alt="image-20220528020740057" style="zoom:50%;"><ul><li>第一种，<strong>点对点模型</strong>，许多客户端连接到一个服务端，每次通信时，通信双方必须建立一条连接。当通信节点增多时，连接数也会增多。而且每个客户端都需要知道服务器的具体地址和所提供的服务，一旦服务器地址发生变化，所有客户端都会受到影响。</li><li>第二种，<strong>Broker模型</strong>，针对点对点模型进行了优化，由Broker集中处理所有人的请求，并进一步找到真正能响应该服务的角色。这样客户端就不用关心服务器的具体地址了。不过问题也很明显，Broker作为核心，它的处理速度会影响所有节点的效率，当系统规模增长到一定程度，Broker就会成为整个系统的性能瓶颈。更麻烦是，如果Broker发生异常，可能导致整个系统都无法正常运转。之前的ROS1系统，使用的就是类似这样的架构。</li><li>第三种，<strong>广播模型</strong>，所有节点都可以在通道上广播消息，并且节点都可以收到消息。这个模型解决了服务器地址的问题，而且通信双方也不用单独建立连接，但是广播通道上的消息太多了，所有节点都必须关心每条消息，其实很多是和自己没有关系的。</li><li>第四种，就是<strong>以数据为中心的DDS模型</strong>了，这种模型与广播模型有些类似，所有节点都可以在DataBus上发布和订阅消息。但它的先进之处在于，通信中包含了很多并行的通路，每个节点可以只关心自己感兴趣的消息，忽略不感兴趣的消息，有点像是一个旋转火锅，各种好吃的都在这个DataBus传送，我们只需要拿自己想吃的就行，其他的和我们没有关系。</li></ul><p>可见，在这几种通信模型中，DDS的优势更加明显。</p><h3 id="dds在ros2中的应用" tabindex="-1">DDS在ROS2中的应用 <a class="header-anchor" href="#dds在ros2中的应用" aria-label="Permalink to &quot;DDS在ROS2中的应用&quot;">​</a></h3><p>DDS在ROS2系统中的位置至关重要，所有上层建设都建立在DDS之上。在这个ROS2的架构图中，蓝色和红色部分就是DDS。</p><img src="'+i+'" alt="image-20220528020937717" style="zoom:67%;"><p>在ROS的四大组成部分中，由于DDS的加入，大大提高了分布式通信系统的综合能力，这样我们在开发机器人的过程中，就不需要纠结通信的问题，可以把更多时间放在其他部分的应用开发上。</p><h3 id="质量服务策略qos" tabindex="-1">质量服务策略QoS <a class="header-anchor" href="#质量服务策略qos" aria-label="Permalink to &quot;质量服务策略QoS&quot;">​</a></h3><p>DDS中的基本结构是Domain，Domain将各个应用程序绑定在一起进行通信，回忆下之前我们配置树莓派和电脑通信的时候，配置的那个DOMAIN ID，就是对全局数据空间的分组定义，只有处于同一个DOMAIN小组中的节点才能互相通信。这样可以避免无用数据占用的资源。</p><p>DDS中另外一个重要特性就是质量服务策略：QoS。</p><p>QoS是一种网络传输策略，应用程序指定所需要的网络传输质量行为，QoS服务实现这种行为要求，尽可能地满足客户对通信质量的需求，可以理解为数据提供者和接收者之间的合约。</p><p>策略如下：</p><ul><li><strong>DEADLINE</strong>策略，表示通信数据必须要在每次截止时间内完成一次通信；</li><li><strong>HISTORY</strong>策略，表示针对历史数据的一个缓存大小；</li><li><strong>RELIABILITY</strong>策略，表示数据通信的模式，配置成BEST_EFFORT，就是尽力传输模式，网络情况不好的时候，也要保证数据流畅，此时可能会导致数据丢失，配置成RELIABLE，就是可信赖模式，可以在通信中尽量保证图像的完整性，我们可以根据应用功能场景选择合适的通信模式；</li><li><strong>DURABILITY</strong>策略，可以配置针对晚加入的节点，也保证有一定的历史数据发送过去，可以让新节点快速适应系统。</li></ul><h3 id="使用dds" tabindex="-1">使用DDS <a class="header-anchor" href="#使用dds" aria-label="Permalink to &quot;使用DDS&quot;">​</a></h3><h3 id="案例1—通过命令行配置dds" tabindex="-1">案例1—通过命令行配置DDS <a class="header-anchor" href="#案例1—通过命令行配置dds" aria-label="Permalink to &quot;案例1—通过命令行配置DDS&quot;">​</a></h3><ul><li>打开第一个终端，使用以下命令发布话题：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ros2 topic pub /chatter std_msgs/msg/Int32 &quot;data: 66&quot; --qos-reliability best_effort</span></span></code></pre></div><img src="'+t+'" alt="image-20250827115245194" style="zoom:67%;"><ul><li>再次打开一个终端，使用不同的Qos去打印话题，如果使用的Qos策略与发布方不同，则会出现警告信息不能正常接收到话题数据：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ros2 topic echo /chatter --qos-reliability reliable</span></span></code></pre></div><img src="'+o+'" alt="image-20250827115358309" style="zoom:67%;"><ul><li>我们使用和话题发布方一样的Qos策略即可接收到话题数据</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ros2 topic echo /chatter --qos-reliability best_effort</span></span></code></pre></div><img src="'+c+`" alt="image-20250827120250112" style="zoom:67%;"><h3 id="案例2—编写话题节点配置qos服务策略" tabindex="-1">案例2—编写话题节点配置Qos服务策略 <a class="header-anchor" href="#案例2—编写话题节点配置qos服务策略" aria-label="Permalink to &quot;案例2—编写话题节点配置Qos服务策略&quot;">​</a></h3><ul><li>使用以下命令新建功能包</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ros2 pkg create learning_dds --build-type ament_python --dependencies rclpy std_msgs</span></span></code></pre></div><ul><li>新建一个dds_controller_pub.py文件，作为话题通信的发布方，填入一下内容：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import rclpy</span></span>
<span class="line"><span>from rclpy.node import Node</span></span>
<span class="line"><span>from std_msgs.msg import String</span></span>
<span class="line"><span># 导入QoS相关类</span></span>
<span class="line"><span>from rclpy.qos import QoSProfile, QoSReliabilityPolicy, QoSHistoryPolicy</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ControllerPublisher(Node):</span></span>
<span class="line"><span>    def __init__(self, name):</span></span>
<span class="line"><span>        super().__init__(name)</span></span>
<span class="line"><span>        # 1. 配置QoS策略：可靠传输，保留最后1条历史数据</span></span>
<span class="line"><span>        self.qos_profile = QoSProfile(</span></span>
<span class="line"><span>            reliability=QoSReliabilityPolicy.RELIABLE,  # 可靠传输（重传丢失数据）</span></span>
<span class="line"><span>            history=QoSHistoryPolicy.KEEP_LAST,         # 保留最后N条数据</span></span>
<span class="line"><span>            depth=1                                     # 保留1条历史数据</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        # 2. 创建发布者：话题名/robot_cmd，消息类型String，QoS策略</span></span>
<span class="line"><span>        self.publisher = self.create_publisher(</span></span>
<span class="line"><span>            String, </span></span>
<span class="line"><span>            &quot;/robot_cmd&quot;, </span></span>
<span class="line"><span>            self.qos_profile</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        # 3. 创建定时器：每秒发送一次指令</span></span>
<span class="line"><span>        self.timer = self.create_timer(1.0, self.timer_callback)</span></span>
<span class="line"><span>        self.cmd_list = [&quot;forward&quot;, &quot;backward&quot;, &quot;stop&quot;]  # 指令列表</span></span>
<span class="line"><span>        self.cmd_index = 0  # 指令索引，循环切换</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def timer_callback(self):</span></span>
<span class="line"><span>        # 循环切换指令（前进→后退→停止→前进...）</span></span>
<span class="line"><span>        current_cmd = self.cmd_list[self.cmd_index % 3]</span></span>
<span class="line"><span>        # 创建消息并填充数据</span></span>
<span class="line"><span>        msg = String()</span></span>
<span class="line"><span>        msg.data = current_cmd</span></span>
<span class="line"><span>        # 发布消息</span></span>
<span class="line"><span>        self.publisher.publish(msg)</span></span>
<span class="line"><span>        # 打印日志（显示发布的指令）</span></span>
<span class="line"><span>        self.get_logger().info(f&quot;发布控制指令：{msg.data}&quot;)</span></span>
<span class="line"><span>        # 更新指令索引</span></span>
<span class="line"><span>        self.cmd_index += 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def main(args=None):</span></span>
<span class="line"><span>    # 初始化ROS2</span></span>
<span class="line"><span>    rclpy.init(args=args)</span></span>
<span class="line"><span>    # 创建发布者节点</span></span>
<span class="line"><span>    node = ControllerPublisher(&quot;robot_controller_pub&quot;)</span></span>
<span class="line"><span>    # 循环运行节点</span></span>
<span class="line"><span>    rclpy.spin(node)</span></span>
<span class="line"><span>    # 销毁节点并关闭ROS2</span></span>
<span class="line"><span>    node.destroy_node()</span></span>
<span class="line"><span>    rclpy.shutdown()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span>    main()</span></span></code></pre></div><ul><li>订阅方代码实现，新建一个dds_robot_sub.py文件，填入下方订阅方实现代码</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import rclpy</span></span>
<span class="line"><span>from rclpy.node import Node</span></span>
<span class="line"><span>from std_msgs.msg import String</span></span>
<span class="line"><span>from rclpy.qos import QoSProfile, QoSReliabilityPolicy, QoSHistoryPolicy</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class RobotSubscriber(Node):</span></span>
<span class="line"><span>    def __init__(self, name):</span></span>
<span class="line"><span>        super().__init__(name)</span></span>
<span class="line"><span>        # 1. 配置与发布者兼容的QoS策略</span></span>
<span class="line"><span>        self.qos_profile = QoSProfile(</span></span>
<span class="line"><span>            reliability=QoSReliabilityPolicy.BEST_EFFORT,</span></span>
<span class="line"><span>            history=QoSHistoryPolicy.KEEP_LAST,</span></span>
<span class="line"><span>            depth=1</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        # 2. 创建订阅者：话题名/robot_cmd，回调函数，QoS策略</span></span>
<span class="line"><span>        self.subscription = self.create_subscription(</span></span>
<span class="line"><span>            String,</span></span>
<span class="line"><span>            &quot;/robot_cmd&quot;,</span></span>
<span class="line"><span>            self.cmd_callback,  # 接收到数据后执行的回调函数</span></span>
<span class="line"><span>            self.qos_profile</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def cmd_callback(self, msg):</span></span>
<span class="line"><span>        # 回调函数：处理接收到的指令</span></span>
<span class="line"><span>        self.get_logger().info(f&quot;接收控制指令：{msg.data} → 执行对应动作&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def main(args=None):</span></span>
<span class="line"><span>    rclpy.init(args=args)</span></span>
<span class="line"><span>    node = RobotSubscriber(&quot;robot_subscriber&quot;)</span></span>
<span class="line"><span>    rclpy.spin(node)</span></span>
<span class="line"><span>    node.destroy_node()</span></span>
<span class="line"><span>    rclpy.shutdown()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span>    main()</span></span></code></pre></div><ul><li>配置编译文件（setup.py）</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>entry_points={</span></span>
<span class="line"><span>    &#39;console_scripts&#39;: [</span></span>
<span class="line"><span>        # 发布者节点：命令名 = 包名.文件名:main函数</span></span>
<span class="line"><span>        &#39;dds_controller_pub = learning_dds.dds_controller_pub:main&#39;,</span></span>
<span class="line"><span>        # 订阅者节点</span></span>
<span class="line"><span>        &#39;dds_robot_sub = learning_dds.dds_robot_sub:main&#39;,</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>},</span></span></code></pre></div><img src="`+r+`" alt="image-20250905153513257" style="zoom:50%;"><ul><li>在工作空间目录下打开终端，编译功能包</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>colcon build --packages-select learning_dds</span></span></code></pre></div><ul><li>设置环境变量，每次重新编译后都需要设置环境变量</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>source install/setup.bash</span></span></code></pre></div><ul><li>运行发布方和订阅方节点</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ros2 run learning_dds dds_controller_pub</span></span>
<span class="line"><span>ros2 run learning_dds dds_robot_sub</span></span></code></pre></div><img src="`+d+'" alt="image-20250905153734043" style="zoom:50%;"><p><strong>机器人开发进阶：</strong></p><ul><li>通常情况下，话题通信的发布方和订阅方需要保持一样的Qos通信策略，避免一些隐性的通信层问题；</li><li>Qos通信策略的设置要根据实际的应用场景来选择；</li><li>如果应用场景涉及：无人机通信、加密通信、实时通信等对通信层有特殊的要求场景，在本节教程简介中找到Fast-DDS的官方手册，对DDS功能有更详尽的说明；</li></ul><img src="'+g+'" alt="image-20250905155146210" style="zoom:50%;">',90)])])}const y=a(u,[["render",h]]);export{v as __pageData,y as default};
