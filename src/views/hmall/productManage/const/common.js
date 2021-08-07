export const RICH_EDITOR_MENUS = [
    'head', // 标题
    'bold', // 粗体
    'fontSize', // 字号
    'fontName', // 字体
    'italic', // 斜体
    'underline', // 下划线
    'strikeThrough', // 删除线
    'foreColor', // 文字颜色
    'backColor', // 背景颜色
    'link', // 插入链接
    'list', // 列表
    'justify', // 对齐方式
    'quote', // 引用
    'emoticon', // 表情
    'image', // 插入图片
    'table', // 表格
    'undo', // 撤销
    'redo' // 重复
]

export const PUTAWAY_RULES = `
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为规范本网站商品发布管理，本网站拟订如下商品上架规则：<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对存在本"商品发布规则"中所描述之违规行为的用户，本网站将根据用户违规的情节和程度，对用户直接作出删除商品信息、限制交易权限甚至冻结用户帐号的处罚。如由于用户之违规行为导致本网站遭受损失，本网站有权追究该用户的法律责任。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、重复铺货商品管理规则<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、支付方式不符商品管理规则<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三、商品价格、邮费不符商品管理规则<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四、广告商品管理规则<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;五、放错类目商品管理规则<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;六、乱用关键字商品管理规则<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;七、标题、图片、描述等不一致商品管理规则<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;八、商品上架补充管理规则<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;九、商品上架违规处罚管理规则<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>一、重复铺货商品管理规则</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定义：完全相同以及商品的主要属性完全相同或类似的商品，只允许使用一种出售方式，发布一次。违反以上规则，即被认定为重复发布，并将受到本网站的相关处罚。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本定义中所指主要属性是指：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;颜色：同款商品不允许不同颜色多次发布；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大小规格：同款商品不允许以大小规格不同分开发布；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;同款商品不允许附带不同的附赠品或附带品分别发布；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;同款商品，通过更改其价格、时间、数量、组合方式及其它发布形式进行多次发布，属于重复铺货；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;服务类商品，以相同价格、相同服务的不同表现形式多次发布，属于重复铺货；<br>
    其它本网站认定为重复铺货的商品发布情况。<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>二、支付方式不符商品管理规则</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定义：商家在商品信息中拒不遵守本站在线支付规则，拒不使用本网站指定的在线支付工具，本网站判定其所发布商品为支付方式不符商品。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解释：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商家发布商品信息时，以附加本网站指定的在线支付工具之外的支付工具以及本网站指定的支付流程之外的的交易条件（包含但不仅限于如下情况：在商品信息中要求买家必须先确认收货后才发货等）等违反本站在线支付规则；在商品标题或商品描述中等以其他明示或暗示的方式拒绝使用本网站指定的在线支付工具的情形。<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>三、商品价格、邮费不符商品管理规则</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定义：发布商品的定价或者邮费标准不符合市场基本规律或所属行业标准，以低于成本价、滥用网络搜索等不正当方式发布的，影响其他商家正常经营、不利于消费者正确判断的商品本网站判定其相关商品为价格、邮费不符商品。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解释：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品的价格或邮费，违背市场基本规律和所属行业标准的（例如：商品售价一口价1元，但邮费200元）；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品的实际价格和描述价格严重不符的；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以过高或过低的价格发布赠品、店铺积分兑换的商品。<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>四、广告商品管理规则</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定义：商品描述不详、无实际商品、仅提供发布者联系方式以及非属商品信息的商品，本网站判定为发布广告商品。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解释：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布对价格、规格、使用方法等描述不详的商品；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布已经出售或者仅供欣赏等无实际商品的商品信息；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布自己或者他人生活照、实体店铺的店面图片等纯粹贴图或者个人介绍、店铺介绍、品牌故事、行业知识等纯文字介绍类信息；以及上述图片与文字的结合；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以批发、代理、已售勿拍、广告、海报、招商等形式发布的信息；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布相关免费网站注册的信息；<br>
    发布仅提供发布者联系方式或其它非出售商品的信息。<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>五、放错类目商品管理规则</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定义：商品实际类别与发布商品所选择的类目不一致，或将与本站推荐类目无关的商品错误放置在相关推荐类目下，本网站判定为放错类目商品。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解释：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品实际类别与发布商品所放置的类目不一致；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在本网站推荐各类目下出现的和该类目无关的商品。<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>六、滥用关键字商品管理规则</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定义：商家为使发布的商品引人注目，或使买家能更容易搜索到所发布的商品，而在商品名称中滥用品牌名称或和本商品无关的文字、符号等，扰乱本网站正常运营秩序的，本网站判定其相关商品为乱用关键字商品。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解释：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商家在所发布的商品出售信息标题中：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用并非用于介绍本商品的文字、符号等；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用本网站正在热推的关键词，并且该关键词和该商品无直接关联；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用非该商品实际生产、经营公司使用的特定品牌名称的；出现与其它商品或品牌相比较之表述的；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用最高级陈述或官方认证信息等绝对、夸大表述的。<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>七、形式要件违规商品管理规则</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定义：所发布的商品标题、图片、描述等信息缺乏或者多种信息相互矛盾的情况，本网站判断为形式要件违规商品。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解释：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定义中所指“形式要件”为商品标题、图片、描述、付款方式及其它与商品直接相关的反应商品属性的信息。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以无图片的形式发布的除虚拟商品和服务性质商品外的商品；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布缺乏商品必要要素的商品；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布信息与实际商品必要要素不符的；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品信息中包含诽谤、漫骂、色情、暴力、威胁等违法、侵犯他人权益之表述以及其它非商品信息的。<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>八、商品发布补充管理规则</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;严禁滥用品牌关键字；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;严禁商家将二手商品当全新商品销售；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布二手的商品必须发布该商品实物照片；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一口价商品价格不得明显超出或低于市场正常价格；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;严禁在商品名称里标注多个容量、型号、品牌等关键字；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;严禁出售商品名以及商品描述中含有“水货，精仿”等字样；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;禁止商家在商品描述中有出现外网交易的链接信息或诱导买家去外部网站购买的行为。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未经授权严禁在商品描述或店铺介绍内添加“官方推荐店铺”之类的描述信息；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未取得专卖资格或者特约经销商资格的，不得在商品信息中声称其为“专卖”及“特约经销商”等暗示其与商标权人或者生产厂家之间存在特别授权关系的字眼。<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>九、商品发布违规处罚管理规则</b><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了营造公平合理的竞争环境、加强平台有关商品发布的有效管理，更进一步明晰权责，本网站根据用户违反“商品发布管理规则”的情节和严重程度，对违规用户做出限制商品发布权限甚至查封店铺等处罚。具体说明如下：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在每一自然季度内，用户由于违反商品发布规则而被下架或删除的商品：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;累计满30件，限制发布商品权限7天，并给予店铺警告处罚1个月；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;累计满60件，限制发布商品权限1个月，并给予店铺警告处罚3个月；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;累计满120件，下架店铺内所有商品，限制发布商品权限3个月，并给予店铺警告处罚6个月；<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;违规情况特别严重者，将直接予以查封店铺的处罚。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每一自然季度末，系统将对用户商品发布违规的累计数字进行清零，重新累计。<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;被处罚者对本站的处罚有异议的，可自处罚决定做出之日起5个工作日内凭有效身份证明及相关证据材料向本站提出异议。异议期内不得从事经营活动，经确认异议成立的撤销处罚，否则处罚期自处罚决定做出之日起算。<br>
`
