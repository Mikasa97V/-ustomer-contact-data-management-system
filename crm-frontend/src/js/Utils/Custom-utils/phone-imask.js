export class ContactMask {
    mask
    element
    constructor(element, select) {
        this.element = element
        if (select.value === 'phone') {
            this.createPhoneMask()
        }
    }
    createPhoneMask() {
        const maskOptions = {
            mask: '+7(000) 000-00-00',
            lazy: false
        }
        this.mask = IMask(this.element, maskOptions);
    }

    destroyPhoneMask() {
        if (!this.mask) return;
        this.element.value = '';
        this.mask.destroy();
    }

    getInputMask(e) {
        if (e.target.value === 'phone') {
            this.createPhoneMask(this.element);
        } else {
            this.destroyPhoneMask(this.element);
        }
    }

}

export function undoPhoneMask(phone) {
    const blackList = ['(', ')', '-', '_', '+', ' '];
    return phone.split('').filter((it) => !blackList.includes(it)).join('');
}
