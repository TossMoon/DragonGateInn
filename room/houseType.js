
//酒店房间的户型
class RoomLayout{
    RoomType(area,windowBool,bedType){
        //房间的面积
        this.areaReal = area;
        //是否有窗户
        this.windowBool=windowBool;
        //房间床铺的情况
        this.BedType=bedType;
    }

    getArea(){
        return this.areaReal;
    }

    getWindowBool(){
        return this.windowBool;
    }

    getBedType(){
        return this.BedType;
    }
}

//床铺的情况，某种类型的床有几张
class BedInRoom{
    BedInRoom(typeString,numInt){
        //床的类型
        this.typeString=typeString;
        //有几张床
        this.numInt=numInt;
    }

    getBedType(){
        return this.typeString;
    }

    getBedNum(){
        return this.numInt;
    }

}


