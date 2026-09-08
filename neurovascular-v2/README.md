# 神经血管警示版 V2.1

按跟骨、胫骨结节、骨盆、颅骨顺序更新。原有 traction-atlas 与根目录骨盆版本保留；此目录是新增独立版本。四个 index.html 可分别部署，合集 index.html 提供入口。

每个模块含：新增神经/血管、结构编号与中英风险解释、图层与透骨显示开关、4张4K图。骨盆另有髂嵴对照图。神经及部分颅部血管为示意曲线，参考动静脉来自BodyParts3D，无患者级安全通道认证。

不包含在线发布，本轮未修改GitHub。

构建：node neurovascular-v2/scripts/build.mjs；node neurovascular-v2/scripts/build-pelvic.mjs。检查：node neurovascular-v2/scripts/verify-v2.mjs calcaneal（另可 tibial、pelvic、cranial）。依赖沿用上级项目。
