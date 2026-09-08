# 骨盆外固定 · 神经血管 V2.1

本版本为独立新增版本，不覆盖原版。直接打开 index.html，可离线使用，保留原有操作流程和参数。新增神经血管区域提供中英文结构清单、逐项风险解释、高亮、分层开关和4K图导出。骨盆版原有一般界面的部分内容仍仅为中文；本次新增神经血管区域及其导出图支持完整中英切换。

## 展示内容

髋臼上与髂嵴入钉均需关注股外侧皮神经。股神经与股血管在更内侧，是理解错误内偏或深部操作的邻近关系，不能将其与浅表神经视为相同风险。

Both supra-acetabular and iliac-crest entry require attention to the lateral femoral cutaneous nerve. More medial femoral nerves and vessels provide context for medial/deep deviation; their risk is not identical to that of the cutaneous nerve.

## 使用边界

参考血管网格与示意神经混合展示；神经及示意血管直径仅为可视化。未绘出全部分支或变异，不提供安全距离或允许进针范围。

Reference vessel meshes are combined with schematic nerves. Schematic diameters are visual only. Branches and variants are incomplete; no safe distance or permissible pin zone is defined.

默认按参考骨骼的深度逐段淡化被遮挡的神经血管（约20%不透明度）；可关闭“骨后淡化显示”隐藏遮挡部分。编号也随遮挡淡化。所有示意曲线仅解释概念走行，未展示全部变异与分支。原有操作参数未因本次图层添加而改变。

Bone-occluded segments fade to approximately 20% opacity, with matching faded markers. Disable behind-bone display to hide occluded segments. Schematic curves are conceptual and incomplete; existing procedural parameters were not changed by this visual update.

## 文件与上传

- index.html：完整自包含网页。
- teaching-images：中英文A/B两个观察视角，3840×2160 PNG。
- validation-v2.json：离线、开关、语言、结构解释与移动布局的软件检查。

本模块发布在完整图谱的 `neurovascular-v2/pelvic-external-fixation/` 路径下；保留署名与许可文件。

## 新增依据

- [AO pelvic external fixation](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/pelvic-ring/basic-technique/external-fixation)
- [AO anterior approach](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/proximal-femur/approach/anterior-approach-smith-petersen)

核对日期：2026-09-08。研究与病例报告用于支持解剖风险，不据此推断统一安全距离、针径、负荷或发生率。软件验证与视觉检查不构成独立临床专家批准。
