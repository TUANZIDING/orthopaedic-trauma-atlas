# 骨盆外固定 · 手术解剖教学

基于 [human-atlas](https://github.com/TUANZIDING/human-atlas) 的 BodyParts3D 解剖网格，以 [AO Surgery Reference](https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/pelvic-ring/basic-technique/external-fixation) 为术式参考制作的独立教学网页。

最新的神经血管警示更新（V2.1）已上传至 [`neurovascular-v2/`](neurovascular-v2/)；[直接打开合集教学入口](neurovascular-v2/index.html)。四个模块均支持骨后结构淡化显示和中英文切换。

**直接打开 `index.html` 即可使用；模型、样式和三维运行代码全部嵌入单个 HTML，无需联网加载 CDN，无需安装 Node。** 需要浏览器支持 WebGL；外部来源链接需联网访问。

## 内容

- 髋臼上外固定主示教，髂嵴外固定对照。
- 六步讲解：解剖定位、入钉点、固定钉、连接架、复位与锁紧、最终检查。
- 可旋转、缩放、切换正面 / 斜位 / 侧面 / 俯视，点击骨骼查询名称。
- 可调整透明度，开关标注、风险提示区和骨内示意钉道。
- 一键导出当前视角和步骤的 3840 × 2160 PNG；图内保留来源与教学边界。
- `teaching-images/` 内附两种术式的正面、斜位高清图。

## 上传 GitHub Pages

建议在新仓库中放置本教学模块，避免覆盖 human-atlas 原有首页。

1. 在自己的 GitHub 新建一个仓库，例如 `pelvic-external-fixation`。
2. 上传本包中的 `index.html` 到仓库根目录。也可同时上传 README、ATTRIBUTION、LICENSE、THIRD_PARTY_LICENSES 及教学图文件夹；单个 HTML 已含必要的运行内容及署名。
3. 进入仓库 **Settings → Pages → Build and deployment**。
4. Source 选择 **Deploy from a branch**，分支选择保存文件的分支（通常是 `main`），文件夹选择 **/(root)**，点击 Save。
5. 等待 GitHub 的 Pages 部署完成，以 Pages 设置页实际显示的链接为准。

采用上述示例仓库名和用户名，地址通常为 `https://TUANZIDING.github.io/pelvic-external-fixation/`；这是预期地址，交付时尚未发布。

[GitHub 官方配置说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。GitHub Free 的公开仓库支持 Pages，其他可用范围以账户方案为准。

## 开发与重建（观看网页不需要）

```sh
npm ci
npm run build
npm run serve
```

随后打开 http://localhost:8080 。`src/` 为可修改源码；`npm run build` 重新生成独立 `index.html`。不存在后端、患者数据或 API 密钥。

若需从来源仓库重新提取骨骼，先取得上面所列来源提交，再执行 `python3 scripts/extract-model.py /path/to/human-atlas`。模型坐标与教学几何存储在 `src/model.json`、`src/constructs.json`。修改教学几何后须重新核对骨性位置与页面显示。

## 教学边界

- 使用完整成人男性参考骨盆，不模拟特定骨折或其复位效果。
- 固定钉、连接架、钉道和橙色风险区是教学性几何；橙区不是实际神经分割，也不是精确危险区边界。
- 数值几何检查和浏览器检查只验证当前展示，不构成临床安全通道、器械适配或解剖精度认证。
- 本网页为独立改编，不是 AO 官方制作、推荐或认证。
- 临床位置、方向、深度和后环处理应由专业人员结合个体影像及损伤判断。

完整数据署名及许可见 [ATTRIBUTION.md](ATTRIBUTION.md)；验证记录见 [docs/VALIDATION.md](docs/VALIDATION.md)。
