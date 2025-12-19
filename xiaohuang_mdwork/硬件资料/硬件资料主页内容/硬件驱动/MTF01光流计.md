# MTF01光流计驱动

## 头文件mtf01.h

``` c++
/*
 * mtf01.h
 *
 *  Created on: Nov 22, 2025
 *      Author: 27276
 */

#ifndef SRC_DRIVER_MTF01_MTF01_H_
#define SRC_DRIVER_MTF01_MTF01_H_


#pragma once

#include <stdint.h>
#include <stdbool.h>
#include <string.h>
#include "main.h"
#include "usbd_cdc_if.h"
//#include "icm20602/attitude_solution.h"
//#include "icm20602/icm20602.h"
#define MICOLINK_MSG_HEAD            0xEF
#define MICOLINK_MAX_PAYLOAD_LEN     64
#define MICOLINK_MAX_LEN             MICOLINK_MAX_PAYLOAD_LEN + 7

/*
    消息ID定义
*/
enum
{
    MICOLINK_MSG_ID_RANGE_SENSOR = 0x51,     // 测距传感器
};

/*
    消息结构体定义
*/
typedef struct
{
    uint8_t head;
    uint8_t dev_id;
    uint8_t sys_id;
    uint8_t msg_id;
    uint8_t seq;
    uint8_t len;
    uint8_t payload[MICOLINK_MAX_PAYLOAD_LEN];
    uint8_t checksum;

    uint8_t status;
    uint8_t payload_cnt;
} MICOLINK_MSG_t;

/*
    数据负载定义
*/
#pragma pack (1)
// 测距传感器
typedef struct
{
    uint32_t  time_ms;			    // 系统时间 ms
    uint32_t  distance;			    // 距离(mm) 最小值为10，0表示数据不可用
    uint8_t   strength;	            // 信号强度
    uint8_t   precision;	        // 精度
    uint8_t   tof_status;	        // 状态
    uint8_t  reserved1;			    // 预留
    int16_t   flow_vel_x;	        // 光流速度x轴
    int16_t   flow_vel_y;	        // 光流速度y轴
    uint8_t   flow_quality;	        // 光流质量
    uint8_t   flow_status;	        // 光流状态
    uint16_t  reserved2;	        // 预留
} MICOLINK_PAYLOAD_RANGE_SENSOR_t;
#pragma pack ()
extern void micolink_decode(uint8_t data);

extern float body_height;
extern uint8_t height_strength,height_accuracy,height_state,lightstream_quality,lightstream_state;//状态1表示数据可用
extern float light_speed_x,light_speed_y;
extern float distance_x,distance_y;

void process_micolink_message(MICOLINK_MSG_t* msg);
void process_optical_flow_data(uint8_t *buffer, uint16_t length);
bool micolink_check_sum(MICOLINK_MSG_t* msg);

#endif /* SRC_DRIVER_MTF01_MTF01_H_ */

```

## 代码文件mtf01.c

