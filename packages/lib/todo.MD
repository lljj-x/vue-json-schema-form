> oneOf ui配置和error配置
> 需要保留关键字，schema使用的oneOf allOf anyOf , 内部配置使用了（oneOfSelect oneOfAllOptions anyOfSelect anyOfAllOptions） 配置了同名key会导致errorSchema，uiSchema无法正常工作
> 1. oneOfOptions oneOfAll  Array 适配oneOf里面的每一个值
> 1. oneOf ui中适配oneOf select的配置，error中适配oneOf类型校验错误 String
> 1. 都会合并options的选项和上一级的配置
> 1. 定义的数据字段名称 不能包含 . 字符串，内部会使用.连接出节点path
