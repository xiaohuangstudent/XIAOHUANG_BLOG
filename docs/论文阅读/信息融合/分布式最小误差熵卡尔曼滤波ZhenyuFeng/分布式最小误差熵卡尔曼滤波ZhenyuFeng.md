# 分布式最小误差熵卡尔曼滤波ZhenyuFeng

《Distributed minimum error entropy Kalman filter》

文献链接：[Distributed minimum error entropy Kalman filter - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1566253522002251)

<img src="./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103220404886.png" alt="image-20260103220404886" style="zoom: 33%;" />

## 摘要

- 引入最小误差熵（高精度）：本文以WSN中的任意传感器作为融合节点，为其邻居信息融合构建动态增益矩阵。然后，将最小误差熵（MEE）进一步引入信息融合过程，提出一种名为分布式融合最小误差熵卡尔曼滤波器（DF-MEE-KF）的改进DKF算法，用于消除非高斯噪声的影响，从而很好地提高了估计精度。
- 应用扩散规则（低成本）：通过构建融合权重对节点信息进行融合时，应用了扩散规则，从而得到了一种扩展的DF-MEE-KF算法，即扩散最小均方误差卡尔曼滤波器（Diff-MEE-KF）
- 收敛性证明：证明了所提出的DF-MEE-KF和Diff-MEE-KF算法的收敛性。
- 数值仿真示例还表明，在非高斯噪声影响的无线传感器网络（WSN）应用中，DF-MEE-KF算法表现出良好的估计精度，而Diff-MEE-KF算法在相同的估计精度下实现了更低的通信成本

## 问题背景

### 现有要求

- 考虑到WSN（无线传感器网络）的许多恶劣通信条件，如通信拒绝环境和水下环境等。在声学通信环境中，要求估计精度越高越好，通信成本越低越好。

### 现有方案

- 集中式信息融合架构的问题：

  1. 估计精度受到任何节点故障的严重影响（其鲁棒性差）
  2. 难以扩展（灵活性较差）

  【因此提出了无线传感器网络（WSN）的分布式架构】

- 分布式架构的优点

  1. 分布式架构可以实现任意多传感器的去中心化信息融合，以获得当前的局部最优解。
  2. 每个传感器可以与其邻居节点点对点通信，与集中式架构相比，它可以提供更好的可扩展性、固有的冗余性和强大的鲁棒性
  3. 分布式架构使得在WSN中检测和隔离传感器故障变得容易

- 分布式卡尔曼滤波算法

  1. 已经很好地处理了高斯下的无线传感器网络，已有的方案如：

     - 基于均方误差（MSE）准则和分布式融合规则，提出了一种DKF算法，并很好地消除了WSNs中的高斯噪声影响
     - 通过引入扩散规则，进一步提出了基于MSE准则的扩散卡尔曼滤波器（Diff-KF）算法

     - 这些方案都有缺点：

       - 基于MSE准则的DKF和Diff-KF算法仅适用于处理高斯噪声，并且在抑制非高斯噪声方面表现不佳
       - 由非高斯噪声引起的异常奇异值无法通过MSE准则有效处理

       一个有效的方法是引入高斯核函数来处理异常奇异值问题

  2. 已经很好地处理了非高斯下的无线传感器网络，已有的方案如：

     - 通过引入最大相关准则（MCC），获得了一种改进的KF算法，在非高斯噪声存在时优于经典卡尔曼滤波器
     - 提出了一种分布式MCC卡尔曼滤波器（D-MCC-KF）算法，在具有非高斯噪声的WSNs情况下表现良好
     - 发现最小误差熵（MEE）准则比MCC更能有效处理非高斯噪声。将MEE准则引入到卡尔曼滤波器算法中，证明其性能优于MCC（进一步，王等人通过提出一种鲁棒的MEE卡尔曼滤波器算法，进一步完善了MEE卡尔曼滤波器）

## 本文的创新点

- 将最小误差熵（MEE）准则引入到DKF算法：进一步解决非高斯噪声下无线传感器网络（WSNs）的分布式信息融合问题
- 提出了一种扩展的DF-MEE-KF，称为扩散最小误差熵卡尔曼滤波器（Diff-MEE-KF）：考虑到WSNs的不良通信条件场景，通过应用扩散规则来构建融合权重
- 对比两个的优劣：DF-MEE-KF算法需要邻居之间更多的信息交互，其估计精度更高；Diff-MEE-KF实现了邻居之间较低的通信成本，尽管其估计精度有限

## 问题建模与MEE准则

### 问题描述

无线传感器网络可以由N个传感器节点进行建模。假设如果两个节点能够直接相互通信，则认为它们是连接的，并且每个节点也被认为与自己相连。对于任意节点k，将其及其邻居节点表示为一个节点集$N_k$

<img src="./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103013340011.png" alt="image-20260103013340011" style="zoom: 67%;" />

### WSN的离散时间线性卡尔曼模型

动态无线传感器网络的离散时间线性卡尔曼滤波系统为：
$$
x_i=F_{i-1}x_{i-1}+q_i\:,\:y_{k,i}=H_{k,i}x_i+r_{k,i}\:
$$
过程噪声和量测噪声的协方差矩阵分别为$Q_i,R_{k,i}$：
$$
\begin{aligned}&E\left\{q_iq_j^T\right\}=Q_i\delta_{ij},\\&E\left\{r_{k,i}r_{k,j}^{T}\right\}=R_{k,i}\delta_{ij},\end{aligned}
$$
其中，$\delta$表示狄拉克函数，即：
$$
\delta \left( x \right) =\begin{cases}
	R\,\, ,x\ne 0\\
	0   ,otherwise\\
\end{cases}\,\,and \int_{-\infty}^{\infty}{\delta (x)dx}=1
$$
同时，传感器网络中每个节点的状态和测量值及其相应参数是相互独立的。因此，我们可以做出如下假设：
$$
E\left\{q_{i}r_{k,j}^{T}\right\}=0_{n\times m},\\E\left\{q_{i}y_{k,j}^{T}\right\}=0_{n\times m},\\E\left\{r_{k,i}x_{j}^{T}\right\}=0_{m\times n}.
$$

### 最小误差熵准则

最小误差熵（MEE）准则旨在减少误差中的信息量。使用Renyi熵来计算两个随机变量状态$x$和估计值$\psi(y)$的误差信息：
$$
e=x-\psi(y)
$$
因此，MEE表示为
$$
H_{\alpha}(e)=\frac{1}{1-\alpha}\log V_{\alpha}(e)\:,
$$
其中，$V_{\alpha}(e)$代表信息势$V_{\alpha}(e)=\int p^{\alpha}(x)dx$，$p^{\alpha}(\cdot)$为误差e的概率密度函数，在实际情况下使用Parzen窗口技术（核密度估计，经典的非参估计）来估计PDF：
$$
\hat{p}(x)=\frac{1}{n}\sum_{i=1}^{n}G_{\sigma}\left(x-e_{i}\right)
$$
其中，$\{e_{i}\}_{i=1}^{n}$是n个误差样本，高斯核定义为$G_{\sigma}(x)=\frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{x^{2}}{2\sigma^{2}}\right)\:,$​。因此，信息势可以写为：
$$
V_\alpha(e)=\frac{1}{n}\sum_{i=1}^n\hat{p}\left(e_i\right)=\frac{1}{n^2}\sum_{i=1}^n\sum_{j=1}^nG_\sigma\left(e_i-e_j\right)
$$
因为负对数函数单调递减，因此，要最小化误差熵$H_{2}(e)$，就要最大化信息势$\widehat{V}_{a}(e)$