```c++
/*
 * mtf01.c
 *
 *  Created on: Nov 22, 2025
 *      Author: 27276
 */


#include "mtf01.h"
float body_height=0;//单位：mm
uint8_t height_strength=0,height_accuracy=0,height_state=0,lightstream_quality=0,lightstream_state=0;//状态1表示数据可用
float light_speed_x=0,light_speed_y=0;//该值*0.01为对应的角速度
float distance_x=0,distance_y=0;
/*
说明： 用户使用micolink_decode作为串口数据处理函数即可

距离有效值最小为10(mm),为0说明此时距离值不可用
光流速度值单位：cm/s@1m
飞控中只需要将光流速度值*高度，即可得到真实水平位移速度
计算公式：实际速度(cm/s)=光流速度*高度(m)
*/

bool micolink_parse_char(MICOLINK_MSG_t* msg, uint8_t data);

uint8_t tempmessage1[100];

void micolink_decode(uint8_t data)
{
    static MICOLINK_MSG_t msg;

    if(micolink_parse_char(&msg, data) == false)
        return;

    switch(msg.msg_id)
    {
        case MICOLINK_MSG_ID_RANGE_SENSOR:
        {
            MICOLINK_PAYLOAD_RANGE_SENSOR_t payload;
            memcpy(&payload, msg.payload, msg.len);
            body_height=(float)payload.distance*0.001f;
            light_speed_x=-(float)payload.flow_vel_x*0.01f*body_height;
            if(abs(light_speed_x)<0.15){
            	light_speed_x=0;
            }
            light_speed_y=-(float)payload.flow_vel_y*0.01f*body_height;
            if(abs(light_speed_y)<0.15){
            	light_speed_y=0;
            }
            lightstream_state=payload.flow_status;

//            sprintf(tempmessage1,"body_height:%.6f\tlight_speed_x:%.6f\tlight_speed_y:%.6f\n",body_height,light_speed_x,light_speed_y);
//            CDC_Transmit_FS((uint8_t *)tempmessage1,(uint16_t)strlen(tempmessage1));
            /*
                此处可获取传感器数据:

                距离        = payload.distance;
                强度        = payload.strength;
                精度        = payload.precision;
                距离状态    = payload.tof_status;
                光流速度x轴 = payload.flow_vel_x;
                光流速度y轴 = payload.flow_vel_y;
                光流质量    = payload.flow_quality;
                光流状态    = payload.flow_status;
            */
            break;
        }

        default:
            break;
        }
}

bool micolink_check_sum(MICOLINK_MSG_t* msg)
{
    uint8_t length = msg->len + 6;
    uint8_t temp[MICOLINK_MAX_LEN];
    uint8_t checksum = 0;

    memcpy(temp, msg, length);

    for(uint8_t i=0; i<length; i++)
    {
        checksum += temp[i];
    }

    if(checksum == msg->checksum)
        return true;
    else
        return false;
}

bool micolink_parse_char(MICOLINK_MSG_t* msg, uint8_t data)
{
    switch(msg->status)
    {
    case 0:     //帧头
        if(data == MICOLINK_MSG_HEAD)
        {
            msg->head = data;
            msg->status++;
        }
        break;

    case 1:     // 设备ID
        msg->dev_id = data;
        msg->status++;
        break;

    case 2:     // 系统ID
        msg->sys_id = data;
        msg->status++;
        break;

    case 3:     // 消息ID
        msg->msg_id = data;
        msg->status++;
        break;

    case 4:     // 包序列
        msg->seq = data;
        msg->status++;
        break;

    case 5:     // 负载长度
        msg->len = data;
        if(msg->len == 0)
            msg->status += 2;
        else if(msg->len > MICOLINK_MAX_PAYLOAD_LEN)
            msg->status = 0;
        else
            msg->status++;
        break;

    case 6:     // 数据负载接收
        msg->payload[msg->payload_cnt++] = data;
        if(msg->payload_cnt == msg->len)
        {
            msg->payload_cnt = 0;
            msg->status++;
        }
        break;

    case 7:     // 帧校验
        msg->checksum = data;
        msg->status = 0;
        if(micolink_check_sum(msg))
        {
            return true;
        }

    default:
        msg->status = 0;
        msg->payload_cnt = 0;
        break;
    }

    return false;
}

//连续处理函数
void process_optical_flow_data(uint8_t *buffer, uint16_t length)
{
    if(length == 0 || buffer == NULL) return;

    uint16_t index = 0;

    // 遍历整个缓冲区寻找完整的数据帧
    while(index < length) {
        // 寻找帧头
        if(buffer[index] == MICOLINK_MSG_HEAD && (length - index) >= 7) {
            // 检查是否有足够的数据构成一帧
            uint8_t payload_len = buffer[index + 5];
            uint8_t total_len = 7 + payload_len; // 头+设备ID+系统ID+消息ID+序列号+长度+payload+校验和

            if((index + total_len) <= length) {
                // 提取完整帧
                MICOLINK_MSG_t msg;
                msg.head = buffer[index];
                msg.dev_id = buffer[index + 1];
                msg.sys_id = buffer[index + 2];
                msg.msg_id = buffer[index + 3];
                msg.seq = buffer[index + 4];
                msg.len = payload_len;

                // 复制payload数据
                memcpy(msg.payload, &buffer[index + 6], payload_len);
                msg.checksum = buffer[index + 6 + payload_len];

                // 校验数据帧
                if(micolink_check_sum(&msg)) {
                    // 处理有效数据帧
                    process_micolink_message(&msg);
                }

                // 移动到下一帧
                index += total_len;
                continue;
            }
        }
        index++;
    }
}
void process_micolink_message(MICOLINK_MSG_t* msg)
{
    switch(msg->msg_id)
    {
        case MICOLINK_MSG_ID_RANGE_SENSOR:
        {
            MICOLINK_PAYLOAD_RANGE_SENSOR_t payload;
            if(msg->len >= sizeof(MICOLINK_PAYLOAD_RANGE_SENSOR_t)) {
                memcpy(&payload, msg->payload, sizeof(MICOLINK_PAYLOAD_RANGE_SENSOR_t));

                body_height = (float)payload.distance * 0.001f;
                light_speed_x = -(float)payload.flow_vel_y * 0.01f;
                light_speed_y = (float)payload.flow_vel_x * 0.01f;
                lightstream_state = payload.flow_status;
//                height_strength = payload.strength;
//                height_accuracy = payload.precision;
//                height_state = payload.tof_status;
//                lightstream_quality = payload.flow_quality;

                // 调试输出
                // sprintf(tempmessage1,"Height:%.3fm SpeedX:%.3f SpeedY:%.3f\n",
                //         body_height, light_speed_x, light_speed_y);
                // CDC_Transmit_FS((uint8_t *)tempmessage1, strlen(tempmessage1));
            }
            break;
        }

        default:
            // 可以处理其他消息类型
            break;
    }
}

```
