export default (await import('vue')).defineComponent({
    data() {
        return {
            username: '',
            email: '',
            password: '',
            loginEmail: '',
            loginPassword: ''
        };
    },
    computed: {
        isEmailValid() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(this.email);
        },
        areAllFieldsFilled() {
            return this.username && this.email && this.password;
        },
        isPasswordValid() {
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            return this.password.length >= 8 && passwordPattern.test(this.password);
        }
    },
    methods: {
        register() {
            if (this.isEmailValid) {
                // Handle registration logic here
                console.log('User registered:', this.username, this.email, this.password);
            }
            else {
                console.log('Invalid email format');
            }
        },
        login() {
            // Handle login logic here
            console.log('User logged in:', this.loginEmail, this.loginPassword);
        }
    }
});
;

function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-cards") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.register) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("username"), });
    // @ts-ignore
    [register,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), id: ("username"), value: ((__VLS_ctx.username)), required: (true), });
    // @ts-ignore
    [username,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("email"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("email"), id: ("email"), required: (true), });
    (__VLS_ctx.email);
    // @ts-ignore
    [email,];
    if (!__VLS_ctx.isEmailValid && this.email.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("error") }, });
        // @ts-ignore
        [isEmailValid,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("password"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("password"), id: ("password"), required: (true), });
    (__VLS_ctx.password);
    // @ts-ignore
    [password,];
    if (!__VLS_ctx.isPasswordValid && this.password.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("error") }, });
        // @ts-ignore
        [isPasswordValid,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), disabled: ((!__VLS_ctx.isEmailValid || !__VLS_ctx.areAllFieldsFilled || !__VLS_ctx.isPasswordValid)), });
    // @ts-ignore
    [isEmailValid, isPasswordValid, areAllFieldsFilled,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("auth-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.login) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("login-email"), });
    // @ts-ignore
    [login,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("email"), id: ("login-email"), required: (true), });
    (__VLS_ctx.loginEmail);
    // @ts-ignore
    [loginEmail,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("login-password"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("password"), id: ("login-password"), required: (true), });
    (__VLS_ctx.loginPassword);
    // @ts-ignore
    [loginPassword,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), });
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['auth-container'];
        __VLS_styleScopedClasses['title'];
        __VLS_styleScopedClasses['auth-cards'];
        __VLS_styleScopedClasses['auth-card'];
        __VLS_styleScopedClasses['form-group'];
        __VLS_styleScopedClasses['form-group'];
        __VLS_styleScopedClasses['error'];
        __VLS_styleScopedClasses['form-group'];
        __VLS_styleScopedClasses['error'];
        __VLS_styleScopedClasses['auth-card'];
        __VLS_styleScopedClasses['form-group'];
        __VLS_styleScopedClasses['form-group'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    const __VLS_name = undefined;
    const __VLS_internalComponent = (await import('./App.vue')).default;
}