> [!Tip]
>
> Renyi熵是Alfred Renyi于1961年对香农熵的一种推广。
>
> 1. 如果香农熵为0，意味着随机变量只有一个可能的结果（概率为1），没有任何不确定性。
> 2. 香农熵越大，表示随机变量的取值分布越均匀，不确定性越高。
>
> - 香农熵表示为
>
> $$
> H(X)=-\:\mathbb{E}\log P(X)
> $$
>
> 类似的，对于联合随机变量$(X,Y)\sim P_{XY}$，其联合熵，条件熵，互信息分别为：
> $$
> \text{联合熵}:H(X,Y)=-\underset{XY}{\operatorname*{\mathbb{E}}}\log P(X,Y)\\\text{条件熵}:H(Y|X)=-\underset{XY}{\operatorname*{\mathbb{E}}}\log P(Y|X)\\\text{互信息}:I(X;Y)=-\underset{XY}{\operatorname*{\mathbb{E}}}\log\frac{P(X)P(Y)}{P(X,Y)}
> $$
> 香农熵对应的相对熵（K-L divergence）为$D(P||Q)=\mathbb{E}_{XY}\log\frac{P(X)}{Q(X)}$
>
> 简记为：
> $$
> \begin{aligned}H(X)&=-D(P_X||1)\\H(X,Y)&=-D(P_{XY}||1)\\H(Y|X)&=-D(P_{XY}||P_X)\\I(X;Y)&=D(P_{XY}||P_XP_Y)\end{aligned}
> $$
>
> - $\alpha$阶的Renyi熵定义为：
>
> $$
> H_{\alpha}(X)=-\frac{1}{\alpha-1}\mathrm{log}\:\mathbb{E}\:P(X)^{\alpha-1}
> $$
>
> 可以将$\alpha -1$记作$s$，则有：
> $$
> H_{1+s}(X)=-\frac{1}{s}\mathrm{log}\:\mathbb{E}\:P(X)^{s}
> $$
>
> > [!Tip]
> >
> > 证明：Rényi 熵的定义为：
> > $$
> > H_{1+s}(X)=-\frac1s\log\left(\mathbb{E}_X[P(X)^s]\right)=-\frac1s\log\left(\sum_xp(x)^{1+s}\right)
> > $$
> > 当 s->0 时，使用洛必达：
> > $$
> > \lim_{s\to0}H_{1+s}(X)=-\lim_{s\to0}\frac{\sum_xp(x)^{1+s}\log p(x)}{\sum_xp(x)^{1+s}}
> > $$
> > 代入s=0 ,分母为1，因此，上式为$-\sum_xp(x)\log p(x)$，与香农表达式一致
>
> 当参数$s$趋近于零时，Renyi熵退化为香农熵
> $$
> \lim_{s\to0}H_{1+s}(X)=H(X)
> $$
> 同时，Renyi熵是$s$的单减函数。
>
> <img src="./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103015912709.png" alt="image-20260103015912709" style="zoom:33%;" />

> [!Tip]
>
> parzen 窗
>
> - 在每个数据点处放置一个**核函数（窗函数）**
> - 将所有核函数叠加并归一化，得到连续的概率密度估计
> - 类似于“用数据点的模糊影子拼出真实分布”
>
> 描述：给定独立同分布的样本$X_1,X_2,...,X_n$,概率密度函数 $p(x)$Parzen 窗估计为：
> $$
> \hat{p}_h(x)=\frac1n\sum_{i=1}^nK_h(x-X_i)=\frac1{nh}\sum_{i=1}^nK\left(\frac{x-X_i}h\right)
> $$

## DF-MEE-KF算法及其收敛性

### 分布式融合最小误差熵卡尔曼滤波器算法的推导

#### 模型构建

基于动态无线传感器网络（WSN）的传感器网络模型，对于WSN中的任意融合节点k，由该融合节点及其邻居节点形成一个局部网络$N_k$。局部网络$N_k$​在信息融合后的参数用上标C标记，即
$$
\begin{aligned}&y_{i}^{C}=\left[y_{1,i}^{T};y_{2,i}^{T};\ldots;y_{N,i}^{T}\right]^{T},\\&r_{i}^{C}=\left[r_{1,i}^{T};r_{2,i}^{T};\ldots;r_{N,i}^{T}\right]^{T},\\&H_{i}^{C}=\left[H_{1,i}^{T};H_{2,i}^{T};\ldots;H_{N,i}^{T}\right]^{T}.\end{aligned}
$$
测量值的融合协方差$R_i^{C}$表示为：
$$
R_{i}^{C}=\mathrm{diag}\left[R_{1,i},R_{2,i},\ldots,R_{N,i}\right]。
$$
因此，信息融合后的DF-MEE-KF问题的状态空间模型最终可写为：
$$
x_{i}=F_{i-1}x_{i-1}+q_{i}\:,\:y_{i}^{C}=H_{i}^{C}x_{i}+r_{i}^{C}\:
$$
因此，估计误差就有
$$
\varepsilon_{i}^{C}=x_{i}-\widehat{x}_{i}^{C}
$$
其中，$\widehat{x}_{i}^{C}$为在时刻i通过DF-MEE-KF算法得到的局部网络$N_k$的融合估计。因此，根据一般卡尔曼公式：
$$
\begin{aligned}&\widehat{x}_{i|i-1}^{C}=F_{i}\widehat{x}_{i-1}^{C},\\&P_{i|i-1}^{C}=F_{i}P_{i-1}^{C}F_{i}^{T}+Q_{i},\\&P_{i-1}^{C}=E\left\{\varepsilon_{i-1}^{C}\left(\varepsilon_{i-1}^{C}\right)^{T}\right\}.\end{aligned}
$$
重构融合状态空间模型（参考R-MEEKF算法），可以获得融合节点k及其邻居的融合状态空间增广模型，如下所示：
$$
\left[\begin{array}{c}\widehat{x}_{i|i-1}^C\\y_i^C\end{array}\right]=\left[\begin{array}{c}I\\H_i^C\end{array}\right]x_i+\left[\begin{array}{c}-\left(x_i-\widehat{x}_{i|i-1}^C\right)\\r_i^C\end{array}\right]
$$
我们定义一个增广噪声$g_i^C=\left[\begin{array}{c}-\left(x_i-\widehat{x}_{i|i-1}^C\right)\\r_i^C\end{array}\right]$

因此增广噪声的协方差矩阵$E\left\{g_i^C\left(g_i^C\right)^T\right\}$​（正定阵）可以进行如下Cholesky分解：
$$
\left.E\left\{g_{i}^{C}\left(g_{i}^{C}\right)^{T}\right\}=\left[\begin{array}{cc}P_{i|i-1}^{C}&0\\0&R_{i}^{C}\end{array}\right.\right]\\=\left[\begin{array}{cc}B_{P,i}^C\left(B_{P,i}^C\right)^T&0\\0&B_{r,i}^C\left(B_{r,i}^C\right)^T\end{array}\right]\\=B_{i}^{C}\left(B_{i}^{C}\right)^{T}.
$$

> [!Tip]
>
> **Cholesky分解**（Cholesky decomposition）是将一个对称正定矩阵分解为一个下三角矩阵和其转置的乘积的方法：
> $$
> A=LL^T
> $$
> 其中,$\begin{aligned}&\bullet A\text{ 是 }n\times n\text{ 的对称正定矩阵}\\&\bullet L\text{ 是 }n\times n\text{ 的下三角矩阵(对角元为正})\\&\bullet L^T\text{ 是 }L\text{ 的转置(上三角矩阵)}\end{aligned}$
>
> 分解流程：
>
> - 对角线元素(i=j)：
>
>   由于，$a_{ii}=\sum_{k=1}^il_{ik}^2=l_{i1}^2+l_{i2}^2+\cdots+l_{i,i-1}^2+l_{ii}^2$​,因此：
>   $$
>   l_{ii}=\sqrt{a_{ii}-\sum_{k=1}^{i-1}l_{ik}^2}
>   $$
>
> - 非对角线元素（下三角,i>j）
>
>   由于，$a_{ij}=\sum_{k=1}^jl_{ik}l_{jk}=\sum_{k=1}^{j-1}l_{ik}l_{jk}+l_{ij}l_{jj}$，因此：
>   $$
>   l_{ij}=\frac1{l_{jj}}\left(a_{ij}-\sum_{k=1}^{j-1}l_{ik}l_{jk}\right)\quad(i>j)
>   $$

进一步，将融合状态空间增广模型两边同时左乘$\left(B_{i}^{C}\right)^{-1}$​，从而重构融合状态空间增广模型如下：
$$
D_i^C=W_i^Cx_i+e_i^C
$$
其中，
$$
\left.\left.\begin{aligned}&D_{i}^{C}=\left(B_{i}^{C}\right)^{-1}\left[\begin{array}{c}\widehat{x}_{i|i-1}^{C}\\y_{i}^{C}\end{array}\right]\left.,W_{i}^{C}=\left(B_{i}^{C}\right)^{-1}\left[\begin{array}{c}{I}\\{{H_{i}^{C}}}\end{array}\right.\right]\\&e_{i}^{C}=\left(B_{i}^{C}\right)^{-1}\left[\begin{array}{c}-\left(x_{i}-\widehat{x}_{i|i-1}^{C}\right)\\r_{i}^{C}\end{array}\right].\end{aligned}\right.\right.
$$
那么此时就有
$$
E\left\{e_{i}^{C}\left(e_{i}^{C}\right)^{T}\right\}=I
$$
残差误差$e_i^C$​是白噪声。因此，DF-MEE-KF 问题的代价函数表示为：
$$
J_L\left(x_i\right)=\frac{1}{L^2}\sum_{u=1}^L\sum_{v=1}^LG_\sigma\left(e_i^C(u)-e_i^C(v)\right)
$$
其中，$L=n+m$是最小误差熵准则窗口长度。$e_i^C(u)=d_i^C(u)-w_i^C(u)x_i$，这里$e_{i}^{C}(u),d_{i}^{C}(u),\:w_{i}^{C}(u)$分别是$e_i^C,D_i^C,W_i^C$的第u行。

