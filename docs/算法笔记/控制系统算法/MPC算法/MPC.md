# MPC算法

## 增量式MPC

### 连续系统离散化

对于系统
$$
\begin{aligned}
 & \dot{x}(t)=A_{c}x(t)+B_{cu}u(t)+B_{cd}d(t), \\
 & y_{c}(t)=C_{c}x(t),
\end{aligned}
$$
将其离散化得到离散系统
$$
\begin{aligned}
x(k+1) & =Ax(k)+B_uu(k)+B_dd(k), \\
y_{c}(k) & =C_{c}x(k),
\end{aligned}
$$
其中，转换后的系数矩阵
$$
\begin{aligned}
\mathrm{A} & =\mathrm{e}^{A_cT_s}, \\
B_{u} & =\int_0^{T_s}\mathrm{e}^{A_c\tau}\mathrm{d}\tau\cdot B_{cu}, \\
B_{d} & =\int_0^{T_s}\mathrm{e}^{A_c\tau}\mathrm{d}\tau\cdot B_{cd},
\end{aligned}
$$
其中，$T_s$表示系统的采样时间

### 离散系统增量化矩阵化

将离散系统写成增量式
$$
\begin{aligned}
\Delta x(k+1) & =A\Delta x(k)+B_{u}\Delta u(k)+B_{d}\Delta d(k), \\
y_{c}(k) & =C_c\Delta x(k)+y_c(k-1),
\end{aligned}
$$
其中，
$$
\Delta x(k)=x(k)-x(k-1),\Delta u(k)=u(k)-u(k-1),\Delta d(k)=d(k)-d(k-1).
$$
进行$p$步预测，状态的$p$步预测表示为
$$
\begin{aligned}
  \Delta x(k+1|k)&=A\Delta x(k)\\
  &+B_u\Delta u(k)\\
  &+B_d\Delta d(k)\\
  \Delta x(k+2|k)&=A\Delta x(k+1|k)+B_u\Delta u(k+1)+B_d\Delta d(k+1) \\
 &=A^{2}\Delta x(k)\\
 &+AB_{u}\Delta u(k)+B_{u}\Delta u(k+1)\\
 &+AB_{d}\Delta d(k), \\
  \Delta x(k+3|k)&=A\Delta x(k+2|k)+B_u\Delta u(k+2)+B_d\Delta d(k+2) \\
 &=A^3\Delta x(k)\\
 &+A^2B_u\Delta u(k)+AB_u\Delta u(k+1)+B_{u}\Delta u(k+2)\\
 &+A^{2}B_{d}\Delta d(k).\\
 & \mathrm{:}\\
 \Delta x(k+m|k)& =A^m\Delta x(k)\\
 &+A^{m-1}B_u\Delta u(k)+A^{m-2}B_u\Delta u(k+1)+\cdots+B_u\Delta u(k+m-1)\\
 &+A^{m-1}B_d\Delta d(k), \\
 & \mathrm{:} \\
 \Delta x(k+p|k)&=A\Delta x(k+p-1|k)+B_u\Delta u(k+p-1)+B_d\Delta d(k+p-1) \\
 & =A^{p}\Delta x(k)\\
 &+A^{p-1}B_{u}\Delta u(k)+A^{p-2}B_{u}\Delta u(k+1)+\cdots+A^{p-m}B_{u}\Delta   u(k+m-1)\\
 &+A^{p-1}B_{d}\Delta d(k).
\end{aligned}
$$
输出的$p$步预测表示为
$$
\begin{aligned}
  y_{c}(k+1|k) & =C_{c}\Delta x(k+1|k)+y_{c}(k) \\
 & =C_{c}A\Delta x(k)\\
 &+C_{c}B_{u}\Delta u(k)\\
 &+C_{c}B_{d}\Delta d(k)\\
 &+y_{c}(k), \\
  y_{c}(k+2|k) & =C_c\Delta x(k+2|k)+y_c(k+1|k) \\
 & =(C_{c}A^{2}+C_{c}A)\Delta x(k)\\
 &+(C_{c}AB_{u}+C_{c}B_{u})\Delta u(k) \\
 & +C_cB_u\Delta u(k+1)+(C_cAB_d+C_cB_d)\Delta d(k)\\
 &+y_c(k) \\
 & \mathrm{:} \\
  y_{c}(k+m|k) & =C_c\Delta x(k+m|k)+y_c(k+m-1|k) \\
 & =\sum_{i=1}^mC_cA^i\Delta x(k)
 \\&+\sum_{i=1}^mC_cA^{i-1}B_u\Delta u(k)+\sum_{i=1}^{m-1}C_cA^{i-1}B_u\Delta u(k+1)+\cdots+C_cB_u\Delta u(k+m-1) \\
 & +\sum_{i=1}^mC_cA^{i-1}B_d\Delta d(k)\\
 &+y_c(k), \\
 & \mathrm{:} \\
  y_{c}(k+p|k) & =C_c\Delta x(k+p|k)+y_c(k+p-1|k) \\
 & =\sum_{i=1}^pC_cA^i\Delta x(k)\\
 &+\sum_{i=1}^pC_cA^{i-1}B_u\Delta u(k)+\sum_{i=1}^{p-1}C_{c}A^{i-1}B_{u}\Delta u(k+1)+\cdots+\sum_{i=1}^{p-m+1}C_{c}A^{i-1}B_{u}\Delta u(k+m-1) \\
 &+\sum_{i=1}^{p}C_{c}A^{i-1}B_{d}\Delta d(k)\\
 &+y_{c}(k).
