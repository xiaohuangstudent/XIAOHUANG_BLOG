import{_ as s,o as n,c as p,a4 as e}from"./chunks/framework.PZCYvDoh.js";const u=JSON.parse('{"title":"ROS2工作空间","description":"","frontmatter":{},"headers":[],"relativePath":"docs/软件资料/编程资料/ROS2基础/ROS2详细笔记/Part1_ROS2工作空间与功能包.md","filePath":"docs/软件资料/编程资料/ROS2基础/ROS2详细笔记/Part1_ROS2工作空间与功能包.md"}'),l={name:"docs/软件资料/编程资料/ROS2基础/ROS2详细笔记/Part1_ROS2工作空间与功能包.md"};function t(i,a,c,o,d,r){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="ros2工作空间" tabindex="-1">ROS2工作空间 <a class="header-anchor" href="#ros2工作空间" aria-label="Permalink to &quot;ROS2工作空间&quot;">​</a></h1><h2 id="编译工作空间" tabindex="-1">编译工作空间 <a class="header-anchor" href="#编译工作空间" aria-label="Permalink to &quot;编译工作空间&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>colcon build</span></span></code></pre></div><p><strong>工作空间的名称我们可以自己定义</strong>，数量也并不是唯一的，比如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>工作空间1：ros2_ws_a, 用于A机器人的开发</span></span>
<span class="line"><span>工作空间1：ros2_ws_b, 用于B机器人的开发</span></span>
<span class="line"><span>工作空间1：ros2_ws_c, 用于C机器人的开发</span></span></code></pre></div><p>以上情况是完全允许的，就像是我们在集成开发环境中创建了多个新工程一样，都是并列存在的关系。</p><h2 id="设置环境变量" tabindex="-1">设置环境变量 <a class="header-anchor" href="#设置环境变量" aria-label="Permalink to &quot;设置环境变量&quot;">​</a></h2><p>编译成功后，为了让系统能够找到我们的功能包和可执行文件，还需要设置环境变量：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 仅在当前终端生效</span></span>
<span class="line"><span>source install/setup.bash   </span></span>
<span class="line"><span># 所有终端均生效</span></span>
<span class="line"><span>echo &quot;source ~/yahboomcar_ws/install/setup.bash&quot; &gt;&gt; ~/.bashrc</span></span></code></pre></div><h1 id="ros2功能包" tabindex="-1">ROS2功能包 <a class="header-anchor" href="#ros2功能包" aria-label="Permalink to &quot;ROS2功能包&quot;">​</a></h1><h2 id="创建功能包" tabindex="-1">创建功能包 <a class="header-anchor" href="#创建功能包" aria-label="Permalink to &quot;创建功能包&quot;">​</a></h2><p>使用这个格式的指令创建一个功能包：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ros2 pkg create &lt;package_name&gt; --build-type &lt;build-type&gt; --dependencies &lt;dependencies&gt; --node-name &lt;node-name&gt;</span></span></code></pre></div><ul><li><strong>pkg</strong>：表示功能包相关的功能；</li><li><strong>create</strong>：表示创建功能包；</li><li><strong>package_name</strong>：新建功能包的名字；</li><li><strong>build-type</strong>：表示新创建的功能包是C++还是Python的，如果使用C++或者C，那这里就跟ament_cmake，如果使用Python，就跟ament_python；</li><li><strong>dependencies</strong>：表示功能包的依赖项，C++功能包需包含rclcpp，Python功能包需包含rclpy ,还有其它需要的依赖；</li><li><strong>node-name</strong>：可执行程序的名称，会自动生成对应的源文件并生成配置文件；</li></ul><p>比如在终端中分别创建C++和Python版本的功能包：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd ~/yahboomcar_ros2_ws/yahboomcar_ws/src</span></span>
<span class="line"><span># 创建C++功能包</span></span>
<span class="line"><span>ros2 pkg create pkg_helloworld_cpp --build-type ament_cmake --dependencies rclcpp --node-name helloworld  </span></span>
<span class="line"><span># 创建Python功能包</span></span>
<span class="line"><span>ros2 pkg create pkg_helloworld_py --build-type ament_python --dependencies rclpy --node-name helloworld</span></span></code></pre></div><h2 id="编译功能包" tabindex="-1">编译功能包 <a class="header-anchor" href="#编译功能包" aria-label="Permalink to &quot;编译功能包&quot;">​</a></h2><p>在创建好的功能包中，我们可以继续完成代码的编写，之后需要编译和配置环境变量，才能正常运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 编译工作空间所有功能包</span></span>
<span class="line"><span>colcon build   </span></span>
<span class="line"><span># 编译指定功能包（一个或多个）</span></span>
<span class="line"><span>colcon build --packages-select 功能包列表</span></span>
<span class="line"><span>source install/setup.bash</span></span></code></pre></div><h2 id="带功能包的完整工作空间结构" tabindex="-1">带功能包的完整工作空间结构 <a class="header-anchor" href="#带功能包的完整工作空间结构" aria-label="Permalink to &quot;带功能包的完整工作空间结构&quot;">​</a></h2><p>ROS2工作空间的目录结构如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>WorkSpace --- 自定义的工作空间。</span></span>
<span class="line"><span>    |--- build：存储中间文件的目录，该目录下会为每一个功能包创建一个单独子目录。</span></span>
<span class="line"><span>    |--- install：安装目录，该目录下会为每一个功能包创建一个单独子目录。</span></span>
<span class="line"><span>    |--- log：日志目录，用于存储日志文件。</span></span>
<span class="line"><span>    |--- src：用于存储功能包源码的目录。</span></span>
<span class="line"><span>        |-- C++功能包</span></span>
<span class="line"><span>            |-- package.xml：包信息，比如:包名、版本、作者、依赖项。</span></span>
<span class="line"><span>            |-- CMakeLists.txt：配置编译规则，比如源文件、依赖项、目标文件。</span></span>
<span class="line"><span>            |-- src：C++源文件目录。</span></span>
<span class="line"><span>            |-- include：头文件目录。</span></span>
<span class="line"><span>            |-- msg：消息接口文件目录。</span></span>
<span class="line"><span>            |-- srv：服务接口文件目录。</span></span>
<span class="line"><span>            |-- action：动作接口文件目录。</span></span>
<span class="line"><span>        |-- Python功能包</span></span>
<span class="line"><span>            |-- package.xml：包信息，比如:包名、版本、作者、依赖项。</span></span>
<span class="line"><span>            |-- setup.py：与C++功能包的CMakeLists.txt类似。</span></span>
<span class="line"><span>            |-- setup.cfg：功能包基本配置文件。</span></span>
<span class="line"><span>            |-- resource：资源目录。</span></span>
<span class="line"><span>            |-- test：存储测试相关文件。</span></span>
<span class="line"><span>            |-- 功能包同名目录：Python源文件目录。</span></span></code></pre></div><p>另外，无论是Python功能包还是C++功能包，都可以自定义一些配置文件相关的目录。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>|-- C++或Python功能包</span></span>
<span class="line"><span>    |-- launch：存储launch文件。</span></span>
<span class="line"><span>    |-- rviz：存储rviz2配置相关文件。</span></span>
<span class="line"><span>    |-- urdf：存储机器人建模文件。</span></span>
<span class="line"><span>    |-- params：存储参数文件。</span></span>
<span class="line"><span>    |-- world：存储仿真环境相关文件。</span></span>
<span class="line"><span>    |-- map：存储导航所需地图文件。</span></span>
<span class="line"><span>    |-- ......</span></span></code></pre></div><p>上述这些目录也可以定义为其他名称，或者根据需要创建其他一些目录。</p>`,25)])])}const g=s(l,[["render",t]]);export{u as __pageData,g as default};