> [!Tip]
>
> 对矩阵维数的阐述：
> $$
> \begin{aligned}&\bullet\:W_i^C\text{ 是 }L\times n\text{ 的矩阵 }(\mathrm{L}=\mathrm{n}+\mathrm{m})\\&\bullet\:w_i^C(u)\text{ 是 }W_i^C\text{ 的第 }u\text{ 行,是一个 }1\text{xn 的行向量}\\&\bullet\:x_i\text{ 是 }n\times1\text{ 的列向量}\\&\bullet\text{ 因此: }w_i^C(u)x_i\text{ 是 标量(行向量乘以列向量)}\\&\bullet\text{ 所以: }e_i^C(u)=d_i^C(u)-w_i^C(u)x_i\text{ 是 标量}\end{aligned}
> $$

#### 优化求解

通过最大化代价函数可以得到由DF-MEE-KF算法计算出的最优融合估计：
$$
\begin{aligned}\widehat{x}_{i}^{C}&=\underset{x_{i}}{\operatorname*{argmax}}J_{L}\left(x_{i}\right)\\&=\underset{x_{i}}{\operatorname*{argmax}}\frac{1}{L^{2}}\sum^{L}\sum^{L}G_{\sigma}\left(e_{i}^{C}(u)-e_{i}^{C}(u)\right)\end{aligned}
$$
求偏导有：
$$
\frac{\partial}{\partial x_i}J_L\left(x_i\right)=\frac{2}{L\sigma^2}\left(W_i^C\right)^T\Psi_i^Ce_i^C-\frac{2}{L\sigma^2}\left(W_i^C\right)^T\Phi_i^Ce_i^C
$$

> [!warning]
>
> 论文中的分母有问题不应该是$L\sigma^2$而应该是$L^2\sigma^2$,下文有证明。

其中，
$$
\begin{bmatrix}\Phi_i^C\end{bmatrix}_{uv}=G_\sigma\left(e_i^C(u)-e_i^C(v)\right),u,v=1,2,\ldots,L,
$$

$$
\left.\left[\Psi_i^C\right]_{uv}=\left\{\begin{array}{c}\sum_{j=1}^LG_\sigma\left(e_i^C(u)-e_i^C(j)\right),u=v\\0,u\neq v,u,v=1,2,\ldots,L\end{array}\right.\right.,
$$

> [!Tip]
>
> 偏导$\frac{\partial}{\partial x_i}J_L\left(x_i\right)$求解证明过程
>
> 代价函数为：
> $$
> J_L(x_i)=\frac1{L^2}\sum_{u=1}^L\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))
> $$
> 其中：$\begin{aligned}&\bullet\:e_i^C(u)=d_i^C(u)-w_i^C(u)x_i\\&\bullet\:w_i^C(u)\text{ 是矩阵 }W_i^C\text{ 的第 }u\text{ 行(行向量)}\\&\bullet\:x_i\text{ 是待估计的 }n\times1\text{ 状态向量}\\&\bullet\:G_\sigma(z)=\frac1{\sqrt{2\pi}\sigma}\exp\left(-\frac{z^2}{2\sigma^2}\right)\text{是高斯核函数}\end{aligned}$
>
> - 高斯核求偏导有：
>   $$
>   \frac{\partial G_\sigma(z)}{\partial z}=G_\sigma(z)\cdot\left(-\frac z{\sigma^2}\right)
>   $$
>
> - 由于$e_i^C(u)=d_i^C(u)-w_i^C(u)x_i$,因此，又有对单个核函数求导$\frac\partial{\partial x_i}G_\sigma(e_i^C(u)-e_i^C(v))$有
>   $$
>   \begin{aligned}
>   \frac\partial{\partial x_i}G_\sigma(e_i^C(u)-e_i^C(v))&=G_\sigma(e_i^C(u)-e_i^C(v))\cdot\left(-\frac{e_i^C(u)-e_i^C(v)}{\sigma^2}\right)\cdot\left(-[w_i^C(u)]^T+[w_i^C(v)]^T\right)\\
>   &=\frac1{\sigma^2}G_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))\cdot\left([w_i^C(u)]^T-[w_i^C(v)]^T\right)
>   \end{aligned}
>   $$
>
> - 因此
>   $$
>   \begin{aligned}
>   \frac{\partial}{\partial x_i}J_L\left(x_i\right)&=\frac1{L^2}\sum_{u=1}^L\sum_{v=1}^L\frac1{\sigma^2}G_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))\cdot\left([w_i^C(u)]^T-[w_i^C(v)]^T\right)\\
>   &=\frac1{L^2\sigma^2}\sum_{u=1}^L\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))\cdot\left([w_i^C(u)]^T-[w_i^C(v)]^T\right)
>   \end{aligned}
>   $$
>
> - 现在将其使用矩阵形式转换
>   $$
>   \begin{bmatrix}\Phi_i^C\end{bmatrix}_{uv}=G_\sigma\left(e_i^C(u)-e_i^C(v)\right),u,v=1,2,\ldots,L,
>   $$
>
>   $$
>   \left.\left[\Psi_i^C\right]_{uv}=\left\{\begin{array}{c}\sum_{j=1}^LG_\sigma\left(e_i^C(u)-e_i^C(j)\right),u=v\\0,u\neq v,u,v=1,2,\ldots,L\end{array}\right.\right.,
>   $$
>
>   即：对于
>   $$
>   \begin{aligned}
>   I_1&=
>   \sum_{u=1}^L\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))\cdot[w_i^C(u)]^T\\
>   &=\sum_{u=1}^L[w_i^C(u)]^T\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))
>   \end{aligned}
>   $$
>
>   > [!Tip]
>   >
>   > $G_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))$是标量
>
>   记
>   $$
>   a_u=\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))
>   $$
>   则
>   $$
>   \begin{aligned}
>   I_1
>   &=\sum_{u=1}^L[w_i^C(u)]^T\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))\\
>   &=(W_i^C)^Ta
>   \end{aligned}
>   $$
>
>   > [!Tip]
>   >
>   > 对于$a_u=\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))$
>   >
>   > 由于，偶函数$G_\sigma(z)=G_\sigma(-z)$
>   >
>   > $G_\sigma(v-u)\cdot(v-u)=-G_\sigma(u-v)\cdot(u-v)$
>   >
>   > 那么
>   > $$
>   > \begin{aligned}
>   > a_v&=\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))\\
>   > &=-a_u
>   > \end{aligned}
>   > $$
>
>   同理
>   $$
>   \begin{aligned}
>   I_2&=
>   -\sum_{u=1}^L\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))\cdot[w_i^C(v)]^T\\
>   &=-\sum_{v=1}^L[w_i^C(v)]^T\sum_{u=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))\\
>   &=(W_i^C)^Ta
>   \end{aligned}
>   $$
>   因此，
>   $$
>   \frac{\partial J_L(x_i)}{\partial x_i}=\frac1{L^2\sigma^2}\left[(W_i^C)^Ta-(-(W_i^C)^Ta)\right]=\frac2{L^2\sigma^2}(W_i^C)^Ta
>   $$
>   其中，$a=[a_1,a_2,\ldots,a_L]^T$,$a_u=\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))$
>
>   原文中：
>   $$
>   \begin{aligned}
>   \frac{\partial}{\partial x_i} J_L(x_i) &= \frac{2}{L\sigma^2} (W_i^C)^T \Psi_i^C e_i^C - \frac{2}{L\sigma^2} (W_i^C)^T \Phi_i^C e_i^C \\
>   [\Phi_i^C]_{uv} &= G_\sigma(e_i^C(u) - e_i^C(v)), \quad u,v = 1,2,\ldots, L, \\
>   [\Psi_i^C]_{uv} &= 
>   \begin{cases} 
>   \sum_{j=1}^L G_\sigma(e_i^C(u) - e_i^C(j)), & u = v, \\
>   0, & u \neq v,
>   \end{cases} \quad u,v = 1,2,\ldots, L.
>   \end{aligned}
>   $$
>   现在只需证明$a=\Psi_i^Ce_i^C-\Phi_i^Ce_i^C$(向量=向量)即可，$a_n$​有
>   $$
>   \begin{aligned}
>   a_u&=\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot(e_i^C(u)-e_i^C(v))\\
>   &=\sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot e_i^C(u)- \sum_{v=1}^LG_\sigma(e_i^C(u)-e_i^C(v))\cdot e_i^C(v)
>   \end{aligned}
>   $$
>   因为：
>   $$
>   \Psi_i^Ce_i^C=\begin{bmatrix}\left(\sum_{j=1}^LG_\sigma(e_i^C(1)-e_i^C(j))\right)e_i^C(1)\\\vdots\\\left(\sum_{j=1}^LG_\sigma(e_i^C(L)-e_i^C(j))\right)e_i^C(L)\end{bmatrix}
>   $$
>
>   $$
>   \Phi_i^Ce_i^C=\begin{bmatrix}\sum_{v=1}^LG_\sigma(e_i^C(1)-e_i^C(v))e_i^C(v)\\\vdots\\\sum_{v=1}^LG_\sigma(e_i^C(L)-e_i^C(v))e_i^C(v)\end{bmatrix}
>   $$
>
>   因此，证毕。

