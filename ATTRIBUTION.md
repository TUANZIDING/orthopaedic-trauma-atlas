# 来源、许可与改编记录

## 解剖网格

BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.

- 官方许可：https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html
- CC BY 4.0：https://creativecommons.org/licenses/by/4.0/
- 官方数据：https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- 数据版本：BodyParts3D 4.0，成人男性参考解剖。
- 中间来源：https://github.com/TUANZIDING/human-atlas
- 固定来源提交：1c38bf35c254a891200d3cedecfd57abebe83d8d
- human-atlas 原作者：ashemag；应用代码 MIT。

源项目已完成轴与单位变换、网格简化和二进制打包。本项目从其网格中提取下列 6 个结构，将坐标转成毫米并将 Y 原点设在原模型 0.93 m。双侧股骨在本地 Y = -145 mm 处平面裁切并封口，仅保留近端用于展示；该平面是显示裁切，不是骨折。

| ID | 结构 |
|---|---|
| FJ3152 | 右髋骨 |
| FJ3288 | 左髋骨 |
| FJ3393 | 骶骨 |
| FJ3168 | 第五腰椎 |
| FJ3259 | 左股骨近端 |
| FJ3365 | 右股骨近端 |

新增器械、骨内虚线、标注与风险几何是独立教学性示意。骨骼未按骨折变形；网格检查不等同临床通道安全、植入物适配或模型解剖精度认证。

## 医学来源

AO Surgery Reference — External fixation

https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/pelvic-ring/basic-technique/external-fixation

作者：Dankward Höntzsch；执行编辑：Steve Krikler。核对日期：2026-09-08。本站提供独立教学概括和改编，不代表 AO 官方制作、认证或认可。未分发 AO 原始图片、视频或网页全文。

## 软件

Three.js 0.159.0 及 OrbitControls：MIT。许可原文见 THIRD_PARTY_LICENSES.txt，亦嵌入 index.html 的末尾注释。用于构建的 esbuild 与 Playwright 不需要随网页加载。

## 教学图

导出的 PNG 包含上述解剖改编，保留其署名及 CC BY 4.0 来源；新增图示部分按 CC BY 4.0 提供。复用时应保留完整图注、来源和教学示意说明。
