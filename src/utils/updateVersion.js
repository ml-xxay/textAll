// 检测版本是否最新
import { createVersionPolling } from 'version-polling';
import { Modal } from '@arco-design/web-vue';
import locale from '@/locales/index'
createVersionPolling({
    silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
    onUpdate: (self) => {
        Modal.info({
            title: locale.global.t('tip'),
            content: locale.global.t('tipText'),
            hideCancel: false,
            okText : locale.global.t('Confirm'),
            cancelText : locale.global.t('Cancel'),
            titleAlign: 'start',
            onOk: () => {
                self.onRefresh();
            },
            onCancel: () => {
                self.onCancel();
            }
        })
    },
})