令偏导为0，因此可以得到偏导公式证明$\widehat{x}_i^C$的递推表达式有：
$$
\begin{aligned}&\widehat{x}_{i}^{C}=f\left(\widehat{x}_{i}^{C}\right)\\&=\left[\left(W_{i}^{C}\right)^{T}\Lambda_{i}^{C}W_{i}^{C}\right]^{-1}\left(W_{i}^{C}\right)^{T}\Lambda_{i}^{C}D_{i}^{C},\end{aligned}
$$
其中，$\Lambda_i^C$​一般为为正定矩阵，有：
$$
\Lambda_i^C=\left[\begin{array}{cc}\Lambda_i^x&\Lambda_i^{yx}\\\Lambda_i^{xy}&\Lambda_i^y\end{array}\right]
$$

> [!Tip]
>
> 递推式证明：
>
> 令偏导为零：
>
> $$
> \frac{2}{L^2\sigma^2}(W_i^C)^T(\Psi_i^C - \Phi_i^C)e_i^C = 0
> $$
>
> 忽略非零常数因子，等价于：
>
> $$
> (W_i^C)^T(\Psi_i^C - \Phi_i^C)e_i^C = 0
> $$
>
> 代入 $e_i^C = D_i^C - W_i^C x_i$：
>
> $$
> (W_i^C)^T(\Psi_i^C - \Phi_i^C)(D_i^C - W_i^C x_i) = 0
> $$
>
> 整理得：
> $$
> (W_i^C)^T(\Psi_i^C - \Phi_i^C)W_i^C x_i = (W_i^C)^T(\Psi_i^C - \Phi_i^C)D_i^C
> $$
> 假设矩阵$(W_i^C)^T(\Psi_i^C-\Phi_i^C)W_i^C$​可逆，可得：
> $$
> x_i=\begin{bmatrix}(W_i^C)^T(\Psi_i^C-\Phi_i^C)W_i^C\end{bmatrix}^{-1}(W_i^C)^T(\Psi_i^C-\Phi_i^C)D_i^C
> $$
> 因此，
> $$
> \Lambda_i^C=\left[\begin{array}{cc}\Lambda_i^x&\Lambda_i^{yx}\\\Lambda_i^{xy}&\Lambda_i^y\end{array}\right]=\Psi_i^C-\Phi_i^C
> $$

