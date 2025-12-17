import{_ as n,c as a,o as p,ag as l}from"./chunks/framework.DdeahcKK.js";const m=JSON.parse('{"title":"MTF01光流计驱动","description":"","frontmatter":{},"headers":[],"relativePath":"xiaohuang_mdwork/硬件资料/硬件资料主页内容/硬件驱动/MTF01光流计.md","filePath":"xiaohuang_mdwork/硬件资料/硬件资料主页内容/硬件驱动/MTF01光流计.md"}'),e={name:"xiaohuang_mdwork/硬件资料/硬件资料主页内容/硬件驱动/MTF01光流计.md"};function i(t,s,c,_,d,o){return p(),a("div",null,s[0]||(s[0]=[l(`<h1 id="mtf01光流计驱动" tabindex="-1">MTF01光流计驱动 <a class="header-anchor" href="#mtf01光流计驱动" aria-label="Permalink to &quot;MTF01光流计驱动&quot;">​</a></h1><h2 id="头文件mtf01-h" tabindex="-1">头文件mtf01.h <a class="header-anchor" href="#头文件mtf01-h" aria-label="Permalink to &quot;头文件mtf01.h&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/*</span></span>
<span class="line"><span> * mtf01.h</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> *  Created on: Nov 22, 2025</span></span>
<span class="line"><span> *      Author: 27276</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ifndef SRC_DRIVER_MTF01_MTF01_H_</span></span>
<span class="line"><span>#define SRC_DRIVER_MTF01_MTF01_H_</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#pragma once</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#include &lt;stdint.h&gt;</span></span>
<span class="line"><span>#include &lt;stdbool.h&gt;</span></span>
<span class="line"><span>#include &lt;string.h&gt;</span></span>
<span class="line"><span>#include &quot;main.h&quot;</span></span>
<span class="line"><span>#include &quot;usbd_cdc_if.h&quot;</span></span>
<span class="line"><span>//#include &quot;icm20602/attitude_solution.h&quot;</span></span>
<span class="line"><span>//#include &quot;icm20602/icm20602.h&quot;</span></span>
<span class="line"><span>#define MICOLINK_MSG_HEAD            0xEF</span></span>
<span class="line"><span>#define MICOLINK_MAX_PAYLOAD_LEN     64</span></span>
<span class="line"><span>#define MICOLINK_MAX_LEN             MICOLINK_MAX_PAYLOAD_LEN + 7</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span>    消息ID定义</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>enum</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    MICOLINK_MSG_ID_RANGE_SENSOR = 0x51,     // 测距传感器</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span>    消息结构体定义</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>typedef struct</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    uint8_t head;</span></span>
<span class="line"><span>    uint8_t dev_id;</span></span>
<span class="line"><span>    uint8_t sys_id;</span></span>
<span class="line"><span>    uint8_t msg_id;</span></span>
<span class="line"><span>    uint8_t seq;</span></span>
<span class="line"><span>    uint8_t len;</span></span>
<span class="line"><span>    uint8_t payload[MICOLINK_MAX_PAYLOAD_LEN];</span></span>
<span class="line"><span>    uint8_t checksum;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    uint8_t status;</span></span>
<span class="line"><span>    uint8_t payload_cnt;</span></span>
<span class="line"><span>} MICOLINK_MSG_t;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span>    数据负载定义</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>#pragma pack (1)</span></span>
<span class="line"><span>// 测距传感器</span></span>
<span class="line"><span>typedef struct</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    uint32_t  time_ms;			    // 系统时间 ms</span></span>
<span class="line"><span>    uint32_t  distance;			    // 距离(mm) 最小值为10，0表示数据不可用</span></span>
<span class="line"><span>    uint8_t   strength;	            // 信号强度</span></span>
<span class="line"><span>    uint8_t   precision;	        // 精度</span></span>
<span class="line"><span>    uint8_t   tof_status;	        // 状态</span></span>
<span class="line"><span>    uint8_t  reserved1;			    // 预留</span></span>
<span class="line"><span>    int16_t   flow_vel_x;	        // 光流速度x轴</span></span>
<span class="line"><span>    int16_t   flow_vel_y;	        // 光流速度y轴</span></span>
<span class="line"><span>    uint8_t   flow_quality;	        // 光流质量</span></span>
<span class="line"><span>    uint8_t   flow_status;	        // 光流状态</span></span>
<span class="line"><span>    uint16_t  reserved2;	        // 预留</span></span>
<span class="line"><span>} MICOLINK_PAYLOAD_RANGE_SENSOR_t;</span></span>
<span class="line"><span>#pragma pack ()</span></span>
<span class="line"><span>extern void micolink_decode(uint8_t data);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>extern float body_height;</span></span>
<span class="line"><span>extern uint8_t height_strength,height_accuracy,height_state,lightstream_quality,lightstream_state;//状态1表示数据可用</span></span>
<span class="line"><span>extern float light_speed_x,light_speed_y;</span></span>
<span class="line"><span>extern float distance_x,distance_y;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void process_micolink_message(MICOLINK_MSG_t* msg);</span></span>
<span class="line"><span>void process_optical_flow_data(uint8_t *buffer, uint16_t length);</span></span>
<span class="line"><span>bool micolink_check_sum(MICOLINK_MSG_t* msg);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#endif /* SRC_DRIVER_MTF01_MTF01_H_ */</span></span></code></pre></div><h2 id="代码文件mtf01-c" tabindex="-1">代码文件mtf01.c <a class="header-anchor" href="#代码文件mtf01-c" aria-label="Permalink to &quot;代码文件mtf01.c&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/*</span></span>
<span class="line"><span> * mtf01.c</span></span>
<span class="line"><span> *</span></span>
<span class="line"><span> *  Created on: Nov 22, 2025</span></span>
<span class="line"><span> *      Author: 27276</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#include &quot;mtf01.h&quot;</span></span>
<span class="line"><span>float body_height=0;//单位：mm</span></span>
<span class="line"><span>uint8_t height_strength=0,height_accuracy=0,height_state=0,lightstream_quality=0,lightstream_state=0;//状态1表示数据可用</span></span>
<span class="line"><span>float light_speed_x=0,light_speed_y=0;//该值*0.01为对应的角速度</span></span>
<span class="line"><span>float distance_x=0,distance_y=0;</span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span>说明： 用户使用micolink_decode作为串口数据处理函数即可</span></span>
<span class="line"><span></span></span>
<span class="line"><span>距离有效值最小为10(mm),为0说明此时距离值不可用</span></span>
<span class="line"><span>光流速度值单位：cm/s@1m</span></span>
<span class="line"><span>飞控中只需要将光流速度值*高度，即可得到真实水平位移速度</span></span>
<span class="line"><span>计算公式：实际速度(cm/s)=光流速度*高度(m)</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bool micolink_parse_char(MICOLINK_MSG_t* msg, uint8_t data);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>uint8_t tempmessage1[100];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void micolink_decode(uint8_t data)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    static MICOLINK_MSG_t msg;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if(micolink_parse_char(&amp;msg, data) == false)</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    switch(msg.msg_id)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        case MICOLINK_MSG_ID_RANGE_SENSOR:</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            MICOLINK_PAYLOAD_RANGE_SENSOR_t payload;</span></span>
<span class="line"><span>            memcpy(&amp;payload, msg.payload, msg.len);</span></span>
<span class="line"><span>            body_height=(float)payload.distance*0.001f;</span></span>
<span class="line"><span>            light_speed_x=-(float)payload.flow_vel_x*0.01f*body_height;</span></span>
<span class="line"><span>            if(abs(light_speed_x)&lt;0.15){</span></span>
<span class="line"><span>            	light_speed_x=0;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            light_speed_y=-(float)payload.flow_vel_y*0.01f*body_height;</span></span>
<span class="line"><span>            if(abs(light_speed_y)&lt;0.15){</span></span>
<span class="line"><span>            	light_speed_y=0;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            lightstream_state=payload.flow_status;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//            sprintf(tempmessage1,&quot;body_height:%.6f\\tlight_speed_x:%.6f\\tlight_speed_y:%.6f\\n&quot;,body_height,light_speed_x,light_speed_y);</span></span>
<span class="line"><span>//            CDC_Transmit_FS((uint8_t *)tempmessage1,(uint16_t)strlen(tempmessage1));</span></span>
<span class="line"><span>            /*</span></span>
<span class="line"><span>                此处可获取传感器数据:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                距离        = payload.distance;</span></span>
<span class="line"><span>                强度        = payload.strength;</span></span>
<span class="line"><span>                精度        = payload.precision;</span></span>
<span class="line"><span>                距离状态    = payload.tof_status;</span></span>
<span class="line"><span>                光流速度x轴 = payload.flow_vel_x;</span></span>
<span class="line"><span>                光流速度y轴 = payload.flow_vel_y;</span></span>
<span class="line"><span>                光流质量    = payload.flow_quality;</span></span>
<span class="line"><span>                光流状态    = payload.flow_status;</span></span>
<span class="line"><span>            */</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bool micolink_check_sum(MICOLINK_MSG_t* msg)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    uint8_t length = msg-&gt;len + 6;</span></span>
<span class="line"><span>    uint8_t temp[MICOLINK_MAX_LEN];</span></span>
<span class="line"><span>    uint8_t checksum = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    memcpy(temp, msg, length);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for(uint8_t i=0; i&lt;length; i++)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        checksum += temp[i];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if(checksum == msg-&gt;checksum)</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bool micolink_parse_char(MICOLINK_MSG_t* msg, uint8_t data)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    switch(msg-&gt;status)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    case 0:     //帧头</span></span>
<span class="line"><span>        if(data == MICOLINK_MSG_HEAD)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            msg-&gt;head = data;</span></span>
<span class="line"><span>            msg-&gt;status++;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    case 1:     // 设备ID</span></span>
<span class="line"><span>        msg-&gt;dev_id = data;</span></span>
<span class="line"><span>        msg-&gt;status++;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    case 2:     // 系统ID</span></span>
<span class="line"><span>        msg-&gt;sys_id = data;</span></span>
<span class="line"><span>        msg-&gt;status++;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    case 3:     // 消息ID</span></span>
<span class="line"><span>        msg-&gt;msg_id = data;</span></span>
<span class="line"><span>        msg-&gt;status++;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    case 4:     // 包序列</span></span>
<span class="line"><span>        msg-&gt;seq = data;</span></span>
<span class="line"><span>        msg-&gt;status++;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    case 5:     // 负载长度</span></span>
<span class="line"><span>        msg-&gt;len = data;</span></span>
<span class="line"><span>        if(msg-&gt;len == 0)</span></span>
<span class="line"><span>            msg-&gt;status += 2;</span></span>
<span class="line"><span>        else if(msg-&gt;len &gt; MICOLINK_MAX_PAYLOAD_LEN)</span></span>
<span class="line"><span>            msg-&gt;status = 0;</span></span>
<span class="line"><span>        else</span></span>
<span class="line"><span>            msg-&gt;status++;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    case 6:     // 数据负载接收</span></span>
<span class="line"><span>        msg-&gt;payload[msg-&gt;payload_cnt++] = data;</span></span>
<span class="line"><span>        if(msg-&gt;payload_cnt == msg-&gt;len)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            msg-&gt;payload_cnt = 0;</span></span>
<span class="line"><span>            msg-&gt;status++;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    case 7:     // 帧校验</span></span>
<span class="line"><span>        msg-&gt;checksum = data;</span></span>
<span class="line"><span>        msg-&gt;status = 0;</span></span>
<span class="line"><span>        if(micolink_check_sum(msg))</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    default:</span></span>
<span class="line"><span>        msg-&gt;status = 0;</span></span>
<span class="line"><span>        msg-&gt;payload_cnt = 0;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//连续处理函数</span></span>
<span class="line"><span>void process_optical_flow_data(uint8_t *buffer, uint16_t length)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    if(length == 0 || buffer == NULL) return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    uint16_t index = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 遍历整个缓冲区寻找完整的数据帧</span></span>
<span class="line"><span>    while(index &lt; length) {</span></span>
<span class="line"><span>        // 寻找帧头</span></span>
<span class="line"><span>        if(buffer[index] == MICOLINK_MSG_HEAD &amp;&amp; (length - index) &gt;= 7) {</span></span>
<span class="line"><span>            // 检查是否有足够的数据构成一帧</span></span>
<span class="line"><span>            uint8_t payload_len = buffer[index + 5];</span></span>
<span class="line"><span>            uint8_t total_len = 7 + payload_len; // 头+设备ID+系统ID+消息ID+序列号+长度+payload+校验和</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if((index + total_len) &lt;= length) {</span></span>
<span class="line"><span>                // 提取完整帧</span></span>
<span class="line"><span>                MICOLINK_MSG_t msg;</span></span>
<span class="line"><span>                msg.head = buffer[index];</span></span>
<span class="line"><span>                msg.dev_id = buffer[index + 1];</span></span>
<span class="line"><span>                msg.sys_id = buffer[index + 2];</span></span>
<span class="line"><span>                msg.msg_id = buffer[index + 3];</span></span>
<span class="line"><span>                msg.seq = buffer[index + 4];</span></span>
<span class="line"><span>                msg.len = payload_len;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 复制payload数据</span></span>
<span class="line"><span>                memcpy(msg.payload, &amp;buffer[index + 6], payload_len);</span></span>
<span class="line"><span>                msg.checksum = buffer[index + 6 + payload_len];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 校验数据帧</span></span>
<span class="line"><span>                if(micolink_check_sum(&amp;msg)) {</span></span>
<span class="line"><span>                    // 处理有效数据帧</span></span>
<span class="line"><span>                    process_micolink_message(&amp;msg);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 移动到下一帧</span></span>
<span class="line"><span>                index += total_len;</span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        index++;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void process_micolink_message(MICOLINK_MSG_t* msg)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    switch(msg-&gt;msg_id)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        case MICOLINK_MSG_ID_RANGE_SENSOR:</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            MICOLINK_PAYLOAD_RANGE_SENSOR_t payload;</span></span>
<span class="line"><span>            if(msg-&gt;len &gt;= sizeof(MICOLINK_PAYLOAD_RANGE_SENSOR_t)) {</span></span>
<span class="line"><span>                memcpy(&amp;payload, msg-&gt;payload, sizeof(MICOLINK_PAYLOAD_RANGE_SENSOR_t));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                body_height = (float)payload.distance * 0.001f;</span></span>
<span class="line"><span>                light_speed_x = -(float)payload.flow_vel_y * 0.01f;</span></span>
<span class="line"><span>                light_speed_y = (float)payload.flow_vel_x * 0.01f;</span></span>
<span class="line"><span>                lightstream_state = payload.flow_status;</span></span>
<span class="line"><span>//                height_strength = payload.strength;</span></span>
<span class="line"><span>//                height_accuracy = payload.precision;</span></span>
<span class="line"><span>//                height_state = payload.tof_status;</span></span>
<span class="line"><span>//                lightstream_quality = payload.flow_quality;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                // 调试输出</span></span>
<span class="line"><span>                // sprintf(tempmessage1,&quot;Height:%.3fm SpeedX:%.3f SpeedY:%.3f\\n&quot;,</span></span>
<span class="line"><span>                //         body_height, light_speed_x, light_speed_y);</span></span>
<span class="line"><span>                // CDC_Transmit_FS((uint8_t *)tempmessage1, strlen(tempmessage1));</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            // 可以处理其他消息类型</span></span>
<span class="line"><span>            break;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,5)]))}const u=n(e,[["render",i]]);export{m as __pageData,u as default};
