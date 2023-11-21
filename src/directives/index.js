export const input = {
  bind(el, binding, vnode) {
    const input = el.querySelector('.el-input__inner') || el.querySelector('.el-textarea__inner') || el;
    input.addEventListener('compositionstart', () => {
      vnode.locking = true//解决中文输入双向绑定失效
    })
    input.addEventListener('compositionend', () => {
      vnode.locking = false//解决中文输入双向绑定失效
      input.dispatchEvent(new Event('input'))
    })
    //输入监听处理
    input.onkeyup = () => {
      if (vnode.locking) {
        return;
      }
      // v-input.num
      if (binding.modifiers.num) {//只能输入数字（开头可以多个0）
        onlyNum(input);

      }
      //v-input.num_point
      else if (binding.modifiers.num_point) {//只能输入数字+小数点（可以多个小数点）
        onlyNumPoint(input)
      }
      //v-input.float
      else if (binding.modifiers.float) {//只能输入浮点型（只能一个小数点）
        onlyFloat(input, binding.value)
      }
      //  v-input.int
      else if (binding.modifiers.int) {//只能输入整数（0+正整数）（开头不能多个0）
        onlyInt(input)
      }
      //v-input.intp
      else if (binding.modifiers.intp) {//只能输入正整数
        onlyIntp(input)
      }
      //v-input.alp
      else if (binding.modifiers.alp) {//只能输入字母
        onlyAlp(input)
      }
      //v-input.num_alp
      else if (binding.modifiers.num_alp) {//只能输入数字+字母
        onlyNumAlp(input)
      }
      //v-input.arith
      else if (binding.modifiers.arith) {//四则运算符+数字
        onlyArith(input)
      }

      input.dispatchEvent(new Event("input"));
    }

    //数字
    function onlyNum(input) {
      input.value = input.value.replace(/\D+/g, '');
    }
    //整数(0+正整数)
    function onlyInt(input) {
      let value = input.value;
      value = value.replace(/\D+/g, '');
      input.value = value ? Number(value).toString() : value//去掉开头多个0
    }
    //正整数
    function onlyIntp(input) {
      if (!/^[1-9][0-9]*$/.test(input.value)) {
        let value = input.value.replace(/\D+/g, '');
        if (value && value.substring(0, 1) === '0') {//0开头去除0
          value = value.substring(1)
        }

        input.value = value
      }
    }

    //数字+小数点
    function onlyNumPoint(input) {
      input.value = input.value.replace(/[^\d.]/g, "");
    }

    //浮点型
    // eslint-disable-next-line no-unused-vars
    function onlyFloat(input, n) {
      let value = input.value;
      value = value.replace(/[^\d.]/g, '');
      value = value.replace(/^\./g, '');
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      if (n && Number(n) > 0) {//限制n位
        var d = new Array(Number(n)).fill(`\\d`).join('');
        // eslint-disable-next-line no-useless-escape
        var reg = new RegExp(`^(\\-)*(\\d+)\\.(${d}).*$`, 'ig');
        value = value.replace(reg, '$1$2.$3')
      }
      if (value && !value.includes('.')) {
        value = Number(value).toString()//去掉开头多个0
      }
      input.value = value
    }
    //字母
    function onlyAlp(input) {
      input.value = input.value.replace(/[^A-Za-z]/g, '');
    }
    //数字+字母
    function onlyNumAlp(input) {
      input.value = input.value.replace(/[^A-Za-z0-9]/g, '');
    }



    //四则运算+-*/()数字
    function onlyArith(input) {
      let value = input.value
      if (value) {
        input.value = value.split('').reduce((prev, cur) => {
          // eslint-disable-next-line no-useless-escape
          if (/^[\d|\-|\+|\*|\/|\.|\(|\)]+$/.test(cur)) {
            return prev + cur
          }
          return prev
        }, '')
      }
    }

  },

}

export const a = {
  b: {}
}
