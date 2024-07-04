import  Vue  from 'vue';
// 引入验证插件
import VeeValidate from 'vee-validate';

// 引入中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'

// 使用插件
Vue.use(VeeValidate);

// 表单校验
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field) => `${field}必须与密码相同`, 
    },
    attributes:{
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码吗',
        agree:'协议',
    }
})

// 自定义校验规则
VeeValidate.Validator.extend('tongyi',{
   validate:(value)=>{
        return value;
   },
   getMessage:(field)=> field + '必须同意'
})