其中，代入递推表达式得到：
$$
\left.\begin{aligned}&\left(W_{i}^{C}\right)^{T}\Lambda_{i}^{C}W_{i}^{C}=\\&\left[\begin{array}{l}\overline{P}_{i|i-1}^x\\+\left(H_i^C\right)^T\overline{P}_{i|i-1}^{xy}\end{array}\right]+\left[\begin{array}{l}\overline{P}_{i|i-1}^{yx}\\+\left(H_i^C\right)^T\overline{P}_{i|i-1}^y\end{array}\right]IH_i^C,\\&\left(W_i^C\right)^T\Lambda_i^CD_i^C=\\&\left[\begin{array}{l}\overline{P}_{i|i-1}^x\widehat{x}_{i|i-1}^C\\+\left(H_i^C\right)^T\overline{P}_{i|i-1}^{yy}\end{array}\right]\widehat{x}_{i|i-1}^C+\left[\begin{array}{l}\overline{P}_{i|i-1}^{yx}\\+\left(H_i^C\right)^T\overline{P}_{i|i-1}^y\end{array}\right]y_i^C,\end{aligned}\right.
$$
其中，
$$
\overline{P}_{i|i-1}^{x}=\left(\left(B_{P,i}^{C}\right)^{-1}\right)^{T}\Lambda_{i}^{x}\left(B_{P,i}^{C}\right)^{-1},\\\overline{P}_{i|i-1}^{xy}=\left(\left(B_{r,i}^{C}\right)^{-1}\right)^{T}\Lambda_{i}^{xy}\left(B_{P,i}^{C}\right)^{-1},\\\overline{P}_{i|i-1}^{xx}=\left(\left(B_{P,i}^{C}\right)^{-1}\right)^{T}\Lambda_{i}^{yx}\left(B_{r,i}^{C}\right)^{-1},\\\overline{P}_{i|i-1}^{y}=\left(\left(B_{r,i}^{C}\right)^{-1}\right)^{T}\Lambda_{i}^{y}\left(B_{r,i}^{C}\right)^{-1}.
$$
> [!Tip]
>
> 上式的递推表达式的具体推导过程：
>
> 由于
> $$
> \left.\left.\begin{aligned}&D_{i}^{C}=\left(B_{i}^{C}\right)^{-1}\left[\begin{array}{c}\widehat{x}_{i|i-1}^{C}\\y_{i}^{C}\end{array}\right]\left.,W_{i}^{C}=\left(B_{i}^{C}\right)^{-1}\left[\begin{array}{c}{I}\\{{H_{i}^{C}}}\end{array}\right.\right]\\&e_{i}^{C}=\left(B_{i}^{C}\right)^{-1}\left[\begin{array}{c}-\left(x_{i}-\widehat{x}_{i|i-1}^{C}\right)\\r_{i}^{C}\end{array}\right].\\
> &\Lambda_i^C=\left[\begin{array}{cc}\Lambda_i^x&\Lambda_i^{yx}\\\Lambda_i^{xy}&\Lambda_i^y\end{array}\right]=\Psi_i^C-\Phi_i^C
> \end{aligned}\right.\right.
> $$
> 因此，**对于 $(W_i^C)^T \Lambda_i^C W_i^C$**
>
> 将 $W_i^C$ 分块为上下两部分：
>
> $$
> W_i^C = 
> \begin{bmatrix}
> W_i^{C,1} \\
> W_i^{C,2}
> \end{bmatrix}, \quad W_i^{C,1} = (B_{P,i}^C)^{-1}, \quad W_i^{C,2} = (B_{r,i}^C)^{-1} H_i^C
> $$
>
> 则：
>
> $$
> (W_i^C)^T \Lambda_i^C W_i^C = 
> \begin{bmatrix}
> (W_i^{C,1})^T & (W_i^{C,2})^T
> \end{bmatrix}
> \begin{bmatrix}
> \Lambda_i^x & \Lambda_i^{xy} \\
> \Lambda_i^{yx} & \Lambda_i^{y}
> \end{bmatrix}
> \begin{bmatrix}
> W_i^{C,1} \\
> W_i^{C,2}
> \end{bmatrix}
> $$
>
> 展开矩阵乘法：
>
> $$
> \begin{aligned}
> (W_i^C)^T \Lambda_i^C W_i^C &= (W_i^{C,1})^T \Lambda_i^x W_i^{C,1} + (W_i^{C,1})^T \Lambda_i^{xy} W_i^{C,2} \\
> &\quad + (W_i^{C,2})^T \Lambda_i^{yx} W_i^{C,1} + (W_i^{C,2})^T \Lambda_i^{y} W_i^{C,2}
> \end{aligned}
> $$
>
> 代入 $W_i^{C,1}$ 和 $W_i^{C,2}$：
>
> - 第一项：
>
> $$
> (W_i^{C,1})^T \Lambda_i^x W_i^{C,1} = ((B_{P,i}^C)^{-1})^T \Lambda_i^x (B_{P,i}^C)^{-1} = P_{i|i-1}^x
> $$
>
> - 第二项：
>
> $$
> (W_i^{C,1})^T \Lambda_i^{xy} W_i^{C,2} = ((B_{P,i}^C)^{-1})^T \Lambda_i^{xy} (B_{P,i}^C)^{-1} H_i^C = P_{i|i-1}^{xy} H_i^C
> $$
>
> - 第三项：
>
> $$
> (W_i^{C,2})^T \Lambda_i^{yx} W_i^{C,1} = (H_i^C)^T ((B_{P,i}^C)^{-1})^T \Lambda_i^{yx} (B_{P,i}^C)^{-1} = (H_i^C)^T P_{i|i-1}^{yx}
> $$
>
> - 第四项：
>
> $$
> (W_i^{C,2})^T \Lambda_i^{y} W_i^{C,2} = (H_i^C)^T ((B_{P,i}^C)^{-1})^T \Lambda_i^{y} (B_{P,i}^C)^{-1} H_i^C = (H_i^C)^T P_{i|i-1}^{y} H_i^C
> $$
>
> 合并所有项：
> $$
> \begin{aligned}
> (W_i^C)^T \Lambda_i^C W_i^C &= P_{i|i-1}^{x} + P_{i|i-1}^{xy} H_i^C + (H_i^C)^T P_{i|i-1}^{yx} + (H_i^C)^T P_{i|i-1}^{y} H_i^C
> \end{aligned}
> $$
> 因此论文中写成：
> $$
> \left[\begin{array}{l}\overline{P}_{i|i-1}^x\\+\left(H_i^C\right)^T\overline{P}_{i|i-1}^{xy}\end{array}\right]+\left[\begin{array}{l}\overline{P}_{i|i-1}^{yx}\\+\left(H_i^C\right)^T\overline{P}_{i|i-1}^y\end{array}\right]IH_i^C
> $$
> **对于 $(W_i^C)^T \Lambda_i^C D_i^C$**
> $$
> (W_i^C)^T \Lambda_i^C D_i^C = 
> \begin{bmatrix}
> (W_i^{C,1})^T & (W_i^{C,2})^T
> \end{bmatrix}
> \begin{bmatrix}
> \Lambda_i^x & \Lambda_i^{xy} \\
> \Lambda_i^{yx} & \Lambda_i^{y}
> \end{bmatrix}
> \begin{bmatrix}
> (B_{P,i}^C)^{-1} \tilde{x}_{i|i-1}^C \\
> (B_{r,i}^C)^{-1} y_i^C
> \end{bmatrix}
> $$
>
> 展开矩阵乘法：
>
> $$
> \begin{aligned}
> (W_i^C)^T \Lambda_i^C D_i^C &= (W_i^{C,1})^T \Lambda_i^x (B_{P,i}^C)^{-1} \tilde{x}_{i|i-1}^C \\
> &\quad + (W_i^{C,1})^T \Lambda_i^{xy} (B_{r,i}^C)^{-1} y_i^C \\
> &\quad + (W_i^{C,2})^T \Lambda_i^{yx} (B_{P,i}^C)^{-1} \tilde{x}_{i|i-1}^C \\
> &\quad + (W_i^{C,2})^T \Lambda_i^{y} (B_{r,i}^C)^{-1} y_i^C
> \end{aligned}
> $$
>
> 代入 $W_i^{C,1}$ 和 $W_i^{C,2}$ 的表达式：
>
> - 第一项：
>
> $$
> ((B_{P,i}^C)^{-1})^T \Lambda_i^x (B_{P,i}^C)^{-1} \tilde{x}_{i|i-1}^C = \overline{P}_{i|i-1}^x \tilde{x}_{i|i-1}^C
> $$
>
> - 第二项：
>
> $$
> ((B_{P,i}^C)^{-1})^T \Lambda_i^{xy} (B_{r,i}^C)^{-1} y_i^C = \overline{P}_{i|i-1}^{xy} y_i^C
> $$
>
> - 第三项：
>
> $$
> (H_i^C)^T ((B_{r,i}^C)^{-1})^T \Lambda_i^{yx} (B_{P,i}^C)^{-1} \tilde{x}_{i|i-1}^C = (H_i^C)^T \overline{P}_{i|i-1}^{yx} \tilde{x}_{i|i-1}^C
> $$
>
> - 第四项：
>
> $$
> (H_i^C)^T ((B_{r,i}^C)^{-1})^T \Lambda_i^{y} (B_{r,i}^C)^{-1} y_i^C = (H_i^C)^T \overline{P}_{i|i-1}^{y} y_i^C
> $$
>
> 合并所有项：
>
> $$
> \begin{aligned}
> (W_i^C)^T \Lambda_i^C D_i^C &= \left( \overline{P}_{i|i-1}^x + (H_i^C)^T \overline{P}_{i|i-1}^{yx} \right) \tilde{x}_{i|i-1}^C \\
> &\quad + \left( \overline{P}_{i|i-1}^{xy} + (H_i^C)^T \overline{P}_{i|i-1}^{y} \right) y_i^C
> \end{aligned}
> $$
> 因此论文中写成：
> $$
> \left[\begin{array}{l}\overline{P}_{i|i-1}^x\widehat{x}_{i|i-1}^C\\+\left(H_i^C\right)^T\overline{P}_{i|i-1}^{yy}\end{array}\right]\widehat{x}_{i|i-1}^C+\left[\begin{array}{l}\overline{P}_{i|i-1}^{yx}\\+\left(H_i^C\right)^T\overline{P}_{i|i-1}^y\end{array}\right]y_i^C
> $$

然后，根据矩阵求逆引理，
$$
(A+BID)^{-1}=A^{-1}-A^{-1}B\left(I+DA^{-1}B\right)^{-1}DA^{-1},
$$
并设定以下等式
$$
\begin{aligned}&A=\overline{P}_{i|i-1}^{x}+\left(H_{i}^{C}\right)^{T}\overline{P}_{i|i-1}^{xy},\\&B=\overline{P}_{i|i-1}^{yx}+\left(H_{i}^{C}\right)^{T}\overline{P}_{i|i-1}^{y},\\&D=H_{i}^{C}.\end{aligned}
$$
最终可以得到DF-MEE-KF算法融合估计的估算递归公式如下：
$$
\begin{aligned}\widehat{x}_{i}^{C}=&\left[\left(W_{i}^{C}\right)^{T}\Lambda_{i}^{C}W_{i}^{C}\right]^{-1}\left(W_{i}^{C}\right)^{T}\Lambda_{i}^{C}D_{i}^{C}\\&=\Delta_i\left(A\widehat{x}_{i|i-1}^C+By_i^C\right),\end{aligned}
$$
其中，
$$
\Delta_i=\left[\left(W_i^C\right)^T\Lambda_i^CW_i\right]^{-1},\Omega_i=\left[\overline P_{i|i-1}^x+\left(H_i^C\right)^T\overline P_{i|i-1}^{xy}\right]^{-1}=A^{-1}
$$
又有
$$
\Delta_{i}=\Omega_{i}-\overline{K}_{i}^{C}H_{i}^{C}\Omega_{i}
$$
其中，$\overline{K}_{i}^{C}=A^{-1}B\left(I+H_{i}^{C}A^{-1}B\right)^{-1}.$

因此，
$$
\Omega_iB=\overline{K}_i^C\left(I+H_i^C\Omega_iB\right).
$$
可得
$$
\begin{array}{c}\Delta_iB=\Omega_iB-\overline{K}_i^CH_i^C\Omega_iB\\=\overline{K}_i^C\left(I+H_i^C\Omega_iB\right)-\overline{K}_i^CH_i^C\Omega_iB\\=\overline{K}_i^C.\end{array}
$$
到此，可以将迭代式写为：
$$
\begin{aligned}\widehat{x}_{i}^{C}&=\Delta_{i}A\widehat{x}_{i|i-1}^{C}+\left(\Delta_{i}B\right)y_{i}^{C}\\&=\Delta_{i}A\widehat{x}_{i|i-1}^{C}+\overline{K}_{i}^{C}y_{i}^{C}\\&=\left(\Omega_{i}A-\overline{K}_{i}^{C}H_{i}^{C}\Omega_{i}A\right)\widehat{x}_{i|i-1}^{C}+\overline{K}_{i}^{C}y_{i}^{C}\\&=\left(I-\overline{K}_{i}^{C}H_{i}^{C}\right)\widehat{x}_{i|i-1}^{C}+\overline{K}_{i}^{C}y_{i}^{C}.\end{aligned}
$$
进行化简有：
$$
\widehat x_i^C=\widehat x_{i|i-1}^C+\overline K_i^C\left(y_i^C-H_i^C\widehat x_{i|i-1}^C\right)
$$
其中，$\overline{K}_i^C=A^{-1}B\left(I+H_i^CA^{-1}B\right)^{-1}$

