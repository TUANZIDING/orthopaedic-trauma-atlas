# 胫骨结节骨牵引 · 神经血管 V2.1

本版本为独立新增版本，不覆盖原版。直接打开 index.html，可离线使用，保留原有操作流程和参数。新增神经血管区域提供中英文结构清单、逐项风险解释、高亮、分层开关和4K图导出。骨盆版原有一般界面的部分内容仍仅为中文；本次新增神经血管区域及其导出图支持完整中英切换。

## 展示内容

腓总神经绕腓骨颈走行；胫神经及腘动静脉位于后方。避免将骨后空间误认为空白区，入口、方向、出口需一起核对。

The common fibular nerve winds around the fibular neck; tibial nerve and popliteal vessels lie posteriorly. The space behind the bone is not empty; assess entry, direction and exit together.

## 使用边界

参考血管网格与示意神经混合展示；神经及示意血管直径仅为可视化。未绘出全部分支或变异，不提供安全距离或允许进针范围。

Reference vessel meshes are combined with schematic nerves. Schematic diameters are visual only. Branches and variants are incomplete; no safe distance or permissible pin zone is defined.

默认按参考骨骼的深度逐段淡化被遮挡的神经血管（约20%不透明度）；可关闭“骨后淡化显示”隐藏遮挡部分。编号也随遮挡淡化。所有示意曲线仅解释概念走行，未展示全部变异与分支。原有操作参数未因本次图层添加而改变。

Bone-occluded segments fade to approximately 20% opacity, with matching faded markers. Disable behind-bone display to hide occluded segments. Schematic curves are conceptual and incomplete; existing procedural parameters were not changed by this visual update.

## 文件与上传

- index.html：完整自包含网页。
- teaching-images：中英文A/B两个观察视角，3840×2160 PNG。
- validation-v2.json：离线、开关、语言、结构解释与移动布局的软件检查。

将本目录文件上传至单独GitHub仓库根目录，Settings → Pages → main → /(root)。保留署名与许可文件。本次没有上传或修改远端仓库。

## 新增依据

- [AO safe zones for pin placement](https://surgeryreference.aofoundation.org/orthopedic-trauma/periprosthetic-fractures/knee/approach/safe-zones)
- [AO straight lateral approach](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/proximal-tibia/approach/straight-lateral-approach)

核对日期：2026-09-08。研究与病例报告用于支持解剖风险，不据此推断统一安全距离、针径、负荷或发生率。软件验证与视觉检查不构成独立临床专家批准。
