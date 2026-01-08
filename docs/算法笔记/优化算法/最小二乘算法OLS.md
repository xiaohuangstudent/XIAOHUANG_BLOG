# 一般最小二乘法（Least Squares Estimation）

## **算法结论**

### 元素形式

假设我们有一个线性系统：

$$
y(t) = \theta^T \varphi(t) = \varphi^T(t)\theta
$$

其中：

- $y(t)$：系统在时刻$t$的实际输出（观测值）
- $\varphi(t) = [u_1(t), u_2(t), \dots, u_m(t)]^T$：输入向量（回归向量），包含已知的输入或状态信息
- $\theta = [\theta_1, \theta_2, \dots, \theta_m]^T$：待估参数向量（未知）
- $\theta^T \varphi(t)$：模型预测输出

那么，最小均方误差时的参数值为

$$
\hat{\theta} = \left( \sum_{t=1}^{N} \varphi(t) \varphi^T(t) \right)^{-1} \sum_{t=1}^{N} \varphi(t) y(t)
$$

### 矩阵形式

假设我们有$N$组观测数据，每组包含一个输出标量$y(t)$和一个已知的输入（或回归）向量$\varphi(t) \in \mathbb{R}^p$（$p$是参数个数）。

我们假设系统模型为**线性**：

$$
y(t) = \varphi^T(t) \theta + \varepsilon(t), \quad t = 1, 2, \dots, N
$$

其中：

- $\theta \in \mathbb{R}^p$是**未知但恒定**的参数向量（待估计）；
- $\varepsilon(t)$是建模误差或噪声（暂不假设其统计特性）。

将所有数据堆叠成矩阵形式：

- 定义 **数据矩阵（回归矩阵）**：

  $$
    \Phi =
    \begin{bmatrix}
    \varphi^T(1) \\
    \varphi^T(2) \\
    \vdots \\
    \varphi^T(N)
    \end{bmatrix}
    \in \mathbb{R}^{N \times p}
  $$

- 定义 **输出向量**：

  $$
    Y =
    \begin{bmatrix}
    y(1) \\ y(2) \\ \vdots \\ y(N)
    \end{bmatrix}
    \in \mathbb{R}^{N}
  $$

- 定义 **误差向量**：
  $$
    e =
    \begin{bmatrix}
    \varepsilon(1) \\ \varepsilon(2) \\ \vdots \\ \varepsilon(N)
    \end{bmatrix}
    \in \mathbb{R}^{N}
  $$

则整个系统可写为：

$$
Y = \Phi \theta + e
$$

由于一般$N > p$（超定系统），方程通常**无精确解**。因此我们寻求使误差“最小”的$\theta$。

那么，最小均方误差时的参数值为

## 求解过程

### 方式 1 元素形式求解

**定义误差**

设第$t$个时刻的预测误差为：

$$
e(t) = \hat{y}(t|\theta) - y(t) = \theta^T \varphi(t) - y(t)
$$

其中，$\hat{y}(t|\theta)$是给定参数$\theta$下的预测输出。

---

**定义目标函数（代价函数）**

最小二乘法的目标是最小化所有时刻误差的平方和：

$$
V_N(\theta) = \frac{1}{N} \sum_{t=1}^{N} e^2(t) = \frac{1}{N} \sum_{t=1}^{N} \left( \theta^T \varphi(t) - y(t) \right)^2
$$

---

**求极值：对$\theta$求导并令导数为零**

计算梯度：

$$
\frac{\partial V_N(\theta)}{\partial \theta} = \frac{1}{N} \sum_{t=1}^{N} 2 e(t) \cdot \frac{\partial e(t)}{\partial \theta}
$$

由于：

$$
\frac{\partial e(t)}{\partial \theta} = \frac{\partial (\theta^T \varphi(t) - y(t))}{\partial \theta} = \varphi(t)
$$

所以：

$$
\frac{\partial V_N(\theta)}{\partial \theta} = \frac{2}{N} \sum_{t=1}^{N} e(t) \varphi(t)
= \frac{2}{N} \sum_{t=1}^{N} \left( \theta^T \varphi(t) - y(t) \right) \varphi(t)
$$

展开：

