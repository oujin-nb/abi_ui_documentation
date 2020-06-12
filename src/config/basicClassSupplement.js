// 获取当前数组中最大值
Array.prototype.get = function(){
    return this.reduce((s,c)=>{return s>c?s:c})
}
// 去重
Array.prototype.distinct = function(){
    return [...new Set(this)]
}
// 根据索引插入数组
Array.prototype.insertArr = function(arr,index){
    this.splice(index + 1, 0, ...arr)
}