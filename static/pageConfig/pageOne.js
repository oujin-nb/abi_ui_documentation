let data ={
    // 表单配置
    formOpt: {
        show: false,
        edit: true,
        index:0,
        title: '编辑系统参数',
        width: '30%',
        formObj: {
            edit: true,
            // 表单下部编辑栏参数
            editOpt: [{ text: '保存', fcn: 'submit', type: "primary" },{ text: '取消', fcn: 'close', type: "primary" }],
            labelWidth: '80px',
            // 表单展示参数
            formPage: [
                { type: 'input', label: '参数1', width: '350px', prop: 'code', disabled: true },
                { type: 'input', label: '参数2', width: '350px', prop: 'name' },
                { type: 'input', label: '参数3', width: '350px', prop: 'value' },
                { type: 'input', label: '参数4', width: '350px', prop: 'module' },
                { type: 'textarea', label: '参数5', width: '350px', prop: 'memo' },
            ],
            // 表单相互绑定的数据，只需要操作该数据即可完成相关操作
            formParam: {
            }
        }
    },
    // 表格配置
    tableOpt: {
        // 是否需要翻页
        pagination: true,
        // 翻页所需参数， 直接通过后台接口赋值，当翻页时直接将该对象传到后台即可
        paginationOpt: {currentPage: 0,pageSize: 0,totalPages: 0,totalRecords: 20},
        height: 600,
        // 是否需要编辑栏
        edit: true,
        // 编辑栏参数
        editOpt: {
            width: '100',
            list: [{ text: '编辑', fcn: 'edit', type: "primary" }]
        },
        // 渲染表格参数
        table: [
            { label: '参数1', prop: 'code' },{ label: '参数2', prop: 'name' },
            { label: '参数3', prop: 'value' },{ label: '参数4', prop: 'module' },
            { label: '参数5', prop: 'memo' }],
            // 表格上部搜索栏所需参数，其实就是表单组件
        tableSearch: {
            inline: true,
            formParam: {},
            edit: true,
            editOpt: [{ text: '搜索', fcn: 'search', type: "primary" }],
            formPage: [
                { width: "280px",label: '参数1',prop:'code',type: 'input'},
                {width: "280px",label: '参数2',prop:'name',type: 'input'}
            ]
        },
        // 表格相互绑定的数据，只需要操作该数据即可完成相关操作
        tableData: [
            {
                'code':'123','name':'123','value':'123','module':'123','memo':'123',
                children:[
                    {'code':'123','name':'123','value':'123','module':'123','memo':'123'},
                    {'code':'123','name':'123','value':'123','module':'123','memo':'123'}
                ]
            },
            {'code':'123','name':'123','value':'123','module':'123','memo':'123'},
            {'code':'123','name':'123','value':'123','module':'123','memo':'123'},
            {'code':'123','name':'123','value':'123','module':'123','memo':'123'},
            {'code':'123','name':'123','value':'123','module':'123','memo':'123'},
        ]
    }
}
export default data