# Mahony互补滤波

四元数的表示（沿着单位方向向量$\vec{u}$旋转$\theta$）
$$
Q=\cos\frac{\theta}{2}+\vec{u}\sin\frac{\theta}{2}
$$

一般地写做$Q=q_0+q_1i+q_2j+q_3k$，且$|Q|=1$，因此
$$
q_0=\cos\frac{\theta}{2}\\
q_1i+q_2j+q_3k=\vec{u}\sin\frac{\theta}{2}
$$
在运动学中，当物体以角速度 $\vec \omega$ 旋转时，四元数 $Q$ 随时间变化。四元数的导数与角速度相关，运动学方程为：
$$
\begin{aligned}
\frac{dQ}{dt}=\frac{1}{2}Q\otimes\omega_q
\end{aligned}
$$
其中，$\omega_{q}=[0,\omega_{x},\omega_{y},\omega_{z}]^{T}$，$Q=[q_0,q_1,q_2,q_3]^T$,同时，
$$
p\otimes q=[p]_Lq=
\begin{bmatrix}
p_0 & -p_1 & -p_2 & -p_3 \\
p_1 & p_0 & -p_3 & p_2 \\
p_2 & p_3 & p_0 & -p_1 \\
p_3 & -p_2 & p_1 & p_0
\end{bmatrix}
\begin{bmatrix}
q_0 \\
q_1 \\
q_2 \\
q_3
\end{bmatrix}
$$
带入得
$$
\begin{bmatrix}
\dot{q}_0 \\
\dot{q}_1 \\
\dot{q}_2 \\
\dot{q}_3
\end{bmatrix}=\frac{1}{2}
\begin{bmatrix}
0 & -\omega_x & -\omega_y & -\omega_z \\
\omega_x & 0 & \omega_z & -\omega_y \\
\omega_y & -\omega_z & 0 & \omega_x \\
\omega_z & \omega_y & -\omega_x & 0
\end{bmatrix}
\begin{bmatrix}
q_0 \\
q_1 \\
q_2 \\
q_3
\end{bmatrix}
$$
写成离散形式为：
$$
\begin{bmatrix}
q_0 \\
q_1 \\
q_2 \\
q_3
\end{bmatrix}_{t+\Delta t}=
\begin{bmatrix}
q_0 \\
q_1 \\
q_2 \\
q_3
\end{bmatrix}_t+\frac{1}{2}\cdot\Delta t\cdot
\begin{bmatrix}
-\omega_x\cdot q_1-\omega_y\cdot q_2-\omega_z\cdot q_3 \\
\omega_x\cdot q_0-\omega_y\cdot q_3+\omega_z\cdot q_2 \\
\omega_x\cdot q_3+\omega_y\cdot q_0-\omega_z\cdot q_1 \\
-\omega_x\cdot q_2+\omega_y\cdot q_1+\omega_z\cdot q_0
\end{bmatrix}
$$
设有大地坐标下的重力加速度$g$，将$g$通过姿态矩阵（坐标转换矩阵）的逆（意味着从地理坐标系 *R* 到机体坐标 *b* 系）变换到机体坐标系。
$$
\hat{\boldsymbol{v}}=C_R^b\cdot\mathbf{g}=(C_b^R)^{-1}\cdot
\begin{bmatrix}
0 \\
0 \\
1
\end{bmatrix}=
\begin{bmatrix}
2\left(q_1q_3-q_0q_2\right) \\
2\left(q_2q_3+q_0q_1\right) \\
1-2\left(q_1^2+q_2^2\right)
\end{bmatrix}=
\begin{bmatrix}
v_x \\
v_y \\
v_z
\end{bmatrix}
$$
其中，$\hat{\boldsymbol{v}}$表示在机体坐标系中的理论重力加速度向量，而从机体坐标系到地理坐标系的旋转矩阵$C_b^R$为：
$$
C_b^R=
\begin{bmatrix}
1-2(q_2^2+q_3^2) & 2(q_1q_2-q_0q_3) & 2(q_1q_3+q_0q_2) \\
2(q_1q_2+q_0q_3) & 1-2(q_1^2+q_3^2) & 2(q_2q_3-q_0q_1) \\
2(q_1q_3-q_0q_2) & 2(q_2q_3+q_0q_1) & 1-2(q_1^2+q_2^2)
\end{bmatrix}
$$
还可以通过加速度计测量出实际重力加速度向量$\overline{\boldsymbol{v}}$，这里的理论重力加速度向量$\hat{\boldsymbol{v}}$ 和实际重力加速度向量 之间必然存在偏差，而这个偏差很大程度上是由陀螺仪数据产生的角速度误差引起的，所以根据理论向量和实际向量间的偏差，就可以补偿陀螺仪数据的误差，进而解算出较为准确的姿态。

理论重力加速度向量和实际重力加速度向量均是向量，向量外积模的大小与向量夹角呈正相关，故通过计算外积来得到向量方向差值$\theta$
$$
|\boldsymbol{\rho}|=|\overline{\boldsymbol{v}}|\cdot|\hat{\boldsymbol{v}}|\cdot\sin\theta
$$
而在进行叉乘运算前，应先将两向量做单位化，因此
$$
|\rho|=\sin\theta
$$
又因为一般无人机姿态在小角度变化
$$
|\rho|=\theta
$$

>  [!Tip]
>
>  在官方代码中是直接计算外积的，一般的外积表示为$\vec{a}\times\vec{b}=[\vec{a}]_\times\cdot\vec{b}$

得到向量偏差后，即可通过构建PI补偿器来计算角速度补偿值：
$$
GyroError=K_P\cdot\mathrm{error}+K_I\cdot\int\mathrm{error} \cdot dT
$$
其中，比例项用于控制传感器的“可信度”，积分项用于消除静态误差。$K_p$越大，意味着通过加速度计得到误差后补偿越显著，即是越信任加速度计。反之$K_p$越小时，加速度计对陀螺仪的补偿作用越弱，也就越信任陀螺仪。而积分项则用于消除角速度测量值中的有偏噪声，故对于经过零篇矫正的角速度测量值，一般选取很小的$K_I$。最后将补偿值补偿给角速度测量值，带入四元数差分方程中即可更新当前四元数。

更新：
$$
Gyro+=GyroError
$$
然后更新四元数（使用PI修正后的 $\vec \omega$ ）
$$
\begin{bmatrix}
q_0 \\
q_1 \\
q_2 \\
q_3
\end{bmatrix}_{t+\Delta t}=
\begin{bmatrix}
q_0 \\
q_1 \\
q_2 \\
q_3
\end{bmatrix}_t+\frac{1}{2}\cdot\Delta t\cdot
\begin{bmatrix}
-\omega_x\cdot q_1-\omega_y\cdot q_2-\omega_z\cdot q_3 \\
\omega_x\cdot q_0-\omega_y\cdot q_3+\omega_z\cdot q_2 \\
\omega_x\cdot q_3+\omega_y\cdot q_0-\omega_z\cdot q_1 \\
-\omega_x\cdot q_2+\omega_y\cdot q_1+\omega_z\cdot q_0
\end{bmatrix}
$$

最后，基于四元数的姿态解算公式解算姿态
$$
\left\{
\begin{array}
{l}\theta=\arcsin[2(q_0q_2-q_1q_3)] \\
\gamma=\arctan\left(\frac{2q_0q_3+2q_1q_2}{1-2(q_2^2+q_3^2)}\right) \\
\psi=\arctan\left(\frac{2q_0q_1+2q_2q_3}{1-2(q_1^2+q_2^2)}\right)
\end{array}\right.
$$
