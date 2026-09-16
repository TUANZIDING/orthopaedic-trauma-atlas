# Orthopaedic Trauma Atlas / 骨科创伤操作教学图谱

面向医学教师的中英双语骨科创伤教学项目。首页以“识别解剖 → 选择入路 → 神经血管风险 → 复核与边界”为统一讲授路径，串联三维参考解剖、分步教学图、来源链接和使用限制。

## 在线访问

- [图谱主页](https://tuanziding.github.io/orthopaedic-trauma-atlas/)
- [小腿筋膜室三维演示](https://tuanziding.github.io/orthopaedic-trauma-atlas/fasciotomy-atlas/leg-fasciotomy-v2/)
- [骨盆外固定架](https://tuanziding.github.io/orthopaedic-trauma-atlas/neurovascular-v2/pelvic-external-fixation/)
- [胫骨结节骨牵引](https://tuanziding.github.io/orthopaedic-trauma-atlas/neurovascular-v2/tibial-traction/)
- [跟骨骨牵引](https://tuanziding.github.io/orthopaedic-trauma-atlas/neurovascular-v2/calcaneal-traction/)
- [颅骨牵引](https://tuanziding.github.io/orthopaedic-trauma-atlas/neurovascular-v2/cranial-traction/)
- [大腿筋膜室](https://tuanziding.github.io/orthopaedic-trauma-atlas/fasciotomy-atlas/thigh-fasciotomy/)
- [足部筋膜室](https://tuanziding.github.io/orthopaedic-trauma-atlas/fasciotomy-atlas/foot-fasciotomy/)

## 教学模块

| 模块 | 教学重点 | 内容位置 |
|---|---|---|
| 小腿筋膜室 · 三维分层 | 浅后室、深后室、横断面和深度提示 | `fasciotomy-atlas/leg-fasciotomy-v2/` |
| 骨盆外固定架 | 髂前下棘/髂嵴入钉、股外侧皮神经与前环控制 | `neurovascular-v2/pelvic-external-fixation/` |
| 胫骨结节骨牵引 | 腓总神经、胫神经、腘血管与进针方向 | `neurovascular-v2/tibial-traction/` |
| 跟骨骨牵引 | 胫后神经血管束、跟支和腓肠神经 | `neurovascular-v2/calcaneal-traction/` |
| 颅骨牵引 | 浅表血管风险与颈椎创伤监测边界 | `neurovascular-v2/cranial-traction/` |
| 大腿筋膜室 | 三个筋膜室、内外侧入路与邻近风险 | `fasciotomy-atlas/thigh-fasciotomy/` |
| 足部筋膜室 | 前足/后足分区与足部管理的共识边界 | `fasciotomy-atlas/foot-fasciotomy/` |

每个模块尽量保留：中文/English 切换、步骤或阶段、结构图层、神经血管提示、4K 教学图、来源文件和使用边界。首页文案只引用模块已有证据文件和公开权威来源，不把示意结构或软件验证写成临床认证。

## 首页视觉素材

首页新增两张 AI 生成的视觉导览图，分别用于首屏空间关系引导和“教师课堂”场景展示：

- `assets/home/hero-layered-anatomy-v1.png`：分层小腿与神经血管关系的非比例视觉导览。
- `assets/home/teacher-classroom-v1.png`：教师备课与课堂演示场景的编辑插图。

这些图片只承担视觉引导和信息分区，不是患者影像、临床摄影或可测量的解剖图。医学教学内容仍以各模块的真实教学截图、公开来源和证据边界为准。

## 依据与边界

- 成人急性筋膜室综合征： [AAOS 2025 CPG](https://www.aaos.org/acscpg2025)、[BOASt 10](https://www.boa.ac.uk/resource/boast-10-pdf.html)、[AO 小腿](https://surgeryreference.aofoundation.org/cmf/reconstruction/further-reading/compartment-syndrome-in-the-leg)、[AO 大腿](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/further-reading/compartment-syndrome-thigh)、[AO 足部](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/further-reading/compartment-syndrome-foot)。
- 外固定与牵引： [AO 骨盆外固定](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/pelvic-ring/basic-technique/external-fixation)、[AO pin safe zones](https://surgeryreference.aofoundation.org/orthopedic-trauma/periprosthetic-fractures/knee/approach/safe-zones)、[AO 足部 safe zones](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/midfoot/approach/safe-zone-for-external-fixator)、[WFNS 颈椎创伤建议](https://wfns-spine.org/pdf/Recom-Cervical-Spine-Trauma.pdf)。
- 模块化证据与适用限制： [fasciotomy-atlas/research/EVIDENCE.md](fasciotomy-atlas/research/EVIDENCE.md)、[neurovascular-v2/README.md](neurovascular-v2/README.md) 及各模块的 `EVIDENCE.md`。

本项目为独立教学改编，不代表 AO、AAOS、BOASt、WFNS 或其他机构的官方制作、推荐或认证。图形是关系示意或非比例三维分层，不能用于患者特异性测量、手术导航、器械选择或替代规范培训、患者评估和术者判断。足部筋膜室管理保留共识不足提示；任何压力值、入路和风险标注都应结合个体影像、局部规范和临床复核。

## 本地查看与验证

根目录主页为自包含 HTML，可直接打开，或运行：

```sh
npm ci
npm run serve
```

访问 `http://localhost:8080`。重建神经血管模块：

```sh
npm run build
node neurovascular-v2/scripts/verify-v2.mjs calcaneal
node neurovascular-v2/scripts/verify-v2.mjs tibial
node neurovascular-v2/scripts/verify-v2.mjs pelvic
node neurovascular-v2/scripts/verify-v2.mjs cranial
node fasciotomy-atlas/scripts/verify.mjs
```

验证结果只说明页面交互、导出和布局检查通过，不等于临床专家批准或患者级安全验证。

## 许可与署名

神经血管模块中的解剖网格及完整许可见各目录的 `ATTRIBUTION.md` 与 `THIRD_PARTY_LICENSES.txt`。本仓库不复制权威来源的原文全文，页面仅保留来源链接与必要的教学摘要。
