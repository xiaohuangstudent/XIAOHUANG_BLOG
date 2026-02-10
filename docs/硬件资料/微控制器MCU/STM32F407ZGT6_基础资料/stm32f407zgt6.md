# stm32f407zgt6

## 参考资料

datasheet: [datasheet.pdf](./stm32f407zgt6_localdata/datasheet_1.pdf) 

stlink网站：[STSW-LINK009 - ST-LINK、ST-LINK/V2、ST-LINK/V2-1、TLINK-V3 USB驱动程序，已签名适用于Windows7、Windows8、Windows10系统 - 意法半导体STMicroelectronics](https://www.st.com.cn/zh/development-tools/stsw-link009.html?cache=nocache#get-software)

stlink驱动：[ST-Link驱动的下载、安装、配置，以及ST-Link固件的升级_stlink驱动-CSDN博客](https://blog.csdn.net/qq_52102933/article/details/126830904)

淘宝板原理图： [STM32F407ZGT6.pdf](./stm32f407zgt6_localdata/STM32F407ZGT6_1.pdf) 

## CubeIDE

下载：[STM32CubeMX - STM32Cube initialization code generator - STMicroelectronics](https://www.st.com/en/development-tools/stm32cubemx.html?dl=%2BAIW6gn4cLce4TdNGUUXOQ%3D%3D%2CDCcWeMOKF3lQiG4ObK6BLVuylIfSegfK2c8wnfeddGOIeNpcUYil9oOgrTvJ5e1rVRo3pHmp1UzB7iqiq3yYHqtPBjQStN0p5EjTzRAJb8fDbbV%2BHnp3Z2RA0VpSuPn%2BspdiRKCiOObNGAcf70%2FCM16oY1%2FTmELJDcXsNTzNOUyqoHoMQtU4MbN18VeHAKDJbxpuwBqQ77jy2XvEniUkGROnPixk3kpVPe7zrE5IS7ZmZHiumiZATQ6DcGSXXBj8QBLBosPZpUGGoL6AcEsO6s6uI2ZQnvwXxdTOGHHq71265sudf2G3cY2SIo1AonV69wWfasZ%2F0D1jvFjw%2BJVD%2FhvFXtP%2BUzwmdJwxRPnGj5GvdclKPUDTPRIzyw5oJlzA&mkt_tok=ODU2LVBWUC03MTUAAAGXOu2kRx3QrsAz0nhSuVEsh3S0MtGFsH_8qFYq9NEOuiDbFgCn3oKG5z189W10YAqmzVgc8OTU_m37Qn7jq6xiIFDG57w4gjZR_lzYJp8TyQ)

代码补全： alt+/

串口下载代码：[Stm32 cube IDE生成代码 +烧写下载elf文件和 Stm32 cube Programmer 下载elf、hex、bin文件_stm32kill那三个编译按钮分别对应什么-CSDN博客](https://blog.csdn.net/chenhuanqiangnihao/article/details/127223633)

## 报错解决

> Error in initializing ST-LINK device.
>
> Reason: Target not halted.
>
> 参考：[Error message from debugger back end: Error finishing flash operation-CSDN博客](https://blog.csdn.net/geniusChinaHN/article/details/141532916?spm=1001.2014.3001.5501)
>
> 1、BOOT连接高电平，然后再上电（顺序不能反）
>
> 2、STM32 ST-LINK Utility进行CONNECT
>
> 3、擦除整块
>
> <img src="./stm32f407zgt6_localdata/image-20250726161254190_1.png" alt="image-20250726161254190" style="zoom:50%;" />
>
> 4、BOOT连GND重新烧
>
> 

## 代码配置

新建项目参考：[Keil4/keil5如何新建C51/STM32工程项目（手把手教细节）_keil4怎么建立工程-CSDN博客](https://blog.csdn.net/qq_36669063/article/details/131218225)

新建完成后从空模板中拷贝以下文件

```
CORE：STM32最核心部分，用于存放给STM32单片机初始化的核心文件

FWLib：里面还含有src和inc两个文件夹，但是作用是存放stm32单片机的所有函数方法，这些函数方法来自于你提前准备好的stm32标准库源文件包。

SYSTEM：用于存放你自己写的函数方法，而且一般是功能性的函数方法（你可以不用这个文件夹，自己写的函数方法放在User文件夹里，这都是自由的）

User：用于存放主函数main.c、其他自定义函数方法
```

修改迁移项目名称：[基本操作之-keil5在原有工程上修改工程名_keil改文件名-CSDN博客](https://blog.csdn.net/xiaoxilang/article/details/80448488)

### 基本用法

定义字符数组

```
char message[]="Hello World";
```

## CubeIDE

### OpenOCD远程烧录器

[基于 OpenOCD 的 STM32CubeIDE 开发烧录调试环境搭建-DAPLINK_openocd daplink-CSDN博客](https://blog.csdn.net/m0_37717813/article/details/130210769?ops_request_misc=%7B%22request%5Fid%22%3A%22265ab42c8b3fb4ea6639c07459141cec%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=265ab42c8b3fb4ea6639c07459141cec&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-2-130210769-null-null.142^v102^pc_search_result_base3&utm_term=STM32IDE无线DAP调试&spm=1018.2226.3001.4187)

<img src="./stm32f407zgt6_localdata/image-20250422193635827_1.png" alt="image-20250422193635827" style="zoom: 67%;" />

压缩包路径： [远程烧录DAP](./stm32f407zgt6_localdata/远程烧录DAP) 

dap下载路径：

gcc下载路径：[Prebuilt GNU toolchain for ARM](https://gnutoolchains.com/arm-eabi/)

```
文件名：DAP-Linkl-stm32H7.bat
openocd -f interface/cmsis-dap.cfg -f target/stm32h7x.cfg
```

环境变量配置

```
E:\Apps_diskE\OpenOCD\OpenOCD-20240916-0.12.0\bin
```

> 报错解决
>
> [高版本CubeIDE下使用DAP-LINK教程_cubeide daplink-CSDN博客](https://blog.csdn.net/lone5moon/article/details/124940297?ops_request_misc=%7B%22request%5Fid%22%3A%2273a5742835aa033bc27b71099d40bb03%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=73a5742835aa033bc27b71099d40bb03&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-124940297-null-null.142^v102^pc_search_result_base3&utm_term=cubeide报错Could not verify ST device&spm=1018.2226.3001.4187)
>
> <img src="./stm32f407zgt6_localdata/image-20250430211547207_1.png" alt="image-20250430211547207" style="zoom: 33%;" />
>
> <img src="./stm32f407zgt6_localdata/image-20250430211606043_1.png" alt="image-20250430211606043" style="zoom:33%;" />
>
> <img src="./stm32f407zgt6_localdata/image-20250430211621660_1.png" alt="image-20250430211621660" style="zoom:33%;" />
>
> 

### cubeide新建配置

JLink设置：[在STM32 CubeIDE中配置为J-Link调试的步骤_cubeide jlink-CSDN博客](https://blog.csdn.net/Hober_Mallow/article/details/111872401)

<img src="./stm32f407zgt6_localdata/image-20250117181907497_1.png" alt="image-20250117181907497" style="zoom:50%;" />

为每个外设生成.c .h

<img src="./stm32f407zgt6_localdata/image-20241210190223043_1.png" alt="image-20241210190223043" style="zoom: 50%;" />

新建.c .h即可建自己的

sys中的debug要设置成Serial Wire

<img src="./stm32f407zgt6_localdata/image-20250219200050793_1.png" alt="image-20250219200050793" style="zoom:67%;" />

rcc中设置为首字母为CCR的

<img src="./stm32f407zgt6_localdata/image-20250219200136874_1.png" alt="image-20250219200136874" style="zoom:67%;" />

### 变量实时显示设置

<img src="./stm32f407zgt6_localdata/image-20250319222318062_1.png" alt="image-20250319222318062" style="zoom: 67%;" />

<img src="./stm32f407zgt6_localdata/image-20250319222243478_1.png" alt="image-20250319222243478" style="zoom:50%;" />

### #include内容

```
#include <stdio.h>
#include "stm32f4xx_hal.h"
#include <string.h>
```

```
#include "main.h"
#include "tim.h"
#include "usart.h"
#include "gpio.h"
```

## 时钟树配置Clock Configuration

### H7系列

<img src="./stm32f407zgt6_localdata/image-20250320113343933_1.png" alt="image-20250320113343933" style="zoom:50%;" />


## GPIO

```
MX_GPIO_Init();  //这句话系统帮我们设置了gpio
```

exp1:按键按下读取按键电平，设置led引脚高低电平

```
  while (1)
  {
//	 读取pin脚的电平HAL_GPIO_ReadPin(keys1_GPIO_Port, keys1_Pin);
	  if(HAL_GPIO_ReadPin(keys1_GPIO_Port, keys1_Pin)==GPIO_PIN_RESET){
//		  设置输出gpio的值HAL_GPIO_WritePin(led2_GPIO_Port, led2_Pin,GPIO_PIN_RESET);
		  HAL_GPIO_WritePin(led2_GPIO_Port, led2_Pin,GPIO_PIN_RESET);//出低
	  }else{
		  HAL_GPIO_WritePin(led2_GPIO_Port, led2_Pin,GPIO_PIN_SET);
	  }
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
```

exp2:按键按下，GPIO反转，带软件消抖

```
  while (1)
  {
	  if (HAL_GPIO_ReadPin(keys1_GPIO_Port, keys1_Pin) == GPIO_PIN_RESET) {
	      HAL_Delay(25); // 延时50ms，去抖动
	      if (HAL_GPIO_ReadPin(keys1_GPIO_Port, keys1_Pin) == GPIO_PIN_RESET) {
	          HAL_GPIO_TogglePin(led2_GPIO_Port, led2_Pin);
	      }
	  }
    /* USER CODE END WHILE */
    /* USER CODE BEGIN 3 */
  }
```

## 中断

### 按键中断

```
MX_USART3_UART_Init();  //这句话系统帮我们设置了串口
```

exp1:按键中断实现led反转，且中断组判断中断引脚

pin要设置成中断，gpio中要配置电阻，nvic中要使用对应的中断，然后在stm32f4xx_it.c中找到对应的中断服务程序写入函数

> 如果中断中存在延时函数，systick的优先级要高于中断优先级

```
void EXTI15_10_IRQHandler(void)
{
  /* USER CODE BEGIN EXTI15_10_IRQn 0 */
	// 检查引脚10是否触发中断,GPIO_PIN_10可以写成keys3_ir_Pin
	if (__HAL_GPIO_EXTI_GET_IT(GPIO_PIN_10) != RESET) {
	   // 处理来自引脚10的中断
	   __HAL_GPIO_EXTI_CLEAR_IT(GPIO_PIN_10);   //或者HAL_GPIO_EXTI_IRQHandler(keys3_ir_Pin);
	   //反转led1
	   HAL_GPIO_TogglePin(led1_GPIO_Port, led1_Pin);
	}
  /* USER CODE END EXTI15_10_IRQn 0 */
}
```

- 中断重写集合

<img src="./stm32f407zgt6_localdata/image-20250204151757558_1.png" alt="image-20250204151757558" style="zoom:50%;" />

### 多个端口中断

```
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
    if(GPIO_Pin == GPIO_PIN_0)
    {
        if(__HAL_GPIO_EXTI_GET_IT(GPIO_PIN_0) != RESET)
        {
            if(GPIOA->IDR & GPIO_PIN_0)
            {
                // PA0触发的中断
            }
            else if(GPIOB->IDR & GPIO_PIN_0)
            {
                // PB0触发的中断
            }
            __HAL_GPIO_EXTI_CLEAR_IT(GPIO_PIN_0);
        }
    }
}
```

### 回调方式中断

```
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)//实现一下回调函数
 {

   if(GPIO_Pin == GPIO_PIN_10){
	   key1_function();
//       __HAL_GPIO_EXTI_CLEAR_IT(GPIO_PIN_10);
   }
 }

```

### 编码器GPIO中断



## 定时器

### 定时器中断

参考：[STM32-CubeIDE用串口通讯_stm32cubeide 串口-CSDN博客](https://blog.csdn.net/weixin_62567907/article/details/142782885?ops_request_misc=%7B%22request%5Fid%22%3A%224dc3adfd1eacb56d49b7adf8c9767bd4%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=4dc3adfd1eacb56d49b7adf8c9767bd4&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-142782885-null-null.142^v101^pc_search_result_base3&utm_term=cubeide串口&spm=1018.2226.3001.4187)

定时器中断，在中断中通过串口发送格式化输出的数据，每0.2s发送一次，则  
$$
f=5Hz
$$
定时器中断周期
$$
T_{out}=\frac{(arr+1)(psc+1)}{Hclk}
$$

$$
f_{out}=\frac{Hclk}{(arr+1)(psc+1)}
$$

定时器配置

![image-20250203132203254](./stm32f407zgt6_localdata/image-20250203132203254_1.png)

中断配置

![image-20250203132326112](./stm32f407zgt6_localdata/image-20250203132326112_1.png)

中断服务程序

中断开启

```
//开启定时器中断TIM3，用于串口发送数据
	HAL_TIM_Base_Start_IT(&htim3);
```

#### __weak重写

- 定时器中断定时溢出的回调函数

<img src="./stm32f407zgt6_localdata/image-20250204022446149_1.png" alt="image-20250204022446149" style="zoom:67%;" />

中的

```
HAL_TIM_PeriodElapsedCallback(htim);
```

定义也在

```
__weak void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
```

<img src="./stm32f407zgt6_localdata/image-20250204022843901_1.png" alt="image-20250204022843901" style="zoom: 50%;" />

在主程序中重写

```
char message[100];
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim){  //定时器中断
 if(htim==&htim3){
	 //串口发送数据,格式化输出
	 sprintf(message,"Hello World2!");
	 HAL_UART_Transmit(&huart1, (uint8_t*)message, strlen(message), 100);
 }
}
```



## PWM

exp1:实现呼吸灯

时钟树设置和下面一样，参数设置如下

```
/* USER CODE BEGIN 2 */
  //开启pwm
  HAL_TIM_PWM_Start(&htim10, TIM_CHANNEL_1);
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while(1){
	  for(int i=0;i<100;i++){
		  //设置自动比较寄存器的值
		  __HAL_TIM_SET_COMPARE(&htim10,TIM_CHANNEL_1,i);
		  HAL_Delay(10);
	  }
	  for(int i=99;i>=0;i--){
	  		  //设置自动比较寄存器的值
	  		  __HAL_TIM_SET_COMPARE(&htim10,TIM_CHANNEL_1,i);
	  		  HAL_Delay(1);
	  	  }
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
```

exp2：输出如下pwm波,并控制电机转动
$$
T=20ms (f=50Hz) \\
\rho=variable
$$
在时钟树中设置主频，配置TIM引脚，RCC选择

<img src="./stm32f407zgt6_localdata/image-20241210212153724_1.png" alt="image-20241210212153724" style="zoom: 67%;" />

时钟树选择 HCLK为72

<img src="./stm32f407zgt6_localdata/image-20241210212235174_1.png" alt="image-20241210212235174" style="zoom: 50%;" />

主要公式
$$
f=\frac{HCLK}{(PSC+1)(ARR+1)}\\
\rho=\frac{Pulse}{ARR+1}
$$
<img src="./stm32f407zgt6_localdata/image-20241210201157377_1.png" alt="image-20241210201157377" style="zoom:50%;" />

新建文件如下

![image-20241210230314163](./stm32f407zgt6_localdata/image-20241210230314163_1.png)

servomotor.h

```
/*
 * servomotor.h
 *
 *  Created on: Dec 10, 2024
 *      Author: 27276
 */

#ifndef SRC_SERVOMOTOR_SERVOMOTOR_H_
#define SRC_SERVOMOTOR_SERVOMOTOR_H_

void setangle_bottonservo(float theta);

#endif /* SRC_SERVOMOTOR_SERVOMOTOR_H_ */

```

servomotor.c

```
#include "servomotor.h"
#include "tim.h"

//根据角度旋转设置比较计数器的值
//假设已经启动了，arr+1=20000；psc+1=72
//底座的控制线是PC7_TIM3_CH2
void setangle_bottonservo(float theta){
//	pmin=0.025;
//	rhomax=0.125;
	int cur=theta/180*(0.1)*20000+20000*0.025;
	__HAL_TIM_SET_COMPARE(&htim3,TIM_CHANNEL_2,cur);
}

```

已知psc+1=72,arr+1=20000
$$
cur=[\frac{\theta}{180}(\rho_{max}-\rho_{min})+\rho_{min}](arr+1)
$$
main.c

```
 MX_TIM10_Init();
  MX_TIM8_Init();
  MX_TIM3_Init();
  MX_ADC1_Init();
  /* USER CODE BEGIN 2 */
  //开启pwm
  HAL_TIM_PWM_Start(&htim10, TIM_CHANNEL_1);
  HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_2);//pwm底座adc启动
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  setangle_bottonservo(90.0);
  while(1){
	  setangle_bottonservo(0.0);
	  HAL_Delay(1000);
	  setangle_bottonservo(90.0);
	  HAL_Delay(1000);
	  setangle_bottonservo(180.0);
	  HAL_Delay(1000);
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
```

- 对于舵机

(x-0)/180=(x-0.5)/(2.5-0.5)

## ADC

主要参考：[HAL库配置ADC+DMA_stm32cubemx adc-CSDN博客](https://blog.csdn.net/m0_61973119/article/details/143055637?ops_request_misc=%7B%22request%5Fid%22%3A%22918a31c0bfc77b65e381ec081472f90b%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=918a31c0bfc77b65e381ec081472f90b&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-143055637-null-null.142^v102^pc_search_result_base3&utm_term= HAL stm32 adc&spm=1018.2226.3001.4187)

校准（不太用得到）：[STM32L0 ADC使用HAL库关于校准问题的说明_mcu adc校准-CSDN博客](https://blog.csdn.net/weixin_42328389/article/details/129518720)



### 单通道ADC

使用的是adc_in

exp1

注意：16位的是665535

<img src="./stm32f407zgt6_localdata/image-20250324001404241_1.png" alt="image-20250324001404241" style="zoom: 80%;" />

校准

```
HAL_ADCEx_Calibration_Start();
```

```
int value=0;
float voltage=0.0;
int main(void)
{
while (1)
  {
	  HAL_ADC_Start(&hadc1);
	  HAL_ADC_PollForConversion(&hadc1, 20);
	  value=HAL_ADC_GetValue(&hadc1);
	  voltage=(value/65536.0)*3.3;

	  HAL_Delay(100);
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
}
```

如果要配置成连续转换模式

<img src="./stm32f407zgt6_localdata/image-20250527214455136_1.png" alt="image-20250527214455136" style="zoom:50%;" />

### 单通道轮询实现多通道（不好）

```c
uint32_t ADC_Get_Average(uint32_t Channel,uint8_t times)
{
	ADC_ChannelConfTypeDef sConfig = {0};//通道初始化
	uint32_t value_sum=0;
	uint8_t i;
	sConfig.Channel = Channel;
	sConfig.SamplingTime = ADC3_SAMPLETIME_2CYCLES_5;		//采用周期239.5周期
	sConfig.Rank = 1;
	sConfig.SingleDiff = ADC_SINGLE_ENDED;
	sConfig.OffsetNumber = ADC_OFFSET_NONE;
	sConfig.Offset = 0;
	sConfig.OffsetSign = ADC3_OFFSET_SIGN_NEGATIVE;
	while (HAL_ADC_ConfigChannel(&hadc3, &sConfig) != HAL_OK)
	{
	}
	for(i=0;i<times;i++)
	{
		HAL_ADC_Start(&hadc3);								//启动转换
		HAL_ADC_PollForConversion(&hadc3,30);				//等待转化结束
		value_sum += HAL_ADC_GetValue(&hadc3);				//求和
		HAL_ADC_Stop(&hadc3);								//停止转换
	}
	return value_sum/times;									//返回平均值
}
```

使用

```
	  current_adc1_value[0]=ADC_Get_Average(ADC_CHANNEL_1,30);
	  current_adc1_value[1]=ADC_Get_Average(ADC_CHANNEL_4,30);
	  current_adc1_value[2]=ADC_Get_Average(ADC_CHANNEL_3,30);
	  current_adc1_value[3]=ADC_Get_Average(ADC_CHANNEL_2,30);
```



### 多通道DMA模式

#### 单次扫描模式（存储在数组中）



#### 连续扫描模式（存储在数组中）

<img src="./stm32f407zgt6_localdata/image-20250527223133904_1.png" alt="image-20250527223133904" style="zoom:67%;" />



DMA的channel要设置成DMA Stream

<img src="./stm32f407zgt6_localdata/image-20250530133420721_1.png" alt="image-20250530133420721" style="zoom:80%;" />

字设置如同（默认）

<img src="./stm32f407zgt6_localdata/image-20250527222613924_1.png" alt="image-20250527222613924" style="zoom: 50%;" />

连续模式DMA需要设置成Circular

<img src="./stm32f407zgt6_localdata/image-20250527223354174_1.png" alt="image-20250527223354174" style="zoom:50%;" />

DMA触发程序

<img src="./stm32f407zgt6_localdata/image-20250527225216284_1.png" alt="image-20250527225216284" style="zoom:80%;" />

转换完成中断回调函数

<img src="./stm32f407zgt6_localdata/image-20250527222955387_1.png" alt="image-20250527222955387" style="zoom:67%;" />

```

```



## 串口

串口调试助手： [串口调试工具.exe](./stm32f407zgt6_localdata/串口调试工具_1.exe) 

在线串口调试助手：[波特律动 串口助手](https://serial.keysking.com/)

注意淘宝买的和那个usb转ttl是tx-tx,rx-rx

### 空闲中断

HAL_UART_Transmit的使用sizeof

参考:[STM32 HAL CubeMX 串口IDLE接收空闲中断 不使用DMA_cubemx 串口空闲中断-CSDN博客](https://blog.csdn.net/Londoge/article/details/139610106?ops_request_misc=%7B%22request%5Fid%22%3A%225b6a2bb2e6fa15f83b0b28346e217aa8%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=5b6a2bb2e6fa15f83b0b28346e217aa8&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-4-139610106-null-null.142^v102^pc_search_result_base2&utm_term=stm32cubemx串口空闲中断&spm=1018.2226.3001.4187)

```
#include "stdio.h"
#include "string.h"
```

初始化

```
  HAL_UARTEx_ReceiveToIdle_IT(&huart1, my_uart1_redatas, RemaxLen);
  HAL_UARTEx_ReceiveToIdle_IT(&huart2, my_uart2_redatas, RemaxLen);
  HAL_UARTEx_ReceiveToIdle_IT(&huart3, my_uart3_redatas, RemaxLen);
```

主循环

```
 while (1)
  {
    /* USER CODE END WHILE */
	  //空闲中断溢出
	  if(my_uart1_rxflag == 1)
	  {
		  my_uart1_rxflag = 0;
//		  HAL_UART_Transmit(&huart1, my_uart1_redatas, my_uart1_indx, 0xff);
		  HAL_UART_Transmit(&huart3, my_uart1_redatas, my_uart1_indx, 0xff);
		  memset(my_uart1_redatas, 0 ,RemaxLen);
	  }
	  if(my_uart2_rxflag == 1)
	  {
		  my_uart2_rxflag = 0;
		  HAL_UART_Transmit(&huart2, my_uart2_redatas, my_uart2_indx, 0xff);
		  memset(my_uart2_redatas, 0 ,RemaxLen);
	  }
	  if(my_uart3_rxflag == 1)
	  {
		  my_uart3_rxflag = 0;
//		  HAL_UART_Transmit(&huart3, my_uart3_redatas, my_uart3_indx, 0xff);
		  HAL_UART_Transmit(&huart1, my_uart3_redatas, my_uart3_indx, 0xff);
		  memset(my_uart3_redatas, 0 ,RemaxLen);
	  }
```

全局函数

```
/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
/* USER CODE BEGIN PFP */
void HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *huart, uint16_t Size);
/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
#define AIWB2TYPE 0 //0表示接收端，和上位机直连
#define RemaxLen 200 //0表示接收端，和上位机直连

//串口空闲中断接收
uint8_t my_uart1_redatas[RemaxLen];
unsigned int my_uart1_indx;
unsigned char my_uart1_rxflag;

uint8_t my_uart2_redatas[RemaxLen];
unsigned int my_uart2_indx;
unsigned char my_uart2_rxflag;

uint8_t my_uart3_redatas[RemaxLen];
unsigned int my_uart3_indx;
unsigned char my_uart3_rxflag;

void HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *huart, uint16_t Size)  //接收回调函数，用于处理空闲中断以及重新开启中断
{
	if(huart == &huart1){
		my_uart1_indx = Size;
		HAL_UARTEx_ReceiveToIdle_IT(huart, my_uart1_redatas, RemaxLen);
		my_uart1_rxflag = 1;
	}else if(huart == &huart2){
		my_uart2_indx = Size;
		HAL_UARTEx_ReceiveToIdle_IT(huart, my_uart2_redatas, RemaxLen);
		my_uart2_rxflag = 1;
	}else if(huart == &huart3){
		my_uart3_indx = Size;
		HAL_UARTEx_ReceiveToIdle_IT(huart, my_uart3_redatas, RemaxLen);
		my_uart3_rxflag = 1;
	}
}
/* USER CODE END 0 */
```

完整main：

```
/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2025 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include "usart.h"
#include "gpio.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include "stdio.h"
#include "string.h"
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/

/* USER CODE BEGIN PV */

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
/* USER CODE BEGIN PFP */
void HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *huart, uint16_t Size);
/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
#define AIWB2TYPE 0 //0表示接收端，和上位机直连
#define RemaxLen 200 //0表示接收端，和上位机直连
////串口收到数据回调
////uart1用于连接typeA和mcu
////uart2用于连接飞控和mcu
////uart3用于连接aiwb2和mcu
//uint8_t my_uart1_redata[128]=0;
//uint8_t my_uart2_redata[128]=0;
//uint8_t my_uart3_redata[128]=0;
//void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {
//	if(AIWB2TYPE==0){  //接收端设备 只使用uart3、uart1
//		/*
//		 * 1、Aiwb2（uart3 Receive）传给mcu的数据原封不动地传给typeA（uart1 Transmit），让上位机可以看到
//		 * 2、typeA（uart1 Receive）传给mcu的数据原封不动的传给aiwb2（uart3 Transmit）, 让aiwb2能接收到
//		 */
//		if(huart == &huart1) {	//判断串口号
//			HAL_UART_Transmit_IT(&huart1,&my_uart1_redata,1);//把接收到的数据通过串口发送
//			HAL_UART_Transmit_IT(&huart3,&my_uart1_redata,1);//把接收到的数据通过串口发送
//			HAL_UART_Receive_IT(&huart1,&my_uart1_redata,1); //再次开启一次中断
//		}
//		if(huart == &huart3) {	//aiwb2
//			HAL_UART_Transmit_IT(&huart1,&my_uart3_redata,1);//把接收到的数据通过串口发送
//			HAL_UART_Receive_IT(&huart3,&my_uart3_redata,1); //再次开启一次中断
//		}
//	}else if(AIWB2TYPE==1){   //发送端设备
//
//	}
//
//}

//串口空闲中断接收
uint8_t my_uart1_redatas[RemaxLen];
unsigned int my_uart1_indx;
unsigned char my_uart1_rxflag;

uint8_t my_uart2_redatas[RemaxLen];
unsigned int my_uart2_indx;
unsigned char my_uart2_rxflag;

uint8_t my_uart3_redatas[RemaxLen];
unsigned int my_uart3_indx;
unsigned char my_uart3_rxflag;

void HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *huart, uint16_t Size)  //接收回调函数，用于处理空闲中断以及重新开启中断
{
	if(huart == &huart1){
		my_uart1_indx = Size;
		HAL_UARTEx_ReceiveToIdle_IT(huart, my_uart1_redatas, RemaxLen);
		my_uart1_rxflag = 1;
	}else if(huart == &huart2){
		my_uart2_indx = Size;
		HAL_UARTEx_ReceiveToIdle_IT(huart, my_uart2_redatas, RemaxLen);
		my_uart2_rxflag = 1;
	}else if(huart == &huart3){
		my_uart3_indx = Size;
		HAL_UARTEx_ReceiveToIdle_IT(huart, my_uart3_redatas, RemaxLen);
		my_uart3_rxflag = 1;
	}
}
/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{

  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_USART1_UART_Init();
  MX_USART2_UART_Init();
  MX_USART3_UART_Init();
  /* USER CODE BEGIN 2 */
  //开启uart1-3的接收中断
//    HAL_UART_Receive_IT(&huart1,&my_uart1_redata,1); //再次开启一次中断
//
//    HAL_UART_Receive_IT(&huart3,&my_uart3_redata,1); //再次开启一次中断
  HAL_UARTEx_ReceiveToIdle_IT(&huart1, my_uart1_redatas, RemaxLen);
  HAL_UARTEx_ReceiveToIdle_IT(&huart2, my_uart2_redatas, RemaxLen);
  HAL_UARTEx_ReceiveToIdle_IT(&huart3, my_uart3_redatas, RemaxLen);
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */
	  //空闲中断溢出
	  if(my_uart1_rxflag == 1)
	  {
		  my_uart1_rxflag = 0;
//		  HAL_UART_Transmit(&huart1, my_uart1_redatas, my_uart1_indx, 0xff);
		  HAL_UART_Transmit(&huart3, my_uart1_redatas, my_uart1_indx, 0xff);
		  memset(my_uart1_redatas, 0 ,RemaxLen);
	  }
	  if(my_uart2_rxflag == 1)
	  {
		  my_uart2_rxflag = 0;
		  HAL_UART_Transmit(&huart2, my_uart2_redatas, my_uart2_indx, 0xff);
		  memset(my_uart2_redatas, 0 ,RemaxLen);
	  }
	  if(my_uart3_rxflag == 1)
	  {
		  my_uart3_rxflag = 0;
//		  HAL_UART_Transmit(&huart3, my_uart3_redatas, my_uart3_indx, 0xff);
		  HAL_UART_Transmit(&huart1, my_uart3_redatas, my_uart3_indx, 0xff);
		  memset(my_uart3_redatas, 0 ,RemaxLen);
	  }

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
  RCC_OscInitStruct.HSEState = RCC_HSE_ON;
  RCC_OscInitStruct.HSEPredivValue = RCC_HSE_PREDIV_DIV1;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
  RCC_OscInitStruct.PLL.PLLMUL = RCC_PLL_MUL9;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV2;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_2) != HAL_OK)
  {
    Error_Handler();
  }
}

/* USER CODE BEGIN 4 */

/* USER CODE END 4 */

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}
#ifdef USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */

```



### 字符串格式化

导包

```
#include <stdio.h>
#include <string.h>
```

#### sscanf字符串格式化提取

- 从给定的字符串中提取 @后面的字符串和=后面的浮点数，忽略$之后的所有内容

非函数版

```
#include <stdio.h>
#include <string.h>

int main() {
    char input[] = "@nihao=1.2345$111";
    char str[100];
    float num;
    //
    // 使用 sscanf 来提取 @后面的字符串和=后面的浮点数
    if (sscanf(input, "@%[^=]=%f$", str, &num) == 2) {
        // %[^=]表示读取'='之前的所有字符作为字符串
        // %f表示读取浮点数
        printf("字符串: %s\n", str);
        printf("浮点数: %f\n", num);
    } else {
        printf("解析失败\n");
    }

    return 0;
}

```

函数版

```
#include <stdio.h>
#include <string.h>

// 函数：从给定的字符串中提取 @后面的字符串和=后面的浮点数
int extract_string_and_float(const char *input, char *str, float *num) {
    // 使用 sscanf 来提取 @后面的字符串和=后面的浮点数
    return sscanf(input, "@%[^=]=%f$", str, num);
}
int main() {
    char input[] = "@nihao=1.2345$111";  // 输入字符串
    char str[100];  // 用于保存提取的字符串
    float num;  // 用于保存提取的浮点数

    // 调用提取函数
    if (extract_string_and_float(input, str, &num) == 2) {
        // 如果解析成功
        printf("字符串: %s\n", str);
        printf("浮点数: %f\n", num);
    } else {
        // 如果解析失败
        printf("解析失败\n");
    }
    return 0;
}

```

#### 格式化输出

- char,int,float

```
#include <stdio.h>
#include <string.h>
```

```
int a = 123;
    float b = 3.14159;
    char c = 'X';
    char str[] = "Hello, World!";
    // 定义一个足够大的字符数组来保存格式化后的字符串
    char output[100];
    // 使用sprintf将格式化结果存储到output数组
    sprintf(output, "Integer: %d\nFloat: %.2f\nCharacter: %c\nString: %s\n", a, b, c, str);
```

```
sprintf(message,"temp2=%d",temp2);
HAL_UART_Transmit(&huart1, (uint8_t*)message, strlen(message),100);
```

- short (%d)

```
// 获取E1计数值并打印为整数
sprintf(message, "SPEED:%d", Get_SPEED_E1());  // 使用 %d 格式符打印整数
HAL_UART_Transmit(&huart1, (uint8_t*)message, strlen(message), 100);
```

#### 格式化输入

#### 报错

##### 浮点数报错

> The float formatting support is not enabled, check your MCU Settings from "Project Properties > C/C++ Build > Settings > Tool Settings", or add manually "-u _scanf_float" in linker flags.
>
> ```
> 打开STM32CubeIDE，并导航到你的项目。
> 
> 在项目资源管理器中选择你的项目，右键单击并选择"Properties"（属性）。
> 
> 在弹出的对话框中，选择"C/C++ Build"（C/C++构建）。
> 
> 展开"C/C++ Build"并选择"Settings"（设置）。
> 
> 在左侧的列表中选择"Tool Settings"（工具设置）。
> 
> 在右侧的选项卡中选择"MCU Settings"（MCU设置）。
> 
> 勾选Use float with printf from newlib-nano (-u printf float)。
> ```
>
> <img src="./stm32f407zgt6_localdata/image-20250204151253803_1.png" alt="image-20250204151253803" style="zoom: 50%;" />
>
> <img src="./stm32f407zgt6_localdata/image-20250204151221613_1.png" alt="image-20250204151221613" style="zoom: 33%;" />

##### 重定义

extern的使用

>在头文件 it_redefine.h 中，speed 变量被声明为 extern，但是它同时也被初始化为 0.0f。在 C 中，extern 用于声明外部变量，表示该变量在其他地方定义，不能同时初始化它。你需要在头文件中只声明 extern float speed;，并在源文件中定义并初始化它。
>
>解决方法：
>
>在 it_redefine.h 中，删除初始化部分，仅声明
>extern float speed;  // 只声明，不初始化
>在一个源文件（比如 main.c 或 it_redefine.c）中，定义并初始化 speed：
>float speed = 0.0f;  // 在源文件中定义并初始化

变量既要在.h中带extern声明，也要在.c中再实现

>关于 rx_buffer 的未定义引用错误
>编译器提示找不到 rx_buffer 变量的定义。根据你的错误，rx_buffer 被在 it_redefine.h 和 main.c 中使用，但是没有定义。你需要确保 rx_buffer 是在一个源文件中定义的，而在头文件中声明为 extern。
>
>解决方法：在 it_redefine.h 中声明 extern：
>
>```
>extern char rx_buffer[BUFFER_SIZE];  // 声明 rx_buffer 为外部变量
>```
>
>在某个源文件（例如 main.c 或 it_redefine.c）中定义它：
>
>```
>char rx_buffer[BUFFER_SIZE];  // 在源文件中定义 rx_buffer
>```

### USART

单片机课程中使用的是USART3,技术手册是USART3(PB10/11 和 PC10/11)

选择connectivity后就会自动选中对应的引脚

<img src="./stm32f407zgt6_localdata/image-20241210010928914_1.png" alt="image-20241210010928914" style="zoom: 50%;" />

#### 串口阻塞

使用strlen()时要

```
#include <string.h>
```

学校的学习板中要在usart中选取cts/rts，有点问题要改

最大超时时间

```
HAL_MAX_DELAY
```

发送

```
MX_USART3_UART_Init();
  /* USER CODE BEGIN 2 */
  /* USER CODE END 2 */
  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  char message[]="Hello World";//要发送的数据
  int numbers[3]={10,20,100};
  while (1)
  {
	  //通过串口发送数据，使用tx对应的线要取地址-&、发送的信息、长度、最长等待时间ms
	  //message和指定输入虽然都是8位的，最好可以强转一下message->(uint8_t*)huart3
	  HAL_UART_Transmit(&huart3, (uint8_t*)message, strlen(message), 100);
	  //等待，实现每秒发送一次
	  HAL_Delay(1000);
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
```

读取并复制发送

```
	  //串口收发信息
	  HAL_UART_Receive(&huart1, (uint8_t*)message, 20, HAL_MAX_DELAY);
	  //发
	  HAL_UART_Transmit(&huart1, (uint8_t*)message, strlen(message), 100);
```



#### 中断中使用串口

```
#include "usart.h"
```

#### 串口接收数据触发中断

在串口中断中接收上位机发来的"setspeed=100.2",提取出100.2放在一个变量中

<img src="./stm32f407zgt6_localdata/image-20250204024137078_1.png" alt="image-20250204024137078" style="zoom:50%;" />



### UART

串口中断回调函数：

```
HAL_UART_IRQHandler(UART_HandleTypeDef *huart); //串口中断处理函数

HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart); //发送中断回调函数

HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart); //接收中断回调函数
```

### 串口中断和空闲中断进行不定长数据接收

[STM32CubeIDE串口空闲中断实现不定长数据接收_空闲中断 uart 不定长度-CSDN博客](https://blog.csdn.net/weixin_44481398/article/details/134894292?ops_request_misc=%7B%22request%5Fid%22%3A%223ba30b37e8b39c4cdddb218adfc38802%22%2C%22scm%22%3A%2220140713.130102334.pc%5Fall.%22%7D&request_id=3ba30b37e8b39c4cdddb218adfc38802&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-2-134894292-null-null.142^v102^pc_search_result_base3&utm_term=cubeide串口不定长接收&spm=1018.2226.3001.4187)

- 配置串口打开中断有两条指令，可以将这两条指令放在：
  static void MX_USART1_UART_Init(void)下面

  ```
  /* USER CODE BEGIN USART1_Init 2 */
    __HAL_UART_ENABLE_IT(&huart1, UART_IT_RXNE);//接收中断
    __HAL_UART_ENABLE_IT(&huart1, UART_IT_IDLE);//空闲中断
  
    /* USER CODE END USART1_Init 2 */
  
  ```

- 中断程序

  在stm32f0xx_it.c文件下找到void USART1_IRQHandler(void)，在其中的用户代码段中添加：

  ```
  /* USER CODE BEGIN USART1_IRQn 0 */
  	//接收中断
  		uint8_t rxData = 0;
  		if(__HAL_UART_GET_FLAG(&huart1, UART_FLAG_RXNE) != RESET)
  		{
  			HAL_UART_Receive(&huart1, &rxData, 1, 1000);
  			if(Cnt < 256)
  			{
  				rx_buff[Cnt] = rxData;
  				Cnt++;
  			}
  			__HAL_UART_CLEAR_FLAG(&huart1, UART_FLAG_RXNE);
  		}
  		// 空闲中断
  		if(__HAL_UART_GET_FLAG(&huart1, UART_FLAG_IDLE) != RESET)
  		{
  			//一帧数据接收完成
  			USART1_IdleCallback(rx_buff, Cnt);
  			Cnt = 0;
  
  			__HAL_UART_CLEAR_IDLEFLAG(&huart1);
  		}
  
    /* USER CODE END USART1_IRQn 0 */
    // 此处是原来已经有的程序，保留：
    HAL_UART_IRQHandler(&huart1);
  
  ```

- 接着在这一部分的程序下面添加回调函数：

  ```
  /* USER CODE BEGIN 1 */
  //回调函数
  void USART1_IdleCallback(uint8_t *pData,uint16_t len)
  {
  	while(__HAL_UART_GET_FLAG(&huart1,UART_FLAG_TC) != SET);
  
  	HAL_UART_Transmit(&huart1, pData, len, 1000);
  }
  /* USER CODE END 1 */
  ```

- 这一部分执行将串口输入的数据回显输出到串口。

<img src="./stm32f407zgt6_localdata/image-20250328232801052_1.png" alt="image-20250328232801052" style="zoom:33%;" />

- 使用@xxx=xx.xxx$命令时则

```

```



### 串口重定向

## 安信可ai-wb2-12f

教程：[Ai-WB2系列的固件烧录指导_ai-wb2-12f-CSDN博客](https://aithinker.blog.csdn.net/article/details/125781602)

资料下载连接：https://docs.ai-thinker.com/wb2                

AT指令： [WB2AT指令集.pdf](./stm32f407zgt6_localdata/WB2AT指令集_1.pdf)                                           

### 蓝牙                                                                                                                                                                  

主机

```
AT+RESTORE //恢复出厂设置
AT+RST
AT+BLENAME?
AT+BLENAME=aiwb2_group1_a
AT+BLEMODE=1
AT+BLERFPWR=15
AT+TRANSENTER=1,1
AT+BLECONNECT=b4c2e0e7bdba
AT+BLEAUTOCON=b4c2e0e7bdba,49535343884143f4a8d4ecbe34729bb3,1  //
+++ //退出传输
```

从机

```
AT+RESTORE  //恢复出厂设置
AT+RST
AT+BLENAME=aiwb2_group1_b
AT+BLEMODE?
AT+BLEMODE=0
AT+BLERFPWR=15
AT+BLEMAC?  // +BLEMAC:b4c2e0e7bdba
AT+BLETXUUID?   // +BLETXUUID:49535343884143f4a8d4ecbe34729bb3

```

<img src="./stm32f407zgt6_localdata/image-20250712140953484_1.png" alt="image-20250712140953484" style="zoom:50%;" />

## I2C

### 软件I2C

### 硬件I2C

### I2S

SerialPlot：

## 磁编码器

### AS5600

使用+3v3电压，DIR

<img src="./stm32f407zgt6_localdata/image-20250527204417482_1.png" alt="image-20250527204417482" style="zoom:50%;" />

参考：[STM32 HAL库 AS5600编码器程序_stm32hal库读取as5600角度-CSDN博客](https://blog.csdn.net/qq_42580345/article/details/134359158?ops_request_misc=%7B%22request%5Fid%22%3A%221511ff806024efdccd0b685f20f541b6%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=1511ff806024efdccd0b685f20f541b6&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~ElasticSearch~search_v2-1-134359158-null-null.142^v102^pc_search_result_base3&utm_term=as5600 stm32库程序&spm=1018.2226.3001.4187)

## OLED

<img src="./stm32f407zgt6_localdata/image-20250531224134029_1.png" alt="image-20250531224134029" style="zoom:50%;" />

oled.h

```
/*
 * oled.h
 *
 *  Created on: Mar 19, 2025
 *      Author: 27276
 */

#ifndef SRC_OLED_OLED_H_
#define SRC_OLED_OLED_H_

#include "main.h"
#include "oledfont.h"
#define I2C_GROUP_OLED hi2c2
extern I2C_HandleTypeDef  hi2c2;

void OLED_WR_CMD(uint8_t cmd);
void OLED_WR_DATA(uint8_t data);
void OLED_Init(void);
void OLED_Clear(void);
void OLED_Display_On(void);
void OLED_Display_Off(void);
void OLED_Set_Pos(uint8_t x, uint8_t y);
void OLED_On(void);
void OLED_ShowNum(uint8_t x,uint8_t y,unsigned int num,uint8_t len,uint8_t size2,uint8_t Color_Turn);
void OLED_Showdecimal(uint8_t x,uint8_t y,float num,uint8_t z_len,uint8_t f_len,uint8_t size2, uint8_t Color_Turn);
void OLED_ShowChar(uint8_t x,uint8_t y,uint8_t chr,uint8_t Char_Size,uint8_t Color_Turn);
void OLED_ShowString(uint8_t x,uint8_t y,char*chr,uint8_t Char_Size,uint8_t Color_Turn);
void OLED_ShowCHinese(uint8_t x,uint8_t y,uint8_t no,uint8_t Color_Turn);
void OLED_DrawBMP(uint8_t x0, uint8_t y0, uint8_t x1, uint8_t y1, uint8_t *  BMP,uint8_t Color_Turn);
void OLED_HorizontalShift(uint8_t direction);
void OLED_Some_HorizontalShift(uint8_t direction,uint8_t start,uint8_t end);
void OLED_VerticalAndHorizontalShift(uint8_t direction);
void OLED_DisplayMode(uint8_t mode);
void OLED_IntensityControl(uint8_t intensity);


#endif /* SRC_OLED_OLED_H_ */

```

oled.c

```
/*
 * oled.c
 *
 *  Created on: 2022年7月24日
 *      Author: Unicorn_Li
 */
#include "oled.h"

/**********************************************************
 * 初始化命令,根据芯片手册书写，详细步骤见上图以及注意事项
 ***********************************************************/
uint8_t CMD_Data[]={
0xAE, 0xD5, 0x80, 0xA8, 0x3F, 0xD3, 0x00, 0x40,0xA1, 0xC8, 0xDA,

0x12, 0x81, 0xCF, 0xD9, 0xF1, 0xDB, 0x40, 0xA4, 0xA6,0x8D, 0x14,

0xAF};


/**
 * @function: void OLED_Init(void)
 * @description: OLED初始化
 * @return {*}
 */
void OLED_Init(void)
{
	HAL_Delay(200);

	uint8_t i = 0;
	for(i=0; i<23; i++)
	{
		OLED_WR_CMD(CMD_Data[i]);
	}

}

/**
 * @function: void OLED_WR_CMD(uint8_t cmd)
 * @description: 向设备写控制命令
 * @param {uint8_t} cmd 芯片手册规定的命令
 * @return {*}
 */
void OLED_WR_CMD(uint8_t cmd)
{
	HAL_I2C_Mem_Write(&I2C_GROUP_OLED ,0x78,0x00,I2C_MEMADD_SIZE_8BIT,&cmd,1,0x100);
}

/**
 * @function: void OLED_WR_DATA(uint8_t data)
 * @description: 向设备写控制数据
 * @param {uint8_t} data 数据
 * @return {*}
 */
void OLED_WR_DATA(uint8_t data)
{
	HAL_I2C_Mem_Write(&I2C_GROUP_OLED ,0x78,0x40,I2C_MEMADD_SIZE_8BIT,&data,1,0x100);
}

/**
 * @function: void OLED_On(void)
 * @description: 更新显示

 * @return {*}
 */
void OLED_On(void)
{
	uint8_t i,n;
	for(i=0;i<8;i++)
	{
		OLED_WR_CMD(0xb0+i);    //设置页地址（0~7）
		OLED_WR_CMD(0x00);      //设置显示位置—列低地址
		OLED_WR_CMD(0x10);      //设置显示位置—列高地址
		for(n=0;n<128;n++)
			OLED_WR_DATA(1);
	}
}


/**
 * @function: OLED_Clear(void)
 * @description: 清屏,整个屏幕是黑色的!和没点亮一样!!!
 * @return {*}
 */
void OLED_Clear(void)
{
	uint8_t i,n;
	for(i=0;i<8;i++)
	{
		OLED_WR_CMD(0xb0+i);    //设置页地址（0~7）
		OLED_WR_CMD(0x00);      //设置显示位置—列低地址
		OLED_WR_CMD(0x10);      //设置显示位置—列高地址
		for(n=0;n<128;n++)
			OLED_WR_DATA(0);
	}
}

/**
 * @function: void OLED_Display_On(void)
 * @description: 开启OLED显示
 * @return {*}
 */
void OLED_Display_On(void)
{
	OLED_WR_CMD(0X8D);  //SET DCDC命令
	OLED_WR_CMD(0X14);  //DCDC ON
	OLED_WR_CMD(0XAF);  //DISPLAY ON,打开显示
}


/**
 * @function: void OLED_Display_Off(void)
 * @description: 关闭OLED显示
 * @return {*}
 */
void OLED_Display_Off(void)
{
	OLED_WR_CMD(0X8D);  //SET DCDC命令
	OLED_WR_CMD(0X10);  //DCDC OFF
	OLED_WR_CMD(0XAE);  //DISPLAY OFF，关闭显示
}

/**
 * @function: void OLED_Set_Pos(uint8_t x, uint8_t y)
 * @description: 坐标设置
 * @param {uint8_t} x,y
 * @return {*}
 */
void OLED_Set_Pos(uint8_t x, uint8_t y)
{
	OLED_WR_CMD(0xb0+y);	//设置页地址（0~7）
	OLED_WR_CMD(((x&0xf0)>>4)|0x10); //设置显示位置—列高地址
	OLED_WR_CMD(x&0x0f);	//设置显示位置—列低地址
}


/**
 * @function: unsigned int oled_pow(uint8_t m,uint8_t n)
 * @description: m^n函数
 * @param {uint8_t} m,n
 * @return {unsigned int} result
 */
unsigned int oled_pow(uint8_t m,uint8_t n)
{
	unsigned int result=1;
	while(n--)result*=m;
	return result;
}

/**
 * @function: void OLED_ShowChar(uint8_t x, uint8_t y, uint8_t chr, uint8_t Char_Size,uint8_t Color_Turn)
 * @description: 在OLED12864特定位置开始显示一个字符
 * @param {uint8_t} x字符开始显示的横坐标
 * @param {uint8_t} y字符开始显示的纵坐标
 * @param {uint8_t} chr待显示的字符
 * @param {uint8_t} Char_Size待显示字符的字体大小,选择字体 16/12
 * @param {uint8_t} Color_Turn是否反相显示(1反相、0不反相)
 * @return {*}
 */
void OLED_ShowChar(uint8_t x,uint8_t y,uint8_t chr,uint8_t Char_Size,uint8_t Color_Turn)
{
	unsigned char c=0,i=0;
		c=chr-' ';//得到偏移后的值
		if(x>128-1){x=0;y=y+2;}
		if(Char_Size ==16)
		{
			OLED_Set_Pos(x,y);
			for(i=0;i<8;i++)
				{
				  if(Color_Turn)
					  OLED_WR_DATA(~F8X16[c*16+i]);
				  else
					  OLED_WR_DATA(F8X16[c*16+i]);
				}
			OLED_Set_Pos(x,y+1);
			for(i=0;i<8;i++)
			    {
				  if(Color_Turn)
					  OLED_WR_DATA(~F8X16[c*16+i+8]);
				  else
					  OLED_WR_DATA(F8X16[c*16+i+8]);
			    }

			}
	     else
	     {
				OLED_Set_Pos(x,y);
				for(i=0;i<6;i++)
			    {
				  if(Color_Turn)
					  OLED_WR_DATA(~F6x8[c][i]);
				  else
					  OLED_WR_DATA(F6x8[c][i]);
			    }
		  }
}

/**
 * @function: void OLED_ShowString(uint8_t x, uint8_t y, uint8_t *chr, uint8_tChar_Size, uint8_t Color_Turn)
 * @description: 在OLED12864特定位置开始显示字符串
 * @param {uint8_t} x待显示字符串的开始横坐标x:0~127
 * @param {uint8_t} y待显示字符串的开始纵坐标 y:0~7，若选择字体大小为16，则两行数字之间需要间隔2，若选择字体大小为12，间隔1
 * @param {uint8_t} *chr待显示的字符串
 * @param {uint8_t} Char_Size待显示字符串的字体大小,选择字体 16/12，16为8X16，12为6x8
 * @param {uint8_t} Color_Turn是否反相显示(1反相、0不反相)
 * @return {*}
 */
void OLED_ShowString(uint8_t x,uint8_t y,char*chr,uint8_t Char_Size, uint8_t Color_Turn)
{
	uint8_t  j=0;
	while (chr[j]!='\0')
	{		OLED_ShowChar(x,y,chr[j],Char_Size, Color_Turn);
			if (Char_Size == 12) //6X8的字体列加6，显示下一个字符
				x += 6;
			else  //8X16的字体列加8，显示下一个字符
				x += 8;

			if (x > 122 && Char_Size==12) //TextSize6x8如果一行不够显示了，从下一行继续显示
			{
				x = 0;
				y++;
			}
			if (x > 120 && Char_Size== 16) //TextSize8x16如果一行不够显示了，从下一行继续显示
			{
				x = 0;
				y++;
			}
			j++;
	}
}

/**
 * @function: void OLED_ShowNum(uint8_t x,uint8_t y,unsigned int num,uint8_t len,uint8_t size2, Color_Turn)
 * @description: 显示数字
 * @param {uint8_t} x待显示的数字起始横坐标,x:0~126
 * @param {uint8_t} y待显示的数字起始纵坐标, y:0~7，若选择字体大小为16，则两行数字之间需要间隔2，若选择字体大小为12，间隔1
 * @param {unsigned int} num:输入的数据
 * @param {uint8_t } len:输入的数据位数
 * @param {uint8_t} size2:输入的数据大小，选择 16/12，16为8X16，12为6x8
 * @param {uint8_t} Color_Turn是否反相显示(1反相、0不反相)
 * @return {*}
 */
void OLED_ShowNum(uint8_t x,uint8_t y,unsigned int num,uint8_t len,uint8_t size2, uint8_t Color_Turn)
{
	uint8_t t,temp;
	uint8_t enshow=0;
	for(t=0;t<len;t++)
	{
		temp=(num/oled_pow(10,len-t-1))%10;
		if(enshow==0&&t<(len-1))
		{
			if(temp==0)
			{
				OLED_ShowChar(x+(size2/2)*t,y,' ',size2, Color_Turn);
				continue;
			}else enshow=1;

		}
	 	OLED_ShowChar(x+(size2/2)*t,y,temp+'0',size2, Color_Turn);
	}
}


/**
 * @function: void OLED_Showdecimal(uint8_t x,uint8_t y,float num,uint8_t z_len,uint8_t f_len,uint8_t size2, uint8_t Color_Turn)
 * @description: 显示正负浮点数
 * @param {uint8_t} x待显示的数字起始横坐标,x:0~126
 * @param {uint8_t} y待显示的数字起始纵坐标, y:0~7，若选择字体大小为16，则两行数字之间需要间隔2，若选择字体大小为12，间隔1
 * @param {float} num:输入的浮点型数据
 * @param {uint8_t } z_ len:整数部分的位数
 * @param {uint8_t } f_len: 小数部分的位数
 * @param {uint8_t} size2:输入的数据大小，选择 16/12，16为8X16，12为6x8
 * @param {uint8_t} Color_Turn是否反相显示(1反相、0不反相)
 * @return {*}
 */
void OLED_Showdecimal(uint8_t x,uint8_t y,float num,uint8_t z_len,uint8_t f_len,uint8_t size2, uint8_t Color_Turn)
{
	uint8_t t,temp,i=0;//i为负数标志位
	uint8_t enshow;
	int z_temp,f_temp;
	if(num<0)
	{
		z_len+=1;
		i=1;
		num=-num;
	}
	z_temp=(int)num;
	//整数部分
	for(t=0;t<z_len;t++)
	{
		temp=(z_temp/oled_pow(10,z_len-t-1))%10;
		if(enshow==0 && t<(z_len-1))
		{
			if(temp==0)
			{
				OLED_ShowChar(x+(size2/2)*t,y,' ',size2, Color_Turn);
				continue;
			}
			else
			enshow=1;
		}
		OLED_ShowChar(x+(size2/2)*t,y,temp+'0',size2, Color_Turn);
	}
	//小数点
	OLED_ShowChar(x+(size2/2)*(z_len),y,'.',size2, Color_Turn);

	f_temp=(int)((num-z_temp)*(oled_pow(10,f_len)));
  //小数部分
	for(t=0;t<f_len;t++)
	{
		temp=(f_temp/oled_pow(10,f_len-t-1))%10;
		OLED_ShowChar(x+(size2/2)*(t+z_len)+5,y,temp+'0',size2, Color_Turn);
	}
	if(i==1)//如果为负，就将最前的一位赋值‘-’
	{
		OLED_ShowChar(x,y,'-',size2, Color_Turn);
		i=0;
	}
}



/**
 * @function: void OLED_ShowCHinese(uint8_t x,uint8_t y,uint8_t no, uint8_t Color_Turn)
 * @description: 在OLED特定位置开始显示16X16汉字
 * @param {uint8_t} x待显示的汉字起始横坐标x: 0~112，两列汉字之间需要间隔16
 * @param {uint8_t} y待显示的汉字起始纵坐标 y: 0~6 , 两行汉字之间需要间隔2
 * @param {uint8_t} no待显示的汉字编号
 * @param {uint8_t} Color_Turn是否反相显示(1反相、0不反相)
 * @return {*}
 */
void OLED_ShowCHinese(uint8_t x,uint8_t y,uint8_t no, uint8_t Color_Turn)
{
	uint8_t t=0;
	OLED_Set_Pos(x,y);
    for(t=0;t<16;t++)
		{
				if (Color_Turn)
					OLED_WR_DATA(~Hzk[2*no][t]); //显示汉字的上半部分
				else
					OLED_WR_DATA(Hzk[2*no][t]); //显示汉字的上半部分
        }

		OLED_Set_Pos(x,y+1);
    for(t=0;t<16;t++)
		{
				if (Color_Turn)
					OLED_WR_DATA(~Hzk[2*no+1][t]); //显示汉字的上半部分
				else
					OLED_WR_DATA(Hzk[2*no+1][t]);//显示汉字的上半部分

         }
}

/**
 * @function: void OLED_DrawBMP(uint8_t x0, uint8_t y0, uint8_t x1, uint8_t y1, uint8_t *  BMP,uint8_t Color_Turn)
 * @description: 在OLED特定区域显示BMP图片
 * @param {uint8_t} x0图像开始显示横坐标  x0:0~127
 * @param {uint8_t} y0图像开始显示纵坐标  y0:0~7
 * @param {uint8_t} x1图像结束显示横坐标  x1:1~128
 * @param {uint8_t} y1图像结束显示纵坐标  y1:1~8
 * @param {uint8_t} *BMP待显示的图像数据
 * @param {uint8_t} Color_Turn是否反相显示(1反相、0不反相)
 * @return {*}
 */
void OLED_DrawBMP(uint8_t x0, uint8_t y0, uint8_t x1, uint8_t y1, uint8_t *  BMP,uint8_t Color_Turn)
{
   uint32_t j = 0;
   uint8_t x = 0, y = 0;

  if(y1%8==0)
		y = y1/8;
  else
		y = y1/8 + 1;
	for(y=y0;y<y1;y++)
	{
		OLED_Set_Pos(x0,y);
    for(x=x0;x<x1;x++)
		{
			if (Color_Turn)
				OLED_WR_DATA(~BMP[j++]);//显示反相图片
			else
				OLED_WR_DATA(BMP[j++]);//显示图片

		}
	}
}


/**
 * @function: void OLED_HorizontalShift(uint8_t direction)
 * @description: 屏幕内容水平全屏滚动播放
 * @param {uint8_t} direction			LEFT	   0x27     	RIGHT  0x26
 * @return {*}
 */
void OLED_HorizontalShift(uint8_t direction)

{
	OLED_WR_CMD(0x2e);//停止滚动
	OLED_WR_CMD(direction);//设置滚动方向
	OLED_WR_CMD(0x00);//虚拟字节设置，默认为0x00
	OLED_WR_CMD(0x00);//设置开始页地址
	OLED_WR_CMD(0x07);//设置每个滚动步骤之间的时间间隔的帧频
    //  0x00-5帧， 0x01-64帧， 0x02-128帧， 0x03-256帧， 0x04-3帧， 0x05-4帧， 0x06-25帧， 0x07-2帧，
	OLED_WR_CMD(0x07);//设置结束页地址
	OLED_WR_CMD(0x00);//虚拟字节设置，默认为0x00
	OLED_WR_CMD(0xff);//虚拟字节设置，默认为0xff
	OLED_WR_CMD(0x2f);//开启滚动-0x2f，禁用滚动-0x2e，禁用需要重写数据
}

/**
 * @function: void OLED_Some_HorizontalShift(uint8_t direction,uint8_t start,uint8_t end)
 * @description: 屏幕部分内容水平滚动播放
 * @param {uint8_t} direction			LEFT	   0x27     	RIGHT  0x26
 * @param {uint8_t} start 开始页地址  0x00~0x07
 * @param {uint8_t} end  结束页地址  0x01~0x07
 * @return {*}
 */
void OLED_Some_HorizontalShift(uint8_t direction,uint8_t start,uint8_t end)
{
	OLED_WR_CMD(0x2e);//停止滚动
	OLED_WR_CMD(direction);//设置滚动方向
	OLED_WR_CMD(0x00);//虚拟字节设置，默认为0x00
	OLED_WR_CMD(start);//设置开始页地址
	OLED_WR_CMD(0x07);//设置每个滚动步骤之间的时间间隔的帧频,0x07即滚动速度2帧
	OLED_WR_CMD(end);//设置结束页地址
	OLED_WR_CMD(0x00);//虚拟字节设置，默认为0x00
	OLED_WR_CMD(0xff);//虚拟字节设置，默认为0xff
	OLED_WR_CMD(0x2f);//开启滚动-0x2f，禁用滚动-0x2e，禁用需要重写数据

}

/**
 * @function: void OLED_VerticalAndHorizontalShift(uint8_t direction)
 * @description: 屏幕内容垂直水平全屏滚动播放
 * @param {uint8_t} direction				右上滚动	 0x29
 *                                                            左上滚动   0x2A
 * @return {*}
 */
void OLED_VerticalAndHorizontalShift(uint8_t direction)
{
	OLED_WR_CMD(0x2e);//停止滚动
	OLED_WR_CMD(direction);//设置滚动方向
	OLED_WR_CMD(0x01);//虚拟字节设置
	OLED_WR_CMD(0x00);//设置开始页地址
	OLED_WR_CMD(0x07);//设置每个滚动步骤之间的时间间隔的帧频，即滚动速度
	OLED_WR_CMD(0x07);//设置结束页地址
	OLED_WR_CMD(0x01);//垂直滚动偏移量
	OLED_WR_CMD(0x00);//虚拟字节设置，默认为0x00
	OLED_WR_CMD(0xff);//虚拟字节设置，默认为0xff
	OLED_WR_CMD(0x2f);//开启滚动-0x2f，禁用滚动-0x2e，禁用需要重写数据
}

/**
 * @function: void OLED_DisplayMode(uint8_t mode)
 * @description: 屏幕内容取反显示
 * @param {uint8_t} direction			ON	0xA7  ，
 *                                                          OFF	0xA6	默认此模式，设置像素点亮
 * @return {*}
 */
void OLED_DisplayMode(uint8_t mode)
{
	OLED_WR_CMD(mode);
}

/**
 * @function: void OLED_IntensityControl(uint8_t intensity)
 * @description: 屏幕亮度调节
 * @param  {uint8_t} intensity	0x00~0xFF,RESET=0x7F
 * @return {*}
 */
void OLED_IntensityControl(uint8_t intensity)
{
	OLED_WR_CMD(0x81);
	OLED_WR_CMD(intensity);
}



```

oledfont.h

```
/*
 * oledfont.h
 *
 *  Created on: Mar 19, 2025
 *      Author: 27276
 */

#ifndef SRC_OLED_OLEDFONT_H_
#define SRC_OLED_OLEDFONT_H_

extern const unsigned char F6x8[][6];
extern const unsigned char F8X16[];
extern const unsigned char Hzk[][32];
extern unsigned char BMP1[];
//extern unsigned char BMP2[].........

#endif /* SRC_OLED_OLEDFONT_H_ */

```

oledfont.c

```
/*
 * oledfont.c
 *
 *  Created on: Mar 19, 2025
 *      Author: 27276
 */
/*
 * oledfont.c
 *
 *  Created on: Jul 24, 2022
 *      Author: Unicorn_Li
 */
#include "oledfont.h"

//8*6 ASCII字符集点阵
const unsigned char F6x8[][6] =
{
	{0x00, 0x00, 0x00, 0x00, 0x00, 0x00}, // sp
	{0x00, 0x00, 0x00, 0x2f, 0x00, 0x00}, // !
	{0x00, 0x00, 0x07, 0x00, 0x07, 0x00}, // "
	{0x00, 0x14, 0x7f, 0x14, 0x7f, 0x14}, // #
	{0x00, 0x24, 0x2a, 0x7f, 0x2a, 0x12}, // $
	{0x00, 0x62, 0x64, 0x08, 0x13, 0x23}, // %
	{0x00, 0x36, 0x49, 0x55, 0x22, 0x50}, // &
	{0x00, 0x00, 0x05, 0x03, 0x00, 0x00}, // '
	{0x00, 0x00, 0x1c, 0x22, 0x41, 0x00}, // (
	{0x00, 0x00, 0x41, 0x22, 0x1c, 0x00}, // )
	{0x00, 0x14, 0x08, 0x3E, 0x08, 0x14}, // *
	{0x00, 0x08, 0x08, 0x3E, 0x08, 0x08}, // +
	{0x00, 0x00, 0x00, 0xA0, 0x60, 0x00}, // ,
	{0x00, 0x08, 0x08, 0x08, 0x08, 0x08}, // -
	{0x00, 0x00, 0x60, 0x60, 0x00, 0x00}, // .
	{0x00, 0x20, 0x10, 0x08, 0x04, 0x02}, // /
	{0x00, 0x3E, 0x51, 0x49, 0x45, 0x3E}, // 0
	{0x00, 0x00, 0x42, 0x7F, 0x40, 0x00}, // 1
	{0x00, 0x42, 0x61, 0x51, 0x49, 0x46}, // 2
	{0x00, 0x21, 0x41, 0x45, 0x4B, 0x31}, // 3
	{0x00, 0x18, 0x14, 0x12, 0x7F, 0x10}, // 4
	{0x00, 0x27, 0x45, 0x45, 0x45, 0x39}, // 5
	{0x00, 0x3C, 0x4A, 0x49, 0x49, 0x30}, // 6
	{0x00, 0x01, 0x71, 0x09, 0x05, 0x03}, // 7
	{0x00, 0x36, 0x49, 0x49, 0x49, 0x36}, // 8
	{0x00, 0x06, 0x49, 0x49, 0x29, 0x1E}, // 9
	{0x00, 0x00, 0x36, 0x36, 0x00, 0x00}, // :
	{0x00, 0x00, 0x56, 0x36, 0x00, 0x00}, // ;
	{0x00, 0x08, 0x14, 0x22, 0x41, 0x00}, // <
	{0x00, 0x14, 0x14, 0x14, 0x14, 0x14}, // =
	{0x00, 0x00, 0x41, 0x22, 0x14, 0x08}, // >
	{0x00, 0x02, 0x01, 0x51, 0x09, 0x06}, // ?
	{0x00, 0x32, 0x49, 0x59, 0x51, 0x3E}, // @
	{0x00, 0x7C, 0x12, 0x11, 0x12, 0x7C}, // A
	{0x00, 0x7F, 0x49, 0x49, 0x49, 0x36}, // B
	{0x00, 0x3E, 0x41, 0x41, 0x41, 0x22}, // C
	{0x00, 0x7F, 0x41, 0x41, 0x22, 0x1C}, // D
	{0x00, 0x7F, 0x49, 0x49, 0x49, 0x41}, // E
	{0x00, 0x7F, 0x09, 0x09, 0x09, 0x01}, // F
	{0x00, 0x3E, 0x41, 0x49, 0x49, 0x7A}, // G
	{0x00, 0x7F, 0x08, 0x08, 0x08, 0x7F}, // H
	{0x00, 0x00, 0x41, 0x7F, 0x41, 0x00}, // I
	{0x00, 0x20, 0x40, 0x41, 0x3F, 0x01}, // J
	{0x00, 0x7F, 0x08, 0x14, 0x22, 0x41}, // K
	{0x00, 0x7F, 0x40, 0x40, 0x40, 0x40}, // L
	{0x00, 0x7F, 0x02, 0x0C, 0x02, 0x7F}, // M
	{0x00, 0x7F, 0x04, 0x08, 0x10, 0x7F}, // N
	{0x00, 0x3E, 0x41, 0x41, 0x41, 0x3E}, // O
	{0x00, 0x7F, 0x09, 0x09, 0x09, 0x06}, // P
	{0x00, 0x3E, 0x41, 0x51, 0x21, 0x5E}, // Q
	{0x00, 0x7F, 0x09, 0x19, 0x29, 0x46}, // R
	{0x00, 0x46, 0x49, 0x49, 0x49, 0x31}, // S
	{0x00, 0x01, 0x01, 0x7F, 0x01, 0x01}, // T
	{0x00, 0x3F, 0x40, 0x40, 0x40, 0x3F}, // U
	{0x00, 0x1F, 0x20, 0x40, 0x20, 0x1F}, // V
	{0x00, 0x3F, 0x40, 0x38, 0x40, 0x3F}, // W
	{0x00, 0x63, 0x14, 0x08, 0x14, 0x63}, // X
	{0x00, 0x07, 0x08, 0x70, 0x08, 0x07}, // Y
	{0x00, 0x61, 0x51, 0x49, 0x45, 0x43}, // Z
	{0x00, 0x00, 0x7F, 0x41, 0x41, 0x00}, // [
	{0x00, 0x55, 0x2A, 0x55, 0x2A, 0x55}, // 55
	{0x00, 0x00, 0x41, 0x41, 0x7F, 0x00}, // ]
	{0x00, 0x04, 0x02, 0x01, 0x02, 0x04}, // ^
	{0x00, 0x40, 0x40, 0x40, 0x40, 0x40}, // _
	{0x00, 0x00, 0x01, 0x02, 0x04, 0x00}, // '
	{0x00, 0x20, 0x54, 0x54, 0x54, 0x78}, // a
	{0x00, 0x7F, 0x48, 0x44, 0x44, 0x38}, // b
	{0x00, 0x38, 0x44, 0x44, 0x44, 0x20}, // c
	{0x00, 0x38, 0x44, 0x44, 0x48, 0x7F}, // d
	{0x00, 0x38, 0x54, 0x54, 0x54, 0x18}, // e
	{0x00, 0x08, 0x7E, 0x09, 0x01, 0x02}, // f
	{0x00, 0x18, 0xA4, 0xA4, 0xA4, 0x7C}, // g
	{0x00, 0x7F, 0x08, 0x04, 0x04, 0x78}, // h
	{0x00, 0x00, 0x44, 0x7D, 0x40, 0x00}, // i
	{0x00, 0x40, 0x80, 0x84, 0x7D, 0x00}, // j
	{0x00, 0x7F, 0x10, 0x28, 0x44, 0x00}, // k
	{0x00, 0x00, 0x41, 0x7F, 0x40, 0x00}, // l
	{0x00, 0x7C, 0x04, 0x18, 0x04, 0x78}, // m
	{0x00, 0x7C, 0x08, 0x04, 0x04, 0x78}, // n
	{0x00, 0x38, 0x44, 0x44, 0x44, 0x38}, // o
	{0x00, 0xFC, 0x24, 0x24, 0x24, 0x18}, // p
	{0x00, 0x18, 0x24, 0x24, 0x18, 0xFC}, // q
	{0x00, 0x7C, 0x08, 0x04, 0x04, 0x08}, // r
	{0x00, 0x48, 0x54, 0x54, 0x54, 0x20}, // s
	{0x00, 0x04, 0x3F, 0x44, 0x40, 0x20}, // t
	{0x00, 0x3C, 0x40, 0x40, 0x20, 0x7C}, // u
	{0x00, 0x1C, 0x20, 0x40, 0x20, 0x1C}, // v
	{0x00, 0x3C, 0x40, 0x30, 0x40, 0x3C}, // w
	{0x00, 0x44, 0x28, 0x10, 0x28, 0x44}, // x
	{0x00, 0x1C, 0xA0, 0xA0, 0xA0, 0x7C}, // y
	{0x00, 0x44, 0x64, 0x54, 0x4C, 0x44}, // z
	{0x14, 0x14, 0x14, 0x14, 0x14, 0x14}  // horiz lines
};

//const unsigned char F6x8[][6] =
//{
//	0x00, 0x00, 0x00, 0x00, 0x00, 0x00,// sp
//	0x00, 0x00, 0x00, 0x2f, 0x00, 0x00,// !
//	0x00, 0x00, 0x07, 0x00, 0x07, 0x00,// "
//	0x00, 0x14, 0x7f, 0x14, 0x7f, 0x14,// #
//	0x00, 0x24, 0x2a, 0x7f, 0x2a, 0x12,// $
//	0x00, 0x62, 0x64, 0x08, 0x13, 0x23,// %
//	0x00, 0x36, 0x49, 0x55, 0x22, 0x50,// &
//	0x00, 0x00, 0x05, 0x03, 0x00, 0x00,// '
//	0x00, 0x00, 0x1c, 0x22, 0x41, 0x00,// (
//	0x00, 0x00, 0x41, 0x22, 0x1c, 0x00,// )
//	0x00, 0x14, 0x08, 0x3E, 0x08, 0x14,// *
//	0x00, 0x08, 0x08, 0x3E, 0x08, 0x08,// +
//	0x00, 0x00, 0x00, 0xA0, 0x60, 0x00,// ,
//	0x00, 0x08, 0x08, 0x08, 0x08, 0x08,// -
//	0x00, 0x00, 0x60, 0x60, 0x00, 0x00,// .
//	0x00, 0x20, 0x10, 0x08, 0x04, 0x02,// /
//	0x00, 0x3E, 0x51, 0x49, 0x45, 0x3E,// 0
//	0x00, 0x00, 0x42, 0x7F, 0x40, 0x00,// 1
//	0x00, 0x42, 0x61, 0x51, 0x49, 0x46,// 2
//	0x00, 0x21, 0x41, 0x45, 0x4B, 0x31,// 3
//	0x00, 0x18, 0x14, 0x12, 0x7F, 0x10,// 4
//	0x00, 0x27, 0x45, 0x45, 0x45, 0x39,// 5
//	0x00, 0x3C, 0x4A, 0x49, 0x49, 0x30,// 6
//	0x00, 0x01, 0x71, 0x09, 0x05, 0x03,// 7
//	0x00, 0x36, 0x49, 0x49, 0x49, 0x36,// 8
//	0x00, 0x06, 0x49, 0x49, 0x29, 0x1E,// 9
//	0x00, 0x00, 0x36, 0x36, 0x00, 0x00,// :
//	0x00, 0x00, 0x56, 0x36, 0x00, 0x00,// ;
//	0x00, 0x08, 0x14, 0x22, 0x41, 0x00,// <
//	0x00, 0x14, 0x14, 0x14, 0x14, 0x14,// =
//	0x00, 0x00, 0x41, 0x22, 0x14, 0x08,// >
//	0x00, 0x02, 0x01, 0x51, 0x09, 0x06,// ?
//	0x00, 0x32, 0x49, 0x59, 0x51, 0x3E,// @
//	0x00, 0x7C, 0x12, 0x11, 0x12, 0x7C,// A
//	0x00, 0x7F, 0x49, 0x49, 0x49, 0x36,// B
//	0x00, 0x3E, 0x41, 0x41, 0x41, 0x22,// C
//	0x00, 0x7F, 0x41, 0x41, 0x22, 0x1C,// D
//	0x00, 0x7F, 0x49, 0x49, 0x49, 0x41,// E
//	0x00, 0x7F, 0x09, 0x09, 0x09, 0x01,// F
//	0x00, 0x3E, 0x41, 0x49, 0x49, 0x7A,// G
//	0x00, 0x7F, 0x08, 0x08, 0x08, 0x7F,// H
//	0x00, 0x00, 0x41, 0x7F, 0x41, 0x00,// I
//	0x00, 0x20, 0x40, 0x41, 0x3F, 0x01,// J
//	0x00, 0x7F, 0x08, 0x14, 0x22, 0x41,// K
//	0x00, 0x7F, 0x40, 0x40, 0x40, 0x40,// L
//	0x00, 0x7F, 0x02, 0x0C, 0x02, 0x7F,// M
//	0x00, 0x7F, 0x04, 0x08, 0x10, 0x7F,// N
//	0x00, 0x3E, 0x41, 0x41, 0x41, 0x3E,// O
//	0x00, 0x7F, 0x09, 0x09, 0x09, 0x06,// P
//	0x00, 0x3E, 0x41, 0x51, 0x21, 0x5E,// Q
//	0x00, 0x7F, 0x09, 0x19, 0x29, 0x46,// R
//	0x00, 0x46, 0x49, 0x49, 0x49, 0x31,// S
//	0x00, 0x01, 0x01, 0x7F, 0x01, 0x01,// T
//	0x00, 0x3F, 0x40, 0x40, 0x40, 0x3F,// U
//	0x00, 0x1F, 0x20, 0x40, 0x20, 0x1F,// V
//	0x00, 0x3F, 0x40, 0x38, 0x40, 0x3F,// W
//	0x00, 0x63, 0x14, 0x08, 0x14, 0x63,// X
//	0x00, 0x07, 0x08, 0x70, 0x08, 0x07,// Y
//	0x00, 0x61, 0x51, 0x49, 0x45, 0x43,// Z
//	0x00, 0x00, 0x7F, 0x41, 0x41, 0x00,// [
//	0x00, 0x55, 0x2A, 0x55, 0x2A, 0x55,// 55
//	0x00, 0x00, 0x41, 0x41, 0x7F, 0x00,// ]
//	0x00, 0x04, 0x02, 0x01, 0x02, 0x04,// ^
//	0x00, 0x40, 0x40, 0x40, 0x40, 0x40,// _
//	0x00, 0x00, 0x01, 0x02, 0x04, 0x00,// '
//	0x00, 0x20, 0x54, 0x54, 0x54, 0x78,// a
//	0x00, 0x7F, 0x48, 0x44, 0x44, 0x38,// b
//	0x00, 0x38, 0x44, 0x44, 0x44, 0x20,// c
//	0x00, 0x38, 0x44, 0x44, 0x48, 0x7F,// d
//	0x00, 0x38, 0x54, 0x54, 0x54, 0x18,// e
//	0x00, 0x08, 0x7E, 0x09, 0x01, 0x02,// f
//	0x00, 0x18, 0xA4, 0xA4, 0xA4, 0x7C,// g
//	0x00, 0x7F, 0x08, 0x04, 0x04, 0x78,// h
//	0x00, 0x00, 0x44, 0x7D, 0x40, 0x00,// i
//	0x00, 0x40, 0x80, 0x84, 0x7D, 0x00,// j
//	0x00, 0x7F, 0x10, 0x28, 0x44, 0x00,// k
//	0x00, 0x00, 0x41, 0x7F, 0x40, 0x00,// l
//	0x00, 0x7C, 0x04, 0x18, 0x04, 0x78,// m
//	0x00, 0x7C, 0x08, 0x04, 0x04, 0x78,// n
//	0x00, 0x38, 0x44, 0x44, 0x44, 0x38,// o
//	0x00, 0xFC, 0x24, 0x24, 0x24, 0x18,// p
//	0x00, 0x18, 0x24, 0x24, 0x18, 0xFC,// q
//	0x00, 0x7C, 0x08, 0x04, 0x04, 0x08,// r
//	0x00, 0x48, 0x54, 0x54, 0x54, 0x20,// s
//	0x00, 0x04, 0x3F, 0x44, 0x40, 0x20,// t
//	0x00, 0x3C, 0x40, 0x40, 0x20, 0x7C,// u
//	0x00, 0x1C, 0x20, 0x40, 0x20, 0x1C,// v
//	0x00, 0x3C, 0x40, 0x30, 0x40, 0x3C,// w
//	0x00, 0x44, 0x28, 0x10, 0x28, 0x44,// x
//	0x00, 0x1C, 0xA0, 0xA0, 0xA0, 0x7C,// y
//	0x00, 0x44, 0x64, 0x54, 0x4C, 0x44,// z
//	0x14, 0x14, 0x14, 0x14, 0x14, 0x14,// horiz lines
//};

//16*8 ASCII字符集点阵
const unsigned char F8X16[]=
{
 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//sp /0
 0x00,0x00,0x00,0xF8,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x33,0x30,0x00,0x00,0x00,//!  /1
 0x00,0x10,0x0C,0x06,0x10,0x0C,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//"  /2
 0x40,0xC0,0x78,0x40,0xC0,0x78,0x40,0x00,0x04,0x3F,0x04,0x04,0x3F,0x04,0x04,0x00,//#  /3
 0x00,0x70,0x88,0xFC,0x08,0x30,0x00,0x00,0x00,0x18,0x20,0xFF,0x21,0x1E,0x00,0x00,//$  /4
 0xF0,0x08,0xF0,0x00,0xE0,0x18,0x00,0x00,0x00,0x21,0x1C,0x03,0x1E,0x21,0x1E,0x00,//%  /5
 0x00,0xF0,0x08,0x88,0x70,0x00,0x00,0x00,0x1E,0x21,0x23,0x24,0x19,0x27,0x21,0x10,//&  /6
 0x10,0x16,0x0E,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//'  /7
 0x00,0x00,0x00,0xE0,0x18,0x04,0x02,0x00,0x00,0x00,0x00,0x07,0x18,0x20,0x40,0x00,//(  /8
 0x00,0x02,0x04,0x18,0xE0,0x00,0x00,0x00,0x00,0x40,0x20,0x18,0x07,0x00,0x00,0x00,//)  /9
 0x40,0x40,0x80,0xF0,0x80,0x40,0x40,0x00,0x02,0x02,0x01,0x0F,0x01,0x02,0x02,0x00,//*  /10
 0x00,0x00,0x00,0xF0,0x00,0x00,0x00,0x00,0x01,0x01,0x01,0x1F,0x01,0x01,0x01,0x00,//+  /11
 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x80,0xB0,0x70,0x00,0x00,0x00,0x00,0x00,//,  /12
 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x01,0x01,0x01,0x01,0x01,0x01,//-  /13
 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x30,0x30,0x00,0x00,0x00,0x00,0x00,//.  /14
 0x00,0x00,0x00,0x00,0x80,0x60,0x18,0x04,0x00,0x60,0x18,0x06,0x01,0x00,0x00,0x00,///  /15
 0x00,0xE0,0x10,0x08,0x08,0x10,0xE0,0x00,0x00,0x0F,0x10,0x20,0x20,0x10,0x0F,0x00,//0  /16
 0x00,0x10,0x10,0xF8,0x00,0x00,0x00,0x00,0x00,0x20,0x20,0x3F,0x20,0x20,0x00,0x00,//1  /17
 0x00,0x70,0x08,0x08,0x08,0x88,0x70,0x00,0x00,0x30,0x28,0x24,0x22,0x21,0x30,0x00,//2  /18
 0x00,0x30,0x08,0x88,0x88,0x48,0x30,0x00,0x00,0x18,0x20,0x20,0x20,0x11,0x0E,0x00,//3  /19
 0x00,0x00,0xC0,0x20,0x10,0xF8,0x00,0x00,0x00,0x07,0x04,0x24,0x24,0x3F,0x24,0x00,//4  /20
 0x00,0xF8,0x08,0x88,0x88,0x08,0x08,0x00,0x00,0x19,0x21,0x20,0x20,0x11,0x0E,0x00,//5  /21
 0x00,0xE0,0x10,0x88,0x88,0x18,0x00,0x00,0x00,0x0F,0x11,0x20,0x20,0x11,0x0E,0x00,//6  /22
 0x00,0x38,0x08,0x08,0xC8,0x38,0x08,0x00,0x00,0x00,0x00,0x3F,0x00,0x00,0x00,0x00,//7  /23
 0x00,0x70,0x88,0x08,0x08,0x88,0x70,0x00,0x00,0x1C,0x22,0x21,0x21,0x22,0x1C,0x00,//8  /24
 0x00,0xE0,0x10,0x08,0x08,0x10,0xE0,0x00,0x00,0x00,0x31,0x22,0x22,0x11,0x0F,0x00,//9  /25
 0x00,0x00,0x00,0xC0,0xC0,0x00,0x00,0x00,0x00,0x00,0x00,0x30,0x30,0x00,0x00,0x00,//:  /26
 0x00,0x00,0x00,0x80,0x00,0x00,0x00,0x00,0x00,0x00,0x80,0x60,0x00,0x00,0x00,0x00,//;  /27
 0x00,0x00,0x80,0x40,0x20,0x10,0x08,0x00,0x00,0x01,0x02,0x04,0x08,0x10,0x20,0x00,//<  /28
 0x40,0x40,0x40,0x40,0x40,0x40,0x40,0x00,0x04,0x04,0x04,0x04,0x04,0x04,0x04,0x00,//=  /29
 0x00,0x08,0x10,0x20,0x40,0x80,0x00,0x00,0x00,0x20,0x10,0x08,0x04,0x02,0x01,0x00,//>  /30
 0x00,0x70,0x48,0x08,0x08,0x08,0xF0,0x00,0x00,0x00,0x00,0x30,0x36,0x01,0x00,0x00,//?  /31
 0xC0,0x30,0xC8,0x28,0xE8,0x10,0xE0,0x00,0x07,0x18,0x27,0x24,0x23,0x14,0x0B,0x00,//@  /32
 0x00,0x00,0xC0,0x38,0xE0,0x00,0x00,0x00,0x20,0x3C,0x23,0x02,0x02,0x27,0x38,0x20,//A  /33
 0x08,0xF8,0x88,0x88,0x88,0x70,0x00,0x00,0x20,0x3F,0x20,0x20,0x20,0x11,0x0E,0x00,//B  /34
 0xC0,0x30,0x08,0x08,0x08,0x08,0x38,0x00,0x07,0x18,0x20,0x20,0x20,0x10,0x08,0x00,//C  /35
 0x08,0xF8,0x08,0x08,0x08,0x10,0xE0,0x00,0x20,0x3F,0x20,0x20,0x20,0x10,0x0F,0x00,//D  /36
 0x08,0xF8,0x88,0x88,0xE8,0x08,0x10,0x00,0x20,0x3F,0x20,0x20,0x23,0x20,0x18,0x00,//E  /37
 0x08,0xF8,0x88,0x88,0xE8,0x08,0x10,0x00,0x20,0x3F,0x20,0x00,0x03,0x00,0x00,0x00,//F  /38
 0xC0,0x30,0x08,0x08,0x08,0x38,0x00,0x00,0x07,0x18,0x20,0x20,0x22,0x1E,0x02,0x00,//G  /39
 0x08,0xF8,0x08,0x00,0x00,0x08,0xF8,0x08,0x20,0x3F,0x21,0x01,0x01,0x21,0x3F,0x20,//H  /40
 0x00,0x08,0x08,0xF8,0x08,0x08,0x00,0x00,0x00,0x20,0x20,0x3F,0x20,0x20,0x00,0x00,//I  /41
 0x00,0x00,0x08,0x08,0xF8,0x08,0x08,0x00,0xC0,0x80,0x80,0x80,0x7F,0x00,0x00,0x00,//J  /42
 0x08,0xF8,0x88,0xC0,0x28,0x18,0x08,0x00,0x20,0x3F,0x20,0x01,0x26,0x38,0x20,0x00,//K  /43
 0x08,0xF8,0x08,0x00,0x00,0x00,0x00,0x00,0x20,0x3F,0x20,0x20,0x20,0x20,0x30,0x00,//L  /44
 0x08,0xF8,0xF8,0x00,0xF8,0xF8,0x08,0x00,0x20,0x3F,0x00,0x3F,0x00,0x3F,0x20,0x00,//M  /45
 0x08,0xF8,0x30,0xC0,0x00,0x08,0xF8,0x08,0x20,0x3F,0x20,0x00,0x07,0x18,0x3F,0x00,//N  /46
 0xE0,0x10,0x08,0x08,0x08,0x10,0xE0,0x00,0x0F,0x10,0x20,0x20,0x20,0x10,0x0F,0x00,//O  /47
 0x08,0xF8,0x08,0x08,0x08,0x08,0xF0,0x00,0x20,0x3F,0x21,0x01,0x01,0x01,0x00,0x00,//P  /48
 0xE0,0x10,0x08,0x08,0x08,0x10,0xE0,0x00,0x0F,0x18,0x24,0x24,0x38,0x50,0x4F,0x00,//Q  /49
 0x08,0xF8,0x88,0x88,0x88,0x88,0x70,0x00,0x20,0x3F,0x20,0x00,0x03,0x0C,0x30,0x20,//R  /50
 0x00,0x70,0x88,0x08,0x08,0x08,0x38,0x00,0x00,0x38,0x20,0x21,0x21,0x22,0x1C,0x00,//S  /51
 0x18,0x08,0x08,0xF8,0x08,0x08,0x18,0x00,0x00,0x00,0x20,0x3F,0x20,0x00,0x00,0x00,//T  /52
 0x08,0xF8,0x08,0x00,0x00,0x08,0xF8,0x08,0x00,0x1F,0x20,0x20,0x20,0x20,0x1F,0x00,//U  /53
 0x08,0x78,0x88,0x00,0x00,0xC8,0x38,0x08,0x00,0x00,0x07,0x38,0x0E,0x01,0x00,0x00,//V  /54
 0xF8,0x08,0x00,0xF8,0x00,0x08,0xF8,0x00,0x03,0x3C,0x07,0x00,0x07,0x3C,0x03,0x00,//W  /55
 0x08,0x18,0x68,0x80,0x80,0x68,0x18,0x08,0x20,0x30,0x2C,0x03,0x03,0x2C,0x30,0x20,//X  /56
 0x08,0x38,0xC8,0x00,0xC8,0x38,0x08,0x00,0x00,0x00,0x20,0x3F,0x20,0x00,0x00,0x00,//Y  /57
 0x10,0x08,0x08,0x08,0xC8,0x38,0x08,0x00,0x20,0x38,0x26,0x21,0x20,0x20,0x18,0x00,//Z  /58
 0x00,0x00,0x00,0xFE,0x02,0x02,0x02,0x00,0x00,0x00,0x00,0x7F,0x40,0x40,0x40,0x00,//[  /59
 0x00,0x0C,0x30,0xC0,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x06,0x38,0xC0,0x00,//\  /60
 0x00,0x02,0x02,0x02,0xFE,0x00,0x00,0x00,0x00,0x40,0x40,0x40,0x7F,0x00,0x00,0x00,//]  /61
 0x00,0x00,0x04,0x02,0x02,0x02,0x04,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//^  /62
 0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x80,0x80,0x80,0x80,0x80,0x80,0x80,0x80,//_  /63
 0x00,0x02,0x02,0x04,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//`  /64
 0x00,0x00,0x80,0x80,0x80,0x80,0x00,0x00,0x00,0x19,0x24,0x22,0x22,0x22,0x3F,0x20,//a  /65
 0x08,0xF8,0x00,0x80,0x80,0x00,0x00,0x00,0x00,0x3F,0x11,0x20,0x20,0x11,0x0E,0x00,//b  /66
 0x00,0x00,0x00,0x80,0x80,0x80,0x00,0x00,0x00,0x0E,0x11,0x20,0x20,0x20,0x11,0x00,//c  /67
 0x00,0x00,0x00,0x80,0x80,0x88,0xF8,0x00,0x00,0x0E,0x11,0x20,0x20,0x10,0x3F,0x20,//d  /68
 0x00,0x00,0x80,0x80,0x80,0x80,0x00,0x00,0x00,0x1F,0x22,0x22,0x22,0x22,0x13,0x00,//e  /69
 0x00,0x80,0x80,0xF0,0x88,0x88,0x88,0x18,0x00,0x20,0x20,0x3F,0x20,0x20,0x00,0x00,//f  /70
 0x00,0x00,0x80,0x80,0x80,0x80,0x80,0x00,0x00,0x6B,0x94,0x94,0x94,0x93,0x60,0x00,//g  /71
 0x08,0xF8,0x00,0x80,0x80,0x80,0x00,0x00,0x20,0x3F,0x21,0x00,0x00,0x20,0x3F,0x20,//h  /72
 0x00,0x80,0x98,0x98,0x00,0x00,0x00,0x00,0x00,0x20,0x20,0x3F,0x20,0x20,0x00,0x00,//i  /73
 0x00,0x00,0x00,0x80,0x98,0x98,0x00,0x00,0x00,0xC0,0x80,0x80,0x80,0x7F,0x00,0x00,//j  /74
 0x08,0xF8,0x00,0x00,0x80,0x80,0x80,0x00,0x20,0x3F,0x24,0x02,0x2D,0x30,0x20,0x00,//k  /75
 0x00,0x08,0x08,0xF8,0x00,0x00,0x00,0x00,0x00,0x20,0x20,0x3F,0x20,0x20,0x00,0x00,//l  /76
 0x80,0x80,0x80,0x80,0x80,0x80,0x80,0x00,0x20,0x3F,0x20,0x00,0x3F,0x20,0x00,0x3F,//m  /77
 0x80,0x80,0x00,0x80,0x80,0x80,0x00,0x00,0x20,0x3F,0x21,0x00,0x00,0x20,0x3F,0x20,//n  /78
 0x00,0x00,0x80,0x80,0x80,0x80,0x00,0x00,0x00,0x1F,0x20,0x20,0x20,0x20,0x1F,0x00,//o  /79
 0x80,0x80,0x00,0x80,0x80,0x00,0x00,0x00,0x80,0xFF,0xA1,0x20,0x20,0x11,0x0E,0x00,//p  /80
 0x00,0x00,0x00,0x80,0x80,0x80,0x80,0x00,0x00,0x0E,0x11,0x20,0x20,0xA0,0xFF,0x80,//q  /81
 0x80,0x80,0x80,0x00,0x80,0x80,0x80,0x00,0x20,0x20,0x3F,0x21,0x20,0x00,0x01,0x00,//r  /82
 0x00,0x00,0x80,0x80,0x80,0x80,0x80,0x00,0x00,0x33,0x24,0x24,0x24,0x24,0x19,0x00,//s  /83
 0x00,0x80,0x80,0xE0,0x80,0x80,0x00,0x00,0x00,0x00,0x00,0x1F,0x20,0x20,0x00,0x00,//t  /84
 0x80,0x80,0x00,0x00,0x00,0x80,0x80,0x00,0x00,0x1F,0x20,0x20,0x20,0x10,0x3F,0x20,//u  /85
 0x80,0x80,0x80,0x00,0x00,0x80,0x80,0x80,0x00,0x01,0x0E,0x30,0x08,0x06,0x01,0x00,//v  /86
 0x80,0x80,0x00,0x80,0x00,0x80,0x80,0x80,0x0F,0x30,0x0C,0x03,0x0C,0x30,0x0F,0x00,//w  /87
 0x00,0x80,0x80,0x00,0x80,0x80,0x80,0x00,0x00,0x20,0x31,0x2E,0x0E,0x31,0x20,0x00,//x  /88
 0x80,0x80,0x80,0x00,0x00,0x80,0x80,0x80,0x80,0x81,0x8E,0x70,0x18,0x06,0x01,0x00,//y  /89
 0x00,0x80,0x80,0x80,0x80,0x80,0x80,0x00,0x00,0x21,0x30,0x2C,0x22,0x21,0x30,0x00,//z  /90
 0x00,0x00,0x00,0x00,0x80,0x7C,0x02,0x02,0x00,0x00,0x00,0x00,0x00,0x3F,0x40,0x40,//{  /91
 0x00,0x02,0x02,0x7C,0x80,0x00,0x00,0x00,0x00,0x40,0x40,0x3F,0x00,0x00,0x00,0x00,//}  /92
 0x00,0x00,0x00,0x00,0xFF,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xFF,0x00,0x00,0x00};//|  /93

//部分汉字 阴码，列行式，逆向
const unsigned char Hzk[][32]=
{
		{0x40,0x22,0x14,0x08,0xF4,0x02,0x00,0xF8,0x08,0x08,0xFF,0x08,0x08,0xF8,0x00,0x00},
		{0x08,0x44,0x82,0x41,0x3F,0x00,0x20,0x63,0x21,0x21,0x3F,0x21,0x29,0x33,0x60,0x00},/*"独",0*/
		{0x20,0x10,0xE8,0x24,0x27,0x24,0x24,0xE4,0x24,0x34,0x2C,0x20,0xE0,0x00,0x00,0x00},
		{0x80,0x60,0x1F,0x09,0x09,0x09,0x09,0x7F,0x09,0x09,0x49,0x89,0x7F,0x00,0x00,0x00},/*"角",1*/
		{0x00,0x00,0x7C,0x54,0x55,0x56,0x54,0x7C,0x54,0x56,0x55,0x54,0x7C,0x00,0x00,0x00},
		{0x01,0x01,0x01,0xFD,0x45,0x45,0x45,0x45,0x45,0x45,0x45,0xFD,0x01,0x01,0x01,0x00},/*"兽",2*/



};
//128*64图片
unsigned char BMP1[]={
		0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x80,0x80,0x00,0x40,0xE0,0xE0,0x60,
		0x00,0x40,0x80,0x00,0x00,0x00,0x80,0x80,0x60,0x60,0x10,0x00,0x00,0x00,0x00,0x00,
		0x00,0x00,0x00,0x00,0x00,0x90,0xB2,0x66,0x6E,0xEC,0xC9,0x83,0x02,0x00,0x40,0x80,
		0x00,0x0C,0x0C,0x01,0x03,0x07,0x0F,0x11,0x20,0x40,0x80,0x00,0x00,0x00,0x00,0x00,
		0x00,0x00,0x00,0x00,0x08,0x18,0x3B,0x37,0x66,0xEE,0xEE,0xCC,0x88,0x80,0x00,0x00,
		0x01,0x02,0x04,0x08,0x10,0x10,0x10,0x10,0x10,0x10,0x0F,0x00,0x00,0x00,0x00,0x00,
		0x00,0x3E,0x40,0x40,0x40,0x3E,0x00,0x7E,0x04,0x08,0x10,0x7E,0x00,0x7E,0x00,0x3C,
		0x42,0x42,0x42,0x42,0x00,0x7E,0x42,0x42,0x42,0x7E,0x00,0x7E,0x04,0x08,0x10,0x7E,/*"C:\Users\HP\Desktop\UNICORN.BMP",0*/


};




```



## EEPROM

### AT24C16

AT24c16 一共16Kbit，也就是2K Byte；每页大小16byte，一共128页。

参考：[AT24C16-STM32-HAL库函数读写_stm32 读写at24c16a-CSDN博客](https://blog.csdn.net/gu2188/article/details/136572334?ops_request_misc=&request_id=&biz_id=102&utm_term= HAL库AT24C16代码&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-136572334.142^v102^pc_search_result_base3&spm=1018.2226.3001.4187)

头文件 at24c16.h

```
#ifndef _AT24C16_H_
#define _AT24C16_H_
 
#include "main.h"
 
#define AT24C16_DEVICE_ADDRESS 0xA0 // AT24C16的IIC地址
 
uint16_t AT24C16_ADDRESS_2(uint16_t page, uint16_t bit);
 
HAL_StatusTypeDef AT24C16_Write(uint16_t address, uint8_t *data, uint16_t size);
 
HAL_StatusTypeDef AT24C16_Read(uint16_t address, uint8_t *rx_buffer, uint16_t size);
 
HAL_StatusTypeDef AT24C16_Write_String(uint16_t address, uint8_t *data);
 
HAL_StatusTypeDef AT24C16_Read_String(uint16_t address, uint8_t *data, uint16_t size);
 
#endif
```

at24c16.c

```
#include "main.h"
#include "i2c.h"
#include "gpio.h"
#include "at24c16.h"
#include "stddef.h"
/*
 *	地址转换，将十进制地址转换成二进制地址
 *	@page:页数
 *  @bit:字节位
 */
uint16_t AT24C16_ADDRESS_2(uint16_t page, uint16_t bit)
{
	return ((page << 4) | bit);
}
/*
 *	写函数
 *	@address:二进制地址
 * 	@data:数据地址
 *  @size:数量
 */
HAL_StatusTypeDef AT24C16_Write(uint16_t address, uint8_t *data, uint16_t size)
{
	HAL_StatusTypeDef state = HAL_OK;
	uint8_t add = ((address >> 7) & 0x000e);
	add = AT24C16_DEVICE_ADDRESS | add;
	state = HAL_I2C_Mem_Write(&hi2c1, add, (uint8_t)address, I2C_MEMADD_SIZE_8BIT, data, size, 100);
	return state;
}
/*
 *	读函数
 *	@address:二进制地址
 * 	@data:数据地址
 *  @size:数量
 */
HAL_StatusTypeDef AT24C16_Read(uint16_t address, uint8_t *rx_buffer, uint16_t size)
{
	HAL_StatusTypeDef state = HAL_OK;
	uint8_t add = ((address >> 7) & 0x000e);
	add = AT24C16_DEVICE_ADDRESS | add;
	state = HAL_I2C_Mem_Read(&hi2c1, add, (uint8_t)address, I2C_MEMADD_SIZE_8BIT, rx_buffer, size, 100);
	return state;
}
/*
 *	连续写函数,没有实现任意字节
 *	@address:地址（简单实现连续页）
 *	@data:数据地址
 */
HAL_StatusTypeDef AT24C16_Write_String(uint16_t address, uint8_t *data)
{
	HAL_StatusTypeDef state = HAL_OK;
	uint16_t i = sizeof(data) / 16;
	(sizeof(data) % 16 != 0) ? i++ : 0;
	uint16_t j = address >> 4;
	for (int k = 0; k < i; k++)
	{
		state = AT24C16_Write(AT24C16_ADDRESS_2(j + k, 0), (uint8_t *)&data[i * 16], 16);
	}
	return state;
}
 
/*
 *	连续读函数,没有实现任意字节
 *	@address:地址（简单实现连续页）
 *	@data:数据地址
 *  @size:数量
 */
HAL_StatusTypeDef AT24C16_Read_String(uint16_t address, uint8_t *data, uint16_t size)
{
	HAL_StatusTypeDef state = HAL_OK;
	uint16_t i = size / 16;
	(size % 16 != 0) ? i++ : 0;
	uint16_t j = address >> 4;
	for (int k = 0; k < i; k++)
	{
		state = AT24C16_Read(AT24C16_ADDRESS_2(j + k, 0), (uint8_t *)&data[i * 16], 16);
	}
	return state;
}
```

使用

<img src="./stm32f407zgt6_localdata/image-20250319234001106_1.png" alt="image-20250319234001106" style="zoom:50%;" /> 

使用AT24C16_Write、AT24C16_Read

```
  char message[100] = "@nihao=1.2345$111\n";
  char eeprom_readmessage[100]="";
  /* USER CODE END 2 */
  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
	  HAL_ADC_Start(&hadc1);
	  HAL_ADC_PollForConversion(&hadc1, 20);
	  value=HAL_ADC_GetValue(&hadc1);
	  voltage=(value/65536.0)*3.3;
	  sprintf(message,"voltage=%.4f",voltage);
	  HAL_UART_Transmit(&huart8, (uint8_t*)message, strlen(message),100);
	  OLED_ShowString(0, 1,message , strlen(message), 0);
	  //将message的内容写入eeprom
	  AT24C16_Write(AT24C16_ADDRESS_2(1, 0), (uint8_t*)message,strlen(message));
	  HAL_Delay(100);
	  //将message从eeprom读出并显示
	  AT24C16_Read(AT24C16_ADDRESS_2(1, 0), (uint8_t*)eeprom_readmessage,strlen(message));
	  HAL_Delay(100);
	  OLED_ShowString(0, 2,eeprom_readmessage , strlen(eeprom_readmessage), 0);
	  HAL_Delay(100);
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
```

<img src="./stm32f407zgt6_localdata/image-20250319235736910_1.png" alt="image-20250319235736910" style="zoom: 67%;" />

## microSD

参考：[正点原子STM32(基于HAL库5) —— SRAM、SD卡、FATFS-CSDN博客](https://blog.csdn.net/zhuguanlin121/article/details/131146261?ops_request_misc=%7B%22request%5Fid%22%3A%2227246d8d55258df3b6b5727c2419e101%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=27246d8d55258df3b6b5727c2419e101&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-131146261-null-null.142^v102^pc_search_result_base3&utm_term=stm32hal库sd卡&spm=1018.2226.3001.4187)

主要参考：【STM32+FATFS读写TF卡（SDIO方式）】https://www.bilibili.com/video/BV1EC4y1c73j?vd_source=b7ec3648f866bae76c4b07907d1dae5e



参考：[1.30 Cubemx_STM32H743 SD_Card纳入文件管理系统_stm32h743 sd卡-CSDN博客](https://blog.csdn.net/oDuanYanGuHong/article/details/120891487?ops_request_misc=%7B%22request%5Fid%22%3A%22655ee35107ff02d9efb97820598c5592%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=655ee35107ff02d9efb97820598c5592&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-120891487-null-null.142^v102^pc_search_result_base3&utm_term=stm32h743cubemx配置sd卡&spm=1018.2226.3001.4187)

### 基本配置

<img src="./stm32f407zgt6_localdata/image-20250323232358918_1.png" alt="image-20250323232358918" style="zoom: 67%;" />

![image-20250323232423500](./stm32f407zgt6_localdata/image-20250323232423500_1.png)

- FATFS配置

<img src="./stm32f407zgt6_localdata/image-20250323232531638_1.png" alt="image-20250323232531638" style="zoom: 50%;" />

设置一个引脚作为SD卡的插入信号，默认拉低（输入模式）

<img src="./stm32f407zgt6_localdata/image-20250323232715654_1.png" alt="image-20250323232715654" style="zoom:67%;" />

<img src="./stm32f407zgt6_localdata/image-20250323232628793_1.png" alt="image-20250323232628793" style="zoom:67%;" />

- sdmmc.c的初始化配置添加代码

<img src="./stm32f407zgt6_localdata/image-20250323233134996_1.png" alt="image-20250323233134996" style="zoom:67%;" />

```
void MX_SDMMC1_SD_Init(void)
{

  /* USER CODE BEGIN SDMMC1_Init 0 */

  /* USER CODE END SDMMC1_Init 0 */

  /* USER CODE BEGIN SDMMC1_Init 1 */

  /* USER CODE END SDMMC1_Init 1 */
  hsd1.Instance = SDMMC1;
  hsd1.Init.ClockEdge = SDMMC_CLOCK_EDGE_RISING;
  hsd1.Init.ClockPowerSave = SDMMC_CLOCK_POWER_SAVE_DISABLE;
  hsd1.Init.BusWide = SDMMC_BUS_WIDE_4B;
  hsd1.Init.HardwareFlowControl = SDMMC_HARDWARE_FLOW_CONTROL_DISABLE;
  hsd1.Init.ClockDiv = 4;
  /* USER CODE BEGIN SDMMC1_Init 2 */
//  hsd1.Init.BusWide=SDMMC_BUS_WIDE_1B;
  if(HAL_SD_Init(&hsd1) !=HAL_OK){
	  Error_Handler();
  }
  if(HAL_SD_ConfigWideBusOperation(&hsd1, SDMMC_BUS_WIDE_4B)!=HAL_OK){
	  Error_Handler();
  }
  /* USER CODE END SDMMC1_Init 2 */

}
```

### 往SD中写入

```
  //SD挂载，在外部 SD 卡挂载文件系统，文件系统挂载时会对 SD 卡初始化
  f_res = f_mount(&fs, "0:", 1);
  //SD格式化挂载测试
  if(f_res == FR_NO_FILESYSTEM)//如果没有文件系统就格式化创建创建文件系统
  {
	  /* 格式化 */
	  f_res = f_mkfs("0:", FM_FAT, 0,make_buffer,sizeof(make_buffer));
//	  __NOP();
	  if(f_res == FR_OK)
	  { //成功创建文件系统
		  /* 格式化后，先取消挂载 */
		  f_res = f_mount(NULL, "0:", 1);
		  /* 重新挂载 */
		  f_res = f_mount(&fs, "0:", 1);
	  }
	  else
	  {//格式化失败
		  while(1);
	  }
  }else if(f_res != FR_OK){ //如果存在文件系统,但不生效
	  while(1);
  }else{
	  //已存在格式化文件系统，并能正常使用
  }
  //SD文件写入测试，在STM32H7.txt(不存在则默认创建)中写入"Hello STM32H723ZGT6!"
  f_res = f_open(&file, "0:STM32H7.txt", FA_CREATE_ALWAYS | FA_WRITE);
  if(f_res == FR_OK)
  { //成功打开文件
	  /* 将指定存储区内容写入到文件内 */
	  sprintf(writesd_buffer,"Hello STM32H723ZGT6!");
	  f_res = f_write(&file, writesd_buffer, strlen(writesd_buffer), &fnum);
	  if(f_res == FR_OK)
	  {//写入成功
	  }
	  else
	  {//写入不成功
		  while(1);
	  }
	  /* 不再读写，关闭文件 */
	  f_close(&file);
  }else{
	  while(1);
  }
```

### 往SD中读出

```

```



## MPU6050（I2C）

参考：[STM32CubeMX教程19 I2C - MPU6050驱动 - OSnotes - 博客园](https://www.cnblogs.com/lc-guo/p/17965519)

参考（更详细）:[STM32CubeMX驱动MPU6050模块_mpu6050 stm32cubemx-CSDN博客](https://blog.csdn.net/qq_52158753/article/details/130390227?ops_request_misc=%7B%22request%5Fid%22%3A%22a1c9ed7a52f265124361fd2700186761%22%2C%22scm%22%3A%2220140713.130102334.pc%5Fall.%22%7D&request_id=a1c9ed7a52f265124361fd2700186761&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-130390227-null-null.142^v101^pc_search_result_base3&utm_term=cubmx mpu6050姿态解算&spm=1018.2226.3001.4187)

MPU6050是由InvenSense公司生产的全球首款整合性六轴运动处理模块，它可以实时获取运动物体的在[三维坐标系](https://so.csdn.net/so/search?q=三维坐标系&spm=1001.2101.3001.7020)内的偏转角度，如图所示。

<img src="https://i-blog.csdnimg.cn/blog_migrate/dbbfc694f8f2eed90851568cb7c50a0a.png" alt="MPU6050偏转角度示意图" style="zoom:50%;" />

  其中roll为绕X轴偏转的角度，[pitch](https://so.csdn.net/so/search?q=pitch&spm=1001.2101.3001.7020)为绕Y轴偏转的角度，yaw为绕Z轴偏转的角度。

<img src="./stm32f407zgt6_localdata/image-20250219190345088_1.png" alt="image-20250219190345088" style="zoom: 33%;" />

采样默认8K赫兹

<img src="./stm32f407zgt6_localdata/image-20250219190624014_1.png" alt="image-20250219190624014" style="zoom: 50%;" />

### 主要数据

<img src="./stm32f407zgt6_localdata/image-20250219190715196_1.png" alt="image-20250219190715196" style="zoom:67%;" />

<img src="./stm32f407zgt6_localdata/image-20250219190840359_1.png" alt="image-20250219190840359" style="zoom: 80%;" />

### 接线

VCC-电源正极，通常接3.3V
GND-电源地
SCL-IIC的时钟线
SDA-IIC的数据线
XDA-外接IIC设备的数据线
XCL-外接IIC设备的时钟线
AD0-控制IIC从属地址，接地时地址为0X68，如果接VCC的话，从属地址为0X69
INT-中断数字输出

<img src="./stm32f407zgt6_localdata/image-20250118152017505_1.png" alt="image-20250118152017505" style="zoom:33%;" />



### 程序

主程序

```
	  int16_t ax,ay,az,gx,gy,gz;
      char buffer[100]; //用于显示
      while(MPU6050_Init(&hi2c1) != HAL_OK){HAL_Delay(1);} //等待mpu6050接通
	  while(1){
	  MPU_Get_RAW_Gyroscope(&ax,&ay,&az);  //读取数据
	  MPU_Get_RAW_Accelerometer(&gx,&gy,&gz);  //读取
	  // 每次调用 sprintf 前先清空缓冲区
	  memset(buffer, 0, sizeof(buffer));
	  // 使用 snprintf 格式化字符串
	  snprintf(buffer, sizeof(buffer), "ax:%d|ay:%d|az:%d", ax, ay, az);
	  // 然后将 buffer 传递给绘制函数
	  Gui_DrawFont_GBK16(10, 30, BLUE, GRAY0, buffer);
	  memset(buffer, 0, sizeof(buffer));
	  // 使用 snprintf 格式化字符串
	  snprintf(buffer, sizeof(buffer), "gx:%d|gy:%d|gz:%d", gx,gy,gz);
	  // 然后将 buffer 传递给绘制函数
	  Gui_DrawFont_GBK16(10, 30+3*16, BLUE, GRAY0, buffer);
	  }
```

## 维特智能陀螺仪

官网：[产品资料-维特智能-倾角传感器,姿态传感器,陀螺仪,IMU,加速度计,惯性导航,RTK定位](https://www.wit-motion.cn/file.html)



<img src="./stm32f407zgt6_localdata/image-20250322172456481_1.png" alt="image-20250322172456481" style="zoom: 33%;" />

数据解析网站：



<img src="./stm32f407zgt6_localdata/image-20250322172831210_1.png" alt="image-20250322172831210" style="zoom: 50%;" />

### JY61P

参考：[stm32通过串口读取JY61 JY62数据（HAL库）-CSDN博客](https://blog.csdn.net/2301_79779075/article/details/143065030?ops_request_misc=%7B%22request%5Fid%22%3A%22b8dd050ddbcfba1d3966c7d0811aa82a%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=b8dd050ddbcfba1d3966c7d0811aa82a&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-143065030-null-null.142^v102^pc_search_result_base3&utm_term=jy61p 串口  stm32&spm=1018.2226.3001.4187)

标准库与HAL库实现：[STM32实现六轴姿态测量陀螺仪模块JY61P（标准库与HAL库实现）_小材大用-GitCode 开源社区](https://gitcode.csdn.net/66c59176101644163365562b.html?dp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MzMxODk1NiwiZXhwIjoxNzQzMzU0Mzc5LCJpYXQiOjE3NDI3NDk1NzksInVzZXJuYW1lIjoieGlhb2h1YW5nbW9ua2V5In0.qzo354AhwLJW03mPjOk-5dvfIkkDmxuH-GwxIRADYug&spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~activity-6-127771234-blog-133444574.235^v43^pc_blog_bottom_relevance_base2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~activity-6-127771234-blog-133444574.235^v43^pc_blog_bottom_relevance_base2&utm_relevant_index=9)

#### 修改波特率

参考：[WIT私有协议](https://wit-motion.yuque.com/wumwnr/ltst03/vl3tpy#k4CnY)

1.解锁：FF AA 69 88 B5

1.1延时200ms

2.修改波特率：FF AA 04 06 00

2.1切换已修改的波特率然后重新发送解锁和保存指令

2.2解锁：FF AA 69 88 B5

2.3延时200ms

4.保存: FF AA 00 00 00

### IMU63

参考：[WT-IMU63产品规格书](https://wit-motion.yuque.com/wumwnr/docs/meggs4ct2gthmtda#)

基本参数：

<img src="./stm32f407zgt6_localdata/image-20250322173306062_1.png" alt="image-20250322173306062" style="zoom: 67%;" />

<img src="./stm32f407zgt6_localdata/image-20250322173328141_1.png" alt="image-20250322173328141" style="zoom: 67%;" />

## SPI

## CAN

## USB

### USB虚拟串口打印

usb模拟串口，使用串口重定向打印（typeC）

参考：[STM32+USB串口通信+printf函数功能HAL库函数+cubemax配置+部分解释_stm32 usb通信-CSDN博客](https://blog.csdn.net/m0_66709017/article/details/136891157?ops_request_misc=&request_id=&biz_id=102&utm_term=stm32h7 usb打印数据&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-136891157.142^v102^pc_search_result_base3&spm=1018.2226.3001.4187)



## RS485

## lvgl 界面设计



## 8针SPI显示屏

引脚

<img src="./stm32f407zgt6_localdata/image-20250118140507928_1.png" alt="image-20250118140507928" style="zoom:50%;" />

或者

<img src="./stm32f407zgt6_localdata/image-20250118140852616_1.png" alt="image-20250118140852616" style="zoom: 67%;" />

### f1的keil移植到f4中

#### 操作宏修改（BSRR等，转HAL库）

原始

```
////液晶控制口置1操作语句宏定义
//#define	LCD_SCL_SET  	LCD_CTRLA->BSRR=LCD_SCL
//#define	LCD_SDA_SET  	LCD_CTRLA->BSRR=LCD_SDA
//#define	LCD_CS_SET  	LCD_CTRLA->BSRR=LCD_CS
//
//#define	LCD_LED_SET  	LCD_CTRLB->BSRR=LCD_LED
//#define	LCD_RS_SET  	LCD_CTRLB->BSRR=LCD_RS
//#define	LCD_RST_SET  	LCD_CTRLB->BSRR=LCD_RST
////液晶控制口置0操作语句宏定义
//#define	LCD_SCL_CLR  	LCD_CTRLA->BRR=LCD_SCL
//#define	LCD_SDA_CLR  	LCD_CTRLA->BRR=LCD_SDA
//#define	LCD_CS_CLR  	LCD_CTRLA->BRR=LCD_CS
//
//#define	LCD_LED_CLR  	LCD_CTRLB->BRR=LCD_LED
//#define	LCD_RST_CLR  	LCD_CTRLB->BRR=LCD_RST
//#define	LCD_RS_CLR  	LCD_CTRLB->BRR=LCD_RS
```

修改后

```
// 设置液晶控制口为高电平操作宏定义
#define LCD_SCL_SET    HAL_GPIO_WritePin(LCD_CTRLA, LCD_SCL, GPIO_PIN_SET)
#define LCD_SDA_SET    HAL_GPIO_WritePin(LCD_CTRLA, LCD_SDA, GPIO_PIN_SET)
#define LCD_CS_SET     HAL_GPIO_WritePin(LCD_CTRLA, LCD_CS, GPIO_PIN_SET)
#define LCD_LED_SET    HAL_GPIO_WritePin(LCD_CTRLB, LCD_LED, GPIO_PIN_SET)
#define LCD_RS_SET     HAL_GPIO_WritePin(LCD_CTRLC, LCD_RS, GPIO_PIN_SET)
#define LCD_RST_SET    HAL_GPIO_WritePin(LCD_CTRLC, LCD_RST, GPIO_PIN_SET)

// 设置液晶控制口为低电平操作宏定义
#define LCD_SCL_CLR    HAL_GPIO_WritePin(LCD_CTRLA, LCD_SCL, GPIO_PIN_RESET)
#define LCD_SDA_CLR    HAL_GPIO_WritePin(LCD_CTRLA, LCD_SDA, GPIO_PIN_RESET)
#define LCD_CS_CLR     HAL_GPIO_WritePin(LCD_CTRLA, LCD_CS, GPIO_PIN_RESET)
#define LCD_LED_CLR    HAL_GPIO_WritePin(LCD_CTRLB, LCD_LED, GPIO_PIN_RESET)
#define LCD_RST_CLR    HAL_GPIO_WritePin(LCD_CTRLC, LCD_RST, GPIO_PIN_RESET)
#define LCD_RS_CLR     HAL_GPIO_WritePin(LCD_CTRLC, LCD_RS, GPIO_PIN_RESET)
```

#### GPIO初始化修改

### 字模

软件地址：



#### 16*16

<img src="./stm32f407zgt6_localdata/image-20250118170309298_1.png" alt="image-20250118170309298" style="zoom:50%;" />

示例

```
const struct typFNT_GB162 hz16[] = {
#if USE_ONCHIP_FLASH_FONT
"测",0x00,0x04,0x27,0xC4,0x14,0x44,0x14,0x54,0x85,0x54,0x45,0x54,0x45,0x54,0x15,0x54,0x15,0x54,0x25,0x54,0xE5,0x54,0x21,0x04,0x22,0x84,0x22,0x44,0x24,0x14,0x08,0x08,
"量",0x00,0x00,0x1F,0xF0,0x10,0x10,0x1F,0xF0,0x10,0x10,0xFF,0xFE,0x00,0x00,0x1F,0xF0,0x11,0x10,0x1F,0xF0,0x11,0x10,0x1F,0xF0,0x01,0x00,0x1F,0xF0,0x01,0x00,0x7F,0xFC,
"数",0x08,0x20,0x49,0x20,0x2A,0x20,0x08,0x3E,0xFF,0x44,0x2A,0x44,0x49,0x44,0x88,0xA4,0x10,0x28,0xFE,0x28,0x22,0x10,0x42,0x10,0x64,0x28,0x18,0x28,0x34,0x44,0xC2,0x82,
"据",0x20,0x00,0x23,0xFC,0x22,0x04,0x22,0x04,0xFB,0xFC,0x22,0x20,0x22,0x20,0x2B,0xFE,0x32,0x20,0xE2,0x20,0x22,0xFC,0x22,0x84,0x22,0x84,0x24,0x84,0xA4,0xFC,0x48,0x84,
#endif
0x00,
};
```

#### 字符与数据格式化输出

```
char buffer[100];  // 用于存储格式化后的字符串
sprintf(buffer, "ax:%d,ay:%d,az:%d,", ax, ay, az);  // 格式化字符串

Gui_DrawFont_GBK16(10, 10, BLUE, GRAY0, buffer);  // 传递格式化后的字符串

```



## 蓝牙

### HC-05

HC05是主从一体的模块，也就是既可以作为从机（只能被别的模块请求连接），也可以作为主机（可以主动连接别的蓝牙模块）。配置蓝牙模块要使用AT命令操作。

指令集：[蓝牙HC-05与HC-06对比指令集 - feng..liu - 博客园](https://www.cnblogs.com/fengliu-/p/7306306.html)



### HC-06

**模块供电：** 规格书写的工作电压为3.6V-6V。如果上电后蓝牙模块灯不亮，检查下电压是否满足要求。

<img src="./stm32f407zgt6_localdata/image-20250118203911179_1.png" alt="image-20250118203911179" style="zoom: 67%;" />

#### 引脚

![image-20250118204546670](./stm32f407zgt6_localdata/image-20250118204546670_1.png)

主程序

```
  uint8_t Data = 0;
  while(1){
  {
		  HAL_UART_Receive(&huart5, &Data, 1, 0xffff);		//阻塞接收，接收超时时间设为0xffff
//		  HAL_UART_Transmit(&huart5, (uint8_t *)&Data, 1, 0xffff);//阻塞发送，发送超时时间设为0xffff
		  HAL_UART_Transmit(&huart5, "recieved", 8, 0xffff);//阻塞发送，发送超时时间设为0xffff
  }
```

#### HC06指令集

HC06和HC05参考指令链接：[蓝牙HC-05与HC-06对比指令集 - feng..liu - 博客园](https://www.cnblogs.com/fengliu-/p/7306306.html)

- AT

首先输入AT（无空格回车），然后串口助手会返回OK

- AT+BAUDx

修改波特率时输入AT+BAUDx（x为波特率编号），串口助手会返回OKnnnn（nnnn是你设置的波特率）

注意，在这之后若还做其他命令操作，必须先断开连接，修改串口助手的波特率为刚刚设置的波特率，然后再打开串口继续操作。

```
波特率标号对应表：
1---------1200
2---------2400
3---------4800
4---------9600(默认)
5---------19200
6---------38400
7---------57600
8---------115200
9---------230400
A---------460800
B---------921600
C---------1382400
```

如

```
AT+BAUD8
```

- AT+NAMEname （改蓝牙名称）

如

```
AT+NAMECARHC06
```

返回

<img src="./stm32f407zgt6_localdata/image-20250313210942546_1.png" alt="image-20250313210942546" style="zoom: 67%;" /> 

- AT+PINxxx（改配对密码）

如

```
AT+PIN1234
```

返回

<img src="./stm32f407zgt6_localdata/image-20250313211056084_1.png" alt="image-20250313211056084" style="zoom:67%;" /> 

- 设置主从模式

```
AT+ROLE=M
OK+ROLE:M
```

<img src="./stm32f407zgt6_localdata/image-20250313213514243_1.png" alt="image-20250313213514243" style="zoom: 80%;" />



### JDY-08

#### AT指令集

<img src="./stm32f407zgt6_localdata/image-20250313212352777_1.png" alt="image-20250313212352777" style="zoom:67%;" />

<img src="./stm32f407zgt6_localdata/image-20250313212441183_1.png" alt="image-20250313212441183" style="zoom: 67%;" />

- 查看名称、修改名称和密码

- 更改主从模式

查看

```
AT+HOSTEN
+HOSTEN:0
```

修改

```
AT+HOSTEN1
+OK
```

- 查看连接密码

```
AT+PASS
+PSS:123456
```

- 设置连接密码

```
AT+PASS123456
+OK
```

- 主动连接他机

```

```

### CH9143



### 配对

#### HC05—HC05配对

- 从模式设置

默认9600，或者38400,改成115200

```
AT+NAME=CarHC05  
AT+UART=115200,0,0 //波特率设置
AT+ROLE=0
AT+ADDR?   //返回地址：+ADDR=16:59:7B:D8:46:10
AT+PSWD=999999  //设置密码
```

- 主模式机设置

默认9600,改成115200

```C
AT+NAME?    //查看名字，返回+NAME:HC-05
AT+NAME=CarHC05 //设置名字Car
AT+UART=115200,0,0 //设置波特率115200
AT+ROLE? //查看模式
AT+ROLE=1  //OK,设置为主模式
//0——从角色（ Slave）、1——主角色（ Master）2——回环角色（ Slave-Loop）
AT+BIND=16,59,7B,D8,46,10
```



#### JDY08-JDY08

参考视频：【如何让两个HC-05蓝牙模块分别作为主设备和从设备[How To Mechatronics]】https://www.bilibili.com/video/BV1RJ411i7Fr?vd_source=b7ec3648f866bae76c4b07907d1dae5e

- 从模式设置

```
AT+HOSTEN0
AT+PASS123456
AT+MAC  //返回+MAC:7446B3F8FF2B
```

- 主模式

```
AT+HOSTEN1
AT+PASS123456
AT+BAND7446B3F8FF2B
```

## WIFI无线转串口

### esp01

参考：【2.ESP01S连接阿里云——ESP01S固件烧录】https://www.bilibili.com/video/BV1x14y1S74D?vd_source=b7ec3648f866bae76c4b07907d1dae5e

<img src="./stm32f407zgt6_localdata/image-20250322153920803_1.png" alt="image-20250322153920803" style="zoom:50%;" />



### zigbee

### 安信可AI-WB2-12f

排针2.0，供电3v3


通过usb串口连接，usb的数据发送给wifi串口

#### 蓝牙功能

#### 蓝牙互联

#### WIFI互联



## 舵机

### PWM舵机



## 电机

### TB6612电机驱动

<img src="./stm32f407zgt6_localdata/image-20250222164116830_1.png" alt="image-20250222164116830" style="zoom:50%;" />

<img src="./stm32f407zgt6_localdata/image-20250223115320434_1.png" alt="image-20250223115320434" style="zoom:50%;" />

<img src="./stm32f407zgt6_localdata/image-20250202091303918_1.png" alt="image-20250202091303918" style="zoom:50%;" />

接线

<img src="./stm32f407zgt6_localdata/image-20250202091424864_1.png" alt="image-20250202091424864" style="zoom:50%;" />

### L298N电机驱动



### DRV8833

<img src="./stm32f407zgt6_localdata/image-20250202114735245_1.png" alt="image-20250202114735245" style="zoom:50%;" />

<img src="./stm32f407zgt6_localdata/image-20250202114954907_1.png" alt="image-20250202114954907" style="zoom:50%;" />

<img src="./stm32f407zgt6_localdata/image-20250202115054695_1.png" alt="image-20250202115054695" style="zoom:50%;" />

### 直流减速电机

记得与单片机共地！！！

参考：[STM32驱动带编码器的直流减速电机_mg310电机-CSDN博客](https://blog.csdn.net/u011895157/article/details/139609274?ops_request_misc=&request_id=&biz_id=102&utm_term=直流减速电机mg310控制&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-139609274.142^v101^pc_search_result_base3&spm=1018.2226.3001.4187)

#### 驰海电机



<img src="./stm32f407zgt6_localdata/image-20250201153941495_1.png" alt="image-20250201153941495" style="zoom:50%;" />

另一个示例

<img src="./stm32f407zgt6_localdata/image-20250201191436592_1.png" alt="image-20250201191436592" style="zoom:50%;" />

#### JGB-520电机

参考：[stm32平衡小车--（1）JGB-520减速电机+tb6612（附测试代码）_jgb520-CSDN博客](https://blog.csdn.net/m0_74800695/article/details/134586614?ops_request_misc=%7B%22request%5Fid%22%3A%22a7e634a2dc0f7cf9f115bf3629c6c770%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=a7e634a2dc0f7cf9f115bf3629c6c770&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-134586614-null-null.142^v101^pc_search_result_base3&utm_term=jgb520电机&spm=1018.2226.3001.4187)

<img src="./stm32f407zgt6_localdata/image-20250301171527157_1.png" alt="image-20250301171527157" style="zoom:50%;" />

#### 测试连接

输出1

<img src="./stm32f407zgt6_localdata/image-20250201154450874_1.png" alt="image-20250201154450874" style="zoom:50%;" />

输出2

<img src="./stm32f407zgt6_localdata/image-20250201154859132_1.png" alt="image-20250201154859132" style="zoom:50%;" />

#### PWM控制电机

<img src="./stm32f407zgt6_localdata/image-20250219144853506_1.png" alt="image-20250219144853506" style="zoom: 67%;" />

<img src="./stm32f407zgt6_localdata/image-20250219144938719_1.png" alt="image-20250219144938719" style="zoom: 67%;" />

<img src="./stm32f407zgt6_localdata/image-20250219144045075_1.png" alt="image-20250219144045075" style="zoom: 67%;" />

##### 呼吸轮

```
/* USER CODE BEGIN 2 */
  	//电机全速转
	HAL_GPIO_WritePin(AIN1_GPIO_Port, AIN1_Pin,GPIO_PIN_SET);
	HAL_GPIO_WritePin(AIN2_GPIO_Port, AIN2_Pin,GPIO_PIN_RESET);
	HAL_GPIO_WritePin(BIN1_GPIO_Port, BIN1_Pin,GPIO_PIN_SET);
	HAL_GPIO_WritePin(BIN2_GPIO_Port, BIN2_Pin,GPIO_PIN_RESET);
	//开启pwm
	HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);
	HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_2);
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
	  for(int i=0;i<100;i++){
		  __HAL_TIM_SET_COMPARE(&htim1,TIM_CHANNEL_1,i);
		  HAL_Delay(10);
		  __HAL_TIM_SET_COMPARE(&htim1,TIM_CHANNEL_2,i);
		  HAL_Delay(10);
	  }for(int i=99;i>=0;i--){
		  __HAL_TIM_SET_COMPARE(&htim1,TIM_CHANNEL_1,i);
		  HAL_Delay(10);
		  __HAL_TIM_SET_COMPARE(&htim1,TIM_CHANNEL_2,i);
		  HAL_Delay(10);
	  }
    /* USER CODE END WHILE */
    /* USER CODE BEGIN 3 */
  }
```



#### 编码器测速

<img src="./stm32f407zgt6_localdata/image-20250202095319030_1.png" alt="image-20250202095319030" style="zoom: 50%;" />

##### 判断旋转方向

方法1：（适合低速，高速不行）

A相上升沿触发，触发时检测B相电压来判断方向，累计数值-1或者+1来记录脉冲数量

<img src="./stm32f407zgt6_localdata/image-20250202102205542_1.png" alt="image-20250202102205542" style="zoom:50%;" />

方法2：定时器的编码器通道（高速）

- 对上下边沿都敏感

![image-20250202102710752](./stm32f407zgt6_localdata/image-20250202102710752_1.png)

##### 计算案例

设减速比1：20（即20），线数（PPR=线数）13,编码器倍频为4

轮胎每转一圈的脉冲数
$$
轮胎每转一圈的脉冲数=倍频∗PPR∗减速比
$$
速度有
$$
\begin{align*}
单个脉冲时间&=\frac{测量时长}{测得脉冲数}
\\
速度&=\frac{1}{单个脉冲时间}\times\frac{轮胎周长}{轮胎每转一圈的脉冲数}
\\
&=\frac{测得脉冲数\times轮胎周长}{测量时长\times轮胎每转一圈的脉冲数}\\
&=\frac{测得脉冲数\times轮胎周长}{测量时长\times倍频∗PPR∗减速比}\\
转速(rad/s)&=\frac{测得脉冲数}{测量时长\times倍频∗PPR∗减速比}
\end{align*}
$$

##### 定时器编码器测速

- 注意需要两个定时器，一个定时器用于定时发送测速结果，另一个用于编码器测速
- 编码器测速

记编码器的脉冲数，不用设置时钟源

<img src="./stm32f407zgt6_localdata/image-20250203124550738_1.png" alt="image-20250203124550738" style="zoom: 67%;" />

由于上下边沿都会计数，因此如果只想单个边沿就选择预分配为2

<img src="./stm32f407zgt6_localdata/image-20250203125121625_1.png" alt="image-20250203125121625" style="zoom:67%;" />

Encoder Mode TI1就是在TI1边沿上计数

<img src="./stm32f407zgt6_localdata/image-20250203124905116_1.png" alt="image-20250203124905116" style="zoom:67%;" />

开启编码器

```
HAL_TIM_Encoder_Start(&htim2, TIM_CHANNEL_ALL);//开启TIM2编码器模式（）
HAL_TIM_Encoder_Start(&htim4, TIM_CHANNEL_ALL);//开启TIM4编码器模式（）
```



- 定时测速（设置测速10ms），即

$$
f=100Hz=\frac{168MHz}{168\times 10000}
$$



#### 闭环控制轮胎速度

#### 光电编码器配置完整过程

- 以M2为例

- 设置一对编码器  E2A、E2B

![image-20250408222020502](./stm32f407zgt6_localdata/image-20250408222020502_1.png)

<img src="./stm32f407zgt6_localdata/image-20250408222110777_1.png" alt="image-20250408222110777" style="zoom:50%;" />

参数配置：

<img src="./stm32f407zgt6_localdata/image-20250408223755866_1.png" alt="image-20250408223755866" style="zoom: 50%;" />

- 设置M+\M-（通过两个GPIO和一个PWM，通过呼吸轮测试）

M+/M-：

<img src="./stm32f407zgt6_localdata/image-20250408222858255_1.png" alt="image-20250408222858255" style="zoom: 80%;" />

<img src="./stm32f407zgt6_localdata/image-20250408222349423_1.png" alt="image-20250408222349423" style="zoom: 25%;" />

时钟，用于产生PWM：

![image-20250408223946232](./stm32f407zgt6_localdata/image-20250408223946232_1.png)



<img src="./stm32f407zgt6_localdata/image-20250409222821522_1.png" alt="image-20250409222821522" style="zoom:50%;" />

- 编码器定时清空定时器

5ms

![image-20250410215015255](./stm32f407zgt6_localdata/image-20250410215015255_1.png)

<img src="./stm32f407zgt6_localdata/image-20250410214945261_1.png" alt="image-20250410214945261" style="zoom: 67%;" />

定时更新函数—（也在motor中）

.h

```
#define FRESH_COUNTER_TIM  htim13
void fresh_encoder(void);
```

.c

```
short motor2_encoder_count=0;
void fresh_encoder(void){
	//电机2
	motor2_encoder_count=(short)__HAL_TIM_GET_COUNTER(&M2_ENCODER_TIMER);  // 获取定时器(编码器)的计数值
	__HAL_TIM_SET_COUNTER(&M2_ENCODER_TIMER,0);//清空编码器
}
```

- 相关函数

- motor.h

```
/*
 * motor.h
 *
 *  Created on: Mar 30, 2025
 *      Author: 27276
 */

#ifndef SRC_MOTOR_MOTOR_H_
#define SRC_MOTOR_MOTOR_H_
#include "main.h"
#include "tim.h"


/*
 * 定时测速使用的定时器
 */
#define FRESH_COUNTER_TIM  htim13
void fresh_encoder(void);
/*
 * 电机与编码器
 */
#define FRONT 1
#define BACK 0
#define STOP -1
/*
 * 电机2
 * 开启方法
 * HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);
 */
#define M2_PWM_TIMER  htim1  //电机2的PWM的定时器
#define M2_PWM_TIMER_CHANNEL TIM_CHANNEL_4  //电机2的PWM的定时器通道
#define M2_PWM_MAX_COUNT  50000 //电机2的PWM的周期

#define M2_IN1_PORT  M2_IN1_GPIO_Port //电机2方向控制IN1
#define M2_IN1_PIN   M2_IN1_Pin       //电机2方向控制IN1
#define M2_IN2_PORT  M2_IN2_GPIO_Port //电机2方向控制IN2
#define M2_IN2_PIN   M2_IN2_Pin       //电机2方向控制IN2

#define M2_ENCODER_TIMER htim2//电机2的编码器定时器
extern short motor2_encoder_count;         //电机2的PWM的编码器计数值
void motor2_init(void);  //电机使能，含对应编码器使能
void motor2_diret_set(int i);
void motor2_setpwm(int  pwm);
void motor2_get_encoder_count(void);
//motor2的指令函数
void motor2_breath(void);  //呼吸轮测试，编码器的值会改变
/*
 * 电机3
 */
#endif /* SRC_MOTOR_MOTOR_H_ */

```

- motor.c

```
/*
 * motor.c
 *
 *  Created on: Mar 30, 2025
 *      Author: 27276
 */


#include "motor.h"

//MOTOR通用函数
void pwm_constrait(int16_t *pwm,int pwmmax,int pwmmin,int deathpwm){
	if(*pwm>=pwmmax)
		*pwm=pwmmax;
	else if(*pwm<=pwmmin)
		*pwm =pwmmin;
   if(*pwm>=0)
   {
	   *pwm+=deathpwm;
   }
   else if(*pwm<=0)
   {
	   *pwm-=deathpwm;
   }
}

//定时测速使用的定时器,更新定时器并存储
/*
 * 在tim_it.c中的使用
 */
short motor2_encoder_count=0;
void fresh_encoder(void){
	//电机2
	motor2_encoder_count=(short)__HAL_TIM_GET_COUNTER(&M2_ENCODER_TIMER);  // 获取定时器(编码器)的计数值
	__HAL_TIM_SET_COUNTER(&M2_ENCODER_TIMER,0);//清空编码器
}
//MOTOR2
void motor2_init(void){
	HAL_TIM_PWM_Start(&M2_PWM_TIMER,M2_PWM_TIMER_CHANNEL); //PWM引脚对应定时器
	HAL_TIM_Base_Start_IT(&FRESH_COUNTER_TIM);
	HAL_TIM_Encoder_Start(&M2_ENCODER_TIMER, TIM_CHANNEL_ALL);//开启编码器

}

void motor2_diret_set(int i){
	if(i==FRONT){
		HAL_GPIO_WritePin(M2_IN1_PORT, M2_IN1_PIN, GPIO_PIN_SET);
		HAL_GPIO_WritePin(M2_IN2_PORT, M2_IN2_PIN, GPIO_PIN_RESET);
	}
	else if(i==BACK){
		HAL_GPIO_WritePin(M2_IN1_PORT, M2_IN1_PIN, GPIO_PIN_RESET);
	    HAL_GPIO_WritePin(M2_IN2_PORT, M2_IN2_PIN, GPIO_PIN_SET);
	}
	else if(i==STOP){
		HAL_GPIO_WritePin(M2_IN1_PORT, M2_IN1_PIN, GPIO_PIN_RESET);
		HAL_GPIO_WritePin(M2_IN2_PORT, M2_IN2_PIN, GPIO_PIN_RESET);
	}
}
void motor2_setpwm(int pwm){ //pwm不是-1~1的而是根据
	pwm_constrait(&pwm,46000,-46000,0);
	if(pwm>0){
		motor2_diret_set(FRONT);
		__HAL_TIM_SET_COMPARE(&M2_PWM_TIMER,M2_PWM_TIMER_CHANNEL,pwm);
	}
	else if(pwm<0){
		motor2_diret_set(BACK);
		__HAL_TIM_SET_COMPARE(&M2_PWM_TIMER,M2_PWM_TIMER_CHANNEL,-pwm);
	}
	else
		motor2_diret_set(STOP);
//		__HAL_TIM_SET_COMPARE(&htim5,TIM_CHANNEL_2,0);
}
void motor2_breath(void){
	for(int i=-M2_PWM_MAX_COUNT;i<M2_PWM_MAX_COUNT;i+=100){
		motor2_setpwm(i);
		HAL_Delay(5);
	}for(int i=M2_PWM_MAX_COUNT;i>=-M2_PWM_MAX_COUNT;i-=100){
		motor2_setpwm(i);
		HAL_Delay(5);
	}
}
void motor2_get_encoder_count(void){
	motor2_encoder_count=(short)__HAL_TIM_GET_COUNTER(&M2_PWM_TIMER);
	__HAL_TIM_SET_COUNTER(&M2_PWM_TIMER,0);//清空编码器
}

```

- tim_it.h

```
/*
 * tim_it.h
 *
 *  Created on: Apr 10, 2025
 *      Author: 27276
 */

#ifndef SRC_TIM_IT_TIM_IT_H_
#define SRC_TIM_IT_TIM_IT_H_
#include "main.h"


#endif /* SRC_TIM_IT_TIM_IT_H_ */

```

- tim_it.c

```
/*
 * tim_it.c
 *
 *  Created on: Apr 10, 2025
 *      Author: 27276
 */

#include "tim_it.h"
#include "motor.h"
//定时器中断重定义
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim){
 if(htim==&FRESH_COUNTER_TIM){ //htim13,编码器清空定时器
	 fresh_encoder();
 }
}

```

## DDS

### AD9833

参考链接：[AD9833调不通？看这篇文章就够了~ - 讨论 - 中文资源库 - EngineerZone](https://ez.analog.com/cn/other/f/forum/545070/ad9833)

ad9833.h

```
/*
 * ad9833.h
 *
 *  Created on: Apr 27, 2025
 *      Author: 27276
 */

#ifndef SRC_AD9833_AD9833_H_
#define SRC_AD9833_AD9833_H_

#include "main.h"
//使用GPIO实现SPI通信

//-----------------------------------------------------------------
// I/O口定义
//-----------------------------------------------------------------
#define SD_PORT   	GPIOD
#define SD_PIN	  	GPIO_PIN_8
#define SCL_PORT	GPIOD
#define SCL_PIN		GPIO_PIN_9
#define CS_PORT		GPIOD
#define CS_PIN		GPIO_PIN_10

#define  ADI_SD_LOW    (HAL_GPIO_WritePin(SD_PORT,SD_PIN,GPIO_PIN_RESET))
#define  ADI_SD_HIGH   (HAL_GPIO_WritePin(SD_PORT,SD_PIN,GPIO_PIN_SET))
#define  ADI_SCL_LOW   (HAL_GPIO_WritePin(SCL_PORT,SCL_PIN,GPIO_PIN_RESET))
#define  ADI_SCL_HIGH  (HAL_GPIO_WritePin(SCL_PORT,SCL_PIN,GPIO_PIN_SET))
#define  ADI_CS_LOW    (HAL_GPIO_WritePin(CS_PORT,CS_PIN,GPIO_PIN_RESET))
#define  ADI_CS_HIGH   (HAL_GPIO_WritePin(CS_PORT,CS_PIN,GPIO_PIN_SET))


//-----------------------------------------------------------------
// AD9833宏定义
//-----------------------------------------------------------------
/* Registers 寄存器 */
#define AD9833_REG_CMD		(0 << 14)
#define AD9833_REG_FREQ0	(1 << 14)
#define AD9833_REG_FREQ1	(2 << 14)
#define AD9833_REG_PHASE0	(6 << 13)
#define AD9833_REG_PHASE1	(7 << 13)

/* Command Control Bits 命令控制位 */
#define AD9833_B28			(1 << 13)
#define AD9833_HLB			(1 << 12)
#define AD9833_FSEL0		(0 << 11)
#define AD9833_FSEL1		(1 << 11)
#define AD9833_PSEL0		(0 << 10)
#define AD9833_PSEL1		(1 << 10)
#define AD9833_PIN_SW		(1 << 9)
#define AD9833_RESET		(1 << 8)
#define AD9833_SLEEP1		(1 << 7)
#define AD9833_SLEEP12		(1 << 6)
#define AD9833_OPBITEN		(1 << 5)
#define AD9833_SIGN_PIB		(1 << 4)
#define AD9833_DIV2			(1 << 3)
#define AD9833_MODE			(1 << 1)

#define AD9833_OUT_SINUS	((0 << 5) | (0 << 1) | (0 << 3))
#define AD9833_OUT_TRIANGLE	((0 << 5) | (1 << 1) | (0 << 3))
#define AD9833_OUT_MSB		((1 << 5) | (0 << 1) | (1 << 3))
#define AD9833_OUT_MSB2		((1 << 5) | (0 << 1) | (0 << 3))

//-----------------------------------------------------------------
// 函数声明
//-----------------------------------------------------------------

void SPI_Init (void);				// SPI 初始化
void SPI_Write (unsigned short ddara);
/* Initializes the SPI communication peripheral and resets the part. */
unsigned char AD9833_Init(void);
/* Sets the Reset bit of the AD9833. */
void AD9833_Reset(void);
/* Clears the Reset bit of the AD9833. */
void AD9833_ClearReset(void);
/* Writes the value to a register. */
void AD9833_SetRegisterValue(unsigned short regValue);

unsigned long freq_trl_word(double freq);
/* Writes to the frequency registers. */
//void AD9833_SetFrequency(unsigned short reg, unsigned long val);
void AD9833_SetFrequency(unsigned short reg, unsigned short wave_type, unsigned long val);
/* Writes to the phase registers. */
void AD9833_SetPhase(unsigned short reg, unsigned short val);
/* Selects the Frequency,Phase and Waveform type. */
void AD9833_Setup(unsigned short freq,
				  unsigned short phase,
			 	  unsigned short type);

//-----------------------------------------------------------------
// End Of File
//-----------------------------------------------------------------


#endif /* SRC_AD9833_AD9833_H_ */

```

ad9833.c

```
/*
 * ad9833.c
 *
 *  Created on: Apr 27, 2025
 *      Author: 27276
 */

#include "ad9833.h"

//-----------------------------------------------------------------
// void SPI_Init (void)
//-----------------------------------------------------------------
//
// 函数功能: SPI通讯线初始化设置
// 入口参数: 无
// 返回参数: 无
// 全局变量: 无
// 调用模块: 无
// 注意事项:
//
//-----------------------------------------------------------------
void SPI_Init (void)
{
	ADI_CS_HIGH;
	ADI_SCL_HIGH;
	ADI_SD_LOW;
}


//-----------------------------------------------------------------
// SPI_Write (unsigned short ddara)
//-----------------------------------------------------------------
//
// 函数功能: 通过SPI方式写数据
// 入口参数: ddara：要写入的16位的参数
// 返回参数: 无
// 全局变量: 无
// 调用模块: 无
// 注意事项: 无
//
//-----------------------------------------------------------------
void SPI_Write (unsigned short ddara)
{
	unsigned char i;
	for (i = 0; i < 16; i ++)
	{
		if ((ddara & 0x8000) == 0x8000)
		{
			ADI_SD_HIGH;
		}
		else
		{
			ADI_SD_LOW;
		}
		ADI_SCL_LOW;
		ddara <<= 1;
		ADI_SCL_HIGH;
	}
}

//-----------------------------------------------------------------
// unsigned char AD9833_Init(void)
//-----------------------------------------------------------------
//
// 函数功能: AD9833初始化函数
// 入口参数: 无
// 返回参数: 无
// 全局变量: 无
// 调用模块: SPI_Init(); AD9833_SetRegisterValue(),
// 注意事项: 无
//
//-----------------------------------------------------------------
unsigned char AD9833_Init(void)
{
    SPI_Init();
    AD9833_SetRegisterValue(AD9833_REG_CMD | AD9833_RESET);

    return (1);
}

//-----------------------------------------------------------------
// void AD9833_Reset(void)
//-----------------------------------------------------------------
//
// 函数功能: AD9833复位函数
// 入口参数: 无
// 返回参数: 无
// 全局变量: 无
// 调用模块: AD9833_SetRegisterValue(),
// 注意事项: 无
//
//-----------------------------------------------------------------
void AD9833_Reset(void)
{
    AD9833_SetRegisterValue(AD9833_REG_CMD | AD9833_RESET);
}

//-----------------------------------------------------------------
// void AD9833_ClearReset(void)
//-----------------------------------------------------------------
//
// 函数功能: AD9833清除复位函数
// 入口参数: 无
// 返回参数: 无
// 全局变量: 无
// 调用模块: AD9833_SetRegisterValue(),
//
// 注意事项: 无
//-----------------------------------------------------------------
void AD9833_ClearReset(void)
{
	AD9833_SetRegisterValue(AD9833_REG_CMD);
}

//-----------------------------------------------------------------
// void AD9833_SetRegisterValue(unsigned short regValue)
//-----------------------------------------------------------------
//
// 函数功能: 设置AD9833寄存器的值
// 入口参数: regValue：要设置寄存器的值
// 返回参数: 无
// 全局变量: 无
// 调用模块: SPI_Write(),
//
// 注意事项: 无
//-----------------------------------------------------------------
void AD9833_SetRegisterValue(unsigned short regValue)
{
	ADI_CS_LOW;
	SPI_Write(regValue);
	ADI_CS_HIGH;
}

//-----------------------------------------------------------------
// unsigned long freq_trl_word(double freq)
//-----------------------------------------------------------------
unsigned long freq_trl_word(double freq) {
    // 假设主时钟频率为 25MHz（需根据实际硬件调整）
    const double F_MCLK = 25000000.0;  // AD9833 主时钟频率，例如 25MHz
    // 计算频率控制字 FCW = (f_out * 2^28) / F_MCLK
    unsigned long fcw = (unsigned long)((freq * 268435456.0) / F_MCLK);
    return fcw;
}

//-----------------------------------------------------------------
// AD9833_SetFrequency  ()
//-----------------------------------------------------------------
//
// 函数功能: AD9833 设置频率寄存器
// 入口参数: reg：频率寄存器写入 wave_type：波形类型 val：值
// 返回参数: 无
// 全局变量: 无
// 调用模块: AD9833_SetRegisterValue(),
//
// 注意事项: 无
//-----------------------------------------------------------------
void AD9833_SetFrequency(unsigned short reg,  unsigned short wave_type,  unsigned long val)
{
	unsigned short  freqHi = reg;
	unsigned short  freqLo = reg;

	freqHi |= (val & 0xFFFC000) >> 14 ;
	freqLo |= (val & 0x3FFF);

	AD9833_SetRegisterValue(AD9833_B28);
	AD9833_SetRegisterValue(freqLo);
	AD9833_SetRegisterValue(freqHi);
	AD9833_SetRegisterValue(AD9833_REG_CMD | AD9833_B28 | wave_type);
}

/* ***********************************************************************
 * @brief Writes to the frequency registers.
 *
 * @param -  reg - Frequence register to be written to.
 * @param -  val - The value to be written.
 *
 * @return  None.
*************************************************************************/
/*
void AD9833_SetFrequency(unsigned short reg, unsigned short wave_type, unsigned long val)
{
	unsigned short freqHi = reg;
	unsigned short freqLo = reg;

	freqHi |= (val & 0xFFFC000) >> 14 ;
	freqLo |= (val & 0x3FFF);
	if (wave_type == 0x55)
	{
		AD9833_SetRegisterValue(AD9833_B28 | AD9833_OUT_SINUS);
	}
	else if (wave_type == 0xAA)
	{
		AD9833_SetRegisterValue(AD9833_B28 | AD9833_OUT_TRIANGLE);
	}
	else
	{
		AD9833_SetRegisterValue(AD9833_B28);
	}
	AD9833_SetRegisterValue(freqLo);
	AD9833_SetRegisterValue(freqHi);
}
*/

//-----------------------------------------------------------------
// void AD9833_SetPhase(unsigned short reg, unsigned short val)
//-----------------------------------------------------------------
//
// 函数功能: 设置AD9833的相位寄存器的值
// 入口参数: reg：相位寄存器 val：值
// 返回参数: 无
// 全局变量: 无
// 调用模块: AD9833_SetRegisterValue(),
// 注意事项: 无
//-----------------------------------------------------------------
void AD9833_SetPhase(unsigned short reg, unsigned short val)
{
	unsigned short phase = reg;
	phase |= val;
	AD9833_SetRegisterValue(phase);
}

//-----------------------------------------------------------------
// void AD9833_Setup(unsigned short freq,
//				  unsigned short phase,
//			 	  unsigned short type)
//-----------------------------------------------------------------
//
// 函数功能: 设置AD9833的频率，相位，波形类型 的值
// 入口参数: freq：频率 phase：相位 type：波形类型
// 返回参数: 无
// 全局变量: 无
// 调用模块: AD9833_SetRegisterValue(),
// 注意事项: 无
//-----------------------------------------------------------------
void AD9833_Setup(unsigned short freq,
				  unsigned short phase,
			 	  unsigned short type)
{
	unsigned short val = 0;

	val = freq | phase | type;
	AD9833_SetRegisterValue(val);
}

//-----------------------------------------------------------------
// void AD9833_SetWave(unsigned short type)
//-----------------------------------------------------------------
//
// 函数功能: 设置AD9833的波形类型
// 入口参数: type：波形类型
// 返回参数: 无
// 全局变量: 无
// 调用模块: AD9833_SetRegisterValue(),
// 注意事项: 无
//-----------------------------------------------------------------
void AD9833_SetWave(unsigned short type)
{
	AD9833_SetRegisterValue(type);
}


//-----------------------------------------------------------------
// End Of File
//-----------------------------------------------------------------


```



## 串口屏

资料：淘晶驰智能串口屏开发资料及规格书等下载地址： http://wiki2.tjc1688.com

figma:[Login | Figma](https://www.figma.com/login)

素材网站：https://www.figma.com/community/design-templates?resource_type=mixed&editor_type=figma&price=free

272*480

```
#页面跳转
```

### 二维码控件

```
 //给qr0赋值字符串
 printf("qr0.txt=\"https://www.baidu.com"\xff\xff\xff");
```

## 蜂鸣器BEEP

### 定时器设置

htim5

![image-20250702115856836](./stm32f407zgt6_localdata/image-20250702115856836_1.png)

beep.h

```
#ifndef SRC_BEEP_BEEP_H_
#define SRC_BEEP_BEEP_H_

#include "main.h"
#include "tim.h"
#include "tim_it.h"

#define BEEPPORT  GPIOD
#define BEEPPIN GPIO_PIN_0

void beep_ring(void);
void beep_notring(void);
void beep_atime(int t_ms);

#endif /* SRC_BEEP_BEEP_H_ */
```

beep.c

```
#include "beep.h"


void beep_ring(void){
	HAL_GPIO_WritePin(BEEPPORT,BEEPPIN,GPIO_PIN_SET);
}
void beep_notring(void){
	HAL_GPIO_WritePin(BEEPPORT,BEEPPIN,GPIO_PIN_RESET);
}

void beep_atime(int t_ms){
	count_timeflag=0;
	beep_ring();
	HAL_TIM_Base_Start_IT(&htim5);
}

```

![image-20250702113845810](./stm32f407zgt6_localdata/image-20250702113845810_1.png)

在**void** **HAL_TIM_PeriodElapsedCallback**(TIM_HandleTypeDef *htim){下：

```
int count_timeflag=0;
int count_time=0;
```

```
else if(htim==&TIME_BEEP){

		if(count_timeflag>=0){
			count_timeflag++;
		}
		else{

		}
		if(count_timeflag>500){
			count_timeflag=-1;
			beep_notring();
			HAL_TIM_Base_Stop(&htim5);
		}
	}
```



## 错误解决

### 软件型错误

> 设备管理器中无端口：[【Win10设备管理器中无端口选项】_设备管理器没有端口-CSDN博客](https://blog.csdn.net/m0_69455439/article/details/138731100?ops_request_misc=%7B%22request%5Fid%22%3A%22c042a6212ad6eaef47c96010bc23fd99%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=c042a6212ad6eaef47c96010bc23fd99&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-138731100-null-null.142^v100^pc_search_result_base3&utm_term=电脑设备管理器没有端口选项&spm=1018.2226.3001.4187)

> stlink固件升级
>
> 最新：直接在ide中更新，无法更新则多次插拔识别
>
> This version ofSTM32CubelDE provides a newer firmware version of theattached ST-LlNK. Proceed with update?
>
> 安装
>
> 参考：[ST-Link驱动的下载、安装、配置，以及ST-Link固件的升级_stlink驱动-CSDN博客](https://blog.csdn.net/qq_52102933/article/details/126830904)
>
> 官方下载地址：https://www.st.com/zh/development-tools/stsw-link009.html/
>
> 1. 右键“**以管理员身份运行**”打开ST-Link驱动安装包。
>      先将压缩包“`en.stsw-link009.zip`”解压后，再根据自己的操作系统打开对应的安装包，64位的选择“`dpinst_amd64.exe`”，32位的选择“`dpinst_x86.exe`”。
>
> 升级
>
> 进入“ST官网”，找到“STSW-LINK007”。
>   STSW-LINK007是ST-LINK、ST-LINK/V2、ST-LINK/V2-1和STLINK-V3的固件升级工具包。
>
>   官方下载地址：https://www.st.com/zh/development-tools/stsw-link007.html/

### 移植性错误

#### 时钟

请在移植代码前给时钟一个值

#### f1改f4

> fatal error: stm32f10x.h: No such file or directory
>
> 解决
>
> ```
> #include "stm32f4xx_hal.h"
> ```

#### 'u8'等定义不存在

>解决：unknown type name 'u8'
>
>重新定义
>
>```
>typedef uint8_t u8;
>typedef uint16_t u16;
>```
>
>然后导入
>
>```
>#include "../redefine/redefine_sys.h"
>```

#### 'GPIO_Pin_7'等定义引脚不存在

> 'GPIO_Pin_7' undeclared (first use in this function); did you mean 'GPIO_PIN_7'?
>
> 解决：
>
> 先include
>
> ```
> 
> ```
>
> 改成大写
>
> ```
> 'GPIO_PIN_7
> ```

#### for循环不规范缺少括号

>../Core/Src/spi_tft/GUI.c:305:21: warning: this 'for' clause does not guard... [-Wmisleading-indentation]
>
>305 |                     for(i=0;i<16;i++)
>
>解决: 添加{}
>
>```
>for(i=0;i<16;i++){
>	XXXX;
>	XXXX;
>}
>```

#### u8 * 与 unsigned char * 类型不一致

>../Core/Src/spi_tft/GUI.h:20:59: note: expected 'u8 *' {aka 'unsigned char *'} but argument is of type 'char *'
>20 | void Gui_DrawFont_GBK16(u16 x, u16 y, u16 fc, u16 bc, u8 *s);
>
>解决： 修改定义，从注释修改成如下
>
>```
>//void Gui_DrawFont_GBK24(u16 x, u16 y, u16 fc, u16 bc, u8 *s)
>void Gui_DrawFont_GBK24(u16 x, u16 y, u16 fc, u16 bc, unsigned char *s)  
>```
>
>

#### unsigned char *与char *不一致

>../Core/Src/spi_tft/QDTFT_demo.c:63:45: warning: pointer targets in passing argument 5 of 'Gui_DrawFont_GBK16' differ in signedness [-Wpointer-sign]
>   63 |         Gui_DrawFont_GBK16(20,10,BLUE,GRAY0,"Color Test");
>      |                                             ^~~~~~~~~~~~
>      |                                             |
>      |                                             char *
>../Core/Src/spi_tft/GUI.h:22:70: note: expected 'unsigned char *' but argument is of type 'char *'
>   22 | void Gui_DrawFont_GBK16(u16 x, u16 y, u16 fc, u16 bc, unsigned char *s);
>
>解决：强转(unsigned char *)
>
>```
>Gui_DrawFont_GBK16(20, 10, BLUE, GRAY0, (unsigned char *)"Color Test");
>```
>
>

## 其他

<img src="./stm32f407zgt6_localdata/image-20241124215954547_1.png" alt="image-20241124215954547" style="zoom: 25%;" />

<img src="./stm32f407zgt6_localdata/image-20241124215921790_1.png" alt="image-20241124215921790" style="zoom: 25%;" />

## DSP库



## 工程

### 文件新建

自建模板

新建文件夹Sample，包含

```
CORE
USER
FWLIB
OBJ
SYSTEM
```

![image-20241206212456010](./stm32f407zgt6_localdata/image-20241206212456010_1.png)

打开keil，Project中新建工程，放在User中，起名为Sample，确认后选择如下

<img src="./stm32f407zgt6_localdata/image-20241206212813187_1.png" alt="image-20241206212813187" style="zoom:50%;" />

然后设置

<img src="./stm32f407zgt6_localdata/image-20241206212903034_1.png" alt="image-20241206212903034" style="zoom:50%;" />

除了OJB其他都添加进去

<img src="./stm32f407zgt6_localdata/image-20241206213022445_1.png" alt="image-20241206213022445" style="zoom:50%;" />

从官方库中复制以下包到对应目录

官方下载地址：[STSW-STM32065 - STM32F4 DSP and standard peripherals library - STMicroelectronics](https://www.st.com/en/embedded-software/stsw-stm32065.html?spm=5176.28103460.0.0.2e6b5d27sCNp7N#st_all-features_sec-nav-tab)

文件： [en.stsw-stm32065_v1-9-0](./stm32f407zgt6_localdata/en.stsw-stm32065_v1-9-0) 

> FWLIB的增加
>
> ```
> inc文件夹、src文件夹
> 来自
> D:\DS_diansai\STM32f407zgt6\淘宝资料\STM32F407ZGT6板（核心板）-144P-资料\en.stsw-stm32065_v1-9-0\STM32F4xx_DSP_StdPeriph_Lib_V1.9.0\Libraries\STM32F4xx_StdPeriph_Driver
> 的inc、src->FWLIB下
> ```

> CORE的增加
>
> ```
> startup_stm32f40_41xxx
> 来自
> D:\DS_diansai\STM32f407zgt6\淘宝资料\STM32F407ZGT6板（核心板）-144P-资料\en.stsw-stm32065_v1-9-0\STM32F4xx_DSP_StdPeriph_Lib_V1.9.0\Libraries\CMSIS\Device\ST\STM32F4xx\Source\Templates\arm\startup_stm32f40_41xxx.s
> ```
>
> <img src="./stm32f407zgt6_localdata/image-20241206215520785_1.png" alt="image-20241206215520785" style="zoom:50%;" />
>
> ```
> core_cmSimd.h
> core_cmInstr.h
> core_cmFunc.h
> core_cm4.h
> 来自
> D:\DS_diansai\STM32f407zgt6\淘宝资料\STM32F407ZGT6板（核心板）-144P-资料\en.stsw-stm32065_v1-9-0\STM32F4xx_DSP_StdPeriph_Lib_V1.9.0\Libraries\CMSIS\Include
> ```

> USER的增加
>
> ```
> stm32f4xx.h
> system_stm32f4xx.h
> 来自
> D:\DS_diansai\STM32f407zgt6\淘宝资料\STM32F407ZGT6板（核心板）-144P-资料\en.stsw-stm32065_v1-9-0\STM32F4xx_DSP_StdPeriph_Lib_V1.9.0\Libraries\CMSIS\Device\ST\STM32F4xx\Include
> ```
>
> <img src="./stm32f407zgt6_localdata/image-20241206220121410_1.png" alt="image-20241206220121410" style="zoom:50%;" />
>
> ```
> main.c
> stm32f4xx_conf.h
> stm32f4xx_it.c
> stm32f4xx_it.h
> system_stm32f4xx.c
> 来自：
> D:\DS_diansai\STM32f407zgt6\淘宝资料\STM32F407ZGT6板（核心板）-144P-资料\en.stsw-stm32065_v1-9-0\STM32F4xx_DSP_StdPeriph_Lib_V1.9.0\Project\STM32F4xx_StdPeriph_Templates
> ```

添加文件到工程

>USER
>
><img src="./stm32f407zgt6_localdata/image-20241206220332575_1.png" alt="image-20241206220332575" style="zoom:50%;" />
>
>CORE
>
><img src="./stm32f407zgt6_localdata/image-20241206220505463_1.png" alt="image-20241206220505463" style="zoom:50%;" />
>
>FWLIB——添加scr里面的所有文件
>
><img src="./stm32f407zgt6_localdata/image-20241206220736887_1.png" alt="image-20241206220736887" style="zoom:50%;" />

添加路径——魔术棒

<img src="./stm32f407zgt6_localdata/image-20241206221219746_1.png" alt="image-20241206221219746" style="zoom:50%;" />

添加宏定义

```
STM32F40_41xxx,USE_STDPERIPH_DRIVER
```

<img src="./stm32f407zgt6_localdata/image-20241206221512541_1.png" alt="image-20241206221512541" style="zoom:50%;" />

魔术棒Output勾选Create HEX File,并把生成路径改在OBJ中

<img src="./stm32f407zgt6_localdata/image-20241206221610180_1.png" alt="image-20241206221610180" style="zoom:50%;" />

<img src="./stm32f407zgt6_localdata/image-20241206221705944_1.png" alt="image-20241206221705944" style="zoom:50%;" />

使用如下替换main.c的内容

```
#include "stm32f4xx.h"

int main(void)
{
  while(1){
	}
}
```

最后删除USER-stm32f4xx_it.c中的

```
#include "main.h
#TimingDelay_Decrement();
```

### 新建文件

如gpio

.h

```
#ifndef __GPIO_H
#define __GPIO_H	 
#include "stm32f4xx.h" 

#endif
```

.c

```
#include "stm32f4xx.h"                  // Device header
```

 
