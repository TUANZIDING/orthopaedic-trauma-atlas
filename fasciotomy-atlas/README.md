# 下肢筋膜室切开教学图谱 / Lower-limb Fasciotomy Atlas

V1.0 · 2026-09-08。本次交付为可上传 GitHub 的本地制作版。

## 独立模块

| 部位 | 独立 HTML | 原创教学图 |
|---|---|---|
| 小腿四筋膜室 | `leg-fasciotomy/index.html` | 6步骤 × 中英 = 12 PNG + 12 SVG |
| 大腿三筋膜室 | `thigh-fasciotomy/index.html` | 12 PNG + 12 SVG |
| 足部筋膜室 | `foot-fasciotomy/index.html` | 12 PNG + 12 SVG |

从本目录 `index.html` 进入合集。模块 HTML 自包含全部代码和矢量图，无 CDN、无网络字体、无构建环境也可双击离线使用。外部权威来源链接需联网。支持皮肤透明度、筋膜/肌群/骨骼/神经血管开关、骨后结构淡化、步骤播放、区域选择、放大和当前图导出。

图形是原创**二维关系示意**，并非上一系列的 BodyParts3D 真实骨网格或患者模型。左侧是入路与筋膜层的展开示意，右侧是关系横断面。筋膜室形状、肌肉外观、神经血管和切口不按实际尺度绘制，不能用于手术导航。足部跟骨室在后足单列，避免与前足横断面混同。

## 维护

在上级仓库安装现有依赖后运行：

```sh
node fasciotomy-atlas/scripts/build.mjs
node fasciotomy-atlas/scripts/verify.mjs
node fasciotomy-atlas/scripts/package.mjs
```

`src/content.js` 管理中英文字、参数和来源；`src/diagram.js` 管理原创矢量示意；`src/app.js` 管理交互与导出；`src/style.css` 管理页面布局。`validation.json` 为软件检查记录，不等于临床专家审定。

临床文字或解剖图改动后：核对官方来源 → 修改中英文 → 重建HTML → 检查图层、步骤与导出 → 人工查看高清图 → 更新检查记录。图片由浏览器将同一 SVG 渲染到 3840×2160 PNG；SVG 可无限缩放。

## GitHub 上传

每个 `downloads/*-fasciotomy.zip` 可解压后上传至单独仓库，`index.html` 放根目录。也可将整个 `fasciotomy-atlas/` 放入现有 `orthopaedic-trauma-atlas` 仓库，再添加主页导航。使用仓库 Settings → Pages → main → /(root)。本次没有自动推送或修改现有线上主页。

原始官方图片及 AAOS 全文未复制入发布包；来源以链接提供。图和代码为本项目原创，引用出处见 [research/EVIDENCE.md](research/EVIDENCE.md)。医学范围为成人创伤性急性筋膜室综合征，不外推到儿童或慢性运动性筋膜室综合征。