$$
= \frac{2}{N} \left[ \sum_{t=1}^{N} \left( \varphi(t) \varphi^T(t) \right) \theta - \sum_{t=1}^{N} y(t) \varphi(t) \right]
$$

令导数为 0，得：

$$
\sum_{t=1}^{N} \left( \varphi(t) \varphi^T(t) \right) \theta = \sum_{t=1}^{N} y(t) \varphi(t)
$$

---

**解出最优参数估计$\hat{\theta}$**

则上式可写为：

$$
\left( \sum_{t=1}^{N} \varphi(t) \varphi^T(t) \right) \theta = \sum_{t=1}^{N} y(t) \varphi(t)
\quad \Rightarrow \quad \Phi^T \Phi \theta = \Phi^T Y
$$

其中，$\Phi = \begin{bmatrix} \varphi(1)^T \\ \varphi(2)^T \\ \vdots \\ \varphi(N)^T \end{bmatrix}$：数据矩阵（$N \times m$）,$Y = \begin{bmatrix} y(1) \\ y(2) \\ \vdots \\ y(N) \end{bmatrix}$：输出向量（$N \times 1$）

因此，**最小二乘解为**：

$$
\hat{\theta} = \left( \Phi^T \Phi \right)^{-1} \Phi^T Y
$$

或者用符号表示：

$$
\hat{\theta} = \left( \sum_{t=1}^{N} \varphi(t) \varphi^T(t) \right)^{-1} \sum_{t=1}^{N} \varphi(t) y(t)
$$

也写作：

$$
\hat{\theta} = \left(\Phi^T \Phi \right)^{-1}\Phi^T Y
$$

### 方式 2 矩阵形式求解

**最小二乘目标**

定义**残差向量（预测误差）**为：

$$
r(\theta) = Y - \Phi \theta \in \mathbb{R}^N
$$

最小二乘法的目标是最小化残差的**欧几里得范数平方**（即平方和）：

$$
J(\theta) = \| r(\theta) \|^2 = (Y - \Phi \theta)^T (Y - \Phi \theta)
$$

这是一个关于$\theta$的**二次凸函数**，存在唯一全局最小值（只要$\Phi$列满秩）。

---

**求极小值：对$J(\theta)$求导**

展开目标函数：

$$
J(\theta) = Y^T Y - Y^T \Phi \theta - \theta^T \Phi^T Y + \theta^T \Phi^T \Phi \theta
$$

注意到$Y^T \Phi \theta$是标量，等于其转置$\theta^T \Phi^T Y$，所以：

$$
J(\theta) = Y^T Y - 2 \theta^T \Phi^T Y + \theta^T \Phi^T \Phi \theta
$$

现在对$\theta \in \mathbb{R}^p$求梯度（使用矩阵微分规则）：

- $\frac{\partial}{\partial \theta} (\theta^T A \theta) = (A + A^T)\theta$，若$A$对称，则为$2A\theta$
- $\frac{\partial}{\partial \theta} (b^T \theta) = b$

由于$\Phi^T \Phi$是对称矩阵，有：

$$
\nabla_\theta J(\theta) = -2 \Phi^T Y + 2 \Phi^T \Phi \theta
$$

令梯度为零（一阶必要条件）：

$$
-2 \Phi^T Y + 2 \Phi^T \Phi \theta = 0
$$

两边除以 2：

$$
\Phi^T \Phi \theta = \Phi^T Y
$$

这组方程称为 **正规方程（Normal Equations）**。

---

解出最优参数估计

若$\Phi^T \Phi$**可逆**（即$\Phi$列满秩，rank$(\Phi) = p$），则存在唯一解：

$$
\boxed{
\hat{\theta}_{\text{LS}} = (\Phi^T \Phi)^{-1} \Phi^T Y
}
$$

这就是**最小二乘估计的解析解**。

> [!Tip]
>
> 注：即使$\Phi^T \Phi$不可逆（如$p > N$或数据线性相关），也可用 Moore-Penrose 伪逆表示通解：
>
> $$
> \hat{\theta} = \Phi^\# Y = (\Phi^T \Phi)^\# \Phi^T Y
> $$
>
> 但此时解不唯一。