\end{aligned}
$$
将输出的预测整理成如下形式
$$
Y_p(k+1|k)=\mathcal{S}_x\Delta x(k)+\mathcal{I}y_c(k)+\mathcal{S}_d\Delta d(k)+\mathcal{S}_u\Delta U(k)
$$
其中，控制量表示为$\left.\Delta U(k)\overset{\mathrm{def}}{\operatorname*{=}}\left[
\begin{array}
{c}\Delta u(k) \\
\Delta u(k+1) \\
\vdots \\
\Delta u(k+m-1)
\end{array}\right.\right]_{m\times1}$，输出量表示为$\left.Y_p(k+1|k)\overset{\mathrm{def}}{\operatorname*{=}}\left[
\begin{array}
{c}y_c(k+1|k) \\
y_c(k+2|k) \\
\vdots \\
y_c(k+p|k)
\end{array}\right.\right]_{p\times1}$

其中$\left.S_x=\left[
\begin{array}
{c}C_cA \\
 \\
\sum_{i=1}^2C_cA^i \\
 \\
\vdots \\
 \\
\sum_{i=1}^pC_cA^i
\end{array}\right.\right]_{p\times1}$，$\left.\mathcal{I}=\left[
\begin{array}
{c}I_{n_c\times n_c} \\
I_{n_c\times n_c} \\
\vdots \\
 \\
I_{n_c\times n_c}
\end{array}\right.\right]_{p\times1}$,$\left.S_d=\left[
\begin{array}
{c}C_cB_d \\
 \\
\sum_{i=1}^2C_cA^{i-1}B_d \\
 \\
\vdots \\
 \\
\sum_{i=1}^pC_cA^{i-1}B_d
\end{array}\right.\right]_{p\times1}$,$\left.S_{u}=\left[
\begin{array}
{ccccc}C_cB_u & \mathbf{0} & \mathbf{0} & \cdots & \mathbf{0} \\
 \\
\sum_{i=1}^2C_cA^{i-1}B_u & C_cB_u & \mathbf{0} & \cdots & \mathbf{0} \\
 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
 \\
\sum_{i=1}^mC_cA^{i-1}B_u & \sum_{i=1}^{m-1}C_cA^{i-1}B_u & \cdots & \cdots & C_cB_u \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
 \\
\sum_{i=1}^pC_cA^{i-1}B_u & \sum_{i=1}^{p-1}C_cA^{i-1}B_u & \cdots & \cdots & \sum_{i=1}^{p-m+1}C_cA^{i-1}B_u
\end{array}\right.\right]_{p\times m}$

### 无约束预测控制求解

