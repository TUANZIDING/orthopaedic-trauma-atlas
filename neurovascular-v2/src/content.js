const B=(zh,en)=>({zh,en});
const S=(id,title,url,detail)=>({id,title,url,detail});
const P=(name,value,scope,refs)=>({name,value,scope,refs});
const step=(title,body,check,refs)=>({title,body,check,refs});
export const common={
 brand:B('骨科操作图谱','ORTHOPAEDIC PROCEDURES'),series:B('牵引技术 / 独立教学系列','TRACTION / TEACHING SERIES'),
 sources:B('依据与参数说明','Evidence & context'),export:B('导出 4K 教学图','Export 4K plate'),
 evidenceDate:B('资料核对：2026-09-08','Evidence checked: 08 Sep 2026'),
 steps:B('六步示教','Six teaching steps'),stepLabel:B('当前步骤','Current step'),
 strategy:B('当代诊疗定位','Role in current practice'),parameters:B('参数必须与场景一起阅读','Read every parameter with its context'),
 paramIntro:B('数值来自下列具名技术参考；不构成跨患者、跨器械的统一处方。','Values belong to the named references below; they are not a universal prescription across patients or devices.'),
 paramColumns:[B('项目','Parameter'),B('来源描述','Source value'),B('适用条件 / 差异','Scope / differences'),B('依据','Source')],
 why:B('为什么这样操作','Why it matters'),stop:B('停止与升级处理','Stop and escalate'),
 play:B('分步播放','Play steps'),pause:B('暂停','Pause'),previous:B('上一步','Previous'),next:B('下一步','Next'),
 views:[B('正面','Anterior'),B('斜位','Oblique'),B('内侧 / 侧面','Medial / lateral'),B('后面','Posterior')],
 reset:B('复位视角','Reset view'),labels:B('结构标注','Labels'),risk:B('邻近风险提示','Risk cues'),path:B('置针方向示意','Insertion direction'),opacity:B('骨骼不透明度','Bone opacity'),
 settings:B('显示设置','Display settings'),gesture:B('拖动旋转 · 滚轮缩放 · 点击骨骼','Drag to orbit · Scroll to zoom · Select a bone'),
 reference:B('参考解剖 · 器械示意','Reference anatomy · Schematic device'),
 orientation:B('解剖观察视角，非患者体位 / 透视图','Anatomical view, not patient positioning or fluoroscopy'),
 legend:[B('参考骨骼','Reference bone'),B('针 / 牵引装置','Pin / traction device'),B('邻近风险区','Nearby risk cue')],
 select:B('点击骨骼查看结构','Select a bone to inspect'),selected:B('选中结构','Selected structure'),
 explanation:B('模型边界','About this model'),
 boundary:B('成人参考骨骼；器械、入口与风险标记为教学几何，未作患者级安全通道验证。视角和动画不表示实际手术体位、复位效果或允许加重。','Adult reference anatomy. Devices, entry markers and risk cues are teaching geometry, not patient-validated safe corridors. Views and animations do not represent patient positioning, reduction success or permission to add weight.'),
 sourceIntro:B('独立教学改编；不是 AO、WFNS 或器械厂商的官方制作或认证。链接可打开原始依据。','Independent educational adaptation, not an official or endorsed product of AO, WFNS or a device manufacturer. Links open the original sources.'),
 attribution:B('BodyParts3D © DBCLS · CC BY 4.0 · 经 human-atlas 改编；Three.js / MIT。','BodyParts3D © DBCLS · CC BY 4.0 · adapted via human-atlas; Three.js / MIT.'),
 exported:B('已导出 3840 × 2160 PNG','Exported 3840 × 2160 PNG'),generating:B('正在生成…','Rendering…'),
 failure:B('三维加速不可用，请使用支持 WebGL 的浏览器。随附高清图可独立查看。','WebGL is unavailable. Use a WebGL-capable browser or open the supplied teaching plates.'),
 noAuto:B('手动切换表示教学分步，不是患者处方或自动复位。','Step changes are for teaching, not prescribing or automated reduction.'),
 anatomicalPlate:B('解剖与置针','Anatomy & insertion'),constructPlate:B('连接与复评','Connection & reassessment'),
 check:B('本步复核','Check before proceeding'),close:B('关闭','Close'),
 caption:B('针道和风险标记为示意；负荷必须结合正文所列场景。','Pin paths and risk cues are schematic; loads require the stated clinical context.')
};
export const modules={
 tibial:{id:'tibial',slug:'tibial-traction',serial:'01',color:'#146657',title:B('胫骨结节骨牵引','Proximal tibial skeletal traction'),subtitle:B('近端胫骨置针 · 以胫骨粗隆为标志','Proximal tibial pin · tibial tuberosity landmark'),
  scope:B('骨骼成熟成人 · 经选择的下肢暂时稳定','Skeletally mature adults · selective temporising stabilisation'),
  strategy:B('成人股骨干骨折通常以手术稳定为目标。近端胫骨牵引用于选择性过渡或资源受限情境；老年髋部骨折不常规进行术前牵引。','Operative stabilisation is usually the goal for adult femoral-shaft fractures. Proximal tibial traction has a selective temporising or resource-limited role; routine preoperative traction is not recommended for older adults with hip fracture.'),strategyRefs:['T2','T3','T4'],
  steps:[
   step(B('选择适应证','Select the indication'),B('核对骨折部位、软组织、神经血管与膝稳定性。牵引力将跨越膝关节传递。','Review the injury, soft tissues, neurovascular status and knee stability. A proximal tibial pin transmits traction across the knee.'),B('胫骨通道受损或膝不稳定时，重新选择稳定方式。','Reconsider the anchorage or stabilisation strategy if the tibial corridor is injured or the knee is unstable.'),['T2','T3','T5']),
   step(B('定位与准备','Landmarks & preparation'),B('识别胫骨粗隆、胫骨关节面及腓骨头/颈。完成无菌准备与个体化进出口至骨膜麻醉。','Identify the tuberosity, tibial joint line and fibular head/neck. Use aseptic preparation and individually planned anaesthesia at entry and exit down to periosteum.'),B('本图的粗隆是定位标志，不是让针穿入粗隆尖端或髌腱。','The tuberosity is a landmark, not an instruction to transfix its tip or the patellar tendon.'),['T1','T5']),
   step(B('确认外侧入口','Confirm lateral entry'),B('AO示教描述入口约在胫骨粗隆后方2 cm；图示点仅对应参考骨面。','The AO technique describes a point about 2 cm posterior to the tuberosity; the marker only represents a point on this reference bone.'),B('远端偏移的描述在不同体系中有差异，不能拼接成统一坐标。','Distal offsets differ between technique systems; do not combine them into a universal coordinate.'),['T1','T5']),
   step(B('外侧向内置针','Insert lateral to medial'),B('显示横向通过近端胫骨的方向，并确认预期内侧出口。标记腓骨颈邻近风险。','Show the transverse path through proximal tibia and confirm the expected medial exit. Note the risk near the fibular neck.'),B('保护腓总神经和后方神经血管结构；不得向后方盲目推进。','Protect the common fibular nerve and posterior neurovascular structures; avoid blind posterior advancement.'),['T1','T5']),
   step(B('连接弓与牵引','Connect bow & traction'),B('弓与针匹配、皮肤无张力；按对线配置支撑、牵引和反牵引。页面箭头只表示力线。','Match the bow to the pin, relieve skin tension and configure support, traction and countertraction for alignment. The arrow only indicates a force vector.'),B('维持负荷由临床和影像决定，不直接采用体重自动计算结果。','Maintenance load is guided by clinical and imaging reassessment, not an automatic body-mass calculation.'),['T1','T2']),
   step(B('复评与转归','Reassess & transition'),B('复核长度、旋转、X线对线、皮肤、针道及神经血管；每日评估确定性治疗安排。','Reassess length, rotation, radiographic alignment, skin, pin sites and neurovascular status; review the plan for definitive treatment.'),B('新神经血管异常、剧痛、松针或对线恶化：停止继续加重并立即复评。','New neurovascular change, severe pain, loosening or worsening alignment: stop further loading and reassess promptly.'),['T1','T2'])
  ],
  parameters:[
   P(B('解剖参照','Landmark offset'),B('约后方 2 cm','About 2 cm posterior'),B('AO：相对胫骨粗隆；并非通用安全坐标。','AO: relative to the tuberosity, not a universal safe coordinate.'),['T1']),
   P(B('置针方向','Insertion direction'),B('外侧 → 内侧','Lateral → medial'),B('成人近端胫骨；结合膝稳定、腓骨头/颈与个体影像。','Adult proximal tibia; consider knee stability, fibular landmarks and individual imaging.'),['T1','T5']),
   P(B('维持负荷示例','Maintenance-load example'),B('体重约 10%','About 10% of body mass'),B('仅AO资源受限股骨干维持牵引情境；不是通用起始量或上限。','Only the AO resource-limited femoral-shaft maintenance example; not a general starting load or ceiling.'),['T2']),
   P(B('针型 / 针径','Pin type / diameter'),B('Steinmann / Denham；无统一针径','Steinmann / Denham; no universal diameter'),B('按骨量与配套弓IFU选择；不得把专用2 mm细针当作普通弓的替换件。','Select for bone and the matched bow IFU; a dedicated 2 mm wire system is not interchangeable with a conventional bow.'),['T1','T5']),
   P(B('膝位','Knee position'),B('轻屈并支撑','Supported slight flexion'),B('AO未规定通用固定角度；小腿垫托并减轻足跟压力。','AO gives no universal fixed angle; support the calf and offload the heel.'),['T1']),
   P(B('其他体系的入点','Alternative landmark description'),B('远端 2 cm + 后方 2 cm','2 cm distal + 2 cm posterior'),B('Arbutus具名IFU中的描述，单独列示；不与AO约后方2 cm合并。','From the named Arbutus IFU, shown separately; do not merge it with the AO description.'),['T5'])
  ],
  explanations:[
   {title:B('为什么辨认腓骨颈？','Why identify the fibular neck?'),body:B('外侧附近有腓总神经，入口选择与置针方向需要同时考虑；橙区只提示邻近关系。','The common fibular nerve is nearby laterally. Entry and direction must be considered together; the orange cue indicates proximity only.'),refs:['T5']},
   {title:B('为什么强调跨膝传力？','Why does transmission across the knee matter?'),body:B('骨性锚点位于近端胫骨，不能因骨折在股骨就忽略膝部损伤和稳定性。','The anchor is in proximal tibia; a femoral fracture does not remove the need to assess knee injury and stability.'),refs:['T2','T5']},
   {title:B('为什么不是所有患者都牵引？','Why not use traction routinely?'),body:B('AO Alliance闭合股骨干路径以锁定髓内钉为标准；AAOS老年髋部骨折指南反对常规术前牵引。','The AO Alliance closed femoral-shaft pathway centres on locked intramedullary nailing; the AAOS older-adult hip-fracture guideline opposes routine preoperative traction.'),refs:['T3','T4']}
  ],
  stop:B('新神经血管异常、牵引后加重的疼痛、松针或对线丢失需立即复评。感染或通道受损、膝不稳定及开放骨骺不应直接套用本成人示教。','New neurovascular findings, worsening pain, pin loosening or loss of alignment require prompt reassessment. Infection, an injured corridor, knee instability or open physes fall outside direct application of this adult demonstration.'),
  sources:[
   S('T1','AO Surgery Reference — Skeletal traction','https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/proximal-femur/basic-technique/basic-technique-skeletal-traction',B('§2–5；页面未标更新时间；现行技术参考。','Sections 2–5; no displayed update date; current accessible technique reference.')),
   S('T2','AO — Nonoperative treatment with limited resources','https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/femoral-shaft/simple-spiral-distal-1-3-fractures/nonoperative-treatment-with-limited-resources',B('股骨干；§1、4；10%是维持牵引场景。','Femoral shaft; sections 1 and 4; the 10% figure belongs to maintenance traction.')),
   S('T3','AO Alliance — Closed femoral shaft fractures (2023)','https://online.ao-alliance.org/images/PDF/Clinical_Guidelines/Clinical_Guidelines_Femoral_Shaft_Fractures_2023.pdf',B('单页标准3、5、7；区域临床路径，非所有创伤的通用时间阈值。','One-page standards 3, 5 and 7; a regional pathway, not a general trauma timing threshold.')),
   S('T4','AAOS — Hip Fractures in Older Adults CPG (2021)','https://new.aaos.org/globalassets/quality-and-practice-resources/hip-fractures-in-the-elderly/hipfxcpg.pdf',B('印刷页23；不常规术前牵引；强推荐。','Printed page 23; recommendation against routine preoperative traction.')),
   S('T5','Arbutus — TrakPak / SteriTrak / QuikBow IFU, LBL-202(02)','https://arbutusmedical.com/wp-content/uploads/2024/07/LBL-20202-TrakPak-IFU-5.8x13.3-100lb-matte.pdf',B('PDF页1–2；器械特定说明，不能泛化到所有系统。','PDF pages 1–2; device-specific instructions, not generalisable to all systems.'))
  ],
  exportFacts:[B('AO定位：粗隆后方约2 cm','AO landmark: ~2 cm posterior to tuberosity'),B('方向：外侧入，内侧出','Direction: lateral entry, medial exit'),B('负荷按情境；10%仅为资源受限维持牵引示例','Load is contextual; 10% is a resource-limited maintenance example')]
 },
 calcaneal:{id:'calcaneal',slug:'calcaneal-traction',serial:'02',color:'#245f84',title:B('跟骨骨牵引','Calcaneal skeletal traction'),subtitle:B('完整跟骨作为锚点 · 成人远端胫骨损伤','Intact calcaneal anchorage · adult distal tibial injury'),
  scope:B('成人 · 选择性短期稳定；非跟骨骨折复位示教','Adults · selective short-term stabilisation, not calcaneal fracture reduction'),
  strategy:B('跟骨牵引可用于远端胫骨损伤的选择性过渡处理。高能量pilon骨折多数需要分期方案，初期常用跨踝外固定；不能将悬重牵引视作等效的普遍首选。','Calcaneal traction is a selective temporary option for distal tibial injury. Most high-energy pilon injuries require a staged strategy, often beginning with ankle-spanning external fixation; suspended traction is not an equivalent universal first choice.'),strategyRefs:['C1','C4'],
  steps:[
   step(B('选择过渡方案','Choose a temporary strategy'),B('评估损伤形态、皮肤、跟骨完整性和后续手术计划，选择需要的临时稳定方式。','Assess the injury, skin, calcaneal integrity and surgical plan to select a temporary stabilisation method.'),B('本页不演示用跟骨操纵针恢复跟骨骨折形态。','This is not a demonstration of a manipulation pin for calcaneal fracture reduction.'),['C1','C4']),
   step(B('内外侧解剖','Medial & lateral anatomy'),B('定位跟骨结节和内外踝，识别内踝后方神经血管束及外侧腓肠神经邻近风险。','Locate the calcaneal tuberosity and malleoli; consider the posteromedial neurovascular bundle and lateral sural nerve.'),B('没有适用于所有个体的固定“无风险圆”。','There is no fixed risk-free circle applicable to every patient.'),['C3','C5']),
   step(B('确认内侧入口','Confirm medial entry'),B('以跟骨结节为锚定区域，从内侧规划入口并评估皮肤与后续术区。','Use the tuberosity as the anchorage region and plan the medial entry with skin and later operative access in mind.'),B('跟部感染、严重软组织破坏或跟骨本身损伤需重新选择锚点。','Heel infection, major soft-tissue damage or calcaneal injury requires reassessment of the anchor.'),['C3']),
   step(B('内侧向外置针','Insert medial to lateral'),B('显示横向经跟骨结节的方向，确认预期外侧出口，避免以通用厘米数替代解剖判断。','Show a transverse medial-to-lateral path through the tuberosity and verify the anticipated exit; fixed distances do not replace anatomical assessment.'),B('主场景为4 mm Steinmann针；2 mm替代针须使用张紧系统。','The main example uses a 4 mm Steinmann pin; a 2 mm alternative requires a tensioning system.'),['C1','C3']),
   step(B('连接弓与加载','Connect bow & apply traction'),B('匹配牵引弓并避免压皮肤，配置支撑与反牵引。主AO章节描述3–5 kg的场景。','Fit the bow without skin pressure and arrange support and countertraction. The main AO chapter describes a 3–5 kg scenario.'),B('Braun架另一章节为3–4 kg且不得超过4 kg；不得合并成通用上限。','A separate Braun-frame chapter gives 3–4 kg with a 4 kg ceiling; do not combine the two into a universal maximum.'),['C1','C2']),
   step(B('监测与转换','Monitor & transition'),B('复核对线、疼痛、神经血管、皮肤和针道；软组织及全身情况允许时转换确定性治疗。','Reassess alignment, pain, neurovascular status, skin and pin sites, and transition to definitive care when appropriate.'),B('骨筋膜室综合征高风险患者需每小时记录评估；疑似急症须升级处理。','Patients at risk of compartment syndrome require documented hourly assessment; suspected emergencies require escalation.'),['C1','C6'])
  ],
  parameters:[
   P(B('主方案针径','Main pin diameter'),B('4 mm Steinmann','4 mm Steinmann'),B('AO成人远端胫骨临时牵引；可用中央螺纹。','AO temporary traction for adult distal tibial injury; a central thread may be used.'),['C1']),
   P(B('细针替代','Fine-wire alternative'),B('2 mm + 张紧夹具','2 mm + tensioning clamp'),B('不是未张紧细针与普通弓的直接替换。','Not an untensioned-wire substitution in a conventional bow.'),['C1']),
   P(B('主场景负荷','Main-scenario load'),B('3–5 kg','3–5 kg'),B('仅C1成人远端胫骨章节；依对线及组织反应调整。','Only the C1 adult distal-tibia scenario; adjust with alignment and tissue response.'),['C1']),
   P(B('独立对照场景','Separate comparison scenario'),B('5 mm；3–4 kg，≤4 kg','5 mm; 3–4 kg, ≤4 kg'),B('C2假体周围胫骨/Braun架情境；不与C1参数混用。','C2 periprosthetic tibia / Braun-frame context; not interchangeable with C1.'),['C2']),
   P(B('方向 / 入口','Direction / entry'),B('内 → 外；跟骨结节','Medial → lateral; tuberosity'),B('个体定位；本页不提供统一入口距离、角度或深度。','Individual localisation; no universal entry distance, angle or depth is supplied.'),['C1','C3']),
   P(B('高风险监测频率','High-risk observation frequency'),B('每小时记录','Document hourly'),B('仅BOASt所指骨筋膜室综合征高风险患者，不等于所有患者统一频率。','For patients at risk of compartment syndrome under BOASt, not a universal frequency for all patients.'),['C6'])
  ],
  explanations:[
   {title:B('为什么从内侧开始？','Why begin medially?'),body:B('入口规划要考虑胫后神经血管束。内侧结构定位和外侧出口保护都不能省略。','Entry planning must account for the posterior tibial neurovascular bundle. Both medial localisation and lateral-exit protection matter.'),refs:['C1','C3']},
   {title:B('为什么两组重量不合并？','Why keep the load ranges separate?'),body:B('C1为成人远端胫骨临时牵引，C2为另一病情与Braun架配置。器械和病情变了，参数不能移植。','C1 concerns temporary distal-tibial traction; C2 uses a different injury context and Braun-frame setup. Values cannot simply be transplanted.'),refs:['C1','C2']},
   {title:B('什么时候需要外固定？','When is external fixation relevant?'),body:B('高能量pilon伴严重软组织损伤时，分期跨踝外固定往往是初期稳定方案的一部分。','In high-energy pilon injury with major soft-tissue compromise, staged ankle-spanning fixation commonly forms part of initial stabilisation.'),refs:['C4']}
  ],
  stop:B('疼痛进行性加重、被动牵伸痛或新神经血管异常应立即升级评估，不能仅靠追加牵引解决。确诊骨筋膜室综合征需急诊减压。','Progressive pain, pain on passive stretch or new neurovascular findings require urgent escalation, not simply more traction. Confirmed compartment syndrome requires emergency decompression.'),
  sources:[
   S('C1','AO — Distal tibia: temporary traction','https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-tibia/complete-simple-articular-multifragmentary-metaphyseal-fracture/nonoperative-treatment-temporary-traction',B('§1–3；主场景4 mm/张紧2 mm，3–5 kg。','Sections 1–3; main scenario: 4 mm or tensioned 2 mm, 3–5 kg.')),
   S('C2','AO — Periprosthetic tibial fracture: traction','https://surgeryreference.aofoundation.org/orthopedic-trauma/periprosthetic-fractures/knee/fracture-around-a-stable-tibial-component-with-good-bone-stock/traction',B('跟骨针与Braun架段；5 mm、3–4 kg且≤4 kg。','Calcaneal-pin and Braun-frame sections; 5 mm, 3–4 kg with a 4 kg ceiling.')),
   S('C3','AO — Safe zones, distal tibia','https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-tibia/approach/safe-zones',B('§3跟骨置针解剖；外固定Schanz针型号不移植到悬重牵引。','Section 3, calcaneal anatomy; Schanz-screw specifications are not transferred to suspended traction.')),
   S('C4','AO — Pilon fracture: staged management','https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/distal-tibia/complete-multifragmentary-articular-and-metaphyseal-fracture/orif-plate-and-screws-through-anterolateral-approach',B('§1单期或分期；软组织决定治疗阶段。','Section 1, single or staged surgery; soft-tissue condition guides staging.')),
   S('C5','Kwon et al. — Calcaneal Traction Pin Placement (2011)','https://journals.sagepub.com/doi/abs/10.3113/FAI.2011.0651',B('原始尸体研究；仅核验出版社摘要；相对安全区不排除变异风险。','Original cadaveric study; publisher abstract verified, not full text; relative safe zones do not exclude variation.')),
   S('C6','BOASt — Compartment Syndrome of the Extremities (2025)','https://www.boa.ac.uk/resource/boast-10-pdf.html',B('2025-07修订；标准2–9；高风险每小时记录。','Revised July 2025; standards 2–9; hourly documented assessment for at-risk patients.'))
  ],
  exportFacts:[B('主场景：4 mm Steinmann；内 → 外','Main scenario: 4 mm Steinmann; medial → lateral'),B('C1负荷3–5 kg；C2 Braun架≤4 kg，勿混用','C1: 3–5 kg; C2 Braun frame: ≤4 kg. Do not mix.'),B('适用：成人远端胫骨损伤的选择性过渡处理','Scope: selected temporary stabilisation of adult distal tibial injury')]
 }
};
export {B,S,P,step};
