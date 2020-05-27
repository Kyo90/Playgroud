/*
关键点分析

缩小遍历范围
右边界 right 的初始值取 x/2 的整数值，取大了没有意义，因为此时 x>=2，x 的平方根不会大于 x/2 的取整值

数值溢出问题
如果写 mid = (left+right)/2 可能会有问题：left+high 可能溢出，优化成 left+(right-left)/2，
并且我们希望 mid 为整数，因此再优化成：left+((right-left)>>1)

mid === x/mid 不写成 mid*mid === x 同样也是考虑到溢出

退出循环时的状态
left right mid一直都是整数，退出循环时，left和right是两个相邻的整数，继续求mid没有意义。
平方根不是left就是right，再判断一下即可。
*/

// 这里一定取右中位数，如果取左中位数，代码可能会进入死循环
