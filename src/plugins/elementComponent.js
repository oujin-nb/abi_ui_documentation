import {
    Pagination,
    Dialog,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Tooltip,
    Form,
    FormItem,
    Tag,
    Alert,
    Icon,
    Row,
    Col,
    Card,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Divider,
    Calendar,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Image,
    Steps,
    Step,
    Switch,
    Loading,
    MessageBox,
    Message,
    Breadcrumb,
    BreadcrumbItem,
} from 'element-ui';

export default (Vue) => {
    Vue.use(Steps);
    Vue.use(Step);
    Vue.use(Switch);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Breadcrumb);
    Vue.use(BreadcrumbItem);
    Vue.use(Pagination);
    Vue.use(Dialog);
    Vue.use(Menu);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Input);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(Checkbox);
    Vue.use(CheckboxButton);
    Vue.use(CheckboxGroup);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Button);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(DatePicker);
    Vue.use(TimeSelect);
    Vue.use(TimePicker);
    Vue.use(Tooltip);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Tag);
    Vue.use(Alert);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Card);
    Vue.use(Container);
    Vue.use(Header);
    Vue.use(Aside);
    Vue.use(Main);
    Vue.use(Footer);
    Vue.use(Image);
    Vue.use(Loading.directive);

    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
}