使用矩阵表示输出与目标曲线
$$
\left.Y_p(k+1|k)\overset{\mathrm{def}}{\operatorname*{=}}\left[
\begin{array}
{c}y_c(k+1|k) \\
y_c(k+2|k) \\
\vdots \\
y_c(k+p|k)
\end{array}\right.\right]_{p\times1},R(k+1)=
\begin{bmatrix}
r(k+1) \\
r(k+2) \\
\vdots \\
r(k+p)
\end{bmatrix}_{p\times1}
$$
定义两个类型的误差权重
$$
\Gamma_{y}=\mathrm{diag}(\Gamma_{y,1},\Gamma_{y,2},\cdots,\Gamma_{y,p}),\Gamma_{u}=\mathrm{diag}(\Gamma_{u,1},\Gamma_{u,2},\cdots,\Gamma_{u,m}),
$$
定义目标函数第一部分设置为最小误差平方和
$$
J_1=\sum_{i=1}^p\sum_{j=1}^{n_c}\left(\Gamma_{y_j}(y_{cj}(k+i|k)-r_j(k+i))\right)^2
$$
其中，$r_j(k+i),i=1,2,\cdots,p$为参考的目标状态，$\Gamma_{y_{j}}$表示第$j$个元素的权重，将损失函数矩阵化有
$$
\begin{aligned}
J_1&=\sum_{i=1}^{p}\sum_{j=1}^{n_{c}}\left(\Gamma_{y_{j},i}(y_{cj}(k+i|k)-r_{j}(k+i))\right)^{2}\\
&=\sum_{i=1}^{p}\left\|\Gamma_{y,i}\left(y_{c}(k+i|k)-r(k+i)\right)\right\|^{2}\\
&=(\Gamma_{y}\left(Y_{p}(k+1|k)-R(k+1)\right))^T(\Gamma_{y}\left(Y_{p}(k+1|k)-R(k+1)\right))
\end{aligned}
$$
定义目标函数第二部分设置目标尽量让控制量的变化不要太大
$$
\begin{aligned}
J_2&=\sum_{i=1}^{m}\|\Gamma_{u,i}\Delta u(k+i-1)\|^{2}\\
&=(\Gamma_{u}\Delta U(k))^T\Gamma_{u}\Delta U(k)
\end{aligned}
$$
所以整体的目标函数表示为
$$
\begin{aligned}
J\left(x(k),\Delta U(k),m,p\right)&=\rho^\mathrm{T}\rho\\
&=J_1+J_2\\
&=(\Gamma_{y}\left(Y_{p}(k+1|k)-R(k+1)\right))^T(\Gamma_{y}\left(Y_{p}(k+1|k)-R(k+1)\right))+(\Gamma_{u}\Delta U(k))^T\Gamma_{u}\Delta U(k)\\
&=\left.\left[
\begin{array}
{c}\Gamma_y\left(Y_p(k+1|k)-R(k+1)\right) \\
\Gamma_u\Delta U(k)
\end{array}\right.\right]^T\left.\left[
\begin{array}
{c}\Gamma_y\left(Y_p(k+1|k)-R(k+1)\right) \\
\Gamma_u\Delta U(k)
\end{array}\right.\right]
\end{aligned}
$$
求解优化问题的解满足
$$
\frac{\mathrm{d}\rho^\mathrm{T}\rho}{\mathrm{d}z}=2\left(\frac{\mathrm{d}\rho}{\mathrm{d}z}\right)^\mathrm{T}\rho=0
$$
对于$\rho$​有
$$
\begin{aligned}
\rho &=\left.\left[
\begin{array}
{c}\Gamma_y\left(Y_p(k+1|k)-R(k+1)\right) \\
\Gamma_u\Delta U(k)
\end{array}\right.\right]\\
& =
\begin{bmatrix}
{\Gamma_{y}\left(\mathcal{S}_{x}\Delta x(k)+\mathcal{I}y_{c}(k)+\mathcal{S}_{d}\Delta d(k)+\mathcal{S}_{u}\Delta U(k)-R(k+1)\right)} \\
{\Gamma_{u}\Delta U(k)}
\end{bmatrix} \\
 & \left.=\left[
\begin{array}
{c}\Gamma_y\mathcal{S}_u \\
\Gamma_u
\end{array}\right.\right]\Delta U(k)\left.-\left[
\begin{array}
{c}\Gamma_y\overbrace{(R(k+1)-\mathcal{S}_x\Delta x(k)-\mathcal{I}y_c(k)-\mathcal{S}_d\Delta d(k))}^{E_p(k+1|k)} \\
\mathbf{0}
\end{array}\right.\right] \\
 & =\underbrace{
\begin{bmatrix}
\Gamma_{y}\mathcal{S}_{u} \\
 \\
\Gamma_{u}
\end{bmatrix}\Delta U(k)}_{Az}-\underbrace{
\begin{bmatrix}
\Gamma_{y}E_{p}(k+1|k) \\
 \\
\mathbf{0}
\end{bmatrix}}_{b} \\
 & =Az-b.
\end{aligned}
$$
因此
$$
\frac{\mathrm{d}\rho^\mathrm{T}\rho}{\mathrm{d}z}=2\left(\frac{\mathrm{d}\rho}{\mathrm{d}z}\right)^\mathrm{T}\rho=2A^\mathrm{T}(Az-b)=0
$$
又因为$\frac{\mathrm{d}^2(\rho^\mathrm{T}\rho)}{\mathrm{d}z^2}=2A^\mathrm{T}A>0$，所以极值为最小值。此时，自变量表示为
$$
z^*=(A^\mathrm{T}A)^{-1}A^\mathrm{T}b
$$
展开可得
$$
\Delta U^*(k)=\left(\mathcal{S}_u^\mathrm{T}\Gamma_y^\mathrm{T}\Gamma_y\mathcal{S}_u+\Gamma_u^\mathrm{T}\Gamma_u\right)^{-1}\mathcal{S}_u^\mathrm{T}\Gamma_y^\mathrm{T}\Gamma_yE_p(k+1|k)
$$

# 参考文献

[1] 陈虹著. 模型预测控制[M]. 北京：科学出版社, 2013