后验估计协方差矩阵可以通过以下方式更新：
$$
P_i^C=\left(I-\overline{K}_i^CH_i^C\right)P_{i|i-1}^C\left(I-\overline{K}_i^CH_i^C\right)^T+\overline{K}_i^CR_i^C\left(\overline{K}_i^C\right)^T
$$
通过这一系列的推导，我们最终可以总结DF-MEE-KF算法过程如下：

<img src="./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103115428994.png" alt="image-20260103115428994" style="zoom:67%;" />

### DF-MEE-KF算法的收敛性分析

分布式融合估计误差表示为：
$$
\varepsilon_i^C=x_i-\widehat{x}_i^C
$$
根据卡尔曼证明过程可得
$$
\varepsilon_{i}^{C}=\left(I-\bar{K}_{i}^{C}H_{i}^{C}\right)F_{i-1}\varepsilon_{i-1}^{C}+\left(I-\bar{K}_{i}^{C}H_{i}^{C}\right)q_{i}-\bar{K}_{i}^{C}r_{i}^{C}
$$
其中，$q_i$与$r_i^C$​是零均值。因此，期望有：
$$
E\left\{\varepsilon_{i}^{C}\right\}=\left(I-\bar{K}_{i}^{C}H_{i}^{C}\right)F_{i-1}E\left\{\varepsilon_{i-1}^{C}\right\}
$$
其中，通常状态矩阵$F_{i-1}$与$H_i^C$是稳定的，否则状态变量将会发散，因此认为$\Lambda_{i}^{C}$是正定的，因此矩阵$\overline{K}_i^C$是稳定的。因此表达式表明该算法是稳定的，并以无偏的方式工作。

而估计误差协方差矩阵可以表示为：
$$
\begin{aligned}E\left\{\varepsilon_{i}^{C}\left(\varepsilon_{i}^{C}\right)^{T}\right\}=&\Gamma_{i}E\left\{\varepsilon_{i-1}^{C}\left(\varepsilon_{i-1}^{C}\right)^{T}\right\}\Gamma_{i}^{T}+\left(I-\bar{K}_{i}^{C}H_{i}^{C}\right)Q_{i}\left(I-\bar{K}_{i}^{C}H_{i}^{C}\right)^{T}\\&+\bar{K}_{i}^{C}R_{i}^{C}\left(\bar{K}_{i}^{C}\right)^{T}\end{aligned}
$$
其中：
$$
\Gamma_{i}=\begin{pmatrix}I-\bar{K}_{i}^{C}H_{i}^{C}\end{pmatrix}F_{i-1}.
$$
令
$$
\Xi_{i}=\mathrm{E}\Big\{\varepsilon_{i}^{C}\Big(\varepsilon_{i}^{C}\Big)^{T}\Big\},\varphi_{i}=\Big(I-K_{i}^{C}H_{i}^{C}\Big)\mathbf{Q}_{i}\Big(I-\overline{K}_{i}^{C}H_{i}^{C}\Big)^{T}+\overline{K}_{i}^{C}R_{i}^{C}\Big(\overline{K}_{i}^{C}\Big)^{T},
$$
估计误差协方差矩阵可以重写为
$$
\Xi_i=\Gamma_i\Xi_{i-1}\Gamma_i^T+\varphi_i
$$
在时不变系统下，卡尔曼增益$\overline{K}_i^C$​也是时不变的，因此下方几个公式都是时不变的
$$
\operatorname*{lim}_{i\to\infty}\Xi_{i}=\Xi,\\\operatorname*{lim}_{i\to\infty}\varphi_{i}=\varphi,\\\operatorname*{lim}_{i\to\infty}\Gamma_{i}=\Gamma.
$$
因此，可以简化为一个实数离散时间李雅普诺夫方程，表示为

$\Xi=\Gamma\Xi\Gamma^{T}+\varphi\:,$

其封闭形式解为
$$
\mathrm{Vec}(\Xi)=\left(I-\Gamma\otimes\Gamma^T\right)^{-1}+\mathrm{Vec}(\varphi)
$$
因此，根据均方误差行为和均值误差行为分析，所提出的DF-MEE-KF算法最终被证明是收敛的

## 从DF-MEE-KF推广Diff-MEE-KF算法，及其收敛性

### 扩散最小二乘扩展卡尔曼滤波器推导

考虑到在恶劣通信条件下，无线传感器网络的非高斯噪声影响信息融合，每个局部节点无法与其邻居节点过多地交换信息。因此，DF-MEE-KF算法不再适用，它只能简化为一个单节点算法，不融合邻居节点的信息。

- DF-MEE-KF：在每个融合节点，它融合来自其邻居节点的信息（测量值、噪声协方差、观测矩阵）以构建一个增广模型，然后应用MEE准则进行状态估计。它需要邻居节点之间交换更多的信息（如$y_i^C, r_i^C, H_i^C$），因此通信成本较高，但估计精度更高。**在局部网络内实现了一个“小型的集中式滤波器”。**

- Diff-MEE-KF：是DF-MEE-KF的扩展，通过应用扩散规则来降低通信成本。在恶劣通信条件下，节点可能无法交换大量信息。在Diff-MEE-KF中，每个节点首先使用仅基于本地信息的简化DF-MEE-KF（即单节点版本，不融合邻居信息）计算一个局部估计。然后，通过扩散规则，融合节点结合其邻居的局部估计（而不是原始测量数据）来产生扩散估计。这样，通信成本较低，因为**节点之间只交换局部估计值（向量）**，而不是原始测量数据、噪声协方差和观测矩阵。但估计精度可能较低。

每个节点 k*k* 使用自身的测量值运行简化的DF-MEE-KF（即单节点MEE-KF），得到局部状态估计$\widehat{x}_{k,i}$
$$
\widehat{x}_{k,i}=\widehat{x}_{k,i|i-1}+K_{k,i}\begin{pmatrix}y_{k,i}-H_{k,i}\widehat{x}_{k,i|i-1}\end{pmatrix}
$$
$\widehat{x}_{k,i|i-1},K_{k,i}$分别是第 k 个节点的先验一步预测和卡尔曼增益。它们由简化的 DF-MEE-KF 算法给出，该算法仅依赖于局部单节点信息。

然后，每个节点将其局部估计发送给邻居，并按照扩散规则融合邻居的局部估计，得到扩散估计，即
$$
\widehat{x}_i^\mathrm{Diff}=\sum_{k\in N_k}c_{k,i}\widehat{x}_{k,i}
$$
$\widehat{x}_i^\mathrm{Diff},\widehat{x}_{k,i}$分别表示融合节点的扩散估计和其第 k 个邻居的局部估计。

根据扩散规则，$c_{k,i}$表示第 k 个邻居节点对应的融合权重，并满足：
$$
\sum_{k\in N_k}c_{k,i}=I_n,c_{k,i}=0\:\mathrm{for}k\notin N_k,\forall k,i
$$
第k个节点的估计协方差$P_{k,i}$:
$$
P_{k,i}=(I-K_{k,i}H_{k,i})\begin{pmatrix}F_{i-1}P_{k,i-1}F_{i-1}^T+Q_i\end{pmatrix}(I-K_{k,i}H_{l,i})^T+K_{k,i}R_{k,i}K_{k,i}^T.
$$
可以推导出$P_{k,i}\propto(Q_i+R_{k,i})\:,$因此，$\mathrm{Tr}\left(P_{k,i}\right)$可应用于作为每个局部节点的最优权重，通过设置融合邻居的估计值$\widehat{x}_{k,i}$
$$
c_{k,i}=\frac{1/\operatorname{Tr}(P_{k,i})}{\sum_{k\in N_k}1/\operatorname{Tr}(P_{k,i})}
$$
对于估计误差有：$\bullet\text{ 局部估计误差:}\epsilon_{k,i}=x_i-\hat{x}_{k,i}\\\bullet\text{ 扩散估计误差:}e_i^{\mathrm{Diff}}=x_i-\hat{x}_i^{\mathrm{Diff}}$

