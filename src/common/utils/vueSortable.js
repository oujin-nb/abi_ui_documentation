export default class SortClass {
    constructor(el, _this, sortStr,sortList) {
        this.el = el
        this._this = _this
        this.sortStr = sortStr,
        this.prevent = false,
        this.sortList = sortList
        this._init()
    }
    _init() {
        let that = this._this
        let document = this.el
        let beforeVal = ''
        let beforeIndex=''
        let beforeEl={}
        let afterIndex = ''
        /* 可拖动的目标元素会触发事件 */
        document.addEventListener("dragover", e => {
            e.preventDefault();
        });
      
        Array.prototype.forEach.call(document.children, (s,index) => {
            s.setAttribute("draggable", "true");
            s.addEventListener("dragstart", (e) => {
                this.onStart({index:index,el:e.target,event:e,val:e.target.children[0].innerText.trim()})
                // e.target.style.opacity = .3;
                beforeVal = e.target.children[0].innerText.trim()
                beforeIndex = index
                beforeEl = e.target
            })
            s.addEventListener("drop", e => {
                let parent = this.getParentNode(e.target)
                let text = parent.children[0].innerText.trim()
                this.onDrap({before:beforeVal,after:text,beforeIndex:beforeIndex,afterIndex:index,beforeEl:beforeEl,afterEl:parent,event:e})
                if(!this.prevent){
                    this.exchange(beforeVal, text)
                }else{
                    e.preventDefault();
                }
                this.prevent = false
            });
            s.addEventListener("dragend", e => {
                // e.target.style.opacity = 1;
                this.onEnd({index:index,el:e.target,event:e})
            });

        })
    }
    getParentNode(node) {
        let parent = node.parentNode
        if (parent.nodeName === 'TR') {
            return parent
        }
        return this.getParentNode(parent)
    }
    exchange(before, after) {
        let that = this._this
        let aIndex = "";
        let bIndex = "";
        let list = [].slice.call(that[this.sortList]);
        list.forEach((p, index) => {
            if (p.label === before) {
                aIndex = index;
            }
            if (p.label === after) {
                bIndex = index;
            }
        });
        let tmplObj = Object.assign({}, list[aIndex]);
        list[aIndex] = Object.assign({}, list[bIndex]);
        list[bIndex] = tmplObj;
        that[this.sortList] = list;
    }
    onStart(option){}
    onEnd(option){}
    onDrap(option){}
    doPrevent(){
        this.prevent = true
    }
    cancalDarp(el){
        el.setAttribute("draggable", "false");
    }
}