# 颅骨牵引 · 神经血管 V2.1

本版本为独立新增版本，不覆盖原版。直接打开 index.html，可离线使用，保留原有操作流程和参数。新增神经血管区域提供中英文结构清单、逐项风险解释、高亮、分层开关和4K图导出。骨盆版原有一般界面的部分内容仍仅为中文；本次新增神经血管区域及其导出图支持完整中英切换。

## 展示内容

针点需避开浅表血管；颈部的椎动脉和脊髓用于说明过度牵引及损伤监测的重要性，不表示颅骨针应接近这些深部结构。

Avoid superficial vessels at pin sites. Cervical vertebral arteries and spinal cord explain traction-injury monitoring; they are not intended skull-pin targets or adjacent pin corridors.

## 使用边界

参考血管网格与示意神经混合展示；神经及示意血管直径仅为可视化。未绘出全部分支或变异，不提供安全距离或允许进针范围。

Reference vessel meshes are combined with schematic nerves. Schematic diameters are visual only. Branches and variants are incomplete; no safe distance or permissible pin zone is defined.

默认按参考骨骼的深度逐段淡化被遮挡的神经血管（约20%不透明度）；可关闭“骨后淡化显示”隐藏遮挡部分。编号也随遮挡淡化。所有示意曲线仅解释概念走行，未展示全部变异与分支。原有操作参数未因本次图层添加而改变。

Bone-occluded segments fade to approximately 20% opacity, with matching faded markers. Disable behind-bone display to hide occluded segments. Schematic curves are conceptual and incomplete; existing procedural parameters were not changed by this visual update.

## 文件与上传

- index.html：完整自包含网页。
- teaching-images：中英文A/B两个观察视角，3840×2160 PNG。
- validation-v2.json：离线、开关、语言、结构解释与移动布局的软件检查。

本模块发布在完整图谱的 `neurovascular-v2/cranial-traction/` 路径下；保留署名与许可文件。

## 新增依据

- [Superficial temporal artery injury with skull tongs (1992 case report)](https://pubmed.ncbi.nlm.nih.gov/1614723/)
- [WFNS cervical trauma recommendations](https://wfns-spine.org/pdf/Recom-Cervical-Spine-Trauma.pdf)
- [Auriculotemporal neurovascular relationships (cadaveric anatomy; 2010)](https://pubmed.ncbi.nlm.nih.gov/20440161/)

核对日期：2026-09-08。研究与病例报告用于支持解剖风险，不据此推断统一安全距离、针径、负荷或发生率。软件验证与视觉检查不构成独立临床专家批准。