最终，扩散最小均方误差卡尔曼滤波算法（Diff-MEE-KF）过程可概括如下：

<img src="./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103130603151.png" alt="image-20260103130603151" style="zoom:50%;" />

### Diff-MEE-KF收敛性证明

Diff-MEE-KF的收敛性**直接依赖于DF-MEE-KF的稳定性**。

基本假设

- 定义扩散估计误差
  $$
  e_i^{\mathrm{Diff}}=x_i-\hat{x}_i^{\mathrm{Diff}}=\sum_{k\in N_k}c_{k,i}(x_i-\hat{x}_{k,i})=\sum_{k\in N_k}c_{k,i}\epsilon_{k,i}
  $$
  其中，$\epsilon_{k,i}=x_i-\hat{x}_{k,i}$ 是第k个局部节点的估计误差。

- 利用凸组合性质

  由于扩散权重满足$\sum_{k\in N_k}c_{k,i}=I_n$且$c_{k,i}\geq0$，扩散估计是局部估计的**凸组合**。

为证明Diff-MEE-KF的收敛性，需要以下假设：

**假设1（局部稳定性）**：对于每个节点 $$ k $$，单节点DF-MEE-KF（即MEE-KF）产生的估计误差满足：

- (a) 均值渐近无偏：$$\lim_{i \to \infty} E[e_{k,i}] = 0$$。
- (b) 误差协方差渐近稳定：存在正定矩阵 $$ P_k $$，使得 $$\lim_{i \to \infty} P_{k,i} = P_k$$，其中 $$P_{k,i} = E[e_{k,i} e_{k,i}^{T}]$$，且存在一致上界 $$P$$ 使得 $$P_{k,i} \preceq P$$ 对所有 $$i$$ 成立。

**假设2（权重性质）**：扩散权重 $$c_{k,i}$$ 是非负的，且满足 $$\sum_{k \in N_k} c_{k,i} = 1$$（若为标量权重，则对每个状态分量相同；若为矩阵权重，则满足矩阵和为单位阵）。进一步，当 $$i \to \infty$$ 时，权重收敛到常数：$$c_{k,i} \to c_k$$。

**假设3（误差不相关性）**：不同节点的局部估计误差互不相关，即对于任意 $$k \neq l$$，有：
$$
E[e_{k,i} e_{l,i}^{T}] = 0.
$$

该假设在节点噪声独立且通信及时的情况下合理。

> 注：假设1中DF-MEE-KF的收敛性已在论文第3.2节证明，此处作为已知条件。

**均值收敛分析**
$$
\mathbb{E}[e_i^\mathrm{Diff}]=\mathbb{E}\left[\sum_{k\in\mathcal{N}_k}c_{k,i}\epsilon_{k,i}\right]=\sum_{k\in\mathcal{N}_k}c_{k,i}\mathbb{E}[\epsilon_{k,i}]
$$
由于DF-MEE-KF已证明$\mathbb{E}\{\epsilon_{k,i}\}\to0$（无偏性），且
$$
\|\mathbb{E}\{e_i^{\mathrm{Diff}}\}\|\leq\sum_{k\in N_k}\|c_{k,i}\|\cdot\|\mathbb{E}\{\epsilon_{k,i}\}\|\leq\varepsilon\sum_{k\in\mathcal{N}_k}c_{k,i}=\varepsilon
$$
因此，扩散估计的**均值误差不大于最差局部估计的均值误差**,即扩散估计是渐近无偏的。

扩散估计误差的协方差矩阵为：
$$
P_i^{\mathrm{Diff}}=\mathbb{E}[e_i^{\mathrm{Diff}}(e_i^{\mathrm{Diff}})^T]=\mathbb{E}\left[\left(\sum_{k\in\mathcal{N}_k}c_{k,i}\epsilon_{k,i}\right)\left(\sum_{l\in\mathcal{N}_k}c_{l,i}\epsilon_{l,i}\right)^T\right]
$$
展开并利用假设3（误差不相关）：
$$
P_i^{\mathrm{Diff}}=\sum_{k\in\mathcal{N}_k}\sum_{l\in\mathcal{N}_k}c_{k,i}c_{l,i}\mathbb{E}[\epsilon_{k,i}\epsilon_{l,i}^T]=\sum_{k\in\mathcal{N}_k}c_{k,i}^2\mathbb{E}[\epsilon_{k,i}\epsilon_{k,i}^T]=\sum_{k\in\mathcal{N}_k}c_{k,i}^2P_{k,i}.
$$
其中，$P_{k,i}=\mathbb{E}[\epsilon_{k,i}\epsilon_{k,i}^{T}]$.

由假设$(b)$，当 $i \to \infty$ 时，$P_{k,i} \to P_k$，且 $P_{k,i} \preceq \bar{P}$。由假设2，$c_{k,i} \to c_k$。因此：

$$
\lim_{i \to \infty} P_i^{\text{Diff}} = \sum_{k \in N_k} c_k^2 P_k.
$$

下面证明该极限协方差有界。由于 $0 \leq c_k \leq 1$，有 $c_k^2 \leq c_k$。于是：

$$
\sum_{k \in N_k} c_k^2 P_k \preceq \sum_{k \in N_k} c_k \bar{P} = \bar{P} \sum_{k \in N_k} c_k = \bar{P}.
$$

这里利用了 $\sum_{k} c_k = 1$。因此，极限协方差矩阵满足：

$$
\lim_{i \to \infty} P_i^{\text{Diff}} \preceq \bar{P}.
$$

即在正定矩阵意义下，扩散估计的误差协方差有上界 $\bar{P}$，且趋于稳定值。

## 数值模拟结果与对比试验



在接下来的实验中，我们比较了五种算法的闭式解的稳态均方偏差（MSD），这五种算法分别是局部R-MEEKF[34]、CKF[11]、D-MCCKF[33]以及提出的DF-MEE-KF和Diff-MEE-KF算法，考虑了非高斯噪声的影响。所有仿真点都是在500次独立运行上取平均得到的，样本长度为 $L = 500$。自适应解的稳态MSD性能通过下式估计：

$$
MSD = \lim_{i \to \infty} E \left\{ \| x_i - \hat{x}_i \|_2^2 \right\},
$$

其中 $\hat{x}_i$ 和 $x_i$ 分别是算法的估计值和真实状态值。动态WSN局部传感器的类型如图1所示，节点1被视为局部传感器网络的信息融合节点，节点2和节点3是其邻居节点。

在实施仿真之前，高斯噪声和三种典型非高斯噪声模型（混合高斯噪声、α-稳定噪声和混合瑞利噪声）如下所示：

- 高斯噪声建模为：

$$
q \sim \mathcal{N}(\mu, \Sigma),
$$

其中，$\mathcal{N}(\mu, \Sigma)$ 表示均值为 $\mu$，方差为 $\Sigma$ 的正态分布。

- 混合高斯噪声模型建模如下

$$
r \sim \lambda \mathcal{N}(\mu, \Sigma_1) + (1 - \lambda) \mathcal{N}(\mu, \Sigma_2),
$$

其中，$\lambda$ 代表两个高斯噪声的混合系数。服从混合高斯分布的噪声表示为 $r \sim M(\lambda, \mu, \Sigma_1, \Sigma_2)$。

- α-稳定噪声的特征函数：

$$
\varphi(t) = \exp \{ j \omega t - \gamma |t|^a [1 + jb \text{ sign}(t) S(t, a)] \},
$$

其中

$$
S(t, a) = 
\begin{cases} 
\tan \left( \frac{a\pi}{2} \right), & a \neq 1, \\
\frac{2}{\pi} \log |t|, & a = 1.
\end{cases}
$$

这里，参数$a$代表特征因子，$b$表示对称参数，$\gamma$代表色散参数，而$\omega$表示位置参数。服从α-稳定分布的噪声写作$r \sim S(a, b, \gamma, \omega)$。

- 瑞利分布的概率密度函数如[37]所示。

$$
u(t) = \frac{t}{\sigma^2} \exp \left( -\frac{t^2}{2\sigma^2} \right).
$$

这里，瑞利分布定义为$r \sim R(\sigma)$，那么混合瑞利噪声表示为

