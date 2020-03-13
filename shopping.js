class GoodsItem{
    constructor(_props,parent){
        this.props=_props;
        this.goods=this.initGoods(parent);
        this.render(_props);

    }
    initGoods(parent){
        if(this.goods) return this.goods;
        let div=document.createElement("div");
        Object.assign(div.style,{
            width:"290px",
            height:"390px",
            marginLeft:"10px",
            marginBottom:"20px",
            background:"white",
            position:"relative",
            float:"left"
        });
        this.createImgGoods(div);
        this.createPriceCon(div);
        parent.appendChild(div);
        return div;
    }
    createImgGoods(parent){
        let div=document.createElement("div");
        Object.assign(div.style,{
            width:"100%",
            height:"330px",
            textAlign:"center",
            position:"relative",
        });
        this.goodsImg=new Image();
        Object.assign(this.goodsImg.style,{
            width:"230px",
            height:"200px",
            marginTop:"20px",
            transition:"all 1s"
        });
        this.goodsInfo=document.createElement("p");
        Object.assign(this.goodsInfo.style,{
            width:"230px",
            height:"40px",
            fontSize:"14px",
            margin:"auto",
            overflow:"hidden",
            position:"absolute",
            left:0,
            right:0,
            bottom:"10px",
            lineHeight:"22px"
        });
        div.appendChild(this.goodsImg);
        div.appendChild(this.goodsInfo);
        div.addEventListener("mouseenter",this.mouseHandler);
        div.addEventListener("mouseleave",this.mouseHandler);
        parent.appendChild(div);
    }
    createPriceCon(parent){
        let div=document.createElement("div");
        Object.assign(div.style,{
            width:"286px",
            height:"58px",
            border:"2px solid #e01222",
            position:"absolute",
            bottom:0
        });
        let priceDiv=document.createElement("div");
        this.goodsBn=document.createElement("div");
        Object.assign(this.goodsBn.style,{
            width:"87px",
            height:"58px",
            color:"white",
            fontSize:"16px",
            textAlign:"center",
            cursor:"pointer",
            lineHeight:"58px",
            background:"#e01222",
            position:"absolute",
            top:0,
            right:0
        });
        this.goodsBn.textContent="立即抢购";
        this.createPricDiv(priceDiv);
        div.appendChild(priceDiv);
        div.appendChild(this.goodsBn);
        this.goodsBn.addEventListener("click",this.clickHander);
        this.goodsBn.self=this;
        parent.appendChild(div);
    }
    createPricDiv(parent){
        let priceDivs=document.createElement("div");
        let soldDivs=document.createElement("div");
        this.nowPrice=document.createElement("span");
        this.initPrcie=document.createElement("span");
        priceDivs.appendChild(this.nowPrice);
        priceDivs.appendChild(this.initPrcie);
        Object.assign(this.nowPrice.style,{
            fontSize:"24px",
            color:"#e01222",
            lineHeight:"35px",
            marginLeft:"5px"

        });
        Object.assign(this.initPrcie.style,{
            fontSize:"14px",
            marginLeft:"5px",
            textDecoration: "line-through"
        });
        this.percent=document.createElement("span");
        let percentCon=document.createElement("span");
        this.soldPercent=document.createElement("span");
        Object.assign(this.percent.style,{
            fontSize:"16px",
            marginLeft:"10px",
            lineHeight:"10px"
        });
        Object.assign(percentCon.style,{
            width:"100px",
            height:"10px",
            border:"1px solid #e01222",
            display:"inline-block",
            marginLeft:"20px",
            marginTop:"5px",
            position:"absolute",
        });
        Object.assign(this.soldPercent.style,{
            width:"0%",
            height:"10px",
            background:"#e01222",
            position:"absolute",
            top:0,
            bottom:0
        });
        percentCon.appendChild(this.soldPercent);
        soldDivs.appendChild(this.percent);
        soldDivs.appendChild(percentCon);
        parent.appendChild(priceDivs);
        parent.appendChild(soldDivs);
    }
    mouseHandler(e){
        if(e.type==="mouseenter"){
            this.firstElementChild.style.marginTop="0px";
        }else if(e.type==="mouseleave"){
            this.firstElementChild.style.marginTop="20px";
        }
    }
    clickHander(e){
        let evt=new Event(GoodsItem.ADD_SHOPPING_LIST_EVENT);
        evt.data=this.self.props;
        document.dispatchEvent(evt);
    }
    render(_props){
        this.goodsImg.src=_props.icon;
        this.goodsInfo.textContent=_props.goods;
        this.nowPrice.textContent="￥"+_props.nowPrice;
        this.initPrcie.textContent="￥"+_props.initPrice;
        this.goodsBn.id=_props.id;
        if(_props>1) return;
        this.percent.textContent=(_props.sold*100).toFixed(2)+"%";
        this.soldPercent.style.width=_props.sold*100+"%";
    }
    static get ADD_SHOPPING_LIST_EVENT(){
        return "add_shopping_list_event";
    }
}

class StepNumber{
    constructor(_data,parent){
        if(_data.num>99){
            _data.num=99;
        }
        this.data=_data;
        this.step=_data.num;
        this.stepNumber=this.initCreateStep(parent);
    }
    initCreateStep(parent){
        if(this.stepNumber) return this.stepNumber;
        let div=document.createElement("div");
        Object.assign(div.style,{
            position:"relative"
        });
        let leftBn=document.createElement("button");
        let input=document.createElement("input");
        let rightBn=document.createElement("button");
        leftBn.textContent="-";
        rightBn.textContent="+";
        let bnStyle={
            width:"25px",
            height:"25px",
            border:"1px solid #cccccc",
            background:"#ffffff",
            outline:"none",
            cursor:"pointer",
            position:"relative"
        };
        Object.assign(leftBn.style,bnStyle);
        Object.assign(rightBn.style,bnStyle);
        Object.assign(input.style,{
            width:"50px",
            height:"21px",
            border:"1px solid #cccccc",
            borderLeft:"none",
            borderRight:"none",
            outline:"none",
            textAlign:"center",
            position:"relative"
        });
        input.value=this.step;
        div.appendChild(leftBn);
        div.appendChild(input);
        div.appendChild(rightBn);
        leftBn.self=rightBn.self=input.self=this;
        leftBn.addEventListener("click",this.bnClickHandler);
        rightBn.addEventListener("click",this.bnClickHandler);
        input.addEventListener("input",this.inputHandler);
        parent.appendChild(div);
        return div;
    }
    bnClickHandler(e){
        if(this.textContent==="+"){
            if(this.self.step===99) return;
            this.self.setData(this.self.step+1);
        }else if(this.textContent==="-"){
            if(this.self.step===1) return;
            this.self.setData(this.self.step-1);
        }
    }
    inputHandler(e){
        let num=Number(this.value.replace(/\D/,""));
        if(num>99) num=99;
        if(num<1) num=1;
        this.self.setData(num);
    }
    setData(num){
        this.step=num;
        this.stepNumber.children[1].value=num;
        if(this.id)return;
        this.id=setTimeout(this.getOutData,500,this)
    }
    getOutData(self){
        let evt=new Event(StepNumber.CHANGE_STEP_NUMBER_EVENT);
        evt.data=self.data;
        evt.num=self.step;
        document.dispatchEvent(evt);
        clearTimeout(self.id);
        self.id=0;
    }
    static get CHANGE_STEP_NUMBER_EVENT(){
        return "change_step_number_event";
    }
}