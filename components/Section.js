export default class Section{
    constructor({data,renderer},classSelector){
        this._items=data; //array of data
        this._renderer=renderer;//function for creating and rendering data
        this._container=document.querySelector(classSelector);//where to add elements
    }

    renderer(){
        this._items.forEach((item) => {
            this._renderer(item);
        })
    }

    addItem(element){
        this._container.prepend(element);
    }
}