$$
r \sim \lambda aR(\sigma) + (1 - \lambda)bR(\sigma),
$$

服从混合瑞利分布的噪声写作$r \sim U(\lambda, \sigma, a, b)$。

为了尽可能充分验证所提出算法的有效性和稳定性，接下来给出了两个例子，一个是线性系统，另一个是对自动驾驶的跟踪。如下表所列，在这两个例子中考虑了不同的状态和测量噪声。

| 噪声类型         | 具体描述                         |
| ---------------- | -------------------------------- |
| **状态高斯噪声** | g₁ ~ A(0, 0.1)                   |
| **测量噪声**     |                                  |
| 高斯噪声         | F₁, F₂, F₃ ~ A(0, 1)             |
| 混合高斯噪声     | F₁, F₂, F₃ ~ M(0.99, 0, 0.1, 10) |
| α-稳定噪声       | F₁, F₂, F₃ ~ S(1, 2, 1, 0, 0.5)  |
| 混合瑞利噪声     | F₁, F₂, F₃ ~ U(0.99, 1, 0.1, 10) |

### 线性系统

$$
x_i = 
\begin{bmatrix}
\cos(\theta) & -\sin(\theta) \\
\sin(\theta) & \cos(\theta)
\end{bmatrix} 
x_{i-1} + q_i, \quad y_{k,i} = 
\begin{bmatrix}
1 & 1
\end{bmatrix}_{k,i} x_i + r_{k,i},
$$

其中 $\theta = \frac{\pi}{18}$，状态噪声和测量噪声如表1所示。该模型的初始值设定如下：

$$
\begin{cases}
x_0 \sim \mathcal{N}(0, I_n), \\
\tilde{x}_{1,0}, \tilde{x}_{2,0}, \tilde{x}_{3,0} \sim \mathcal{N}(x_0, I_n), \\
P_{1,0}, P_{2,0}, P_{3,0} = I_n.
\end{cases}
\tag{72}
$$

阈值设定为 $\epsilon = 10^{-6}$。在图2中，通过将高斯噪声作为状态噪声和测量噪声，展示了融合节点1的 $Tr(P_1)$ 在不同噪声下的变化性。已知 $Tr(P_1)$ 显然与测量噪声成正比，横坐标代表通过 $[1, 1000] \times N(0, 0.01)$ 计算的测量噪声。因此，

$$
1/Tr(P_k), k \in N_k
$$

可用于构建基于扩散规则的Diff-MEE-KF算法的融合权重。然后，图3展示了DF-MEE-KF和Diff-MEE-KF算法在高斯噪声场景下的鲁棒性，所有算法的核带宽 $\sigma = 100$。

随后，图4展示了两种提出算法在混合高斯噪声下的性能表现。图4是D-MEE-KF、DF-MEE-KF和Diff-MEE-KF算法在不同核带宽 $\sigma = [0.05, 15]$ 下的比较。从图4可知，当 $\sigma < 3.2$ 时，DF-MEE-KF算法的估计稳定MSD优于Diff-MEE-KF和D-MEEKF算法。因此，在图5中，通过将所有算法的核带宽设置为 $\sigma = 1$，可以显示提出算法在混合高斯噪声场景下的优越性。

此外，图6展示了两种提出算法在α-稳定噪声下的性能表现，所有算法的核带宽设为 $\sigma = 1$。图7展示了在混合瑞利噪声下，两种提出算法的性能表现，所有算法的核带宽 $\sigma = 1$。它们都验证了提出算法在相应非高斯噪声场景中的优越性。

| 图表                                                         | 分析                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20260103215549591](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103215549591.png) | 高斯噪声下协方差迹的变化：通过展示融合节点1的协方差矩阵迹（Tr(P₁)）随高斯测量噪声强度的变化，验证了Tr(Pₖ)与噪声功率的正相关性。此结果为Diff-MEE-KF算法中基于Tr(Pₖ)构造融合权重的合理性提供依据（见公式(58)），证明权重设计可有效反映节点估计精度。 |
| ![image-20260103215557039](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103215557039.png) | 高斯噪声下算法对比：在高斯噪声环境下，DF-MEE-KF（分布式融合）和Diff-MEE-KF（扩散策略）均表现出与经典卡尔曼滤波（CKF）相近的估计精度，说明MEE准则在高斯场景下未引入性能损失。同时，DF-MEE-KF因融合更多邻居信息略优于Diff-MEE-KF。 |
| ![image-20260103215607063](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103215607063.png) | 图4显示当核带宽σ<3.2时，DF-MEE-KF的稳态均方偏差（MSD）显著优于Diff-MEE-KF和单节点MEE-KF，证明分布式融合在非高斯噪声下的优势。 |
| ![image-20260103215614679](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103215614679.png) | 图5（固定σ=1）进一步表明DF-MEE-KF对脉冲型混合高斯噪声的抑制能力最强，因其动态增益矩阵融合了多节点信息，提升了鲁棒性。 |
| ![image-20260103215621860](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103215621860.png) | α-稳定噪声下：DF-MEE-KF均保持最低MSD，凸显MEE准则对复杂非高斯噪声的普适性。 |
| ![image-20260103215630864](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103215630864.png) | 混合瑞利噪声下：DF-MEE-KF均保持最低MSD，凸显MEE准则对复杂非高斯噪声的普适性。Diff-MEE-KF虽精度略低，但通过扩散策略大幅降低通信成本（见表2），在带宽受限场景中展现实用性。 |

### 自动驾驶跟踪案例

一个实际示例是使用卡尔曼滤波（KF）算法进行自动驾驶跟踪的进一步展示[25, 33, 36, 37]。对于被跟踪的车辆，其状态可以用一个四维向量 $x_i$ 来描述，即

$$
x_i = [p_x(i), p_y(i), v_x(i), v_y(i)]^T,
$$

其中 $p_x(i)$ 和 $p_y(i)$ 表示 x 和 y 坐标的位置信息；$v_x(i)$ 和 $v_y(i)$ 是相应的速度信息。对于节点的测量值，测量值

$$
y_{k,i} = [p_{k,x}(i), p_{k,y}(i)],
$$

其中 $p_{k,x}(i)$ 和 $p_{k,y}(i)$ 代表相应的位置信息测量值。因此，状态方程表示为

$$
x_i =
\begin{bmatrix}
1 & 0 & \Delta T & 0 \\
0 & 1 & 0 & \Delta T \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
x_{i-1} + q_i,
$$

$$
y_{k,i} =
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
\end{bmatrix}
x_i + r_{k,i},
$$

其中，$\Delta T = 0.1$ 秒是时间间隔，状态噪声 $q_i$ 和测量噪声 $r_{k,i}$，$k = 1, 2, 3$ 如表1所示。该模型的初始值与线性系统示例相同，阈值设为 $\varepsilon = 10^{-6}$。

首先，考虑到混合高斯噪声，如图8所示，比较了节点1的实际路径和带有混合高斯噪声的测量路径，混合高斯噪声严重影响了测量精度。

同样地，比较算法可以观察到，由于高斯核函数，不同的高斯核宽度 $\sigma$ 显然会影响算法的性能。因此，在图9中，我们比较了在混合高斯噪声下，不同 $\sigma = [0.05, 15]$ 值的三种算法的估计精度。而图10展示了所提出的DF-MEE-KF和Diff-MEE-KF算法的性能。

| 图表                                                         | 分析                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20260103223137850](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103223137850.png) | 显示混合高斯噪声导致节点1的量测路径严重偏离真实轨迹，凸显非高斯噪声的实际影响。 |
| ![image-20260103223145109](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103223145109.png) | 核带宽对MSD的影响                                            |
| ![image-20260103223851270](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103223851270.png) | Diff-MEE-KF以约64.3%的通信代价降低（见表2）实现可接受的精度损失，适用于水下通信等带宽受限场景。 |
| ![image-20260103223152015](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103223152015.png) | 混合高斯噪声下：DF-MEE-KF具有最高估计精度，                  |
| ![image-20260103223407515](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103223407515.png) | α-稳定噪声下：DF-MEE-KF具有最高估计精度，Diff-MEE-KF在通信成本与精度间取得平衡 |
| ![image-20260103223417379](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103223417379.png) | 混合瑞利噪声下：DF-MEE-KF具有最高估计精度，                  |
| ![image-20260103223429147](./分布式最小误差熵卡尔曼滤波ZhenyuFeng_localdata/image-20260103223429147.png) | 验证算法在高斯噪声下的无害性，体现MEE准则的泛化能力。        |

