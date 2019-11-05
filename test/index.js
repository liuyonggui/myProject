
var  that;
class Tab{
    constructor(id){
        that=this;
        this.main=document.querySelector(id);

        this.add=this.main.querySelector(".addtab");
        //获取li的父元素
        this.ul=this.main.querySelector(".firstnav ul:first-child");
        //获取setion的父元素
        this.fsection=this.main.querySelector(".tabscon");
        this.init();
    }
    //初始化
    init(){
        this.updateNode();
        this.add.onclick=this.addTab;
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].index=i;
            this.lis[i].onclick=this.toggleTab;
            this.remove[i].onclick=this.removeTab;
            this.spans[i].ondblclick=this.editTab;
            this.sections[i].ondblclick=this.editTab;
        }
    }
    //获取所有元素
    updateNode(){
        this.lis=this.main.querySelectorAll("li");
        this.sections=this.main.querySelectorAll("section");
        this.remove=this.main.querySelectorAll(".glyphicon-remove");
        this.spans=this.main.querySelectorAll(".firstnav li span:first-child");
    }
    //切换tab
    toggleTab(){
        that.clearClass();
        this.className="liactive";
        that.sections[this.index].className="conactive";
    }
    //清除类
    clearClass(){
       for(let i=0;i<this.lis.length;i++){
            this.lis[i].className="";
            that.sections[i].className="";
       }
    }
    //添加tab
    addTab(){
        that.clearClass();
        //1.创建li和session元素
        var random=Math.random();
        var li=' <li class="liactive"><span>新选项卡</span><span class="glyphicon glyphicon-remove"></span></li>';
        var section='<section class="conactive">'+random+'</section>';
        //2.追加到父元素
        that.ul.insertAdjacentHTML('beforeend',li);
        that.fsection.insertAdjacentHTML('beforeend',section);
        that.init();
    }
    //点击x号删除tab
    removeTab(e){
        e.stopPropagation();
        var index=this.parentNode.index;
        //根据索引号删除对应的 li 和 section remove()方法可以直接删除元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //当我们删除的不是选中状态的li的时候，原来的选中状态不变
        if(document.querySelector(".liactive")) return;
        index--;
        //手动调用点击事件，不需要鼠标点击
        that.lis[index] && that.lis[index].click();
    }
    //双击修改tab
    editTab(){
        var str=this.innerHTML;
        this.innerHTML='<input type="text" />';
        var input=this.children[0];//
        input.value=str;
        input.select(); //文本框里面的文字处于选中状态
        //当离开文本框的时候 在把值赋值给span
        input.onblur=function(){
            this.parentNode.innerHTML=this.value;
        }
        input.onkeyup=function(e){
            if(e.keyCode===13){
                this.blur();
            }
        }
    }
}

new Tab("#tab");